import { siteUrl } from '@/lib/site';

/**
 * Site-wide structured data (WebSite + Organization). Rendered once in the root
 * layout. Kept factual — no ratings or claims we can't back up.
 */
export default function JsonLd() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'AI 投资罗盘 · AI Investing Compass',
        description:
          'AI 行情、传奇投资人的 AI 布局与长期投资指南（中英双语，教育用途）。',
        inLanguage: ['zh', 'en'],
        publisher: { '@id': `${siteUrl}/#org` },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#org`,
        name: 'AI Investing Compass',
        url: siteUrl,
        description:
          'A bilingual, education-focused hub for AI market trends, legendary investors’ AI bets, and long-term investing.',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input is included.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
