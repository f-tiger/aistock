import Link from 'next/link';
import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import type { StockScore } from '@/lib/data/score';
import ScoreBadge from './ScoreBadge';

/** Full Consensus Score breakdown for a stock detail page — the "tool" view. */
export default function ScorePanel({ score, locale }: { score: StockScore; locale: Locale }) {
  const rows = [
    { label: dict.score.holdersScore[locale], value: score.holdersScore },
    { label: dict.score.actionScore[locale], value: score.actionScore },
    { label: dict.score.diversityBonus[locale], value: score.diversityBonus },
  ];

  return (
    <section className="rounded-2xl border border-accent/25 bg-accent/5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-white">
          {dict.score.name[locale]}
          <span className="ml-2 font-mono text-2xl text-accent">{score.score}</span>
        </h2>
        <ScoreBadge score={score.score} locale={locale} size="lg" />
      </div>

      {/* score bar */}
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
          style={{ width: `${score.score}%` }}
        />
      </div>

      {/* components */}
      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
        {rows.map((r) => (
          <div key={r.label} className="rounded-lg bg-white/[0.04] px-3 py-2">
            <dt className="text-xs text-slate-400">{r.label}</dt>
            <dd className={`font-mono font-semibold ${r.value >= 0 ? 'text-slate-200' : 'text-loss'}`}>
              {r.value >= 0 ? '+' : ''}{r.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* per-investor contributions */}
      <h3 className="mt-5 text-sm font-semibold text-slate-300">{dict.score.breakdown[locale]}</h3>
      <ul className="mt-2 space-y-1.5 text-sm">
        {score.contributions.map((c) => (
          <li key={c.slug} className="flex items-baseline justify-between gap-3">
            <span>
              <Link href={`/${locale}/investors/${c.slug}`} className="link-accent font-medium">
                {c.investor[locale]}
              </Link>
              <span className="ml-2 text-slate-400">{dict.score.actions[c.action][locale]}</span>
            </span>
            <span className={`font-mono ${c.points >= 0 ? 'text-gain' : 'text-loss'}`}>
              {c.points >= 0 ? '+' : ''}{c.points}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-slate-500">
        {dict.score.note[locale]}{' '}
        <Link href={`/${locale}/methodology#ccs`} className="link-accent">
          {dict.cta.learnMore[locale]} →
        </Link>
      </p>
    </section>
  );
}
