'use client';

import { useMemo, useState } from 'react';
import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import type { Investor, Stance } from '@/lib/data/types';
import InvestorCard from './InvestorCard';

type ThemeOption = { id: string; label: string };
const STANCES: Stance[] = ['bull', 'cautious', 'bear'];

export default function InvestorBrowser({
  investors,
  themeOptions,
  locale,
}: {
  investors: Investor[];
  themeOptions: ThemeOption[];
  locale: Locale;
}) {
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('');
  const [stance, setStance] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return investors.filter((inv) => {
      if (theme && !inv.themeIds.includes(theme)) return false;
      if (stance && inv.stance !== stance) return false;
      if (!q) return true;
      return (
        inv.name.zh.toLowerCase().includes(q) ||
        inv.name.en.toLowerCase().includes(q) ||
        inv.firm.zh.toLowerCase().includes(q) ||
        inv.firm.en.toLowerCase().includes(q)
      );
    });
  }, [investors, query, theme, stance]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.labels.searchInvestors[locale]}
          className="w-full rounded-lg border border-white/15 bg-ink-900 px-4 py-2.5 text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:border-accent/60 sm:max-w-xs"
        />
        <select
          value={stance}
          onChange={(e) => setStance(e.target.value)}
          className="rounded-lg border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-accent/60"
          aria-label={dict.labels.filterStance[locale]}
        >
          <option value="">{dict.labels.filterStance[locale]}: {dict.labels.all[locale]}</option>
          {STANCES.map((s) => (
            <option key={s} value={s}>{dict.stance[s][locale]}</option>
          ))}
        </select>
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
          {filtered.map((inv) => (
            <InvestorCard key={inv.slug} investor={inv} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-slate-500">{dict.labels.noResults[locale]}</p>
      )}
    </div>
  );
}
