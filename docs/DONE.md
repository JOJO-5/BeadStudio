# Definition of Done

每个 Task 完成必须满足以下全部条件。

---

## 必须检查项

```
□ 可以运行（pnpm dev 无报错）

□ Type Check 通过（pnpm typecheck 无错误）

□ ESLint 无 Warning（pnpm lint 无警告）

□ Build 成功（pnpm build 成功）

□ 有测试（新增/修改的 engine 模块有单元测试）

□ 更新文档（涉及架构变更的更新对应文档）

□ 不影响已有功能（pnpm test 全部通过）
```

---

## 提交前自检

```bash
# 1. 类型检查
pnpm typecheck

# 2. Lint 检查
pnpm lint

# 3. 运行测试
pnpm test

# 4. 构建验证
pnpm build
```

全部通过才能提交。

---

## Commit Message 检查

```
✅ 正确格式：
feat(Task-014): 实现三栏布局框架
fix(Task-027): 修复 Worker 内存泄漏
docs(Task-008): 更新 CODING_STYLE.md

❌ 错误格式：
update stuff
fix bug
layout changes
```

---

## Code Review 前置条件

- [ ] 自检清单全部通过
- [ ] 提交信息符合规范
- [ ] 没有 debug/console.log 残留
- [ ] 没有 TODO/FIXME 注释（未解决的）
- [ ] 核心算法有测试覆盖
