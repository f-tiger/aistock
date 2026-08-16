#!/usr/bin/env node
// 「抄作业排行榜」:跟着 8 位传奇投资者抄 AI 作业,过去两年真的赚了吗?
//
// 为什么这个问题没人回答:所有 13F 网站都展示「他们持有什么」,那是信息;
// 这里回答「照着抄能赚多少」,那是可验证的结果。
//
// 一个诚实的设计决定,也是本工具的全部差异所在:
//   **用申报日的收盘价建仓,不用季度末价格。**
// 13F 有 45 天滞后,季度末价格是普通人**根本拿不到**的价格。拿季度末价格算收益
// 等于假装你能穿越,那种回测好看但没用。用申报日价格算出来的,才是一个真人当天
// 打开 EDGAR、照着买、能拿到的结果。
//
// 数据全部一手:持仓来自 SEC 申报原文,价格来自 Stooq 公开日线(无需密钥)。
// 不做任何收益承诺;过去表现不预示未来,页面上会明写。
import { writeFileSync } from 'node:fs';

const UA = { 'User-Agent': 'AGI Scorecard Research (contact: https://agiscorecard.com/about)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const THRESHOLD = 100_000_000;

const TARGETS = [
  { slug: 'warren-buffett',        name: '巴菲特',       cik: '0001067983' },
  { slug: 'cathie-wood',           name: '木头姐',       cik: '0001697748' },
  { slug: 'stanley-druckenmiller', name: '德鲁肯米勒',   firm: 'Duquesne Family Office LLC' },
  { slug: 'bill-ackman',           name: '阿克曼',       firm: 'Pershing Square Capital Management' },
  { slug: 'duan-yongping',         name: '段永平',       firm: 'H&H International Investment' },
  { slug: 'david-tepper',          name: '泰珀',         firm: 'Appaloosa' },
  { slug: 'philippe-laffont',      name: 'Laffont',      firm: 'Coatue Management' },
];

// 只回测 AI 相关标的——这是本站的编辑角度(AI 投资罗盘),不是全组合复制。
const MAP = [['APPLE','AAPL'],['ALPHABET','GOOGL'],['AMAZON','AMZN'],['NVIDIA','NVDA'],
  ['TESLA','TSLA'],['ADVANCED MICRO','AMD'],['TAIWAN SEMICONDUCTOR','TSM'],['PALANTIR','PLTR'],
  ['MICROSOFT','MSFT'],['META PLATFORMS','META'],['MICRON','MU'],['BROADCOM','AVGO'],
  ['LAM RESEARCH','LRCX'],['SEAGATE','STX'],['WESTERN DIGITAL','WDC'],['ORACLE','ORCL'],
  ['ARISTA','ANET'],['VERTIV','VRT'],['SUPER MICRO','SMCI'],['DELL','DELL'],['SNOWFLAKE','SNOW'],
  ['COHERENT','COHR'],['SALESFORCE','CRM'],['TEMPUS','TEM'],['SANDISK','SNDK']];
const tick = (n) => { const u = n.toUpperCase(); for (const [p, t] of MAP) if (u.includes(p)) return t; return null; };

async function get(url, json = false) {
  let last;
  for (let a = 0; a < 3; a++) {
    await sleep(340 + a * 1200);
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(25000) });
      if (r.ok) return json ? r.json() : r.text();
      if (r.status < 500 && r.status !== 429) throw new Error('HTTP ' + r.status);
      last = new Error('HTTP ' + r.status);
    } catch (e) { if (String(e.message).startsWith('HTTP 4')) throw e; last = e; }
  }
  throw last;
}

const tag = (s, t) => (s.match(new RegExp('<(?:\\w+:)?' + t + '>([^<]*)<', 'i')) || [])[1] || '';

// 日线:Yahoo chart API,公开、无需密钥。用**复权收盘**(adjclose),拆股和分红都算进去,
// 否则一次 10:1 拆股会凭空变成 -90% 收益。
// (原计划用 Stooq CSV,runner 上被 JS 校验页挡住 —— 200 但返回 HTML,scripts/price-probe.mjs
//  的一次性探针查出来的。别再换回去。)
const priceCache = new Map();
async function prices(sym) {
  if (priceCache.has(sym)) return priceCache.get(sym);
  let map = null;
  try {
    const j = JSON.parse(await get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?range=10y&interval=1d`));
    const r = j.chart?.result?.[0];
    const ts = r?.timestamp || [];
    const px = r?.indicators?.adjclose?.[0]?.adjclose || r?.indicators?.quote?.[0]?.close || [];
    if (ts.length && ts.length === px.length) {
      map = new Map();
      for (let i = 0; i < ts.length; i++) {
        const v = px[i];
        if (v != null && Number.isFinite(v)) map.set(new Date(ts[i] * 1000).toISOString().slice(0, 10), v);
      }
      if (map.size < 100) map = null;
    }
  } catch { map = null; }
  priceCache.set(sym, map);
  return map;
}
// 取 >= 目标日的第一个交易日收盘(申报日可能是周末/休市)
function closeOnOrAfter(map, day) {
  if (!map) return null;
  const d = new Date(day + 'T00:00:00Z');
  for (let i = 0; i < 10; i++) {
    const k = d.toISOString().slice(0, 10);
    if (map.has(k)) return map.get(k);
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return null;
}

async function filingsOf(cik, limit = 9) {
  const sub = await get(`https://data.sec.gov/submissions/CIK${cik}.json`, true);
  const r = sub.filings.recent, out = [];
  for (let i = 0; i < r.form.length && out.length < limit; i++) {
    if (r.form[i] === '13F-HR') out.push({ filed: r.filingDate[i], period: r.reportDate[i], acc: r.accessionNumber[i].replace(/-/g, '') });
  }
  return { name: sub.name, filings: out };
}

async function basketOf(cik, acc) {
  const dir = `https://www.sec.gov/Archives/edgar/data/${Number(cik)}/${acc}`;
  const idx = await get(`${dir}/index.json`, true);
  let xml = null;
  for (const it of idx.directory.item.filter((x) => /\.xml$/i.test(x.name))) {
    const b = await get(`${dir}/${it.name}`);
    if (/<(?:\w+:)?infoTable[\s>]/i.test(b)) { xml = b; break; }
  }
  if (!xml) return null;
  const blocks = xml.match(/<(?:\w+:)?infoTable[\s>][\s\S]*?<\/(?:\w+:)?infoTable>/gi) || [];
  const agg = new Map();
  let raw = 0;
  for (const b of blocks) {
    const t = tick(tag(b, 'nameOfIssuer'));
    const v = Number(tag(b, 'value')) || 0;
    raw += v;
    if (t) agg.set(t, (agg.get(t) || 0) + v);
  }
  const mult = raw > 0 && raw < THRESHOLD ? 1000 : 1;
  const aiTotal = [...agg.values()].reduce((a, b) => a + b, 0) * mult;
  return { weights: [...agg.entries()].map(([t, v]) => ({ t, w: aiTotal ? (v * mult) / aiTotal : 0 })), aiTotal };
}

const out = { generated: new Date().toISOString().slice(0, 10), method:
  'Buy each manager\'s AI-stock basket at the CLOSE OF ITS 13F FILING DATE (not quarter end — a 13F is public ~45 days late, so the filing-date price is the first price a real person could actually pay), weighted as filed, hold until the next filing, repeat. Prices: Stooq daily closes. Holdings: SEC EDGAR primary filings. Past results do not predict future returns; not investment advice.',
  investors: [] };

// 基准:QQQ 同期
const qqq = await prices('QQQ');

for (const t of TARGETS) {
  try {
    let cik = t.cik;
    if (!cik) {
      const x = await get('https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company='
        + encodeURIComponent(t.firm) + '&type=13F-HR&dateb=&owner=include&count=5&output=atom');
      cik = (x.match(/CIK=(\d{10})/) || [])[1];
      if (!cik) throw new Error('CIK unresolved');
    }
    const { name, filings } = await filingsOf(cik);
    if (filings.length < 3) throw new Error('too few filings');
    filings.reverse();                                    // 由旧到新

    const legs = [], skipped = { noBasket: 0, thinCoverage: 0 };
    for (let i = 0; i < filings.length - 1; i++) {
      const b = await basketOf(cik, filings[i].acc);
      if (!b || !b.weights.length) { skipped.noBasket++; continue; }
      const d0 = filings[i].filed, d1 = filings[i + 1].filed;
      let ret = 0, used = 0;
      for (const { t: sym, w } of b.weights) {
        const p = await prices(sym);
        const a = closeOnOrAfter(p, d0), z = closeOnOrAfter(p, d1);
        if (a && z && a > 0) { ret += w * (z / a - 1); used += w; }
      }
      if (used < 0.5) { skipped.thinCoverage++; continue; } // 覆盖率不足则跳过,不硬凑
      legs.push({ from: d0, to: d1, ret: ret / used, holdings: b.weights.length, coverage: Math.round(used * 100) });
    }
    // 失败时必须说清是哪一环坏了:持仓没解析出来,还是价格拿不到。
    // (首轮 7 位全挂,日志只写「no computable legs」,查因多花了一次 runner 往返。)
    if (!legs.length) throw new Error(
      `no computable legs — 无持仓 ${skipped.noBasket} 期 / 价格覆盖不足 ${skipped.thinCoverage} 期`);

    const cum = legs.reduce((a, l) => a * (1 + l.ret), 1) - 1;
    const q0 = closeOnOrAfter(qqq, legs[0].from), q1 = closeOnOrAfter(qqq, legs[legs.length - 1].to);
    const bench = q0 && q1 ? q1 / q0 - 1 : null;
    out.investors.push({ slug: t.slug, name: t.name, entityName: name, cik,
      from: legs[0].from, to: legs[legs.length - 1].to, quarters: legs.length,
      cumulativeReturn: Math.round(cum * 1000) / 10,
      benchmarkQQQ: bench == null ? null : Math.round(bench * 1000) / 10,
      legs });
    console.log(`✅ ${t.name.padEnd(12)} ${legs.length} 期 · ${legs[0].from}→${legs[legs.length-1].to} · 累计 ${(cum*100).toFixed(1)}% · QQQ ${bench==null?'—':(bench*100).toFixed(1)+'%'}`);
  } catch (e) {
    console.log(`❌ ${t.name.padEnd(12)} ${e.message}`);
  }
}
out.investors.sort((a, b) => b.cumulativeReturn - a.cumulativeReturn);
writeFileSync('lib/data/copy-homework.json', JSON.stringify(out, null, 2) + '\n');
console.log(`\n${out.investors.length} 位可回测 → lib/data/copy-homework.json`);
