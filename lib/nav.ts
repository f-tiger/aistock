import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';

export type NavLink = { href: string; label: string };

/** Primary links shown in the top navbar. */
export function primaryLinks(locale: Locale): NavLink[] {
  const base = `/${locale}`;
  return [
    { href: `${base}/guide`, label: dict.nav.guide[locale] },
    { href: `${base}/market`, label: dict.nav.market[locale] },
    { href: `${base}/stocks`, label: dict.nav.stocks[locale] },
    { href: `${base}/investors`, label: dict.nav.investors[locale] },
    { href: `${base}/consensus`, label: dict.nav.consensus[locale] },
    { href: `${base}/long-term`, label: dict.nav.longTerm[locale] },
  ];
}

/** Secondary links surfaced in the footer site-map. */
export function secondaryLinks(locale: Locale): NavLink[] {
  const base = `/${locale}`;
  return [
    { href: `${base}/news`, label: dict.nav.news[locale] },
    { href: `${base}/glossary`, label: dict.nav.glossary[locale] },
    { href: `${base}/methodology`, label: dict.nav.methodology[locale] },
  ];
}
