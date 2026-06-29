# AI 投资罗盘 · AI Investing Compass

一个**中英双语、教育导向**的网站，把三件事整合到一处：

1. **AI 行情** — AI 板块的细分赛道（算力 / 基建 / 应用 / 能源）、多头逻辑与主要风险；
2. **传奇人物对 AI 的投资** — 巴菲特、Cathie Wood、Druckenmiller、Ackman 等在 AI 上的具体布局与逻辑（基于公开 13F 与报道）；
3. **长期投资** — 可执行的长期投资原则与检查清单。

A **bilingual (中文/EN), education-focused** site that unifies AI market trends, how legendary investors are positioned in AI (with reasoning), and long-term investing principles.

> ⚠️ 仅供教育与信息参考，**不构成投资建议**。For education only — **not investment advice**.

竞品调研见 [`docs/competitor-research.md`](docs/competitor-research.md)（市场上有很多相邻工具，但没有一个聚焦整合这三块——这是本项目的定位）。

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
    market/                   # AI 行情
    investors/                # 传奇人物列表
    investors/[slug]/         # 投资人详情（持仓 + 逻辑 + 来源）
    long-term/                # 长期投资原则 + 检查清单
    methodology/              # 竞品调研 + 数据方法 + 免责声明
components/                   # Navbar / Footer / 卡片 / 表格 / 免责声明 等
lib/
  i18n/                       # locale 配置与 UI 文案字典
  data/                       # types / investors / themes / principles / competitors
  data/provider.ts            # MarketDataProvider 接口 + StaticProvider（预留 LiveApiProvider）
docs/competitor-research.md   # 竞品调研全文（含来源）
public/_redirects, _headers   # Cloudflare Pages 边缘配置
```

### 接入实时数据 · Going live with real data

页面只依赖 `lib/data/provider.ts` 的 `MarketDataProvider` 接口。要接入实时行情 / 13F：
实现一个 `LiveApiProvider`（例如对接 Finnhub / Polygon / SEC 13F 数据源），把 `provider` 指向它即可，**无需改动任何页面或组件**。在 Cloudflare 上可用 Pages Functions / Workers 承接后端，前端仍保持静态。

## 部署到 Cloudflare Pages · Deploy to Cloudflare Pages

本项目为**纯静态导出**，最适合 GitHub + Cloudflare Pages：

1. 把仓库推到 GitHub（本项目仓库：`f-tiger/aistock`）。
2. Cloudflare 控制台 → **Workers & Pages → Create → Pages → Connect to Git**，选择本仓库与分支。
3. 构建设置：
   - **Framework preset**: `Next.js (Static HTML Export)`（或 None）
   - **Build command**: `npx next build`
   - **Build output directory**: `out`
   - **Node version**: 20+（可设环境变量 `NODE_VERSION=20`）
4. 保存并部署。`public/_redirects` 会把 `/` 跳转到 `/zh/`，`public/_headers` 提供安全/缓存头。

> 后续每次 push 到所连分支，Cloudflare Pages 会自动重新构建并发布。

## 免责声明 · Disclaimer

本网站所有内容均为教育与信息参考，不构成投资、法律或税务建议，也不构成买卖任何证券的要约。持仓与数据来自公开来源，可能滞后或不完整，并标注「数据截至」日期。过往业绩不代表未来表现。投资有风险，决策请自行研究并咨询持牌专业人士。
