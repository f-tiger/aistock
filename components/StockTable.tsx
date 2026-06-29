import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import type { AiStock } from '@/lib/data/types';

export default function StockTable({ stocks, locale }: { stocks: AiStock[]; locale: Locale }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-4 py-3 font-semibold">{dict.labels.tickers[locale]}</th>
            <th className="px-4 py-3 font-semibold">{dict.labels.style[locale]}</th>
            <th className="px-4 py-3 font-semibold text-gain">{dict.labels.bullCase[locale]}</th>
            <th className="px-4 py-3 font-semibold text-loss">{dict.labels.risks[locale]}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {stocks.map((s) => (
            <tr key={s.ticker} className="align-top hover:bg-white/[0.03]">
              <td className="px-4 py-3">
                <div className="font-mono font-semibold text-white">{s.ticker}</div>
                <div className="text-xs text-slate-500">{s.name[locale]}</div>
              </td>
              <td className="px-4 py-3 text-slate-300">{s.role[locale]}</td>
              <td className="px-4 py-3 text-slate-300">{s.bull[locale]}</td>
              <td className="px-4 py-3 text-slate-300">{s.risk[locale]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
