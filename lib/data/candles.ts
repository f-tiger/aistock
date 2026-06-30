/**
 * Client-side historical candles loader. Fetches a close-price series from a
 * configurable endpoint (default the Cloudflare Pages Function /api/candles).
 * Returns null on any failure / no data so callers fall back to the static
 * illustrative trend. Results are cached per symbol.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CANDLES_ENDPOINT || '/api/candles';

const cache = new Map<string, number[] | null>();

export async function fetchCandles(symbol: string, days = 60): Promise<number[] | null> {
  const s = symbol.trim().toUpperCase();
  const key = `${s}:${days}`;
  if (cache.has(key)) return cache.get(key) ?? null;

  let series: number[] | null = null;
  try {
    const res = await fetch(`${ENDPOINT}?symbol=${encodeURIComponent(s)}&days=${days}`);
    if (res.ok) {
      const data = (await res.json()) as { closes?: number[] };
      if (Array.isArray(data.closes) && data.closes.length >= 2) series = data.closes;
    }
  } catch {
    /* endpoint unavailable → fall back to illustrative trend */
  }
  cache.set(key, series);
  return series;
}
