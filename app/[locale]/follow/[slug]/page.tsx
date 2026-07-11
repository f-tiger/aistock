import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { provider } from '@/lib/data/provider';
import { investors } from '@/lib/data/investors';
import { getScore, type StockScore } from '@/lib/data/score';
import { localeAlternates, breadcrumbJsonLd } from '@/lib/seo';
import CompassGauge from '@/components/CompassGauge';
import ScoreBadge from '@/components/ScoreBadge';
import ShareBar from '@/components/ShareBar';
import StockLink from '@/components/StockLink';
import LiveQuote from '@/components/LiveQuote';
import NewsletterSignup from '@/components/NewsletterSignup';
import BrokerCTA from '@/components/BrokerCTA';
import Disclaimer from '@/components/Disclaimer';

export const dynamicParams = false;

const IGNORE = new Set(['—', 'theme', '']);

function sleeveOf(slug: string) {
  const investor = investors.find((i) => i.slug === slug);
  if (!investor) return null;
  const tickers = [...new Set(investor.holdings.map((h) => h.ticker.trim()).filter((t) => !IGNORE.has(t)))];
  const scored = tickers
    .map((t) => getScore(t))
    .filter((s): s is StockScore => Boolean(s))
    .sort((a, b) => b.score - a.score);
  const avg = scored.length ? Math.round(scored.reduce((sum, s) => sum + s.score, 0) / scored.length) : 0;
  return { investor, tickers, scored, avg };
}

export function generateStaticParams() {
  return locales.flatMap((locale) => investors.map((i) => ({ locale, slug: i.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const investor = await provider.getInvestor(slug);
  if (!investor) return {};
  const loc = locale as Locale;
  const name = investor.name[loc];
  return {
    title: dict.follow.title[loc].replace('{name}', name),
    description:
      loc === 'zh'
        ? `${name}(${investor.firm.zh})的 AI 持仓一键跟投:查看这套组合的罗盘共识分、逐只评分,并在组合体检里对比你自己的持仓。教育用途。`
        : `Copy ${name}’s (${investor.firm.en}) AI holdings: see this sleeve’s Compass Consensus Score, per-stock ratings, and compare it with your own in the Portfolio Check. Educational.`,
    alternates: localeAlternates(loc, `/follow/${slug}`),
  };
}

export default async function FollowPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const data = sleeveOf(slug);
  if (!data) notFound();
  const { investor, tickers, scored, avg } = data;
  const name = investor.name[loc];
  const sleeveHref = `/${loc}/tools/portfolio?p=${tickers.join(',')}`;

  return (
    <div className="container-page py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(loc, [
            { name: dict.follow.hubTitle[loc], path: '/follow' },
            { name, path: `/follow/${slug}` },
          ]),
        }}
      />
      <Link href={`/${loc}/follow`} className="text-sm text-slate-400 hover:text-white">
        ← {dict.follow.hubTitle[loc]}
      </Link>

      <header className="mt-4 max-w-3xl">
        <h1 className="section-title">{dict.follow.title[loc].replace('{name}', name)}</h1>
        <p className="mt-3 text-slate-300">
          {dict.follow.intro[loc].replace('{name}', name).replace('{firm}', investor.firm[loc])}
        </p>
        <div className="mt-4">
          <Disclaimer locale={loc} />
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* sleeve score */}
        <div className="card flex flex-col items-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {dict.follow.sleeveScore[loc]}
          </span>
          <CompassGauge score={avg} ticker={loc === 'zh' ? '组合' : 'SLEEVE'} locale={loc} size={210} />
          <Link href={sleeveHref} className="btn-primary mt-4 w-full text-center">
            {dict.follow.openInTool[loc]} →
          </Link>
          <Link href={`/${loc}/investors/${slug}`} className="mt-3 text-sm link-accent">
            {dict.follow.fullProfile[loc]} →
          </Link>
          <div className="mt-4 w-full">
            <ShareBar
              locale={loc}
              text={
                loc === 'zh'
                  ? `跟投 ${name} 的 AI 持仓(组合共识分 ${avg})· AI 投资罗盘`
                  : `Copy ${name}’s AI sleeve (Consensus Score ${avg}) · AI Investing Compass`
              }
            />
          </div>
        </div>

        {/* holdings breakdown */}
        <div>
          <h2 className="text-lg font-bold text-white">{dict.follow.holdings[loc]}</h2>
          <div className="mt-4 space-y-2">
            {investor.holdings
              .filter((h) => !IGNORE.has(h.ticker.trim()))
              .map((h) => {
                const s = scored.find((x) => x.ticker === h.ticker.trim());
                return (
                  <div key={h.ticker} className="rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono font-bold text-white">
                        <StockLink ticker={h.ticker} locale={loc} />
                        <span className="ml-2 text-xs font-normal text-slate-400">{h.name[loc]}</span>
                      </span>
                      {s ? <ScoreBadge score={s.score} locale={loc} /> : null}
                    </div>
                    <div className="mt-1 text-sm"><LiveQuote ticker={h.ticker} /></div>
                    <p className="mt-1 text-sm text-slate-300">{h.note[loc]}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* subscribe + broker */}
      <section className="mt-12">
        <div className="mx-auto max-w-2xl">
          <NewsletterSignup locale={loc} />
        </div>
      </section>
      <div className="mt-10">
        <BrokerCTA locale={loc} />
      </div>
    </div>
  );
}
