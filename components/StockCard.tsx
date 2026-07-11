import Link from 'next/link';
import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import type { StockDetail } from '@/lib/data/stocks';
import { getTheme } from '@/lib/data/themes';
import { getScore } from '@/lib/data/score';
import Sparkline from './Sparkline';
import LiveQuote from './LiveQuote';
import ScoreBadge from './ScoreBadge';

export default function StockCard({ stock, locale }: { stock: StockDetail; locale: Locale }) {
  const ccs = getScore(stock.ticker);
  return (
    <Link href={`/${locale}/stocks/${stock.ticker}`} className="card group flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="font-mono text-lg font-bold text-white">{stock.ticker}</span>
          <span className="ml-2 text-sm text-slate-400">{stock.name[locale]}</span>
          <div className="mt-1 text-xs text-slate-500">{stock.role[locale]}</div>
        </div>
        <Sparkline data={stock.trend} className="shrink-0 opacity-80" />
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <LiveQuote ticker={stock.ticker} />
        {ccs && <ScoreBadge score={ccs.score} locale={locale} />}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {stock.themeIds.map((id) => {
          const theme = getTheme(id);
          return theme ? <span key={id} className="pill">{theme.name[locale]}</span> : null;
        })}
      </div>
      <span className="mt-3 text-xs font-medium text-accent group-hover:text-accent-soft">
        {dict.labels.viewStock[locale]} →
      </span>
    </Link>
  );
}
