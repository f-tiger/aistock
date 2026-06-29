import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import type { Investor } from '@/lib/data/types';
import type { ConsensusEntry } from '@/lib/data/consensus';

/** Ticker × investor grid; ✓ where an investor holds the ticker. */
export default function ConsensusMatrix({
  entries,
  investors,
  locale,
}: {
  entries: ConsensusEntry[];
  investors: Investor[];
  locale: Locale;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead className="bg-white/5 text-xs text-slate-400">
          <tr>
            <th className="sticky left-0 z-10 bg-ink-900 px-4 py-3 font-semibold">
              {dict.labels.tickers[locale]}
            </th>
            {investors.map((inv) => (
              <th key={inv.slug} className="px-3 py-3 text-center font-semibold whitespace-nowrap">
                {inv.name[locale]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {entries.map((entry) => {
            const holderSlugs = new Set(entry.holders.map((h) => h.slug));
            return (
              <tr key={entry.ticker} className="hover:bg-white/[0.03]">
                <th className="sticky left-0 z-10 bg-ink-900 px-4 py-2.5 text-left font-normal">
                  <span className="font-mono font-semibold text-white">{entry.ticker}</span>
                  <span className="ml-2 text-xs text-slate-500">{entry.name[locale]}</span>
                </th>
                {investors.map((inv) => (
                  <td key={inv.slug} className="px-3 py-2.5 text-center">
                    {holderSlugs.has(inv.slug) ? (
                      <span className="text-accent" aria-label="holds">✓</span>
                    ) : (
                      <span className="text-slate-700" aria-hidden>·</span>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
