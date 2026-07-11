import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { siteUrl } from '@/lib/site';

/**
 * Per-page canonical + hreflang alternates for the bilingual site.
 * `path` is the locale-less path ('' for home, '/market', '/stocks/NVDA', …).
 * x-default points at zh (the primary audience).
 */
export function localeAlternates(locale: Locale, path: string): NonNullable<Metadata['alternates']> {
  return {
    canonical: `${siteUrl}/${locale}${path}`,
    languages: {
      zh: `${siteUrl}/zh${path}`,
      en: `${siteUrl}/en${path}`,
      'x-default': `${siteUrl}/zh${path}`,
    },
  };
}

type Crumb = { name: string; path: string };

/** BreadcrumbList JSON-LD for interior pages. Emit inside a <script> tag. */
export function breadcrumbJsonLd(locale: Locale, crumbs: Crumb[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${siteUrl}/${locale}${c.path}`,
    })),
  });
}

/** ItemList JSON-LD (e.g. the consensus leaderboard). */
export function itemListJsonLd(locale: Locale, name: string, items: { name: string; path: string }[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: `${siteUrl}/${locale}${it.path}`,
    })),
  });
}
