# 系统架构 (Architecture)

## 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                    UI Layer (React)                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │ Sidebar │  │ Toolbar │  │ Canvas  │  │  Panel  │  │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  │
└───────┼────────────┼────────────┼────────────┼────────┘
        │            │            │            │
        └────────────┴─────┬──────┴────────────┘
                           │
                    ┌──────▼──────┐
                    │ Store Layer │
                    │  (Zustand)  │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
 ┌──────▼──────┐   ┌──────▼──────┐   ┌──────▼──────┐
 │   Worker    │   │   Engine    │   │   Export    │
 │   Thread    │   │  (Algorithms)│   │  Pipeline   │
 └─────────────┘   └─────────────┘   └─────────────┘
```

---

## 页面结构

### 路由

```
/                 → Redirect to /editor
/editor           → 主编辑器页面
/settings         → 设置页面
```

### 编辑器布局

```
┌────────────────────────────────────────────────────────┐
│                     Toolbar                             │
├──────────┬─────────────────────────────┬───────────────┤
│          │                             │               │
│ Sidebar  │         Canvas              │    Panel      │
│  (256px) │       (flex-1)             │   (280px)     │
│          │                             │               │
│ - 上传   │   ┌─────────────────┐       │ - 颜色统计    │
│ - 调色板 │   │                 │       │ - 材料清单    │
│ - 参数   │   │   画布区域      │       │ - 网格尺寸    │
│          │   │                 │       │               │
│          │   └─────────────────┘       │               │
└──────────┴─────────────────────────────┴───────────────┘
```

---

## 组件层

### 组件目录结构

```
src/components/
├── layout/           # 布局组件
│   ├── AppShell.tsx        # 应用外壳（三栏布局）
│   ├── Header.tsx          # 顶部栏
│   └── Footer.tsx          # 底部栏
├── common/           # 通用组件
│   ├── Button/
│   ├── Input/
│   ├── Slider/
│   ├── Dialog/
│   └── Tooltip/
├── toolbar/          # 工具栏
│   ├── Toolbar.tsx
│   ├── ToolButton.tsx
│   └── ZoomControls.tsx
├── sidebar/          # 侧边栏
│   ├── Sidebar.tsx
│   ├── UploadSection.tsx
│   └── PaletteSection.tsx
├── canvas/           # 画布
│   ├── CanvasView.tsx      # 主画布组件
│   ├── CanvasRenderer.ts   # Canvas2D 渲染逻辑
│   └── GridOverlay.tsx     # 网格覆盖层
└── panel/            # 统计面板
    ├── Panel.tsx
    ├── StatisticsSection.tsx
    └── MaterialList.tsx
```

### 组件通信

- **父 → 子**：Props 传递
- **子 → 父**：Callback 函数
- **跨组件**：Zustand Store

---

## 状态层 (Zustand)

### 四个核心 Store

#### ProjectStore

```typescript
interface ProjectStore {
  // State
  fileName: string
  originalImage: ImageData | null
  processedImage: ImageData | null
  paletteId: string
  beadSize: number          // px
  targetWidth: number       // bead 数量
  targetHeight: number

  // Actions
  setImage(image: ImageData): void
  setPalette(paletteId: string): void
  setBeadSize(size: number): void
  setTargetSize(width: number, height: number): void
  reset(): void
}
```

#### CanvasStore

```typescript
interface CanvasStore {
  // State
  zoom: number               // 0.1 - 10
  panX: number
  panY: number
  selectedColor: string | null
  hoveredBead: { x: number; y: number } | null
  showGrid: boolean
  showOriginal: boolean

  // Actions
  setZoom(zoom: number): void
  setPan(x: number, y: number): void
  selectColor(color: string): void
  toggleGrid(): void
  toggleOriginal(): void
}
```

#### SettingsStore

```typescript
interface SettingsStore {
  // State
  theme: 'light' | 'dark' | 'system'
  language: 'zh-CN' | 'en-US'
  ditherAlgorithm: 'floyd-steinberg' | 'atkinson' | 'sierra' | 'none'
  autoSave: boolean
  gridColor: string

  // Actions
  setTheme(theme: 'light' | 'dark' | 'system'): void
  setLanguage(lang: 'zh-CN' | 'en-US'): void
  setDitherAlgorithm(algo: string): void
  toggleAutoSave(): void
}
```

#### HistoryStore

```typescript
interface HistoryStore {
  // State
  past: CanvasState[]
  future: CanvasState[]

  // Actions
  push(state: CanvasState): void
  undo(): void
  redo(): void
  canUndo(): boolean
  canRedo(): boolean
}
```

---

## Engine 层（核心算法）

### 目录结构

```
src/engine/
├── palette/
│   ├── palette.ts            # 调色板管理
│   ├── palette.types.ts      # 调色板类型定义
│   └── presets.ts            # 预设调色板
├── convert/
│   ├── rgb.ts                # RGB 基础转换
│   ├── lab.ts                # RGB ↔ LAB 转换
│   ├── hex.ts                # HEX 转换
│   └── deltaE.ts             # ΔE 色差计算
├── quantize/
│   ├── quantizer.ts          # 量化器接口
│   ├── imageQAdapter.ts     # image-q 适配器
│   └── dither.ts            # 抖动算法
├── statistics/
│   ├── counter.ts            # 颜色计数
│   └── reporter.ts           # 统计报告生成
├── grid/
│   ├── renderer.ts           # 网格渲染器
│   └── layout.ts             # 拼板布局
└── export/
    ├── png.ts                # PNG 导出
    └── pdf.ts                # PDF 导出
```

### 算法纯度要求

Engine 层所有函数必须是**纯函数**：

```typescript
// ✅ 纯函数 - 可测试、可缓存
function rgbToLab(rgb: RGB): LAB {
  // 无副作用，不依赖外部状态
}

function quantize(imageData: ImageData, palette: Palette): QuantizedResult {
  // 输入确定，输出确定，无副作用
}

// ❌ 禁止：依赖外部状态
let cachedPalette: Palette | null = null
function quantize(imageData: ImageData): QuantizedResult {
  const palette = cachedPalette!  // 禁止！
  ...
}

// ❌ 禁止：直接操作 DOM
function renderToCanvas(canvas: HTMLCanvasElement, imageData: ImageData) {
  const ctx = canvas.getContext('2d')!  // 禁止在 engine 中调用！
}
```

---

## Worker 层

### Worker 通信协议

```
Main Thread                        Worker Thread
    │                                    │
    ├── postMessage({ id, type, data }) │
    │──────────────────────────────────►│
    │                                    │ (处理中...)
    │◄──────────────────────────────────┤
    │  postMessage({ id, success, data })│
    │                                    │
```

### Worker 任务类型

| Task | 描述 | 输入 | 输出 |
|------|------|------|------|
| `resize` | 图片缩放 | ImageData, targetSize | ImageData |
| `quantize` | 颜色量化 | ImageData, Palette | QuantizedResult |
| `statistics` | 颜色统计 | ImageData, Palette | StatisticsResult |
| `grid-render` | 网格渲染数据 | ProjectConfig | GridRenderData |

### Worker 文件

```
src/worker/
├── index.ts           # Worker 入口，注册处理器
├── image.worker.ts     # 图片处理 Worker
├── message.ts         # 消息类型定义
└── pools.ts           # Worker 池管理
```

---

## 数据流

### 完整数据流

```
用户上传图片
    │
    ▼
Sidebar.uploadImage() ──► ProjectStore.setImage()
    │
    ▼
用户调整参数（缩放比例、调色板、bead 尺寸）
    │
    ▼
ProjectStore ──► Worker.postMessage('quantize')
    │
    ▼
Worker 执行颜色量化 ──► postMessage(QuantizedResult)
    │
    ▼
ProjectStore.setProcessedImage()
    │
    ▼
CanvasStore 触发重渲染
    │
    ▼
CanvasRenderer 绘制到 <canvas>
```

### 用户导出流程

```
用户点击导出 ──► 选择格式(PNG/PDF)
    │
    ▼
读取 ProjectStore 状态
    │
    ├── PNG: 读取 Canvas toDataURL() ──► file-saver 下载
    │
    └── PDF: Worker 生成拼板数据 ──► pdf-lib 生成 ──► file-saver 下载
```

---

## 导出模块

### 导出器接口

```typescript
interface Exporter {
  export(project: ProjectData): Promise<Blob>
  format: 'png' | 'pdf'
}

class PNGExporter implements Exporter {
  async export(project: ProjectData): Promise<Blob> {
    // 使用 Canvas.toBlob()
  }
  format = 'png'
}

class PDFExporter implements Exporter {
  async export(project: ProjectData): Promise<Blob> {
    // 使用 pdf-lib
  }
  format = 'pdf'
}
```

---

## 类型定义

### 核心类型

```typescript
// 颜色类型
type RGB = [number, number, number]
type LAB = { L: number; a: number; b: number }
type HEX = string  // '#RRGGBB'

// 图片数据
interface PixelData {
  width: number
  height: number
  data: Uint8ClampedArray
}

// 调色板
interface Palette {
  id: string
  name: string
  colors: PaletteColor[]
}

interface PaletteColor {
  rgb: RGB
  hex: HEX
  name?: string
  code?: string  // 商家颜色编号
}

// 量化结果
interface QuantizedResult {
  imageData: PixelData
  mapping: ColorMapping[]      // 原始色 → 调色板色
  palette: Palette
  statistics: StatisticsResult
}

// 统计数据
interface StatisticsResult {
  totalPixels: number
  colorCounts: Record<string, number>
  colorPercentages: Record<string, number>
}
```

---

## 依赖方向

```
┌─────────────────────────────────────┐
│           UI Components             │
│   (components/, features/, app/)    │
└─────────────────┬───────────────────┘
                  │ imports
                  ▼
┌─────────────────────────────────────┐
│            Store (Zustand)           │
│      (store/projectStore.ts)        │
└──────────┬──────────────────────────┘
           │ imports
     ┌─────┴─────┐
     ▼           ▼
┌─────────┐  ┌─────────┐
│ Engine  │  │ Worker  │
│(纯函数) │  │(消息)   │
└─────────┘  └─────────┘

禁止反向：
❌ components/ → imports → store/ → Engine 之外的任何东西
✅ components/ → imports → store/ → imports → Engine
```

---

## 模块边界

| 模块 | 可被导入 | 禁止导入 |
|------|----------|----------|
| `engine/*` | `types/*`, `utils/*` | `components/*`, `store/*`, `hooks/*` |
| `store/*` | `engine/*`, `types/*` | `components/*` |
| `worker/*` | `engine/*`, `types/*` | `components/*`, `store/*` |
| `components/*` | `store/*`, `hooks/*` | — |
| `hooks/*` | `store/*`, `types/*` | `components/*` |
