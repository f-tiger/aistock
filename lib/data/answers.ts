import type { Localized } from '@/lib/i18n/config';
import { computeScores, convictionIndex, scoreBand } from './score';
import { investors } from './investors';
import { faq, type FaqItem } from './faq';

const IGNORE = new Set(['—', 'theme', '']);

/**
 * Data-backed Q&A for the /answers GEO hub. Answers are generated from the live
 * Consensus Score data so the page is unique, current, and easy for AI answer
 * engines (and search snippets) to cite. Educational, not advice.
 */
export function buildAnswers(): FaqItem[] {
  const scores = computeScores();
  const top3 = scores.slice(0, 3);
  const conv = convictionIndex();
  const mostHeld = [...scores].sort((a, b) => b.holders - a.holders)[0];

  const buffett = investors.find((i) => i.slug === 'warren-buffett');
  const buffettAi = buffett
    ? [
        ...new Set(
          buffett.holdings
            .filter((h) => (h.action ?? 'hold') !== 'exit')
            .map((h) => h.ticker.trim())
            .filter((t) => !IGNORE.has(t)),
        ),
      ]
    : [];

  const nvda = scores.find((s) => s.ticker === 'NVDA');
  const amzn = scores.find((s) => s.ticker === 'AMZN');

  const list3 = (loc: 'zh' | 'en') =>
    top3.map((s) => `${s.ticker} (${s.score})`).join(loc === 'zh' ? '、' : ', ');

  const computed: FaqItem[] = [
    {
      q: {
        zh: '哪些 AI 股票的传奇投资人共识最强?',
        en: 'Which AI stocks have the strongest legendary-investor consensus?',
      },
      a: {
        zh: `按「罗盘共识分」当前排名前三的是:${list3('zh')}。分数越高,代表被越多大佬持有、且近期动作偏加仓。完整榜单见共识榜。`,
        en: `By the Compass Consensus Score, the current top three are ${list3('en')}. A higher score means more of the tracked legends hold it and recent actions lean toward adding. See the full leaderboard on the consensus page.`,
      },
    },
    {
      q: {
        zh: '8 位传奇投资人本季对 AI 是更看多还是更谨慎?',
        en: 'Are the legends more bullish or cautious on AI this quarter?',
      },
      a: {
        zh: `「AI 共识温度计」当前为 ${conv.index}/100(${conv.band === 'high' ? '高信念' : conv.band === 'balanced' ? '中性' : '偏谨慎'}),取 ${conv.breadth} 只共识标的的平均共识分,净动作方向为${conv.netTilt >= 0 ? '增持' : '减持'}。这是对公开持仓的汇总,不是行情预测。`,
        en: `The AI Conviction Index is currently ${conv.index}/100 (${conv.band}), the mean Consensus Score across ${conv.breadth} consensus names, with net action ${conv.netTilt >= 0 ? 'adding' : 'trimming'}. It summarizes disclosed positioning, not a market forecast.`,
      },
    },
    {
      q: {
        zh: '被最多传奇投资人持有的 AI 股票是哪只?',
        en: 'Which AI stock is held by the most legendary investors?',
      },
      a: {
        zh: `${mostHeld.ticker}(${mostHeld.name.zh})——本站收录的投资人中有 ${mostHeld.holders} 位持有,共识分 ${mostHeld.score}(${scoreBand(mostHeld.score) === 'strong' ? '强共识' : '共识'})。`,
        en: `${mostHeld.ticker} (${mostHeld.name.en}) — held by ${mostHeld.holders} of the tracked investors, with a Consensus Score of ${mostHeld.score}.`,
      },
    },
    {
      q: { zh: '巴菲特 / 伯克希尔在 AI 上买了什么?', en: 'What AI does Buffett / Berkshire own?' },
      a: {
        zh: `本站收录的巴菲特 AI 相关持仓包括:${buffettAi.join('、') || '—'}。伯克希尔以价值风格著称,其 AI 敞口更偏「云与平台」而非直接的芯片博弈。详见其投资人档案。`,
        en: `Buffett’s AI-relevant holdings tracked here include: ${buffettAi.join(', ') || '—'}. Known for a value style, Berkshire’s AI exposure leans toward cloud/platforms rather than a direct chip bet. See the investor profile for details.`,
      },
    },
    {
      q: {
        zh: '英伟达和亚马逊,传奇投资人更偏好谁?',
        en: 'Nvidia vs Amazon — which do the legends prefer?',
      },
      a: {
        zh: `按当前共识分,${(amzn?.score ?? 0) >= (nvda?.score ?? 0) ? `亚马逊 ${amzn?.score ?? '—'} 高于英伟达 ${nvda?.score ?? '—'}` : `英伟达 ${nvda?.score ?? '—'} 高于亚马逊 ${amzn?.score ?? '—'}`}。两只都是大佬间的分歧标的:有人重仓加码、也有人减持或清仓(如伯克希尔 2026Q1 清仓亚马逊、段永平大幅加仓英伟达)。分数反映的是披露动作,不是股价预测。`,
        en: `By the current Consensus Score, ${(amzn?.score ?? 0) >= (nvda?.score ?? 0) ? `Amazon at ${amzn?.score ?? '—'} sits above Nvidia at ${nvda?.score ?? '—'}` : `Nvidia at ${nvda?.score ?? '—'} sits above Amazon at ${amzn?.score ?? '—'}`}. Both split the legends: some add heavily while others trim or exit (Berkshire exited Amazon in Q1 2026; Duan Yongping added sharply to Nvidia). The score reflects disclosed actions, not a price forecast.`,
      },
    },
  ];

  // Lead with the foundational definitions/compliance answers, then the live ones.
  return [faq[0], ...computed, faq[2], faq[4]];
}
