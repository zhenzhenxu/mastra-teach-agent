# 🚀 部署指南

本文档提供将技术学习导师部署到各种平台的详细步骤。

## 📋 目录

- [Cloudflare Pages + Workers 部署](#cloudflare-pages--workers-部署)
- [Vercel 部署](#vercel-部署)
- [传统服务器部署](#传统服务器部署)

---

## Cloudflare Pages + Workers 部署

Cloudflare 提供免费的部署服务，非常适合这个项目。

### 🎯 方案选择

推荐使用 **Cloudflare Pages** 部署前端 + **Cloudflare Workers** 运行后端 API

### 📦 前置准备

1. **注册 Cloudflare 账户**
   - 访问 https://dash.cloudflare.com/sign-up
   - 完成注册和邮箱验证

2. **安装 Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

3. **登录 Wrangler**
   ```bash
   wrangler login
   ```

### 🔧 步骤 1: 配置环境变量

在 Cloudflare Dashboard 中设置环境变量：

1. 进入 **Workers & Pages** 页面
2. 选择你的项目
3. 进入 **Settings** > **Variables**
4. 添加以下环境变量：
   - `OPENAI_API_KEY`: 你的 OpenAI API Key

### 🔧 步骤 2: 部署前端到 Cloudflare Pages

#### 方式 1: 通过 GitHub（推荐）

1. **将项目推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/你的用户名/tech-mentor-agent.git
   git push -u origin main
   ```

2. **在 Cloudflare Pages 创建项目**
   - 访问 https://dash.cloudflare.com/
   - 进入 **Workers & Pages** > **Create application** > **Pages**
   - 连接你的 GitHub 仓库
   - 选择 `tech-mentor-agent` 仓库

3. **配置构建设置**
   - **Build command**: `npm install`
   - **Build output directory**: `web/public`
   - **Root directory**: `/`

4. **添加环境变量**
   - 在 Pages 设置中添加 `OPENAI_API_KEY`

5. **部署**
   - 点击 **Save and Deploy**
   - 等待部署完成

#### 方式 2: 通过命令行

```bash
# 安装依赖
npm install

# 部署到 Cloudflare Pages
npx wrangler pages deploy web/public --project-name=tech-mentor-agent
```

### 🔧 步骤 3: 部署后端 API

由于 Cloudflare Workers 对 Node.js 运行时有限制，我们需要使用 Pages Functions。

#### 创建 Functions 目录

```bash
mkdir -p web/public/functions
```

#### 创建 API 端点

在 `web/public/functions/api/` 目录下创建 API 文件（已预配置）

#### 部署 Functions

```bash
npx wrangler pages deploy web/public --project-name=tech-mentor-agent
```

### ✅ 步骤 4: 验证部署

1. 访问 Cloudflare 提供的 URL（如 `tech-mentor-agent.pages.dev`）
2. 测试各个功能
3. 检查 API 是否正常工作

### 🔐 步骤 5: 自定义域名（可选）

1. 在 Cloudflare Pages 设置中
2. 进入 **Custom domains**
3. 添加你的域名
4. 按照提示配置 DNS

---

## Vercel 部署

Vercel 是另一个很好的部署选择。

### 📦 步骤 1: 安装 Vercel CLI

```bash
npm install -g vercel
```

### 🔧 步骤 2: 创建配置文件

创建 `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "web/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "web/public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "web/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "web/public/$1"
    }
  ],
  "env": {
    "OPENAI_API_KEY": "@openai_api_key"
  }
}
```

### 🚀 步骤 3: 部署

```bash
# 登录
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

### 🔐 步骤 4: 设置环境变量

```bash
vercel env add OPENAI_API_KEY
```

---

## 传统服务器部署

### 🖥️ 使用 PM2（推荐）

#### 1. 安装 PM2

```bash
npm install -g pm2
```

#### 2. 创建 PM2 配置

创建 `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'tech-mentor-agent',
    script: './web/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

#### 3. 启动应用

```bash
# 启动
pm2 start ecosystem.config.js

# 查看状态
pm2 status

# 查看日志
pm2 logs

# 设置开机自启
pm2 startup
pm2 save
```

### 🐳 使用 Docker

#### 1. 创建 Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "run", "web"]
```

#### 2. 创建 docker-compose.yml

```yaml
version: '3.8'

services:
  tech-mentor:
    build: .
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - DATA_PATH=/app/data
    volumes:
      - ./src/data:/app/data
    restart: unless-stopped
```

#### 3. 构建和运行

```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 🌐 Nginx 反向代理

创建 Nginx 配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## 📊 部署检查清单

部署前请确认：

- [ ] 已配置 `OPENAI_API_KEY` 环境变量
- [ ] 已测试所有 API 端点
- [ ] 已设置适当的 CORS 策略
- [ ] 已配置日志记录
- [ ] 已设置错误监控
- [ ] 已配置 HTTPS（生产环境）
- [ ] 已设置速率限制（可选）
- [ ] 已配置备份策略

## 🔒 安全建议

1. **环境变量**
   - 永远不要将 API Key 提交到 Git
   - 使用平台的环境变量管理功能

2. **HTTPS**
   - 生产环境必须使用 HTTPS
   - Cloudflare 和 Vercel 自动提供 HTTPS

3. **速率限制**
   - 考虑添加 API 速率限制
   - 防止滥用和过度使用

4. **数据备份**
   - 定期备份 `src/data/` 目录
   - 使用云存储服务

## 🆘 常见问题

### Q: 部署后 API 不工作？
A: 检查环境变量是否正确设置，特别是 `OPENAI_API_KEY`

### Q: 如何查看日志？
A:
- Cloudflare: 在 Dashboard 中查看 Functions 日志
- Vercel: 使用 `vercel logs`
- PM2: 使用 `pm2 logs`

### Q: 如何更新部署？
A:
- Cloudflare/Vercel: Git push 会自动触发部署
- PM2: `git pull && pm2 restart tech-mentor-agent`

### Q: 成本如何？
A:
- Cloudflare Pages: 免费额度很大，通常免费
- Vercel: 免费额度足够个人使用
- OpenAI API: 按使用量计费

---

## 📞 获取帮助

如果遇到问题：

1. 查看项目 [Issues](https://github.com/your-repo/tech-mentor-agent/issues)
2. 阅读平台官方文档
3. 在社区寻求帮助

---

**祝部署顺利！🚀**
