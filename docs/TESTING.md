# 测试规范 (Testing Guide)

## 测试金字塔

```
        ┌───────────┐
        │   E2E     │  ← 关键路径（Playwright）
        │   Tests   │
        ├───────────┤
        │  Unit     │  ← Engine 算法（Vitest）
        │  Tests    │
        └───────────┘
```

**原则：Engine 算法 100% 单元测试，UI 只测关键交互。**

---

## 必须测试的模块

### Engine（100% 覆盖率）

```
engine/convert/
├── rgb.ts         ✅ RGB 相关计算
├── lab.ts         ✅ RGB ↔ LAB 转换
└── deltaE.ts      ✅ ΔE 计算（ΔE00 必须精确）

engine/statistics/
├── counter.ts     ✅ 颜色计数
└── reporter.ts    ✅ 统计报告

engine/palette/
└── palette.ts      ✅ 调色板匹配

engine/resize/
└── pica.ts        ✅ 图片缩放
```

### UI 交互（集成测试）

```
features/image-upload/
└── ImageUploader  ✅ 上传成功/失败

features/export/
└── Exporter      ✅ PNG/PDF 导出

components/toolbar/
└── Toolbar        ✅ 撤销/重做按钮状态
```

---

## 不需要测试的

- 简单 UI 组件（Button, Input 等）
- CSS 样式
- 事件处理（点击、悬停）
- 第三方库封装（image-q, Pica, react-easy-crop）

---

## 单元测试规范

```typescript
// src/engine/convert/deltaE.test.ts

import { describe, it, expect } from 'vitest'
import { calculateDeltaE00 } from './deltaE'

describe('calculateDeltaE00', () => {
  it('should return 0 for identical colors', () => {
    const lab1 = { L: 50, a: 0, b: 0 }
    const lab2 = { L: 50, a: 0, b: 0 }
    expect(calculateDeltaE00(lab1, lab2)).toBe(0)
  })

  it('should return correct value for known color pairs', () => {
    // 参考值来自 ICC 国际标准
    const lab1 = { L: 50, a: 0, b: 0 }
    const lab2 = { L: 53.24, a: 80.09, b: 67.20 }
    const delta = calculateDeltaE00(lab1, lab2)
    expect(delta).toBeCloseTo(25.95, 1)  // 允许 ±0.1 误差
  })

  it('should handle boundary values', () => {
    const lab1 = { L: 0, a: -128, b: -128 }
    const lab2 = { L: 100, a: 127, b: 127 }
    const delta = calculateDeltaE00(lab1, lab2)
    expect(delta).toBeGreaterThan(100)  // 非常大是正常的
  })
})
```

---

## 集成测试规范

```typescript
// src/features/export/exporter.test.ts

import { describe, it, expect } from 'vitest'
import { exportToPNG } from './exporter'

describe('exportToPNG', () => {
  it('should export valid PNG blob', async () => {
    const project = createMockProject()
    const result = await exportToPNG(project)
    
    expect(result.success).toBe(true)
    expect(result.data!.type).toBe('image/png')
    expect(result.data!.size).toBeGreaterThan(0)
  })

  it('should fail for empty project', async () => {
    const project = createEmptyProject()
    const result = await exportToPNG(project)
    
    expect(result.success).toBe(false)
    expect(result.error).toContain('empty')
  })
})
```

---

## E2E 测试规范

```typescript
// e2e/export.spec.ts

import { test, expect } from '@playwright/test'

test('should export PNG successfully', async ({ page }) => {
  await page.goto('/editor')
  
  // 上传图片
  const upload = page.locator('[data-testid=image-upload]')
  await upload.drop(file('test-image.png'))
  
  // 等待处理
  await page.waitForSelector('[data-testid=canvas]', { state: 'visible' })
  
  // 导出
  await page.click('[data-testid=export-button]')
  await page.click('[data-testid=export-png]')
  
  // 验证下载
  const download = await page.waitForEvent('download')
  expect(download.suggestedFilename()).toMatch(/\.png$/)
})
```

---

## 测试数据

```typescript
// src/test/fixtures/colors.ts

export const TEST_COLORS = {
  red: { rgb: [255, 0, 0] as RGB, hex: '#FF0000', name: 'Red' },
  green: { rgb: [0, 255, 0] as RGB, hex: '#00FF00', name: 'Green' },
  blue: { rgb: [0, 0, 255] as RGB, hex: '#0000FF', name: 'Blue' },
  white: { rgb: [255, 255, 255] as RGB, hex: '#FFFFFF', name: 'White' },
  black: { rgb: [0, 0, 0] as RGB, hex: '#000000', name: 'Black' },
}

export const TEST_PALETTE: Palette = {
  id: 'test',
  brand: { id: 'test', name: 'Test', nameZh: '测试' },
  name: 'Test Palette',
  nameZh: '测试调色板',
  colors: Object.values(TEST_COLORS),
  size: 5,
  version: '1.0.0'
}
```

---

## Mock 规范

```typescript
// src/test/mocks/worker.ts

export function createMockWorker() {
  return {
    postMessage: vi.fn(),
    onmessage: vi.fn(),
    onerror: vi.fn(),
    terminate: vi.fn(),
  }
}

export function mockWorkerResponse<T>(data: T) {
  return {
    id: 'test-id',
    success: true,
    result: data
  }
}
```

---

## CI 测试

```yaml
# .github/workflows/ci.yml
- name: Run tests
  run: pnpm test

- name: Run e2e tests
  run: pnpm test:e2e
```

---

## 覆盖率要求

| 模块 | 覆盖率要求 |
|------|----------|
| engine/convert/ | 100% |
| engine/statistics/ | 100% |
| engine/palette/ | 100% |
| features/export/ | 80% |
| 其他 | 无强制要求 |
