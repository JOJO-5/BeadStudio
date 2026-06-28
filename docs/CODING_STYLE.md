# 编码规范 (Coding Style Guide)

## TypeScript 规范

### 严格模式

项目始终使用 `strict: true`，所有规则开启。

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### 类型定义

**优先使用 `interface` 定义对象类型，`type` 用于联合/交集类型。**

```typescript
// ✅ 正确
interface ColorRGB {
  r: number
  g: number
  b: number
}

type ExportFormat = 'png' | 'pdf'
type ImageProcessor = (input: ImageData) => ImageData

// ✅ 正确：复杂类型用 type
type Color LAB = { L: number; a: number; b: number }

interface ColorMapping {
  source: RGB
  target: RGB
  deltaE: number
}
```

**禁止使用 `any`，用 `unknown` 代替并做类型守卫。**

```typescript
// ❌ 禁止
function parse(data: any): any

// ✅ 正确
function parse(data: unknown): ParsedResult {
  if (!isValidData(data)) {
    throw new Error('Invalid data')
  }
  return data as ParsedResult
}

function isValidData(v: unknown): v is ValidData {
  return (
    typeof v === 'object' &&
    v !== null &&
    'type' in v &&
    typeof (v as Record<string, unknown>).type === 'string'
  )
}
```

### 函数签名

**参数和返回值必须标注类型，公共 API 尤其重要。**

```typescript
// ✅ 正确
export function rgbToLab(rgb: RGB): LAB
export function calculateDeltaE(lab1: LAB, lab2: LAB): number
export function quantizeImage(imageData: ImageData, palette: Palette): QuantizedResult

// ❌ 错误：隐式 any
export function rgbToLab(rgb) { ... }
```

### 泛型约束

**泛型必须有约束，避免 `any` 通过泛型流入。**

```typescript
// ✅ 正确
function processArray<T extends RGB>(items: T[]): T[] {
  return items.map(item => ({ ...item }))
}

// ❌ 错误：无约束的泛型等同于 any
function processArray<T>(items: T[]): T[]
```

---

## 文件结构规范

### Import 顺序（必须按此排序）

```typescript
// 1. React 核心
import React from 'react'
import { useState, useEffect, useCallback } from 'react'

// 2. 外部库（按字母顺序）
import { useCrop } from 'react-easy-crop'
import { saveAs } from 'file-saver'
import { FileDown, ZoomIn } from 'lucide-react'

// 3. 内部模块（@/ alias）
import { ColorMatcher } from '@/engine/color-match'
import { useProjectStore } from '@/store/projectStore'
import { Button } from '@/components/ui/button'

// 4. 类型导入
import type { PixelData, RGB } from '@/types/color'
import type { Palette } from '@/types/palette'

// 5. 样式文件
import './ColorPicker.css'

// 6. 工具函数（最后）
import { clamp, debounce } from '@/utils/math'
```

**组间用空行分隔，禁止乱序。**

---

## 命名规范

### 变量/函数

```typescript
// ✅ 小写驼峰
const maxZoom = 5
const selectedColor = '#FF0000'
function handleImageUpload() { ... }

// ✅ 常量全大写下划线分隔
const MAX_ZOOM_LEVEL = 10
const DEFAULT_PALETTE_SIZE = 32
const WORKER_TIMEOUT_MS = 30000

// ✅ 私有变量以下划线开头
class ColorProcessor {
  private _cache: Map<string, LAB>
}
```

### 组件

```typescript
// ✅ 文件名和组件名一致，PascalCase
// 文件：ColorPicker.tsx → 组件：ColorPicker
export function ColorPicker() { ... }

// ✅ 子组件用 PascalCase，但变量用 camelCase
function ColorSwatch({ color }: { color: string }) {
  const swatchRef = useRef<HTMLDivElement>(null)
  return <div ref={swatchRef} className="color-swatch" />
}
```

### Store

```typescript
// ✅ Store 文件名：camelCase，后缀 Store
// projectStore.ts → useProjectStore
// canvasStore.ts → useCanvasStore

// Store 内部 state
interface ProjectState {
  fileName: string
  imageWidth: number
  imageHeight: number
  paletteId: string
  beadSize: number
}

// Store actions（建议以 handle / set / toggle 开头）
handleFileNameChange(name: string): void
setPalette(palette: Palette): void
toggleGridVisible(): void
```

### Hooks

```typescript
// ✅ use 开头，camelCase，动词或形容词
useImageUpload()
useColorMatcher(palette: Palette)
useCropImage()
useDebounce<T>(value: T, delay: number)
useLocalStorage<T>(key: string, initialValue: T)

// ❌ 禁止
function colorMatcher() { ... }  // 缺少 use
function use_calculate_delta_e() { ... }  // 下划线命名
```

### 类型/接口

```typescript
// ✅ 类型名 PascalCase
type RGB = [number, number, number]
interface Palette { id: string; name: string; colors: RGB[] }
interface QuantizedResult { data: Uint8ClampedArray; palette: Palette }

// ✅ 带前缀区分同类类型
interface CanvasState { ... }
type CanvasAction = { type: 'resize' } | { type: 'reset' }

// ✅ Event handler 类型
type ChangeEvent = React.ChangeEvent<HTMLInputElement>
type ClickEvent = React.MouseEvent<HTMLButtonElement>
```

---

## 样式规范

### CSS 变量（Design Tokens）

**所有颜色、间距、字体必须使用 CSS 变量，禁止硬编码。**

```css
/* ✅ 正确：使用 tokens */
.button-primary {
  background-color: var(--color-primary);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

/* ❌ 错误：硬编码 */
.button-primary {
  background-color: #3B82F6;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
}
```

### Tailwind 优先级

**优先使用 Tailwind 类名，极端复杂场景用 CSS。**

```tsx
// ✅ 优先使用 Tailwind
<button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md">
  <Download className="w-4 h-4" />
  导出
</button>

// ✅ 动态值用 CSS 变量
<div className="p-[var(--spacing-4)]" style={{ '--spacing-4': '16px' } as React.CSSProperties}>

// ✅ 无法用 Tailwind 表达的样式用 CSS
.color-picker-wheel {
  background: conic-gradient(hsl(0, 100%, 50%), hsl(60, 100%, 50%), ...);
}
```

---

## 注释规范

```typescript
// ✅ 文件头注释（每个源文件）
/**
 * 颜色量化模块
 * 负责将图片颜色映射到调色板
 * @module engine/color-match
 */

// ✅ JSDoc 公共 API 必须注释
/**
 * 将 RGB 颜色转换为 LAB 色彩空间
 * @param rgb - RGB 颜色值 [0-255, 0-255, 0-255]
 * @returns LAB 颜色值 { L: 0-100, a: -128-127, b: -128-127 }
 */
function rgbToLab(rgb: RGB): LAB

// ✅ 复杂逻辑必须注释
// 使用加权平均因为人眼对绿色更敏感（CIE 1931 色匹配函数）
const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

// ❌ 禁止无意义注释
// 设置数据
setData(data)

// ❌ 禁止注释掉代码（用 git 历史）
// data = oldData  // 旧版本
```

---

## Git Commit 规范

**格式：`type(Task-XXX): description`**

| type | 使用场景 |
|------|----------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档更新 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 重构（无功能变化） |
| `test` | 测试相关 |
| `chore` | 构建/工具/依赖更新 |

```bash
# ✅ 正确
git commit -m "feat(Task-014): 实现三栏布局框架"
git commit -m "fix(Task-027): 修复 Worker 内存泄漏"
git commit -m "docs(Task-008): 更新 CODING_STYLE.md"

# ❌ 错误
git commit -m "update stuff"
git commit -m "fix bug"
git commit -m "Task-14 layout"
```

---

## 测试规范

**核心算法（engine/）必须有单元测试，覆盖率 ≥ 80%。**

```typescript
// ✅ 测试文件命名
colorMatch.test.ts    // 对应 colorMatch.ts
palette.test.ts        // 对应 palette.ts

// ✅ 测试分组描述
describe('rgbToLab', () => {
  it('should convert pure red correctly', () => {
    expect(rgbToLab([255, 0, 0])).toEqual({ L: 53.24, a: 80.09, b: 67.2 })
  })
})
```
