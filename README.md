# UnoCSS Preset px to vw or vh

A UnoCSS preset that automatically converts pixel values to viewport units (vw/vh) for responsive design.

## Features

- Automatically convert pixel values to viewport width (vw) or viewport height (vh)
- Configurable design width and height
- Supports conversion for various CSS properties like width, height, padding, margin, and positioning

## Installation

```bash
npm install unocss-preset-px-to-vw-or-vh
```

## Usage

### Basic Setup

```javascript
import { defineConfig } from 'unocss';
import { presetPxToViewport } from 'unocss-preset-px-to-vw-or-vh';

export default defineConfig({
  presets: [
    presetPxToViewport({
      // Optional: customize design dimensions
      designWidth: 1920, // default
      designHeight: 1080, // default
    }),
  ],
});
```

### Example Conversions

| Original Class | Converted Value          | Explanation                             |
| -------------- | ------------------------ | --------------------------------------- |
| `w-1920px`     | `width: 100vw`           | Width converted based on design width   |
| `h-1080px`     | `height: 100vh`          | Height converted based on design height |
| `p-20px`       | `padding: 1.85vh 1.04vw` | Padding converted to both vh and vw     |

### Supported Properties

#### Converted to Viewport Width (vw)

- width
- padding-left
- padding-right
- margin-left
- margin-right
- left
- right

#### Converted to Viewport Height (vh)

- height
- padding-top
- padding-bottom
- margin-top
- margin-bottom
- top
- bottom
- leading

## Configuration

### Options

- `designWidth`: The design reference width (default: 1920)
- `designHeight`: The design reference height (default: 1080)
- `keyToVw`: The key to convert to viewport width (default: ['width', 'padding-left', 'padding-right', 'margin-left', 'margin-right', 'left', 'right'])
- `keyToVh`: The key to convert to viewport height (default: ['height', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom', 'top', 'bottom'])
- `keyToBoth`: The key to convert to both viewport width and height (default: ['padding', 'margin', 'gap'])
- `replaceKey`: Whether to replace the original key with the converted key (default: false)

## How It Works

The preset uses a postprocessing step to:

1. Detect pixel values in supported CSS properties
2. Convert pixels to viewport units using the formula: `(pixel-value * 100) / design-dimension`
3. Replace original pixel values with calculated viewport units

## Example

```javascript
// With default 1920x1080 design
w-192px  // Becomes width: 10vw
h-108px  // Becomes height: 10vh
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
