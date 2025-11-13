#!/bin/bash

# Vercel 部署脚本

echo "🚀 开始部署到 Vercel..."

# 检查是否安装 vercel
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装"
    echo "📦 正在安装 Vercel..."
    npm install -g vercel
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 部署到 Vercel
echo "⚡ 部署到 Vercel..."
vercel --prod

echo "✅ 部署完成！"
echo "🌐 Vercel 会显示部署的 URL"
echo "📝 使用 'vercel env add OPENAI_API_KEY' 添加环境变量"
