# 7 天流量冲刺 · Traffic Sprint

> 目标:把"等待 SEO 生效"(数月)压缩为"主动分发引爆"(数天)。
> 你每天的操作 ≤20 分钟,全部素材在 `content/launch/`,复制即发。
> 自动化侧已就绪:IndexNow 每次部署自动推送全部 URL 给 Bing 系;66 组程序化对比页已上线扩大搜索面。

## 发布日程(建议从周一开始)

| 天 | 渠道 | 素材 | 动作 |
|---|---|---|---|
| D1 | V2EX 分享创造 + 即刻 | v2ex.md / jike.md | 发帖;2 小时内回复每条评论 |
| D2 | 雪球 | xueqiu.md | 发长文;主页简介放站点链接 |
| D3 | 小红书 | xiaohongshu.md | 图文帖(截图共识榜做首图);主页放链接 |
| D4 | Reddit r/ValueInvesting | reddit.md | 发帖;认真回复方法论质疑(英文用户吃这套) |
| D5 | Hacker News Show HN | hn.md | 工作日美东上午 8–10 点发;发完立刻贴首评 |
| D6 | 复盘 | — | 看 Cloudflare Analytics:哪个渠道来的人多、订阅了几个 |
| D7 | 加注 | — | 把表现最好的渠道再发一篇(用 drafts/ 里剩下的素材) |

## 一次性配置(D1 之前,共约 15 分钟)

- [ ] **Google Search Console**:用 Cloudflare DNS 或 HTML 标签验证站点 → 提交 `sitemap.xml`(Google 不吃 IndexNow,必须手动;这是搜索流量最大的单一开关)
- [ ] **Bing Webmaster Tools**:可从 GSC 一键导入(IndexNow 已自动覆盖,提交后可看收录数据)
- [ ] 各平台账号主页简介统一放:`ai-investing-compass.pages.dev`
- [ ] 设 `NEXT_PUBLIC_CF_ANALYTICS_TOKEN`(GitHub Secrets),否则 D6 复盘无数据

## 发布纪律

1. **同一天最多 2 个渠道**——留出回评论的精力,互动率决定平台推荐量
2. **2 小时内回复所有评论**,包括批评;方法论被质疑=最好的传播机会
3. **不改钩子**:每篇第一句经过设计(数字+反差)
4. **每篇都带独有资产**:共识分数字(98/42/20)是别处看不到的,这是别人转发你的理由

## 判断标准(D7 复盘)

- 任一渠道单帖 >5000 曝光或 >50 点击 → 该渠道值得每周固定投入
- 订阅 >20 → 漏斗成立,启动周更 newsletter
- 全部渠道都 <500 曝光 → 钩子问题,换「NVDA 分歧」角度重试一轮(素材在 drafts/04)

## 付费加速(可选,预算自定)

自然分发跑完一轮后,若某渠道 ROI 清晰,可小额投放放大:小红书薯条 / X Ads 定向财经兴趣 / Google Ads 买 "NVDA vs AMD" 类对比词(我们的 66 组 vs 页就是现成落地页)。建议首期 ≤¥500 试水,用 Analytics 对比自然流量转化率再决定。
