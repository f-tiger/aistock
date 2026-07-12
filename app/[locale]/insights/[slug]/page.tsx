import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { siteUrl } from '@/lib/site';
import { localeAlternates, breadcrumbJsonLd } from '@/lib/seo';
import { insights, getInsight } from '@/lib/content/insights';
import { computeScores, convictionIndex } from '@/lib/data/score';
import ScoreBadge from '@/components/ScoreBadge';
import ShareBar from '@/components/ShareBar';
import Disclaimer from '@/components/Disclaimer';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => insights.map((i) => ({ locale, slug: i.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  const loc = locale as Locale;
  return {
    title: post.title[loc],
    description: post.description[loc],
    keywords: post.keywords,
    alternates: localeAlternates(loc, `/insights/${slug}`),
  };
}

export default async function InsightPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const post = getInsight(slug);
  if (!post) notFound();

  const conv = convictionIndex();
  const top3 = computeScores().slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title[loc],
    description: post.description[loc],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: loc === 'zh' ? 'zh-CN' : 'en',
    author: { '@type': 'Organization', name: 'AI 投资罗盘 · AI Investing Compass' },
    publisher: { '@type': 'Organization', name: 'AI 投资罗盘 · AI Investing Compass' },
    mainEntityOfPage: `${siteUrl}/${loc}/insights/${slug}`,
    keywords: post.keywords.join(', '),
  };

  return (
    <div className="container-page py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(loc, [
            { name: dict.nav.insights[loc], path: '/insights' },
            { name: post.title[loc], path: `/insights/${slug}` },
          ]),
        }}
      />

      <Link href={`/${loc}/insights`} className="text-sm text-slate-400 hover:text-white">
        ← {dict.nav.insights[loc]}
      </Link>

      <article className="mt-4 max-w-3xl">
        <time className="font-mono text-xs text-slate-500" dateTime={post.date}>{post.date}</time>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">{post.title[loc]}</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-300">{post.description[loc]}</p>

        <div className="mt-5">
          <ShareBar locale={loc} text={`${post.title[loc]} · AI 投资罗盘`} />
        </div>
        <div className="mt-5">
          <Disclaimer locale={loc} />
        </div>

        {/* live data callout — keeps every article fresh each deploy */}
        <aside className="mt-8 rounded-2xl border border-accent/25 bg-accent/5 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {loc === 'zh' ? '本季实时数据' : 'Live data this quarter'}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div>
              <div className="text-2xl font-extrabold text-accent">{conv.index}<span className="text-sm text-slate-500">/100</span></div>
              <div className="text-xs text-slate-400">
                <Link href={`/${loc}/consensus`} className="link-accent">{dict.score.conviction.title[loc]}</Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {top3.map((s) => (
                <Link
                  key={s.ticker}
                  href={`/${loc}/stocks/${s.ticker}`}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 hover:border-accent/50"
                >
                  <span className="font-mono text-sm font-bold text-white">{s.ticker}</span>
                  <ScoreBadge score={s.score} locale={loc} />
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* body */}
        <div className="mt-8 space-y-8">
          {post.body.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-bold text-white">{section.h[loc]}</h2>
              <p className="mt-3 leading-relaxed text-slate-300">{section.p[loc]}</p>
            </section>
          ))}
        </div>

        {post.sources && post.sources.length > 0 && (
          <p className="mt-8 text-xs text-slate-500">
            {dict.cta.sources[loc]}:{' '}
            {post.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && ' · '}
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="link-accent">{s.label}</a>
              </span>
            ))}
          </p>
        )}

        {/* funnel */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={`/${loc}/tools/portfolio`} className="btn-primary">{dict.tools.portfolioTitle[loc]} →</Link>
          <Link href={`/${loc}/consensus`} className="btn-ghost">{dict.score.leaderboard[loc]}</Link>
          <Link href={`/${loc}/follow`} className="btn-ghost">{dict.follow.hubTitle[loc]}</Link>
        </div>
      </article>
    </div>
  );
}
