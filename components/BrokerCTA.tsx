import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import { brokers } from '@/lib/data/brokers';

/**
 * Broker referral CTA — the monetization element of the funnel. Links carry
 * rel="sponsored" and the section always shows a disclosure line. Swap the
 * URLs in lib/data/brokers.ts for affiliate links to activate revenue.
 */
export default function BrokerCTA({ locale }: { locale: Locale }) {
  const t = dict.broker;
  return (
    <section className="rounded-2xl border border-white/10 bg-ink-900/60 p-6">
      <h2 className="text-lg font-bold text-white">{t.title[locale]}</h2>
      <p className="mt-1.5 text-sm text-slate-300">{t.desc[locale]}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {brokers.map((b) => (
          <a
            key={b.id}
            href={b.url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="card group p-4"
            data-broker={b.id}
          >
            <div className="font-bold text-white">{b.name[locale]}</div>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{b.blurb[locale]}</p>
            <span className="mt-2 inline-block text-xs font-medium text-accent group-hover:text-accent-soft">
              {t.cta[locale]} ↗
            </span>
          </a>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-500">{t.disclosure[locale]}</p>
    </section>
  );
}
