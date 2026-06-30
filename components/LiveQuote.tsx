'use client';

import { useEffect, useState } from 'react';
import { getQuote, isQuotableTicker, type Quote } from '@/lib/data/quotes';

/**
 * Renders a live price + daily change for a ticker. While loading or when
 * unavailable (e.g. no API key configured), it shows a neutral “—” and never
 * blocks the page. Purely additive over the static content.
 */
export default function LiveQuote({ ticker, className = '' }: { ticker: string; className?: string }) {
  const quotable = isQuotableTicker(ticker);
  // undefined = loading; null = unavailable / not quotable
  const [quote, setQuote] = useState<Quote | null | undefined>(quotable ? undefined : null);

  useEffect(() => {
    if (!quotable) return;
    let active = true;
    getQuote(ticker).then((q) => {
      if (active) setQuote(q);
    });
    return () => {
      active = false;
    };
  }, [ticker, quotable]);

  if (!quote) {
    return <span className={`font-mono text-slate-600 ${className}`} aria-hidden>—</span>;
  }

  const up = quote.change >= 0;
  return (
    <span className={`font-mono whitespace-nowrap ${className}`}>
      <span className="text-slate-200">{quote.price.toFixed(2)}</span>{' '}
      <span className={up ? 'text-gain' : 'text-loss'}>
        {up ? '+' : ''}
        {quote.changePct.toFixed(2)}%
      </span>
    </span>
  );
}
