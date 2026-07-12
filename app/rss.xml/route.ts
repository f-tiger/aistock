import { insights } from '@/lib/content/insights';
import { siteUrl } from '@/lib/site';

// Static RSS 2.0 feed of the insights hub. Lets readers/aggregators pull new
// content automatically — organic distribution with no social account needed.
export const dynamic = 'force-static';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function GET() {
  const items = [...insights]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => {
      const url = `${siteUrl}/zh/insights/${p.slug}`;
      const pub = new Date(`${p.date}T00:00:00Z`).toUTCString();
      return `    <item>
      <title>${esc(p.title.zh)} / ${esc(p.title.en)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pub}</pubDate>
      <description>${esc(p.description.zh)} — ${esc(p.description.en)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>AI 投资罗盘 · AI Investing Compass — Insights</title>
    <link>${siteUrl}/zh/insights</link>
    <description>AI-investing insights from legendary investors' public 13F filings and the Compass Consensus Score. Educational; not investment advice.</description>
    <language>zh-cn</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
