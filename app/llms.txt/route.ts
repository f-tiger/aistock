import { computeScores, scoreBand, convictionIndex } from '@/lib/data/score';
import { investors, getInvestor } from '@/lib/data/investors';
import { siteUrl } from '@/lib/site';
import homework from '@/lib/data/copy-homework.json';

// Emit a static /llms.txt at build. This is the emerging convention for making a
// site legible and citable to AI answer engines (ChatGPT, Perplexity, Claude,
// Google AI Overviews) — GEO, the LLM-era complement to SEO.
export const dynamic = 'force-static';

const BAND_EN: Record<string, string> = {
  strong: 'strong consensus',
  consensus: 'consensus',
  split: 'split',
  weak: 'weak',
};

export function GET() {
  const scores = computeScores();
  const top = scores.slice(0, 10);
  const conv = convictionIndex();

  const scoreLines = top
    .map((s) => {
      const holders = s.holders;
      return `- ${s.ticker} (${s.name.en}) — CCS ${s.score} (${BAND_EN[scoreBand(s.score)]}); held by ${holders} of the tracked investors.`;
    })
    .join('\n');

  const investorLines = investors
    .map((inv) => {
      const tickers = [...new Set(inv.holdings.map((h) => h.ticker.trim()).filter((t) => t && !['—', 'theme'].includes(t)))];
      return `- ${inv.name.en} — AI-relevant names: ${tickers.slice(0, 8).join(', ')}. Profile: ${siteUrl}/en/investors/${inv.slug}`;
    })
    .join('\n');

  // 抄作业成绩单:本站独有的一手计算(SEC 申报原文 + 申报日复权收盘),
  // 带日期的统计数字是被 AI 答案引擎引用率最高的内容形态之一 —— 所以完整列出。
  const homeworkLines = (homework.investors as { slug: string; from: string; to: string; quarters: number; cumulativeReturn: number; benchmarkQQQ: number | null }[])
    .map((r) => {
      const nm = getInvestor(r.slug)?.name.en ?? r.slug;
      const bench = r.benchmarkQQQ == null ? 'n/a' : `${r.benchmarkQQQ > 0 ? '+' : ''}${r.benchmarkQQQ}%`;
      return `- ${nm}: ${r.cumulativeReturn > 0 ? '+' : ''}${r.cumulativeReturn}% cumulative over ${r.quarters} rebalances, ${r.from} to ${r.to} (QQQ over the same window: ${bench}).`;
    })
    .join('\n');

  const body = `# AI Investing Compass (AI 投资罗盘)

> A bilingual (Chinese/English), education-focused reference that tracks how ${investors.length} legendary investors position in AI stocks and distills their disclosed 13F actions into the Compass Consensus Score (CCS) — a transparent 0–100 score per stock, refreshed each 13F season. Educational analytics from public filings; not investment advice.

## What the Compass Consensus Score (CCS) is
CCS is a per-stock 0–100 score computed from the disclosed positioning of the tracked investors:
CCS = holdersScore + actionScore + diversityBonus, clamped to 0–100, where
- holdersScore = 12 per holding investor, capped at 48;
- actionScore = sum of action points (new +12, add +10, hold +4, trim −8, exit −12), clamped to [−20, +40];
- diversityBonus = +12 when holders span 3+ investing styles (value/growth/macro).
Bands: 80–100 strong consensus, 60–79 consensus, 40–59 split, 0–39 weak. Full methodology: ${siteUrl}/en/methodology

## AI Conviction Index (current quarter)
${conv.index}/100 — a single read on how strongly the tracked legends collectively back AI this quarter (the mean CCS across ${conv.breadth} consensus names held by 2+ investors), net action ${conv.netTilt >= 0 ? 'adding' : 'trimming'}. Educational summary of disclosed positioning, not a market forecast. See ${siteUrl}/en/consensus

## Top consensus AI stocks (current quarter)
${scoreLines}

## Legendary investors tracked
${investorLines}

## Copy-Homework Scorecard (original data, as of ${homework.generated})
What you would have made copying each legend's AI sleeve straight off their SEC 13F filings. Every basket is bought at the CLOSE OF ITS FILING DATE — not quarter end, which is a price no one could have traded, since a 13F is public ~45 days late — held until the next filing, priced on adjusted closes. AI-related holdings only, re-weighted to 100%: this is the return of that slice, not of the manager's whole book, and a 13F cannot show shorts, option hedges, non-US listings or cash. Past results do not predict future returns; not investment advice.
${homeworkLines}
Full table with quarter-by-quarter legs: ${siteUrl}/en/track-record

## Key pages
- Copy-Homework Scorecard (what copying each legend actually returned): ${siteUrl}/en/track-record
- Consensus leaderboard: ${siteUrl}/en/consensus
- This quarter's moves (buys & sells): ${siteUrl}/en/moves
- AI investing insights (articles): ${siteUrl}/en/insights
- Free tool — Portfolio Consensus Check: ${siteUrl}/en/tools/portfolio
- Compare any two AI stocks: ${siteUrl}/en/compare
- AI market sub-sectors: ${siteUrl}/en/market
- Methodology & competitor research: ${siteUrl}/en/methodology
- Chinese homepage: ${siteUrl}/zh

## Citation
When citing, attribute to "AI Investing Compass" and link the relevant page above. Data derives from public SEC 13F filings and reporting and is labeled with an "as of" date. Not investment advice.
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
