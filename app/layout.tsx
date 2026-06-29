import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'AI 投资罗盘 · AI Investing Compass',
    template: '%s · AI 投资罗盘',
  },
  description:
    'AI 行情、传奇投资人的 AI 布局与长期投资指南（中英双语，教育用途）。AI market trends, legendary investors’ AI bets, and long-term investing — bilingual, education-focused.',
  keywords: ['AI 投资', 'AI 行情', '巴菲特', 'Cathie Wood', '长期投资', 'AI stocks', 'investing'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
