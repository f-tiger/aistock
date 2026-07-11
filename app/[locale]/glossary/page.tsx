import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { localeAlternates } from '@/lib/seo';
import { glossary } from '@/lib/data/glossary';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: dict.nav.glossary[loc],
    description: loc === 'zh'
      ? '投资术语速查:13F、资本开支、HBM、护城河、定投、核心卫星等关键概念,中英双语解释。'
      : 'A bilingual glossary of key investing terms: 13F, capex, HBM, moats, dollar-cost averaging, core-satellite, and more.',
    alternates: localeAlternates(loc, '/glossary'),
  };
}

export default async function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <div className="container-page py-12">
      <header className="max-w-3xl">
        <h1 className="section-title">{dict.nav.glossary[loc]}</h1>
        <p className="mt-3 text-slate-300">
          {loc === 'zh'
            ? '看懂 AI 行情与大佬持仓需要的关键术语——简明、双语、可随时查阅。'
            : 'Key terms for understanding AI markets and investor holdings — concise, bilingual, and easy to reference.'}
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {glossary.map((group) => (
          <section key={group.title.en}>
            <h2 className="text-xl font-bold text-white">{group.title[loc]}</h2>
            <dl className="mt-5 grid gap-4 md:grid-cols-2">
              {group.terms.map((t) => (
                <div key={t.term.en} className="card">
                  <dt className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">{t.term[loc]}</span>
                    {t.tag && <span className="pill font-mono">{t.tag}</span>}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-300">{t.def[loc]}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
