import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import type { Stance } from '@/lib/data/types';

const styles: Record<Stance, string> = {
  bull: 'border-gain/40 bg-gain/10 text-gain',
  cautious: 'border-amber-400/40 bg-amber-400/10 text-amber-300',
  bear: 'border-loss/40 bg-loss/10 text-loss',
};

const icons: Record<Stance, string> = { bull: '▲', cautious: '◆', bear: '▼' };

export default function StanceBadge({ stance, locale }: { stance: Stance; locale: Locale }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[stance]}`}>
      <span aria-hidden>{icons[stance]}</span>
      {dict.stance[stance][locale]}
    </span>
  );
}
