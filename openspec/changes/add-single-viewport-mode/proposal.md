## Why

当前 preset 需要分别配置 `keyToVw`、`keyToVh`、`keyToBoth` 来决定哪些属性转换为 vw 或 vh。这对于只需要一种视口单位的场景（如移动端只需要 vw）来说配置繁琐，用户希望能够一键切换到"纯 vw"或"纯 vh"模式。

## What Changes

- 新增 `viewportMode` 配置选项，支持三种模式：
  - `both`（默认）: 保持现有行为，根据属性分别转换为 vw/vh/both
  - `vw`: 所有 px 只转换为 vw
  - `vh`: 所有 px 只转换为 vh

## Capabilities

### New Capabilities

- `single-viewport-mode`: 添加 `viewportMode` 配置项，支持选择只转换为 vw 或只转换为 vh

### Modified Capabilities

- （无）

## Impact

- 新增 `PxToViewportOptions` 接口中的 `viewportMode` 属性
- 修改 `src/index.ts` 中的转换逻辑
- 需要更新类型导出