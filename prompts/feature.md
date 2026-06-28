# Feature 开发 Prompt

## 规则

1. 遵守 `AGENTS.md` 所有规范
2. 不能修改无关代码（一个 Task = 一个目标）
3. 更新相关文档（架构变更时）
4. 写测试（engine 模块 100%，features 模块 80%）
5. 最后输出修改文件列表和完成情况

## 执行步骤

### 1. 理解需求

- 明确要实现的功能
- 确认属于哪个 Phase
- 检查 `MVP_SCOPE.md` 确认是否在范围内

### 2. 查阅规范

- `ARCHITECTURE.md` 确认模块位置
- `DATA_MODEL.md` 确认数据类型
- `API_BOUNDARY.md` 确认调用关系
- `CODING_STYLE.md` 确认编码规范

### 3. 实现

- 先写测试
- 再写实现
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
## 修改文件

- src/engine/quantize/quantizer.ts
- src/engine/quantize/quantizer.test.ts

## 完成情况

- [x] 类型检查通过
- [x] Lint 无警告
- [x] 测试通过
- [x] 构建成功
- [x] 文档已更新（如需）

## 下一步建议

（如有）后续需要配合的任务
```
