import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { siteUrl, staticPaths } from '@/lib/site';
import { investors } from '@/lib/data/investors';
import { getStocks } from '@/lib/data/stocks';
import { getPairs } from '@/lib/data/pairs';
import { insights } from '@/lib/content/insights';
import snapshot from '@/lib/data/market-snapshot.json';

// Required for `output: 'export'` — emit a static sitemap.xml at build.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        changeFrequency: path === '/news' ? 'weekly' : path === '/market' ? 'daily' : 'monthly',
        priority: path === '' ? 1 : 0.7,
        // 行情快照每日刷新 → /market 的 lastmod 跟着快照日期走(真实变更,非假新鲜)
        ...(path === '/market' && snapshot.asOf ? { lastModified: snapshot.asOf } : {}),
      });
    }
    for (const inv of investors) {
      entries.push({ url: `${siteUrl}/${locale}/investors/${inv.slug}`, priority: 0.6 });
      entries.push({ url: `${siteUrl}/${locale}/follow/${inv.slug}`, priority: 0.55 });
    }
    for (const s of getStocks()) {
      entries.push({ url: `${siteUrl}/${locale}/stocks/${s.ticker}`, priority: 0.6 });
    }
    for (const p of getPairs()) {
      entries.push({ url: `${siteUrl}/${locale}/vs/${p.slug}`, priority: 0.5 });
    }
    for (const i of insights) {
      entries.push({ url: `${siteUrl}/${locale}/insights/${i.slug}`, changeFrequency: 'monthly', priority: 0.6 });
    }
  }

  return entries;
}
