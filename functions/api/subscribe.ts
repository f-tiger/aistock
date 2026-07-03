// Cloudflare Pages Function: POST /api/subscribe  { email, locale }
//
// Stores subscribers in a Cloudflare KV namespace bound as `SUBSCRIBERS`
// (Pages project → Settings → Bindings → KV namespace). Without the binding it
// returns 503 and the client shows an honest "unavailable" message.
//
// Export later via:  npx wrangler kv key list --binding SUBSCRIBERS
// Not processed by `next build` (excluded from tsconfig).

type Env = { SUBSCRIBERS?: KVNamespace };

// Minimal KV surface we use (avoids needing @cloudflare/workers-types).
type KVNamespace = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

const JSON_HEADERS: Record<string, string> = {
  'content-type': 'application/json; charset=utf-8',
  'access-control-allow-origin': '*',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  if (!env.SUBSCRIBERS) {
    return new Response(JSON.stringify({ ok: false, reason: 'not-configured' }), {
      status: 503,
      headers: JSON_HEADERS,
    });
  }

  let email = '';
  let locale = '';
  try {
    const body = (await request.json()) as { email?: string; locale?: string };
    email = (body.email ?? '').trim().toLowerCase();
    locale = (body.locale ?? '').slice(0, 8);
  } catch {
    /* fall through to validation failure */
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return new Response(JSON.stringify({ ok: false, reason: 'invalid-email' }), {
      status: 400,
      headers: JSON_HEADERS,
    });
  }

  const key = `email:${email}`;
  // Idempotent: re-subscribing the same address just refreshes the record.
  await env.SUBSCRIBERS.put(
    key,
    JSON.stringify({ email, locale, ts: Date.now(), ua: request.headers.get('user-agent') ?? '' }),
  );

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: JSON_HEADERS });
}
