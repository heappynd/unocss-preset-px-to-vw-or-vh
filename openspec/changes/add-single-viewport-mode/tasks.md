## 1. 更新 TypeScript 接口

- [x] 1.1 在 `PxToViewportOptions` 接口中添加 `viewportMode` 属性，类型为 `'vw' | 'vh' | 'both'`

## 2. 实现 viewportMode 逻辑

- [x] 2.1 从选项中读取 viewportMode，默认值为 'both'
- [x] 2.2 在 postprocess 中添加条件逻辑处理 'vw' 模式 - 将所有 px 转换为 vw
- [x] 2.3 在 postprocess 中添加条件逻辑处理 'vh' 模式 - 将所有 px 转换为 vh
- [x] 2.4 当 viewportMode 为 'vw' 或 'vh' 时，跳过 keyToVw/keyToVh/keyToBoth 逻辑

## 3. 添加测试

- [x] 3.1 添加测试用例：viewportMode 为 'vw' 时将所有 px 转换为 vw
- [x] 3.2 添加测试用例：viewportMode 为 'vh' 时将所有 px 转换为 vh
- [x] 3.3 添加测试用例：viewportMode 为 'both' 时保持现有行为

## 4. 运行检查

- [x] 4.1 运行类型检查：pnpm typecheck
- [x] 4.2 运行测试：pnpm test
- [x] 4.3 运行构建：pnpm build