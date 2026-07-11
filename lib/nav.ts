import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';

export type NavLink = { href: string; label: string };

/** Primary links shown in the top navbar (tool-forward ordering). */
export function primaryLinks(locale: Locale): NavLink[] {
  const base = `/${locale}`;
  return [
    { href: `${base}/consensus`, label: dict.nav.consensus[locale] },
    { href: `${base}/moves`, label: dict.nav.moves[locale] },
    { href: `${base}/compare`, label: dict.nav.compare[locale] },
    { href: `${base}/stocks`, label: dict.nav.stocks[locale] },
    { href: `${base}/investors`, label: dict.nav.investors[locale] },
    { href: `${base}/market`, label: dict.nav.market[locale] },
  ];
}

/** Secondary links surfaced in the footer site-map. */
export function secondaryLinks(locale: Locale): NavLink[] {
  const base = `/${locale}`;
  return [
    { href: `${base}/guide`, label: dict.nav.guide[locale] },
    { href: `${base}/long-term`, label: dict.nav.longTerm[locale] },
    { href: `${base}/news`, label: dict.nav.news[locale] },
    { href: `${base}/glossary`, label: dict.nav.glossary[locale] },
    { href: `${base}/methodology`, label: dict.nav.methodology[locale] },
  ];
}
