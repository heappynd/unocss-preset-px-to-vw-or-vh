# UnoCSS 预设: unocss-preset-px-to-vw-or-vh

一个用于 UnoCSS 的实用预设，可自动将 px 单位转换为 vw/vh 单位，专为响应式大屏设计打造。

## 背景

在大屏幕应用开发中，为了实现真正的响应式设计，我们通常需要将固定的像素值转换为视口相对单位。这个预设受到响应式大屏设计的启发，旨在简化此过程，让您的 UnoCSS 样式能够自动适应不同尺寸的显示器。

## 特性

- 自动将 px 单位转换为 vw/vh 单位
- 可自定义设计稿的宽度和高度
- 灵活配置需要转换的 CSS 属性
- 支持水平方向(vw)、垂直方向(vh)或两者兼有的属性转换
- 可选择替换或添加自定义属性列表

## 安装

```bash
npm install unocss-preset-px-to-vw-or-vh
```

## 使用方法

### 基本配置

在您的 UnoCSS 配置文件中添加此预设：

```js
// uno.config.ts
import { defineConfig } from 'unocss';
import { presetPxToViewport } from 'unocss-preset-px-to-vw-or-vh';

export default defineConfig({
  presets: [
    // ...其他预设
    presetPxToViewport({
      designWidth: 1920,  // 设计稿宽度
      designHeight: 1080, // 设计稿高度
    }),
  ],
});
```

### 高级配置

```js
presetPxToViewport({
  designWidth: 1920,  // 设计稿宽度，默认为 1920
  designHeight: 1080, // 设计稿高度，默认为 1080
  unit: 'px',         // 要转换的单位，默认为 'px'
  
  // 自定义转换属性列表
  keyToVw: ['width', 'min-width', 'max-width'],  // 转换为 vw 的属性
  keyToVh: ['height', 'min-height', 'max-height'], // 转换为 vh 的属性
  keyToBoth: ['padding', 'margin'], // 同时转换为 vh 和 vw 的属性
  
  // 是否替换默认属性列表，默认为 false (即添加到默认列表)
  replaceKey: true,
})
```

## 使用示例

### 示例 1: 基本使用

```html
<!-- 原始 UnoCSS 类 -->
<div class="w-200px h-100px p-20px m-10px"></div>

<!-- 转换后的效果 (假设 designWidth=1920, designHeight=1080) -->
<!-- 相当于使用以下 CSS -->
<div style="
  width: 10.42vw;
  height: 9.26vh;
  padding: 1.85vh 1.04vw;
  margin: 0.93vh 0.52vw;
"></div>
```

### 示例 2: 在组件中使用

```vue
<template>
  <div class="data-dashboard">
    <!-- 左侧菜单 -->
    <div class="w-240px h-full left-30px top-20px">
      <!-- 转换为 width: 12.5vw; height: 100%; left: 1.56vw; top: 1.85vh; -->
    </div>
    
    <!-- 主内容区 -->
    <div class="ml-280px mt-20px p-15px gap-20px">
      <!-- 转换为 margin-left: 14.58vw; margin-top: 1.85vh; padding: 1.39vh 0.78vw; gap: 1.85vh 1.04vw; -->
    </div>
  </div>
</template>
```

### 示例 3: 自定义单位转换

```js
// uno.config.ts
import { defineConfig } from 'unocss';
import { presetPxToViewport } from 'unocss-preset-px-to-vw-or-vh';

export default defineConfig({
  presets: [
    presetPxToViewport({
      designWidth: 750,  // 移动端设计稿宽度
      designHeight: 1334, // 移动端设计稿高度
      unit: 'rpx',  // 将 rpx 单位转换为 vw/vh
    }),
  ],
});
```

在组件中使用：

```html
<div class="text-30rpx leading-40rpx p-25rpx">
  <!-- 转换为 font-size: 4vw; line-height: 3vh; padding: 1.87vh 3.33vw; -->
</div>
```

### 示例 4: 仅转换特定属性

```js
// uno.config.ts
presetPxToViewport({
  replaceKey: true, // 替换默认属性列表
  keyToVw: ['width', 'max-width'], // 只有 width 和 max-width 会被转换为 vw
  keyToVh: ['height'], // 只有 height 会被转换为 vh
  keyToBoth: [], // 没有属性会同时转换为 vh 和 vw
})
```

使用效果：

```html
<div class="w-400px h-300px p-20px m-30px">
  <!-- 只有 width 和 height 会被转换 -->
  <!-- 转换为: width: 20.83vw; height: 27.78vh; padding: 20px; margin: 30px; -->
</div>
```

## 默认转换属性

### 转换为 vw 的属性 (水平方向)
- width
- padding-left
- padding-right
- margin-left
- margin-right
- left
- right
- column-gap

### 转换为 vh 的属性 (垂直方向)
- height
- padding-top
- padding-bottom
- margin-top
- margin-bottom
- top
- bottom
- leading
- row-gap

### 同时转换为 vh 和 vw 的属性
- padding
- margin
- gap

## 工作原理

此预设在 UnoCSS 的后处理阶段工作：

1. 识别目标 CSS 属性中的 px 值
2. 根据属性类型将 px 值转换为相应的 vw 或 vh 值
3. 对于同时需要 vw 和 vh 的属性，生成两个值 (例如将 `padding: 20px` 转换为 `padding: 1.85vh 1.04vw`)

## 转换公式

- vw 值计算: `(px * 100) / designWidth`
- vh 值计算: `(px * 100) / designHeight`

## 适用场景

- 大屏数据可视化
- 响应式仪表盘
- 需要适配不同分辨率显示器的界面
- 触控大屏应用

## 许可证

MIT

## 贡献

欢迎提交 issue 和 PR 来改进这个项目！