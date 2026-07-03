import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { provider } from '@/lib/data/provider';
import { getTheme } from '@/lib/data/themes';
import Disclaimer from '@/components/Disclaimer';
import NewsletterSignup from '@/components/NewsletterSignup';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: dict.nav.news[locale as Locale] };
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const updates = await provider.getUpdates();

  return (
    <div className="container-page py-12">
      <header className="max-w-3xl">
        <h1 className="section-title">{dict.nav.news[loc]}</h1>
        <p className="mt-3 text-slate-300">
          {loc === 'zh'
            ? 'AI 板块与传奇投资人的关键动态时间线——结构化、带日期、附来源。'
            : 'A timeline of key AI-market and legendary-investor developments — structured, dated, and sourced.'}
        </p>
        <div className="mt-4">
          <Disclaimer locale={loc} />
        </div>
      </header>

      <ol className="mt-10 space-y-5 border-l border-white/10 pl-5">
        {updates.map((u) => (
          <li key={u.id} className="relative">
            <span className="absolute -left-[1.55rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
            <article className="card">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <time className="font-mono text-slate-400" dateTime={u.date}>{u.date}</time>
                {u.themeIds.map((id) => {
                  const theme = getTheme(id);
                  return theme ? <span key={id} className="pill">{theme.name[loc]}</span> : null;
                })}
                {u.tickers?.map((t) => (
                  <span key={t} className="pill font-mono">{t}</span>
                ))}
              </div>
              <h2 className="mt-2 text-base font-bold text-white">{u.title[loc]}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{u.summary[loc]}</p>
              <p className="mt-3 text-xs text-slate-500">
                {dict.cta.sources[loc]}:{' '}
                {u.sources.map((s, i) => (
                  <span key={s.url}>
                    {i > 0 && ' · '}
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="link-accent">{s.label}</a>
                  </span>
                ))}
              </p>
            </article>
          </li>
        ))}
      </ol>

      <div className="mx-auto mt-12 max-w-2xl">
        <NewsletterSignup locale={loc} />
      </div>
    </div>
  );
}
