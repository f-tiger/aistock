// 每日行情快照刷新(纯确定性,无人值守)。
//
// 站长要求(2026-08-08):站点必须每天自己变新鲜,不依赖任何人工或外部 Agent。
// 本脚本从 lib/data/investors.ts 提取全部持仓 ticker(自维护:持仓变了宇宙自动变),
// 拉 Yahoo Finance v8 日线,算出 价格/日涨幅/52周位置,写入 lib/data/market-snapshot.json。
// daily-refresh.yml 每天运行它并把变更提交回 main → 触发部署 → 页面/站点图当日新鲜。
//
// 失败哲学:宁可保留昨天的快照,不写残缺数据——成功率 < 70% 时非零退出且不落盘,
// 工作流红灯可见,站上继续用旧快照(仍然是真实数据,只是旧一天)。
import { readFileSync, writeFileSync } from 'node:fs';

const SRC = new URL('../lib/data/investors.ts', import.meta.url);
const OUT = new URL('../lib/data/market-snapshot.json', import.meta.url);

const tickers = [...new Set(readFileSync(SRC, 'utf8').match(/ticker:\s*'([A-Z0-9.\-]+)'/g) ?? [])]
  .map((m) => m.match(/'([^']+)'/)[1])
  .sort();
if (tickers.length === 0) {
  console.error('no tickers extracted from investors.ts — refusing to write');
  process.exit(1);
}

// Yahoo 符号映射:BRK.B → BRK-B
const yahooSym = (t) => t.replace('.', '-');

async function fetchOne(t) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSym(t))}?interval=1d&range=1y`;
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; CompassRefresh/1.0)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const r = data?.chart?.result?.[0];
  const closes = (r?.indicators?.quote?.[0]?.close ?? []).filter((x) => x != null);
  const price = r?.meta?.regularMarketPrice ?? closes[closes.length - 1];
  if (!price || closes.length < 2) throw new Error('no data');
  // 真实前收:倒数第二根日线收盘(meta 的 chartPreviousClose 在部分区间参数下是区间首日)
  const prev = closes[closes.length - 2];
  const high52 = Math.max(...closes, price);
  const low52 = Math.min(...closes, price);
  const round = (x) => Math.round(x * 100) / 100;
  return {
    price: round(price),
    changePct: round(((price - prev) / prev) * 100),
    high52: round(high52),
    low52: round(low52),
    offHighPct: round(((price - high52) / high52) * 100),
    fromLowPct: round(((price - low52) / low52) * 100),
    currency: r?.meta?.currency ?? 'USD',
  };
}

const quotes = {};
let ok = 0;
for (const t of tickers) {
  try {
    quotes[t] = await fetchOne(t);
    ok++;
  } catch (e) {
    console.error(`${t}: ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 350)); // 温和限速,别惹恼数据源
}

console.log(`fetched ${ok}/${tickers.length}`);
if (ok < tickers.length * 0.7) {
  console.error('success rate below 70% — keeping previous snapshot');
  process.exit(1);
}

const snapshot = { asOf: new Date().toISOString().slice(0, 10), source: 'Yahoo Finance', quotes };
writeFileSync(OUT, JSON.stringify(snapshot, null, 2) + '\n');
console.log(`wrote market-snapshot.json (asOf ${snapshot.asOf})`);
