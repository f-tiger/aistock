import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site';
import './globals.css';

const title = 'AI 投资罗盘 · AI Investing Compass';
const description =
  'AI 行情、传奇投资人的 AI 布局与长期投资指南（中英双语，教育用途）。AI market trends, legendary investors’ AI bets, and long-term investing — bilingual, education-focused.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s · AI 投资罗盘' },
  description,
  keywords: ['AI 投资', 'AI 行情', '巴菲特', 'Cathie Wood', '长期投资', 'AI stocks', 'investing'],
  applicationName: 'AI Investing Compass',
  alternates: { canonical: '/zh', languages: { zh: '/zh', en: '/en' } },
  openGraph: {
    type: 'website',
    siteName: 'AI 投资罗盘 · AI Investing Compass',
    title,
    description,
    url: siteUrl,
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
