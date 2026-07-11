# 自动化运营方案 · Automated Operations

> 目标:让「AI 投资罗盘」以**近零人工**持续运转——内容持续生产、数据保持新鲜、健康持续监控、漏斗持续度量——把人工保留在唯一无法自动化的环节:把内容贴到平台上。

## 护城河:罗盘共识分(CCS)

本站的差异化资产不是内容本身,而是**「罗盘共识分」**——把 8 位传奇投资人的公开持仓动作量化为每只 AI 股票的 0–100 可解释评分(`lib/data/score.ts`,方法论公开在 /methodology#ccs)。护城河由三层构成,且**都随时间加深**:

1. **方法论品牌**:每次内容引用"共识分"都在积累品牌资产;抄公式容易,抄"被引用的名字"难。
2. **逐季积累的历史序列**:每季 13F 更新追加一期评分快照(`scoreHistory`),两年后就是别人无法回补的时间序列——付费订阅(评分历史 + 变动提醒)的产品基础。
3. **订阅者列表**:KV 里的邮箱是私域;Pro 上线时的第一批种子用户。

**推广纪律**:所有平台内容优先用"共识分变动"做钩子(ops-weekly 已内置该指令),把独有指标而非通用资讯作为传播单元。

## 核心认知(为什么这样设计)

网站不是目的地,**是转化终点**。流量来自:①搜索着陆(SEO) ②平台分发(雪球/公众号/小红书/X 上的内容把人引回来)。因此运营的本质是**内容生产流水线**,而内容的原料是**数据更新**(13F、AI 板块要闻)。自动化的对象就是这条流水线。

## 架构:三层自动化

```
┌─ 第一层 内容生产(GitHub Actions 定时开「执行型 Issue」+ Claude)
│   · ops-weekly.yml  每周一:自动开一个含完整执行提示词的运营 Issue 并 @claude
│                     —— 安装了 Claude GitHub App 时由 Claude 自动执行:
│                        搜要闻 → 更新站内数据 → 产出平台帖草稿 → 开 PR
│                     —— 未安装时,Issue 即 runbook:粘贴进任意 Claude 会话执行
│   · ops-13f.yml     每季 13F 截止日后:同上,开季度深度更新的清单 Issue
│
├─ 第二层 确定性守护(GitHub Actions)
│   · ci.yml          每次 push/PR:lint + 静态构建 + 产物校验
│   · health.yml      每周一:构建健康 + 线上站点可达性;失败自动开 Issue
│
└─ 第三层 度量与转化(Cloudflare,零代码)
    · Web Analytics  访问 → 订阅/点击开户 漏斗
    · KV(SUBSCRIBERS) 订阅者沉淀
    · 联盟链接        开户返佣(lib/data/brokers.ts)
```

> 全自动化的开关:在仓库安装 **Claude GitHub App**(github.com/apps/claude)。装上后,每周/每季 Issue 中的 @claude 会自动执行内容生产并开 PR;人工只剩「合并 PR + 把草稿贴到平台」。

## 运营节奏日历

| 频率 | 触发 | 执行者 | 动作 | 产物 |
|---|---|---|---|---|
| 每次 push | ci.yml | GitHub Actions | lint + 构建 + 校验 | 绿/红检查 |
| **每周一** | ops-weekly.yml → 执行型 Issue @claude | Claude(装 App 后全自动) | 搜要闻→更新 `updates.ts`→产出 1–2 篇平台帖 | PR + 草稿 |
| 每周一 | health.yml | GitHub Actions | 构建 + 站点 Ping | 失败则 Issue |
| **每季 13F 后**(2/16、5/16、8/15、11/15) | ops-13f.yml → 清单 Issue @claude | Claude + Actions | 核对 8 人持仓→深度更新→季度内容包 | PR + 内容包 + 审计 Issue |
| 随时 | 人工(约每周 15 分钟) | 你 | 合并 PR;把 `content/drafts/` 里的帖子贴到雪球/公众号/小红书/X | 平台曝光 → 回流 |

## 内容体系

- `content/templates/` — 三个平台模板(雪球长文 / 小红书 / X thread),定义钩子、结构、合规话术与转化位
- `content/drafts/<年-月>/` — 每期产出的成品草稿,**复制即可发布**
- 首批 4 篇已就绪(2026-07):共识矩阵长文、段永平深度、 小红书版共识、Tepper 英文 thread
- 所有内容强制:数字有出处、带截至日期、带免责声明、结尾带转化位(订阅/完整版链接)

## KPI(判断这门生意是否成立)

上线后按周记录,**观察 8 周**:

| 指标 | 看哪里 | 及格信号(第 8 周) |
|---|---|---|
| 周独立访客 | Cloudflare Web Analytics | > 500 |
| 邮箱订阅数 | KV `SUBSCRIBERS`(`wrangler kv key list`) | > 50 |
| 开户链接点击 | Analytics(`data-broker` 卡片) | > 30/周 |
| 平台帖互动 | 雪球/小红书后台 | 单帖 > 100 赞藏 |

**达标** → 下一阶段:13F 数据源自动拉取 + 付费订阅(Superinvestors.ai 双语版模型)。
**不达标** → 停止投入,保留站点为零维护资产。止损也是结论。

## 人工保留项(无法/不应自动化)

1. **发布**:把草稿贴到雪球/公众号/小红书/X(平台风控不允许机器人发帖)——每周约 15 分钟
2. **合并 PR**:自动产出的 PR 建议人工扫一眼再合(数字准确性是这个站的生命线)
3. **商务**:申请券商联盟资格、替换返佣链接(一次性)

## 故障与例外处理

- 构建/站点挂了 → health.yml 自动开 Issue(标题含日期与运行链接)
- 周/季 Issue 无人执行 → Issue 本身就是提醒;可手动把内容粘贴进 Claude 会话执行,或在 Actions 页手动 `workflow_dispatch` 重开
- 数据出错(最严重) → 立即修复并在下一篇内容中更正;所有数字必须可溯源到 `sources`
- 想停一切自动化 → 在仓库 Settings → Actions 禁用四个 workflow,站点照常运行

## 一次性配置清单(激活全链路)

- [ ] Cloudflare Pages 连接仓库部署(README「部署」节)
- [ ] 部署后把仓库 Variable `SITE_URL` 设为线上地址(启用 health.yml 的站点 Ping)
- [ ] Pages 绑定 KV namespace `SUBSCRIBERS`(启用订阅)
- [ ] 设 `NEXT_PUBLIC_CF_ANALYTICS_TOKEN`(启用漏斗度量)
- [ ] 替换 `lib/data/brokers.ts` 为返佣链接(启用收入)
- [ ] 注册雪球/小红书/公众号账号,主页放站点链接
- [ ] 在仓库安装 **Claude GitHub App**(启用周/季 Issue 的 @claude 全自动执行)
