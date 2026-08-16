#!/usr/bin/env node
// 从 EDGAR 抓取 8 位投资者最近一期 13F 的**逐笔持仓原文**,落成 JSON 提交回仓库。
//
// 为什么必须是原文:本仓硬规则「持仓只能来自逐笔申报,定性表态永不充当持仓」。
// 会话沙箱够不到 sec.gov(代理 403),GitHub runner 可以——2026-08-16 已实测
// 拉到 ARK 的 Q2 191 条持仓。本仓公开,Actions 免费。
//
// 两条已知坑,都在下面处理掉:
// ① informationTable 文件名各家不同(伯克希尔就不叫这个名)——不靠文件名猜,
//    改为逐个 .xml 拉下来看内容里有没有 <infoTable>,内容说了算。
// ② SEC 要求带可识别 UA,且限速 10 req/s——这里保守到 ~3 req/s。
import { writeFileSync } from 'node:fs';

const UA = { 'User-Agent': 'AGI Scorecard Research (contact: https://agiscorecard.com/about)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// CIK 只写我已核实过的两个;其余留空由 EDGAR 按名字解析,并把解析到的公司名
// 打出来供人核对——宁可留空,不可写错(写错会静默抓来别人的持仓)。
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
  await sleep(340);                                   // ~3 req/s,远低于 SEC 上限
  const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(25000) });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url.slice(0, 70)}`);
  return json ? r.json() : r.text();
}

async function resolveCik(firm) {
  const u = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=${encodeURIComponent(firm)}`
          + `&type=13F-HR&dateb=&owner=include&count=5&output=atom`;
  const xml = await get(u);
  const cik = (xml.match(/CIK=(\d{10})/) || xml.match(/<cik>(\d+)<\/cik>/i) || [])[1];
  const name = (xml.match(/<conformed-name>([^<]+)</i) || xml.match(/<title>([^<]+)</i) || [])[1];
  return cik ? { cik: cik.padStart(10, '0'), name: (name || '').trim() } : null;
}

const tag = (s, t) => (s.match(new RegExp(`<(?:\\\\w+:)?${t}>([^<]*)<`, 'i')) || [])[1] || '';

async function holdingsFor(cik) {
  const sub = await get(`https://data.sec.gov/submissions/CIK${cik}.json`, true);
  const rec = sub.filings.recent;
  const i = rec.form.findIndex((f) => f === '13F-HR');
  if (i < 0) throw new Error('no 13F-HR on file');
  const acc = rec.accessionNumber[i].replace(/-/g, '');
  const dir = `https://www.sec.gov/Archives/edgar/data/${Number(cik)}/${acc}`;
  const idx = await get(`${dir}/index.json`, true);

  // 不靠文件名猜:逐个 xml 看内容,谁含 <infoTable> 谁就是持仓表。
  let xml = null;
  for (const it of idx.directory.item.filter((x) => /\.xml$/i.test(x.name))) {
    const body = await get(`${dir}/${it.name}`);
    if (/<(?:\w+:)?infoTable>/i.test(body)) { xml = body; break; }
  }
  if (!xml) throw new Error('no informationTable in any xml of the filing');

  const blocks = xml.match(/<(?:\w+:)?infoTable>[\s\S]*?<\/(?:\w+:)?infoTable>/gi) || [];
  const rows = blocks.map((b) => ({
    issuer: tag(b, 'nameOfIssuer'),
    cusip: tag(b, 'cusip'),
    valueUsd: Number(tag(b, 'value')) || 0,     // 注:2023 起 SEC 已改为按美元报,不再是千美元
    shares: Number(tag(b, 'sshPrnamt')) || 0,
    cls: tag(b, 'titleOfClass'),
  })).filter((r) => r.issuer);

  const total = rows.reduce((a, r) => a + r.valueUsd, 0);
  rows.sort((a, b) => b.valueUsd - a.valueUsd);
  return {
    filedAt: rec.filingDate[i], periodEnd: rec.reportDate[i],
    accession: rec.accessionNumber[i], sourceUrl: `${dir}/`,
    positions: rows.length, totalValueUsd: total,
    top: rows.slice(0, 25).map((r) => ({ ...r, pct: total ? Math.round((r.valueUsd / total) * 1000) / 10 : 0 })),
  };
}

const out = { generated: new Date().toISOString().slice(0, 10), note: 'Line-by-line SEC 13F holdings, fetched from EDGAR primary filings. Values in USD as filed.', investors: {} };
let ok = 0;
for (const t of TARGETS) {
  try {
    let cik = t.cik, resolved = null;
    if (!cik) {
      resolved = await resolveCik(t.firm);
      if (!resolved) throw new Error(`CIK unresolved for "${t.firm}"`);
      cik = resolved.cik;
    }
    const h = await holdingsFor(cik);
    out.investors[t.slug] = { firm: t.firm, cik, resolvedName: resolved?.name || null, ...h };
    console.log(`✅ ${t.slug.padEnd(22)} CIK ${cik}${resolved ? ` (解析到: ${resolved.name})` : ''} · ${h.periodEnd} · ${h.positions} 条 · $${(h.totalValueUsd/1e9).toFixed(1)}B · 首位 ${h.top[0]?.issuer}`);
    ok++;
  } catch (e) {
    out.investors[t.slug] = { firm: t.firm, error: String(e.message).slice(0, 120) };
    console.log(`❌ ${t.slug.padEnd(22)} ${e.message}`);
  }
}
writeFileSync('lib/data/13f-edgar.json', JSON.stringify(out, null, 2) + '\n');
console.log(`\n${ok}/${TARGETS.length} 家取得逐笔持仓 → lib/data/13f-edgar.json`);
