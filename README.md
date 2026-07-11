# AI 投资罗盘 · AI Investing Compass

一个**中英双语、教育导向**的网站，把三件事整合到一处：

1. **AI 行情** — AI 板块的细分赛道（算力 / 基建 / 应用 / 能源）、多头逻辑与主要风险；
2. **传奇人物对 AI 的投资** — 巴菲特、Cathie Wood、Druckenmiller、Ackman 等在 AI 上的具体布局与逻辑（基于公开 13F 与报道）；
3. **长期投资** — 可执行的长期投资原则与检查清单。

A **bilingual (中文/EN), education-focused** site that unifies AI market trends, how legendary investors are positioned in AI (with reasoning), and long-term investing principles.

核心差异化:**罗盘共识分(Compass Consensus Score)**——把 8 位大佬的公开持仓动作量化为每只 AI 股票的 0–100 可解释评分(方法论公开,见 `/methodology#ccs`),每季随 13F 更新并积累历史序列。

> ⚠️ 仅供教育与信息参考，**不构成投资建议**。For education only — **not investment advice**.

竞品调研见 [`docs/competitor-research.md`](docs/competitor-research.md)（市场上有很多相邻工具，但没有一个聚焦整合这三块——这是本项目的定位）。
**自动化运营方案**见 [`docs/operations.md`](docs/operations.md)（内容流水线 = Claude Routines,守护 = GitHub Actions,度量 = Cloudflare;平台帖模板与成品在 [`content/`](content/)）。

---

## 技术栈 · Tech stack

- **Next.js 15** (App Router, TypeScript) — 静态导出 `output: 'export'`
- **Tailwind CSS**
- 轻量自实现的双语 i18n（`/zh`、`/en` 路由，双语数据字段，无第三方 i18n 库）
- 数据层通过 `MarketDataProvider` 接口解耦，当前用静态内容，**预留实时 API 接口**

## 本地开发 · Local development

```bash
npm install
npm run dev      # http://localhost:3000 → 自动跳转 /zh
npm run build    # 静态导出到 ./out
npm run lint
```

## 项目结构 · Structure

```
app/
  layout.tsx                  # 根布局（html/body）
  page.tsx                    # / → 跳转默认语言 /zh
  [locale]/
    layout.tsx                # 语言布局：Navbar + Footer
    page.tsx                  # 首页
    guide/                    # 入门指南（六步引导 + 三条铁律）
    market/                   # AI 行情
    investors/                # 传奇人物列表（8 位，搜索 + 立场/赛道筛选）
    investors/[slug]/         # 投资人详情（持仓 + 实时价 + 逻辑 + 来源）
    stocks/                   # 个股索引（搜索 + 按赛道筛选）
    stocks/[ticker]/          # 个股详情（实时价 + 历史/示意走势 + 持有人 + 赛道）
    consensus/                # AI 持仓共识 / 分歧 / 矩阵
    news/                     # AI 行情动态时间线
    long-term/                # 长期投资原则 + 检查清单
    glossary/                 # 投资术语表（中英）
    methodology/              # 竞品调研 + 数据方法 + 免责声明
  sitemap.ts / robots.ts      # SEO（静态生成 sitemap.xml / robots.txt）
components/                   # Navbar / Footer / 卡片 / 表格 / LiveQuote / 免责声明 等
lib/
  i18n/                       # locale 配置与 UI 文案字典
  data/                       # types / investors / themes / principles / competitors / consensus / updates / quotes
  data/provider.ts            # MarketDataProvider 接口 + StaticProvider（预留 LiveApiProvider）
functions/api/quote.ts        # Cloudflare Pages Function：实时行情代理（Finnhub）
functions/api/candles.ts      # Cloudflare Pages Function：历史 K 线代理（Finnhub）
docs/competitor-research.md   # 竞品调研全文（含来源）
public/_redirects, _headers   # Cloudflare Pages 边缘配置
```

### 实时行情（可选）· Live quotes (optional)

行情为**可选增强**：站点在**没有任何密钥**时也完全可用——价格列显示「—」，构建与渲染不受影响。

- 浏览器中的 `LiveQuote` 组件向 `/api/quote`（可用 `NEXT_PUBLIC_QUOTE_ENDPOINT` 覆盖）批量请求报价；任何失败都优雅降级。
- 生产端由 Cloudflare Pages Function `functions/api/quote.ts` 用 **`FINNHUB_API_KEY`**（在 Cloudflare 后台设为 Secret）代理 Finnhub，密钥不暴露给前端。
- 本地联调：`npm run build && npx wrangler pages dev out`，并在本地设置 `FINNHUB_API_KEY`。
- 配置见 [`.env.example`](.env.example)。报价有延迟，仅供参考。

### 转化漏斗 · Conversion funnel

站点自带三个转化件,全部**未配置也不影响运行**:

1. **Newsletter 订阅**(首页/动态页)——表单提交到 `functions/api/subscribe.ts`,需在 Cloudflare Pages 绑定一个 **KV namespace,绑定名 `SUBSCRIBERS`**(Settings → Bindings → KV);导出订阅者:`npx wrangler kv key list --binding SUBSCRIBERS`。也可用 `NEXT_PUBLIC_SUBSCRIBE_ENDPOINT` 指向 Buttondown/Mailchimp 等外部服务。
2. **券商联盟位**(个股/投资人/共识页)——编辑 `lib/data/brokers.ts` 把官方链接换成你的**返佣链接**即可开始产生收入;所有链接带 `rel="sponsored"` 且区域内有披露声明。
3. **Cloudflare Web Analytics**(免费、无 Cookie)——设置构建环境变量 `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` 后自动注入;用它观察「访问 → 订阅/点击开户」漏斗,决定是否加大投入。

### 接入实时数据 · Going live with real data

页面只依赖 `lib/data/provider.ts` 的 `MarketDataProvider` 接口。要接入实时行情 / 13F：
实现一个 `LiveApiProvider`（例如对接 Finnhub / Polygon / SEC 13F 数据源），把 `provider` 指向它即可，**无需改动任何页面或组件**。在 Cloudflare 上可用 Pages Functions / Workers 承接后端，前端仍保持静态。

## 部署到 Cloudflare Pages · Deploy to Cloudflare Pages

本项目为**纯静态导出**，最适合 Cloudflare Pages。`.node-version`(=20)已固定 Node 版本(Next 16 需 Node ≥ 20),`wrangler.toml` 已声明产物目录 `out`——避免最常见的部署失败。

### 方式〇：GitHub Actions 自动部署（已内置,推荐）

仓库自带 `.github/workflows/deploy.yml`:每次合并到 `main` 自动构建并 `wrangler pages deploy` 到 Cloudflare Pages(项目 `ai-investing-compass`,KV 绑定与 `functions/` 自动生效)。
一次性启用:在 [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) 创建含 **Cloudflare Pages: Edit** 权限的 API Token → 仓库 Settings → Secrets 添加 `CLOUDFLARE_API_TOKEN`(建议同时加 `CLOUDFLARE_ACCOUNT_ID`)→ 任意 push 或手动 Run workflow 即上线。

### 方式一：Git 集成（控制台点击,零 token）

1. Cloudflare 控制台 → **Workers & Pages → Create → Pages → Connect to Git**,选择仓库 `f-tiger/aistock` 与分支 `main`。
2. 构建设置:
   - **Framework preset**: `Next.js (Static HTML Export)`(或 None)
   - **Build command**: `npx next build`
   - **Build output directory**: `out`
   - Node 版本由 `.node-version` 自动识别为 20(无需手动设)。
3. 保存并部署。`public/_redirects` 把 `/` 跳转到 `/zh/`,`public/_headers` 提供安全/缓存头,`functions/` 被自动识别为 Pages Functions。
4. （可选）实时行情:Pages 项目 → **Settings → Environment variables** 添加 Secret `FINNHUB_API_KEY`。不加也能正常运行(价格显示「—」)。

> 之后每次 push 到 `main`,Cloudflare 会自动重新构建并发布。

### 方式二：Wrangler 直传（一次性 / 本地）

```bash
npm ci
npm run build                       # 生成 ./out
npx wrangler pages deploy out       # 首次会提示登录并创建项目
```

需先 `npx wrangler login`(或设置 `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`)。项目名取自 `wrangler.toml` 的 `name`(`ai-investing-compass`)。

## 免责声明 · Disclaimer

本网站所有内容均为教育与信息参考，不构成投资、法律或税务建议，也不构成买卖任何证券的要约。持仓与数据来自公开来源，可能滞后或不完整，并标注「数据截至」日期。过往业绩不代表未来表现。投资有风险，决策请自行研究并咨询持牌专业人士。
