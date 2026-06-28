# AGENTS.md — AI 开发指南

本文件是 AI Agent 在 BeadStudio 项目中工作的核心规范，所有 AI 开发必须严格遵守。

---

## 项目目标

BeadStudio（拼豆大师）是一款浏览器端拼豆设计工具：
- 图片上传 → 像素化 → 颜色映射 → 网格图纸导出
- 核心价值：PaletteEngine / ColorMatcher / GridRenderer / BoardSplit / ExportLayout

---

## 技术栈

| 模块 | 技术 |
|------|------|
| 框架 | React 18 + Vite 5 |
| 语言 | TypeScript 5.5 (strict) |
| 样式 | Tailwind CSS |
| UI | shadcn/ui + Lucide React |
| 状态 | Zustand |
| 图片裁剪 | react-easy-crop |
| 图片缩放 | Pica |
| 颜色量化 | image-q |
| PDF导出 | pdf-lib |
| 测试 | Vitest + Playwright |

---

## 开发原则

1. **不开发无需求功能** — 没有写在任务里的功能不实现
2. **不提前优化** — 先让它工作，再考虑性能
3. **保持简单** — KISS 原则，复杂解决方案需要充分理由
4. **算法独立** — engine/ 下的算法必须是纯函数，无 DOM 依赖
5. **UI 与算法解耦** — Canvas 渲染逻辑不混入算法逻辑
6. **单一职责** — 每个模块只做一件事
7. **优先可维护性** — 写可读代码，而非"聪明"代码

---

## 文件组织

```
src/
├── app/            # 页面路由
├── components/     # UI 组件（layout/ common/ toolbar/ sidebar/ canvas/ panel/）
├── features/       # 功能模块（image-upload/ color-match/ export/）
├── engine/          # 核心算法（palette/ convert/ statistics/ grid/ export/）
├── store/          # Zustand stores
├── worker/         # Web Workers
├── hooks/          # React hooks
├── types/          # 类型定义
├── utils/          # 工具函数
├── styles/         # 全局样式 / tokens
└── assets/         # 静态资源
```

---

## 编码规范

### 禁止事项（红线）

- ❌ 禁止使用 `any`，使用 `unknown` + 类型守卫
- ❌ 禁止在 engine/ 中直接操作 DOM
- ❌ 禁止在 Store 中直接写入业务逻辑（逻辑在 engine/，Store 只管状态）
- ❌ 禁止跨模块修改（一个 commit 不改两个模块）
- ❌ 禁止提交无测试的核心算法改动
- ❌ 禁止硬编码颜色值，使用 styles/tokens 中的 CSS 变量

### 文件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件 | PascalCase.tsx | `ColorPicker.tsx` |
| Hooks | camelCase.ts，`use` 前缀 | `useColorMatcher.ts` |
| Store | camelCase.ts，`Store` 后缀 | `projectStore.ts` |
| 工具函数 | camelCase.ts | `colorConversion.ts` |
| 类型 | types.ts 或 kebab-case.ts | `color.types.ts` |
| Worker | worker.ts | `quantize.worker.ts` |

### Import 顺序

```typescript
// 1. React / 框架
import { useState, useEffect } from 'react'
import React from 'react'

// 2. 外部库
import { useCrop } from 'react-easy-crop'
import { saveAs } from 'file-saver'

// 3. 内部模块（@/ 开头的 alias）
import { ColorMatcher } from '@/engine/color-match'
import { useProjectStore } from '@/store/projectStore'

// 4. 类型导入
import type { PixelData } from '@/types/pixel'
import type { Palette } from '@/types/palette'

// 5. 样式
import './Button.css'
```

### TypeScript 规范

```typescript
// ✅ 正确：明确的类型
function processImage(src: ImageData, palette: Palette): ImageData

// ❌ 错误：any
function processImage(src: any, palette: any): any

// ✅ 正确：unknown + 类型守卫
function parseConfig(raw: unknown): Config {
  if (isConfig(raw)) return raw
  throw new Error('Invalid config')
}

// ✅ 正确：interface 定义复杂对象
interface ColorMapping {
  sourceColor: RGB
  targetColor: RGB
  deltaE: number
}

// ✅ 正确：type 定义联合类型
type ExportFormat = 'png' | 'pdf'
```

---

## Store 规范

仅允许以下四个 Store，全部使用 Zustand：

| Store | 职责 |
|-------|------|
| ProjectStore | 项目配置（文件名、尺寸、调色板） |
| CanvasStore | 画布状态（缩放、平移、选中元素） |
| SettingsStore | 用户设置（偏好、语言、快捷键） |
| HistoryStore | 撤销/重做历史栈 |

**新增 Store 必须经过评审，禁止随意创建。**

---

## Worker 规范

所有 CPU 密集型操作必须进入 Worker：

- 图片缩放（Pica in Worker）
- 颜色量化（image-q in Worker）
- 网格计算（纯算法）
- 导出渲染（PDF/PNG 生成）

Worker 通信协议：

```typescript
// worker/message.ts
export interface WorkerMessage<T = unknown> {
  id: string
  type: 'resize' | 'quantize' | 'export'
  payload: T
  timestamp: number
}

export interface WorkerResponse<T = unknown> {
  id: string
  success: boolean
  result?: T
  error?: string
}
```

---

## Task 执行规范

每个 Task = 一个 Git Commit = 一份 PR：

1. 每个 Task 有唯一编号（Task-001 ~ Task-044）
2. Commit message 格式：`type(Task-XXX): description`
   - `feat(Task-014): 实现三栏布局框架`
   - `fix(Task-027): 修复 Worker 内存泄漏`
3. PR 描述必须包含：改动内容 / 测试截图 / 相关 DECISIONS.md 更新
4. 禁止一个 PR 跨越多个 Task

---

## CI 要求

GitHub Actions 自动执行：

```yaml
steps:
  - Install dependencies
  - Lint (ESLint + Prettier)
  - Typecheck (tsc --noEmit)
  - Test (Vitest)
  - Build (pnpm build)
```

PR 必须通过全部 CI 检查才能合并。

---

## 文档更新规范

| 文件 | 更新时机 |
|------|----------|
| DECISIONS.md | 任何架构决策变化时 |
| TASKS.md | 开始新 Task 时标记 `in_progress`，完成后标记 `done` |
| CHANGELOG.md | 每个 release 前更新 |
| README.md | 重大功能变更时更新 |

---

## 参考资源

- shadcn/ui 组件源码：https://github.com/shadcn-ui/ui
- image-q API：https://github.com/ibezkrovnyi/image-q
- Pica 文档：https://github.com/nodeca/pica
- react-easy-crop：https://github.com/ValentinH/react-easy-crop
- pdf-lib：https://github.com/Hopding/pdf-lib
