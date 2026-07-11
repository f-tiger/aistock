import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { localeAlternates } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: dict.tools.hubTitle[loc],
    description:
      loc === 'zh'
        ? '免费的 AI 投资小工具:组合共识体检、标的对比——把传奇投资人的共识变成你能用的判断。'
        : 'Free AI-investing tools: portfolio consensus check and stock comparison — turn legendary-investor consensus into decisions you can use.',
    alternates: localeAlternates(loc, '/tools'),
  };
}

export default async function ToolsHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;

  const tools = [
    {
      href: `/${loc}/tools/portfolio`,
      title: dict.tools.portfolioTitle[loc],
      tagline: dict.tools.portfolioTagline[loc],
      badge: loc === 'zh' ? '新' : 'New',
    },
    {
      href: `/${loc}/follow`,
      title: dict.follow.hubTitle[loc],
      tagline: dict.follow.hubIntro[loc],
      badge: loc === 'zh' ? '新' : 'New',
    },
    {
      href: `/${loc}/compare`,
      title: dict.compare.title[loc],
      tagline: dict.tools.compareTagline[loc],
      badge: null,
    },
  ];

  return (
    <div className="container-page py-12">
      <header className="max-w-3xl">
        <h1 className="section-title">{dict.tools.hubTitle[loc]}</h1>
        <p className="mt-3 text-lg text-slate-300">{dict.tools.hubIntro[loc]}</p>
      </header>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="card group flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white group-hover:text-accent">{tool.title}</h2>
              {tool.badge && <span className="pill text-accent">{tool.badge}</span>}
            </div>
            <p className="mt-2 flex-1 text-sm text-slate-400">{tool.tagline}</p>
            <span className="mt-4 text-sm font-medium text-accent">{dict.tools.open[loc]} →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
