import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { localeAlternates, breadcrumbJsonLd } from '@/lib/seo';
import { computeScores } from '@/lib/data/score';
import { buildConsensus } from '@/lib/data/consensus';
import { investors } from '@/lib/data/investors';
import PortfolioChecker, { type ScoreLite, type InvestorLite } from '@/components/PortfolioChecker';
import BrokerCTA from '@/components/BrokerCTA';
import Disclaimer from '@/components/Disclaimer';

const IGNORE = new Set(['—', 'theme', '']);

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: dict.tools.portfolioTitle[loc],
    description:
      loc === 'zh'
        ? '免费工具:贴上你的 AI 持仓,一键得到「组合共识分」、与你最合拍的传奇投资人,以及每只股票的罗盘共识分。'
        : 'Free tool: paste your AI holdings to get a Portfolio Consensus Score, the legendary investors most aligned with you, and each stock’s Compass Consensus Score.',
    alternates: localeAlternates(loc, '/tools/portfolio'),
  };
}

export default async function PortfolioToolPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;

  const scores = computeScores();
  const entries = buildConsensus(investors);
  const holdersByTicker = new Map(entries.map((e) => [e.ticker, e.holders]));

  const scoreLite: ScoreLite[] = scores.map((s) => ({
    ticker: s.ticker,
    name: s.name,
    score: s.score,
    holders: (holdersByTicker.get(s.ticker) ?? []).map((h) => ({ slug: h.slug, name: h.name })),
  }));

  const investorLite: InvestorLite[] = investors.map((inv) => ({
    slug: inv.slug,
    name: inv.name,
    tickers: [...new Set(inv.holdings.map((h) => h.ticker.trim()).filter((t) => !IGNORE.has(t)))],
  }));

  return (
    <div className="container-page py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(loc, [
            { name: dict.tools.hubTitle[loc], path: '/tools' },
            { name: dict.tools.portfolioTitle[loc], path: '/tools/portfolio' },
          ]),
        }}
      />
      <header className="max-w-3xl">
        <h1 className="section-title">{dict.tools.portfolioTitle[loc]}</h1>
        <p className="mt-3 text-lg text-slate-300">{dict.tools.portfolioTagline[loc]}</p>
        <div className="mt-4">
          <Disclaimer locale={loc} />
        </div>
      </header>

      <div className="mt-8">
        <PortfolioChecker scores={scoreLite} investors={investorLite} locale={loc} />
      </div>

      <div className="mt-12">
        <BrokerCTA locale={loc} />
      </div>
    </div>
  );
}
