import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { provider } from '@/lib/data/provider';
import InvestorCard from '@/components/InvestorCard';
import Disclaimer from '@/components/Disclaimer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: dict.nav.investors[locale as Locale] };
}

export default async function InvestorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const investors = await provider.getInvestors();

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

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {investors.map((investor) => (
          <InvestorCard key={investor.slug} investor={investor} locale={loc} />
        ))}
      </div>
    </div>
  );
}
