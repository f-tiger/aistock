import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { provider } from '@/lib/data/provider';
import StockBrowser from '@/components/StockBrowser';
import Disclaimer from '@/components/Disclaimer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: dict.nav.stocks[loc],
    description: loc === 'zh'
      ? '12+ 只 AI 核心标的档案:罗盘共识分、传奇投资人持有动作、多空逻辑与实时行情,支持搜索与赛道筛选。'
      : 'Profiles of core AI stocks: Consensus Score, legendary investor actions, bull and risk views, and live quotes, with search and filters.',
    alternates: localeAlternates(loc, '/stocks'),
  };
}

export default async function StocksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const [stocks, themes] = await Promise.all([provider.getStocks(), provider.getThemes()]);
  const themeOptions = themes.map((t) => ({ id: t.id, label: t.name[loc] }));

  return (
    <div className="container-page py-12">
      <header className="max-w-3xl">
        <h1 className="section-title">{dict.labels.allStocks[loc]}</h1>
        <p className="mt-3 text-slate-300">
          {loc === 'zh'
            ? '本站收录的 AI 相关个股：所属赛道、多/空逻辑、哪些大佬持有，以及可选的实时价。点击查看详情。'
            : 'AI-related stocks featured here: their themes, bull/risk view, which legends hold them, and optional live prices. Click for details.'}
        </p>
        <div className="mt-4">
          <Disclaimer locale={loc} />
        </div>
      </header>

      <div className="mt-8">
        <StockBrowser stocks={stocks} themeOptions={themeOptions} locale={loc} />
      </div>
    </div>
  );
}
