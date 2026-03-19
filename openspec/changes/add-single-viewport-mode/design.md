## Context

当前 preset 通过 `keyToVw`、`keyToVh`、`keyToBoth` 三个数组来控制哪些 CSS 属性转换为 vw 或 vh。用户希望能够一键切换到"纯 vw"或"纯 vh"模式，不需要分别配置每个属性。

## Goals / Non-Goals

**Goals:**
- 添加 `viewportMode` 配置选项
- 支持 `vw`、`vh`、`both` 三种模式
- 保持向后兼容，默认行为不变

**Non-Goals:**
- 不改变现有的 `keyToVw`、`keyToVh`、`keyToBoth` 配置方式

## Decisions

1. **新增 `viewportMode` 选项**
   - 类型: `'vw' | 'vh' | 'both'`
   - 默认值: `'both'`
   - 当设为 `vw` 时，所有 px 都转换为 vw
   - 当设为 `vh` 时，所有 px 都转换为 vh
   - 当设为 `both` 时，保持现有行为

2. **实现方式**
   - 在 `PxToViewportOptions` 接口中添加 `viewportMode` 属性
   - 在 preset 初始化时检查 `viewportMode` 值
   - 如果是 `vw` 或 `vh` 模式，跳过原有的 keyToVw/keyToVh/keyToBoth 判断，直接全局转换

## Risks / Trade-offs

- [风险] 用户同时设置了 `viewportMode` 和 `keyToVw`/`keyToVh` 时的行为
  - 解决方案: `viewportMode` 优先级更高，覆盖 keyToVw/keyToVh 的配置

- [风险] `keyToBoth` 在单视口模式下的行为
  - 解决方案: 单视口模式下忽略 keyToBoth，统一使用 viewportMode 指定的单位