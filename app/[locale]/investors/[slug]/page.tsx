import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { provider } from '@/lib/data/provider';
import { investors } from '@/lib/data/investors';
import AsOfBadge from '@/components/AsOfBadge';
import ThemeCard from '@/components/ThemeCard';
import StanceBadge from '@/components/StanceBadge';
import LiveQuote from '@/components/LiveQuote';
import StockLink from '@/components/StockLink';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    investors.map((investor) => ({ locale, slug: investor.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const investor = await provider.getInvestor(slug);
  if (!investor) return {};
  return { title: investor.name[locale as Locale] };
}

export default async function InvestorDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const investor = await provider.getInvestor(slug);
  if (!investor) notFound();

  const allThemes = await provider.getThemes();
  const relatedThemes = allThemes.filter((theme) => investor.themeIds.includes(theme.id));

  return (
    <div className="container-page py-12">
      <Link href={`/${loc}/investors`} className="text-sm text-slate-400 hover:text-white">
        ← {dict.cta.back[loc]}
      </Link>

      <header className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">{investor.name[loc]}</h1>
          <p className="mt-1 text-slate-400">{investor.firm[loc]}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {investor.stance && <StanceBadge stance={investor.stance} locale={loc} />}
            <span className="pill">{dict.labels.style[loc]}: {investor.style[loc]}</span>
            <span className="pill">{dict.labels.horizon[loc]}: {investor.horizon[loc]}</span>
          </div>
        </div>
        <AsOfBadge asOf={investor.asOf} locale={loc} />
      </header>

      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">{investor.summary[loc]}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Thesis */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-white">{dict.labels.thesis[loc]}</h2>
          <div className="mt-4 space-y-4">
            {investor.thesis.map((para, i) => (
              <p key={i} className="leading-relaxed text-slate-300">{para[loc]}</p>
            ))}
          </div>

          {investor.sources.length > 0 && (
            <p className="mt-6 text-xs text-slate-500">
              {dict.cta.sources[loc]}:{' '}
              {investor.sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 && ' · '}
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="link-accent">{s.label}</a>
                </span>
              ))}
            </p>
          )}
        </div>

        {/* Holdings */}
        <aside>
          <h2 className="text-xl font-bold text-white">{dict.labels.keyHoldings[loc]}</h2>
          <div className="mt-4 space-y-3">
            {investor.holdings.map((h) => (
              <div key={h.ticker} className="card p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-mono font-bold text-white">
                    <StockLink ticker={h.ticker} locale={loc} />
                  </span>
                  <span className="text-xs text-slate-500">{h.name[loc]}</span>
                </div>
                <div className="mt-1 text-sm"><LiveQuote ticker={h.ticker} /></div>
                <p className="mt-1 text-sm text-slate-300">{h.note[loc]}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Related themes */}
      {relatedThemes.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-white">{dict.labels.relatedThemes[loc]}</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedThemes.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} locale={loc} href={`/${loc}/market#${theme.id}`} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
