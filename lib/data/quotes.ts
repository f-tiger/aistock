/**
 * Client-side live-quote loader.
 *
 * Pages stay static (output: 'export'); quotes are fetched in the browser from a
 * configurable endpoint (default the Cloudflare Pages Function at /api/quote).
 * Requests made within the same tick are coalesced into ONE batched call, and
 * results are cached. Any failure resolves to `null` so the UI degrades
 * gracefully (shows “—”) and never blocks rendering — e.g. when no API key is
 * configured yet.
 */
export type Quote = {
  price: number;
  change: number;
  changePct: number;
  currency?: string;
};

const ENDPOINT = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT || '/api/quote';

const cache = new Map<string, Quote | null>();
const resolvers = new Map<string, ((q: Quote | null) => void)[]>();
let queue = new Set<string>();
let scheduled: Promise<void> | null = null;

function schedule(): Promise<void> {
  if (scheduled) return scheduled;
  scheduled = Promise.resolve().then(async () => {
    const symbols = [...queue];
    queue = new Set();
    scheduled = null;

    let data: Record<string, Quote> = {};
    try {
      const res = await fetch(`${ENDPOINT}?symbols=${encodeURIComponent(symbols.join(','))}`);
      if (res.ok) data = (await res.json()) as Record<string, Quote>;
    } catch {
      /* network/endpoint unavailable → graceful fallback below */
    }

    for (const s of symbols) {
      const q = data[s] ?? null;
      cache.set(s, q);
      (resolvers.get(s) ?? []).forEach((resolve) => resolve(q));
      resolvers.delete(s);
    }
  });
  return scheduled;
}

/** Resolve a single symbol's quote (or null if unavailable). Batched + cached. */
export function getQuote(symbol: string): Promise<Quote | null> {
  const s = symbol.trim().toUpperCase();
  if (cache.has(s)) return Promise.resolve(cache.get(s) ?? null);

  return new Promise((resolve) => {
    const list = resolvers.get(s) ?? [];
    list.push(resolve);
    resolvers.set(s, list);
    queue.add(s);
    void schedule();
  });
}

/** True for plausible exchange tickers (skip placeholders like “—”). */
export function isQuotableTicker(ticker: string): boolean {
  return /^[A-Za-z][A-Za-z.\-]{0,9}$/.test(ticker.trim());
}
