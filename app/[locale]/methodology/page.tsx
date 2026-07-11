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

      {/* Consensus Score methodology */}
      <section id="ccs" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold text-white">
          {loc === 'zh' ? '罗盘共识分(CCS)方法论' : 'Compass Consensus Score (CCS) methodology'}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
          {loc === 'zh'
            ? 'CCS 把本站追踪的传奇投资人对每只股票的公开持仓动作,量化为 0–100 的可解释评分。公式完全公开:'
            : 'CCS quantifies the tracked legends’ disclosed positioning on each stock into an explainable 0–100 score. The formula is fully public:'}
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-ink-900/60 p-4 font-mono text-sm text-slate-300">
          CCS = holdersScore + actionScore + diversityBonus&nbsp;&nbsp;(0–100)
          <br />· holdersScore&nbsp;&nbsp;= 12 × {loc === 'zh' ? '持有人数' : 'holders'} (≤48)
          <br />· actionScore&nbsp;&nbsp;&nbsp;= Σ [{loc === 'zh' ? '新建仓' : 'new'} +12 · {loc === 'zh' ? '增持' : 'add'} +10 · {loc === 'zh' ? '持有' : 'hold'} +4 · {loc === 'zh' ? '减持' : 'trim'} −8 · {loc === 'zh' ? '清仓' : 'exit'} −12] ∈ [−20, +40]
          <br />· diversityBonus = +12 {loc === 'zh' ? '当持有人横跨 ≥3 种风格(价值/成长/宏观)' : 'when holders span ≥3 style buckets (value/growth/macro)'}
        </div>
        <ul className="mt-4 max-w-3xl space-y-2 text-sm leading-relaxed text-slate-300">
          <li>
            {loc === 'zh'
              ? '· 分档:≥80 强共识 / 60–79 共识 / 40–59 分歧 / <40 弱共识。跨风格共识(如价值派与成长派同时持有)比单一流派内部的一致更有信息量,故设加成。'
              : '· Bands: ≥80 strong / 60–79 consensus / 40–59 split / <40 weak. Cross-style agreement (e.g. value and growth investors holding the same name) carries more information than one school agreeing with itself — hence the bonus.'}
          </li>
          <li>
            {loc === 'zh'
              ? '· 数据每季随 13F 更新;每期评分快照会被保留,逐季积累成可回溯的共识分时间序列——这是本站独有的数据资产。'
              : '· Data refreshes each 13F season; every period’s snapshot is retained, accumulating a back-testable consensus time series — this site’s proprietary data asset.'}
          </li>
          <li>
            {loc === 'zh'
              ? '· CCS 是教育性分析指标,反映的是"大佬们的集体动作",不预测股价,不构成投资建议。'
              : '· CCS is an educational analytic reflecting the legends’ collective actions; it does not predict prices and is not investment advice.'}
          </li>
        </ul>
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
          <li>
            {loc === 'zh'
              ? '· 变现披露:站内「开户」区域含推广链接,经由链接开户本站可能获得返佣;这不影响内容独立性。Newsletter 邮箱仅用于发送更新,不出售、不共享。'
              : '· Monetization disclosure: the “open an account” sections contain referral links, and we may earn a commission from sign-ups; this does not influence our content. Newsletter emails are used only to send updates — never sold or shared.'}
          </li>
        </ul>
      </section>

      <div className="mt-12 max-w-3xl">
        <Disclaimer locale={loc} />
      </div>
    </div>
  );
}
