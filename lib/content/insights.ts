import type { Localized } from '@/lib/i18n/config';

/**
 * On-site insights/blog content — the organic-marketing engine. Each article is
 * evergreen prose targeting a real high-intent search query; the /insights pages
 * add a live "current data" callout (from computeScores/convictionIndex) so every
 * article stays fresh each deploy. New articles are appended here by the weekly
 * ops workflow. Educational, sourced from public 13F filings; not advice.
 */
export type Insight = {
  slug: string;
  date: string; // YYYY-MM-DD
  title: Localized;
  description: Localized;
  keywords: string[];
  body: { h: Localized; p: Localized }[];
  /** Optional external sources, rendered at the foot of the article. */
  sources?: { label: string; url: string }[];
};

export const insights: Insight[] = [
  {
    slug: 'ai-drug-discovery-stocks-2026',
    date: '2026-07-17',
    title: {
      zh: 'AI 制药 2026:15–20 款 AI 药物冲刺三期临床,普通投资者怎么参与?',
      en: 'AI drug discovery in 2026: 15–20 AI-born drugs race into Phase III — how can ordinary investors participate?',
    },
    description: {
      zh: '2026 年是 AI 制药"验证之年":15–20 个 AI 设计/发现的药物项目预计进入关键三期临床,Isomorphic Labs 融资 21 亿美元,礼来、诺华重金下注。拆解公开市场的参与路径——从 Tempus(ARK 增持)到 Recursion、再到"卖铲人"英伟达——以及这条赛道独有的风险。',
      en: 'For AI drug discovery, 2026 is the year of validation: 15–20 AI-designed or AI-discovered programs are expected to enter pivotal Phase III trials, Isomorphic Labs raised $2.1B, and Lilly and Novartis are betting big. We map the public-market entry points — from Tempus (an ARK add) to Recursion to the picks-and-shovels play, Nvidia — plus the risks unique to this lane.',
    },
    keywords: ['AI 制药 股票', 'AI 药物发现', 'Tempus 股票', 'AI drug discovery stocks', 'Isomorphic Labs', 'AI biotech 2026'],
    body: [
      {
        h: { zh: '为什么 2026 是 AI 制药的"验证之年"', en: 'Why 2026 is AI pharma’s year of validation' },
        p: {
          zh: '过去十年,"AI 设计药物"更多停留在论文与种子轮;2026 年它第一次要面对最硬的裁判——关键三期临床。行业跟踪显示,今年预计有 15–20 个 AI 设计或 AI 发现的药物项目进入三期;DeepMind 系的 Isomorphic Labs(AlphaFold 团队创立)5 月完成 21 亿美元融资,创始人 Hassabis 公开承诺年内让首个 AI 设计药物进入一期临床。数据一旦兑现,估值逻辑会从"讲故事"切换到"看管线"。',
          en: 'For a decade, “AI-designed drugs” lived mostly in papers and seed rounds; in 2026 they face the hardest referee — pivotal Phase III trials. Industry trackers expect 15–20 AI-designed or AI-discovered programs to enter Phase III this year; DeepMind spinout Isomorphic Labs (born from the AlphaFold team) closed a $2.1B raise in May, and founder Demis Hassabis has publicly committed to putting its first AI-designed candidate into Phase 1 within the year. When data lands, the valuation logic flips from narrative to pipeline.',
        },
      },
      {
        h: { zh: '大药厂已经用钱投票', en: 'Big pharma has already voted with its wallet' },
        p: {
          zh: '礼来是最激进的:与 Isomorphic 的合作里程碑总额超 17 亿美元,另与英伟达签下高达 10 亿美元的 AI 基础设施合作;诺华与 Isomorphic 的合作约 12 亿美元并在 2025 年扩容。对制药巨头,AI 的账很好算——传统一款新药平均要 10 年、20 多亿美元,若 AI 能把临床前周期从数年压到 18 个月上下,节省的不只是钱,更是专利窗口。',
          en: 'Eli Lilly is the most aggressive: over $1.7B in milestones with Isomorphic plus an up-to-$1B AI-infrastructure commitment with Nvidia; Novartis has ~$1.2B with Isomorphic, expanded in 2025. The math is easy for big pharma — a traditional drug averages 10 years and $2B+, so if AI compresses preclinical work toward ~18 months, the saving is not just money but patent runway.',
        },
      },
      {
        h: { zh: '公开市场的参与路径:三层', en: 'Public-market entry points: three layers' },
        p: {
          zh: '最纯的标的多数未上市(Isomorphic、Chai 等),公开市场大致分三层:①**数据与临床匹配层**——Tempus AI(TEM):用基因组+临床数据做精准医疗匹配,ARK 在 Q1 2026 继续增持,是本站收录大佬中唯一的 AI 医疗直接持仓;②**AI 药物管线层**——Recursion(RXRX)、Schrödinger(SDGR)、Relay(RLAY)及 2026 年新上市的 Generate、Eikon,弹性最大、风险也最大;③**卖铲人层**——英伟达(为多家药厂提供 AI 算力与 BioNeMo 平台)与云厂商,确定性最高但"含药量"最低。',
          en: 'The purest names are mostly private (Isomorphic, Chai), so public exposure comes in three layers: (1) the data & trial-matching layer — Tempus AI (TEM), matching patients via genomic + clinical data; ARK kept adding in Q1 2026, making it the only direct AI-healthcare holding among our tracked legends; (2) the AI-pipeline layer — Recursion (RXRX), Schrödinger (SDGR), Relay (RLAY) and 2026 IPOs Generate and Eikon — maximum torque, maximum risk; (3) the picks-and-shovels layer — Nvidia (compute plus the BioNeMo platform for pharma) and the clouds — highest certainty, lowest “drug content.”',
        },
      },
      {
        h: { zh: '这条赛道独有的风险', en: 'Risks unique to this lane' },
        p: {
          zh: '与芯片或云不同,AI 制药的成败最终由生物学与监管裁决:①三期失败率天然高,AI 到目前为止改善的是**速度与成本**,尚未证明能系统性提高**成功率**;②多数公司常年亏损、依赖融资,利率与风偏一收紧就会被杀估值;③平台型收入(数据服务、软件)与管线型收入(里程碑、分成)混在一起,估值极易被误读。仓位上宜按"高风险卫星"处理,而非核心持仓。',
          en: 'Unlike chips or cloud, AI pharma is ultimately judged by biology and regulators: Phase III failure rates are inherently high, and so far AI has demonstrably improved speed and cost, not yet success rates; most names are loss-making and financing-dependent, so valuations get crushed whenever rates or risk appetite tighten; and platform revenue (data, software) blends with pipeline revenue (milestones, royalties), making valuations easy to misread. Size it as a high-risk satellite, not a core holding.',
        },
      },
      {
        h: { zh: '用共识数据校准热情', en: 'Calibrate enthusiasm with consensus data' },
        p: {
          zh: '值得注意的分寸感:8 位传奇投资人里,目前只有 Cathie Wood 直接持有 AI 医疗标的(TEM)——机构共识远未形成,这既意味着早期机会,也意味着缺乏"聪明钱验证"。对照之下,存储链、电力这些方向已有多位大佬真金白银进场。把 TEM 放进组合体检工具,可以直观看到它与强共识标的的差距。本文为教育内容、非投资建议,投资有风险。',
          en: 'Note the proportion: among our eight tracked legends, only Cathie Wood directly holds an AI-healthcare name (TEM) — institutional consensus hasn’t formed, which means both early-mover opportunity and a lack of smart-money validation. By contrast, the memory chain and power already have multiple legends invested with real money. Run TEM through the Portfolio Check to see its gap versus strong-consensus names. Educational content, not investment advice; investing carries risk.',
        },
      },
    ],
    sources: [
      { label: 'IntuitionLabs — Isomorphic Labs $2.1B Series B analysis', url: 'https://intuitionlabs.ai/articles/isomorphic-labs-series-b-ai-drug-discovery' },
      { label: 'AIM Media House — 2026 is the year AI drug discovery meets clinical reality', url: 'https://aimmediahouse.com/ai-lifesciences/2026-is-the-year-ai-drug-discovery-meets-clinical-reality' },
      { label: 'MarketWise — 6 AI drug discovery stocks to play the Isomorphic trade', url: 'https://marketwise.com/investing/ai-drug-discovery-stocks-isomorphic-labs/' },
      { label: 'Vision Life Sciences — AI drug discovery companies: the 2026 power list', url: 'https://visionlifesciences.com/insights/ai-drug-discovery-companies' },
      { label: 'Seeking Alpha — ARK Invest Q1 2026 13F (TEM added)', url: 'https://seekingalpha.com/article/4903557-tracking-cathie-woods-ark-invest-13f-portfolio-q1-2026-update' },
    ],
  },
  {
    slug: 'custom-ai-chips-vs-nvidia-2026',
    date: '2026-07-16',
    title: {
      zh: 'AI 芯片自研潮:谁在蚕食英伟达?博通们的机会有多大',
      en: 'The custom AI chip wave: who is eating into Nvidia, and how big is the Broadcom opportunity?',
    },
    description: {
      zh: '谷歌 TPU、Meta MTIA、微软 Maia、OpenAI Titan——大厂自研芯片全面开花。2026 年 ASIC 出货增速(约 +45%)已近 GPU 的三倍,博通拿下约六成设计合作。用公开数据与大佬持仓看清这场攻防:英伟达的护城河还剩什么,自研链上谁在赚钱。',
      en: 'Google TPU, Meta MTIA, Microsoft Maia, OpenAI Titan — hyperscaler custom silicon is everywhere. In 2026 ASIC shipment growth (~+45%) runs near triple that of GPUs, and Broadcom holds roughly 60% of design partnerships. Public data plus legendary-investor positioning show what remains of Nvidia’s moat and who profits on the custom chain.',
    },
    keywords: ['AI 芯片 自研', '博通 英伟达', '定制芯片 股票', 'custom AI chips stocks', 'Broadcom vs Nvidia', 'AI ASIC 2026', 'TPU MTIA Maia'],
    body: [
      {
        h: { zh: '发生了什么:客户变成了对手', en: 'What happened: customers became competitors' },
        p: {
          zh: '英伟达最大的几家客户,正在变成它最有组织的对手。谷歌 TPU 已迭代多代,Meta 有 MTIA、微软有 Maia,而几乎全靠英伟达起家的 OpenAI 也与博通合作开发自研芯片(Titan 计划,目标 2027 年部署、算力超 1 吉瓦)。逻辑很直白:当推理成本成为 AI 业务的最大变量,“掌握芯片就是掌握经济学”。',
          en: 'Nvidia’s biggest customers are becoming its most organized competitors. Google’s TPU is generations deep; Meta has MTIA and Microsoft has Maia; even OpenAI — built almost entirely on Nvidia — is developing custom silicon with Broadcom (the Titan program, targeting 2027 deployment at over a gigawatt of compute). The logic is blunt: when inference cost is the biggest variable in an AI business, owning the silicon means owning the economics.',
        },
      },
      {
        h: { zh: '数据:ASIC 增速已是 GPU 的近三倍', en: 'The data: ASIC growth near triple that of GPUs' },
        p: {
          zh: '行业跟踪数据显示,2026 年定制 ASIC 的 AI 服务器出货预计同比增长约 44.6%,而通用 GPU 约为 16.1%;ASIC 占 AI 服务器出货比例将升至约 27.8%。注意分寸:英伟达在训练端仍占九成以上、整体 AI 芯片市场仍约七成——自研芯片吃掉的主要是**推理**这块增量最大的蛋糕,而不是正面掀翻训练王座。',
          en: 'Industry trackers put custom-ASIC AI-server shipment growth at ~44.6% YoY for 2026 versus ~16.1% for merchant GPUs, lifting ASICs to ~27.8% of AI-server shipments. Keep perspective: Nvidia still holds 90%+ of training and ~70% of the overall AI chip market — custom silicon is eating the fastest-growing slice, inference, rather than storming the training throne.',
        },
      },
      {
        h: { zh: '最大赢家不是某家大厂,而是“军火商”博通', en: 'The biggest winner isn’t a hyperscaler — it’s the arms dealer, Broadcom' },
        p: {
          zh: '大厂自研并不等于自己造芯片:设计合作、IP、网络与封装大多外包。博通在 AI 服务器 ASIC 设计合作中拿下约六成份额,手握约 730 亿美元 AI 订单积压,管理层预计 2026 财年 AI 半导体收入接近 560 亿美元(约为上年三倍)。换句话说,无论谷歌、Meta 还是 OpenAI 的芯片“成不成”,博通都先把设计费和产能赚到了——典型的卖铲人位置。Marvell 则是同一逻辑的第二供应商。',
          en: 'Hyperscaler custom silicon doesn’t mean in-house fabrication: design partnerships, IP, networking and packaging are largely outsourced. Broadcom holds roughly 60% of AI-server ASIC design partnerships, carries a ~$73B AI backlog, and guides fiscal-2026 AI semiconductor revenue toward ~$56B (roughly tripling in a year). Whether Google’s, Meta’s or OpenAI’s chips “win” or not, Broadcom collects first — the classic picks-and-shovels seat. Marvell is the second source on the same logic.',
        },
      },
      {
        h: { zh: '大佬们已经投票:AVGO 进入共识榜', en: 'The legends have voted: AVGO enters the consensus board' },
        p: {
          zh: '这不是纸上推演——看 Q1 2026 13F:Druckenmiller 清仓 Alphabet 的同时**新建博通仓位**;Coatue 的前五大重仓里也有博通。在本站共识榜上,AVGO 首次作为独立标的入榜。而英伟达同季呈现“段永平加仓 91% vs Tepper/Coatue 减持”的典型分歧。共识分的意义正在于此:把这种攻防实时量化,而不是等叙事发酵。',
          en: 'This isn’t theoretical — check the Q1 2026 13Fs: Druckenmiller opened a Broadcom position in the same quarter he exited Alphabet, and Broadcom sits in Coatue’s top five. On our consensus board AVGO now appears as a standalone name, while Nvidia shows the classic split — Duan Yongping adding 91% versus Tepper and Coatue trimming. That is exactly what the Consensus Score quantifies in real time, before the narrative catches up.',
        },
      },
      {
        h: { zh: '投资者该怎么想:三个检查点', en: 'How to think about it: three checkpoints' },
        p: {
          zh: '①别把“自研潮”当英伟达的讣告:CUDA 生态、训练端垄断与整机柜方案仍是深护城河,估值才是真正的辩论点;②自研链的确定性排序大致是:设计伙伴(AVGO/MRVL)> 代工与设备(TSM/LRCX/AMAT)> 某一颗自研芯片的成败;③警惕周期:ASIC 订单与大厂资本开支强相关,一旦 AI capex 收缩,增速神话同样会反转。本文为教育内容、非投资建议,数字均有出处、可能随季度更新。',
          en: 'First, don’t read the custom wave as Nvidia’s obituary: the CUDA ecosystem, training dominance and rack-scale systems remain deep moats — valuation is the real debate. Second, the custom chain’s certainty ranking is roughly design partners (AVGO/MRVL) > foundry & equipment (TSM/LRCX/AMAT) > any single chip’s success. Third, respect the cycle: ASIC orders track hyperscaler capex, and if AI capex contracts the growth story reverses just as fast. Educational content, not investment advice; all figures are sourced and may change quarterly.',
        },
      },
    ],
    sources: [
      { label: 'Tom’s Hardware — The custom AI ASIC state of play (May 2026)', url: 'https://www.tomshardware.com/tech-industry/semiconductors/custom-ai-asics-examined-from-broadcom-to-mtia' },
      { label: 'TechTimes — Broadcom forecasts $56B as custom silicon demand surges', url: 'https://www.techtimes.com/articles/317846/20260605/nvidia-not-only-ai-chip-winner-broadcom-forecasts-56-billion-custom-silicon-demand-surges.htm' },
      { label: 'Introl — Custom silicon inflection 2026: hyperscaler ASICs vs Nvidia', url: 'https://introl.com/blog/custom-silicon-inflection-2026-hyperscaler-asics-nvidia-gpu' },
      { label: 'InvestorPlace — The rise of custom AI chips is breaking Nvidia’s grip', url: 'https://investorplace.com/hypergrowthinvesting/2026/04/the-rise-of-custom-ai-chips-is-breaking-nvidias-grip/' },
      { label: 'HeyGoTrade — Q1 2026 13F: Druckenmiller opens AVGO', url: 'https://www.heygotrade.com/en/news/billionaire-13f-druckenmiller-tepper-amzn-googl/' },
    ],
  },
  {
    slug: 'institutional-money-flows-2026-midyear',
    date: '2026-07-15',
    title: {
      zh: '2026 年中机构风向报告:聪明钱正流向 AI 的哪些角落?',
      en: 'Mid-2026 institutional flows report: where is smart money moving in AI?',
    },
    description: {
      zh: '五个方向看清 2026 年中的机构资金:伯克希尔世纪换仓、对冲基金转战存储链、电力成为新算力、主权基金千亿入场、以及史上最鲜明的多空分歧。全部基于公开 13F 与公开报道,附出处。',
      en: 'Five directions to read mid-2026 institutional money: Berkshire’s great pivot, hedge funds rotating into the memory chain, power as the new compute, sovereign funds’ $120B entry, and the starkest bull-bear split on record. All from public 13Fs and reporting, fully sourced.',
    },
    keywords: ['机构持仓 AI 2026', '13F 机构动向', '对冲基金 AI 股票', 'institutional AI stocks 2026', 'hedge fund 13F AI', 'smart money AI'],
    body: [
      {
        h: { zh: '方向一:世纪换仓——从电商云到“全栈 AI”', en: 'Direction 1: the great pivot — from e-commerce cloud to full-stack AI' },
        p: {
          zh: 'Q1 2026 最重磅的 13F 信号来自伯克希尔:组合从 40 只砍到 26 只、15 项清仓,其中亚马逊被全部卖出,而 Alphabet 获加仓 225%,苹果原封不动(仍占约 22%)。Abel 时代的伯克希尔给出了它对 AI 最明确的一次表态——买“搜索现金流 + Gemini + 自研 TPU”的全栈组合,而不是为叙事付溢价。',
          en: 'The heaviest 13F signal of Q1 2026 came from Berkshire: the book was cut from 40 to 26 names with 15 full exits — Amazon sold entirely — while Alphabet was boosted 225% and Apple left untouched (~22%). Abel-era Berkshire made its clearest AI statement yet: own the full stack of search cash flow + Gemini + in-house TPUs rather than pay up for narrative.',
        },
      },
      {
        h: { zh: '方向二:存储链成新“卖铲人”', en: 'Direction 2: the memory chain is the new picks-and-shovels' },
        p: {
          zh: 'Druckenmiller 一季度清仓全部 Alphabet,把资金转进 SanDisk、希捷、美光、博通与英特尔,科技敞口从 9.4% 翻倍到 18.4%。这不是孤例:Goldman 对冲基金 VIP 榜 5 月末调仓,人气增幅最大的股票约一半与 AI 相关、由 SanDisk/Lam Research/应用材料领衔,基金半导体权重创历史新高约 10%。机构对“卖铲人”的定义正在从 GPU 扩展到 HBM 内存、NAND 存储与半导体设备——那里供给更紧、拥挤度(曾经)更低。',
          en: 'Druckenmiller dumped all his Alphabet in Q1 and rotated into SanDisk, Seagate, Micron, Broadcom and Intel, doubling tech exposure from 9.4% to 18.4%. He isn’t alone: Goldman’s Hedge Fund VIP rebalance in late May showed about half of the biggest popularity gainers were AI-linked — led by SanDisk, Lam Research and Applied Materials — with semis at a record ~10% of hedge-fund books. Institutions are widening “picks and shovels” from GPUs to HBM, NAND and semicap equipment, where supply is tighter and crowding was (until now) lower.',
        },
      },
      {
        h: { zh: '方向三:电力=新算力', en: 'Direction 3: power is the new compute' },
        p: {
          zh: '最能说明问题的是 Coatue 的前五大持仓:台积电、GE Vernova、Lam Research、应用材料、博通——一家燃气轮机/电网设备公司与四家半导体链公司并列。对机构而言,AI 与能源已合并成同一个基建故事:数据中心的电力缺口和 HBM 缺口一样,都是算力增长的刚性约束,也都值得用“上游供应商”来表达。',
          en: 'Coatue’s top five says it all: TSMC, GE Vernova, Lam Research, Applied Materials, Broadcom — a gas-turbine/grid company sitting beside four semiconductor names. For institutions, AI and energy have merged into one infrastructure story: the data-center power gap, like the HBM gap, is a hard constraint on compute growth — and both are best expressed through upstream suppliers.',
        },
      },
      {
        h: { zh: '方向四:主权基金抬高资本开支的下限', en: 'Direction 4: sovereign funds raise the capex floor' },
        p: {
          zh: '2025–26 年,主权财富基金已承诺约 1200 亿美元投向数据中心、晶圆厂与高性能计算网络;阿布扎比 MGX 7 月 1 日关账 490 亿美元 AI 基金,约三成资金用于打造“国家队”。对二级市场投资者,这意味着 AI 基建的资本开支有了国家级资金托底——电力设备、半导体设备与存储的需求周期被拉长,但也要警惕由政府驱动的产能过剩。',
          en: 'Across 2025–26, sovereign wealth funds have committed roughly $120B to data centers, fabs and HPC networks; Abu Dhabi’s MGX closed a $49B AI fund on July 1, with ~30% of allocations aimed at national champions. For public-market investors this puts nation-state money under the AI capex cycle — extending demand for power equipment, semicap and storage — though state-driven overcapacity is the risk to watch.',
        },
      },
      {
        h: { zh: '方向五:史上最鲜明的多空分歧', en: 'Direction 5: the starkest bull-bear split on record' },
        p: {
          zh: '一边是段永平把英伟达加仓 91% 至第三大重仓、新建特斯拉,Tepper 把亚马逊加到第一大重仓;另一边,Michael Burry 在清盘基金后,把个人组合约 80% 押在英伟达与 Palantir 的看跌期权上(名义约 11 亿美元)。机构内部对超大规模厂商的资本开支回报也存在真实分歧。当风格迥异的大师们出现如此极端的对立,分散、仓位纪律与安全边际比任何时候都重要——这正是共识分想量化的东西:不是谁对谁错,而是共识与分歧各在哪里。',
          en: 'On one side, Duan Yongping added 91% to Nvidia (now his #3) and opened Tesla, while Tepper pushed Amazon to his #1. On the other, Michael Burry — after winding down his fund — put ~80% of his personal book into Nvidia and Palantir puts (~$1.1B notional). Institutions are also genuinely split on hyperscaler capex ROI. When style-diverse masters disagree this violently, diversification, position sizing and margin of safety matter more than ever — which is exactly what the Consensus Score quantifies: not who’s right, but where consensus and disagreement actually sit.',
        },
      },
      {
        h: { zh: '普通投资者怎么用这份报告', en: 'How to use this as an individual investor' },
        p: {
          zh: '三步:①在共识页看这些动作如何改变每只股票的罗盘共识分——伯克希尔清仓会拉低 Amazon 的分数,这就是信号;②用组合体检工具输入自己的持仓,看你与机构新方向的重合度;③记住 13F 有约 45 天滞后、不含空头与期权明细,它是研究起点而非抄作业清单。本文为教育内容、非投资建议,投资有风险。',
          en: 'Three steps: (1) watch how these moves reshape each stock’s Consensus Score on the leaderboard — Berkshire’s exit pulls Amazon’s score down, and that is the signal; (2) run your own holdings through the Portfolio Check to see your overlap with the new institutional direction; (3) remember 13Fs lag ~45 days and omit shorts and option detail — a research starting point, not a copy-trade list. Educational content, not investment advice; investing carries risk.',
        },
      },
    ],
    sources: [
      { label: 'Seeking Alpha — Tracking Berkshire portfolio Q1 2026', url: 'https://seekingalpha.com/article/4905557-tracking-berkshire-hathaway-portfolio-q1-2026-update' },
      { label: 'HeyGoTrade — Druckenmiller dumps GOOGL, Tepper doubles AMZN', url: 'https://www.heygotrade.com/en/news/billionaire-13f-druckenmiller-tepper-amzn-googl/' },
      { label: 'Goldman Sachs — Hedge Fund Trend Monitor: All in on AI', url: 'https://www.cfsrating.com/media/uj4jftdo/hedge-fund-trend-monitor_-all-in-on-ai.pdf' },
      { label: '13F.info — Coatue Management Q1 2026', url: 'https://13f.info/manager/0001135730-coatue-management-llc' },
      { label: 'Titan Investors — sovereign funds commit $120B to AI buildout', url: 'https://titaninvestors.com/insights/sovereign-wealth-funds-ai-infrastructure-2026' },
      { label: 'Sherwood — Burry’s $1.1B options bet against Nvidia & Palantir', url: 'https://sherwood.news/markets/michael-burry-big-short-discloses-1-1-billion-options-bet-against-nvidia-palantir-puts/' },
      { label: '新浪财经 — 段永平最新持仓:清仓阿里、新进特斯拉、加仓英伟达', url: 'https://finance.sina.com.cn/wm/2026-05-20/doc-inhypnuh2605188.shtml' },
    ],
  },
  {
    slug: 'buffett-ai-holdings-2026',
    date: '2026-07-12',
    title: {
      zh: '巴菲特 2026 在 AI 上买了什么?伯克希尔的 AI 敞口拆解',
      en: 'What AI does Buffett own in 2026? Berkshire’s AI exposure, decoded',
    },
    description: {
      zh: '巴菲特一向"不碰科技"?其实伯克希尔的 AI 敞口藏在云与平台里。用公开 13F 拆解他的 AI 相关持仓,并和其他 7 位传奇投资人的共识对比。',
      en: 'Buffett “avoids tech”? Berkshire’s real AI exposure hides in cloud and platforms. We decode his AI-related holdings from public 13F filings and compare them with seven other legends.',
    },
    keywords: ['巴菲特 AI 持仓', '伯克希尔 AI', 'Buffett AI stocks', 'Berkshire AI holdings'],
    body: [
      {
        h: { zh: '巴菲特买 AI 吗?', en: 'Does Buffett buy AI?' },
        p: {
          zh: '流传的说法是"巴菲特不碰科技"。但真相更细致:伯克希尔的 AI 敞口不在芯片博弈,而在**能把 AI 变成现金流的云与平台巨头**——这更符合他"买有护城河的现金牛"的一贯风格。与其猜他的态度,不如看他公开披露的动作。',
          en: 'The cliché is “Buffett avoids tech.” The truth is subtler: Berkshire’s AI exposure isn’t a chip bet — it’s the **cloud-and-platform giants that turn AI into cash flow**, which fits his lifelong preference for moaty cash machines. Rather than guess his stance, read his disclosed actions.',
        },
      },
      {
        h: { zh: '为什么是"云与平台",不是芯片', en: 'Why cloud/platforms, not chips' },
        p: {
          zh: '芯片赛道竞争激烈、资本开支巨大、周期性强——不在巴菲特的能力圈舒适区。而云与应用平台拥有规模、分发与定价权,AI 是它们的增量而非生死赌注。这也是为什么在"罗盘共识分"里,平台型标的往往比纯算力标的获得更稳的跨风格共识。',
          en: 'Chips are fiercely competitive, capital-hungry, and cyclical — outside Buffett’s comfort zone. Cloud and application platforms have scale, distribution, and pricing power; AI is upside for them, not a bet-the-company gamble. It’s also why, in the Compass Consensus Score, platform names tend to earn steadier cross-style consensus than pure-compute names.',
        },
      },
      {
        h: { zh: '怎么自己看清他的 AI 组合', en: 'See his AI sleeve for yourself' },
        p: {
          zh: '与其读二手解读,不如直接看数据:在"跟投大佬"页可以一键把巴菲特的 AI 相关持仓放进组合体检,看这套组合的共识分,以及哪些标的同时被其他大佬持有。共识越跨风格,信号越强——这正是把持仓量化成分数的价值。',
          en: 'Instead of second-hand takes, go to the data: the “copy a legend” page loads Buffett’s AI-related holdings into the Portfolio Check in one click, showing the sleeve’s Consensus Score and which names other legends also hold. The more cross-style the agreement, the stronger the signal — the whole point of quantifying positioning.',
        },
      },
    ],
  },
  {
    slug: 'best-ai-stocks-investor-consensus',
    date: '2026-07-12',
    title: {
      zh: 'AI 龙头股谁的机构共识最强?罗盘共识分 Top 榜(每季更新)',
      en: 'Which AI stocks have the strongest investor consensus? The leaderboard',
    },
    description: {
      zh: '与其听单一分析师喊单,不如看 8 位传奇投资人的集体动作。罗盘共识分把他们的公开 13F 量化为每只 AI 股 0–100 分,每季更新——这是找"强共识 AI 龙头"的另一种视角。',
      en: 'Instead of one analyst’s call, look at eight legendary investors’ collective actions. The Compass Consensus Score turns their public 13F into a 0–100 score per AI stock, refreshed quarterly — a different lens on “consensus AI leaders.”',
    },
    keywords: ['AI 龙头股', 'AI 股票 推荐', '机构共识 AI', 'best AI stocks', 'top AI stocks'],
    body: [
      {
        h: { zh: '"龙头"不该由一个人说了算', en: '“Leaders” shouldn’t be one person’s call' },
        p: {
          zh: '网上"最佳 AI 股"清单大多是单一观点、缺出处。更稳的做法:看多位风格迥异的传奇投资人**是否在同一批标的上达成共识**。当价值派、成长派、宏观派同时持有同一只 AI 股,这种跨风格共识比任何单一喊单都更值得研究。',
          en: 'Most “best AI stocks” lists are one opinion with no sourcing. A sturdier approach: check whether several style-diverse legends **converge on the same names**. When value, growth, and macro investors all hold the same AI stock, that cross-style consensus is worth more study than any single call.',
        },
      },
      {
        h: { zh: '共识分怎么算', en: 'How the score works' },
        p: {
          zh: '罗盘共识分 = 持有人基础分 + 动作分(新建/加仓加分,减持/清仓扣分)+ 跨风格共识加成,夹到 0–100。公式完全公开、每季随 13F 更新。它不是股价预测,而是把"大佬当季在这只票上怎么动手"压缩成一个可比较、可追踪的数字。',
          en: 'CCS = holders base + action score (new/adds add points; trims/exits subtract) + a cross-style bonus, clamped to 0–100. The formula is fully published and refreshes each 13F season. It isn’t a price forecast — it compresses “what the legends actually did on this name this quarter” into one comparable, trackable number.',
        },
      },
      {
        h: { zh: '看当前榜单 + 测你自己的组合', en: 'See the live leaderboard — and test your mix' },
        p: {
          zh: '共识榜每季更新,页顶还有"AI 共识温度计"——一个衡量大佬对 AI 整体信念强度的单一指标。看完榜单,可以顺手用免费的"组合共识体检"贴上你自己的持仓,看你和哪位大佬最合拍、逐只共识分如何。',
          en: 'The leaderboard refreshes quarterly, topped by the AI Conviction Index — a single read on how strongly the legends collectively back AI. After the leaderboard, drop your own holdings into the free Portfolio Consensus Check to see which legend you align with most and how each name scores.',
        },
      },
    ],
  },
  {
    slug: 'should-you-buy-nvidia-investor-actions',
    date: '2026-07-12',
    title: {
      zh: '英伟达还值得买吗?先看 8 位传奇投资人本季的真实动作',
      en: 'Is Nvidia still a buy? Start with what 8 legendary investors actually did',
    },
    description: {
      zh: '关于英伟达的多空吵翻天。与其看观点,不如看动作:段永平大幅加仓,而 Tepper、Coatue 同期减持——分歧本身就是重要信息。用公开 13F 还原大佬们在 NVDA 上的真实分歧。',
      en: 'The Nvidia bull/bear debate is endless. Skip the opinions, read the actions: Duan Yongping added sharply while Tepper and Coatue trimmed — the disagreement itself is the signal. We reconstruct the legends’ split on NVDA from public 13F filings.',
    },
    keywords: ['英伟达 值得买吗', '英伟达 机构持仓', 'NVDA 大佬', 'should I buy Nvidia', 'Nvidia hedge funds'],
    body: [
      {
        h: { zh: '英伟达的共识分为什么不高?', en: 'Why isn’t Nvidia’s consensus score high?' },
        p: {
          zh: '很多人以为最热的 AI 票一定共识最强。恰恰相反:英伟达的罗盘共识分并不高,因为大佬们在它上面**明显分歧**——有人大幅加仓,有人同期减持。共识分忠实反映动作的净方向,而分歧本身,就是它想告诉你的信息。',
          en: 'Many assume the hottest AI name must have the strongest consensus. The opposite is true: Nvidia’s Compass Consensus Score isn’t high because the legends **clearly disagree** — some add sharply while others trim in the same quarter. The score faithfully reflects the net direction of actions, and the disagreement is precisely the signal.',
        },
      },
      {
        h: { zh: '谁在加、谁在减', en: 'Who’s adding, who’s trimming' },
        p: {
          zh: '以本站收录的动作为例:段永平把英伟达加成前三大重仓,而 David Tepper 与 Coatue(Philippe Laffont)同期减持。同一只票、相反的手——这不是谁对谁错,而是提醒你:高关注度的标的,往往定价已包含了大量预期,分歧因此更大。',
          en: 'From the actions tracked here: Duan Yongping built Nvidia into a top-three position, while David Tepper and Coatue (Philippe Laffont) trimmed in the same window. Same name, opposite hands — not about who’s right, but a reminder that high-attention names often price in a lot of expectation, which is exactly why the split widens.',
        },
      },
      {
        h: { zh: '把分歧变成你的检查清单', en: 'Turn the split into your checklist' },
        p: {
          zh: '当大佬分歧时,答案不在"跟谁",而在"你更认同哪套逻辑"。在英伟达的个股页可以看到多空双方的备注与来源;在"NVDA vs 其他标的"对比页,能把它和共识更强的名字并排看。研究清楚再决定,而不是追热度。',
          en: 'When the legends split, the answer isn’t “who to follow” but “whose logic you find more convincing.” Nvidia’s stock page shows both sides’ notes and sources; the “NVDA vs …” compare pages put it side by side with higher-consensus names. Decide after the research, not by chasing heat.',
        },
      },
    ],
  },
  {
    slug: 'duan-yongping-ai-2026',
    date: '2026-07-10',
    title: {
      zh: '段永平 2026 的 AI 持仓:从苹果到英伟达、拼多多的渐进押注',
      en: 'Duan Yongping’s 2026 AI bets: a gradual shift from Apple toward AI',
    },
    description: {
      zh: '以苹果、伯克希尔为压舱石的价值投资者,2026 起明显向 AI 倾斜:大幅加仓英伟达、新建 AI 软件股,同时重仓拼多多。对华语读者尤具参考。用公开动作还原他的 AI 组合。',
      en: 'A value investor anchored in Apple and Berkshire, Duan Yongping tilted toward AI from 2026 — adding Nvidia sharply, opening AI-software positions, and holding PDD. We reconstruct his AI sleeve from disclosed actions.',
    },
    keywords: ['段永平 持仓', '段永平 英伟达', '段永平 拼多多', 'Duan Yongping portfolio', 'Duan Yongping AI'],
    body: [
      {
        h: { zh: '"本分"与能力圈', en: '“Stay within your circle”' },
        p: {
          zh: '段永平强调"本分"与能力圈:长期重仓自己彻底理解的苹果、伯克希尔,极少频繁交易。他对苹果的表态很典型——"很成熟、依然会增长,但股价不便宜了",这是一种估值纪律,而不是追涨杀跌。',
          en: 'Duan Yongping preaches staying within your circle of competence: long-held, deeply understood positions in Apple and Berkshire, with little trading. His line on Apple — “mature, still growing, but no longer cheap” — is valuation discipline, not momentum chasing.',
        },
      },
      {
        h: { zh: '他在 AI 上怎么动手', en: 'How he moved into AI' },
        p: {
          zh: '2026 一季度他把英伟达加成前三大重仓,并新建 Palantir 等 AI 软件/算力股——从纯价值向 AI 渐进倾斜,同时保留拼多多这类中概敞口。这不是"all in AI",而是在能力圈边界内的谨慎扩张。想看这套组合与其他大佬的重合度,用"跟投大佬"页一键载入。',
          en: 'In Q1 2026 he built Nvidia into a top-three holding and opened AI-software/compute names like Palantir — a gradual tilt from pure value toward AI, while keeping China exposure such as PDD. Not “all in AI,” but a careful expansion at the edge of his circle. The “copy a legend” page loads this sleeve in one click.',
        },
      },
      {
        h: { zh: '对普通投资者的启示', en: 'The takeaway' },
        p: {
          zh: '渐进、估值纪律、只买懂的——这套原则比"他买了什么"更值得抄。与其照单全收他的持仓,不如看哪些标的同时获得多位大佬的跨风格共识,再结合你自己的能力圈决定。',
          en: 'Gradualism, valuation discipline, only-what-you-understand — those principles are worth copying more than the tickers. Rather than mirror his holdings wholesale, look for names that earn cross-style consensus from several legends, then decide within your own circle.',
        },
      },
    ],
  },
  {
    slug: 'cathie-wood-ark-ai-2026',
    date: '2026-07-09',
    title: {
      zh: 'Cathie Wood / ARK 2026 的 AI 押注:算力、云与"下一代"',
      en: 'Cathie Wood / ARK’s 2026 AI bets: compute, cloud, and the next generation',
    },
    description: {
      zh: '成长派代表 Cathie Wood 押注 AI 的方式和价值派截然不同:重仓下一代算力与云基建。高波动往往意味着高分歧——用罗盘共识分看她的持仓在大佬中是"共识"还是"孤注"。',
      en: 'Growth-style investor Cathie Wood bets on AI very differently from the value camp: next-generation compute and cloud infrastructure. High volatility often means high disagreement — the Consensus Score shows whether her names are consensus or a lone bet.',
    },
    keywords: ['Cathie Wood 持仓', '木头姐 AI', 'ARK AI', 'Cathie Wood AI stocks', 'ARK Invest holdings'],
    body: [
      {
        h: { zh: '成长派怎么看 AI', en: 'The growth lens on AI' },
        p: {
          zh: '与巴菲特"买现金牛"不同,Cathie Wood 追逐的是**颠覆性拐点**:她更愿意为"下一代"算力与 AI 原生公司支付高估值,承受高波动。这不是对错问题,而是风格差异——理解风格,才能理解她为什么持有别人不碰的标的。',
          en: 'Unlike Buffett’s cash-cow approach, Cathie Wood chases disruptive inflections: she’ll pay up for next-gen compute and AI-native companies and stomach the volatility. Not right or wrong — a style difference. Understand the style and you understand why she holds names others avoid.',
        },
      },
      {
        h: { zh: '她押注的方向', en: 'Where she leans' },
        p: {
          zh: '她的 AI 敞口偏向新一代算力与云基建(如 CoreWeave、Cerebras 一类),而非已被充分定价的巨头。这类标的在本站往往共识分不高——不是因为差,而是因为只有少数风格的投资者持有,跨风格共识尚未形成。',
          en: 'Her AI exposure leans toward newer compute and cloud infrastructure (the CoreWeave / Cerebras cohort) rather than fully-priced megacaps. Such names often score lower here — not because they’re bad, but because only a few investing styles hold them, so cross-style consensus hasn’t formed yet.',
        },
      },
      {
        h: { zh: '高分歧标的怎么研究', en: 'How to research high-divergence names' },
        p: {
          zh: '当一只票只有成长派持有、共识分不高时,答案不在"跟不跟",而在你是否认同这套成长逻辑、能否承受波动。先在她的"跟投"页看这套组合的整体共识分,再逐只对照多空逻辑。',
          en: 'When a name is held only by growth investors and scores low, the question isn’t whether to follow but whether you buy the growth thesis and can bear the swings. Start from her sleeve’s overall Consensus Score on the “copy a legend” page, then read each name’s bull/risk.',
        },
      },
    ],
  },
  {
    slug: 'ai-energy-nuclear-stocks',
    date: '2026-07-08',
    title: {
      zh: 'AI 最被忽略的受益股:耗电、核电与"二阶"AI 敞口',
      en: 'AI’s most overlooked winners: power, nuclear, and second-order exposure',
    },
    description: {
      zh: 'AI 的尽头是电力。算力狂飙推高数据中心耗电,把能源、核电、电网变成"二阶"AI 受益方向。这条线索常被追芯片的人忽略——用长期视角和大佬的公开布局审视它。',
      en: 'AI ends at electricity. Soaring compute drives data-center power demand, turning energy, nuclear, and the grid into second-order AI beneficiaries — a thread chip-chasers often miss. We examine it through a long-term lens and the legends’ disclosed positioning.',
    },
    keywords: ['AI 能源 股票', 'AI 核电', 'AI 耗电', 'AI energy stocks', 'nuclear AI stocks', 'datacenter power'],
    body: [
      {
        h: { zh: '为什么 AI 是"电力问题"', en: 'Why AI is a “power problem”' },
        p: {
          zh: 'AI 的算力扩张直接推高数据中心用电,电力从"成本项"变成"瓶颈项"。当芯片估值已高时,聪明的资金开始沿产业链往上游看:谁给这些算力供电?这就是"二阶"AI 敞口的由来。',
          en: 'AI’s compute build-out drives data-center electricity demand, turning power from a cost line into a bottleneck. With chip valuations stretched, smart money looks upstream: who powers all this compute? That’s the origin of “second-order” AI exposure.',
        },
      },
      {
        h: { zh: '能源、核电、电网', en: 'Energy, nuclear, the grid' },
        p: {
          zh: '基载电力(尤其核电)、电网与冷却环节,都是 AI 耗电叙事的受益方向。本站把这类标的归入"AI 能源与电力"赛道——属于典型的"二阶"受益者:不直接卖 AI,却被 AI 的电力需求托底。',
          en: 'Baseload power (nuclear especially), the grid, and cooling all sit downstream of the AI power story. The site groups these under the “AI energy & power” layer — classic second-order beneficiaries: they don’t sell AI, but AI’s electricity demand underpins them.',
        },
      },
      {
        h: { zh: '用分层逻辑,而不是追热度', en: 'Use layer logic, not hype' },
        p: {
          zh: '在 AI 行情页,你可以按"卖铲人 → 云与平台 → 应用 → 能源底座"四层拆解整个板块,先分清你买的是哪一层。能源是最慢、但也最实的一层——适合长期、耐得住波动的资金。',
          en: 'On the AI market page you can split the sector into four layers — picks-and-shovels → cloud/platforms → applications → the energy base — and know which one you’re buying. Energy is the slowest but sturdiest layer, suited to patient, long-term capital.',
        },
      },
    ],
  },
  {
    slug: 'how-to-copy-13f-portfolios',
    date: '2026-07-07',
    title: {
      zh: '如何"跟投"13F?照抄大佬持仓的正确姿势与三个陷阱',
      en: 'How to “copy” a 13F: the right way to mirror the legends — and 3 traps',
    },
    description: {
      zh: '"抄大佬作业"听起来简单,做起来全是坑:数据滞后 45 天、只披露多头、不含成本价。讲清 13F 是什么、三个常见陷阱,以及用共识而非单一持仓的正确姿势。',
      en: '“Copy the legends’ homework” sounds easy but is full of traps: 45-day lag, longs-only disclosure, no cost basis. We explain what a 13F is, three common traps, and the right way — consensus over any single holding.',
    },
    keywords: ['13F 跟投', '抄作业 持仓', '13F 是什么', 'copy 13F portfolio', '13F filing explained'],
    body: [
      {
        h: { zh: '13F 是什么', en: 'What a 13F is' },
        p: {
          zh: '13F 是美国大型机构每季度向 SEC 披露美股持仓的报告,截止日为季度结束后 45 天。它是"跟投大佬"最公开、最可靠的数据源——但正因为公开,坑也都在明处。',
          en: 'A 13F is the quarterly SEC filing where large U.S. institutions disclose their equity holdings, due 45 days after quarter-end. It’s the most public, reliable data source for mirroring the legends — but being public, its pitfalls are hiding in plain sight.',
        },
      },
      {
        h: { zh: '三个陷阱', en: 'Three traps' },
        p: {
          zh: '一、滞后:你看到的是最多 45 天前的持仓,大佬可能早已加减。二、只报多头:13F 不含做空、期权对冲,你看到的未必是他的真实净敞口。三、不含成本:你不知道他的买入价,盲目追高风险大。',
          en: 'One, lag: you see holdings up to 45 days old; the legend may have already moved. Two, longs-only: 13F excludes shorts and options hedges, so it isn’t their true net exposure. Three, no cost basis: you don’t know their entry, so blindly chasing is risky.',
        },
      },
      {
        h: { zh: '正确姿势:看共识,不看单一持仓', en: 'The right way: consensus over any single name' },
        p: {
          zh: '与其押注某一位大佬的某一只票,不如看**多位风格迥异的投资人在哪些标的上达成共识**——跨风格共识对滞后和个体偏差都更稳健。用免费的"组合共识体检"把你自己的持仓和大佬对照,比照抄一份过期名单靠谱得多。',
          en: 'Rather than bet on one legend’s one stock, look at where **style-diverse investors converge** — cross-style consensus is more robust to lag and individual quirks. Comparing your own holdings against the legends in the free Portfolio Consensus Check beats copying a stale list.',
        },
      },
    ],
  },
  {
    slug: 'is-ai-a-bubble-investor-view',
    date: '2026-07-06',
    title: {
      zh: 'AI 是泡沫吗?别看观点,看传奇投资人真金白银的动作',
      en: 'Is AI a bubble? Don’t read opinions — read where the legends put real money',
    },
    description: {
      zh: '"AI 泡沫"之争永无定论。与其听观点,不如量化大佬集体的真实动作:AI 共识温度计衡量 8 位传奇投资人本季对 AI 的信念强度,而英伟达的分歧说明市场远没有一致答案。',
      en: 'The “AI bubble” debate never settles. Instead of opinions, quantify the legends’ actual moves: the AI Conviction Index measures how strongly eight investors back AI this quarter, while the split on Nvidia shows the market is far from a single answer.',
    },
    keywords: ['AI 泡沫', 'AI 泡沫 2026', 'AI 估值', 'AI bubble', 'is AI overvalued'],
    body: [
      {
        h: { zh: '"泡沫"之争为什么无解', en: 'Why the bubble debate is unwinnable' },
        p: {
          zh: '"是不是泡沫"取决于你用什么估值、看多长周期——所以永远吵不完。更有用的问题是:那些管着真金白银、且风格各异的传奇投资人,**当季在 AI 上是净加仓还是净减仓**?动作比观点诚实。',
          en: 'Whether it’s a bubble depends on your valuation model and horizon — which is why it never settles. A more useful question: are the style-diverse legends who run real money **net adding or net trimming** AI this quarter? Actions are more honest than opinions.',
        },
      },
      {
        h: { zh: '把"信念"量化成一个数字', en: 'Quantifying conviction into one number' },
        p: {
          zh: '"AI 共识温度计"取共识标的的平均共识分,给出一个 0–100 的集体信念读数,并标出净动作是增持还是减持。它不预测泡沫破不破,但能让你一眼看到:大佬们是在集体加码,还是在悄悄撤退。',
          en: 'The AI Conviction Index takes the mean Consensus Score across consensus names for a single 0–100 read of collective conviction, and flags whether net action is adding or trimming. It won’t call the top, but it shows at a glance whether the legends are piling in or quietly stepping back.',
        },
      },
      {
        h: { zh: '分歧本身就是答案', en: 'The disagreement is the answer' },
        p: {
          zh: '最能说明"没有一致答案"的,是英伟达:有人大幅加仓,有人同期减持。当最热的标的都存在明显分歧,说明市场把大量预期都定进了价——这时候,估值纪律和长期视角比"追不追"更重要。',
          en: 'Nothing shows “no single answer” better than Nvidia: some add sharply while others trim. When even the hottest name is clearly split, the market has priced in a lot of expectation — and valuation discipline plus a long horizon matter more than whether to chase.',
        },
      },
    ],
  },
  {
    slug: 'david-tepper-amazon-ai',
    date: '2026-07-05',
    title: {
      zh: 'David Tepper 为什么重仓亚马逊?押注 AI"变现端"的逻辑',
      en: 'Why David Tepper bets big on Amazon: the “AI monetization” thesis',
    },
    description: {
      zh: '当很多人还在追芯片,Appaloosa 的 David Tepper 把亚马逊加成头号重仓,同时减持英伟达、AMD。这是一种"押注 AI 变现端、而非算力军备"的思路。用公开动作与共识分拆解他的逻辑。',
      en: 'While many chase chips, Appaloosa’s David Tepper made Amazon a top position while trimming Nvidia and AMD — a “bet on AI monetization, not the compute arms race” thesis. We decode it with disclosed actions and the Consensus Score.',
    },
    keywords: ['David Tepper 亚马逊', 'Tepper 持仓', 'Appaloosa AI', 'David Tepper Amazon', 'Tepper Nvidia'],
    body: [
      {
        h: { zh: 'Tepper 的宏观+机会主义风格', en: 'Tepper’s macro-opportunist style' },
        p: {
          zh: 'David Tepper 以宏观判断和逆向机会主义著称,敢重仓、也敢快速调整。2026 他把亚马逊加成头号重仓,同时减持英伟达与 AMD——这不是看空 AI,而是把筹码从"算力军备"挪向"AI 变现端"。',
          en: 'David Tepper is known for macro calls and contrarian opportunism — big positions, fast adjustments. In 2026 he made Amazon a top holding while trimming Nvidia and AMD — not bearish on AI, but moving chips from the “compute arms race” toward the “monetization” side.',
        },
      },
      {
        h: { zh: '为什么是亚马逊', en: 'Why Amazon' },
        p: {
          zh: '云(AWS)是 AI 最直接的变现管道之一,叠加广告与成本周期改善,亚马逊被视为"把 AI 需求转成现金流"的标的。这也是为什么它在本站拿到最高的共识分之一——价值派、成长派、宏观派同时持有,跨风格共识极强。',
          en: 'Cloud (AWS) is one of AI’s most direct monetization pipes; add advertising and an improving cost cycle, and Amazon reads as a name that turns AI demand into cash flow. It’s why Amazon earns one of the highest Consensus Scores here — held across value, growth, and macro styles, a very strong cross-style consensus.',
        },
      },
      {
        h: { zh: '变现端 vs 算力端', en: 'Monetization vs compute' },
        p: {
          zh: 'Tepper 加亚马逊、减英伟达,恰好体现了 AI 板块的一条主线分歧:是买"卖铲人"(算力),还是买"淘金变现"(应用与云)?没有标准答案——但看清多位大佬各自站哪一边,能帮你想清自己的逻辑。用对比页把亚马逊和英伟达并排看。',
          en: 'Tepper adding Amazon while trimming Nvidia captures a core fault line in AI: buy the “shovel sellers” (compute) or the “monetizers” (apps and cloud)? No standard answer — but seeing which side each legend stands on helps you clarify your own. Put Amazon and Nvidia side by side on the compare page.',
        },
      },
    ],
  },
  {
    slug: 'physical-ai-explained',
    date: '2026-07-11',
    title: {
      zh: '物理 AI(具身智能)是什么?为什么黄仁勋说它是 40 万亿美元市场',
      en: 'What is Physical AI (embodied intelligence)? Why Huang calls it a $40T market',
    },
    description: {
      zh: 'AI 正从"屏幕里"走进物理世界:具身智能与人形机器人。黄仁勋称人形机器人是约 40 万亿美元市场、是英伟达"AI 之后的第二增长曲线";软银孙正义称物理 AI 是下一个万亿美元公司诞生地。用投资人共识的视角看这条最新主线。',
      en: 'AI is stepping out of the screen into the physical world: embodied intelligence and humanoid robots. Jensen Huang calls humanoid robots a ~$40T market and robotics Nvidia’s second growth curve after AI; SoftBank’s Son calls physical AI the birthplace of the next trillion-dollar company. We view this newest theme through the investor-consensus lens.',
    },
    keywords: ['物理 AI', '具身智能', '人形机器人', 'physical AI', 'embodied AI', 'humanoid robots'],
    body: [
      {
        h: { zh: '"物理 AI"到底指什么', en: 'What “Physical AI” actually means' },
        p: {
          zh: '过去两年的 AI 主要活在屏幕里——生成文字、图片、代码。"物理 AI"(又称具身智能)是让 AI 拥有身体:感知、行动、在真实世界里干活,最典型的载体就是人形机器人。黄仁勋反复强调,人形机器人对应约 40 万亿美元的劳动自动化市场,是英伟达在 AI 之后的第二大增长机会。',
          en: 'For two years, AI mostly lived on screens — generating text, images, code. “Physical AI” (embodied intelligence) gives AI a body: to perceive, act, and do work in the real world, most visibly through humanoid robots. Jensen Huang keeps repeating that humanoids map to a ~$40T labor-automation market — Nvidia’s second-biggest growth opportunity after AI.',
        },
      },
      {
        h: { zh: '从"仿真"到"量产"的产业链', en: 'The “sim-to-scale” value chain' },
        p: {
          zh: '这条链分几层:算力与"大脑"(英伟达的 Isaac/GR00T 平台,以及 2026 年 6 月发布的机器人全栈安全系统 Halos);整车与量产能力(特斯拉 Optimus、现代/波士顿动力、小米、UBTECH);以及仍未上市的纯玩家龙头(Figure、Unitree、1X、Apptronik、Agility)。对公开市场投资者来说,英伟达是最"顺"的一层——它同时是 AI 与机器人的算力底座。',
          en: 'The chain has layers: compute and the “brain” (Nvidia’s Isaac/GR00T platform, plus Halos, a full-stack robotics safety system launched June 2026); vehicles and manufacturing scale (Tesla Optimus, Hyundai/Boston Dynamics, Xiaomi, UBTECH); and the still-private pure-play leaders (Figure, Unitree, 1X, Apptronik, Agility). For public-market investors, Nvidia is the smoothest layer — the compute base for both AI and robots.',
        },
      },
      {
        h: { zh: '用共识视角看这条新主线', en: 'The consensus lens on the newest theme' },
        p: {
          zh: '物理 AI 叙事很性感,但纯玩家龙头多未上市、估值领先于落地。这正是"投资人共识"视角有用的地方:与其追最热的机器人概念,不如看传奇投资人真金白银押注了哪些**已上市**的敞口——英伟达就是被多位大佬跨风格持有的那一层。本站已把"物理 AI 与机器人"单列为一个赛道,你可以在 AI 行情页看它的多空逻辑与关键标的。',
          en: 'The physical-AI story is seductive, but the pure-play leaders are mostly private and valuation runs ahead of deployment. That’s exactly where the consensus lens helps: rather than chase the hottest robot name, see which **listed** exposures the legends actually back with real money — Nvidia is the layer several of them hold across styles. The site now breaks out “Physical AI & Robotics” as its own layer; see its bull/risk and key names on the AI market page.',
        },
      },
    ],
    sources: [
      { label: '24/7 Wall St. — Huang: humanoid robots a $40T market', url: 'https://247wallst.com/investing/2026/05/31/jensen-huang-just-called-humanoid-robots-a-40-trillion-market-heres-why-wall-street-is-loading-up-on-physical-ai-stocks/' },
      { label: 'CNBC — Humanoid robots touted as next AI investment opportunity', url: 'https://www.cnbc.com/2026/06/03/humanoid-robots-trillion-dollar-ai-market.html' },
      { label: 'KraneShares — Humanoid Robotics in 2026', url: 'https://kraneshares.com/humanoid-robotics-in-2026-the-race-from-pilot-to-platform/' },
    ],
  },
  {
    slug: 'humanoid-robot-stocks-how-to-invest',
    date: '2026-07-11',
    title: {
      zh: '人形机器人概念股:普通投资者在公开市场怎么参与?(附大佬敞口)',
      en: 'Humanoid robot stocks: how to get public-market exposure (and who the legends back)',
    },
    description: {
      zh: '龙头 Figure、Unitree、1X 都还没上市,普通人怎么参与物理 AI?梳理公开市场的敞口:英伟达、特斯拉、UBTECH、小米、现代,以及 ETF(KraneShares KOID)——并用共识分看哪些真被传奇投资人持有。',
      en: 'The leaders — Figure, Unitree, 1X — aren’t public. So how do you get physical-AI exposure? A map of listed plays: Nvidia, Tesla, UBTECH, Xiaomi, Hyundai, plus an ETF (KraneShares KOID) — and which of them the legends actually hold, via the Consensus Score.',
    },
    keywords: ['人形机器人 概念股', '机器人 股票', '物理 AI 股票', 'humanoid robot stocks', 'robotics stocks 2026'],
    body: [
      {
        h: { zh: '最大的坑:龙头还没上市', en: 'The big catch: the leaders are private' },
        p: {
          zh: '人形机器人最受关注的公司——Figure、Unitree(宇树)、1X、Apptronik、Agility——目前都未上市,散户买不到。这意味着"人形机器人概念股"里,很多是蹭概念的间接敞口,而非纯玩家。先认清这一点,才不会被"概念"带着追高。',
          en: 'The most-hyped humanoid companies — Figure, Unitree, 1X, Apptronik, Agility — are all private, so retail can’t buy them. That means many “humanoid robot stocks” are indirect, concept-adjacent exposure, not pure plays. Recognize this first, so you don’t chase the label.',
        },
      },
      {
        h: { zh: '公开市场的几种敞口', en: 'The listed ways in' },
        p: {
          zh: '大致三类:①算力与平台——英伟达(Isaac/GR00T/Halos);②整车与量产——特斯拉(Optimus)、现代(波士顿动力)、小米、UBTECH(港股最直接的人形纯玩家之一);③一篮子——ETF 如 KraneShares KOID(全球人形机器人与物理 AI 指数)。越"纯"的敞口,通常波动越大、越依赖叙事。',
          en: 'Roughly three buckets: 1) compute and platform — Nvidia (Isaac/GR00T/Halos); 2) vehicles and scale — Tesla (Optimus), Hyundai (Boston Dynamics), Xiaomi, UBTECH (one of the most direct listed humanoid pure-plays, in Hong Kong); 3) a basket — an ETF such as KraneShares KOID (global humanoid & physical-AI index). The “purer” the exposure, the more volatile and narrative-dependent it usually is.',
        },
      },
      {
        h: { zh: '哪些真被传奇投资人持有?', en: 'Which do the legends actually hold?' },
        p: {
          zh: '把"概念"和"共识"分开:在这些敞口里,真正被多位传奇投资人跨风格持有的,主要是英伟达——它同时是 AI 与机器人的算力底座。用免费的"组合共识体检"贴上你关注的机器人票,一眼看清哪些有大佬真金白银背书、哪些只是热度。教育用途,非荐股。',
          en: 'Separate “concept” from “consensus”: among these exposures, the one several legends hold across styles is mainly Nvidia — the compute base for both AI and robots. Drop the robot names you’re watching into the free Portfolio Consensus Check to see which have real legend backing and which are just heat. Educational, not a recommendation.',
        },
      },
    ],
    sources: [
      { label: 'CNBC — Humanoid robots touted as next AI investment opportunity', url: 'https://www.cnbc.com/2026/06/03/humanoid-robots-trillion-dollar-ai-market.html' },
      { label: 'The Motley Fool — Best robotics stocks to buy in 2026', url: 'https://www.fool.com/investing/stock-market/market-sectors/information-technology/robotics-stocks/' },
      { label: 'EVS Insight — Publicly traded humanoid robot companies 2026', url: 'https://www.evsint.com/publicly-traded-humanoid-robot-companies-2026-investor-guide/' },
    ],
  },
  {
    slug: 'agentic-ai-stocks-2026',
    date: '2026-07-12',
    title: {
      zh: 'AI Agent(智能体)概念股:从 Copilot 到 Agentforce,谁在真正变现?',
      en: 'Agentic AI stocks: from Copilot to Agentforce, who’s actually monetizing?',
    },
    description: {
      zh: '2026 最热的企业软件叙事是"AI 智能体"——你给目标,它自己跨多步完成。但热度背后,CFO 们正在收紧 AI 预算。梳理公开市场敞口(微软、Salesforce、英伟达、谷歌),并用共识视角看谁真被大佬持有。',
      en: 'The hottest enterprise-software story of 2026 is “AI agents” — give a goal, they execute across steps. But behind the hype, CFOs are tightening AI budgets. We map the listed exposures (Microsoft, Salesforce, Nvidia, Alphabet) and apply the consensus lens.',
    },
    keywords: ['AI Agent 概念股', '智能体 股票', 'AI agent stocks', 'agentic AI stocks', 'Agentforce'],
    body: [
      {
        h: { zh: '"智能体"和聊天机器人有什么不同', en: 'How agents differ from chatbots' },
        p: {
          zh: 'AI 智能体不是"你问一句它答一句",而是**你给一个目标,它自己拆解成多步、调用工具、出错了还会调整**——这是企业软件的下一个前沿。落地信号很直接:Salesforce 的 Agentforce 平台 ARR 同比增长约 330%、达约 5.4 亿美元,是"智能体真能变现"的早期证据。',
          en: 'An AI agent isn’t “ask and answer” — you give it a goal and it breaks it into steps, calls tools, and adapts when things go wrong: the next frontier in enterprise software. The monetization signal is concrete: Salesforce’s Agentforce grew ARR ~330% to about $540M — early proof that agents can actually be sold.',
        },
      },
      {
        h: { zh: '公开市场怎么参与', en: 'The listed ways in' },
        p: {
          zh: '几层敞口:平台与分发——微软(Copilot、Azure AI Foundry)、Salesforce(Agentforce)、谷歌;算力底座——英伟达(约 90% AI 芯片份额、约 5000 亿美元订单积压)。注意一个反向信号:2026 年 CFO 们正对 AI 项目"收紧钱袋",从"无限实验"转向"要 ROI"——这会拉开"能变现"和"只讲故事"的差距。',
          en: 'Layers of exposure: platforms and distribution — Microsoft (Copilot, Azure AI Foundry), Salesforce (Agentforce), Alphabet; the compute base — Nvidia (~90% AI-chip share, a ~$500B order backlog). Note a countersignal: in 2026 CFOs are tightening budgets on AI projects, shifting from open-ended experimentation to “show me the ROI” — which will separate real monetization from storytelling.',
        },
      },
      {
        h: { zh: '用共识把"故事"和"变现"分开', en: 'Use consensus to separate story from monetization' },
        p: {
          zh: '"智能体"标签下什么都能装,但真金白银的检验是:哪些是被多位传奇投资人跨风格持有的?在这些敞口里,谷歌与英伟达是本站共识数据里的常客;纯"智能体"新贵则大多缺乏跨风格背书。用免费的组合体检把你关注的智能体票贴进去,一眼看清共识分。教育用途,非荐股。',
          en: 'Anything can wear the “agent” label; the real-money test is which names several legends hold across styles. Among these exposures, Alphabet and Nvidia are regulars in the site’s consensus data, while pure-agent upstarts mostly lack cross-style backing. Drop the agent names you watch into the free Portfolio Check to see their scores. Educational, not a recommendation.',
        },
      },
    ],
    sources: [
      { label: 'The Motley Fool — Best AI stocks to buy in 2026', url: 'https://www.fool.com/investing/stock-market/market-sectors/information-technology/ai-stocks/' },
      { label: 'US News — Best agentic AI stocks & ETFs to buy in 2026', url: 'https://money.usnews.com/investing/articles/best-agentic-ai-stocks-etfs-to-buy' },
      { label: 'MarketScale — CFOs tighten AI budgets as agentic platforms reshape enterprise AI in 2026', url: 'https://www.marketscale.com/industries/software-and-technology/cfos-tighten-ai-budgets-as-agentic-platforms-and-hardware-deals-reshape-enterprise-ai-in-2026' },
    ],
  },
  {
    slug: 'ai-power-nuclear-gap-2026',
    date: '2026-07-12',
    title: {
      zh: 'AI 的电力缺口:为什么核电成了 2026 最硬的 AI 二阶主线',
      en: 'AI’s power gap: why nuclear became 2026’s hardest second-order AI theme',
    },
    description: {
      zh: '数据中心用电占美国比例正冲向 12%(2023 年底约 4.4%);风光间歇性满足不了 AI 的基载需求,核电因此被重新定价。微软、亚马逊、谷歌、Meta 已签核电购电协议,铀价维持在约 86 美元/磅。用长期与共识视角看这条最硬的二阶主线。',
      en: 'Data centers are racing toward 12% of U.S. electricity (from ~4.4% at end-2023); solar/wind intermittency can’t meet AI’s baseload need, so nuclear is being repriced. Microsoft, Amazon, Google, and Meta have signed nuclear PPAs; uranium holds near $86/lb. We view this hardest second-order theme through a long-term, consensus lens.',
    },
    keywords: ['AI 核电', 'AI 电力缺口', '核电 概念股', 'AI nuclear stocks', 'datacenter power'],
    body: [
      {
        h: { zh: '算力的尽头是电力', en: 'Compute ends at electricity' },
        p: {
          zh: '数据中心用电占全美电力的比例,预计从 2023 年底约 4.4% 升到约 12%;美国数据中心电力需求预计从 2023 年的 19 GW 升到 2030 年的 35 GW。电网互联排队长达八年、超算设施附近批发电价一度飙涨 267%,近半数在建 AI 数据中心因输电与变压器短缺而延期——电力从"配角"变成了 AI 扩张的硬约束。',
          en: 'Data centers are projected to move from ~4.4% of U.S. electricity at end-2023 toward ~12%; U.S. data-center demand is seen rising from 19 GW in 2023 to 35 GW by 2030. Grid-interconnection queues stretch eight years, wholesale power spiked as much as 267% near hyperscale sites, and nearly half of planned AI data centers face delays from transmission and transformer shortages — power has gone from supporting act to hard constraint.',
        },
      },
      {
        h: { zh: '为什么是核电', en: 'Why nuclear' },
        p: {
          zh: '风电、光伏有个对 AI 致命的缺陷:间歇性——数据中心不能"风停就断电"。AI 需要 24 小时不间断的基载电力,而核电正好满足。2025–2026 年,微软、亚马逊、谷歌、Meta 纷纷签下或宣布核电购电协议;铀价在 AI 需求驱动下维持约 86 美元/磅。核电的投资叙事,在这一年几乎被彻底改写。',
          en: 'Solar and wind have a fatal flaw for AI: intermittency — a data center can’t go dark when the wind stops. AI needs 24/7 baseload power, which nuclear fits. Across 2025–2026, Microsoft, Amazon, Google, and Meta signed or announced nuclear power-purchase agreements; uranium holds near $86/lb on AI-driven demand. The nuclear investment narrative was almost completely rewritten this year.',
        },
      },
      {
        h: { zh: '二阶主线,更适合长期资金', en: 'A second-order theme, better for patient capital' },
        p: {
          zh: '核电/能源是典型的"二阶"AI 受益者:不直接卖 AI,却被 AI 的电力需求托底。它比追芯片慢,但也更实——适合长期、耐得住波动的资金。本站把它归入"AI 能源与电力"赛道;想看云厂商这条线,也能在共识数据里看到微软/亚马逊/谷歌这些"既买 AI 又买电"的名字。',
          en: 'Nuclear/energy is a classic second-order AI beneficiary: it doesn’t sell AI but is underpinned by AI’s power demand. Slower than chasing chips, but sturdier — suited to patient capital. The site groups it under the “AI energy & power” layer; for the cloud angle, the consensus data also surfaces the Microsoft/Amazon/Alphabet names that “buy both AI and power.”',
        },
      },
    ],
    sources: [
      { label: 'The Motley Fool — AI is creating a nuclear power renaissance (2026)', url: 'https://www.fool.com/investing/2026/03/16/artificial-intelligence-ai-is-creating-a-nuclear/' },
      { label: 'MarketWise — Best nuclear energy stocks as AI drains the grid', url: 'https://marketwise.com/investing/best-nuclear-energy-stocks/' },
      { label: 'Yahoo Finance — Nuclear power stocks set to flourish on AI data-center boom', url: 'https://finance.yahoo.com/news/3-nuclear-power-stocks-set-132100209.html' },
    ],
  },
  {
    slug: 'stablecoins-rwa-ai-2026',
    date: '2026-07-12',
    title: {
      zh: 'AI × 稳定币/RWA:两条主线的交叉,以及大佬为什么大多按兵不动',
      en: 'AI × stablecoins/RWA: where two megatrends cross — and why the legends mostly sit out',
    },
    description: {
      zh: '稳定币约 3000 亿美元、月交易额超 3.4 万亿;RWA 链上规模约 276 亿美元。当自主智能体开始自己"付钱、结算",AI 与加密出现真实交叉——2025 年每 1 美元加密风投里有 40 美分投向也做 AI 的公司。但用 13F 共识视角看,传奇投资人对这条线大多克制。这本身就是一课。',
      en: 'Stablecoins near $300B with $3.4T monthly volume; on-chain RWAs around $27.6B. As autonomous agents begin to pay and settle on their own, AI and crypto genuinely cross — in 2025, 40 cents of every crypto-VC dollar went to a company also building AI. Yet through the 13F consensus lens, the legends mostly hold back. That restraint is itself a lesson.',
    },
    keywords: ['稳定币 AI', 'RWA 代币化', 'AI 加密 交叉', 'stablecoins AI', 'RWA tokenization 2026'],
    body: [
      {
        h: { zh: '交叉点在哪', en: 'Where the two actually cross' },
        p: {
          zh: 'AI 与加密的真实交叉,不在"AI 币"炒作,而在**支付与结算**:自主智能体要能自己付款、验证、协调经济活动,就需要可编程的美元(稳定币)与链上资产(RWA)。规模也真实:稳定币约 3000 亿美元、月交易额超 3.4 万亿;链上 RWA 约 276 亿美元,其中代币化美债最大(约 129 亿)。Circle 的 ARC、Coinbase 的 Echo 都在往这个方向走。',
          en: 'The real AI–crypto crossing isn’t “AI coin” hype but payments and settlement: for autonomous agents to pay, verify, and coordinate economic activity, they need programmable dollars (stablecoins) and on-chain assets (RWAs). The scale is real: stablecoins near $300B with $3.4T monthly volume; on-chain RWAs ~$27.6B, led by tokenized U.S. Treasuries (~$12.9B). Circle’s ARC and Coinbase’s Echo both push in this direction.',
        },
      },
      {
        h: { zh: '为什么传奇投资人大多克制', en: 'Why the legends mostly hold back' },
        p: {
          zh: '这条线很性感,但把它放进"13F 共识"框架你会发现:本站收录的传奇投资人,几乎没有把加密/稳定币基础设施做成核心重仓——他们更愿意通过已上市、现金流清晰的名字(算力、云、变现端)间接受益。不是说这条线不重要,而是提醒你:叙事的热度,不等于经过验证的共识。',
          en: 'The story is seductive, but put it in the 13F consensus frame and a pattern appears: the legends tracked here have almost none of crypto/stablecoin infrastructure as a core position — they prefer to benefit indirectly through listed, cash-flow-clear names (compute, cloud, monetization). Not that the theme doesn’t matter — a reminder that narrative heat isn’t the same as tested consensus.',
        },
      },
      {
        h: { zh: '把它当"雷达",而不是"重仓"', en: 'Treat it as radar, not a core bet' },
        p: {
          zh: '对普通投资者,合理的姿势是:把 AI × 稳定币/RWA 当成值得跟踪的"雷达信号",而不是照抄热度去重仓——尤其当大佬们还没用真金白银投票时。想检验你的组合里有多少是"经过共识验证"的,用免费的组合共识体检对照一下。教育用途,非投资建议。',
          en: 'For most investors, the sensible stance is to treat AI × stablecoins/RWA as a radar signal worth tracking — not a core bet copied from hype, especially while the legends haven’t voted with real money. To check how much of your mix is “consensus-tested,” run it through the free Portfolio Consensus Check. Educational, not investment advice.',
        },
      },
    ],
    sources: [
      { label: 'a16z crypto — 6 trends for 2026: stablecoins, payments, RWA', url: 'https://a16zcrypto.com/posts/article/trends-stablecoins-rwa-tokenization-payments-finance/' },
      { label: 'Coinbase Institutional — 2026 Crypto Market Outlook', url: 'https://www.coinbase.com/institutional/research-insights/research/market-intelligence/2026-crypto-market-outlook' },
      { label: 'PYMNTS — Circle chases agentic growth to scale stablecoin infrastructure', url: 'https://www.pymnts.com/earnings/2026/circle-chases-agentic-growth-scale-stablecoin-infrastructure/' },
    ],
  },
  {
    slug: 'ai-memory-stocks-correction-2026',
    date: '2026-07-20',
    title: {
      zh: '存储股一周入熊:AI 内存行情见顶了,还是黄金坑?',
      en: 'Memory stocks fell into a bear market in a week: is the AI memory trade over, or is this the dip?',
    },
    description: {
      zh: '7 月 13–17 一周,美光/三星/海力士距高点均超 -20%,SanDisk 自 6 月峰值回撤约 -35%,刚上市的 SK 海力士 ADR 距发行价仅 3.4%。用数据拆解这轮大跌:导火索是什么、基本面(合约价)变了没有、上季度刚集体转进存储的聪明钱现在处境如何、以及接下来该盯哪三个信号。',
      en: 'In the week of July 13–17, Micron, Samsung and SK Hynix all fell 20%+ below recent highs, SanDisk dropped ~35% from its June peak, and the freshly listed SK Hynix ADR sat just 3.4% above its IPO price. We break down the sell-off with data: what triggered it, whether fundamentals (contract prices) actually changed, where the smart money that piled into memory last quarter now stands, and the three signals to watch next.',
    },
    keywords: ['存储芯片股 大跌', '美光 股票', 'SanDisk 股票 下跌', 'SK海力士 ADR', 'memory stocks bear market', 'Micron stock drop 2026', 'HBM cycle'],
    body: [
      {
        h: { zh: '一周之内,从最热交易到熊市', en: 'From hottest trade to bear market in one week' },
        p: {
          zh: '7 月 13 日周一,SanDisk 单日 -12.6% 拉开序幕;7 月 15 日海力士 ADR -5%、SanDisk -6%、西部数据 -4%;7 月 16 日 SanDisk 再 -8%。到 7 月 17 日收盘:SanDisk $1,354.82(自 6 月 $2,000+ 峰值约 -35%)、美光 $848.95,美光/三星/海力士与 Roundhill 存储 ETF 距近期收盘高点均超 -20%——按通行定义,存储板块正式进入熊市。刚在 7 月 10 日以 $149 上市、首日收 $168 的 SK 海力士 ADR(SKHY),也从 7 月 14 日 +19% 的冲高回落到 $154.03(数据截至 2026-07-17 收盘)。',
          en: 'Monday July 13 set the tone with SanDisk down 12.6% in a day; on July 15 the SK Hynix ADR fell 5%, SanDisk 6% and Western Digital 4%; on July 16 SanDisk dropped another 8%. By the July 17 close: SanDisk at $1,354.82 (~-35% from its $2,000+ June peak), Micron at $848.95, and Micron, Samsung, SK Hynix and the Roundhill Memory ETF all more than 20% below recent closing highs — a bear market by the common definition. SKHY, which IPO’d at $149 on July 10 and closed its first day at $168, faded from a +19% spike on July 14 to $154.03 (data as of the 2026-07-17 close).',
        },
      },
      {
        h: { zh: '导火索:不是坏消息,是"没有更好的消息"', en: 'The trigger: not bad news — the absence of better news' },
        p: {
          zh: '这轮下跌没有单一的公司级利空。更合理的解释是三层放大器叠加:第一,获利盘太厚——大跌前美光年内一度 +244%、SanDisk +640%,任何风吹草动都会触发锁盈;第二,事件催化剂用尽——海力士 ADR 上市、两倍杠杆 ETF 挂牌(7/14 当天 SKHY 一度 +19%)这类"注意力事件"落地后,边际买家减少;第三,增速预期降档——TrendForce 7 月 3 日报告预计 3Q26 DRAM 合约价环比 +13–18%、NAND +10–15%,仍在涨,但相比 1Q 的 +90–95% 和 2Q 的 +58–63% 明显减速,官方归因是"消费端客户的价格承受力见顶"。',
          en: 'There was no single company-level negative. A better read is three amplifiers stacking: first, heavy embedded gains — Micron was up as much as 244% YTD and SanDisk 640% before the fall, so any wobble invites profit-taking; second, exhausted catalysts — attention events like the SK Hynix ADR listing and the launch of 2x leveraged ETFs (SKHY briefly +19% that day) came and went, thinning marginal buyers; third, a downshift in growth expectations — TrendForce’s July 3 report sees 3Q26 contract prices up 13–18% QoQ for DRAM and 10–15% for NAND: still rising, but a clear deceleration from +90–95% in Q1 and +58–63% in Q2, which TrendForce attributes to consumer customers hitting their price-tolerance limit.',
        },
      },
      {
        h: { zh: '聪明钱的尴尬位置:上季度刚集体转进存储', en: 'Smart money’s awkward seat: it rotated into memory just last quarter' },
        p: {
          zh: '这轮大跌最有信息量的地方,是它砸在了机构刚建好的仓上。Q1 2026 13F 显示,Druckenmiller 清仓 Alphabet、转进 SanDisk/希捷/美光;Goldman 对冲基金 VIP 榜 5 月末调仓后,基金半导体权重升至历史新高约 10%,新进人气股由 SanDisk、Lam Research 领衔。拥挤交易的数学是双向的:上行时动量互相抬轿,回撤时也互相踩踏。另一面,也有人把回调当入场:Cathie Wood 在 7 月中旬的抛售中继续加仓 CoreWeave。而估值确实在快速消化——Benzinga 统计,大跌后美光与 SanDisk 已跻身纳指 100 前瞻市盈率最低的一批股票。',
          en: 'The most informative thing about this sell-off is where it landed: on positions institutions had only just built. Q1 2026 13Fs show Druckenmiller exiting Alphabet for SanDisk/Seagate/Micron; after Goldman’s Hedge Fund VIP list rebalanced in late May, hedge-fund semis weight hit a record ~10%, with SanDisk and Lam Research leading the new favorites. Crowded-trade math cuts both ways: momentum lifts together on the way up and tramples together on the way down. On the other side, some treated the correction as an entry: Cathie Wood kept adding CoreWeave through the mid-July sell-off. And valuations are compressing fast — per Benzinga, Micron and SanDisk now rank among the cheapest Nasdaq-100 stocks on forward P/E.',
        },
      },
      {
        h: { zh: '两种剧本,三个信号', en: 'Two scripts, three signals' },
        p: {
          zh: '剧本 A(周期见顶):合约价增速三连降是顶部结构的第一块多米诺,后面跟着 4Q 转负与盈利下修——若如此,现在的"便宜"是价值陷阱。剧本 B(健康回调):AI 服务器对 HBM/企业级 SSD 的需求未变,合约价只是从"暴涨"回到"上涨",供给纪律仍在——若如此,这是 2023 年以来最大的一次上车机会。分辨两者,不用猜,盯三个可证伪的信号:① 8 月起的月度合约价数据是否延续正增长;② 9 月下旬美光财报是否下修 HBM 指引(这是最硬的一票);③ SKHY 能否守住 $149 发行价——破发意味着一级市场定价也被二级市场否决。',
          en: 'Script A (cycle top): three straight quarters of decelerating contract-price growth is the first domino of a topping structure, followed by negative QoQ in Q4 and earnings cuts — in which case today’s “cheap” is a value trap. Script B (healthy reset): AI-server demand for HBM and enterprise SSDs is intact, contract prices merely downshifted from surging to rising, and supply discipline holds — in which case this is the best entry since 2023. You don’t have to guess which script is playing: watch three falsifiable signals — ① whether monthly contract-price data from August stays positive; ② whether Micron’s late-September earnings cut HBM guidance (the hardest vote); ③ whether SKHY holds its $149 IPO price — a break would mean the secondary market has overruled the primary-market pricing too.',
        },
      },
      {
        h: { zh: '用共识分而不是情绪做决定', en: 'Decide with consensus, not emotion' },
        p: {
          zh: '大跌周的信息噪音最大,这正是回到慢变量的时候:13F 是季度数据,它不会告诉你明天的价格,但能告诉你哪些票是大佬真金白银的共识、哪些只是散户情绪。本站的罗盘共识分(0–100,方法论公开)把 8 位传奇投资人的持仓动作量化成每只 AI 股的一个分数——去共识榜看看存储三杰(MU/SNDK/STX)在大跌后处于什么位置,再决定你的下一步。免责声明:本文仅供教育与信息参考,不构成投资建议;所有数字均标注截至日期并附来源,市场有风险,决策需独立判断。',
          en: 'Sell-off weeks have the worst signal-to-noise — exactly when slow variables help. 13Fs are quarterly: they won’t tell you tomorrow’s price, but they do tell you which names carry real-money consensus from legendary investors and which run on retail emotion. Our Compass Consensus Score (0–100, methodology public) turns the eight tracked investors’ position changes into a single score per AI stock — check where the memory trio (MU/SNDK/STX) sits on the consensus board after the drop before you act. Disclaimer: this article is educational and informational only, not investment advice; every figure carries an as-of date and a source. Markets are risky; judge independently.',
        },
      },
    ],
    sources: [
      { label: 'Yahoo Finance — Micron, Samsung, SK Hynix drag memory stocks into a bear market', url: 'https://finance.yahoo.com/markets/article/micron-samsung-sk-hynix-just-dragged-memory-stocks-into-a-bear-market-154549356.html' },
      { label: '24/7 Wall St — traders take profits in memory stocks (2026-07-15)', url: 'https://247wallst.com/investing/2026/07/15/sk-hynix-drops-5-sandisk-slides-6-western-digital-slips-4-as-traders-take-profits-in-memory-stocks/' },
      { label: 'TrendForce — 3Q26 memory contract-price outlook (2026-07-03)', url: 'https://www.trendforce.com/presscenter/news/20260703-13134.html' },
      { label: 'Benzinga — Micron, SanDisk now among cheapest Nasdaq-100 stocks on forward P/E', url: 'https://www.benzinga.com/markets/tech/26/07/60534664/micron-sandisk-cheapest-nasdaq-100-stocks-forward-pe' },
      { label: '24/7 Wall St — SK Hynix ADR soars 19% as leveraged ETFs launch (2026-07-14)', url: 'https://247wallst.com/investing/2026/07/14/sk-hynix-adr-soars-19-as-leveraged-etfs-launch-lifting-micron-sandisk-western-digital/' },
      { label: 'The Motley Fool — Cathie Wood doubling down during the sell-off (2026-07-13)', url: 'https://www.fool.com/investing/2026/07/13/cathie-wood-is-doubling-down-on-this-ai-stock-duri/' },
    ],
  },
  {
    slug: 'sovereign-ai-stocks-2026',
    date: '2026-07-21',
    title: {
      zh: '主权 AI:各国"自建国家队",普通投资者怎么找到受益标的?',
      en: 'Sovereign AI: nations are building “national champions” — how do ordinary investors find the beneficiaries?',
    },
    description: {
      zh: '英伟达 2026 财年"主权 AI"营收翻三倍至超 300 亿美元;阿布扎比 MGX 关账 490 亿美元基金,沙特 HUMAIN 背靠约 9250 亿美元主权基金、与英伟达签下最多 60 万块 GPU。当国家而非企业成为买家,资本开支下限被抬高——我们拆解这条"二阶"主线的受益链条、以及 13F 里传奇投资人是否也在下注。',
      en: 'Nvidia’s “sovereign AI” revenue tripled to over $30B in FY2026; Abu Dhabi’s MGX closed a $49B fund and Saudi Arabia’s HUMAIN — backed by a ~$925B sovereign fund — signed for up to 600,000 Nvidia GPUs. When nations, not just companies, become buyers, the capex floor rises. We map this second-order theme’s beneficiary chain — and whether the legends’ 13Fs are betting on it too.',
    },
    keywords: ['主权 AI', '主权 AI 股票', 'sovereign AI stocks', 'Nvidia 主权 AI', 'HUMAIN 沙特 AI', 'MGX 基金', 'sovereign AI 2026'],
    body: [
      {
        h: { zh: '什么是"主权 AI",为什么它突然重要', en: 'What “sovereign AI” is, and why it suddenly matters' },
        p: {
          zh: '"主权 AI"指一个国家用自己的基础设施、数据与人才,建设并掌控本国的 AI 算力与模型,而不是完全依赖别国的云。驱动力是双重的:一是把 AI 视作国家安全与经济主权的一部分,二是海湾国家用石油美元寻找"后石油时代"的增长引擎。它的市场含义不在于某个新赛道,而在于**买家变了**——当国家而非企业下单,采购规模与资本开支的下限被系统性抬高。英伟达 2026 财年"主权 AI"营收同比翻三倍、超过 300 亿美元,约占其全年营收的 13.9%,就是这个变化的第一个财务证据(数据截至英伟达 FY2026 财报)。',
          en: 'Sovereign AI means a nation building and controlling its own AI compute, data, and talent on its own infrastructure, rather than depending entirely on foreign clouds. Two forces drive it: treating AI as part of national security and economic sovereignty, and Gulf states using petrodollars to find a post-oil growth engine. The market implication isn’t a shiny new sector — it’s that the buyer changed: when nations, not companies, place the orders, procurement scale and the capex floor rise systematically. Nvidia’s sovereign-AI revenue tripling year over year to over $30B in FY2026 — about 13.9% of annual revenue — is the first financial evidence of that shift (as of Nvidia’s FY2026 results).',
        },
      },
      {
        h: { zh: '钱有多大:海湾三大主权玩家', en: 'How big the money is: the Gulf’s three sovereign players' },
        p: {
          zh: '规模是真实的,且已落到合同上:阿布扎比 MGX 于 2026 年 7 月 1 日关账 **490 亿美元** AI 基金,横跨从模型实验室到数据中心的全栈;沙特 **HUMAIN** 背靠约 **9250 亿美元** 的公共投资基金(PIF),2025 年 11 月与英伟达达成协议、三年内最多采购 **60 万块 GPU**,并与英伟达/AMD/AWS/高通签下约 **230 亿美元** 合作(含与 AMD 的 100 亿美元合资、500 兆瓦算力)。更宏观地看,主权基金 2025 年向 AI 与数字基建投入约 **660 亿美元**,2025–26 累计承诺跨过 **1200 亿美元**。这些数字的共同点:它们是"承诺"与"合同",不是市场情绪,回撤时也不会随股价一起消失。',
          en: 'The scale is real and already contractual: Abu Dhabi’s MGX closed a **$49B** AI fund on July 1, 2026, spanning the full stack from model labs to data centers; Saudi Arabia’s **HUMAIN**, backed by the ~**$925B** Public Investment Fund (PIF), agreed in November 2025 to buy up to **600,000** Nvidia GPUs over three years and signed ~**$23B** of deals with Nvidia/AMD/AWS/Qualcomm (including a $10B AMD joint venture for 500MW of compute). More broadly, sovereign funds deployed ~**$66B** into AI and digital infrastructure in 2025, with cumulative commitments crossing **$120B** across 2025–26. What these figures share: they are commitments and contracts, not sentiment — they don’t vanish with the share price on a drawdown.',
        },
      },
      {
        h: { zh: '受益链条:谁真正收到这些订单', en: 'The beneficiary chain: who actually receives these orders' },
        p: {
          zh: '主权 AI 的公开市场纯玩家很少,因为核心执行方(G42、HUMAIN)未上市。所以受益要顺着"卖铲人"链条找:① **算力芯片**——英伟达是最大受益方,其 GPU 覆盖全球被追踪主权 AI 基建项目的约 **52%**,AMD 通过沙特合资分一杯羹;② **电力与冷却**——主权数据中心把电力需求抬高,能源与电气设备是二阶受益;③ **基建与设备**——晶圆代工(台积电)、网络设备。识别的关键不是"谁喊了主权 AI",而是"谁的财报里真出现了主权订单"——英伟达是目前唯一把它单列进营收结构的公司。',
          en: 'Listed pure-plays are scarce because the core operators (G42, HUMAIN) are private. So follow the picks-and-shovels chain: ① **compute silicon** — Nvidia is the biggest beneficiary, its GPUs powering ~**52%** of tracked sovereign-AI infrastructure projects globally, with AMD taking a slice via the Saudi JV; ② **power and cooling** — sovereign data centers lift electricity demand, making energy and electrical equipment second-order beneficiaries; ③ **infrastructure and equipment** — foundry (TSMC) and networking gear. The key to identification isn’t “who name-dropped sovereign AI” but “whose financials actually show sovereign orders” — Nvidia is so far the only company breaking it out as a revenue line.',
        },
      },
      {
        h: { zh: '风险:集中、地缘与"讲故事"折价', en: 'Risks: concentration, geopolitics, and the storytelling discount' },
        p: {
          zh: '这条主线有三重风险要诚实标注:一是**集中风险**——如果 52% 的项目都靠英伟达,那"主权 AI"对二级市场的敞口高度重叠于一只票,分散有限;二是**地缘风险**——GPU 出口许可是政治变量,沙特/阿联酋的主权 AI 计划仍高度依赖美国技术与出口批准,政策一变节奏就变;三是**"故事"折价**——"主权 AI"是极易被滥用的营销词,很多公司会往自己身上贴,但真正收到国家订单的凤毛麟角。用 13F 视角做交叉验证:本站追踪的传奇投资人里,对"主权 AI"最直接的下注仍是通过英伟达等已上市、现金流清晰的名字间接实现,而非小盘"概念股"。',
          en: 'Three risks deserve honest labeling. First, **concentration**: if ~52% of projects run on Nvidia, then public-market exposure to “sovereign AI” overlaps heavily with a single stock — diversification is limited. Second, **geopolitics**: GPU export licenses are a political variable; Saudi/UAE sovereign-AI plans still lean heavily on US technology and export approvals, and a policy shift changes the cadence. Third, the **storytelling discount**: “sovereign AI” is an easily abused marketing phrase — many firms will pin it on themselves, but few actually receive state orders. Cross-check with the 13F lens: among the legends tracked here, the most direct sovereign-AI bet still runs through listed, cash-flow-clear names like Nvidia rather than small-cap “concept stocks.”',
        },
      },
      {
        h: { zh: '用共识分把"主题热度"翻译成"验证过的仓位"', en: 'Use consensus to translate theme heat into tested positions' },
        p: {
          zh: '主权 AI 是典型的"二阶主线":逻辑漂亮、数字很大,但从叙事到受益标的之间隔着好几层。对普通投资者,合理的姿势是把它当"资本开支下限的证据"——它告诉你 AI 基建的需求有主权资金托底,而不是给你一份可以照抄的买入清单。想知道这条链条上的核心名字(英伟达、AMD、台积电等)在 8 位传奇投资人里的真实共识度,用本站的罗盘共识分(0–100,方法论公开)对照一下,再决定权重。免责声明:本文仅供教育与信息参考,不构成投资建议;所有数字均标注截至日期并附来源,市场有风险,决策需独立判断。',
          en: 'Sovereign AI is a classic second-order theme: the logic is elegant and the numbers are huge, but several layers separate the narrative from the beneficiaries. For most investors, the sensible stance is to treat it as evidence of a capex floor — it tells you AI-infrastructure demand has sovereign money underneath it, not a buy list to copy. To see the real consensus on this chain’s core names (Nvidia, AMD, TSMC and others) across the eight tracked legends, check them against our Compass Consensus Score (0–100, methodology public) before sizing. Disclaimer: educational and informational only, not investment advice; every figure carries an as-of date and a source. Markets are risky; judge independently.',
        },
      },
    ],
    sources: [
      { label: 'AOL / The Motley Fool — Nvidia earnings call: sovereign AI’s 300%+ annual growth', url: 'https://www.aol.com/finance/nvidia-earnings-call-nvidias-ai-112000775.html' },
      { label: 'Forbes — Abu Dhabi’s $49B AI fund and its sovereign rivals (MGX, HUMAIN, GIC)', url: 'https://www.forbes.com/sites/guneyyildiz/2026/07/03/abu-dhabis-49-billion-ai-fund-and-its-sovereign-rivals/' },
      { label: 'Silicon Canals — Saudi and UAE sovereign AI plans still rely on Nvidia and US tech', url: 'https://siliconcanals.com/sc-n-saudi-and-uae-sovereign-ai-plans-still-rely-on-nvidia-and-us-technology/' },
      { label: 'CNAS — Sovereign AI Index (Nvidia powers ~52% of tracked projects)', url: 'https://interactives.cnas.org/reports/sovereign-ai-index/' },
      { label: 'Fortune — The Gulf states are betting big on AI: who’s investing where', url: 'https://fortune.com/2026/06/09/gulf-states-betting-big-on-ai-investment/' },
    ],
  },
  {
    slug: 'ai-advertising-stocks-2026',
    date: '2026-07-22',
    title: {
      zh: 'AI 广告股 2026:AppLovin 猛涨、Trade Desk 掉队,谁在把 AI 变成广告现金流?',
      en: 'AI advertising stocks in 2026: AppLovin surges, Trade Desk stumbles — who turns AI into ad cash flow?',
    },
    description: {
      zh: 'AppLovin 一季度营收 +59%、AI 广告引擎单日拉涨 27%;Meta 广告收入 +33% 至 550 亿美元、8 百万广告主用上 AI 创意工具;Alphabet 广告 773 亿美元。同一条"AI 变现广告"主线,却分化成猛涨与掉队两组。用 13F 共识视角拆解:哪些是真现金流,哪些只是拥挤交易。',
      en: 'AppLovin’s revenue rose 59% and its AI ad engine drove a 27% single-day jump; Meta’s ad revenue climbed 33% to $55B with 8M advertisers using AI creative tools; Alphabet’s ads hit $77.3B. One “AI-monetizes-advertising” theme, yet it split into surgers and laggards. We use the 13F consensus lens to separate real cash flow from crowded trades.',
    },
    keywords: ['AI 广告 股票', 'AppLovin 股票', 'AI 广告股', 'Meta AI 广告', 'The Trade Desk', 'AI advertising stocks', 'AppLovin APP stock 2026'],
    body: [
      {
        h: { zh: '为什么"AI 广告"是 AI 里最快见到现金的一条线', en: 'Why AI advertising is the fastest AI line to real cash' },
        p: {
          zh: '在 AI 的所有落地场景里,广告是最快把"模型能力"变成"财报收入"的一条:更好的定向、更好的创意生成、更高的转化,直接对应更高的广告单价和更多的广告主预算。2026 年一季度的数字已经把这句话坐实——Meta 广告收入 550.2 亿美元、同比 +33%(广告展示量 +19%、单价 +12%),超 800 万广告主已在用它至少一项 AI 广告创意工具(半年前是 400 万);Alphabet 广告收入 773 亿美元(去年同期 669 亿),搜索与 YouTube 拉动整体营收 +22% 至 1099 亿美元。当一项技术能直接抬高广告单价,它就不再是"故事",而是现金流(数据截至各公司 2026Q1 财报)。',
          en: 'Of all AI use cases, advertising is the fastest at turning model capability into reported revenue: better targeting, better creative generation, higher conversion map directly to higher ad prices and bigger advertiser budgets. Q1 2026 numbers make the point concrete — Meta’s ad revenue was $55.02B, up 33% YoY (impressions +19%, price per ad +12%), with over 8 million advertisers using at least one of its AI ad-creative tools (up from 4 million half a year earlier); Alphabet’s ad revenue hit $77.3B (from $66.9B a year ago), with Search and YouTube lifting total revenue 22% to $109.9B. When a technology lifts ad prices directly, it stops being a story and becomes cash flow (as of each company’s Q1 2026 results).',
        },
      },
      {
        h: { zh: 'AppLovin:这轮 AI 广告最锋利的纯玩家', en: 'AppLovin: the sharpest pure-play of this AI-ad cycle' },
        p: {
          zh: '如果说 Meta/Alphabet 是"广告巨头顺便吃到 AI 红利",AppLovin(APP)则是这轮最锋利的纯玩家:2026 年一季度营收 18.4 亿美元、同比 +59%,超预期并触发单日 +27% 暴涨;其 Axon 自助广告平台 2025 年 10 月起以邀请制试点,2026 年 6 月向全球广告主全面开放。Jefferies 对 30 家电商广告主的调研显示,AppLovin 是 2026 年广告网络里份额增长最大的一家,占广告主总支出的比例升 169 个基点至 11%——它抢的正是"传统平台"的钱。这是"AI 让小平台也能做精准广告"的活样本。',
          en: 'If Meta/Alphabet are ad giants incidentally harvesting AI upside, AppLovin (APP) is this cycle’s sharpest pure-play: Q1 2026 revenue of $1.84B, up 59% YoY, beating estimates and triggering a 27% single-day surge; its self-serve Axon Ads platform ran invite-only from October 2025 and opened to all global advertisers in June 2026. A Jefferies survey of 30 e-commerce advertisers found AppLovin gained the most share of any ad network in 2026, rising 169 basis points to 11% of total ad spend — share taken straight from incumbents. It’s a live sample of “AI lets a smaller platform do precision advertising too.”',
        },
      },
      {
        h: { zh: '掉队的一边:同一主线为什么分化', en: 'The laggard side: why one theme splits' },
        p: {
          zh: '但"AI 广告"不是雨露均沾。The Trade Desk(TTD)是这批广告软件公司里最弱的一个——营收增速放缓、利润率走弱,估值被打到很低。Meta 与 Alphabet 虽然自身收入猛增,却在"份额"上被 AppLovin 等抢走一部分(Jefferies 把这归因于广告主分散下注,而非预算削减)。这条主线的分化告诉你一件事:AI 是放大器,不是保证金——它放大执行力强者的优势,也放大掉队者的劣势。同一个"AI 广告"标签下,买对具体公司比买对主题重要得多。',
          en: 'But AI advertising is not evenly distributed. The Trade Desk (TTD) is the weakest of the ad-software names — slowing revenue growth and softening margins, with the valuation beaten down to a low multiple. Meta and Alphabet, despite booming own revenue, ceded some share to AppLovin and others (Jefferies attributes this to advertiser diversification rather than budget cuts). The split delivers one lesson: AI is an amplifier, not a guarantee — it magnifies the edge of strong operators and the disadvantage of laggards. Under the same “AI advertising” label, picking the right company matters far more than picking the theme.',
        },
      },
      {
        h: { zh: '13F 视角:AppLovin 是共识,还是拥挤交易?', en: 'The 13F lens: is AppLovin consensus or a crowded trade?' },
        p: {
          zh: '这正是"共识分"该出场的地方。AppLovin 一季度 13F 呈现的是"高度分歧"而非"一致看多":最近一季 695 家机构加仓、998 家减仓;Coatue 减持约 41%,而 Fidelity(FMR)加仓约 19.9%、Capital International 加仓约 187.8%——同一只票,顶级机构在对赌。这种"分歧型"结构与 Meta/Alphabet 那种"稳态共识"完全不同:后者是八位大佬里反复出现的名字,前者更像高 Beta 的主题弹性仓。对普通投资者,分清"共识重仓"与"分歧博弈",比追单日涨幅重要得多。',
          en: 'This is exactly where a consensus score earns its keep. AppLovin’s Q1 2026 13Fs show high disagreement, not unanimity: in the latest quarter 695 institutions added while 998 trimmed; Coatue cut ~41%, while Fidelity (FMR) added ~19.9% and Capital International added ~187.8% — top institutions taking opposite sides of the same stock. That “dispersion” structure is nothing like the steady consensus around Meta/Alphabet, which recur as names across the tracked legends; AppLovin looks more like a high-beta thematic position. For most investors, distinguishing “consensus core” from “dispersed bet” matters far more than chasing a single-day pop.',
        },
      },
      {
        h: { zh: '把主题热度翻译成仓位:先看共识,再看弹性', en: 'Translate theme heat into positions: consensus first, beta second' },
        p: {
          zh: 'AI 广告是 2026 年少数"已被财报证明"的 AI 变现主线,但它内部的分化提醒你:主题对了,标的不一定对。合理的做法是分两层看——底仓放"稳态共识"的现金流巨头(广告收入可验证、被多位大佬持有),弹性仓再考虑 AppLovin 这类高增长但分歧大的纯玩家,并对其单日暴涨保持敬畏。想知道这几个名字(Meta、Alphabet、AppLovin、亚马逊广告)在 8 位传奇投资人里的真实共识度,用本站的罗盘共识分(0–100,方法论公开)对照一下再定权重。免责声明:本文仅供教育与信息参考,不构成投资建议;所有数字均标注截至日期并附来源,市场有风险,决策需独立判断。',
          en: 'AI advertising is one of the few AI-monetization lines already proven by earnings in 2026 — but its internal split is the warning: right theme, not necessarily right stock. A sensible approach is two-tiered — a core in steady-consensus cash-flow giants (verifiable ad revenue, held by multiple legends), and only then a thematic-beta sleeve for high-growth-but-contested pure-plays like AppLovin, with due respect for its single-day swings. To see the real consensus on these names (Meta, Alphabet, AppLovin, Amazon ads) across the eight tracked legends, check them against our Compass Consensus Score (0–100, methodology public) before sizing. Disclaimer: educational and informational only, not investment advice; every figure carries an as-of date and a source. Markets are risky; judge independently.',
        },
      },
    ],
    sources: [
      { label: 'PPC Land — Meta Q1 2026: $56.3B revenue as AI tools double advertiser adoption', url: 'https://ppc.land/meta-q1-2026-56-3b-revenue-as-ai-tools-double-advertiser-adoption/' },
      { label: 'Storyboard18 — Alphabet ads hit $77B, Meta surges 33%, Amazon crosses $70B run rate', url: 'https://www.storyboard18.com/amp/how-it-works/ad-engines-power-big-tech-alphabet-ads-hit-77-billion-meta-surges-33-amazon-crosses-70-billion-run-rate-96705.htm' },
      { label: 'TIKR — AppLovin’s AI advertising engine delivered 59% revenue growth', url: 'https://www.tikr.com/blog/applovins-ai-advertising-engine-just-delivered-59-revenue-growth-heres-the-catch' },
      { label: 'IndexBox — Advertising software Q1 2026: AppLovin, PubMatic, The Trade Desk', url: 'https://www.indexbox.io/blog/applovin-and-rivals-advertising-software-q1-2026-review/' },
      { label: 'Digiday — AppLovin’s AI-fueled surge and The Trade Desk’s stumble', url: 'https://digiday.com/marketing/ad-tech-briefing-applovins-ai-fueled-surge-and-the-trade-desks-stumble-show-where-investors-are-placing-their-bets/' },
      { label: 'HedgeFollow — APP 13F hedge fund & institutional ownership', url: 'https://hedgefollow.com/stocks/APP' },
      { label: 'eMarketer via The Next Web — Meta set to overtake Google in digital ad revenue in 2026', url: 'https://thenextweb.com/news/meta-surpass-google-digital-ad-revenue-emarketer-2026' },
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}
