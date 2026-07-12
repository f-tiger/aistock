import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { insights } from '@/lib/content/insights';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: dict.nav.insights[loc],
    description:
      loc === 'zh'
        ? '基于传奇投资人公开 13F 与罗盘共识分的 AI 投资洞察:大佬持仓拆解、共识与分歧解读、长期视角。每季更新,附来源。'
        : 'AI-investing insights from legendary investors’ public 13F filings and the Compass Consensus Score: holdings decoded, consensus vs divergence, long-term views. Updated quarterly, with sources.',
    alternates: localeAlternates(loc, '/insights'),
  };
}

export default async function InsightsHub({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const posts = [...insights].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="container-page py-12">
      <header className="max-w-3xl">
        <h1 className="section-title">{dict.nav.insights[loc]}</h1>
        <p className="mt-3 text-lg text-slate-300">
          {loc === 'zh'
            ? '把传奇投资人的公开动作,写成你能用的判断。数据驱动、有出处、每季更新。'
            : 'Turning legendary investors’ disclosed moves into judgments you can use. Data-driven, sourced, updated quarterly.'}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          <a href="/rss.xml" className="link-accent">RSS</a>
        </p>
      </header>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/${loc}/insights/${post.slug}`} className="card group flex flex-col">
            <time className="font-mono text-xs text-slate-500" dateTime={post.date}>{post.date}</time>
            <h2 className="mt-2 text-base font-bold text-white group-hover:text-accent">{post.title[loc]}</h2>
            <p className="mt-2 flex-1 text-sm text-slate-400">{post.description[loc]}</p>
            <span className="mt-4 text-sm font-medium text-accent">
              {loc === 'zh' ? '阅读' : 'Read'} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
