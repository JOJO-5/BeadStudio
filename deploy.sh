#!/bin/bash
# BeadStudio 部署脚本
# 用法: ./deploy.sh

set -e

PROJECT_DIR="/var/www/beadstudio"
PORT=3000

echo "=== BeadStudio 部署脚本 ==="

# 创建项目目录（如果不存在）
if [ ! -d "$PROJECT_DIR" ]; then
    echo "📁 创建项目目录..."
    sudo mkdir -p $PROJECT_DIR
    sudo chown -R $USER:$USER $PROJECT_DIR
fi

cd $PROJECT_DIR

# 如果是 git clone
if [ ! -d ".git" ]; then
    echo "📦 克隆代码..."
    git clone git@github.com:JOJO-5/BeadStudio.git .
else
    echo "📥 拉取最新代码..."
    git pull origin main
fi

# 安装依赖
echo "📦 安装依赖..."
pnpm install

# 构建
echo "🔨 构建项目..."
pnpm build

# 安装 PM2（如果没有）
if ! command -v pm2 &> /dev/null; then
    echo "⚙️ 安装 PM2..."
    npm install -g pm2
fi

# 重启服务
echo "🚀 启动服务..."
pm2 stop beadstudio 2>/dev/null || true
pm2 delete beadstudio 2>/dev/null || true
pm2 start --name beadstudio -- npx --yes vite-preview --dist dist --port $PORT --host 0.0.0.0

# 保存 PM2 进程列表
pm2 save

echo ""
echo "=== 部署完成 ==="
echo "访问地址: http://你的服务器IP:$PORT"
echo ""
echo "常用命令:"
echo "  pm2 logs beadstudio    # 查看日志"
echo "  pm2 restart beadstudio # 重启"
echo "  pm2 stop beadstudio    # 停止"
