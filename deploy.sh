#!/bin/bash
# =============================================
# BeadStudio 服务器部署脚本
# =============================================
# 使用方式:
#   ./deploy.sh                    # 全新部署
#   ./deploy.sh update             # 更新代码
#   ./deploy.sh restart            # 重启服务
#   ./deploy.sh logs               # 查看日志
# =============================================

set -e

# 配置
PROJECT_DIR="/var/www/BeadStudio"
DOMAIN="beadstudio.codeno7.qzz.io"
PORT=3000
SSH_KEY="/Users/shiaxionga/Downloads/JOJO.pem"
SSH_USER="ubuntu"
SSH_HOST="18.141.221.11"

# SSH 命令辅助函数
ssh_server() {
    ssh -tt -A -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} "$1"
}

ssh_server_with_pnpm() {
    ssh -tt -A -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} \
        "export PNPM_HOME=\"\$HOME/.local/share/pnpm\"
         export PATH=\"\$PNPM_HOME/bin:\$PATH\"
         export PM2_HOME=\"\$HOME/.pm2\"
         $1"
}

# =============================================
# 全新部署
# =============================================
deploy_fresh() {
    echo "=== 1/5 安装 Node.js ==="
    ssh_server "curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash - && sudo apt-get install -y nodejs"

    echo "=== 2/5 安装 pnpm ==="
    ssh_server "curl -fsSL https://get.pnpm.io/install.sh | sh -"

    echo "=== 3/5 安装 Nginx 和 PM2 ==="
    ssh_server "sudo apt-get update && sudo apt-get install -y nginx && export PNPM_HOME=\"\$HOME/.local/share/pnpm\" && export PATH=\"\$PNPM_HOME/bin:\$PATH\" && pnpm add -g pm2"

    echo "=== 4/5 克隆并构建项目 ==="
    ssh_server "sudo chown -R ${SSH_USER}:${SSH_USER} /var/www 2>/dev/null || true
                 mkdir -p /var/www
                 cd /var/www && rm -rf BeadStudio
                 git clone https://github.com/JOJO-5/BeadStudio.git
                 cd BeadStudio
                 export PNPM_HOME=\"\$HOME/.local/share/pnpm\"
                 export PATH=\"\$PNPM_HOME/bin:\$PATH\"
                 pnpm install && pnpm build"

    echo "=== 5/5 配置 Nginx 反向代理 ==="
    ssh_server_with_pnpm "sudo bash -c 'cat > /etc/nginx/sites-available/beadstudio << EOF
server {
    listen 80;
    server_name ${DOMAIN};

    location / {
        proxy_pass http://localhost:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection '\''upgrade'\'';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF'"

    ssh_server "sudo ln -sf /etc/nginx/sites-available/beadstudio /etc/nginx/sites-enabled/
                 sudo rm -f /etc/nginx/sites-enabled/default
                 sudo nginx -t && sudo systemctl reload nginx"

    start_service
    echo ""
    echo "=== 部署完成 ==="
    echo "访问地址: http://${DOMAIN}"
}

# =============================================
# 更新代码
# =============================================
deploy_update() {
    echo "=== 更新代码 ==="
    ssh_server_with_pmgr "cd ${PROJECT_DIR} && git pull && pnpm build && pm2 restart beadstudio"
    echo "更新完成!"
}

# =============================================
# 重启服务
# =============================================
start_service() {
    echo "=== 启动 PM2 服务 ==="
    ssh_server_with_pnpm "cd ${PROJECT_DIR}
                          pm2 stop beadstudio 2>/dev/null || true
                          pm2 delete beadstudio 2>/dev/null || true
                          pm2 start ecosystem.config.cjs
                          pm2 save"
}

# =============================================
# 查看日志
# =============================================
show_logs() {
    ssh_server_with_pnpm "pm2 logs beadstudio --lines 50 --nostream"
}

# =============================================
# 主流程
# =============================================
case "${1:-}" in
    update)
        deploy_update
        ;;
    restart)
        start_service
        ;;
    logs)
        show_logs
        ;;
    "")
        deploy_fresh
        ;;
    help|--help|-h)
        echo "用法: $0 [命令]"
        echo "  (无参数)  全新部署"
        echo "  update    更新代码并重启"
        echo "  restart   重启服务"
        echo "  logs      查看日志"
        echo "  help      显示帮助"
        ;;
    *)
        echo "未知命令: $1"
        echo "用法: $0 [命令]"
        exit 1
        ;;
esac
