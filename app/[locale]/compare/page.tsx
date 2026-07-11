import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { provider } from '@/lib/data/provider';
import CompareTool from '@/components/CompareTool';
import Disclaimer from '@/components/Disclaimer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: dict.nav.compare[locale as Locale] };
}

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const stocks = await provider.getStocks();

  return (
    <div className="container-page py-12">
      <header className="max-w-3xl">
        <h1 className="section-title">{dict.compare.title[loc]}</h1>
        <p className="mt-3 text-slate-300">
          {loc === 'zh'
            ? '把任意两只 AI 标的放在一起:共识分、持有人动作、多空逻辑与实时价,一屏对比。同类平台把对比功能放在付费档,这里免费。'
            : 'Put any two AI stocks side by side: Consensus Score, holder actions, bull/risk views, and live prices. Incumbents paywall comparison — here it’s free.'}
        </p>
        <div className="mt-4">
          <Disclaimer locale={loc} />
        </div>
      </header>

      <div className="mt-8">
        <CompareTool stocks={stocks} locale={loc} />
      </div>
    </div>
  );
}
