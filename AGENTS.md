# AGENTS.md - AI 助手开发指南

本文档为在此代码库中工作的 AI 代理提供开发规范和指南。

## 项目概述

- **项目名称**: unocss-preset-px-to-vw-or-vh
- **项目类型**: UnoCSS 预设插件
- **核心功能**: 将 CSS 中的 px 单位自动转换为 vw/vh 视口单位
- **主要技术栈**: TypeScript, UnoCSS, Vitest, tsdown

---

## 命令行操作

### 常用命令

```bash
# 安装依赖
pnpm install

# 构建项目
pnpm build

# 开发模式（监听文件变化）
pnpm dev

# 运行所有测试
pnpm test

# 运行类型检查
pnpm typecheck
```

### 运行单个测试文件

```bash
# 运行特定测试文件
pnpm test tests/index.test.ts

# 运行特定测试用例（使用 --testNamePattern）
pnpm test --testNamePattern "should convert px to vw"
```

### 构建配置

- 使用 `tsdown` 进行构建
- 构建输出目录: `dist/`
- 入口文件: `./dist/index.mjs`

---

## 代码风格规范

### 格式化

- **缩进**: 2 空格
- **语句末尾**: 不使用分号
- **引号**: 使用单引号 `''`
- **箭头函数**: 避免不必要的圆括号，如 `x => x + 1`

### Prettier 配置

项目使用 Prettier 进行代码格式化，配置如下：

```json
{
  "semi": false,
  "singleQuote": true,
  "arrowParens": "avoid"
}
```

### 保存时自动格式化

项目配置了 `editor.formatOnSave: true`，建议在开发时启用。

---

## TypeScript 规范

### 严格模式

项目已启用 TypeScript 严格模式 (`strict: true`)，所有代码必须符合严格类型检查。

### 类型定义

- 公共 API 必须有完整的类型定义
- 接口命名使用 PascalCase，如 `PxToViewportOptions`
- 优先使用 TypeScript 内置类型和泛型

### tsconfig.json 关键配置

```json
{
  "target": "esnext",
  "module": "preserve",
  "moduleResolution": "bundler",
  "strict": true,
  "noUnusedLocals": true,
  "declaration": true,
  "isolatedModules": true,
  "verbatimModuleSyntax": true
}
```

---

## 命名规范

### 变量和函数

- 使用 camelCase 命名
- 函数名以动词开头，描述其行为
- 布尔变量使用 `is`、`has`、`should` 等前缀

```typescript
// 正确
const designWidth = 1920
const isEnabled = true
function convertPxToVw(px: number, width: number): string

// 错误
const design_width = 1920
const enabled = true
function conversion(px, width)
```

### 常量

- 使用全大写字母，下划线分隔
- 放在模块顶部或专门的常量文件中

```typescript
const DEFAULT_DESIGN_WIDTH = 1920
const DEFAULT_DESIGN_HEIGHT = 1080
```

### 接口和类型

- 使用 PascalCase
- 名称要有意义，描述所代表的实体

```typescript
interface PxToViewportOptions {
  designWidth?: number
  designHeight?: number
  keyToVw?: string[]
  keyToVh?: string[]
  keyToBoth?: string[]
  replaceKey?: boolean
  unit?: string
}
```

---

## 导入规范

### ESM 模块语法

项目使用 ESM (`"type": "module"`)，所有导入必须使用 ESM 语法。

```typescript
// 正确
import { definePreset } from 'unocss'
import type { SomeType } from './types'

// 错误
const { definePreset } = require('unocss')
```

### 导入顺序

1. 外部库导入
2. 内部模块导入
3. 类型导入

```typescript
import { definePreset } from 'unocss'

import type { PxToViewportOptions } from './types'
import { presetPxToViewport } from './index'
```

---

## 测试规范

### 测试框架

项目使用 Vitest 进行测试。

### 测试文件命名

- 测试文件放在 `tests/` 目录
- 命名格式: `<功能名>.test.ts`

### 测试结构

使用 `describe` 和 `it` 组织测试用例：

```typescript
import { describe, expect, it } from 'vitest'

describe('功能描述', () => {
  it('应该...', () => {
    // 测试代码
    expect(actual).toEqual(expected)
  })
})
```

### 测试技巧

- 每个测试用例应该独立，不依赖其他测试的执行顺序
- 使用清晰的测试描述（中文）
- 测试覆盖边界情况

---

## 错误处理

### 错误返回

- 避免使用 `try/catch` 隐藏错误
- 对于可能的异常情况，使用明确的错误类型
- 在文档中注明可能的错误场景

### 类型安全

- 不要使用 `any` 类型
- 尽量使用类型守卫进行类型收窄
- 使用 `unknown` 代替 `any` 作为安全基类型

---

## Git 提交规范

### 提交信息格式

```
<类型>: <描述>

[可选的详细说明]
```

类型包括:
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关

### 示例

```
feat: 添加自定义单位的支持

支持在配置中指定 unit 参数，将 rpx 等单位转换为 vw/vh
```

---

## 开发工作流程

1. **创建分支**: 基于 `main` 创建功能分支
2. **编写代码**: 遵循上述代码规范
3. **编写测试**: 确保新增代码有对应的测试用例
4. **运行检查**: 
   ```bash
   pnpm typecheck  # 类型检查
   pnpm test       # 运行测试
   pnpm build      # 构建项目
   ```
5. **提交代码**: 按照提交规范撰写提交信息

---

## 常用工具和参考

- [Vitest 文档](https://vitest.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [UnoCSS 文档](https://unocss.com/)
- [tsdown 文档](https://tsdown.dev/)

---

## 注意事项

- 修改公共 API 时需要更新类型定义
- 发布新版本前确保通过所有测试和类型检查
- 保持代码简洁，避免过度工程化