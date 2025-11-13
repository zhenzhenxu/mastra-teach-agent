#!/bin/bash

# Docker 部署脚本

echo "🐳 开始 Docker 部署..."

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装"
    echo "请先安装 Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

# 检查 docker-compose 是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose 未安装"
    echo "请先安装 docker-compose"
    exit 1
fi

# 检查 .env 文件
if [ ! -f .env ]; then
    echo "❌ .env 文件不存在"
    echo "请先创建 .env 文件并配置 OPENAI_API_KEY"
    exit 1
fi

# 停止现有容器
echo "🛑 停止现有容器..."
docker-compose down

# 构建镜像
echo "🔨 构建 Docker 镜像..."
docker-compose build

# 启动容器
echo "🚀 启动容器..."
docker-compose up -d

# 查看日志
echo "📋 查看日志..."
docker-compose logs -f --tail=50

echo "✅ 部署完成！"
echo "🌐 访问 http://localhost:3000"
echo "📊 使用 'docker-compose logs -f' 查看实时日志"
echo "🛑 使用 'docker-compose down' 停止服务"
