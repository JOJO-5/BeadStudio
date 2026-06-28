# 数据模型 (Data Model)

## 核心实体

```
Project（项目）
├── id: string
├── name: string
├── createdAt: number
├── updatedAt: number
├── settings: ProjectSettings
└── state: ProjectState

Image（图片）
├── original: ImageData
├── resized: ImageData
├── cropped?: ImageData
└── quantized?: ImageData

Palette（调色板）
├── brand: Brand
├── colors: PaletteColor[]
└── size: number

Board（拼板）
├── id: string
├── index: number  // 板子序号
├── x: number      // 起始 X
├── y: number      // 起始 Y
├── width: number  // 宽度（bead 数量）
├── height: number // 高度（bead 数量）
└── data: Uint8ClampedArray  // 每个 bead 的颜色索引

Statistics（统计）
├── totalBeads: number
├── colorCounts: Map<colorCode, number>
└── colorPercentages: Map<colorCode, number>

ExportOptions（导出选项）
├── format: 'png' | 'pdf'
├── quality: number  // 1-100
├── includeGrid: boolean
├── includeNumbers: boolean
└── paperSize?: 'A4' | 'Letter'
```

---

## TypeScript 接口

### Project

```typescript
// src/types/project.ts

interface ProjectSettings {
  beadSize: number          // 每个 bead 的像素大小（默认 8）
  paletteId: string         // 当前调色板 ID
  ditherAlgorithm: DitherAlgorithm
  deltaEThreshold: number   // ΔE 阈值（默认 5.0）
}

interface ProjectState {
  originalImage: PixelData | null
  resizedImage: PixelData | null
  croppedImage: PixelData | null
  quantizedImage: PixelData | null
  quantizedPalette: Palette | null
  mapping: ColorMapping[]
  boards: Board[]
  statistics: Statistics | null
}

interface Project {
  id: string
  name: string
  createdAt: number
  updatedAt: number
  settings: ProjectSettings
  state: ProjectState
}
```

### PixelData

```typescript
// src/types/pixel.ts

interface PixelData {
  width: number
  height: number
  data: Uint8ClampedArray  // RGBA 格式
}

type DitherAlgorithm = 'none' | 'floyd-steinberg' | 'atkinson' | 'sierra'
```

### ColorMapping

```typescript
// src/types/color.ts

interface ColorMapping {
  sourceColor: RGB
  targetColor: RGB
  deltaE: number
  sourceHex: string
  targetCode: string  // 调色板颜色编号
}
```

### Statistics

```typescript
// src/types/statistics.ts

interface Statistics {
  totalPixels: number
  boardCount: number          // 板子数量
  colorCount: number          // 使用颜色数
  colorDetails: ColorStat[]
}

interface ColorStat {
  code: string               // 颜色编号
  name: string
  nameZh: string
  hex: string
  rgb: RGB
  count: number              // 使用数量
  percentage: number          // 百分比
}
```

### ExportOptions

```typescript
// src/types/export.ts

interface PNGExportOptions {
  format: 'png'
  quality: number            // 1-100
  scale: number              // 导出缩放
  includeGrid: boolean
  boards: 'all' | 'single'   // 导出全部板还是单板
  boardIndex?: number         // 单板导出时指定
}

interface PDFExportOptions {
  format: 'pdf'
  paperSize: 'A4' | 'Letter'
  orientation: 'portrait' | 'landscape'
  includeGrid: boolean
  includeNumbers: boolean
  includeLegend: boolean      // 图例
  includeMaterialList: boolean
  boardsPerPage: number
}

type ExportOptions = PNGExportOptions | PDFExportOptions
```

---

## Store State

### ProjectStore

```typescript
interface ProjectStore {
  // Current project
  project: Project | null
  
  // Loading state
  isLoading: boolean
  error: string | null
  
  // Actions
  createProject(name: string): Project
  loadProject(id: string): Promise<Result<Project>>
  saveProject(): Promise<Result<void>>
  
  setOriginalImage(image: PixelData): void
  setResizedImage(image: PixelData): void
  setCroppedImage(image: PixelData): void
  setQuantizedResult(result: QuantizedResult): void
  
  setPalette(paletteId: string): void
  setBeadSize(size: number): void
  setDitherAlgorithm(algo: DitherAlgorithm): void
  setDeltaEThreshold(threshold: number): void
  
  generateBoards(): void
  calculateStatistics(): Statistics
}
```

### CanvasStore

```typescript
interface CanvasStore {
  // Viewport
  zoom: number
  panX: number
  panY: number
  
  // Interaction
  selectedBoardIndex: number | null
  hoveredBead: { boardIndex: number; x: number; y: number } | null
  
  // Display
  showGrid: boolean
  showNumbers: boolean
  showOriginal: boolean
  
  // Actions
  setZoom(zoom: number): void
  setPan(x: number, y: number): void
  zoomIn(): void
  zoomOut(): void
  resetView(): void
  selectBoard(index: number | null): void
  toggleGrid(): void
  toggleNumbers(): void
  toggleOriginal(): void
}
```

### HistoryStore

```typescript
interface HistoryStore {
  past: ProjectState[]
  future: ProjectState[]
  
  push(state: ProjectState): void
  undo(): void
  redo(): void
  canUndo(): boolean
  canRedo(): boolean
  clear(): void
}
```

---

## Worker Message Types

```typescript
// src/worker/message.ts

type WorkerTaskType = 
  | 'resize'
  | 'quantize'
  | 'dither'
  | 'generateBoards'
  | 'exportPNG'
  | 'exportPDF'

interface WorkerRequest<T = unknown> {
  id: string
  type: WorkerTaskType
  payload: T
}

interface WorkerResponse<T = unknown> {
  id: string
  success: boolean
  result?: T
  error?: string
  code?: string
}

// Payload types
interface ResizePayload {
  imageData: PixelData
  width: number
  height: number
}

interface QuantizePayload {
  imageData: PixelData
  palette: Palette
  ditherAlgorithm: DitherAlgorithm
  deltaEThreshold: number
}

interface GenerateBoardsPayload {
  imageData: PixelData
  boardWidth: number
  boardHeight: number
}
```
