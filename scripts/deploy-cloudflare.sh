#!/bin/bash

# Cloudflare Pages 部署脚本

echo "🚀 开始部署到 Cloudflare Pages..."

# 检查是否安装 wrangler
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI 未安装"
    echo "📦 正在安装 Wrangler..."
    npm install -g wrangler
fi

# 检查是否已登录
echo "🔐 检查登录状态..."
if ! wrangler whoami &> /dev/null; then
    echo "📝 请登录 Cloudflare..."
    wrangler login
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目（如果需要）
echo "🔨 准备部署文件..."

# 部署到 Cloudflare Pages
echo "☁️  部署到 Cloudflare Pages..."
npx wrangler pages deploy web/public --project-name=tech-mentor-agent

echo "✅ 部署完成！"
echo "🌐 请访问 Cloudflare Dashboard 查看部署状态"
echo "📝 不要忘记在 Dashboard 中设置环境变量 OPENAI_API_KEY"
