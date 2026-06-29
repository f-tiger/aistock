import Link from 'next/link';
import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import type { AiTheme } from '@/lib/data/types';

export default function ThemeCard({
  theme,
  locale,
  href,
}: {
  theme: AiTheme;
  locale: Locale;
  href?: string;
}) {
  const body = (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-lg font-bold text-white">{theme.name[locale]}</h3>
        <span className="text-xs text-slate-500">{theme.stocks.length} {locale === 'zh' ? '标的' : 'names'}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{theme.summary[locale]}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {theme.stocks
          .filter((s) => s.ticker !== 'theme')
          .map((s) => (
            <span key={s.ticker} className="pill font-mono">{s.ticker}</span>
          ))}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="card block">
        {body}
        <span className="mt-4 inline-block text-xs font-medium text-accent">
          {dict.cta.learnMore[locale]} →
        </span>
      </Link>
    );
  }
  return <div className="card">{body}</div>;
}
