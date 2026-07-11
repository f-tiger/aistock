import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { homeCopy } from '@/lib/content/home';
import { provider } from '@/lib/data/provider';
import ThemeCard from '@/components/ThemeCard';
import InvestorCard from '@/components/InvestorCard';
import PrincipleCard from '@/components/PrincipleCard';
import Disclaimer from '@/components/Disclaimer';
import NewsletterSignup from '@/components/NewsletterSignup';
import ScoreBadge from '@/components/ScoreBadge';
import { computeScores } from '@/lib/data/score';
import { principles } from '@/lib/data/principles';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const [themes, investors, updates] = await Promise.all([
    provider.getThemes(),
    provider.getInvestors(),
    provider.getUpdates(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="container-page pt-16 pb-10 sm:pt-24">
        <span className="pill">{dict.tagline[loc]}</span>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          <span className="bg-gradient-to-r from-white via-accent-soft to-accent bg-clip-text text-transparent">
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

        {/* top consensus strip */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {dict.score.name[loc]}
          </span>
          {computeScores().slice(0, 4).map((s) => (
            <Link
              key={s.ticker}
              href={`/${loc}/stocks/${s.ticker}`}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:border-accent/50"
            >
              <span className="font-mono text-sm font-bold text-white">{s.ticker}</span>
              <ScoreBadge score={s.score} locale={loc} />
            </Link>
          ))}
        </div>

        <div className="mt-8 max-w-2xl">
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
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {themes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} locale={loc} href={`/${loc}/market#${theme.id}`} />
          ))}
        </div>
      </section>

      {/* Latest updates */}
      <section className="container-page py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="section-title">{dict.labels.latestUpdates[loc]}</h2>
          <Link href={`/${loc}/news`} className="hidden whitespace-nowrap text-sm font-medium text-accent hover:text-accent-soft sm:inline">
            {dict.nav.news[loc]} →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {updates.slice(0, 3).map((u) => (
            <Link key={u.id} href={`/${loc}/news`} className="card block">
              <time className="font-mono text-xs text-slate-500" dateTime={u.date}>{u.date}</time>
              <h3 className="mt-2 text-base font-bold text-white">{u.title[loc]}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-slate-400">{u.summary[loc]}</p>
            </Link>
          ))}
        </div>
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
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {investors.map((investor) => (
            <InvestorCard key={investor.slug} investor={investor} locale={loc} />
          ))}
        </div>
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
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {principles.slice(0, 3).map((principle, i) => (
            <PrincipleCard key={principle.id} principle={principle} index={i} locale={loc} />
          ))}
        </div>
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
