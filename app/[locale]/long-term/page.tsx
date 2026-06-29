import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { principles } from '@/lib/data/principles';
import PrincipleCard from '@/components/PrincipleCard';
import Disclaimer from '@/components/Disclaimer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: dict.nav.longTerm[locale as Locale] };
}

const checklist: { zh: string; en: string }[] = [
  { zh: '我能用一句话说清这家公司怎么赚钱吗？', en: 'Can I explain in one sentence how this company makes money?' },
  { zh: '它的护城河是什么？五年后还在吗？', en: 'What is its moat — and will it still exist in five years?' },
  { zh: '现在的估值是否已经透支了多年增长？', en: 'Does the current valuation already pre-spend years of growth?' },
  { zh: '这笔仓位占组合多少？最坏情况我能承受吗？', en: 'How big is this position — and can I survive the worst case?' },
  { zh: '我的买入理由是基本面，还是怕错过（FOMO）？', en: 'Is my reason fundamentals — or fear of missing out?' },
  { zh: '如果它下跌 50%，我会加仓、持有还是恐慌卖出？', en: 'If it fell 50%, would I add, hold, or panic-sell?' },
];

export default async function LongTermPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <div className="container-page py-12">
      <header className="max-w-3xl">
        <h1 className="section-title">{dict.nav.longTerm[loc]}</h1>
        <p className="mt-3 text-slate-300">
          {loc === 'zh'
            ? 'AI 板块波动剧烈、叙事多变。下面是六条经得起时间检验的长期投资原则，每条都附上应用到 AI 的具体角度。'
            : 'AI is volatile and narrative-driven. Below are six time-tested long-term principles, each with a concrete way to apply it to AI investing.'}
        </p>
      </header>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {principles.map((principle, i) => (
          <PrincipleCard key={principle.id} principle={principle} index={i} locale={loc} />
        ))}
      </div>

      {/* Checklist */}
      <section className="mt-12 rounded-2xl border border-white/10 bg-ink-900/60 p-6">
        <h2 className="text-xl font-bold text-white">{dict.labels.checklist[loc]}</h2>
        <ul className="mt-4 space-y-3">
          {checklist.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border border-accent/40 text-xs text-accent">
                {i + 1}
              </span>
              <span>{item[loc]}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 max-w-3xl">
        <Disclaimer locale={loc} />
      </div>
    </div>
  );
}
