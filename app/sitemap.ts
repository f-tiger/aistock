import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { siteUrl, staticPaths } from '@/lib/site';
import { investors } from '@/lib/data/investors';
import { getStocks } from '@/lib/data/stocks';

// Required for `output: 'export'` — emit a static sitemap.xml at build.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        changeFrequency: path === '/news' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.7,
      });
    }
    for (const inv of investors) {
      entries.push({ url: `${siteUrl}/${locale}/investors/${inv.slug}`, priority: 0.6 });
    }
    for (const s of getStocks()) {
      entries.push({ url: `${siteUrl}/${locale}/stocks/${s.ticker}`, priority: 0.6 });
    }
  }

  return entries;
}
