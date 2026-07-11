# [Hacker News · Show HN]

**Title:** Show HN: I quantified 8 legendary investors' AI bets into one score

**URL:** https://ai-investing-compass.pages.dev/en/consensus/

**First comment (post immediately after submitting):**

I wanted to know whether Buffett, Duan Yongping, and Cathie Wood actually agree on AI stocks. Existing 13F trackers list entire portfolios but don't focus on the AI theme, and paywall comparisons.

So I built the Compass Consensus Score: each tracked investor's disclosed action on a stock (new/added/trimmed/exited) maps to points, plus a bonus when holders span value+growth+macro styles. Fully published formula, refreshed each 13F season.

Fun findings: AMZN scores 98 (the only "strong consensus" — five holders across three styles). NVDA scores just 42, because Duan Yongping added 6.6M shares while Tepper and Coatue trimmed — the disagreement itself is the signal.

Stack: Next.js static export on Cloudflare Pages, KV for the newsletter, GitHub Actions for deploys, and the weekly content ops is automated end-to-end (scheduled job → research → data update → PR).

Bilingual (EN/中文). Educational only, not investment advice. Would love feedback on the scoring methodology.
