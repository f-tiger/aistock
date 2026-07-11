import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { investors } from '@/lib/data/investors';
import { getScore, type StockScore } from '@/lib/data/score';
import { localeAlternates } from '@/lib/seo';
import ScoreBadge from '@/components/ScoreBadge';

const IGNORE = new Set(['—', 'theme', '']);

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: dict.follow.hubTitle[loc],
    description:
      loc === 'zh'
        ? '一键跟投巴菲特、段永平、Cathie Wood 等 8 位传奇投资人的 AI 持仓:看每套组合的罗盘共识分,并在组合体检里对比你自己的持仓。'
        : 'Copy the AI sleeve of Buffett, Duan Yongping, Cathie Wood and 5 more legends: each sleeve’s Compass Consensus Score, ready to compare with your own holdings.',
    alternates: localeAlternates(loc, '/follow'),
  };
}

export default async function FollowHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;

  const cards = investors
    .map((inv) => {
      const tickers = [...new Set(inv.holdings.map((h) => h.ticker.trim()).filter((t) => !IGNORE.has(t)))];
      const scored = tickers.map((t) => getScore(t)).filter((s): s is StockScore => Boolean(s));
      const avg = scored.length ? Math.round(scored.reduce((sum, s) => sum + s.score, 0) / scored.length) : 0;
      return { inv, count: tickers.length, avg };
    })
    .sort((a, b) => b.avg - a.avg);

  return (
    <div className="container-page py-12">
      <header className="max-w-3xl">
        <h1 className="section-title">{dict.follow.hubTitle[loc]}</h1>
        <p className="mt-3 text-lg text-slate-300">{dict.follow.hubIntro[loc]}</p>
      </header>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ inv, count, avg }) => (
          <Link key={inv.slug} href={`/${loc}/follow/${inv.slug}`} className="card group flex flex-col">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-white group-hover:text-accent">{inv.name[loc]}</h2>
                <p className="mt-0.5 text-xs text-slate-400">{inv.firm[loc]}</p>
              </div>
              <ScoreBadge score={avg} locale={loc} />
            </div>
            <p className="mt-3 flex-1 text-sm text-slate-400">
              {count} {loc === 'zh' ? '只 AI 相关持仓' : 'AI-related holdings'}
            </p>
            <span className="mt-4 text-sm font-medium text-accent">{dict.follow.view[loc]} →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
