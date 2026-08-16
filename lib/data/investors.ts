import type { Investor } from './types';

/**
 * Curated profiles of legendary investors and their AI-related positioning.
 *
 * Holdings are drawn from public sources (quarterly SEC 13F filings and public
 * reporting) and are illustrative of each investor's AI stance, NOT a complete
 * portfolio. Each profile carries an `asOf` date and sources. This is education,
 * not advice — see the site-wide disclaimer.
 */
export const investors: Investor[] = [
  {
    slug: 'warren-buffett',
    name: { zh: '沃伦·巴菲特', en: 'Warren Buffett' },
    firm: { zh: '伯克希尔·哈撒韦', en: 'Berkshire Hathaway' },
    style: { zh: '价值投资 / 护城河', en: 'Value investing / moats' },
    horizon: { zh: '超长期（数十年）', en: 'Very long-term (decades)' },
    stance: 'cautious',
    styleTag: 'value',
    summary: {
      zh: 'Q2 2026 结束连续 14 个季度净卖出、转为净买入约 198 亿美元；Alphabet 再获约 170 亿美元增持，跃居第三大重仓（约 366 亿美元、占组合 9.4%）——AI 全栈押注在继任者 Abel 手上继续加码。',
      en: 'Q2 2026 ended a 14-quarter net-selling streak with ~$19.8B of net buying; Alphabet got another ~$17B, vaulting to the #3 holding (~$36.6B, 9.4% of the book) — the full-stack AI bet is compounding under Abel.',
    },
    thesis: [
      {
        zh: '巴菲特（及接棒的 Abel 团队）依旧只买能力圈内、无论谁赢都受益的复利企业——但 Q1 组合从 40 只砍到 26 只、15 项清仓，集中度大幅提高。',
        en: 'Buffett (and Abel’s team taking the reins) still buys compounding businesses inside the circle of competence — but Q1 cut the book from 40 to 26 names with 15 full exits, sharply concentrating the portfolio.',
      },
      {
        zh: 'Alphabet 获加仓 225%，成为伯克希尔最明确的 AI 表态：搜索现金流 + Gemini + 自研 TPU 的“全栈”，估值仍低于纯 AI 概念股。',
        en: 'The 225% Alphabet increase is Berkshire’s clearest AI statement: search cash flow + Gemini + in-house TPUs — full-stack AI still valued below pure-play AI names.',
      },
      {
        zh: 'Q2 转折点：结束 14 个季度的净卖出、净买入约 198 亿美元，同时回购自家股票约 45 亿美元；新进 D.R. Horton、增持 Delta/Lennar/纽约时报，清仓 Constellation Brands——买的是有现金流的实体，不是叙事。',
        en: 'The Q2 turn: 14 quarters of net selling ended with ~$19.8B of net buying plus ~$4.5B of buybacks; new D.R. Horton, added Delta/Lennar/NYT, exited Constellation Brands — buying cash-flowing businesses, not narratives.',
      },
    ],
    holdings: [
      { ticker: 'AAPL', name: { zh: '苹果', en: 'Apple' }, note: { zh: '第一大重仓,占组合 22.0%(申报中分 12 行,合并计)', en: '#1 holding at 22.0% of the book (12 separate lines in the filing, combined)' }, action: 'hold' },
      { ticker: 'GOOGL', name: { zh: '谷歌', en: 'Alphabet' }, note: { zh: 'A 类 9.4% + C 类 3.2% = 12.6%,两季连续加码的 AI 押注', en: 'Class A 9.4% + Class C 3.2% = 12.6% — the AI bet, added two quarters running' }, action: 'add' },
      { ticker: 'BAC', name: { zh: '美国银行', en: 'Bank of America' }, note: { zh: '9.2%,Q2 继续减持', en: '9.2%, trimmed again in Q2' }, action: 'exit' },
      { ticker: 'AMZN', name: { zh: '亚马逊', en: 'Amazon' }, note: { zh: 'Q1 已清仓,Q2 申报中确认未回补', en: 'Exited in Q1; the Q2 filing confirms it was not rebought' }, action: 'exit' },
    ],
    themeIds: ['applications', 'infrastructure'],
    asOf: '2026-06-30 (Q2 2026 13F, filed 2026-08-14)',
    sources: [
      { label: 'SEC EDGAR — 13F 申报原文(逐笔持仓)', url: 'https://www.sec.gov/Archives/edgar/data/1067983/000119312526352200/' },
      { label: 'CNBC — Berkshire adds $17 billion to Alphabet stake (2026-08-15)', url: 'https://www.cnbc.com/2026/08/15/berkshire-adds-17-billion-to-alphabet-stake.html' },
      { label: 'Forbes — Berkshire Hathaway turns buyer as Buffett backs Alphabet (2026-08-15)', url: 'https://www.forbes.com/sites/bill_stone/2026/08/15/berkshire-hathaway-turns-buyer-as-buffett-backs-alphabet/' },
      { label: 'Seeking Alpha — Tracking Berkshire portfolio Q2 2026', url: 'https://seekingalpha.com/article/4936983-tracking-berkshire-hathaway-portfolio-q2-2026-update' },
      { label: 'Seeking Alpha — Tracking Berkshire portfolio Q1 2026', url: 'https://seekingalpha.com/article/4905557-tracking-berkshire-hathaway-portfolio-q1-2026-update' },
      { label: 'MarketMinute — Berkshire slashes Apple-era caution, bets on Alphabet AI', url: 'https://markets.financialcontent.com/wral/article/marketminute-2026-1-1-the-great-pivot-berkshire-hathaway-slashes-apple-stake-to-bet-on-alphabets-ai-future' },
      { label: 'Forbes — Berkshire portfolio shifts as Abel reshapes the playbook', url: 'https://www.forbes.com/sites/bill_stone/2026/05/16/berkshire-portfolio-shifts-as-abel-reshapes-buffetts-playbook/' },
    ],
  },
  {
    slug: 'cathie-wood',
    name: { zh: '凯茜·伍德', en: 'Cathie Wood' },
    firm: { zh: 'ARK Invest', en: 'ARK Invest' },
    style: { zh: '颠覆式创新 / 高成长', en: 'Disruptive innovation / high growth' },
    horizon: { zh: '长期（5 年以上主题）', en: 'Long-term (5+ year themes)' },
    stance: 'bull',
    styleTag: 'growth',
    summary: {
      zh: '最激进的 AI 多头之一。押注 AI 基础设施与下一代算力——CoreWeave、Cerebras，并以核电（X-Energy）布局 AI 的“能源底座”。',
      en: 'One of the most aggressive AI bulls. Bets on AI infrastructure and next-gen compute — CoreWeave, Cerebras — and on nuclear (X-Energy) as AI’s energy base layer.',
    },
    thesis: [
      {
        zh: 'Wood 认为 AI 是跨行业的“通用技术”，会带来生产力大爆发；她偏好仍处早期、弹性最大的环节。',
        en: 'Wood views AI as a cross-industry “general-purpose technology” driving a productivity boom; she favors the earliest, highest-beta layers.',
      },
      {
        zh: 'Q1 2026 13F：组合约 129 亿美元、181 只标的，头号重仓特斯拉（8.2%），AMD 升至第二（4.3%）；本季增持 AMD、Tempus、Amazon、Alphabet、CoreWeave 等，新建 17 只、清仓 32 只。',
        en: 'Q1 2026 13F: ~$12.9B across 181 positions, anchored by Tesla (8.2%) with AMD now #2 (4.3%); she added AMD, Tempus, Amazon, Alphabet and CoreWeave, opening 17 names and exiting 32.',
      },
      {
        zh: '风格提示：高波动、高换手，回撤可能很大；适合作为组合中明确的“高风险卫星”而非核心。',
        en: 'Style note: high volatility and turnover with deep drawdowns — better as a clearly-sized high-risk satellite than a core holding.',
      },
    ],
    holdings: [
      { ticker: 'TSLA', name: { zh: '特斯拉', en: 'Tesla' }, note: { zh: '第一大重仓,占组合 7.5%', en: '#1 holding at 7.5% of the book' }, action: 'hold' },
      { ticker: 'AMD', name: { zh: 'AMD', en: 'AMD' }, note: { zh: '5.3%,第二大 AI 半导体仓', en: '5.3% — the largest AI-semis position' }, action: 'hold' },
      { ticker: 'TEM', name: { zh: 'Tempus AI', en: 'Tempus AI' }, note: { zh: '3.8%,AI + 医疗数据', en: '3.8% — AI plus healthcare data' }, action: 'hold' },
      { ticker: 'AMZN', name: { zh: '亚马逊', en: 'Amazon' }, note: { zh: '2.5%', en: '2.5%' }, action: 'hold' },
      { ticker: 'PLTR', name: { zh: 'Palantir', en: 'Palantir' }, note: { zh: '2.4%', en: '2.4%' }, action: 'hold' },
      { ticker: 'NVDA', name: { zh: '英伟达', en: 'NVIDIA' }, note: { zh: '1.8%', en: '1.8%' }, action: 'hold' },
    ],
    themeIds: ['infrastructure', 'compute', 'energy', 'physical-ai'],
    asOf: '2026-06-30 (Q2 2026 13F, filed 2026-08-14)',
    sources: [
      { label: 'SEC EDGAR — 13F 申报原文(逐笔持仓)', url: 'https://www.sec.gov/Archives/edgar/data/1697748/000110465926096910/' },
      { label: 'Seeking Alpha — Tracking ARK Invest 13F portfolio Q1 2026', url: 'https://seekingalpha.com/article/4903557-tracking-cathie-woods-ark-invest-13f-portfolio-q1-2026-update' },
      { label: 'TheStreet — Wood buys $72M Amazon / X-Energy', url: 'https://www.thestreet.com/investing/cathie-wood-buys-another-72m-of-mega-cap-amazon-stock' },
      { label: 'Motley Fool — Wood adds CoreWeave', url: 'https://www.fool.com/investing/2026/03/07/cathie-wood-bargain-hunting-2-ai-stocks-bought/' },
    ],
  },
  {
    slug: 'stanley-druckenmiller',
    name: { zh: '斯坦利·德鲁肯米勒', en: 'Stanley Druckenmiller' },
    firm: { zh: 'Duquesne Family Office', en: 'Duquesne Family Office' },
    style: { zh: '宏观 / 集中押注', en: 'Macro / concentrated bets' },
    horizon: { zh: '灵活，但重仓长期主题', en: 'Flexible, but concentrates on long themes' },
    stance: 'cautious',
    styleTag: 'macro',
    summary: {
      zh: '一季度惊人反手：清仓全部 Alphabet，资金转进 SanDisk、希捷、美光、博通、英特尔——押注 AI 的“存储/内存缺口”，科技敞口从 9.4% 翻倍至 18.4%。',
      en: 'A stunning Q1 reversal: exited Alphabet entirely and rotated into SanDisk, Seagate, Micron, Broadcom and Intel — betting on AI’s memory/storage bottleneck, with tech exposure doubling from 9.4% to 18.4%.',
    },
    thesis: [
      {
        zh: 'Druckenmiller 的招牌是“主题早期重仓、拥挤时离场”：上季度他还在买平台股，这季度整体清仓 38.5 万股 Alphabet、转向下一个供需失衡点。',
        en: 'Druckenmiller’s signature is sizing up early and leaving when crowded: last quarter he was buying platforms; this quarter he dumped all 385,000 Alphabet shares and moved to the next supply-demand imbalance.',
      },
      {
        zh: '新仓集中在存储与内存（SNDK、STX、MU）——AI 数据中心的 HBM/NAND 紧缺让存储成为“下一个卖铲人”，这与 Goldman 对冲基金 VIP 榜的集体动向一致。',
        en: 'New money is concentrated in storage and memory (SNDK, STX, MU) — the HBM/NAND squeeze from AI data centers makes storage the next picks-and-shovels trade, matching the herd move on Goldman’s Hedge Fund VIP list.',
      },
      {
        zh: '同时新建博通（定制 AI 芯片）与英特尔——绕开最拥挤的 Nvidia，从“算力的配套瓶颈”获取同一波需求。',
        en: 'He also opened Broadcom (custom AI silicon) and Intel — capturing the same demand wave through compute’s supporting bottlenecks instead of the most crowded name.',
      },
    ],
    holdings: [
      { ticker: 'TSM', name: { zh: '台积电', en: 'TSMC' }, note: { zh: '第一大 AI 仓,5.4%', en: 'Largest AI position at 5.4%' }, action: 'hold' },
      { ticker: 'AMZN', name: { zh: '亚马逊', en: 'Amazon' }, note: { zh: '4.6%', en: '4.6%' }, action: 'hold' },
      { ticker: 'GOOGL', name: { zh: '谷歌', en: 'Alphabet' }, note: { zh: '2.3%', en: '2.3%' }, action: 'hold' },
      { ticker: 'STX', name: { zh: '希捷', en: 'Seagate' }, note: { zh: '2.3%,数据中心存储', en: '2.3% — data-center storage' }, action: 'hold' },
      { ticker: 'SNDK', name: { zh: 'SanDisk', en: 'SanDisk' }, note: { zh: '1.5%,NAND 存储', en: '1.5% — NAND storage' }, action: 'hold' },
      { ticker: 'AMD', name: { zh: 'AMD', en: 'AMD' }, note: { zh: '0.8%', en: '0.8%' }, action: 'hold' },
    ],
    themeIds: ['memory', 'compute'],
    asOf: '2026-06-30 (Q2 2026 13F, filed 2026-08-14)',
    sources: [
      { label: 'SEC EDGAR — 13F 申报原文(逐笔持仓)', url: 'https://www.sec.gov/Archives/edgar/data/1536411/000153641126000006/' },
      { label: 'HeyGoTrade — Druckenmiller dumps GOOGL, rotates to SNDK/STX/MU', url: 'https://www.heygotrade.com/en/news/billionaire-13f-druckenmiller-tepper-amzn-googl/' },
      { label: 'BBAE — 13F highlights: where top investors moved in Q1 2026', url: 'https://www.bbae.com/blog/13f-highlights-where-top-investors-moved-in-q1-2026/' },
    ],
  },
  {
    slug: 'bill-ackman',
    name: { zh: '比尔·阿克曼', en: 'Bill Ackman' },
    firm: { zh: 'Pershing Square', en: 'Pershing Square' },
    style: { zh: '集中价值 / 优质成长', en: 'Concentrated value / quality growth' },
    horizon: { zh: '长期（数年）', en: 'Long-term (multi-year)' },
    stance: 'bull',
    styleTag: 'value',
    summary: {
      zh: '只持有少数高确定性公司。AI 敞口偏向“品质成长”而非投机——通过 Alphabet 等平台型龙头间接参与。',
      en: 'Holds only a handful of high-conviction names. Gains AI exposure through quality compounders like Alphabet rather than speculation.',
    },
    thesis: [
      {
        zh: 'Ackman 的风格是“少而精”：集中持有可预测、有护城河、现金流强的企业，长期持有。',
        en: 'Ackman runs a concentrated book of predictable, moat-protected, cash-generative businesses held for the long run.',
      },
      {
        zh: '对 AI，他更看重“以合理价格买入确定性赢家”，而非为高增长支付任意溢价。',
        en: 'On AI he prioritizes buying durable winners at sensible prices over paying any premium for hyper-growth.',
      },
    ],
    holdings: [
      { ticker: 'AMZN', name: { zh: '亚马逊', en: 'Amazon' }, note: { zh: '第一大 AI 仓,17.4%(组合仅 11 只)', en: 'Top AI position at 17.4% of an 11-name book' }, action: 'hold' },
      { ticker: 'MSFT', name: { zh: '微软', en: 'Microsoft' }, note: { zh: '15.3%', en: '15.3%' }, action: 'hold' },
      { ticker: 'META', name: { zh: 'Meta', en: 'Meta' }, note: { zh: '11.1%', en: '11.1%' }, action: 'hold' },
    ],
    themeIds: ['applications'],
    asOf: '2026-03-31 (Q1 2026 13F — Q2 尚未申报)',
    sources: [
      { label: 'SEC EDGAR — 13F 申报原文(逐笔持仓)', url: 'https://www.sec.gov/Archives/edgar/data/1336528/000117266126002336/' },
      { label: 'Super Investors — 13F portfolio trackers', url: 'https://super-investor.com/investors' },
      { label: 'Fiscal.ai — superinvestor portfolios', url: 'https://fiscal.ai/super-investors/' },
    ],
  },
  {
    slug: 'duan-yongping',
    name: { zh: '段永平', en: 'Duan Yongping' },
    firm: { zh: 'H&H International Investment', en: 'H&H International Investment' },
    style: { zh: '价值投资 / 本分（中国巴菲特）', en: 'Value investing (“China’s Buffett”)' },
    horizon: { zh: '超长期', en: 'Very long-term' },
    stance: 'cautious',
    styleTag: 'value',
    summary: {
      zh: '以苹果与伯克希尔为压舱石的价值投资者，2026 年明显“押注 AI 全产业链”：一季度英伟达加仓 91% 至第三大重仓、新建特斯拉、增持拼多多，同时清仓阿里。对华语读者尤具参考性。',
      en: 'A value investor anchored in Apple and Berkshire who leaned hard into the AI chain in 2026 — adding 91% to Nvidia (now #3), opening Tesla and adding PDD in Q1 while exiting Alibaba. Especially relevant for Chinese readers.',
    },
    thesis: [
      {
        zh: '段永平强调“本分”与能力圈：长期重仓自己彻底理解的苹果、伯克希尔，极少频繁交易。',
        en: 'Duan emphasizes staying within his competence: he holds Apple and Berkshire for the long run and rarely trades.',
      },
      {
        zh: '2026 一季度他把英伟达加仓 91%（约 660 万股）至第三大重仓（12.1%）、新建约 340 万股特斯拉（第五大、6.3%）、增持拼多多超 800 万股，同时清仓阿里巴巴——被媒体称为“布局 AI 全产业链”。',
        en: 'In Q1 2026 he added 91% to Nvidia (~6.6M shares, now #3 at 12.1%), opened a ~3.4M-share Tesla stake (#5 at 6.3%), added over 8M PDD shares, and exited Alibaba entirely — a full-chain AI tilt, as Chinese media put it.',
      },
      {
        zh: '他对苹果的表态值得注意：“很成熟、依然会增长，但股价不便宜了”——典型的估值纪律。',
        en: 'His note on Apple — “mature, still growing, but no longer cheap” — captures his valuation discipline.',
      },
    ],
    holdings: [
      { ticker: 'AAPL', name: { zh: '苹果', en: 'Apple' }, note: { zh: '绝对核心:占组合 41.1%', en: 'The anchor: 41.1% of the entire book' }, action: 'hold' },
      { ticker: 'TSLA', name: { zh: '特斯拉', en: 'Tesla' }, note: { zh: '7.4%', en: '7.4%' }, action: 'hold' },
      { ticker: 'NVDA', name: { zh: '英伟达', en: 'NVIDIA' }, note: { zh: '6.6%', en: '6.6%' }, action: 'hold' },
      { ticker: 'GOOGL', name: { zh: '谷歌', en: 'Alphabet' }, note: { zh: '3.6%', en: '3.6%' }, action: 'hold' },
      { ticker: 'MSFT', name: { zh: '微软', en: 'Microsoft' }, note: { zh: '1.5%', en: '1.5%' }, action: 'hold' },
    ],
    themeIds: ['compute', 'china-ai', 'applications', 'physical-ai'],
    asOf: '2026-06-30 (Q2 2026 13F, filed 2026-08-14)',
    sources: [
      { label: 'SEC EDGAR — 13F 申报原文(逐笔持仓)', url: 'https://www.sec.gov/Archives/edgar/data/1759760/000175976026000007/' },
      { label: '新浪财经 — 段永平最新千亿持仓：清仓阿里、新进特斯拉、加仓英伟达 660 万股', url: 'https://finance.sina.com.cn/wm/2026-05-20/doc-inhypnuh2605188.shtml' },
      { label: '腾讯新闻 — 段永平 Q1 持仓：加仓英伟达、谷歌、拼多多', url: 'https://news.qq.com/rain/a/20260521A043DX00' },
      { label: '21 经济网 — 巴菲特减持苹果，段永平大举押注 AI', url: 'https://www.21jingji.com/article/20260218/herald/a14b281c02621704764f11665adad126.html' },
      { label: '新浪财经 — 段永平 1380 亿元持仓曝光', url: 'https://finance.sina.com.cn/roll/2026-05-20/doc-inhypaen2711821.shtml' },
    ],
  },
  {
    slug: 'david-tepper',
    name: { zh: '大卫·泰珀', en: 'David Tepper' },
    firm: { zh: 'Appaloosa Management', en: 'Appaloosa Management' },
    style: { zh: '宏观 / 困境与周期', en: 'Macro / distressed & cyclical' },
    horizon: { zh: '中长期，灵活调仓', en: 'Medium-to-long, actively rotated' },
    stance: 'bull',
    styleTag: 'macro',
    summary: {
      zh: '2026 一季度把亚马逊近乎翻倍、推上第一大重仓（AI 角度=AWS 提速），同时减持英伟达与 AMD、加注 Micron——“押注 AI 变现端与内存周期，而非纯算力”。',
      en: 'In Q1 2026 he nearly doubled Amazon into his #1 position (AI angle = accelerating AWS), while trimming Nvidia and AMD and leaning into Micron — “betting on AI monetization and the memory cycle, not pure compute.”',
    },
    thesis: [
      {
        zh: 'Tepper 以逆向与周期嗅觉著称；他的 AI 配置正从芯片转向“AI 收入真正兑现”的地方。',
        en: 'Known for contrarian, cyclical instincts, Tepper is rotating his AI exposure from chips toward where AI revenue actually lands.',
      },
      {
        zh: '亚马逊成为最大仓位（约 15%），因 AWS 一季度同比增长 28%、为 15 个季度最快，且利润率高。',
        en: 'Amazon became his largest position (~15%) as AWS grew 28% YoY in Q1 — its fastest in 15 quarters — at a high margin.',
      },
      {
        zh: '他减持 Nvidia（约 13%）与 AMD（约 32%），并配置 Micron 押注 HBM 内存紧缺与中概（含阿里）。',
        en: 'He trimmed Nvidia (~13%) and AMD (~32%), added Micron on the HBM shortage, and keeps China tech (incl. Alibaba) exposure.',
      },
    ],
    holdings: [
      { ticker: 'AMZN', name: { zh: '亚马逊', en: 'Amazon' }, note: { zh: '第一大重仓,15.4%', en: '#1 holding at 15.4%' }, action: 'hold' },
      { ticker: 'MU', name: { zh: '美光', en: 'Micron' }, note: { zh: '14.6%,存储主线', en: '14.6% — the memory line' }, action: 'hold' },
      { ticker: 'TSM', name: { zh: '台积电', en: 'TSMC' }, note: { zh: '10.2%', en: '10.2%' }, action: 'hold' },
      { ticker: 'GOOGL', name: { zh: '谷歌', en: 'Alphabet' }, note: { zh: '8.5%', en: '8.5%' }, action: 'hold' },
      { ticker: 'META', name: { zh: 'Meta', en: 'Meta' }, note: { zh: '4.9%', en: '4.9%' }, action: 'hold' },
      { ticker: 'NVDA', name: { zh: '英伟达', en: 'NVIDIA' }, note: { zh: '3.9%', en: '3.9%' }, action: 'hold' },
    ],
    themeIds: ['infrastructure', 'compute', 'china-ai'],
    asOf: '2026-06-30 (Q2 2026 13F, filed 2026-08-14)',
    sources: [
      { label: 'SEC EDGAR — 13F 申报原文(逐笔持仓)', url: 'https://www.sec.gov/Archives/edgar/data/1656456/000165645626000003/' },
      { label: 'Seeking Alpha — Tepper Appaloosa Q1 2026 update', url: 'https://seekingalpha.com/article/4908974-tracking-david-teppers-appaloosa-management-portfolio-q1-2026-update' },
      { label: '24/7 Wall St. — Tepper trimmed Nvidia/AMD, doubled an AI stock', url: 'https://247wallst.com/investing/2026/06/22/david-tepper-trimmed-nvidia-and-amd-but-doubled-down-on-this-ai-stock/' },
    ],
  },
  {
    slug: 'philippe-laffont',
    name: { zh: '菲利普·拉丰', en: 'Philippe Laffont' },
    firm: { zh: 'Coatue Management', en: 'Coatue Management' },
    style: { zh: '科技成长 / 趋势', en: 'Tech growth / trend' },
    horizon: { zh: '中长期成长', en: 'Medium-to-long growth' },
    stance: 'cautious',
    styleTag: 'growth',
    summary: {
      zh: 'Q1 2026 组合 291 亿美元、62 只：前五大变成台积电、GE Vernova、Lam Research、应用材料、博通——“芯片制造 + 设备 + 电力”的 AI 全栈基建；同时把微软加仓 18%。',
      en: 'Q1 2026: $29.1B across 62 names, with the top five now TSMC, GE Vernova, Lam Research, Applied Materials and Broadcom — full-stack AI infrastructure (foundry + equipment + power) — while adding 18% to Microsoft.',
    },
    thesis: [
      {
        zh: 'Laffont 长期专注科技成长与 AI 主线；他的组合是观察“机构如何定义 AI 基建”的最佳窗口。',
        en: 'Laffont has long focused on tech growth and the AI mega-trend; his book is the best window into how institutions now define AI infrastructure.',
      },
      {
        zh: '前五持仓出现 GE Vernova（电力设备）极具信号意义——对 Coatue 而言，电力与半导体设备同属 AI 供应链的“上游卖铲人”。',
        en: 'GE Vernova (power equipment) in the top five is the signal: for Coatue, electricity and semicap equipment are both upstream picks-and-shovels of the AI supply chain.',
      },
      {
        zh: '他减持英伟达、加仓微软 18%——从单一算力龙头转向“制造设备 + 电力 + 企业 AI 平台”的组合表达。',
        en: 'He trimmed Nvidia while adding 18% to Microsoft — expressing the trade through equipment, power and the enterprise-AI platform rather than a single compute name.',
      },
    ],
    holdings: [
      { ticker: 'TSM', name: { zh: '台积电', en: 'TSMC' }, note: { zh: '第一大重仓,8.8%', en: '#1 holding at 8.8%' }, action: 'hold' },
      { ticker: 'LRCX', name: { zh: '拉姆研究', en: 'Lam Research' }, note: { zh: '8.4%,半导体设备', en: '8.4% — semi equipment' }, action: 'hold' },
      { ticker: 'MU', name: { zh: '美光', en: 'Micron' }, note: { zh: '7.5%', en: '7.5%' }, action: 'hold' },
      { ticker: 'AMZN', name: { zh: '亚马逊', en: 'Amazon' }, note: { zh: '5.8%', en: '5.8%' }, action: 'hold' },
      { ticker: 'AVGO', name: { zh: '博通', en: 'Broadcom' }, note: { zh: '4.5%', en: '4.5%' }, action: 'hold' },
      { ticker: 'GOOGL', name: { zh: '谷歌', en: 'Alphabet' }, note: { zh: '3.6%', en: '3.6%' }, action: 'hold' },
    ],
    themeIds: ['compute', 'memory', 'energy', 'applications'],
    asOf: '2026-06-30 (Q2 2026 13F, filed 2026-08-14)',
    sources: [
      { label: 'SEC EDGAR — 13F 申报原文(逐笔持仓)', url: 'https://www.sec.gov/Archives/edgar/data/1135730/000091957426005478/' },
      { label: '13F.info — Coatue Management Q1 2026 filing', url: 'https://13f.info/manager/0001135730-coatue-management-llc' },
      { label: 'ValueSense — Coatue portfolio holdings 2026', url: 'https://blog.valuesense.io/philippe-laffont-coatue-management-portfolio-holdings/' },
      { label: 'CNBC — Laffont explains his biggest AI trade', url: 'https://www.cnbc.com/2026/06/23/top-performing-tech-hedge-fund-manager-philippe-laffont-explains-his-biggest-ai-trade-.html' },
    ],
  },
  {
    slug: 'michael-burry',
    name: { zh: '迈克尔·伯里', en: 'Michael Burry' },
    firm: { zh: 'Scion Asset Management', en: 'Scion Asset Management' },
    style: { zh: '逆向 / 深度价值（空头）', en: 'Contrarian / deep value (short)' },
    horizon: { zh: '机会主义，灵活', en: 'Opportunistic, flexible' },
    stance: 'bear',
    styleTag: 'contrarian',
    summary: {
      zh: '《大空头》原型、AI 泡沫最鲜明的反方：2025 年 11 月清盘 Scion 基金后，2026 年 5 月披露个人组合约 80% 为英伟达与 Palantir 的看跌期权（名义价值约 11 亿美元）。',
      en: 'The “Big Short” investor and the AI trade’s starkest bear: after winding down Scion in November 2025, he disclosed in May 2026 that ~80% of his personal book sits in Nvidia and Palantir put options (~$1.1B notional).',
    },
    thesis: [
      {
        zh: '收录 Burry 是为了平衡多头叙事：再强的趋势，估值与情绪也会周期性反转。他把身家押在“AI 交易过度拥挤”上。',
        en: 'Burry is included to balance the bull narrative: even powerful trends see valuation and sentiment mean-revert — and he has bet his own capital that the AI trade is overextended.',
      },
      {
        zh: '2025 年 11 月他向 SEC 注销 Scion、退还投资人资金；此后不再有 13F，观点经由个人专栏 Cassandra Unchained 披露——最新披露的空头集中在 NVDA 与 PLTR。',
        en: 'He deregistered Scion with the SEC in November 2025 and returned outside capital; with no 13F since, his positioning is disclosed via his Cassandra Unchained letters — most recently concentrated puts on NVDA and PLTR.',
      },
      {
        zh: '他的历史教训——2000 与 2008——提醒投资者区分“伟大的技术”与“伟大的股票价格”，并保留安全边际。',
        en: 'His track record — 2000 and 2008 — reminds investors to separate “great technology” from “a great price”, and to keep a margin of safety.',
      },
    ],
    holdings: [
      { ticker: 'PLTR', name: { zh: 'Palantir', en: 'Palantir' }, note: { zh: '占组合 66%——最后一份 13F 的绝对集中仓', en: '66% of the book — the concentration in his final 13F' }, action: 'hold' },
      { ticker: 'NVDA', name: { zh: '英伟达', en: 'NVIDIA' }, note: { zh: '13.5%', en: '13.5%' }, action: 'hold' },
    ],
    themeIds: ['compute', 'applications'],
    asOf: '2025-09-30 (最后一份 13F;Scion 于 2025-11 清盘)',
    sources: [
      { label: 'SEC EDGAR — 13F 申报原文(逐笔持仓)', url: 'https://www.sec.gov/Archives/edgar/data/1649339/000164933925000007/' },
      { label: 'Sherwood — Burry discloses $1.1B options bet against Nvidia & Palantir', url: 'https://sherwood.news/markets/michael-burry-big-short-discloses-1-1-billion-options-bet-against-nvidia-palantir-puts/' },
      { label: 'Investing Time Daily — Burry’s 2026 AI bubble bets', url: 'https://investingtimedaily.com/michael-burry-portfolio-2026/' },
    ],
  },
];

export function getInvestor(slug: string): Investor | undefined {
  return investors.find((investor) => investor.slug === slug);
}
