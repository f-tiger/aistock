import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { provider } from '@/lib/data/provider';
import InvestorBrowser from '@/components/InvestorBrowser';
import Disclaimer from '@/components/Disclaimer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: dict.nav.investors[loc],
    description: loc === 'zh'
      ? '巴菲特、段永平、Cathie Wood 等 8 位传奇投资人的 AI 持仓与投资逻辑,基于公开 13F 披露,附来源与截至日期。'
      : 'The AI positioning and reasoning of eight legendary investors - Buffett, Duan Yongping, Cathie Wood and more - from public 13F filings, sourced and dated.',
    alternates: localeAlternates(loc, '/investors'),
  };
}

export default async function InvestorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const [investors, themes] = await Promise.all([provider.getInvestors(), provider.getThemes()]);
  const themeOptions = themes.map((t) => ({ id: t.id, label: t.name[loc] }));

  return (
    <div className="container-page py-12">
      <header className="max-w-3xl">
        <h1 className="section-title">{dict.labels.featuredInvestors[loc]}</h1>
        <p className="mt-3 text-slate-300">
          {loc === 'zh'
            ? '基于公开 13F 披露与公开报道，整理传奇投资人在 AI 上的具体布局与投资逻辑——而非罗列其全部持仓。'
            : 'Drawn from public 13F filings and reporting, these profiles focus on each legend’s AI positioning and reasoning — not their entire portfolio.'}
        </p>
        <div className="mt-4">
          <Disclaimer locale={loc} />
        </div>
      </header>

      <div className="mt-8">
        <InvestorBrowser investors={investors} themeOptions={themeOptions} locale={loc} />
      </div>
    </div>
  );
}
