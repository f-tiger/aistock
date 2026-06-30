'use client';

import { useMemo, useState } from 'react';
import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import type { StockDetail } from '@/lib/data/stocks';
import StockCard from './StockCard';

type ThemeOption = { id: string; label: string };

export default function StockBrowser({
  stocks,
  themeOptions,
  locale,
}: {
  stocks: StockDetail[];
  themeOptions: ThemeOption[];
  locale: Locale;
}) {
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stocks.filter((s) => {
      if (theme && !s.themeIds.includes(theme)) return false;
      if (!q) return true;
      return (
        s.ticker.toLowerCase().includes(q) ||
        s.name.zh.toLowerCase().includes(q) ||
        s.name.en.toLowerCase().includes(q)
      );
    });
  }, [stocks, query, theme]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.labels.searchStocks[locale]}
          className="w-full rounded-lg border border-white/15 bg-ink-900 px-4 py-2.5 text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:border-accent/60 sm:max-w-xs"
        />
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="rounded-lg border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-accent/60"
          aria-label={dict.labels.filterTheme[locale]}
        >
          <option value="">{dict.labels.filterTheme[locale]}: {dict.labels.all[locale]}</option>
          {themeOptions.map((t) => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <StockCard key={s.ticker} stock={s} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-slate-500">{dict.labels.noResults[locale]}</p>
      )}
    </div>
  );
}
