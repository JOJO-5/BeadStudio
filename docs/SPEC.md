# BeadStudio 技术规格说明书

## 1. 项目概述

BeadStudio（拼豆大师）是一款浏览器端拼豆/像素珠设计工具，核心功能：

- 图片上传 → 像素化处理 → 颜色映射 → 网格图纸导出
- 支持 PNG、PDF 导出，包含材料统计和拼板指引

## 2. 技术栈

| 模块 | 选型 | 备注 |
|------|------|------|
| 框架 | React + Vite | 开发效率高，HMR 快 |
| 语言 | TypeScript (strict) | AI 友好，类型安全 |
| 样式 | Tailwind CSS | 快速开发 |
| UI 组件 | shadcn/ui | 美观可定制，无运行时依赖 |
| 图标 | Lucide React | 风格统一 |
| 状态管理 | Zustand | 轻量，中小项目首选 |
| 图片裁剪 | react-easy-crop | 成熟稳定 |
| 图片缩放 | Pica | 质量远高于 Canvas 默认 |
| 颜色量化 | image-q | LAB + ΔE 全支持 |
| PDF 导出 | pdf-lib | 功能强，不依赖浏览器打印 |
| 文件下载 | file-saver | 简单稳定 |
| 单元测试 | Vitest | Vite 配套 |
| E2E 测试 | Playwright | 关键流程覆盖 |

## 3. 依赖版本

```json
{
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "vite": "^5.4.0",
  "typescript": "^5.5.0",
  "tailwindcss": "^3.4.0",
  "zustand": "^4.5.0",
  "react-easy-crop": "^5.0.0",
  "pica": "^9.0.0",
  "image-q": "^4.0.0",
  "pdf-lib": "^1.17.0",
  "file-saver": "^2.0.0",
  "vitest": "^1.6.0",
  "@playwright/test": "^1.45.0",
  "lucide-react": "^0.400.0"
}
```

## 4. 开发阶段

### Phase 1 - 仓库初始化（当前）
- [ ] 项目脚手架搭建
- [ ] Tailwind + shadcn/ui 配置
- [ ] 目录结构建立
- [ ] Git Hooks (husky + lint-staged)
- [ ] CI 配置 (GitHub Actions)
- [ ] 规范文档（AGENTS.md, CODING_STYLE.md, DESIGN_SYSTEM.md, DECISIONS.md）

### Phase 2 - 编辑器界面
- [ ] 左侧栏组件 (Sidebar)
- [ ] 中间 Canvas 画布
- [ ] 右侧统计面板 (Panel)
- [ ] 顶部工具栏 (Toolbar)
- [ ] 布局联调

### Phase 3 - 图片处理
- [ ] 图片上传（支持拖拽）
- [ ] 图片裁剪（react-easy-crop）
- [ ] 图片缩放（Pica）
- [ ] 图片像素化预览

### Phase 4 - 颜色引擎
- [ ] 调色板配置 (Palette Engine)
- [ ] 颜色量化映射 (Color Matcher — image-q)
- [ ] LAB 色彩空间 + ΔE2000 算法
- [ ] 抖动算法支持 (Floyd-Steinberg / Atkinson)

### Phase 5 - 网格与导出
- [ ] 网格绘制 (Grid Renderer)
- [ ] 拼板分割 (Board Split)
- [ ] PNG 导出 (file-saver)
- [ ] PDF 导出 (pdf-lib)
- [ ] 材料统计表

## 5. 核心架构决策 (DECISIONS.md)

| ID | 决策 | 原因 |
|----|------|------|
| 001 | 使用 Zustand 而非 Redux | 中小项目，Zustand 足够，轻量且 AI 友好 |
| 002 | Canvas2D 而非 SVG | 像素级操作性能更好，适合拼豆网格 |
| 003 | image-q 而自研颜色量化 | 成熟算法库 (LAB/ΔE/抖动)，专注业务逻辑 |
| 004 | Pica 而非 Canvas resize | 质量远高于双线性插值 |
| 005 | Web Worker 处理 CPU 密集型任务 | 避免 UI 阻塞 |
| 006 | Tailwind + shadcn/ui | 开发效率优先，定制灵活 |
| 007 | 第一版不引入 WebAssembly | 暂无性能瓶颈，Vite+Worker 足够 |

## 6. 借鉴项目

| 项目 | 借鉴内容 |
|------|----------|
| Excalidraw | 编辑器布局、Toolbar、Sidebar、Undo/Redo、Canvas 缩放、快捷键 |
| Pixelit | 图片像素化、调色板映射、Canvas 绘制 |
| image-q | 颜色量化算法（直接使用） |
| Pica | 图片高质量缩放（直接使用） |
| react-easy-crop | 图片裁剪（直接使用） |
| pdf-lib | PDF 生成（直接使用） |

## 7. 自己实现的模块（核心竞争力）

以下模块**不依赖第三方**，需要独立开发并充分测试：

- `PaletteEngine` — 调色板配置管理
- `ColorMatcher` — 颜色映射逻辑
- `Statistics` — 材料统计
- `GridRenderer` — 网格绘制
- `BoardSplit` — 拼板分割算法
- `ExportLayout` — 导出布局排版

## 8. 目录结构

```
src/
├── app/              # 页面路由和布局
├── components/       # 共享 UI 组件
│   ├── layout/       # 布局组件
│   ├── common/       # 通用组件
│   ├── toolbar/      # 工具栏
│   ├── sidebar/       # 侧边栏
│   ├── canvas/        # 画布组件
│   └── panel/         # 统计面板
├── features/         # 功能模块
│   ├── image-upload/
│   ├── color-match/
│   └── export/
├── engine/           # 核心算法
│   ├── palette/       # 调色板
│   ├── convert/       # 颜色转换
│   ├── statistics/     # 统计
│   ├── grid/           # 网格
│   └── export/         # 导出
├── store/             # Zustand stores
├── worker/            # Web Workers
├── hooks/             # React hooks
├── types/             # TypeScript 类型
├── utils/             # 工具函数
├── styles/            # 全局样式 / tokens
└── assets/            # 静态资源
```
