#!/bin/bash
# =============================================
# BeadStudio 一键部署脚本
# =============================================
# 使用方式:
#   ./deploy.sh                    # 部署到服务器
#   ./deploy.sh server             # 仅连接服务器
#   ./deploy.sh status            # 查看服务状态
#   ./deploy.sh logs              # 查看日志
#   ./deploy.sh restart           # 重启服务
#   ./deploy.sh full              # 完整部署（安装依赖+构建+启动）
# =============================================

set -e

# 配置
SSH_KEY="/Users/shiaxionga/Downloads/JOJO.pem"
SSH_USER="ubuntu"
SSH_HOST="18.141.221.11"
PROJECT_DIR="/var/www/BeadStudio"

# SSH 命令
ssh_server() {
    ssh -tt -A -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} "$1"
}

ssh_with_env() {
    ssh -tt -A -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} \
        "export PNPM_HOME=\"\$HOME/.local/share/pnpm\"
         export PATH=\"\$PNPM_HOME/bin:\$PATH\"
         export PM2_HOME=\"\$HOME/.pm2\"
         $1"
}

# =============================================
# 部署函数
# =============================================
deploy() {
    echo "=== 部署 BeadStudio ==="
    ssh_with_env "cd ${PROJECT_DIR} && git pull && pnpm build && pm2 restart beadstudio && pm2 list"
    echo "=== 部署完成 ==="
}

# =============================================
# 完整部署（首次安装）
# =============================================
full_deploy() {
    echo "=== 完整部署 BeadStudio ==="

    echo "[1/5] 安装 Node.js..."
    ssh_server "curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash - && sudo apt-get install -y nodejs"

    echo "[2/5] 安装 pnpm..."
    ssh_server "curl -fsSL https://get.pnpm.io/install.sh | sh -"

    echo "[3/5] 安装 Nginx 和 PM2..."
    ssh_server "sudo apt-get update && sudo apt-get install -y nginx && export PNPM_HOME=\"\$HOME/.local/share/pnpm\" && export PATH=\"\$PNPM_HOME/bin:\$PATH\" && pnpm add -g pm2"

    echo "[4/5] 克隆项目..."
    ssh_server "sudo chown -R ${SSH_USER}:${SSH_USER} /var/www 2>/dev/null || true
                 mkdir -p /var/www
                 cd /var/www && rm -rf BeadStudio
                 git clone https://github.com/JOJO-5/BeadStudio.git
                 cd BeadStudio
                 export PNPM_HOME=\"\$HOME/.local/share/pnpm\"
                 export PATH=\"\$PNPM_HOME/bin:\$PATH\"
                 pnpm install && pnpm build"

    echo "[5/5] 配置 Nginx..."
    ssh_server "sudo rm -f /etc/nginx/sites-enabled/beadstudio
                 sudo bash -c 'cat > /etc/nginx/sites-available/beadstudio << \"EOFCONFIG\"
server {
    listen 80;
    server_name beadstudio.codeno7.qzz.io;
    return 301 https://\$server_name\$request_uri;
}
server {
    listen 443 ssl;
    server_name beadstudio.codeno7.qzz.io;

    ssl_certificate /etc/cloudflare/cert.pem;
    ssl_certificate_key /etc/cloudflare/key.pem;

    root /var/www/BeadStudio/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
EOFCONFIG
'
                 sudo ln -sf /etc/nginx/sites-available/beadstudio /etc/nginx/sites-enabled/
                 sudo rm -f /etc/nginx/sites-enabled/default
                 sudo nginx -t && sudo systemctl reload nginx"

    start_service
    echo "=== 完整部署完成 ==="
    echo "访问: https://beadstudio.codeno7.qzz.io"
}

# =============================================
# 查看状态
# =============================================
show_status() {
    echo "=== 服务状态 ==="
    ssh_with_env "pm2 list"
}

# =============================================
# 查看日志
# =============================================
show_logs() {
    echo "=== 最近日志 ==="
    ssh_with_env "pm2 logs beadstudio --lines 30 --nostream"
}

# =============================================
# 重启服务
# =============================================
restart_service() {
    echo "=== 重启服务 ==="
    ssh_with_env "pm2 restart beadstudio && pm2 list"
}

# =============================================
# 启动服务
# =============================================
start_service() {
    echo "=== 启动服务 ==="
    ssh_with_env "cd ${PROJECT_DIR} && pm2 stop beadstudio 2>/dev/null || true
                          pm2 delete beadstudio 2>/dev/null || true
                          pm2 start ecosystem.config.cjs && pm2 save && pm2 list"
}

# =============================================
# 连接服务器
# =============================================
connect_server() {
    ssh -tt -A -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST}
}

# =============================================
# 主流程
# =============================================
case "${1:-}" in
    server)
        connect_server
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs
        ;;
    restart)
        restart_service
        ;;
    full)
        full_deploy
        ;;
    "")
        deploy
        ;;
    help|--help|-h)
        echo "用法: ./deploy.sh [命令]"
        echo ""
        echo "命令:"
        echo "  (无参数)  部署更新到服务器"
        echo "  server      连接服务器"
        echo "  status      查看服务状态"
        echo "  logs        查看最近日志"
        echo "  restart     重启服务"
        echo "  full        完整部署（首次使用）"
        echo "  help        显示帮助"
        ;;
    *)
        echo "未知命令: $1"
        echo "用法: ./deploy.sh [命令]"
        exit 1
        ;;
esac
