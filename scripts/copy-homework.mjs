import { writeFileSync } from 'node:fs';
import { METHOD_VERSION, equityPositions, calculateLeg, summarizeLegs } from './homework-method.mjs';

const UA = { 'User-Agent': 'AGI Scorecard Research (contact: https://agiscorecard.com/about)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


const TARGETS = [
  { slug: 'warren-buffett',        name: '巴菲特',       cik: '0001067983' },
  { slug: 'cathie-wood',           name: '木头姐',       cik: '0001697748' },
  { slug: 'stanley-druckenmiller', name: '德鲁肯米勒',   cik: '0001536411' },
  { slug: 'bill-ackman',           name: '阿克曼',       cik: '0001336528' },
  { slug: 'duan-yongping',         name: '段永平',       cik: '0001759760' },
  { slug: 'david-tepper',          name: '泰珀',         cik: '0001656456' },
  { slug: 'philippe-laffont',      name: 'Laffont',      cik: '0001135730' },
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
    const px = r?.indicators?.adjclose?.[0]?.adjclose || []; // never mix raw and adjusted closes
    if (ts.length && ts.length === px.length) {
      map = new Map();
      for (let i = 0; i < ts.length; i++) {
        const v = px[i];
        const day = new Date(ts[i] * 1000).toISOString().slice(0, 10);
        if (v > 0 && Number.isFinite(v) && day < new Date().toISOString().slice(0, 10)) map.set(day, v);
      }
      if (map.size < 100) map = null;
    }
  } catch { map = null; }
  priceCache.set(sym, map);
  return map;
}
async function filingsOf(cik, limit = 9) {
  const sub = await get(`https://data.sec.gov/submissions/CIK${cik}.json`, true);
  const r = sub.filings.recent, out = [];
  for (let i = 0; i < r.form.length && out.length < limit; i++) {
    if (r.form[i] === '13F-HR') out.push({ filed: r.filingDate[i], period: r.reportDate[i], acc: r.accessionNumber[i].replace(/-/g, ''), accepted: r.acceptanceDateTime?.[i] || null });
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
  return equityPositions(xml, tick);
}

const out = {
  generated: new Date().toISOString().slice(0, 10),
  methodVersion: METHOD_VERSION,
  validation: { status: 'historical-simulation', liveReturnsVerified: false, costBps: 0, coverageRequired: 100, universe: 'current editorial AI list; selection/survivorship bias remains', corrections: 'Original 13F-HR only; amendments/confidential releases are not reconstructed' },
  method: 'Historical simulation: equity-only AI slice from original SEC 13F-HR filings; exclude Put/Call and PRN rows. Rebalance at the first completed US trading-session close strictly AFTER each filing date. Stock and QQQ use identical execution dates and adjusted closes only. Require full price coverage and contiguous quarters; failed managers are omitted with reasons. Gross returns before costs, taxes and slippage; current editorial universe and reporting-date weights, not the manager actual portfolio or an achievable-return claim.',
  investors: [], failures: []
};

// 基准:QQQ 同期
const qqq = await prices('QQQ');
if (!qqq) throw new Error('QQQ adjusted-price calendar unavailable; keep prior snapshot');

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

    const legs = [];
    for (let i = 0; i < filings.length - 1; i++) {
      const b = await basketOf(cik, filings[i].acc);
      if (!b?.weights.length) throw new Error('no equity AI basket for ' + filings[i].filed);
      const maps = new Map();
      for (const { t: symbol } of b.weights) maps.set(symbol, await prices(symbol));
      const leg = calculateLeg(b.weights, maps, qqq, filings[i].filed, filings[i + 1].filed);
      legs.push({ ...leg, accession: filings[i].acc, accepted: filings[i].accepted,
        source: `https://www.sec.gov/Archives/edgar/data/${Number(cik)}/${filings[i].acc}/`,
        excludedOptions: b.excludedOptions });
    }
    const { cumulativeReturn, benchmarkQQQ } = summarizeLegs(legs);
    out.investors.push({ slug: t.slug, name: t.name, entityName: name, cik,
      from: legs[0].from, to: legs[legs.length - 1].to, quarters: legs.length,
      cumulativeReturn, benchmarkQQQ,
      entryDate: legs[0].entryDate, exitDate: legs[legs.length - 1].exitDate,
      legs });
    console.log(`${t.name}: ${cumulativeReturn}% gross, QQQ ${benchmarkQQQ}%, ${legs.length} contiguous quarters`);
  } catch (e) {
    out.failures.push({ slug: t.slug, reason: e.message });
    console.log(`❌ ${t.name.padEnd(12)} ${e.message}`);
  }
}
out.investors.sort((a, b) => b.cumulativeReturn - a.cumulativeReturn);
if (!out.investors.length) throw new Error('No complete histories; prior snapshot preserved');
writeFileSync('lib/data/copy-homework.json', JSON.stringify(out, null, 2) + '\n');
console.log(`\n${out.investors.length} 位可回测 → lib/data/copy-homework.json`);

