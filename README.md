# Skogen

> A Tailwind CSS + React component library built to be simple, effective, and maintainable.

[![CI](https://github.com/bitfootco/skogen/actions/workflows/ci.yml/badge.svg)](https://github.com/bitfootco/skogen/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@bitfootco/skogen)](https://www.npmjs.com/package/@bitfootco/skogen)
[![license](https://img.shields.io/npm/l/@bitfootco/skogen)](LICENSE)
[![Storybook](https://img.shields.io/badge/storybook-live-ff4785)](https://bitfootco.github.io/skogen/)

## Installation

```bash
npm install @bitfootco/skogen
```

**Peer dependencies** — make sure these are already in your project:

```bash
npm install react react-dom tailwindcss
```

## Quick Start

### 1. Import the CSS

Add the Skogen stylesheet to your project's CSS entry file:

```css
@import "tailwindcss";
@import "@bitfootco/skogen/styles/index.css";
```

### 2. Register the Tailwind plugin

Add the `@plugin` directive to your CSS entry file, after the imports:

```css
@import "@bitfootco/skogen/styles/index.css";
@import "tailwindcss";
@plugin "@bitfootco/skogen/plugin";
```

### 3. Use components

```tsx
import { Button, InputField, Badge } from '@bitfootco/skogen';

export default function App() {
  return (
    <div>
      <Badge text="New" color="primary" />
      <Button text="Get started" color="primary" variant="solid" />
      <InputField id="email" label="Email" placeholder="you@example.com" value="" />
    </div>
  );
}
```

## Components

| Component | Description | Key props |
|-----------|-------------|-----------|
| `Badge` | Status/label indicator | `color`, `variant` (solid/outlined/pill), `size`, `Icon` |
| `Button` | Clickable action element | `color`, `variant` (solid/outlined/text), `size`, `disabled`, `Icon`, `LinkComponent` |
| `Checkbox` | Boolean toggle input | `checked`, `label`, `onChange` |
| `Divider` | Horizontal rule | `size` (sm/md/lg/xl) |
| `InputField` | Text input with label | `label`, `value`, `error`, `size`, `type`, `disabled` |
| `InputMask` | Formatted text input | `mask`, `value`, `onChange` |
| `Select` | Dropdown selector | `options`, `selected`, `multiple`, `label` |
| `TextArea` | Multi-line text input | `label`, `value`, `error`, `size`, `disabled`, `fullWidth` |
| `Typography` | Text with consistent styles | `variant` (h1–h6/p), `color`, `component` |

## Tailwind Plugin

The `skogen` Tailwind plugin generates utility classes for the default primary and secondary brand colours at all standard Tailwind shade steps (50–950):

```
text-primary        bg-primary        border-primary
text-primary-500    bg-primary-500    border-primary-500
text-secondary      bg-secondary      border-secondary
...
```

It also generates:
- `.text-default` — auto-contrasting text (white on dark, black on light)
- `.text-button-default` / `.text-button-secondary` — button text contrast
- `.bg-default` — default background

Default colours are blue-800 (`#1e40af`) for primary and violet-800 (`#5b21b6`) for secondary.

### Palette Utility

Generate a Tailwind-compatible colour palette from any hex colour:

```ts
import { paletteGenerator } from '@bitfootco/skogen';

const palette = paletteGenerator('#e11d48');
// { '50': '#fff1f4', '100': '#ffe2e9', ..., '950': '#4c0010' }
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

See [SECURITY.md](SECURITY.md).

## License

MIT © [The Bitfoot Company](https://bitfoot.co)
