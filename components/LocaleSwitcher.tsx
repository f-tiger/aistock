'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale, isLocale } from '@/lib/i18n/config';

/** Swaps the leading /zh or /en segment of the current path. */
function withLocale(pathname: string, next: Locale): string {
  const segments = pathname.split('/');
  // segments[0] === '' because pathname starts with '/'
  if (segments[1] && isLocale(segments[1])) {
    segments[1] = next;
  } else {
    segments.splice(1, 0, next);
  }
  const joined = segments.join('/');
  return joined.startsWith('/') ? joined : `/${joined}`;
}

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const labels: Record<Locale, string> = { zh: '中文', en: 'EN' };

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-0.5 text-xs">
      {locales.map((l) => (
        <Link
          key={l}
          href={withLocale(pathname, l)}
          aria-current={l === locale ? 'true' : undefined}
          className={
            l === locale
              ? 'rounded-full bg-accent px-3 py-1 font-semibold text-ink-950'
              : 'rounded-full px-3 py-1 font-medium text-slate-300 hover:text-white'
          }
        >
          {labels[l]}
        </Link>
      ))}
    </div>
  );
}
