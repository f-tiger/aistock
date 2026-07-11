import { getStocks, type StockDetail } from './stocks';

/**
 * Programmatic-SEO pair catalog: every unordered stock pair gets a static
 * "A vs B" page targeting real comparison queries (e.g. "NVDA vs AMD 怎么选").
 * 12 stocks → 66 pairs × 2 locales.
 */
export type Pair = { slug: string; a: StockDetail; b: StockDetail };

export function getPairs(): Pair[] {
  const stocks = getStocks();
  const pairs: Pair[] = [];
  for (let i = 0; i < stocks.length; i++) {
    for (let j = i + 1; j < stocks.length; j++) {
      const a = stocks[i];
      const b = stocks[j];
      pairs.push({ slug: pairSlug(a.ticker, b.ticker), a, b });
    }
  }
  return pairs;
}

export function pairSlug(a: string, b: string): string {
  const [x, y] = [a, b].sort();
  return `${x.toLowerCase()}-vs-${y.toLowerCase()}`;
}

export function getPair(slug: string): Pair | undefined {
  return getPairs().find((p) => p.slug === slug);
}
