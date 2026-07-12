import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { buildAnswers } from '@/lib/data/answers';
import Disclaimer from '@/components/Disclaimer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: loc === 'zh' ? 'AI 投资常见问题' : 'AI investing — answers',
    description:
      loc === 'zh'
        ? '关于 AI 股票与传奇投资人共识的常见问题:哪些 AI 股共识最强、大佬本季更看多还是谨慎、巴菲特买了什么 AI——用公开 13F 数据直接回答。'
        : 'Answers about AI stocks and legendary-investor consensus: which AI names have the strongest agreement, are the legends bullish or cautious, what AI does Buffett own — answered from public 13F data.',
    alternates: localeAlternates(loc, '/answers'),
  };
}

export default async function AnswersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const items = buildAnswers();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q[loc],
      acceptedAnswer: { '@type': 'Answer', text: it.a[loc] },
    })),
  };

  return (
    <div className="container-page py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <header className="max-w-3xl">
        <h1 className="section-title">{loc === 'zh' ? 'AI 投资常见问题' : 'AI investing — answers'}</h1>
        <p className="mt-3 text-lg text-slate-300">
          {loc === 'zh'
            ? '用公开 13F 数据直接回答关于 AI 股票与传奇投资人共识的常见问题。数据每季更新,均标注截止日期。'
            : 'Straight answers about AI stocks and legendary-investor consensus, from public 13F data. Refreshed each quarter, every figure dated.'}
        </p>
        <div className="mt-4">
          <Disclaimer locale={loc} />
        </div>
      </header>

      <div className="mt-8 max-w-3xl space-y-4">
        {items.map((it, i) => (
          <details key={i} className="card group" open={i < 3}>
            <summary className="cursor-pointer list-none text-base font-bold text-white marker:content-none">
              <span className="text-accent">Q. </span>
              {it.q[loc]}
            </summary>
            <p className="mt-3 leading-relaxed text-slate-300">{it.a[loc]}</p>
          </details>
        ))}
      </div>

      {/* funnel into tools + consensus */}
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href={`/${loc}/consensus`} className="btn-primary">
          {dict.score.leaderboard[loc]} →
        </Link>
        <Link href={`/${loc}/tools/portfolio`} className="btn-ghost">
          {dict.tools.portfolioTitle[loc]}
        </Link>
        <Link href={`/${loc}/follow`} className="btn-ghost">
          {dict.follow.hubTitle[loc]}
        </Link>
      </div>
    </div>
  );
}
