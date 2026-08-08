import type { Locale } from '@/lib/i18n/config';
import snapshot from '@/lib/data/market-snapshot.json';

type Snap = {
  asOf: string;
  source?: string;
  quotes: Record<
    string,
    { price: number; changePct: number; offHighPct?: number; fromLowPct?: number; currency?: string }
  >;
};

/**
 * 每日行情脉搏:构建时读入 daily-refresh.yml 生成的快照,零运行时依赖。
 * 快照为空(首次运行前 / 刷新连续失败)时整块不渲染,页面无感降级。
 */
export default function MarketPulse({ locale }: { locale: Locale }) {
  const snap = snapshot as Snap;
  const rows = Object.entries(snap.quotes ?? {});
  if (!snap.asOf || rows.length === 0) return null;
  rows.sort((a, b) => Math.abs(b[1].changePct) - Math.abs(a[1].changePct));
  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">
          {locale === 'zh' ? '每日行情脉搏' : 'Daily market pulse'}
        </h2>
        <span className="pill">
          {locale === 'zh' ? '数据截至' : 'As of'}: {snap.asOf} · {snap.source ?? 'Yahoo Finance'}
        </span>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="py-2 pr-4">{locale === 'zh' ? '标的' : 'Ticker'}</th>
              <th className="py-2 pr-4">{locale === 'zh' ? '价格' : 'Price'}</th>
              <th className="py-2 pr-4">{locale === 'zh' ? '日涨幅' : 'Day'}</th>
              <th className="py-2 pr-4">{locale === 'zh' ? '距52周高' : 'Off 52w high'}</th>
              <th className="py-2">{locale === 'zh' ? '距52周低' : 'From 52w low'}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([t, q]) => (
              <tr key={t} className="border-t border-white/5 text-slate-300">
                <td className="py-2 pr-4 font-semibold text-white">{t}</td>
                <td className="py-2 pr-4">
                  {q.price.toLocaleString()} {q.currency ?? 'USD'}
                </td>
                <td className={`py-2 pr-4 ${q.changePct >= 0 ? 'text-gain' : 'text-loss'}`}>
                  {q.changePct > 0 ? '+' : ''}
                  {q.changePct}%
                </td>
                <td className="py-2 pr-4">{q.offHighPct != null ? `${q.offHighPct}%` : '—'}</td>
                <td className="py-2">{q.fromLowPct != null ? `+${q.fromLowPct}%` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        {locale === 'zh'
          ? '快照每日自动刷新(收盘后);非实时,非投资建议。'
          : 'Snapshot auto-refreshes daily after US close. Not real-time; not investment advice.'}
      </p>
    </section>
  );
}
