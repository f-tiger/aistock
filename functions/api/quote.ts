// Cloudflare Pages Function: GET /api/quote?symbols=NVDA,AMZN
//
// Proxies to Finnhub using the FINNHUB_API_KEY secret so the key is never
// exposed to the browser. Returns a map of { TICKER: { price, change, changePct } }.
// If no key is configured, returns {} (503) and the client gracefully falls back.
//
// NOTE: This lives in the Cloudflare-Pages `functions/` convention dir. It is
// NOT processed by `next build` (and is excluded from tsconfig). Test locally
// with: `npm run build && npx wrangler pages dev out`.

type Env = { FINNHUB_API_KEY?: string };

type QuoteOut = { price: number; change: number; changePct: number; currency: string };

const JSON_HEADERS: Record<string, string> = {
  'content-type': 'application/json; charset=utf-8',
  'access-control-allow-origin': '*',
  'cache-control': 'public, max-age=30',
};

export async function onRequestGet(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const url = new URL(request.url);

  const symbols = (url.searchParams.get('symbols') ?? '')
    .split(',')
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean)
    .slice(0, 25); // cap fan-out

  if (!env.FINNHUB_API_KEY) {
    return new Response(JSON.stringify({}), { status: 503, headers: JSON_HEADERS });
  }
  if (symbols.length === 0) {
    return new Response(JSON.stringify({}), { status: 200, headers: JSON_HEADERS });
  }

  const out: Record<string, QuoteOut> = {};

  await Promise.all(
    symbols.map(async (symbol) => {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${env.FINNHUB_API_KEY}`,
        );
        if (!res.ok) return;
        // Finnhub /quote: { c: current, d: change, dp: percentChange, ... }
        const d = (await res.json()) as { c?: number; d?: number; dp?: number };
        if (typeof d.c === 'number' && d.c > 0) {
          out[symbol] = {
            price: d.c,
            change: typeof d.d === 'number' ? d.d : 0,
            changePct: typeof d.dp === 'number' ? d.dp : 0,
            currency: 'USD',
          };
        }
      } catch {
        /* skip this symbol on error */
      }
    }),
  );

  return new Response(JSON.stringify(out), { status: 200, headers: JSON_HEADERS });
}
