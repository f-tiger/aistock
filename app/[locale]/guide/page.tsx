import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { locales, type Localized } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import Disclaimer from '@/components/Disclaimer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: dict.nav.guide[locale as Locale] };
}

type Step = { href: string; title: Localized; body: Localized };

const steps: Step[] = [
  {
    href: '/market',
    title: { zh: '看懂 AI 行情有哪些环节', en: 'Learn the layers of the AI market' },
    body: {
      zh: '先分清你买的是算力、基建、应用还是能源——每一层的护城河与风险完全不同。',
      en: 'First separate compute vs. infrastructure vs. applications vs. energy — each layer has a very different moat and risk.',
    },
  },
  {
    href: '/investors',
    title: { zh: '看传奇投资人怎么布局', en: 'See how the legends are positioned' },
    body: {
      zh: '与其追逐概念，不如看清巴菲特、Cathie Wood、段永平等如何在 AI 中分配资本，以及他们的理由。',
      en: 'Rather than chase the theme, see how Buffett, Cathie Wood, Duan Yongping and others allocate to AI — and why.',
    },
  },
  {
    href: '/consensus',
    title: { zh: '对比持仓共识与分歧', en: 'Compare consensus and divergence' },
    body: {
      zh: '哪些标的被多人共同持有（如亚马逊），哪些存在明显分歧（如英伟达有人加有人减）。',
      en: 'Which names many hold in common (e.g. Amazon), and where they clearly disagree (e.g. Nvidia — some add, some trim).',
    },
  },
  {
    href: '/stocks',
    title: { zh: '研究具体个股', en: 'Research individual stocks' },
    body: {
      zh: '逐只看多空逻辑、所属赛道、哪些大佬持有，以及（可选的）实时价。',
      en: 'Go stock by stock: bull/risk view, themes, which legends hold it, and (optional) live price.',
    },
  },
  {
    href: '/long-term',
    title: { zh: '建立长期投资纪律', en: 'Build long-term discipline' },
    body: {
      zh: '把能力圈、护城河、估值纪律、仓位管理装进一份可执行的检查清单。',
      en: 'Turn competence, moats, valuation discipline, and position sizing into an actionable checklist.',
    },
  },
  {
    href: '/glossary',
    title: { zh: '不懂的术语随时查', en: 'Look up any term as you go' },
    body: {
      zh: '13F、capex、HBM、护城河、定投……一处查清。',
      en: '13F, capex, HBM, moats, dollar-cost averaging… all in one place.',
    },
  },
];

const rules: Localized[] = [
  { zh: '只投你真正理解的——分清你买的是哪一层。', en: 'Invest only in what you understand — know which layer you’re buying.' },
  { zh: '为增长付的价格决定回报——留出安全边际。', en: 'The price you pay for growth determines your return — keep a margin of safety.' },
  { zh: '控制单一仓位——活下来才能复利。', en: 'Cap any single position — survive to compound.' },
];

export default async function GuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <div className="container-page py-12">
      <header className="max-w-3xl">
        <span className="pill">{dict.tagline[loc]}</span>
        <h1 className="mt-4 section-title">{dict.nav.guide[loc]}</h1>
        <p className="mt-3 text-lg text-slate-300">
          {loc === 'zh'
            ? '第一次研究 AI 投资？按下面六步走，从看懂行情到建立长期纪律——本站为教育用途，帮你建立框架，而非给你买卖信号。'
            : 'New to AI investing? Follow these six steps — from understanding the market to building long-term discipline. This site is educational: it gives you a framework, not buy/sell signals.'}
        </p>
        <div className="mt-5">
          <Disclaimer locale={loc} />
        </div>
      </header>

      {/* Steps */}
      <ol className="mt-10 space-y-4">
        {steps.map((step, i) => (
          <li key={step.href}>
            <Link href={`/${loc}${step.href}`} className="card group flex items-start gap-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 font-mono text-sm font-bold text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <h2 className="text-base font-bold text-white">{step.title[loc]}</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{step.body[loc]}</p>
              </div>
              <span className="self-center text-accent opacity-0 transition group-hover:opacity-100">→</span>
            </Link>
          </li>
        ))}
      </ol>

      {/* Three rules */}
      <section className="mt-12 rounded-2xl border border-white/10 bg-ink-900/60 p-6">
        <h2 className="text-xl font-bold text-white">
          {loc === 'zh' ? '三条铁律' : 'Three rules to remember'}
        </h2>
        <ul className="mt-4 space-y-3">
          {rules.map((r, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                {i + 1}
              </span>
              <span>{r[loc]}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href={`/${loc}/market`} className="btn-primary">{dict.cta.explore[loc]}</Link>
        <Link href={`/${loc}/long-term`} className="btn-ghost">{dict.nav.longTerm[loc]} →</Link>
      </div>
    </div>
  );
}
