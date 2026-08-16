/** Canonical site URL. Override at build via NEXT_PUBLIC_SITE_URL. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://compass.agiscorecard.com'
).replace(/\/$/, '');

/** All locale-prefixed page paths (without locale), for sitemap/nav. */
export const staticPaths = [
  '',
  '/guide',
  '/market',
  '/stocks',
  '/investors',
  '/consensus',
  '/moves',
  '/compare',
  '/tools',
  '/tools/portfolio',
  '/follow',
  '/track-record',
  '/answers',
  '/insights',
  '/pro',
  '/news',
  '/long-term',
  '/glossary',
  '/methodology',
] as const;
