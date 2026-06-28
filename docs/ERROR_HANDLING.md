# 错误处理规范 (Error Handling)

## 统一返回类型

所有可能失败的操作使用 `Result<T>` 类型：

```typescript
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string }
```

**禁止到处 throw，优先返回 Result。**

---

## 使用示例

```typescript
// ✅ 正确：返回 Result
function parseImage(file: File): Result<ImageData> {
  if (!file.type.startsWith('image/')) {
    return { success: false, error: '不是图片文件', code: 'INVALID_FILE_TYPE' }
  }
  // ... 解析逻辑
  return { success: true, data: imageData }
}

// ❌ 错误：直接 throw
function parseImage(file: File): ImageData {
  if (!file.type.startsWith('image/')) {
    throw new Error('不是图片文件')  // 禁止！
  }
  // ...
}
```

---

## Result 工具函数

```typescript
// src/utils/result.ts
export function ok<T>(data: T): Result<T> {
  return { success: true, data }
}

export function err<T = never>(error: string, code?: string): Result<T> {
  return { success: false, error, code }
}

// 使用
function loadImage(src: string): Result<HTMLImageElement> {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve(ok(img))
    img.onerror = () => resolve(err('图片加载失败', 'LOAD_FAILED'))
  }) as Result<HTMLImageElement>
}
```

---

## Worker 错误处理

```typescript
// Worker 消息协议
interface WorkerMessage<T = unknown> {
  id: string
  type: string
  payload: T
}

interface WorkerResponse<T = unknown> {
  id: string
  success: boolean
  result?: T
  error?: string
  code?: string
}

// Worker 中禁止直接 throw
self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const { id, type, payload } = e.data
  
  try {
    const result = handleMessage(type, payload)
    self.postMessage({ id, success: true, result })
  } catch (err) {
    self.postMessage({
      id,
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      code: 'WORKER_ERROR'
    })
  }
}
```

---

## 错误码规范

| 模块 | 前缀 | 示例 |
|------|------|------|
| 图片处理 | `IMG_` | `IMG_LOAD_FAILED`, `IMG_INVALID_FORMAT` |
| 颜色量化 | `COLOR_` | `COLOR_QUANTIZE_FAILED` |
| 导出 | `EXPORT_` | `EXPORT_PDF_FAILED`, `EXPORT_PNG_FAILED` |
| Worker | `WORKER_` | `WORKER_TIMEOUT`, `WORKER_CRASH` |
| Store | `STORE_` | `STORE_INIT_FAILED` |

---

## UI 层错误展示

```typescript
// 错误 toast 提示
function handleExport() {
  const result = await exportToPDF(project)
  
  if (!result.success) {
    toast.error(result.error)  // 使用统一的 toast
    return
  }
  
  toast.success('导出成功')
}
```

**禁止使用 alert() 或 confirm() 显示错误。**

---

## 边界情况

| 场景 | 处理方式 |
|------|----------|
| 空图片 | 返回 `{ success: false, error: '图片为空', code: 'IMG_EMPTY' }` |
| 超大图片 | 先压缩到 2048px 内再处理 |
| 不支持的格式 | 返回 `{ success: false, error: '不支持的格式，请使用 PNG/JPG/WEBP', code: 'IMG_UNSUPPORTED' }` |
| Worker 超时 | 返回 `{ success: false, error: '处理超时，请重试', code: 'WORKER_TIMEOUT' }` |
| 调色板为空 | 返回 `{ success: false, error: '调色板不能为空', code: 'PALETTE_EMPTY' }` |
