# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BeadStudio is a browser-based bead/peptide/dye design tool with canvas-based image processing, color matching algorithms (LAB + ΔE), and image export capabilities.

## Commands

```bash
pnpm install      # 安装依赖
pnpm dev          # 启动开发服务器
pnpm build        # 生产构建
pnpm lint         # Lint 和格式检查
pnpm typecheck    # TypeScript 类型检查
pnpm test         # 运行测试
pnpm test:unit    # 仅运行单元测试
```

## Architecture

### Layer Structure

```
app/           # 页面路由和布局
components/   # 共享 UI 组件 (layout/, common/, toolbar/, sidebar/, canvas/, panel/)
features/     # 功能模块 (image-upload/, color-match/, export/)
engine/       # 核心算法 (resize/, palette/, statistics/, render/, export/)
store/        # Zustand 状态管理 (ProjectStore, CanvasStore, SettingsStore, HistoryStore)
worker/       # Web Workers 处理 CPU 密集型任务
hooks/        # 共享 React Hooks
types/        # TypeScript 类型定义
utils/        # 纯工具函数
styles/       # 全局样式和 Design Tokens
assets/       # 静态资源
```

### Data Flow

User Input → Canvas → Engine (Worker) → Store → UI Update

### Key Constraints

- **禁止使用 `any`** — 使用 `unknown` + 类型守卫
- **UI 与 Engine 解耦** — 算法必须为纯函数，engine 中无 DOM 引用
- **单一职责 Store** — 仅限 ProjectStore、CanvasStore、SettingsStore、HistoryStore，禁止随意新增 Store
- **算法独立测试** — 颜色匹配、统计、缩放算法均在 engine/ 下独立测试
- **Canvas2D 渲染** — 主 canvas 层不使用 SVG

### Design Tokens

所有颜色、间距、字体、圆角均通过 `styles/` 下的 CSS 变量定义。组件必须引用 Token，禁止硬编码。

### Git Workflow

- Commit message 使用 commitlint（Conventional Commits 格式）
- Husky pre-commit hook：lint-staged 自动执行 lint、format、typecheck
- 每个 Commit = 一个 Task、一个目标，禁止跨模块修改

## Development Phases

项目遵循严格的"初始化优先"工作流：

1. **Phase 1（当前）**：仓库初始化 — 配置、文档、CI、Git Hooks、空目录结构
2. **Phase 2**：第一个功能 — 图片上传（暂无 Canvas，无算法）
3. **Phase 3**：Canvas 层 + 基础渲染
4. **Phase 4**：颜色匹配引擎（LAB + ΔE2000）
5. **Phase 5**：导出流水线

禁止在早期阶段实现后续阶段的功能。

## File Naming

- 组件：`PascalCase.tsx`
- Hooks：`camelCase.ts`，前缀 `use`
- Store：`camelCase.ts`，后缀 `Store`
- 工具：`camelCase.ts`
- 类型：`kebab-case.ts` 或 `types.ts`
