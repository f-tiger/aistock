import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import { scoreBand, type ScoreBand } from '@/lib/data/score';

const bandStyles: Record<ScoreBand, string> = {
  strong: 'border-gain/40 bg-gain/10 text-gain',
  consensus: 'border-accent/40 bg-accent/10 text-accent',
  split: 'border-amber-400/40 bg-amber-400/10 text-amber-300',
  weak: 'border-white/15 bg-white/5 text-slate-400',
};

/** Compact Consensus Score pill: number + band label. */
export default function ScoreBadge({
  score,
  locale,
  size = 'md',
}: {
  score: number;
  locale: Locale;
  size?: 'md' | 'lg';
}) {
  const band = scoreBand(score);
  const sizeCls = size === 'lg' ? 'px-3.5 py-1.5 text-sm' : 'px-2.5 py-0.5 text-xs';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${bandStyles[band]} ${sizeCls}`}
      title={`${dict.score.name[locale]} · ${dict.score.note[locale]}`}
    >
      <span className="font-mono">{score}</span>
      <span>{dict.score.bands[band][locale]}</span>
    </span>
  );
}
