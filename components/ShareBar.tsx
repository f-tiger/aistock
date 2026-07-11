'use client';

import { useState } from 'react';
import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';

/** Copy-link + share-to-X buttons — the zero-dependency viral loop. */
export default function ShareBar({ locale, text }: { locale: Locale; text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  function shareX() {
    const url = `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'noopener');
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-slate-500">{dict.share.label[locale]}:</span>
      <button type="button" onClick={copy} className="pill transition hover:border-accent/50 hover:text-white">
        {copied ? dict.share.copied[locale] : dict.share.copy[locale]}
      </button>
      <button type="button" onClick={shareX} className="pill transition hover:border-accent/50 hover:text-white">
        {dict.share.toX[locale]}
      </button>
    </div>
  );
}
