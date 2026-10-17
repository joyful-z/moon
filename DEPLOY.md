# 月隐先知：让其他设备访问

本项目需要 Node.js 服务：它同时提供网页、星盘计算和 Qwen 解读接口。仅上传 `dist/` 或分享本机 `127.0.0.1` 地址，会导致部分功能不可用。

## 使用 Render 部署

1. 在 GitHub 创建**私有仓库**，将此项目整个目录推送进去。确认 `.secrets/` 没有进入提交；`QWEN_API_KEY` 不得写入代码或 `render.yaml`。
2. 登录 Render，选择 **New → Web Service**，连接这个 GitHub 仓库。选择 `main` 分支、Node 运行环境、Singapore 区域和 **Free** 实例；构建命令填写 `npm install --omit=dev`，启动命令填写 `npm start`。
3. 在 **Advanced → Environment Variables** 添加 `QWEN_API_KEY`。建议先在阿里云百炼控制台重新生成密钥，停用曾经在聊天中发送过的旧密钥。密钥只填在 Render 环境变量中。健康检查路径可填写 `/api/status`。
4. 等待部署成功，打开 Render 给出的 `https://…onrender.com` 地址。通过手机移动网络测试首页、星盘和 AI 解读，再把该地址分享给别人。

本项目会自动使用 Render 提供的 `PORT` 和 `RENDER_EXTERNAL_URL`，无需把公网地址写进代码。`/api/status` 可用于检查服务：`ready` 和 `qwenConfigured` 应为 `true`。

免费 Web Service 闲置后会休眠，第一次访问可能等待约一分钟；Qwen 调用仍按阿里云的账户规则计费。正式对外推广时，建议配置 API 用量限制并考虑付费实例。自有域名可以在 Render 的服务设置中添加。
