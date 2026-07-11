import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { provider } from '@/lib/data/provider';
import StockTable from '@/components/StockTable';
import AsOfBadge from '@/components/AsOfBadge';
import Disclaimer from '@/components/Disclaimer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: dict.nav.market[loc],
    description: loc === 'zh'
      ? '五大 AI 赛道(算力/基建/应用/能源/中概)的多空逻辑、主要风险与代表标的,基于公开 13F 与报道,每季更新。'
      : 'Bull cases, risks, and key names across five AI layers - compute, infrastructure, applications, energy, and China AI. From public filings, updated quarterly.',
    alternates: localeAlternates(loc, '/market'),
  };
}

export default async function MarketPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const themes = await provider.getThemes();

  return (
    <div className="container-page py-12">
      <header className="max-w-3xl">
        <h1 className="section-title">{dict.nav.market[loc]}</h1>
        <p className="mt-3 text-slate-300">
          {loc === 'zh'
            ? 'AI 板块的四个环节：算力、基建、应用、能源。每个赛道列出多头逻辑、主要风险与代表标的。'
            : 'Four layers of the AI market — compute, infrastructure, applications, energy — each with its bull case, key risks, and representative names.'}
        </p>
        <div className="mt-4">
          <Disclaimer locale={loc} />
        </div>
      </header>

      {/* in-page theme nav */}
      <nav className="mt-8 flex flex-wrap gap-2">
        {themes.map((theme) => (
          <a key={theme.id} href={`#${theme.id}`} className="pill hover:border-accent/50 hover:text-white">
            {theme.name[loc]}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-16">
        {themes.map((theme) => (
          <section key={theme.id} id={theme.id} className="scroll-mt-24">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-white">{theme.name[loc]}</h2>
              <AsOfBadge asOf={theme.asOf} locale={loc} />
            </div>
            <p className="mt-3 max-w-3xl text-slate-300">{theme.summary[loc]}</p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="card">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gain">{dict.labels.bullCase[loc]}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {theme.bullCase.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-gain">▲</span>
                      <span>{point[loc]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-loss">{dict.labels.risks[loc]}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {theme.risks.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-loss">▼</span>
                      <span>{point[loc]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <StockTable stocks={theme.stocks.filter((s) => s.ticker !== 'theme')} locale={loc} />
            </div>

            {theme.sources.length > 0 && (
              <p className="mt-4 text-xs text-slate-500">
                {dict.cta.sources[loc]}:{' '}
                {theme.sources.map((s, i) => (
                  <span key={s.url}>
                    {i > 0 && ' · '}
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="link-accent">{s.label}</a>
                  </span>
                ))}
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
