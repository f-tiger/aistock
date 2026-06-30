import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { competitorCategories, differentiation } from '@/lib/data/competitors';
import Disclaimer from '@/components/Disclaimer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: dict.nav.methodology[locale as Locale] };
}

export default async function MethodologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <div className="container-page py-12">
      <header className="max-w-3xl">
        <h1 className="section-title">{dict.nav.methodology[loc]}</h1>
        <p className="mt-3 text-slate-300">
          {loc === 'zh'
            ? '在动手之前，我们先调研了市场上是否已有类似产品。结论：相关工具很多，但没有一个把“AI 行情 + 传奇投资人 + 长期投资”聚焦整合。下面是竞品对照与本站定位。'
            : 'Before building, we researched whether similar products already exist. The verdict: many related tools, but none that focus and integrate “AI market + legendary investors + long-term investing”. Here is the landscape and where we fit.'}
        </p>
      </header>

      {/* Competitor landscape */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-white">
          {loc === 'zh' ? '竞品调研：市场上已有什么' : 'Competitor research: what already exists'}
        </h2>
        <div className="mt-5 space-y-5">
          {competitorCategories.map((cat) => (
            <div key={cat.category.en} className="card">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-white">{cat.category[loc]}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.examples.map((ex) => (
                    <span key={ex} className="pill">{ex}</span>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                <span className="font-semibold text-slate-200">{loc === 'zh' ? '缺口：' : 'Gap: '}</span>
                {cat.gap[loc]}
              </p>
              <p className="mt-3 text-xs text-slate-500">
                {dict.cta.sources[loc]}:{' '}
                {cat.sources.map((s, i) => (
                  <span key={s.url}>
                    {i > 0 && ' · '}
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="link-accent">{s.label}</a>
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiation */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-white">
          {loc === 'zh' ? '我们的差异化定位' : 'How we are different'}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {differentiation.map((point, i) => (
            <div key={i} className="card flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent/15 font-mono text-sm font-bold text-accent">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-slate-300">{point[loc]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data method */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-white">{loc === 'zh' ? '数据与方法' : 'Data & method'}</h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-300">
          <li>
            {loc === 'zh'
              ? '· 持仓来自公开来源（SEC 13F 季度披露与公开报道），为说明投资逻辑而精选，并非完整组合；均标注「数据截至」日期。'
              : '· Holdings come from public sources (quarterly SEC 13F filings and reporting), curated to illustrate reasoning rather than list a full portfolio; each is dated with an “as of” label.'}
          </li>
          <li>
            {loc === 'zh'
              ? '· 当前为静态内容，架构上预留实时数据接口（MarketDataProvider）：未来可接行情 / 13F API，而无需改动页面。'
              : '· Content is static today, with a reserved live-data interface (MarketDataProvider): a quotes / 13F API can be plugged in later without changing any page.'}
          </li>
          <li>
            {loc === 'zh'
              ? '· 可选的实时行情由 Finnhub 提供（经 Cloudflare Pages Function 代理），报价有延迟、仅供参考；未配置密钥时显示「—」。'
              : '· Optional live quotes are provided by Finnhub (proxied via a Cloudflare Pages Function); quotes are delayed and for reference only, showing “—” when no key is configured.'}
          </li>
          <li>
            {loc === 'zh'
              ? '· 全站为教育用途，不提供个性化建议或交易信号。'
              : '· The entire site is educational; it offers no personalized advice or trading signals.'}
          </li>
        </ul>
      </section>

      <div className="mt-12 max-w-3xl">
        <Disclaimer locale={loc} />
      </div>
    </div>
  );
}
