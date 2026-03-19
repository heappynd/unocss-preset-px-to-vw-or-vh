## 新增需求

### 需求：viewportMode 配置选项
预设 SHALL 支持在配置接口中使用 `viewportMode` 选项，接受 `'vw' | 'vh' | 'both'` 值。

#### 场景：默认模式为 'both'
- **WHEN** 用户未指定 viewportMode
- **THEN** 预设行为保持不变，使用 keyToVw、keyToVH 和 keyToBoth 来决定转换

#### 场景：viewportMode 设置为 'vw'
- **WHEN** 用户将 viewportMode 设置为 'vw'
- **THEN** 所有 px 值 SHALL 转换为 vw，无论 CSS 属性是什么

#### 场景：viewportMode 设置为 'vh'
- **WHEN** 用户将 viewportMode 设置为 'vh'
- **THEN** 所有 px 值 SHALL 转换为 vh，无论 CSS 属性是什么

### 需求：viewportMode 优先级
viewportMode 选项 SHALL 优先于 keyToVw、keyToVh 和 keyToBoth 配置。

#### 场景：viewportMode 覆盖 keyToVw
- **WHEN** 用户设置 viewportMode 为 'vh' 同时也配置了 keyToVw
- **THEN** 所有 px 值 SHALL 转换为 vh，忽略 keyToVw

#### 场景：viewportMode 覆盖 keyToBoth
- **WHEN** 用户设置 viewportMode 为 'vw' 且 keyToBoth 包含 'padding'
- **THEN** padding 的 px 值 SHALL 只转换为 vw（而不是同时转换为 vh 和 vw）