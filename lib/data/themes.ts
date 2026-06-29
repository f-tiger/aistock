import type { AiTheme } from './types';

/**
 * Curated AI sub-sectors. Static content with an `asOf` date and sources.
 * Swap for a live feed later via the MarketDataProvider interface (see provider.ts).
 */
export const themes: AiTheme[] = [
  {
    id: 'compute',
    name: { zh: '算力与 AI 芯片', en: 'Compute & AI Chips' },
    summary: {
      zh: 'AI 浪潮的“卖铲人”。训练与推理的算力需求驱动 GPU/加速器销量，是目前现金流最确定的环节，但也最拥挤、估值最高。',
      en: 'The “pick-and-shovel” layer of the AI boom. Training and inference demand drives GPU/accelerator sales — the clearest cash flows today, but also the most crowded and richly valued.',
    },
    bullCase: [
      {
        zh: 'AI 资本开支（capex）预计到 2030 年达每年 3–4 万亿美元量级，加速器是其中核心。',
        en: 'AI capex is projected toward $3–4 trillion per year by 2030, with accelerators at the core of the spend.',
      },
      {
        zh: 'Nvidia 在 AI 加速器市场份额估计仍达 85–92%，Blackwell 架构延续其软硬件生态壁垒（CUDA）。',
        en: 'Nvidia still holds an estimated 85–92% of the AI accelerator market; the Blackwell platform extends its hardware + software (CUDA) moat.',
      },
    ],
    risks: [
      {
        zh: '超大厂自研芯片（Amazon Trainium、Google TPU、Microsoft Maia）占比预计从 2025 年约 21% 升至 2026 年约 28%，蚕食通用 GPU 份额。',
        en: 'Hyperscaler custom silicon (Amazon Trainium, Google TPU, Microsoft Maia) is expected to rise from ~21% of the market in 2025 to ~28% in 2026, eroding merchant GPU share.',
      },
      {
        zh: '高估值对“增速放缓”极度敏感；周期性与库存波动可能放大回撤。',
        en: 'High valuations are acutely sensitive to any growth deceleration; cyclicality and inventory swings can amplify drawdowns.',
      },
    ],
    stocks: [
      {
        ticker: 'NVDA',
        name: { zh: '英伟达', en: 'Nvidia' },
        role: { zh: 'AI 加速器龙头', en: 'AI accelerator leader' },
        bull: { zh: 'CUDA 生态 + Blackwell 放量，定价权强。', en: 'CUDA ecosystem + Blackwell ramp, strong pricing power.' },
        risk: { zh: '自研芯片与竞争对手（AMD）分流。', en: 'Custom silicon and AMD competition siphon share.' },
      },
      {
        ticker: 'AMD',
        name: { zh: '超威半导体', en: 'AMD' },
        role: { zh: '挑战者', en: 'Challenger' },
        bull: { zh: 'MI 系列加速器提供第二供应源。', en: 'MI-series accelerators offer a credible second source.' },
        risk: { zh: '软件生态落后，份额仍小。', en: 'Software ecosystem lags; share still small.' },
      },
      {
        ticker: 'TSM',
        name: { zh: '台积电', en: 'TSMC' },
        role: { zh: '先进制程代工', en: 'Advanced-node foundry' },
        bull: { zh: '所有 AI 芯片的共同瓶颈与受益者。', en: 'The common bottleneck — and beneficiary — for every AI chip.' },
        risk: { zh: '地缘政治与资本开支周期。', en: 'Geopolitics and capex cyclicality.' },
      },
    ],
    asOf: '2026-06',
    sources: [
      { label: 'IO Fund — Nvidia thesis & market share', url: 'https://io-fund.com/ai-stocks/nvidia-stock-20-trillion-market-cap-timing' },
      { label: 'Intellectia — Nvidia 2026 AI demand outlook', url: 'https://intellectia.ai/blog/nvidia-stock-analysis-2026-ai-demand' },
    ],
  },
  {
    id: 'infrastructure',
    name: { zh: '云与 AI 基础设施', en: 'Cloud & AI Infrastructure' },
    summary: {
      zh: '把算力变成可租用服务的环节：超大规模云厂商与新兴 GPU 云。资本开支巨大，但绑定了 AI 工作负载的长期需求。',
      en: 'The layer that turns compute into rentable services: hyperscalers and emerging GPU clouds. Capex is enormous, but it locks in long-term AI workload demand.',
    },
    bullCase: [
      {
        zh: 'Amazon 预计 2026 年资本开支约 2000 亿美元，主要投向 AI 基础设施、芯片与机器人。',
        en: 'Amazon guided ~$200B of 2026 capex, primarily on AI infrastructure, chips, and robotics.',
      },
      {
        zh: 'GPU 云（如 CoreWeave）让企业按需租用顶级算力，承接溢出需求。',
        en: 'GPU clouds (e.g., CoreWeave) let enterprises rent top-tier compute on demand, absorbing overflow demand.',
      },
    ],
    risks: [
      {
        zh: '资本开支若超前于变现，自由现金流与回报率承压。',
        en: 'If capex outruns monetization, free cash flow and returns on capital come under pressure.',
      },
      {
        zh: 'GPU 云客户集中、租约与折旧风险高。',
        en: 'GPU clouds carry customer-concentration, lease, and depreciation risk.',
      },
    ],
    stocks: [
      {
        ticker: 'AMZN',
        name: { zh: '亚马逊', en: 'Amazon' },
        role: { zh: '云 + 自研芯片', en: 'Cloud + custom silicon' },
        bull: { zh: 'AWS 变现 AI，Trainium 降本。', en: 'AWS monetizes AI; Trainium lowers cost.' },
        risk: { zh: '巨额 capex 拖累短期利润。', en: 'Heavy capex weighs on near-term profit.' },
      },
      {
        ticker: 'MSFT',
        name: { zh: '微软', en: 'Microsoft' },
        role: { zh: 'Azure + Copilot', en: 'Azure + Copilot' },
        bull: { zh: '企业级 AI 分发渠道最广。', en: 'Broadest enterprise AI distribution.' },
        risk: { zh: 'OpenAI 关系与算力成本。', en: 'OpenAI dependency and compute costs.' },
      },
      {
        ticker: 'CRWV',
        name: { zh: 'CoreWeave', en: 'CoreWeave' },
        role: { zh: '纯 GPU 云', en: 'Pure-play GPU cloud' },
        bull: { zh: 'AI 算力短缺的直接受益者。', en: 'Direct beneficiary of AI compute scarcity.' },
        risk: { zh: '客户集中、杠杆与折旧高。', en: 'Concentration, leverage, depreciation risk.' },
      },
    ],
    asOf: '2026-06',
    sources: [
      { label: 'Motley Fool — Buffett & Wood both own Amazon', url: 'https://www.fool.com/investing/2025/11/04/cathie-wood-and-warren-buffett-both-own-this-artif/' },
      { label: 'Motley Fool — Wood adds CoreWeave', url: 'https://www.fool.com/investing/2026/03/07/cathie-wood-bargain-hunting-2-ai-stocks-bought/' },
    ],
  },
  {
    id: 'applications',
    name: { zh: 'AI 应用与平台', en: 'AI Applications & Platforms' },
    summary: {
      zh: '把模型变成产品与收入的环节：搜索、广告、生产力软件、垂直 SaaS。胜负取决于分发渠道与数据，而非算力。',
      en: 'The layer that turns models into products and revenue: search, ads, productivity, vertical SaaS. Winners are decided by distribution and data, not raw compute.',
    },
    bullCase: [
      {
        zh: '拥有海量用户与专有数据的平台可低成本分发 AI 功能，变现路径最清晰。',
        en: 'Platforms with massive users and proprietary data can distribute AI features cheaply, with the clearest path to monetization.',
      },
      {
        zh: 'AI 提升广告与生产力软件的客单价与留存。',
        en: 'AI lifts pricing and retention across advertising and productivity software.',
      },
    ],
    risks: [
      {
        zh: 'AI 可能颠覆现有商业模式（如搜索广告）。',
        en: 'AI may disrupt incumbent business models (e.g., search advertising).',
      },
      {
        zh: '“套壳”应用缺乏护城河，易被基础模型方吞并。',
        en: 'Thin “wrapper” apps lack a moat and can be absorbed by foundation-model providers.',
      },
    ],
    stocks: [
      {
        ticker: 'GOOGL',
        name: { zh: '谷歌', en: 'Alphabet' },
        role: { zh: '模型 + 分发 + TPU', en: 'Models + distribution + TPU' },
        bull: { zh: '全栈自研，Gemini 与搜索协同。', en: 'Full-stack: Gemini + search + custom TPU.' },
        risk: { zh: 'AI 重塑搜索盈利模式。', en: 'AI reshapes the search profit model.' },
      },
      {
        ticker: 'META',
        name: { zh: 'Meta', en: 'Meta' },
        role: { zh: '广告 + 开源模型', en: 'Ads + open models' },
        bull: { zh: 'AI 提升广告效率与参与度。', en: 'AI boosts ad efficiency and engagement.' },
        risk: { zh: 'capex 高企，变现需时间。', en: 'Heavy capex; monetization takes time.' },
      },
    ],
    asOf: '2026-06',
    sources: [
      { label: 'Motley Fool — Druckenmiller buys AMZN/GOOGL', url: 'https://www.fool.com/investing/2026/03/31/billionaire-stanley-druckenmiller-buys-amzn-googl/' },
    ],
  },
  {
    id: 'energy',
    name: { zh: 'AI 能源与电力', en: 'AI Energy & Power' },
    summary: {
      zh: '常被忽视的瓶颈：数据中心耗电激增，把核电、电网与冷却推上 AI 投资版图。属于“二阶”受益者。',
      en: 'The overlooked bottleneck: surging data-center power demand puts nuclear, grid, and cooling on the AI map — a “second-order” beneficiary.',
    },
    bullCase: [
      {
        zh: 'AI 数据中心电力需求快速上升，长期电力合同与核电重获关注。',
        en: 'AI data-center power demand is rising fast, reviving interest in long-term power contracts and nuclear.',
      },
      {
        zh: 'Cathie Wood 等已布局核电（如 X-Energy）作为 AI 的能源底座。',
        en: 'Investors like Cathie Wood have backed nuclear (e.g., X-Energy) as an energy base layer for AI.',
      },
    ],
    risks: [
      {
        zh: '能源项目周期长、监管重、早期标的风险高。',
        en: 'Energy projects are long-cycle and heavily regulated; early-stage names are high-risk.',
      },
      {
        zh: '若 AI 算力效率提升，电力需求预期可能被高估。',
        en: 'If AI compute grows more efficient, power-demand expectations may prove overstated.',
      },
    ],
    stocks: [
      {
        ticker: 'theme',
        name: { zh: '核电 / 电网 / 冷却', en: 'Nuclear / Grid / Cooling' },
        role: { zh: 'AI 的能源底座', en: 'Energy base layer for AI' },
        bull: { zh: '算力增长的刚性配套需求。', en: 'Non-discretionary complement to compute growth.' },
        risk: { zh: '周期长、政策与技术不确定。', en: 'Long cycles, policy and tech uncertainty.' },
      },
    ],
    asOf: '2026-06',
    sources: [
      { label: 'TheStreet — Wood invests in X-Energy (nuclear)', url: 'https://www.thestreet.com/investing/cathie-wood-buys-another-72m-of-mega-cap-amazon-stock' },
    ],
  },
];

export function getTheme(id: string): AiTheme | undefined {
  return themes.find((theme) => theme.id === id);
}
