# BeadStudio 拼豆大师

浏览器端的拼豆（Perler Bead）设计工具，支持图片转像素画、自动颜色匹配、导出图纸和材料清单。

在线访问：https://beadstudio.codeno7.qzz.io

## 功能

- 📤 图片上传（支持拖拽）
- ✂️ 图片裁剪
- 🔍 缩放预览
- 🎨 自动颜色匹配（基于 Perler 经典色）
- 📊 颜色统计
- 📄 PDF/PNG 导出
- 🌙 深色/浅色模式

## 技术栈

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Zustand 5
- Pica（高质量图片缩放）
- pdf-lib（PDF 导出）

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint
```

## 部署到服务器

### 首次部署（完整安装）

```bash
./deploy.sh full
```

### 后续更新代码

```bash
./deploy.sh
```

### 查看服务状态

```bash
./deploy.sh status
```

### 查看日志

```bash
./deploy.sh logs
```

### 重启服务

```bash
./deploy.sh restart
```

### 连接服务器（SSH）

```bash
./deploy.sh server
```

## 服务器信息

- 地址：18.141.221.11
- 域名：beadstudio.codeno7.qzz.io
- 用户：ubuntu
- SSH Key：~/Downloads/JOJO.pem

## 项目结构

```
src/
├── app/              # 页面路由
├── components/       # UI 组件
│   ├── canvas/       # Canvas 画布
│   ├── layout/       # 布局组件
│   ├── panel/        # 侧边面板
│   ├── sidebar/      # 侧边栏
│   └── toolbar/      # 工具栏
├── engine/           # 核心算法
│   ├── colorMatch/  # 颜色匹配
│   ├── convert/      # 色彩空间转换
│   ├── dither/       # 抖动算法
│   ├── export/       # 导出功能
│   ├── grid/         # 网格处理
│   ├── palette/      # 调色板
│   ├── pixelate/     # 像素化
│   ├── resize/       # 图片缩放
│   └── statistics/   # 颜色统计
├── features/         # 功能模块
├── hooks/           # React Hooks
├── store/           # Zustand 状态管理
├── styles/          # 全局样式
├── types/           # TypeScript 类型
├── utils/           # 工具函数
└── worker/          # Web Workers
```

## 开发路线图

- [x] Phase 1: 仓库初始化
- [x] Phase 2: 编辑器界面
- [x] Phase 3: 图片处理
- [x] Phase 4: 颜色引擎
- [x] Phase 5: 网格与导出
- [ ] Phase 6: 多调色板支持（Artkal / Hama）
- [ ] Phase 7: 模板市场
- [ ] Phase 8: 移动端适配
