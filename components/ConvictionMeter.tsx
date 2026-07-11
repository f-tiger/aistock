import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import type { Conviction } from '@/lib/data/score';
import CompassGauge from '@/components/CompassGauge';
import ShareBar from '@/components/ShareBar';

/**
 * AI Conviction Index — the site's flagship single-number read. A metric no 13F
 * aggregator publishes, built to be quoted and shared. Educational, not a forecast.
 */
export default function ConvictionMeter({ conviction, locale }: { conviction: Conviction; locale: Locale }) {
  const c = dict.score.conviction;
  const netLabel = conviction.netTilt >= 0 ? c.netAdding[locale] : c.netTrimming[locale];

  return (
    <div className="card">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <div className="shrink-0">
          <CompassGauge
            score={conviction.index}
            ticker={locale === 'zh' ? '共识' : 'AI'}
            label={c.bands[conviction.band][locale]}
            locale={locale}
            size={188}
          />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white">{c.title[locale]}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{c.desc[locale]}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="pill">
              {conviction.breadth} {c.breadth[locale]}
            </span>
            <span className={`pill ${conviction.netTilt >= 0 ? 'text-gain' : 'text-loss'}`}>
              {conviction.netTilt >= 0 ? '▲' : '▼'} {netLabel}
            </span>
            <Link href={`/${locale}/methodology#ccs`} className="pill hover:border-accent/50 hover:text-white">
              {dict.score.name[locale]}
            </Link>
          </div>
          <div className="mt-4">
            <ShareBar locale={locale} text={c.share[locale].replace('{n}', String(conviction.index))} />
          </div>
        </div>
      </div>
    </div>
  );
}
