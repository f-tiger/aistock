import Link from 'next/link';
import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import { primaryLinks } from '@/lib/nav';
import LocaleSwitcher from './LocaleSwitcher';

export default function Navbar({ locale }: { locale: Locale }) {
  const base = `/${locale}`;
  const links = primaryLinks(locale);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink-950/80 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link href={base} className="flex items-center gap-2 font-bold text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-ink-950">AI</span>
          <span className="hidden sm:inline">{dict.brand[locale]}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <LocaleSwitcher locale={locale} />
      </nav>

      {/* compact link row for mobile */}
      <div className="container-page flex items-center gap-1 overflow-x-auto pb-2 md:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
