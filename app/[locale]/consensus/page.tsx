import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { localeAlternates, itemListJsonLd } from '@/lib/seo';
import { provider } from '@/lib/data/provider';
import { consensusOnly } from '@/lib/data/consensus';
import { computeScores } from '@/lib/data/score';
import ConsensusMatrix from '@/components/ConsensusMatrix';
import ScoreBadge from '@/components/ScoreBadge';
import ShareBar from '@/components/ShareBar';
import LiveQuote from '@/components/LiveQuote';
import StockLink from '@/components/StockLink';
import BrokerCTA from '@/components/BrokerCTA';
import Disclaimer from '@/components/Disclaimer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: dict.nav.consensus[loc],
    description: loc === 'zh'
      ? '罗盘共识分排行榜:8 位大佬的 AI 持仓共识与分歧一目了然——亚马逊 98 强共识,英伟达 42 分歧。每季随 13F 更新。'
      : 'The Consensus Score leaderboard: where eight legends agree and disagree on AI stocks - AMZN 98 strong consensus, NVDA 42 split. Updated each 13F season.',
    alternates: localeAlternates(loc, '/consensus'),
  };
}

export default async function ConsensusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const [entries, investors] = await Promise.all([
    provider.getConsensus(),
    provider.getInvestors(),
  ]);
  const consensus = consensusOnly(entries);
  const divergence = entries.find((e) => e.ticker === 'NVDA');

  return (
    <div className="container-page py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: itemListJsonLd(
            loc,
            dict.score.leaderboard[loc],
            computeScores().slice(0, 8).map((s) => ({ name: `${s.ticker} — ${s.score}`, path: `/stocks/${s.ticker}` })),
          ),
        }}
      />
      <header className="max-w-3xl">
        <h1 className="section-title">{dict.nav.consensus[loc]}</h1>
        <p className="mt-3 text-slate-300">
          {loc === 'zh'
            ? '把多位传奇投资人的 AI 持仓横向对比：哪些标的是“共识”（多人持有），哪些存在明显分歧。数据基于本站收录投资人的公开持仓。'
            : 'A cross-comparison of legendary investors’ AI holdings: which names are consensus (held by many), and where they clearly disagree. Based on the public holdings of the investors featured here.'}
        </p>
        <div className="mt-4">
          <Disclaimer locale={loc} />
        </div>
      </header>

      {/* Consensus Leaderboard — CCS ranked */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-white">
          {dict.score.leaderboard[loc]}
          <span className="ml-2 text-sm font-normal text-slate-400">· {dict.score.name[loc]}</span>
        </h2>
        <div className="mt-5 space-y-2">
          {computeScores().slice(0, 8).map((s, i) => (
            <div key={s.ticker} className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink-900/60 px-4 py-2.5">
              <span className="w-6 font-mono text-sm text-slate-500">{i + 1}</span>
              <span className="w-16 font-mono font-bold text-white">
                <StockLink ticker={s.ticker} locale={loc} />
              </span>
              <span className="hidden w-24 truncate text-xs text-slate-500 sm:block">{s.name[loc]}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
                  style={{ width: `${s.score}%` }}
                />
              </div>
              <ScoreBadge score={s.score} locale={loc} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">{dict.score.note[loc]}</p>
        <div className="mt-3">
          <ShareBar
            locale={loc}
            text={
              loc === 'zh'
                ? '8 位传奇投资人的 AI 持仓共识榜(罗盘共识分)· AI 投资罗盘'
                : 'The AI Consensus Leaderboard of 8 legendary investors (Compass Consensus Score) · AI Investing Compass'
            }
          />
        </div>
      </section>

      {/* Consensus holdings */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-white">{dict.labels.consensusHoldings[loc]}</h2>
        <p className="mt-2 text-sm text-slate-400">
          {loc === 'zh' ? '被 2 位及以上投资人持有的标的。' : 'Names held by two or more investors.'}
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {consensus.map((entry) => (
            <div key={entry.ticker} className="card">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-mono text-lg font-bold text-white">
                    <StockLink ticker={entry.ticker} locale={loc} />
                  </span>
                  <span className="ml-2 text-sm text-slate-400">{entry.name[loc]}</span>
                </div>
                <span className="pill">
                  {dict.labels.heldBy[loc]} {entry.holders.length} {dict.labels.holders[loc]}
                </span>
              </div>
              <div className="mt-1 text-sm"><LiveQuote ticker={entry.ticker} /></div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {entry.holders.map((h) => (
                  <li key={h.slug} className="flex items-start gap-2">
                    <Link href={`/${loc}/investors/${h.slug}`} className="link-accent whitespace-nowrap font-medium">
                      {h.name[loc]}
                    </Link>
                    <span className="text-slate-400">— {h.note[loc]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Divergence */}
      {divergence && divergence.holders.length >= 2 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-white">{dict.labels.divergence[loc]}</h2>
          <p className="mt-2 text-sm text-slate-400">
            {loc === 'zh'
              ? '同一标的，立场相反——以英伟达为例：有人加仓，有人减持。'
              : 'Same name, opposite calls — Nvidia is the clearest example: some add while others trim.'}
          </p>
          <div className="mt-5 card">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-lg font-bold text-white">{divergence.ticker}</span>
              <span className="text-sm text-slate-400">{divergence.name[loc]}</span>
            </div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {divergence.holders.map((h) => (
                <li key={h.slug} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm">
                  <Link href={`/${loc}/investors/${h.slug}`} className="link-accent font-medium">{h.name[loc]}</Link>
                  <span className="ml-1 text-slate-400">— {h.note[loc]}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Matrix */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-white">{dict.labels.holdingsMatrix[loc]}</h2>
        <p className="mt-2 text-sm text-slate-400">
          {loc === 'zh' ? '共识标的（≥2 人）× 投资人。✓ 表示持有。' : 'Consensus names (2+ holders) × investors. ✓ means holds.'}
        </p>
        <div className="mt-5">
          <ConsensusMatrix entries={consensus} investors={investors} locale={loc} />
        </div>
      </section>

      {/* Conversion: broker referral */}
      <div className="mt-12">
        <BrokerCTA locale={loc} />
      </div>
    </div>
  );
}
