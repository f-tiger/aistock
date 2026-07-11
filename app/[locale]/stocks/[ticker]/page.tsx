import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { provider } from '@/lib/data/provider';
import { getStocks } from '@/lib/data/stocks';
import { buildConsensus } from '@/lib/data/consensus';
import { investors } from '@/lib/data/investors';
import { getScore, computeScores } from '@/lib/data/score';
import { localeAlternates, breadcrumbJsonLd } from '@/lib/seo';
import { pairSlug } from '@/lib/data/pairs';
import { hasStockPage } from '@/lib/data/stocks';
import ScorePanel from '@/components/ScorePanel';
import { getTheme } from '@/lib/data/themes';
import PriceChart from '@/components/PriceChart';
import LiveQuote from '@/components/LiveQuote';
import ShareBar from '@/components/ShareBar';
import ThemeCard from '@/components/ThemeCard';
import BrokerCTA from '@/components/BrokerCTA';
import Disclaimer from '@/components/Disclaimer';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getStocks().map((s) => ({ locale, ticker: s.ticker })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; ticker: string }>;
}): Promise<Metadata> {
  const { locale, ticker } = await params;
  const stock = await provider.getStock(ticker);
  if (!stock) return {};
  const loc = locale as Locale;
  return {
    title: `${stock.ticker} · ${stock.name[loc]}`,
    description: loc === 'zh'
      ? `${stock.name.zh}(${stock.ticker})的罗盘共识分、传奇投资人持有动作、多空逻辑与实时行情。基于公开 13F,每季更新。`
      : `${stock.name.en} (${stock.ticker}): Compass Consensus Score, legendary investor actions, bull and risk views, and live quotes. From public 13F data, updated quarterly.`,
    alternates: localeAlternates(loc, `/stocks/${stock.ticker}`),
  };
}

export default async function StockDetailPage({
  params,
}: {
  params: Promise<{ locale: string; ticker: string }>;
}) {
  const { locale, ticker } = await params;
  const loc = locale as Locale;
  const stock = await provider.getStock(ticker);
  if (!stock) notFound();

  const holders = buildConsensus(investors).find((e) => e.ticker === stock.ticker)?.holders ?? [];
  const relatedThemes = stock.themeIds.map((id) => getTheme(id)).filter((t) => t !== undefined);
  const ccs = getScore(stock.ticker);

  return (
    <div className="container-page py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(loc, [
            { name: dict.nav.stocks[loc], path: '/stocks' },
            { name: stock.ticker, path: `/stocks/${stock.ticker}` },
          ]),
        }}
      />
      <Link href={`/${loc}/stocks`} className="text-sm text-slate-400 hover:text-white">
        ← {dict.nav.stocks[loc]}
      </Link>

      <header className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            <span className="font-mono">{stock.ticker}</span>
            <span className="ml-3 text-xl font-bold text-slate-300">{stock.name[loc]}</span>
          </h1>
          <p className="mt-1 text-slate-400">{stock.role[loc]}</p>
          <div className="mt-3 text-2xl">
            <LiveQuote ticker={stock.ticker} />
          </div>
        </div>
        <PriceChart ticker={stock.ticker} fallback={stock.trend} locale={loc} width={200} height={64} />
      </header>

      {/* Consensus Score — the proprietary lens */}
      {ccs && (
        <div className="mt-8">
          <ScorePanel score={ccs} locale={loc} />
          <div className="mt-3">
            <ShareBar
              locale={loc}
              text={
                loc === 'zh'
                  ? `${stock.ticker} 罗盘共识分 ${ccs.score}(${ccs.holders} 位传奇投资人持有)· AI 投资罗盘`
                  : `${stock.ticker} Compass Consensus Score: ${ccs.score} (held by ${ccs.holders} legends) · AI Investing Compass`
              }
            />
          </div>
        </div>
      )}

      {/* Bull / risk */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="card">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gain">{dict.labels.bullCase[loc]}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{stock.bull[loc]}</p>
        </div>
        <div className="card">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-loss">{dict.labels.risks[loc]}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{stock.risk[loc]}</p>
        </div>
      </div>

      {/* Investors holding it */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-white">{dict.labels.heldByInvestors[loc]}</h2>
        {holders.length > 0 ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {holders.map((h) => (
              <Link
                key={h.slug}
                href={`/${loc}/investors/${h.slug}`}
                className="card flex items-baseline justify-between gap-3 py-4"
              >
                <span className="font-medium text-white">{h.name[loc]}</span>
                <span className="text-sm text-slate-400">{h.note[loc]}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-500">{dict.labels.noHolders[loc]}</p>
        )}
      </section>

      {/* popular comparisons — internal links into the programmatic vs-pages */}
      <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-slate-500">{loc === 'zh' ? '热门对比:' : 'Popular comparisons:'}</span>
        {computeScores()
          .filter((s) => s.ticker !== stock.ticker && hasStockPage(s.ticker))
          .slice(0, 3)
          .map((s) => (
            <Link
              key={s.ticker}
              href={`/${loc}/vs/${pairSlug(stock.ticker, s.ticker)}`}
              className="pill font-mono hover:border-accent/50 hover:text-white"
            >
              {stock.ticker} vs {s.ticker}
            </Link>
          ))}
      </div>

      {/* Related themes */}
      {relatedThemes.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-white">{dict.labels.inThemes[loc]}</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedThemes.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} locale={loc} href={`/${loc}/market#${theme.id}`} />
            ))}
          </div>
        </section>
      )}

      {/* Conversion: broker referral */}
      <div className="mt-12">
        <BrokerCTA locale={loc} />
      </div>

      <div className="mt-8 max-w-3xl">
        <Disclaimer locale={loc} />
      </div>
    </div>
  );
}
