# 上线操作清单 · Go-live checklist

站点已完整构建、自动部署、自动化运营。要把它「点火」成真正跑起来的订阅+营收机器,只差**两步需要你的账号/密钥**(其余全自动)。全程约 5–10 分钟。

---

## ① 打开「新订阅自动通知」(约 2 分钟)

订阅后端(`functions/api/subscribe.ts`)已内置:每来一个新订阅者,自动私信你的 Telegram。只需加两个密钥。

1. 在 Telegram 找 **@BotFather** → `/newbot` → 拿到 **bot token**(形如 `123456:ABC-DEF...`)。
2. 给你**新建的 bot 发一条任意消息**,然后浏览器打开
   `https://api.telegram.org/bot<你的TOKEN>/getUpdates`,复制 `result[].message.chat.id`(一串数字)。
3. Cloudflare → **Pages → `ai-investing-compass` → Settings → Environment variables**,在 **Production** 加两个 **Secret**:
   - `TELEGRAM_BOT_TOKEN` = 第 1 步的 token
   - `TELEGRAM_CHAT_ID` = 第 2 步的 chat id
4. 保存后**重新部署一次**(Deployments → Retry,或推一次 main)让密钥生效。

✅ 完成后:每个真实订阅都会自动私信你(邮箱 / 来源 / 累计数)。

> 可选:想自动发**欢迎邮件**,再加 `RESEND_API_KEY` + `RESEND_FROM`(在 resend.com 建 key 并验证发信域名)。不加也不影响订阅。

**自测**:打开站点任意订阅框,用你自己的邮箱订一次 → 几秒内你的 Telegram 应收到私信。

---

## ② 首发引流(把水引进来)

系统再完美,没有访客就没有订阅。文案都写好了,复制即发:

- **X / Twitter**:`content/launch/x-thread.md`(中英双版,含实时数据,分楼层发)
- **即刻 / 小红书**:`content/launch/jike.md`、`content/launch/xiaohongshu.md`
- **雪球**(华语核心):`content/launch/xueqiu.md`
- **V2EX / Reddit / Hacker News**:`content/launch/{v2ex,reddit,hn}.md`
- **7 天冲刺节奏**:`docs/traffic-sprint.md`

发布前对一眼 `/zh/consensus` 的当前数字(共识分/温度计会随季度变),把文案里的数字更新一致。

**分享钩子**(转化率最高的三个链接):
- 共识温度计:`/zh/consensus`
- 组合体检(可分享 `?p=` 结果):`/zh/tools/portfolio`
- 跟投大佬:`/zh/follow`

---

## 已经在自动跑的(你不用管)

- **构建 & 部署**:合并到 `main` → GitHub Actions 自动静态导出并部署到 Cloudflare Pages。
- **搜索收录**:每次部署自动向 IndexNow 提交 sitemap(Bing/Yandex 等);`sitemap.xml` + `hreflang` + `llms.txt`(供 AI 引擎引用)齐全。
- **每周内容运营**:每周一 `ops-weekly.yml` 自动创建运营任务(汇总大佬动作 → 更新数据 → 开 PR)。
- **每季 13F**:`ops-13f.yml` 到点自动提醒更新持仓与共识分。
- **健康检查**:`health.yml` 定期自检。

## 变现开关(可选,随时开)

- **券商返佣**:把 `lib/data/brokers.ts` 里的链接换成你的联盟/返佣链接即生效。
- **Pro 订阅(真实收款)**:`/pro` 默认收集早鸟候补名单(`source=pro`,存 KV)。想**直接开卖**,在任一平台建一个托管收款链接(Gumroad / Lemon Squeezy / Stripe Payment Link / Ko-fi,几分钟搞定),把链接填到 Cloudflare 环境变量 `NEXT_PUBLIC_PRO_CHECKOUT_URL` 再重部署——`/pro` 的按钮就变成「立即订阅 Pro」直达收款页,**真实营收即刻打开**。不填则继续走候补名单。

---

完成 ① 和 ② 后,「访客 → 工具/落地页 → 订阅 → 私信你 → (返佣/Pro)营收」闭环就真正转起来了。之后把**真实访问与订阅数据**发我,我据此做转化优化与迭代。
