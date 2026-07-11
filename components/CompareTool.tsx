'use client';

import { useState } from 'react';
import Link from 'next/link';
import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import type { StockDetail } from '@/lib/data/stocks';
import { getScore } from '@/lib/data/score';
import ScoreBadge from './ScoreBadge';
import LiveQuote from './LiveQuote';

/**
 * Side-by-side stock comparison — the feature incumbents paywall, offered free
 * here as a differentiator. Pure client-side over the static catalog.
 */
function Column({ stock, locale }: { stock: StockDetail; locale: Locale }) {
  const ccs = getScore(stock.ticker);
  return (
    <div className="card">
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <span className="font-mono text-xl font-bold text-white">{stock.ticker}</span>
          <span className="ml-2 text-sm text-slate-400">{stock.name[locale]}</span>
        </div>
        <LiveQuote ticker={stock.ticker} />
      </div>
      <div className="mt-1 text-xs text-slate-500">{stock.role[locale]}</div>

      {/* CCS */}
      <div className="mt-4">
        {ccs ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-300">{dict.score.short[locale]}</span>
              <ScoreBadge score={ccs.score} locale={locale} />
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent" style={{ width: `${ccs.score}%` }} />
            </div>
            <div className="mt-2 text-xs text-slate-400">
              {dict.compare.holders[locale]}: <span className="font-mono text-slate-200">{ccs.holders}</span>
            </div>
            <ul className="mt-2 space-y-1 text-xs">
              {ccs.contributions.map((c) => (
                <li key={c.slug} className="flex justify-between gap-2">
                  <span className="text-slate-400">
                    {c.investor[locale]} · {dict.score.actions[c.action][locale]}
                  </span>
                  <span className={`font-mono ${c.points >= 0 ? 'text-gain' : 'text-loss'}`}>
                    {c.points >= 0 ? '+' : ''}{c.points}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-xs text-slate-500">{dict.compare.noScore[locale]}</p>
        )}
      </div>

      {/* bull / risk */}
      <div className="mt-4 space-y-2 text-sm">
        <p><span className="font-semibold text-gain">▲ </span><span className="text-slate-300">{stock.bull[locale]}</span></p>
        <p><span className="font-semibold text-loss">▼ </span><span className="text-slate-300">{stock.risk[locale]}</span></p>
      </div>

      <Link href={`/${locale}/stocks/${stock.ticker}`} className="mt-4 inline-block text-xs font-medium text-accent hover:text-accent-soft">
        {dict.labels.viewStock[locale]} →
      </Link>
    </div>
  );
}

export default function CompareTool({ stocks, locale }: { stocks: StockDetail[]; locale: Locale }) {
  const [a, setA] = useState('AMZN');
  const [b, setB] = useState('NVDA');
  const stockA = stocks.find((s) => s.ticker === a);
  const stockB = stocks.find((s) => s.ticker === b);

  const selectCls =
    'rounded-lg border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-accent/60';

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-400">
          {dict.compare.pickA[locale]}
          <select value={a} onChange={(e) => setA(e.target.value)} className={selectCls}>
            {stocks.map((s) => <option key={s.ticker} value={s.ticker}>{s.ticker}</option>)}
          </select>
        </label>
        <span className="font-mono text-slate-500">vs</span>
        <label className="flex items-center gap-2 text-sm text-slate-400">
          {dict.compare.pickB[locale]}
          <select value={b} onChange={(e) => setB(e.target.value)} className={selectCls}>
            {stocks.map((s) => <option key={s.ticker} value={s.ticker}>{s.ticker}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {stockA && <Column stock={stockA} locale={locale} />}
        {stockB && <Column stock={stockB} locale={locale} />}
      </div>
    </div>
  );
}
