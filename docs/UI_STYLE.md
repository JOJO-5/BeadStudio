# UI 设计规范 (UI Style Guide)

## 概述

BeadStudio 的 UI 必须保持一致的设计语言，禁止各页面自由发挥。所有 UI 元素遵循本文档规定。

---

## 按钮

### 按钮尺寸

| 尺寸 | 内边距 | 字号 | 圆角 | 使用场景 |
|------|--------|------|------|----------|
| `sm` | px-2 py-1 | 12px | 4px | 紧凑场景、表格内 |
| `md` | px-4 py-2 | 14px | 6px | 默认场景 |
| `lg` | px-6 py-3 | 16px | 8px | 主要操作 |

### 按钮变体

```tsx
// 主要按钮 - 蓝色
<button className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]">
  主要操作
</button>

// 次要按钮 - 灰色边框
<button className="border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-muted)]">
  次要操作
</button>

// 幽灵按钮 - 无背景
<button className="text-[var(--color-text-primary)] hover:bg-[var(--color-background-muted)]">
  查看
</button>

// 危险按钮 - 红色
<button className="bg-[var(--color-error)] text-white hover:opacity-90">
  删除
</button>

// 图标按钮
<button className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-background-muted)]">
  <Icon className="w-4 h-4" />
</button>
```

### 按钮状态

- **Default**：正常状态
- **Hover**：背景色加深，cursor: pointer
- **Active**：背景色更深，轻微 scale(0.98)
- **Disabled**：opacity: 0.5，cursor: not-allowed，pointer-events: none
- **Loading**：显示 spinner，禁止重复点击

---

## 输入框

### 文本输入框

```tsx
// 标准输入框
<input
  type="text"
  className="
    px-3 py-2
    bg-[var(--color-background)]
    border border-[var(--color-border)]
    rounded-[var(--radius-md)]
    text-[var(--font-size-sm)]
    text-[var(--color-text-primary)]
    placeholder:text-[var(--color-text-muted)]
    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
  "
/>
```

### 数字输入框

```tsx
// 数字输入（用于尺寸、数量等）
<input
  type="number"
  min={1}
  max={1000}
  step={1}
  className="
    w-20 px-3 py-2
    text-right
    ...
  "
/>
```

### 滑块

```tsx
// 范围滑块（用于缩放、阈值调整）
<input
  type="range"
  min={1}
  max={100}
  step={1}
  className="
    w-full h-2
    bg-[var(--color-background-muted)]
    rounded-full
    appearance-none
    cursor-pointer
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-[var(--color-primary)]
  "
/>
```

---

## 面板 / 卡片

```tsx
// 面板
<div className="
  p-4
  bg-[var(--color-background)]
  border border-[var(--color-border)]
  rounded-[var(--radius-lg)]
  shadow-[var(--shadow-sm)]
">
  <h3 className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)] mb-3">
    面板标题
  </h3>
  <!-- 内容 -->
</div>
```

---

## 标签页

```tsx
// Tab 列表
<div className="flex border-b border-[var(--color-border)]">
  <button
    className={`
      px-4 py-2 text-[var(--font-size-sm)]
      border-b-2 -mb-px
      ${active ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-text-muted)]'}
    `}
  >
    标签1
  </button>
</div>
```

---

## 工具提示

```tsx
// Tooltip - 悬停显示
<div className="relative group">
  <button>触发元素</button>
  <div className="
    absolute z-[var(--z-tooltip)]
    px-2 py-1
    text-[var(--font-size-xs)]
    bg-[var(--color-text-primary)] text-white
    rounded-[var(--radius-sm)]
    opacity-0 group-hover:opacity-100
    transition-opacity pointer-events-none
  ">
    提示文字
  </div>
</div>
```

---

## 模态框

```tsx
// Dialog Overlay
<div className="
  fixed inset-0 z-[var(--z-modal)]
  bg-black/50
  flex items-center justify-center
  p-4
">
  {/* Dialog Panel */}
  <div className="
    w-full max-w-md
    bg-[var(--color-background)]
    rounded-[var(--radius-xl)]
    shadow-[var(--shadow-xl)]
    p-6
  ">
    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
      标题
    </h2>
    <!-- 内容 -->
    <div className="flex justify-end gap-3 mt-6">
      <button>取消</button>
      <button className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md">
        确认
      </button>
    </div>
  </div>
</div>
```

---

## 侧边栏

### 布局规范

- 固定宽度：`w-64`（256px）
- 背景：`bg-[var(--color-background-subtle)]`
- 边框：`border-r border-[var(--color-border)]`
- 内边距：`p-4`

### 区块分隔

```tsx
<div className="space-y-6">
  {/* 图片上传区 */}
  <section>
    <h3 className="text-[var(--font-size-xs)] font-medium text-[var(--color-text-muted)] uppercase mb-2">
      上传
    </h3>
    <!-- 组件 -->
  </section>

  {/* 调色板区 */}
  <section>
    <h3 className="text-[var(--font-size-xs)] font-medium text-[var(--color-text-muted)] uppercase mb-2">
      调色板
    </h3>
    <!-- 组件 -->
  </section>
</div>
```

---

## 统计面板

### 统计卡片

```tsx
// 单个统计项
<div className="flex items-center justify-between py-2">
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF0000' }} />
    <span className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
      红色
    </span>
  </div>
  <div className="text-[var(--font-size-sm)] font-medium text-[var(--color-text-primary)]">
    128
  </div>
</div>
```

---

## 画布区域

### 画布容器

```tsx
// Canvas 容器
<div className="
  flex-1
  bg-[var(--color-canvas-bg)]
  overflow-hidden
  relative
">
  {/* 网格背景 */}
  <div className="absolute inset-0" style={{ backgroundImage: '... grid pattern ...' }} />

  {/* Canvas */}
  <canvas
    ref={canvasRef}
    className="absolute inset-0"
  />

  {/* 缩放控制 */}
  <div className="
    absolute bottom-4 right-4
    flex items-center gap-2
    bg-[var(--color-background)]
    rounded-[var(--radius-lg)]
    shadow-[var(--shadow-lg)]
    p-2
  ">
    <button onClick={zoomOut}>-</button>
    <span className="text-[var(--font-size-sm)] w-12 text-center">
      {Math.round(zoom * 100)}%
    </span>
    <button onClick={zoomIn}>+</button>
  </div>
</div>
```

---

## 工具栏

### 顶部工具栏

```tsx
<div className="
  h-12
  flex items-center
  px-4
  border-b border-[var(--color-border)]
  bg-[var(--color-background)]
  gap-4
">
  {/* 左侧：Logo + 标题 */}
  <div className="flex items-center gap-2">
    <span className="font-semibold text-[var(--color-text-primary)]">BeadStudio</span>
  </div>

  {/* 中间：工具按钮组 */}
  <div className="flex items-center gap-1">
    <ToolButton icon={<Undo />} tooltip="撤销" />
    <ToolButton icon={<Redo />} tooltip="重做" />
    <Divider />
    <ToolButton icon={<ZoomIn />} tooltip="放大" />
    <ToolButton icon={<ZoomOut />} tooltip="缩小" />
  </div>

  {/* 右侧：导出按钮 */}
  <div className="ml-auto">
    <ExportButton />
  </div>
</div>
```

### 工具按钮

```tsx
function ToolButton({ icon, active, tooltip }: { icon: ReactNode; active?: boolean; tooltip: string }) {
  return (
    <button
      className={`
        p-2 rounded-[var(--radius-md)]
        transition-colors
        ${active ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-[var(--color-background-muted)] text-[var(--color-text-secondary)]'}
      `}
      title={tooltip}
    >
      {icon}
    </button>
  )
}
```

---

## 动画规范

### 过渡时长

| 场景 | 时长 | 缓动 |
|------|------|------|
| 按钮悬停 | 100ms | ease-out |
| 面板展开 | 200ms | ease-out |
| 模态框出现 | 200ms | ease-out |
| Toast 滑入 | 300ms | ease-spring |

### 示例

```tsx
// 面板展开
<div className={`
  transition-all duration-200 ease-out
  ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
`}>
  内容
</div>

// 按钮悬停
<button className="transition-all duration-100 ease-out hover:scale-105 active:scale-95">
  按钮
</button>
```

---

## 图标使用规范

- 图标库：**Lucide React**
- 图标尺寸：`w-4 h-4`（小）/ `w-5 h-5`（中）/ `w-6 h-6`（大）
- 图标颜色：继承父元素文字颜色
- 禁止混用多个图标库
