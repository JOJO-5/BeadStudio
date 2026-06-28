# Bug Fix Prompt

## 规则

1. 遵守 `AGENTS.md` 所有规范
2. 先复现 Bug，再修复
3. 写测试防止回归
4. 不能修改无关代码
5. 更新文档（如需要）

## 执行步骤

### 1. 复现

- 描述复现步骤
- 提供测试用例
- 确认 Bug 可复现

### 2. 定位

- 查看相关模块代码
- 检查 `DECISIONS.md` 了解设计意图
- 用 DevTools 调试

### 3. 修复

- 最小改动原则
- 先写测试再修复
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
## Bug 描述

[简要描述问题]

## 复现步骤

1. ...
2. ...

## 根因

[分析结果]

## 修改文件

- src/engine/quantize/quantizer.ts

## 测试

- [x] 新增回归测试
- [x] 现有测试通过

## 完成情况

- [x] 类型检查通过
- [x] Lint 无警告
- [x] 测试通过
- [x] 构建成功
```
