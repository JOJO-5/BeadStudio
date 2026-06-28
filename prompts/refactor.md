# Refactor Prompt

## 规则

1. 遵守 `AGENTS.md` 所有规范
2. 不改变功能，只改结构
3. 保持向后兼容（API 不变）
4. 测试必须全部通过
5. 不能修改无关代码

## 执行步骤

### 1. 分析

- 明确重构目标（性能/可读性/可维护性）
- 确认影响范围
- 检查 `API_BOUNDARY.md` 确认边界

### 2. 计划

- 列出需要改动的文件
- 确认测试覆盖
- 确保可以分步提交

### 3. 执行

- 小步提交
- 每步验证
- 遵循 `DONE.md` 自检清单

### 4. 验证

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## 输出格式

```
## 重构目标

[目标描述]

## 影响范围

- src/engine/quantize/

## 修改文件

- src/engine/quantize/quantizer.ts（拆分）
- src/engine/quantize/types.ts（移动）

## 完成情况

- [x] 类型检查通过
- [x] Lint 无警告
- [x] 测试通过
- [x] 构建成功
- [x] API 保持兼容
```
