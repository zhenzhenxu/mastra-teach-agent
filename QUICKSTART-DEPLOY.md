# ⚡ 快速部署指南

5 分钟内完成部署！

## 🌐 选择 1: Cloudflare Pages（最简单，免费）

```bash
# 1. 一键部署
npm run deploy:cloudflare

# 2. 在 Cloudflare Dashboard 设置环境变量
# 访问 https://dash.cloudflare.com/
# Workers & Pages > 你的项目 > Settings > Variables
# 添加: OPENAI_API_KEY = 你的密钥

# 3. 完成！
```

**访问**: `https://tech-mentor-agent.pages.dev`

---

## ⚡ 选择 2: Vercel（超快速）

```bash
# 1. 一键部署
npm run deploy:vercel

# 2. 设置环境变量
vercel env add OPENAI_API_KEY

# 3. 完成！
```

---

## 🐳 选择 3: Docker（本地/服务器）

```bash
# 1. 确保 .env 文件已配置 OPENAI_API_KEY

# 2. 一键部署
npm run deploy:docker

# 3. 访问 http://localhost:3000
```

**其他命令**:
```bash
npm run docker:logs    # 查看日志
npm run docker:down    # 停止服务
npm run docker:up      # 重新启动
```

---

## 🎯 部署后检查清单

- [ ] 访问你的部署 URL
- [ ] 测试技术问答功能
- [ ] 测试学习路径生成
- [ ] 检查 API 响应速度
- [ ] （可选）绑定自定义域名

---

## ❓ 遇到问题？

### 问题 1: API 不工作
**解决**: 检查环境变量 `OPENAI_API_KEY` 是否正确设置

### 问题 2: 部署失败
**解决**:
- Cloudflare: 检查是否已登录 `wrangler login`
- Vercel: 检查是否已登录 `vercel login`
- Docker: 检查 Docker 是否运行

### 问题 3: 502/504 错误
**解决**:
- 检查 OpenAI API Key 是否有效
- 检查账户余额是否充足

---

## 📚 更多信息

详细部署文档: [DEPLOY.md](./DEPLOY.md)

---

**部署愉快！🚀**
