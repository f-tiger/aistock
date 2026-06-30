'use client';

import { useEffect, useState } from 'react';
import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import { fetchCandles } from '@/lib/data/candles';
import { isQuotableTicker } from '@/lib/data/quotes';
import Sparkline from './Sparkline';

/**
 * Shows a real historical close-price line when the candles endpoint is
 * configured; otherwise falls back to the static illustrative trend. The label
 * makes clear which one is being shown.
 */
export default function PriceChart({
  ticker,
  fallback,
  locale,
  width = 200,
  height = 64,
}: {
  ticker: string;
  fallback: number[];
  locale: Locale;
  width?: number;
  height?: number;
}) {
  const [real, setReal] = useState<number[] | null>(null);

  useEffect(() => {
    if (!isQuotableTicker(ticker)) return;
    let active = true;
    fetchCandles(ticker).then((series) => {
      if (active && series) setReal(series);
    });
    return () => {
      active = false;
    };
  }, [ticker]);

  const data = real ?? fallback;
  const label = real
    ? locale === 'zh'
      ? '近 60 个交易日（Finnhub）'
      : 'Last 60 sessions (Finnhub)'
    : dict.labels.illustrativeTrend[locale];

  return (
    <div className="text-right">
      <Sparkline data={data} width={width} height={height} />
      <div className="mt-1 text-xs text-slate-600">{label}</div>
    </div>
  );
}
