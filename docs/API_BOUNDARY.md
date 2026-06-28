# API 边界规范 (API Boundary)

## 层级定义

```
┌─────────────────────────────────────┐
│              UI Layer                │
│   components/  features/  app/      │
└──────────────┬──────────────────────┘
               │ imports
               ▼
┌─────────────────────────────────────┐
│           Store Layer                │
│          store/*Store.ts            │
└──────────────┬──────────────────────┘
               │ imports
     ┌─────────┴─────────┐
     ▼                   ▼
┌──────────┐      ┌──────────┐
│  Worker  │      │  Engine  │
│  Thread  │      │ (纯函数) │
└────┬─────┘      └────┬─────┘
     │                 │
     │ postMessage     │
     └────────┬────────┘
              ▼
      ┌──────────────┐
      │    Result     │
      └──────────────┘
```

---

## 允许的依赖方向

```
✅ UI → Store → Worker → Engine → Result

✅ UI → Store → Engine → Result

✅ Store → Engine → Result

✅ Worker → Engine → Result
```

---

## 禁止的依赖方向

```
❌ UI → Engine（绕过 Store）

❌ UI → Worker（绕过 Store）

❌ Store → UI（Store 不导入组件）

❌ Engine → Store（纯函数不依赖状态）

❌ Engine → Worker（Engine 是同步的）

❌ components → features（按需，禁止循环）
```

---

## 详细规范

### Engine 层

**规则：纯函数，无副作用，无外部依赖**

```typescript
// ✅ 正确：输入 → 输出
function rgbToLab(rgb: RGB): LAB
function calculateDeltaE00(lab1: LAB, lab2: LAB): number
function quantize(imageData: PixelData, palette: Palette, options: QuantizeOptions): QuantizedResult
function calculateStatistics(imageData: PixelData, palette: Palette): Statistics

// ❌ 禁止：依赖外部状态
let cachedPalette: Palette | null = null
function quantize(imageData: PixelData): QuantizedResult {
  const palette = cachedPalette!  // ❌
}

// ❌ 禁止：DOM 操作
function renderToCanvas(canvas: HTMLCanvasElement, data: PixelData) {
  const ctx = canvas.getContext('2d')!  // ❌
}
```

### Store 层

**规则：只管状态，逻辑在 Engine**

```typescript
// ✅ 正确：Store 调用 Engine
class ProjectStore {
  quantizeImage(imageData: PixelData) {
    const result = quantize(imageData, this.currentPalette, this.options)
    this.setState({ quantizedResult: result })
  }
}

// ❌ 禁止：Store 包含业务逻辑
class ProjectStore {
  quantizeImage(imageData: PixelData) {
    // 在 Store 里写算法 ❌
    for (let i = 0; i < imageData.data.length; i += 4) {
      // 量化逻辑...
    }
  }
}
```

### Worker 层

**规则：消息代理，调用 Engine**

```typescript
// ✅ 正确：Worker 作为桥梁
self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const { id, type, payload } = e.data
  
  let result: WorkerResponse['result']
  
  switch (type) {
    case 'resize':
      result = resizeImage(payload.imageData, payload.width, payload.height)
      break
    case 'quantize':
      result = quantize(payload.imageData, payload.palette, payload.options)
      break
  }
  
  self.postMessage({ id, success: true, result })
}

// ❌ 禁止：Worker 包含复杂逻辑
self.onmessage = (e) => {
  // 在 Worker 里写算法 ❌
  // 应该调用 Engine 函数
}
```

### UI 层

**规则：只用 Store，不直接调用 Engine/Worker**

```typescript
// ✅ 正确：通过 Store 操作
function UploadButton() {
  const { setOriginalImage } = useProjectStore()
  
  const handleUpload = async (file: File) => {
    const imageData = await loadImageFile(file)  // 工具函数，可直接调用
    setOriginalImage(imageData)
  }
}

// ❌ 禁止：直接调用 Worker
function UploadButton() {
  const worker = new Worker(...)  // ❌
  worker.postMessage(...)
}
```

---

## 跨层调用规则

| 调用方 | 被调用方 | 是否允许 | 说明 |
|--------|----------|----------|------|
| UI | Store | ✅ | Props/Callback |
| UI | Engine | ❌ | 必须通过 Store |
| UI | Worker | ❌ | 必须通过 Store |
| Store | Engine | ✅ | 核心逻辑 |
| Store | Worker | ✅ | 异步任务 |
| Store | UI | ❌ | Store 不导入组件 |
| Worker | Engine | ✅ | 纯计算 |
| Worker | Store | ❌ | Worker 不导入 Store |
| Engine | anything | ❌ | 纯函数 |

---

## 文件位置规范

```
src/
├── engine/                    # ✅ 可以从任何地方导入
│   └── quantize/
│
├── store/                     # ✅ 可以导入 engine
│   └── projectStore.ts
│
├── worker/                    # ✅ 可以导入 engine
│   └── index.ts
│
├── components/                # ❌ 不能导入 engine
│   └── canvas/
│
└── hooks/                     # ✅ 可以导入 store
    └── useProjectStore.ts
```

---

## 违反规范的例子

```typescript
// ❌ components/canvas/CanvasRenderer.ts

// 违反：UI 层直接调用 Engine
import { quantize } from '@/engine/quantize'

function CanvasRenderer() {
  const handleProcess = () => {
    const result = quantize(imageData, palette, options)  // ❌
  }
}

// ✅ 正确做法：通过 Store
import { useProjectStore } from '@/store/projectStore'

function CanvasRenderer() {
  const { quantizeImage } = useProjectStore()
  
  const handleProcess = () => {
    quantizeImage(imageData)  // ✅ Store 处理
  }
}
```
