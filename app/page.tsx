'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { defaultLocale } from '@/lib/i18n/config';

/**
 * Root entry. Static hosts (Cloudflare Pages) also get a `_redirects` rule,
 * but this client redirect guarantees a bounce to the default locale anywhere.
 */
export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return (
    <main className="grid min-h-screen place-items-center text-center">
      <div className="space-y-4">
        <div className="grid h-12 w-12 mx-auto place-items-center rounded-xl bg-accent text-ink-950 font-bold">
          AI
        </div>
        <p className="text-slate-400">Redirecting… / 正在跳转…</p>
        <div className="flex justify-center gap-3">
          <Link href="/zh" className="btn-primary">中文</Link>
          <Link href="/en" className="btn-ghost">English</Link>
        </div>
      </div>
    </main>
  );
}
