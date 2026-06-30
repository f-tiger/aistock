// Cloudflare Pages Function: GET /api/candles?symbol=NVDA&days=60
//
// Returns { closes: number[] } of daily close prices via Finnhub, using the
// FINNHUB_API_KEY secret. Returns {} (503) with no key, or {} on any failure,
// so the client falls back to the static illustrative trend.
//
// Note: Finnhub's stock candle endpoint may require a paid plan; this function
// degrades gracefully if the upstream returns no data. Not processed by
// `next build` (excluded from tsconfig). Test with `npx wrangler pages dev out`.

type Env = { FINNHUB_API_KEY?: string };

const JSON_HEADERS: Record<string, string> = {
  'content-type': 'application/json; charset=utf-8',
  'access-control-allow-origin': '*',
  'cache-control': 'public, max-age=3600',
};

export async function onRequestGet(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;
  const url = new URL(request.url);

  const symbol = (url.searchParams.get('symbol') ?? '').trim().toUpperCase();
  const days = Math.min(Math.max(parseInt(url.searchParams.get('days') ?? '60', 10) || 60, 7), 365);

  if (!env.FINNHUB_API_KEY) {
    return new Response(JSON.stringify({}), { status: 503, headers: JSON_HEADERS });
  }
  if (!/^[A-Z][A-Z.\-]{0,9}$/.test(symbol)) {
    return new Response(JSON.stringify({}), { status: 200, headers: JSON_HEADERS });
  }

  const to = Math.floor(Date.now() / 1000);
  const from = to - days * 24 * 60 * 60;

  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${encodeURIComponent(symbol)}` +
        `&resolution=D&from=${from}&to=${to}&token=${env.FINNHUB_API_KEY}`,
    );
    if (res.ok) {
      const d = (await res.json()) as { s?: string; c?: number[] };
      if (d.s === 'ok' && Array.isArray(d.c) && d.c.length >= 2) {
        return new Response(JSON.stringify({ closes: d.c }), { status: 200, headers: JSON_HEADERS });
      }
    }
  } catch {
    /* fall through to empty */
  }

  return new Response(JSON.stringify({}), { status: 200, headers: JSON_HEADERS });
}
