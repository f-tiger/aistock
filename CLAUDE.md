# 工作约定 · Working conventions

## 任务执行方式（用户偏好）
- **先生成 prompt 并优化，再执行任务。** 每个任务/迭代开始前,先把要做的事写成一个清晰、优化过的 prompt/规格(目标、范围、验收标准),然后再动手实现。
- Before executing any task or iteration, first draft and refine an optimized prompt/spec (goal, scope, acceptance criteria), then implement.

## 项目速览
- AI 投资罗盘 / AI Investing Compass:双语(zh/en)Next.js 静态导出站,部署到 Cloudflare Pages(项目 `ai-investing-compass`)。
- 护城河:罗盘共识分(CCS)—— 把 8 位传奇投资人的公开 13F 动作量化为每只 AI 股票的 0–100 分。
- 开发分支:`claude/ai-investment-guidance-site-i9q9il`;经 PR squash 合并到 `main` 触发部署。
- 变现:`/pro`(Free vs Pro + 早鸟候补)、券商返佣 CTA;订阅后端 `functions/api/subscribe.ts`(KV + Telegram 通知 + 可选 Resend 欢迎邮件)。
- 验证:`npm run lint` + `npm run build`(静态导出),并用预装 Chromium 无头截图核对页面。
