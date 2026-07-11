import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import { localeAlternates } from '@/lib/seo';
import dict from '@/lib/i18n/dictionaries';
import { homeCopy } from '@/lib/content/home';
import { provider } from '@/lib/data/provider';
import ThemeCard from '@/components/ThemeCard';
import InvestorCard from '@/components/InvestorCard';
import PrincipleCard from '@/components/PrincipleCard';
import Disclaimer from '@/components/Disclaimer';
import NewsletterSignup from '@/components/NewsletterSignup';
import ScoreBadge from '@/components/ScoreBadge';
import CompassGauge from '@/components/CompassGauge';
import Reveal from '@/components/Reveal';
import { computeScores } from '@/lib/data/score';
import { principles } from '@/lib/data/principles';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    description: loc === 'zh'
      ? '罗盘共识分把巴菲特、段永平、Cathie Wood 等 8 位大佬的 AI 持仓量化为 0-100 评分。共识榜、本季动作、对比工具,每季随 13F 更新,中英双语。'
      : 'The Compass Consensus Score turns eight legendary investors AI bets into a 0-100 score per stock. Leaderboard, quarterly moves, comparison tools - bilingual, refreshed each 13F season.',
    alternates: localeAlternates(loc, ''),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const [themes, investors, updates] = await Promise.all([
    provider.getThemes(),
    provider.getInvestors(),
    provider.getUpdates(),
  ]);
  const scores = computeScores();
  const top = scores[0];
  const runnersUp = scores.slice(1, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-grid" aria-hidden />
        <div className="container-page relative grid items-center gap-12 pt-16 pb-10 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr]">
          {/* left: copy */}
          <div>
            <span className="pill">{dict.tagline[loc]}</span>
            <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              <span className="text-shimmer bg-gradient-to-r from-white via-accent-soft to-accent bg-clip-text text-transparent">
                {homeCopy.heroTitle[loc]}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              {homeCopy.heroSubtitle[loc]}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${loc}/consensus`} className="btn-primary">{dict.score.leaderboard[loc]} →</Link>
              <Link href={`/${loc}/guide`} className="btn-ghost">{dict.nav.guide[loc]}</Link>
              <Link href={`/${loc}/investors`} className="btn-ghost">{dict.cta.seeInvestors[loc]}</Link>
            </div>

            {/* stat band */}
            <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-ink-900/60 p-6 sm:grid-cols-4">
              {homeCopy.stats.map((s) => (
                <div key={s.label.en}>
                  <div className="text-2xl font-extrabold text-accent">{s.value[loc]}</div>
                  <div className="mt-1 text-xs text-slate-400">{s.label[loc]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* right: signature gauge panel (above the fold — always visible) */}
          {top && (
            <div className="card float-slow flex flex-col items-center">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {loc === 'zh' ? '本季共识榜首' : 'Top consensus this quarter'}
              </span>
              <CompassGauge score={top.score} ticker={top.ticker} locale={loc} size={240} />
              <div className="-mt-1 text-sm text-slate-400">{top.name[loc]}</div>

              <div className="mt-5 w-full space-y-2">
                {runnersUp.map((s) => (
                  <Link
                    key={s.ticker}
                    href={`/${loc}/stocks/${s.ticker}`}
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 transition hover:border-accent/40 hover:bg-white/[0.06]"
                  >
                    <span className="w-14 font-mono text-sm font-bold text-white">{s.ticker}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
                        style={{ width: `${s.score}%` }}
                      />
                    </div>
                    <ScoreBadge score={s.score} locale={loc} />
                  </Link>
                ))}
              </div>

              <Link href={`/${loc}/consensus`} className="btn-ghost mt-5 w-full">
                {dict.score.leaderboard[loc]} →
              </Link>
            </div>
          )}
        </div>

        <div className="container-page relative -mt-2 max-w-2xl pb-10">
          <Disclaimer locale={loc} />
        </div>
      </section>

      {/* Market snapshot */}
      <section className="container-page py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="section-title">{dict.labels.marketSnapshot[loc]}</h2>
            <p className="mt-2 max-w-2xl text-slate-400">{homeCopy.snapshotIntro[loc]}</p>
          </div>
          <Link href={`/${loc}/market`} className="hidden whitespace-nowrap text-sm font-medium text-accent hover:text-accent-soft sm:inline">
            {dict.cta.explore[loc]} →
          </Link>
        </div>
        <Reveal className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {themes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} locale={loc} href={`/${loc}/market#${theme.id}`} />
          ))}
        </Reveal>
      </section>

      {/* Latest updates */}
      <section className="container-page py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="section-title">{dict.labels.latestUpdates[loc]}</h2>
          <Link href={`/${loc}/news`} className="hidden whitespace-nowrap text-sm font-medium text-accent hover:text-accent-soft sm:inline">
            {dict.nav.news[loc]} →
          </Link>
        </div>
        <Reveal className="mt-6 grid gap-5 md:grid-cols-3">
          {updates.slice(0, 3).map((u) => (
            <Link key={u.id} href={`/${loc}/news`} className="card block">
              <time className="font-mono text-xs text-slate-500" dateTime={u.date}>{u.date}</time>
              <h3 className="mt-2 text-base font-bold text-white">{u.title[loc]}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-slate-400">{u.summary[loc]}</p>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* Featured investors */}
      <section className="container-page py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="section-title">{dict.labels.featuredInvestors[loc]}</h2>
            <p className="mt-2 max-w-2xl text-slate-400">{homeCopy.investorsIntro[loc]}</p>
          </div>
          <Link href={`/${loc}/investors`} className="hidden whitespace-nowrap text-sm font-medium text-accent hover:text-accent-soft sm:inline">
            {dict.cta.seeInvestors[loc]} →
          </Link>
        </div>
        <Reveal className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {investors.map((investor) => (
            <InvestorCard key={investor.slug} investor={investor} locale={loc} />
          ))}
        </Reveal>
      </section>

      {/* Long-term teaser */}
      <section className="container-page py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="section-title">{dict.nav.longTerm[loc]}</h2>
            <p className="mt-2 max-w-2xl text-slate-400">{homeCopy.longTermIntro[loc]}</p>
          </div>
          <Link href={`/${loc}/long-term`} className="hidden whitespace-nowrap text-sm font-medium text-accent hover:text-accent-soft sm:inline">
            {dict.cta.learnMore[loc]} →
          </Link>
        </div>
        <Reveal className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {principles.slice(0, 3).map((principle, i) => (
            <PrincipleCard key={principle.id} principle={principle} index={i} locale={loc} />
          ))}
        </Reveal>
      </section>

      {/* Newsletter capture */}
      <section className="container-page py-12">
        <div className="mx-auto max-w-2xl">
          <NewsletterSignup locale={loc} />
        </div>
      </section>
    </>
  );
}
