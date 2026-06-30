import type { Localized } from '@/lib/i18n/config';

export type GlossaryTerm = {
  term: Localized;
  /** Short label/abbrev shown as a chip (e.g. ticker-like tag). */
  tag?: string;
  def: Localized;
};

export type GlossaryGroup = {
  title: Localized;
  terms: GlossaryTerm[];
};

/** Bilingual investing glossary, grouped. Educational reference. */
export const glossary: GlossaryGroup[] = [
  {
    title: { zh: '投资原则', en: 'Investing principles' },
    terms: [
      {
        term: { zh: '护城河', en: 'Moat' },
        def: {
          zh: '企业抵御竞争、维持高回报的持久优势，如网络效应、转换成本、规模、专有数据或生态绑定。',
          en: 'A durable advantage that fends off competition and sustains high returns — network effects, switching costs, scale, proprietary data, or ecosystem lock-in.',
        },
      },
      {
        term: { zh: '能力圈', en: 'Circle of competence' },
        def: {
          zh: '你真正理解、能判断其商业模式与竞争格局的领域。只在能力圈内下注，是巴菲特的核心纪律。',
          en: 'The domains you genuinely understand well enough to judge their business and competition. Investing only within it is a core Buffett discipline.',
        },
      },
      {
        term: { zh: '安全边际', en: 'Margin of safety' },
        def: {
          zh: '买入价低于内在价值的缓冲。价格越低于价值，对判断失误与坏运气的容错越大。',
          en: 'The cushion between price paid and intrinsic value. The wider it is, the more room for error and bad luck.',
        },
      },
      {
        term: { zh: '回撤', en: 'Drawdown' },
        def: {
          zh: '从高点到低点的跌幅。AI 板块波动大、回撤深，仓位管理决定你能否扛过去。',
          en: 'The peak-to-trough decline. AI is volatile with deep drawdowns; position sizing decides whether you can hold through them.',
        },
      },
      {
        term: { zh: '定投', en: 'Dollar-cost averaging' },
        tag: 'DCA',
        def: {
          zh: '按固定金额、固定节奏分批买入，平滑成本、淡化择时，适合长期主题。',
          en: 'Investing a fixed amount on a fixed schedule to smooth cost and reduce timing risk — suited to long-term themes.',
        },
      },
      {
        term: { zh: '核心 + 卫星', en: 'Core-satellite' },
        def: {
          zh: '组合构建法:核心配宽基或平台龙头(稳),卫星用小仓位博弈高弹性主题(进攻)。',
          en: 'A portfolio approach: a stable core in broad index or platform leaders, plus small satellites for high-beta themes.',
        },
      },
    ],
  },
  {
    title: { zh: '市场与数据', en: 'Markets & data' },
    terms: [
      {
        term: { zh: '13F 报告', en: '13F filing' },
        tag: '13F',
        def: {
          zh: '美国大型机构每季度向 SEC 披露其美股持仓的报告。可用来追踪大佬持仓,但有滞后(季度末后约 45 天)。',
          en: 'A quarterly SEC filing where large U.S. institutions disclose their U.S. equity holdings. Useful for tracking the greats, but lagged (~45 days after quarter-end).',
        },
      },
      {
        term: { zh: '资本开支', en: 'Capital expenditure' },
        tag: 'Capex',
        def: {
          zh: '企业购建长期资产(如数据中心、芯片)的支出。AI 的巨额 capex 是算力与基建需求的核心驱动。',
          en: 'Spending on long-term assets (data centers, chips). AI’s massive capex is the core driver of compute and infrastructure demand.',
        },
      },
      {
        term: { zh: '市盈率', en: 'Price-to-earnings' },
        tag: 'P/E',
        def: {
          zh: '股价与每股盈利之比,衡量为每元盈利支付的价格。高估值对增速放缓极敏感。',
          en: 'Share price divided by earnings per share — the price paid per unit of profit. High multiples are very sensitive to any slowdown.',
        },
      },
      {
        term: { zh: '自由现金流', en: 'Free cash flow' },
        tag: 'FCF',
        def: {
          zh: '经营现金流减去资本开支后剩余的现金。衡量企业真正能自由支配的盈利质量。',
          en: 'Operating cash flow minus capex — the cash a business can truly deploy, a gauge of earnings quality.',
        },
      },
    ],
  },
  {
    title: { zh: 'AI 与算力', en: 'AI & compute' },
    terms: [
      {
        term: { zh: '卖铲人', en: 'Picks and shovels' },
        def: {
          zh: '不直接做应用,而是卖“淘金工具”的环节——AI 里指芯片、算力、基建,现金流最确定。',
          en: 'Selling the tools rather than the end product — in AI, the chips, compute, and infrastructure with the most certain cash flows.',
        },
      },
      {
        term: { zh: '自研芯片', en: 'Custom silicon' },
        def: {
          zh: '超大厂自研的 AI 加速器(如 Amazon Trainium、Google TPU、Microsoft Maia),长期蚕食通用 GPU 份额。',
          en: 'In-house AI accelerators from hyperscalers (Trainium, TPU, Maia) that erode merchant GPU share over time.',
        },
      },
      {
        term: { zh: '高带宽内存', en: 'High-bandwidth memory' },
        tag: 'HBM',
        def: {
          zh: 'AI 加速器配套的高速内存,需求紧俏、量价齐升,美光等是受益者。',
          en: 'High-speed memory paired with AI accelerators; tight supply lifts volume and price, benefiting names like Micron.',
        },
      },
      {
        term: { zh: '训练 / 推理', en: 'Training / Inference' },
        def: {
          zh: '训练=用数据“教”出模型(算力消耗巨大);推理=用训好的模型对外服务(规模化、持续耗算力)。',
          en: 'Training teaches a model from data (compute-intensive); inference serves the trained model to users (at scale, with ongoing compute).',
        },
      },
      {
        term: { zh: '大模型', en: 'Large language model' },
        tag: 'LLM',
        def: {
          zh: '在海量文本上训练的大型 AI 模型(如 GPT、Gemini、文心),是本轮 AI 应用浪潮的底座。',
          en: 'Large AI models trained on vast text (GPT, Gemini, Ernie) — the foundation of this AI application wave.',
        },
      },
    ],
  },
];
