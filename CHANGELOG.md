# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and uses [Changesets](https://github.com/changesets/changesets) for automated changelog generation.

---

## 1.0.0 — 2025-05-11

### Features

- **Badge** component with solid, outlined, and pill variants
- **Button** component with solid, outlined, and text variants; black/white colour support; `LinkComponent` prop for router integration
- **Checkbox** component with label support
- **Divider** component with four size variants
- **InputField** component with forwardRef, error state, and size variants
- **InputMask** component for formatted inputs (phone, date, etc.)
- **Select** component with optional label and multi-select support
- **TextArea** component with error state and fullWidth option
- **Typography** component with h1–h6 and p variants, decoupled semantic element from visual style

### Utilities

- `paletteGenerator` — generate an 11-shade Tailwind-compatible colour palette from a hex colour
- `skogen` Tailwind plugin — auto-generates `text-primary-*`, `bg-primary-*`, `border-primary-*` and secondary equivalents from a single hex colour

### Infrastructure

- Tailwind CSS v4 support
- Dual CJS + ESM output via tsdown
- TypeScript declarations included
- Vitest + React Testing Library test suite (82 tests)
- Storybook 10 with GitHub Pages deployment
- Changesets-based release automation
- ESLint 9 flat config
- GitHub Actions CI (lint, typecheck, test, build)
