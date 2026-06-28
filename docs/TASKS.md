# 开发任务清单 (Task Breakdown)

## Phase 1 — 仓库初始化

- [x] **Task-001**: 初始化 React + Vite + TypeScript 项目，配置 pnpm workspace
- [ ] **Task-002**: 配置 Tailwind CSS + PostCSS + autoprefixer
- [ ] **Task-003**: 配置 shadcn/ui，添加 Button / Slider / Tabs / Dialog 基础组件
- [ ] **Task-004**: 配置 ESLint + Prettier + commitlint，建立 Git Hooks (husky + lint-staged)
- [ ] **Task-005**: 配置 GitHub Actions CI（Install → Lint → Typecheck → Test → Build）
- [ ] **Task-006**: 建立目录结构（app/ components/ engine/ store/ worker/ hooks/ types/ utils/ styles/ assets/）
- [ ] **Task-007**: 编写 AGENTS.md（AI 开发指南）
- [ ] **Task-008**: 编写 CODING_STYLE.md（命名规范 / Import 顺序 / 禁止事项）
- [ ] **Task-009**: 编写 DESIGN_SYSTEM.md（颜色 / 字体 / 间距 / 圆角 / 阴影 tokens）
- [ ] **Task-010**: 编写 UI_STYLE.md（按钮 / 输入框 / 面板设计规范）
- [ ] **Task-011**: 编写 ARCHITECTURE.md（数据流 / 模块职责 / 分层策略）
- [ ] **Task-012**: 编写 ROADMAP.md（产品路线图 1.0 → 2.0）
- [ ] **Task-013**: 编写 README.md（项目介绍 / 运行方式 / 目录说明）

---

## Phase 2 — 编辑器界面

- [x] **Task-014**: 搭建整体布局框架（Sidebar + Canvas + Panel 三栏布局）
- [x] **Task-015**: 实现顶部 Toolbar（工具按钮组 / 缩放控制 / 撤销重做按钮）
- [x] **Task-016**: 实现左侧 Sidebar（图片上传区 / 调色板选择区）
- [x] **Task-017**: 实现右侧统计 Panel（颜色数量 / 材料用量 / 网格尺寸）
- [x] **Task-018**: 实现 Canvas 画布组件（基础渲染层 + 缩放平移支持）
- [ ] **Task-019**: 实现全局快捷键支持（Ctrl+Z / Ctrl+Shift+Z / Ctrl+S / Delete）
- [x] **Task-020**: 配置 Zustand Store（ProjectStore / CanvasStore / SettingsStore / HistoryStore）
- [x] **Task-021**: 实现 Undo/Redo 历史记录功能（基于 HistoryStore）
- [x] **Task-022**: 实现本地项目持久化（localStorage 保存/加载）

---

## Phase 3 — 图片处理

- [x] **Task-023**: 实现图片上传组件（支持拖拽上传 / 支持 PNG JPG WEBP）
- [x] **Task-024**: 实现图片裁剪功能（集成 react-easy-crop，固定比例裁剪）
- [x] **Task-025**: 实现图片缩放功能（集成 Pica，支持高质量 Lanczos 插值）
- [x] **Task-026**: 实现图片像素化预览（实时预览目标分辨率效果）
- [x] **Task-027**: 将图片处理逻辑封装到 Worker（避免 UI 阻塞）

---

## Phase 4 — 颜色引擎

- [x] **Task-028**: 实现 PaletteEngine（调色板配置 / 预设调色板 / 自定义调色板）
- [x] **Task-029**: 实现 ColorMatcher（颜色量化 / LAB 转换 / ΔE2000 计算，集成 image-q）
- [x] **Task-030**: 实现抖动算法（Floyd-Steinberg / Atkinson / Sierra，可切换）
- [x] **Task-031**: 实现调色板映射预览（显示原图 → 映射后效果对比）
- [x] **Task-032**: 实现颜色替换功能（单个颜色或整体调色板替换）
- [x] **Task-033**: 实现 Statistics 模块（每种颜色的 bead 数量 / 百分比 / 总数）

---

## Phase 5 — 网格与导出

- [x] **Task-034**: 实现 GridRenderer（画布绘制 bead 网格 / 支持不同 bead 尺寸）
- [x] **Task-035**: 实现 BoardSplit（自动计算拼板数量 / 板子尺寸 / 排列方式）
- [x] **Task-036**: 实现 PNG 导出（单板图片 / 全图拼接图片，集成 file-saver）
- [ ] **Task-037**: 实现 PDF 导出（拼板图纸 + 颜色编号 + 材料清单，集成 pdf-lib）
- [ ] **Task-038**: 实现网格图纸标注（每板坐标标注 / 颜色编号标注）
- [ ] **Task-039**: 实现材料采购清单导出（颜色编号 + 数量 + 预估价格）

---

## 未来规划（Roadmap 2.0）

- [ ] **Task-040**: 支持更多 bead 品牌调色板（Hama / Artkal / Nabbi）
- [ ] **Task-041**: 支持图案库和模板市场
- [ ] **Task-042**: 实现 WASM 加速颜色量化（性能优化）
- [ ] **Task-043**: 支持多人协作编辑
- [ ] **Task-044**: 支持移动端 / 平板适配
