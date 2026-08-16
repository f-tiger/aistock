'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';

/**
 * 复制粘贴的 iframe 片段。嵌入是本站唯一不需要站长动手的外链引擎:
 * 每一个外部嵌入都是一个分发节点,而且它自己会随季度回测更新。
 */
export default function EmbedCode({ locale, src, label }: { locale: Locale; src: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const code = `<iframe src="${src}" width="100%" height="760" style="border:1px solid #1c2942;border-radius:12px" loading="lazy" title="Copy-Homework Scorecard"></iframe>`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.('event', 'embed_copy', {
        location: 'track_record',
      });
    } catch {
      /* 剪贴板不可用时,代码块本身仍然可以手动选中复制 */
    }
  }

  return (
    <div className="mt-3">
      <pre className="overflow-x-auto rounded-xl border border-white/10 bg-ink-900/70 p-4 text-xs text-slate-300">
        <code>{code}</code>
      </pre>
      <button type="button" onClick={copy} className="btn-ghost mt-3">
        {copied ? dict.share.copied[locale] : label}
      </button>
    </div>
  );
}
