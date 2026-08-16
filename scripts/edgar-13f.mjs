#!/usr/bin/env node
// 从 EDGAR 抓取投资者最近一期 13F 的**逐笔持仓原文**,落成 JSON 提交回仓库。
//
// 硬规则:持仓只能来自逐笔申报,定性表态永不充当持仓。会话沙箱够不到 sec.gov
// (代理 403),GitHub runner 可以。本仓公开,Actions 免费。
//
// 首跑(2026-08-16)暴露的三个坑,全部在此修掉——每一条都写清为什么:
// ① 标签命名空间:上一版正则误写成 `\\w`(字面反斜杠+w),导致带 <ns1:nameOfIssuer>
//    的申报一行都匹配不上,段永平那家被算成 0 条持仓。空结果长得像"这季清仓了",
//    这种错最危险,所以现在对 0 条结果一律标记 suspect 并保留诊断信息。
// ② 金额单位:2023 年起 SEC 要求按美元报,此前按千美元;仍有申报人沿用旧写法
//    (德鲁肯米勒 95 条持仓报出 1000 万美元)。不靠猜年份——用监管门槛判定:
//    13F 只有管理规模 ≥1 亿美元才需申报,所以总额低于 1 亿必然是千美元单位。
// ③ 主体核对:上一版从搜索页 <title> 抓公司名,拿到的是 "Company Search Feed"
//    这种页面标题,等于没核对。改为以 submissions JSON 里的 entity name 为准——
//    那是这份申报自己声明的主体,拿错 CIK 会立刻暴露,而不是静默抓来别人的持仓。
import { writeFileSync } from 'node:fs';

const UA = { 'User-Agent': 'AGI Scorecard Research (contact: https://agiscorecard.com/about)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const THIRTEEN_F_THRESHOLD_USD = 100_000_000;   // 13F 申报门槛,用作单位判定的锚

const TARGETS = [
  { slug: 'warren-buffett',        firm: 'Berkshire Hathaway Inc',        cik: '0001067983' },
  { slug: 'cathie-wood',           firm: 'ARK Investment Management LLC', cik: '0001697748' },
  { slug: 'stanley-druckenmiller', firm: 'Duquesne Family Office LLC' },
  { slug: 'bill-ackman',           firm: 'Pershing Square Capital Management' },
  { slug: 'duan-yongping',         firm: 'H&H International Investment' },
  { slug: 'david-tepper',          firm: 'Appaloosa' },
  { slug: 'philippe-laffont',      firm: 'Coatue Management' },
  { slug: 'michael-burry',         firm: 'Scion Asset Management' },
];

async function get(url, json = false) {
  await sleep(340);                                   // ~3 req/s,远低于 SEC 的 10/s 上限
  const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(25000) });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url.slice(0, 70)}`);
  return json ? r.json() : r.text();
}

// 命名空间可选,大小写不敏感。这一行是上一版的 bug 源头,现在只写一处、全局复用。
const tag = (s, t) => (s.match(new RegExp('<(?:\\w+:)?' + t + '>([^<]*)<', 'i')) || [])[1] || '';

async function resolveCik(firm) {
  const u = 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company='
          + encodeURIComponent(firm) + '&type=13F-HR&dateb=&owner=include&count=5&output=atom';
  const xml = await get(u);
  const m = xml.match(/CIK=(\d{10})/);
  return m ? m[1] : null;
}

async function holdingsFor(cik) {
  const sub = await get('https://data.sec.gov/submissions/CIK' + cik + '.json', true);
  const rec = sub.filings.recent;
  const i = rec.form.findIndex((f) => f === '13F-HR');
  if (i < 0) throw new Error('no 13F-HR on file');
  const acc = rec.accessionNumber[i].replace(/-/g, '');
  const dir = 'https://www.sec.gov/Archives/edgar/data/' + Number(cik) + '/' + acc;
  const idx = await get(dir + '/index.json', true);

  // 不靠文件名猜持仓表(各家命名不同):逐个 xml 看内容里有没有 infoTable,内容说了算。
  let xml = null, tried = [];
  for (const it of idx.directory.item.filter((x) => /\.xml$/i.test(x.name))) {
    const body = await get(dir + '/' + it.name);
    tried.push(it.name);
    if (/<(?:\w+:)?infoTable[\s>]/i.test(body)) { xml = body; break; }
  }
  if (!xml) throw new Error('no informationTable among: ' + tried.join(', ').slice(0, 90));

  const blocks = xml.match(/<(?:\w+:)?infoTable[\s>][\s\S]*?<\/(?:\w+:)?infoTable>/gi) || [];
  const rows = blocks.map((b) => ({
    issuer: tag(b, 'nameOfIssuer'),
    cusip: tag(b, 'cusip'),
    raw: Number(tag(b, 'value')) || 0,
    shares: Number(tag(b, 'sshPrnamt')) || 0,
    cls: tag(b, 'titleOfClass'),
  })).filter((r) => r.issuer);

  // 单位判定:低于 13F 申报门槛 → 该申报按千美元报,统一折算成美元。
  const rawTotal = rows.reduce((a, r) => a + r.raw, 0);
  const inThousands = rawTotal > 0 && rawTotal < THIRTEEN_F_THRESHOLD_USD;
  const mult = inThousands ? 1000 : 1;
  const lines = rows.map((r) => ({ issuer: r.issuer, cusip: r.cusip, cls: r.cls,
                                   shares: r.shares, valueUsd: r.raw * mult }));
  const total = rawTotal * mult;

  // 13F 的 informationTable 是按「标的 × 股份类别 × 投资经理 × 管理权」逐行报的,
  // 同一只股票会拆成多行(伯克希尔的苹果就出现在三行里)。直接取前几行当持仓是错的,
  // 必须先聚合。按 CUSIP 聚合而不是按名字——名字有 "COCA COLA CO"/"CHEVRON CORPORATION"
  // 这类写法差异,做字符串归一化只会把名字改烂(试过一版,聚出了 "COCALA")。
  const byCusip = new Map();
  for (const r of lines) {
    const k = r.cusip || r.issuer;
    const cur = byCusip.get(k) || { issuer: r.issuer, cusip: r.cusip, valueUsd: 0, shares: 0, lines: 0 };
    cur.valueUsd += r.valueUsd; cur.shares += r.shares; cur.lines += 1;
    byCusip.set(k, cur);
  }
  const holdings = [...byCusip.values()].sort((a, b) => b.valueUsd - a.valueUsd)
    .map((h) => ({ ...h, pct: total ? Math.round((h.valueUsd / total) * 1000) / 10 : 0 }));

  return {
    filedAt: rec.filingDate[i], periodEnd: rec.reportDate[i],
    accession: rec.accessionNumber[i], sourceUrl: dir + '/',
    lineItems: lines.length,          // 申报里的原始行数
    positions: holdings.length,       // 去重后的真实持仓数
    totalValueUsd: total,
    valueUnitAsFiled: inThousands ? 'thousands (converted)' : 'usd',
    suspect: holdings.length === 0 ? 'zero positions parsed — verify manually before use' : null,
    xmlFilesTried: holdings.length === 0 ? tried : undefined,
    holdings,                         // 全量,聚合后
  };
}

const out = { generated: new Date().toISOString().slice(0, 10),
  note: 'Line-by-line SEC 13F holdings from EDGAR primary filings. entityName is the filer as declared in its own submissions record — check it matches the intended investor before using.',
  investors: {} };
let ok = 0;
for (const t of TARGETS) {
  try {
    const cik = t.cik || await resolveCik(t.firm);
    if (!cik) throw new Error('CIK unresolved for "' + t.firm + '"');
    const sub = await get('https://data.sec.gov/submissions/CIK' + cik + '.json', true);
    const h = await holdingsFor(cik);
    out.investors[t.slug] = { firm: t.firm, cik, entityName: sub.name, cikSource: t.cik ? 'verified' : 'resolved', ...h };
    const flag = h.suspect ? ' ⚠️ ' + h.suspect : '';
    console.log('✅ ' + t.slug.padEnd(22) + ' [' + sub.name + '] ' + h.periodEnd + ' · ' + h.positions
      + ' 只(' + h.lineItems + ' 行) · $' + (h.totalValueUsd / 1e9).toFixed(2) + 'B (' + h.valueUnitAsFiled + ') · 首位 '
      + (h.holdings[0]?.issuer || '—') + ' ' + (h.holdings[0]?.pct ?? 0) + '%' + flag);
    ok++;
  } catch (e) {
    out.investors[t.slug] = { firm: t.firm, error: String(e.message).slice(0, 140) };
    console.log('❌ ' + t.slug.padEnd(22) + ' ' + e.message);
  }
}
writeFileSync('lib/data/13f-edgar.json', JSON.stringify(out, null, 2) + '\n');
console.log('\n' + ok + '/' + TARGETS.length + ' 家取得逐笔持仓 → lib/data/13f-edgar.json');
