# 月隐先知：Cloudflare Worker 部署

现有 GitHub 仓库 `joyful-z/moon` 已连接 Cloudflare Worker `moon`。仓库根目录的 `wrangler.jsonc` 指定网页静态文件和 `/api/*` 接口，推送到 `main` 后由 Cloudflare 自动重新部署。

1. 在 Cloudflare 的 **Workers & Pages → moon → Deployments** 查看最新构建是否成功。公开网址是 `https://moon.zhaojiayi200402.workers.dev/`。
2. 打开 `https://moon.zhaojiayi200402.workers.dev/api/status`。`ready: true` 表示接口已上线；`qwenConfigured: false` 表示还需配置 AI 密钥。
3. 在 **moon → Settings → Variables and Secrets** 新增运行时 Secret `QWEN_API_KEY`，填入 Qwen API Key。建议先轮换之前在聊天中发出的旧密钥。不要把密钥放进 GitHub、构建命令或公开网页。
4. 保存 Secret 后再次打开 `/api/status`，确认 `qwenConfigured: true`。如果设置页能看到 Secret 但状态仍为 `false`，从 GitHub 仓库触发一次新的生产部署，并在 **Deployments** 确认最新版本已上线。然后用手机移动网络试用首页、星盘和 AI 解读。

Worker 构建命令可留空；默认部署命令 `npx wrangler deploy` 会读取 `wrangler.jsonc`。仓库已包含生成后的牌义与卦象数据。若需要重新生成，在仓库根目录运行 `npm run build` 并提交更新后的 `pages-data.mjs`。

本机仍可执行 `npm start`，打开 `http://127.0.0.1:4173/`。`functions/api/` 同时保留 Cloudflare Pages 兼容性。
