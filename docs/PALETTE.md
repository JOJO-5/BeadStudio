# 调色板规范 (Palette Specification)

## 核心概念层级

```
Brand（品牌）
  └── Palette（调色板）
        └── Color（颜色）
              ├── RGB       [0-255, 0-255, 0-255]
              ├── LAB       { L: 0-100, a: -128-127, b: -128-127 }
              ├── HEX       #RRGGBB
              ├── Code      商家颜色编号
              └── Name      颜色名称
```

---

## 品牌支持

| Brand | 代号 | 颜色数量 | 状态 |
|-------|------|----------|------|
| Perler | `perler` | 216 | ✅ 第一版支持 |
| Hama | `hama` | 218 | 🔜 下个版本 |
| Artkal S | `artkal-s` | 309 | 🔜 下个版本 |
| Artkal M | `artkal-m` | 218 | 🔜 下个版本 |
| Artkal X | `artkal-x` | 160 | 🔜 下个版本 |
| Nabbi | `nabbi` | 180 | 🔜 未来 |

---

## Palette 接口

```typescript
// src/types/palette.ts

interface Brand {
  id: string           // 'perler'
  name: string         // 'Perler'
  nameZh: string       // 'Perler 培乐彩'
}

interface PaletteColor {
  /** 商家颜色编号 */
  code: string         // '00010'
  /** 颜色名称 */
  name: string         // 'Pure White'
  /** 中文名称 */
  nameZh: string      // '纯白'
  /** RGB 值 */
  rgb: RGB             // [255, 255, 255]
  /** HEX 值 */
  hex: string          // '#FFFFFF'
  /** LAB 值（预计算） */
  lab: LAB             // { L: 100, a: 0, b: 0 }
  /** 是否透明 */
  transparent?: boolean
}

interface Palette {
  id: string           // 'perler-classic'
  brand: Brand
  name: string         // 'Perler Classic'
  nameZh: string       // 'Perler 经典色'
  colors: PaletteColor[]
  /** 颜色数量 */
  size: number
  /** 版本 */
  version: string      // '1.0.0'
}
```

---

## RGB 类型

```typescript
type RGB = [number, number, number]  // [R, G, B] 各自范围 0-255
```

---

## LAB 类型

```typescript
interface LAB {
  L: number  // 0-100（亮度）
  a: number  // -128 ~ 127（绿-红）
  b: number  // -128 ~ 127（蓝-黄）
}
```

RGB ↔ LAB 转换必须在 `engine/convert/lab.ts` 中实现，使用 D65 光源和 2° 视角。

---

## 调色板文件结构

```
src/engine/palette/
├── index.ts              # 导出
├── palette.types.ts      # 类型定义
├── perler.classic.ts    # Perler 经典调色板
├── hama.classic.ts      # Hama 经典调色板
├── artkal.s.ts          # Artkal S 调色板
└── presets.ts           # 预设调色板列表
```

---

## 调色板数据格式

```typescript
// Perler 经典色示例
export const perlerClassic: Palette = {
  id: 'perler-classic',
  brand: { id: 'perler', name: 'Perler', nameZh: 'Perler 培乐彩' },
  name: 'Perler Classic',
  nameZh: 'Perler 经典色',
  size: 216,
  version: '1.0.0',
  colors: [
    {
      code: '00010',
      name: 'Pure White',
      nameZh: '纯白',
      rgb: [255, 255, 255],
      hex: '#FFFFFF',
      lab: { L: 100, a: 0, b: 0 }
    },
    // ... 215 more
  ]
}
```

---

## ΔE 阈值规范

| ΔE 范围 | 感知差异 | 处理 |
|---------|----------|------|
| ΔE < 1.0 | 人眼无法区分 | 视为相同颜色 |
| 1.0 ≤ ΔE < 2.0 | 专业人士难以区分 | 可接受 |
| 2.0 ≤ ΔE < 5.0 | 普通人可感知差异 | 生产可接受 |
| ΔE ≥ 5.0 | 明显色差 | 需要替换 |

---

## 颜色查找流程

```
输入图片像素 RGB
    │
    ▼
遍历调色板所有颜色
    │
    ├── 计算 ΔE(RGB, PaletteColor)
    │
    └── 找到最小 ΔE 的颜色
            │
            ▼
        返回该颜色
```

---

## 自定义调色板

用户可以创建自定义调色板，存储在 localStorage：

```typescript
interface UserPalette {
  id: string           // 'user-xxx'
  name: string
  colors: PaletteColor[]
  createdAt: number
}
```

---

## 导入/导出格式

调色板支持 JSON 格式导入导出：

```json
{
  "id": "my-palette",
  "name": "My Custom Palette",
  "brand": { "id": "custom", "name": "Custom", "nameZh": "自定义" },
  "colors": [
    {
      "code": "C001",
      "name": "Red",
      "nameZh": "红色",
      "rgb": [255, 0, 0],
      "hex": "#FF0000"
    }
  ]
}
```
