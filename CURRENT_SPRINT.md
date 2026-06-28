# 当前 Sprint

## 状态

```
Current Phase    Phase 1
Current Task     Task-014
Status           IN_PROGRESS
```

---

# Phase 1 - Editor Shell

## 目标

构建一个稳定、可扩展的编辑器框架。

⚠️ **本阶段禁止实现任何图片处理算法。**

包括：图片转换、调色板映射、颜色统计、网格生成、导出、AI 功能。

---

## 完成标准

- 可以启动开发服务器
- 完整的编辑器界面
- 所有区域布局完成
- 所有按钮可点击（允许无功能）
- 画布显示占位网格
- 后续功能无需修改整体布局

---

## 编辑器布局

```
+-----------------------------------------------------------+
| Toolbar                                                   |
+-----------+----------------------------+------------------+
| Sidebar   |                            | Inspector        |
|           |          Canvas            |                  |
|           |                            |                  |
+-----------+----------------------------+------------------+
| Status Bar                                              |
+-----------------------------------------------------------+
```

布局要求：

- Toolbar 固定顶部
- Sidebar 固定左侧 (256px)
- Inspector 固定右侧 (280px)
- Canvas 自适应填充剩余空间
- Status Bar 固定底部
- 支持窗口缩放

---

## 允许开发的内容

✅ **允许**：

- Layout 框架
- Toolbar
- Sidebar
- Inspector
- Canvas Container
- Status Bar
- Theme / CSS Variables
- 响应式布局
- 基础 Store 骨架
- 路由
- 全局快捷键框架

❌ **禁止**：

- 图片上传逻辑
- Canvas 绘制图片
- Worker
- Engine
- Palette
- Export
- Statistics

---

## Task 清单

### Task-014 ✅ 待开始

**实现整体布局**

Commit: `feat(layout): initialize editor layout`

完成标准：
- AppShell 组件
- Toolbar / Sidebar / Canvas / Inspector / StatusBar 全部显示
- 不实现任何业务逻辑

---

### Task-015 ⏳ 待开始

**实现 Toolbar**

Commit: `feat(toolbar): add toolbar skeleton`

内容：
- Logo
- Undo / Redo 按钮
- Zoom In / Out 按钮
- Export 按钮（占位）
- 按钮允许无功能

---

### Task-016 ⏳ 待开始

**实现 Sidebar**

Commit: `feat(sidebar): implement sidebar layout`

内容：
- Upload Card（占位，无上传功能）
- Palette 选择器（占位）
- Image Settings 表单（占位）

---

### Task-017 ⏳ 待开始

**实现 Inspector**

Commit: `feat(inspector): add inspector panel`

内容：
- Statistics 区域（占位数字）
- Project Info 区域（占位信息）

---

### Task-018 ⏳ 待开始

**实现 Canvas Container**

Commit: `feat(canvas): initialize canvas viewport`

内容：
- 空白 Canvas 元素
- 棋盘背景（transparency pattern）
- 网格背景
- Zoom Container（可缩放）

---

### Task-019 ⏳ 待开始

**实现 Status Bar**

Commit: `feat(statusbar): add status bar`

内容：
- 当前缩放百分比
- 当前尺寸（占位）
- 鼠标坐标（占位）

---

## 开发原则

1. 优先保证架构稳定，而不是功能数量。
2. 不提前实现未来功能（YAGNI）。
3. 未被当前 Task 要求的代码禁止编写。
4. 未经要求不得重构已有模块。
5. 一个 Task = 一个 Commit = 一个可运行版本。
6. 如发现文档设计存在问题，先提出建议，不要自行修改架构。
7. **触发 Stop Conditions 时立即停止，等待确认。**

---

## 每个 Task 验证清单

完成一个 Task 后必须验证：

- [ ] `pnpm dev` 启动成功
- [ ] `pnpm lint` 通过
- [ ] `pnpm typecheck` 通过
- [ ] `pnpm build` 成功
- [ ] 没有修改无关文件
- [ ] Commit message 符合规范

---

## Loop 执行指令

```
读取以下文档：
- README.md
- AGENTS.md
- CURRENT_SPRINT.md
- docs/TASKS.md
- docs/ARCHITECTURE.md
- docs/STOP_CONDITIONS.md

严格按照 CURRENT_SPRINT.md 当前 Task 开发。

一次只完成一个 Task。

完成后：
1. 更新 docs/TASKS.md（标记完成）
2. 更新 CURRENT_SPRINT.md（Current Task 指向下一个）
3. git commit
4. 验证 lint / typecheck / build
5. 继续下一 Task

触发 STOP_CONDITIONS 时立即停止。

不得开发 CURRENT_SPRINT.md 未要求的功能。
不得修改文档规范。
不得重构无关模块。
```

---

## 输出格式

每个 Task 完成后输出：

```
## ✅ Task-014 Completed

**Commit**: feat(layout): initialize editor layout

**修改文件**:
- src/components/layout/AppShell.tsx
- src/components/layout/Toolbar.tsx
- ...

**验证**:
- [x] pnpm dev 成功
- [x] pnpm lint 通过
- [x] pnpm typecheck 通过
- [x] pnpm build 成功

**下一步**: Task-015 - 实现 Toolbar
```
