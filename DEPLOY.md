# 月隐先知：免费公网部署

使用 Cloudflare Pages 的 GitHub 集成部署本项目。网页由 Pages 提供；`functions/api/` 负责星盘计算及 Qwen 解读。`127.0.0.1` 只供本机使用。

1. 登录 Cloudflare，进入 **Workers & Pages → Create application → Pages → Connect to Git**，授权它访问 GitHub 仓库 `joyful-z/moon`。
2. 选择 `main` 分支，项目名称可填 `moon-veil-oracle`。Framework preset 选择 **None**；Build command 填 `node scripts/build-pages-data.mjs`；Build output directory 填 `dist`；Root directory 保持仓库根目录。
3. 点击 **Save and Deploy**。首次部署会给出 `https://<项目名>.pages.dev` 地址。无需在代码或 GitHub 中保存 Qwen 密钥。
4. 在该 Pages 项目里打开 **Settings → Variables and Secrets → Add**，新增 `QWEN_API_KEY`，选择 **Encrypt** 并填写密钥，作用环境选 **Production**。建议更换此前在聊天中发送过的旧密钥。保存后重新部署最新提交，让 Functions 获取新密钥。
5. 打开 `https://<项目名>.pages.dev/api/status`，确认 `ready` 与 `qwenConfigured` 都为 `true`；再用手机移动网络测试首页、星盘和 AI 解读。

本机仍可用 `npm start` 运行原有 Node 服务。Pages 的构建脚本会从 `dist` 自动生成 API 所需数据，不需要提交 `pages-data.mjs`。不要把 `.secrets/`、`.dev.vars` 或 `.env` 提交到 GitHub。
