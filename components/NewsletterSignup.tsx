'use client';

import { useState } from 'react';
import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';

const ENDPOINT = process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT || '/api/subscribe';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = 'idle' | 'submitting' | 'success' | 'invalid' | 'error';

/**
 * Newsletter capture — the first conversion element of the funnel. Posts to a
 * Cloudflare Pages Function (or any endpoint via NEXT_PUBLIC_SUBSCRIBE_ENDPOINT).
 * Degrades honestly: if the endpoint is unconfigured, it reports a soft error
 * instead of pretending to subscribe.
 */
export default function NewsletterSignup({ locale, source = 'newsletter' }: { locale: Locale; source?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const t = dict.newsletter;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus('invalid');
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: value, locale, source }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-gain/30 bg-gain/10 p-6 text-center">
        <p className="font-semibold text-gain">✓ {t.success[locale]}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-accent/25 bg-accent/5 p-6">
      <h2 className="text-lg font-bold text-white">{t.title[locale]}</h2>
      <p className="mt-1.5 text-sm text-slate-300">{t.desc[locale]}</p>
      <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'invalid') setStatus('idle');
          }}
          placeholder={t.placeholder[locale]}
          autoComplete="email"
          className="w-full flex-1 rounded-lg border border-white/15 bg-ink-900 px-4 py-2.5 text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:border-accent/60"
        />
        <button type="submit" disabled={status === 'submitting'} className="btn-primary disabled:opacity-60">
          {status === 'submitting' ? t.submitting[locale] : t.button[locale]}
        </button>
      </form>
      {status === 'invalid' && <p className="mt-2 text-xs text-amber-300">{t.invalid[locale]}</p>}
      {status === 'error' && <p className="mt-2 text-xs text-loss">{t.error[locale]}</p>}
    </div>
  );
}
