import type { AiStock } from './types';
import { themes } from './themes';

/** A stock aggregated across the catalog, with the themes it belongs to. */
export type StockDetail = AiStock & {
  themeIds: string[];
  /** Illustrative normalized trend (NOT real history) — for the sparkline. */
  trend: number[];
};

/**
 * Deterministic, illustrative trend per ticker. Clearly NOT real market history
 * — used only to give the sparkline a stable shape. A real candle series can
 * later replace this via a provider method without touching the UI.
 */
function illustrativeTrend(ticker: string): number[] {
  // seed from the ticker so the shape is stable per stock (no Math.random)
  let seed = 0;
  for (let i = 0; i < ticker.length; i++) seed = (seed * 31 + ticker.charCodeAt(i)) % 9973;
  const points: number[] = [];
  let v = 50 + (seed % 20);
  for (let i = 0; i < 16; i++) {
    // bounded pseudo-walk driven by the seed, deterministic
    seed = (seed * 1103515245 + 12345) % 2147483648;
    const step = ((seed >> 8) % 17) - 7; // -7..9, slight upward bias
    v = Math.max(8, Math.min(96, v + step));
    points.push(v);
  }
  return points;
}

/** All unique catalog stocks (excludes non-ticker placeholders like the energy theme row). */
export function getStocks(): StockDetail[] {
  const map = new Map<string, StockDetail>();
  for (const theme of themes) {
    for (const s of theme.stocks) {
      // skip non-ticker placeholders (e.g. the energy theme's 'theme' row)
      if (!/^[A-Z][A-Z.\-]{0,9}$/.test(s.ticker)) continue;
      const existing = map.get(s.ticker);
      if (existing) {
        if (!existing.themeIds.includes(theme.id)) existing.themeIds.push(theme.id);
      } else {
        map.set(s.ticker, { ...s, themeIds: [theme.id], trend: illustrativeTrend(s.ticker) });
      }
    }
  }
  return [...map.values()].sort((a, b) => a.ticker.localeCompare(b.ticker));
}

const STOCKS = getStocks();
const STOCK_TICKERS = new Set(STOCKS.map((s) => s.ticker));

export function getStock(ticker: string): StockDetail | undefined {
  return STOCKS.find((s) => s.ticker === ticker);
}

/** Whether a ticker has its own detail page (used to decide whether to linkify). */
export function hasStockPage(ticker: string): boolean {
  return STOCK_TICKERS.has(ticker.trim());
}
