import Link from 'next/link';
import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import type { Investor } from '@/lib/data/types';
import StanceBadge from './StanceBadge';

export default function InvestorCard({
  investor,
  locale,
}: {
  investor: Investor;
  locale: Locale;
}) {
  return (
    <Link href={`/${locale}/investors/${investor.slug}`} className="card group flex flex-col">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-lg font-bold text-white">{investor.name[locale]}</h3>
        {investor.stance && <StanceBadge stance={investor.stance} locale={locale} />}
      </div>
      <span className="mt-0.5 text-xs text-slate-500">{investor.firm[locale]}</span>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{investor.summary[locale]}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {investor.holdings.slice(0, 4).map((h) => (
          <span key={h.ticker} className="pill font-mono">{h.ticker}</span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-slate-500">{dict.labels.asOf[locale]}: {investor.asOf}</span>
        <span className="font-medium text-accent group-hover:text-accent-soft">
          {dict.cta.viewProfile[locale]} →
        </span>
      </div>
    </Link>
  );
}
