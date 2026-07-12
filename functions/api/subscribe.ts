// Cloudflare Pages Function: subscription endpoint.
//   POST /api/subscribe  { email, locale, source? }  → record a subscriber
//   GET  /api/subscribe                              → { count } (social proof)
//
// Fully automated pipeline, all steps best-effort and gracefully degrading:
//   1. Store the subscriber in KV (bound as `SUBSCRIBERS`).
//   2. Maintain an approximate subscriber counter (`stat:count`).
//   3. Notify the owner's Telegram bot on every NEW subscriber
//      (secrets TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID).
//   4. Send a welcome email when a provider is configured
//      (secrets RESEND_API_KEY + RESEND_FROM); skipped silently otherwise.
//
// Missing KV → 503 and the client shows an honest "unavailable" message.
// Missing Telegram/Resend secrets → those steps are skipped, subscription still
// succeeds. Not processed by `next build` (excluded from tsconfig).

type KVNamespace = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

type Env = {
  SUBSCRIBERS?: KVNamespace;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
};

const JSON_HEADERS: Record<string, string> = {
  'content-type': 'application/json; charset=utf-8',
  'access-control-allow-origin': '*',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Resolve the owner chat id with the least possible setup:
 *   explicit TELEGRAM_CHAT_ID  →  KV cache (stat:chat_id)  →  auto-discover via
 *   getUpdates (the owner just has to message the bot once), then cache it.
 * So configuring the bot token alone is enough — no manual chat-id step.
 */
async function resolveChatId(env: Env): Promise<string | null> {
  if (env.TELEGRAM_CHAT_ID) return env.TELEGRAM_CHAT_ID;
  if (env.SUBSCRIBERS) {
    const cached = await env.SUBSCRIBERS.get('stat:chat_id');
    if (cached) return cached;
  }
  if (!env.TELEGRAM_BOT_TOKEN) return null;
  try {
    const r = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/getUpdates?limit=10`);
    const j = (await r.json()) as { result?: Array<Record<string, { chat?: { id?: number | string } }>> };
    const updates = Array.isArray(j.result) ? j.result : [];
    for (let i = updates.length - 1; i >= 0; i--) {
      const u = updates[i];
      const chat =
        u?.message?.chat ?? u?.edited_message?.chat ?? u?.channel_post?.chat ?? u?.my_chat_member?.chat;
      if (chat && chat.id != null) {
        const id = String(chat.id);
        if (env.SUBSCRIBERS) await env.SUBSCRIBERS.put('stat:chat_id', id);
        return id;
      }
    }
  } catch {
    /* getUpdates unavailable (e.g. a webhook is set) — fall through */
  }
  return null;
}

type NotifyStatus = 'sent' | 'no-token' | 'no-chat' | 'error';

async function notifyTelegram(env: Env, text: string): Promise<NotifyStatus> {
  if (!env.TELEGRAM_BOT_TOKEN) return 'no-token';
  const chatId = await resolveChatId(env);
  if (!chatId) {
    await recordNotify(env, 'no-chat');
    return 'no-chat';
  }
  try {
    const resp = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    });
    const jr = (await resp.json().catch(() => ({}))) as { ok?: boolean; description?: string };
    const status: NotifyStatus = jr.ok ? 'sent' : 'error';
    await recordNotify(env, status, jr.description);
    return status;
  } catch {
    await recordNotify(env, 'error');
    return 'error';
  }
}

async function recordNotify(env: Env, status: NotifyStatus, description?: string): Promise<void> {
  if (!env.SUBSCRIBERS) return;
  try {
    await env.SUBSCRIBERS.put('stat:last_notify', JSON.stringify({ status, description: description ?? '' }));
  } catch {
    /* best-effort */
  }
}

async function sendWelcome(env: Env, email: string, locale: string): Promise<void> {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM) return;
  const zh = locale === 'zh';
  const subject = zh ? 'AI 投资罗盘 · 订阅成功' : 'AI Investing Compass · you’re subscribed';
  const html = zh
    ? `<div style="font-family:system-ui,sans-serif;line-height:1.6">
         <h2>欢迎加入 AI 投资罗盘 🧭</h2>
         <p>你已订阅季度 13F 更新。每季度大佬持仓变化 + 罗盘共识分变动,一封邮件讲清楚。</p>
         <p>先试试免费的 <a href="https://ai-investing-compass.pages.dev/zh/tools/portfolio">组合共识体检</a>,
         看看传奇投资人和你的持仓有多大共识。</p>
         <p style="color:#888;font-size:13px">仅供教育与信息参考,不构成投资建议。随时可退订。</p>
       </div>`
    : `<div style="font-family:system-ui,sans-serif;line-height:1.6">
         <h2>Welcome to AI Investing Compass 🧭</h2>
         <p>You're subscribed to quarterly 13F updates — how the legends moved plus Consensus Score changes, in one email.</p>
         <p>Try the free <a href="https://ai-investing-compass.pages.dev/en/tools/portfolio">Portfolio Consensus Check</a>
         to see how much the legends agree with your holdings.</p>
         <p style="color:#888;font-size:13px">For education and information only; not investment advice. Unsubscribe anytime.</p>
       </div>`;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: env.RESEND_FROM, to: email, subject, html }),
    });
  } catch {
    /* best-effort */
  }
}

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
  let source = '';
  try {
    const body = (await request.json()) as { email?: string; locale?: string; source?: string };
    email = (body.email ?? '').trim().toLowerCase();
    locale = (body.locale ?? '').slice(0, 8);
    source = (body.source ?? 'newsletter').slice(0, 24);
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
  const existing = await env.SUBSCRIBERS.get(key);
  const isNew = !existing;

  await env.SUBSCRIBERS.put(
    key,
    JSON.stringify({
      email,
      locale,
      source,
      ts: Date.now(),
      ua: request.headers.get('user-agent') ?? '',
      ref: request.headers.get('referer') ?? '',
    }),
  );

  let count = 0;
  if (isNew) {
    // Approximate counter (KV is eventually consistent — fine for social proof).
    const raw = await env.SUBSCRIBERS.get('stat:count');
    count = (parseInt(raw ?? '0', 10) || 0) + 1;
    await env.SUBSCRIBERS.put('stat:count', String(count));

    const tag = source === 'pro' ? '💎 Pro 候补' : '📩 订阅';
    await notifyTelegram(
      env,
      `🎉 <b>新用户 · ${tag}</b>\n<b>${email}</b>\n来源: ${source} · 语言: ${locale || '—'}\n累计订阅: <b>${count}</b>\nAI 投资罗盘`,
    );
    await sendWelcome(env, email, locale);
  }

  return new Response(JSON.stringify({ ok: true, already: !isNew }), {
    status: 200,
    headers: JSON_HEADERS,
  });
}

export async function onRequestGet(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;
  const url = new URL(request.url);

  // Non-sensitive wiring diagnostic (booleans + last notify status; no secrets).
  if (url.searchParams.get('health') === '1') {
    const chat = env.TELEGRAM_BOT_TOKEN ? await resolveChatId(env).catch(() => null) : null;
    let lastNotify: unknown = null;
    if (env.SUBSCRIBERS) {
      const raw = await env.SUBSCRIBERS.get('stat:last_notify');
      lastNotify = raw ? JSON.parse(raw) : null;
    }
    return new Response(
      JSON.stringify({
        kv: !!env.SUBSCRIBERS,
        telegram_token: !!env.TELEGRAM_BOT_TOKEN,
        telegram_chat: !!chat,
        resend: !!(env.RESEND_API_KEY && env.RESEND_FROM),
        last_notify: lastNotify,
      }),
      { status: 200, headers: { ...JSON_HEADERS, 'cache-control': 'no-store' } },
    );
  }

  let count = 0;
  if (env.SUBSCRIBERS) {
    const raw = await env.SUBSCRIBERS.get('stat:count');
    count = parseInt(raw ?? '0', 10) || 0;
  }
  return new Response(JSON.stringify({ count }), {
    status: 200,
    headers: { ...JSON_HEADERS, 'cache-control': 'public, max-age=300' },
  });
}
