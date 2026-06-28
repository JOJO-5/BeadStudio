# Design System — 设计令牌

## 概述

BeadStudio 使用 CSS 变量定义所有设计原子，组件必须引用令牌，禁止硬编码。

---

## 颜色令牌

### 语义颜色

```css
:root {
  /* 主色 */
  --color-primary: #3B82F6;        /* 蓝色 - 主要操作 */
  --color-primary-hover: #2563EB;  /* 主色悬停 */
  --color-primary-foreground: #FFFFFF;

  /* 成功 */
  --color-success: #10B981;        /* 绿色 - 成功状态 */
  --color-success-foreground: #FFFFFF;

  /* 警告 */
  --color-warning: #F59E0B;        /* 黄色 - 警告 */
  --color-warning-foreground: #000000;

  /* 错误 */
  --color-error: #EF4444;           /* 红色 - 错误/危险 */
  --color-error-foreground: #FFFFFF;

  /* 次要 */
  --color-secondary: #64748B;      /* 灰蓝 - 次要元素 */
  --color-secondary-foreground: #FFFFFF;

  /* 背景 */
  --color-background: #FFFFFF;
  --color-background-subtle: #F8FAFC;
  --color-background-muted: #F1F5F9;

  /* 边框 */
  --color-border: #E2E8F0;
  --color-border-strong: #CBD5E1;

  /* 文字 */
  --color-text-primary: #0F172A;
  --color-text-secondary: #475569;
  --color-text-muted: #94A3B8;
  --color-text-disabled: #CBD5E1;

  /* Canvas 特定 */
  --color-canvas-bg: #F1F5F9;
  --color-grid-line: #E2E8F0;
  --color-grid-line-major: #CBD5E1;
  --color-bead-shadow: rgba(0, 0, 0, 0.15);
}
```

### 暗色模式

```css
.dark {
  --color-background: #0F172A;
  --color-background-subtle: #1E293B;
  --color-background-muted: #334155;

  --color-border: #334155;
  --color-border-strong: #475569;

  --color-text-primary: #F8FAFC;
  --color-text-secondary: #CBD5E1;
  --color-text-muted: #64748B;

  --color-canvas-bg: #1E293B;
  --color-grid-line: #334155;
  --color-grid-line-major: #475569;
}
```

---

## 字体令牌

```css
:root {
  /* 字体族 */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* 字号 */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */

  /* 行高 */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* 字重 */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

---

## 间距令牌

```css
:root {
  --spacing-0: 0;
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.25rem;   /* 20px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */

  /* Canvas 特定 */
  --bead-size-xs: 4px;     /* 迷你 bead */
  --bead-size-sm: 6px;     /* 小 bead */
  --bead-size-md: 8px;     /* 默认 bead */
  --bead-size-lg: 10px;    /* 大 bead */
  --bead-size-xl: 12px;    /* 特大 bead */
}
```

---

## 圆角令牌

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-full: 9999px;   /* 圆形 */

  /* 特定组件 */
  --radius-button: var(--radius-md);
  --radius-input: var(--radius-md);
  --radius-card: var(--radius-lg);
  --radius-panel: var(--radius-xl);
}
```

---

## 阴影令牌

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);

  /* Bead 特定 */
  --shadow-bead: 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.3);
  --shadow-bead-hover: 0 2px 6px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.4);
}
```

---

## 动画令牌

```css
:root {
  /* 时长 */
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;

  /* 缓动 */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* 使用示例 */
  --transition-button: all var(--duration-fast) var(--ease-out);
  --transition-panel: transform var(--duration-normal) var(--ease-out);
}
```

---

## 边框令牌

```css
:root {
  --border-width: 1px;
  --border-width-2: 2px;
  --border-width-4: 4px;

  --border-default: var(--border-width) solid var(--color-border);
  --border-strong: var(--border-width) solid var(--color-border-strong);
}
```

---

## Z-Index 层级

```css
:root {
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-popover: 500;
  --z-tooltip: 600;
  --z-toast: 700;
}
```

---

## 组件应用示例

```tsx
// ✅ 正确：使用 CSS 变量
function PrimaryButton({ children }) {
  return (
    <button
      className="px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm hover:bg-[var(--color-primary-hover)] transition-colors"
    >
      {children}
    </button>
  )
}

// ❌ 错误：硬编码值
<button style={{ backgroundColor: '#3B82F6', borderRadius: '6px' }}>
```

---

## 暗色模式支持

所有颜色使用 CSS 变量，添加 `.dark` 类自动切换暗色模式：

```tsx
<div className="bg-[var(--color-background)] text-[var(--color-text-primary)]">
  {/* 内容 */}
</div>
```

无需为每个组件单独处理暗色模式，只要引用变量即可。
