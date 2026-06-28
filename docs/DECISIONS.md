# 架构决策记录 (Architecture Decision Records)

## 001 - 使用 Zustand 而非 Redux

**决策**：选用 Zustand 作为状态管理方案。

**原因**：
- 拼豆项目状态规模中等，Zustand 足够覆盖需求
- API 简洁，AI 生成代码时出错概率低
- 避免 Redux 模板代码，减少维护成本
- 社区活跃，TypeScript 支持良好

**验证时间**：Phase 2 结束后评估，如遇性能问题再迁移

---

## 002 - Canvas2D 而非 SVG

**决策**：主画布层使用 Canvas2D API，不使用 SVG。

**原因**：
- 拼豆网格涉及大量像素级操作（单个 bead 绘制）
- Canvas2D 在大量图形元素渲染时性能优于 SVG DOM
- 像素化效果需要直接操作 ImageData，SVG 不适合
- 导出时可直接 toDataURL()，流程简单

**注意**：UI 交互层（如选择框、拖拽）可使用 HTML/CSS，Canvas 仅负责渲染

---

## 003 - 使用 image-q 而非自研颜色量化

**决策**：颜色量化直接使用 image-q 库。

**原因**：
- 颜色科学算法（LAB、ΔE2000、CIE94）实现复杂且容易出错
- image-q 支持多种量化算法：Floyd-Steinberg、Atkinson、Sierra、Wu、NeuQuant
- 已有大量社区验证，稳定性高
- 自研核心竞争力不在颜色算法，在业务层

**替代方案**：如 image-q 维护停滞，可考虑 color-thief 或自行实现核心算法

---

## 004 - 使用 Pica 而非 Canvas 默认缩放

**决策**：图片缩放使用 Pica 库。

**原因**：
- Canvas2D 默认缩放使用双线性插值，质量不足
- Pica 使用 Lanczos / Catmull-Rom 插值，肉眼可见质量提升
- Pica 支持 Web Worker，避免主线程阻塞
- API 简洁，集成成本低

---

## 005 - Web Worker 处理 CPU 密集型任务

**决策**：颜色量化、图片缩放、网格计算等 CPU 密集型操作全部放入 Worker。

**原因**：
- 浏览器主线程被阻塞会导致 UI 卡顿
- 图片处理（特别是高分辨率图）是典型 CPU 密集场景
- Worker 可并行处理，不影响 UI 响应
- Pica / image-q 均支持 Worker 模式

**架构**：
```
Main Thread          Worker Thread
    │                      │
    ├─── postMessage ─────►│ (图片数据)
    │                      ├── 颜色量化
    │                      ├── 缩放处理
    │                      ├── 网格计算
    │◄── postMessage ──────┤ (结果数据)
    │                      │
```

---

## 006 - Tailwind CSS + shadcn/ui

**决策**：样式方案使用 Tailwind CSS + shadcn/ui 组件库。

**原因**：
- shadcn/ui 不依赖运行时，直接复制组件源码，无隐式依赖
- Tailwind atomic CSS 减少样式冲突
- 两者结合：组件美观 + 定制灵活
- AI 生成代码时更容易遵循设计系统

---

## 007 - 第一版不引入 WebAssembly

**决策**：Phase 1-5 均不引入 WebAssembly 优化。

**原因**：
- Vite + Web Worker 的组合在当前阶段性能足够
- WASM 增加了构建复杂度和学习成本
- 暂无明确性能瓶颈（WASM 优化的场景）
- 后续如遇性能问题可在关键路径（颜色量化）单独引入

---

## 008 - 单 commit = 单 Task 原则

**决策**：每个 Git commit 必须对应一个独立的开发任务。

**原因**：
- 方便 AI 回溯和理解代码演进
- 降低 code review 难度
- 便于后续 bug 定位和回滚
- 避免"大而全"的难以理解的 commit

**规范**：
- commit message 遵循 Conventional Commits
- 一个 commit 不跨多个目录模块
- Task 编号与 commit 关联（如 `feat(Task-023): ...`）

---

## 009 - 颜色匹配采用 LAB + ΔE2000

**决策**：颜色相似度计算使用 LAB 色彩空间 + ΔE2000 色差公式。

**原因**：
- RGB 欧氏距离不符合人眼感知（人眼对绿色更敏感）
- LAB 色彩空间更接近人眼感知特性
- ΔE2000 是目前最准确的标准色差公式（IEC 61966）
- image-q 原生支持，无额外实现成本

**参考阈值**：
- ΔE < 1.0：人眼无法区分
- ΔE < 2.0：专业人士难以区分
- ΔE < 5.0：普通人可感知差异

---

## 010 - 第一版聚焦核心链路，不做插件系统

**决策**：Phase 1-5 不实现插件/扩展机制。

**原因**：
- 插件系统增加架构复杂度
- 当前功能集合明确，无需扩展
- 先验证核心用户价值，再考虑生态
- 后续可通过模块化架构（engine/ 可替换）实现灵活扩展
