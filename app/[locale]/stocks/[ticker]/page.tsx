import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { provider } from '@/lib/data/provider';
import { getStocks } from '@/lib/data/stocks';
import { buildConsensus } from '@/lib/data/consensus';
import { investors } from '@/lib/data/investors';
import { getTheme } from '@/lib/data/themes';
import Sparkline from '@/components/Sparkline';
import LiveQuote from '@/components/LiveQuote';
import ThemeCard from '@/components/ThemeCard';
import Disclaimer from '@/components/Disclaimer';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getStocks().map((s) => ({ locale, ticker: s.ticker })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; ticker: string }>;
}): Promise<Metadata> {
  const { locale, ticker } = await params;
  const stock = await provider.getStock(ticker);
  if (!stock) return {};
  return { title: `${stock.ticker} · ${stock.name[locale as Locale]}` };
}

export default async function StockDetailPage({
  params,
}: {
  params: Promise<{ locale: string; ticker: string }>;
}) {
  const { locale, ticker } = await params;
  const loc = locale as Locale;
  const stock = await provider.getStock(ticker);
  if (!stock) notFound();

  const holders = buildConsensus(investors).find((e) => e.ticker === stock.ticker)?.holders ?? [];
  const relatedThemes = stock.themeIds.map((id) => getTheme(id)).filter((t) => t !== undefined);

  return (
    <div className="container-page py-12">
      <Link href={`/${loc}/stocks`} className="text-sm text-slate-400 hover:text-white">
        ← {dict.nav.stocks[loc]}
      </Link>

      <header className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            <span className="font-mono">{stock.ticker}</span>
            <span className="ml-3 text-xl font-bold text-slate-300">{stock.name[loc]}</span>
          </h1>
          <p className="mt-1 text-slate-400">{stock.role[loc]}</p>
          <div className="mt-3 text-2xl">
            <LiveQuote ticker={stock.ticker} />
          </div>
        </div>
        <div className="text-right">
          <Sparkline data={stock.trend} width={180} height={56} />
          <div className="mt-1 text-xs text-slate-600">{dict.labels.illustrativeTrend[loc]}</div>
        </div>
      </header>

      {/* Bull / risk */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="card">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gain">{dict.labels.bullCase[loc]}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{stock.bull[loc]}</p>
        </div>
        <div className="card">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-loss">{dict.labels.risks[loc]}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{stock.risk[loc]}</p>
        </div>
      </div>

      {/* Investors holding it */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-white">{dict.labels.heldByInvestors[loc]}</h2>
        {holders.length > 0 ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {holders.map((h) => (
              <Link
                key={h.slug}
                href={`/${loc}/investors/${h.slug}`}
                className="card flex items-baseline justify-between gap-3 py-4"
              >
                <span className="font-medium text-white">{h.name[loc]}</span>
                <span className="text-sm text-slate-400">{h.note[loc]}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-500">{dict.labels.noHolders[loc]}</p>
        )}
      </section>

      {/* Related themes */}
      {relatedThemes.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-white">{dict.labels.inThemes[loc]}</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedThemes.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} locale={loc} href={`/${loc}/market#${theme.id}`} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-12 max-w-3xl">
        <Disclaimer locale={loc} />
      </div>
    </div>
  );
}
