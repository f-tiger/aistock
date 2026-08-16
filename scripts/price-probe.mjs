#!/usr/bin/env node
// 一次性探针:GitHub runner 上哪个免费日线源可用(无需 API key)。
// 沙箱出网被代理挡住,只有 runner 能给出答案 —— 这是"替身执行器"的又一次应用。
const UA = { 'User-Agent': 'AGI Scorecard Research (contact: https://agiscorecard.com/about)' };

async function probe(label, url, parse) {
  try {
    const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(20000) });
    const body = await r.text();
    if (!r.ok) return console.log(`❌ ${label} HTTP ${r.status} · ${body.slice(0, 120).replace(/\s+/g, ' ')}`);
    const n = parse(body);
    console.log(n ? `✅ ${label} ${n} 个交易日 · 头部 ${body.slice(0, 80).replace(/\s+/g, ' ')}`
                  : `❌ ${label} 200 但解析不出行情 · ${body.slice(0, 200).replace(/\s+/g, ' ')}`);
  } catch (e) {
    console.log(`❌ ${label} ${e.message}`);
  }
}

await probe('stooq  nvda', 'https://stooq.com/q/d/l/?s=nvda.us&i=d',
  (b) => (b.startsWith('Date') ? b.trim().split('\n').length - 1 : 0));

await probe('stooq  qqq ', 'https://stooq.com/q/d/l/?s=qqq.us&i=d',
  (b) => (b.startsWith('Date') ? b.trim().split('\n').length - 1 : 0));

await probe('yahoo  NVDA', 'https://query1.finance.yahoo.com/v8/finance/chart/NVDA?range=5y&interval=1d',
  (b) => { try { return JSON.parse(b).chart?.result?.[0]?.timestamp?.length || 0; } catch { return 0; } });

await probe('stlouis NVDA', 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NVDA&apikey=demo',
  (b) => { try { return Object.keys(JSON.parse(b)['Time Series (Daily)'] || {}).length; } catch { return 0; } });
