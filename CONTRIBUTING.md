# Contributing to Skogen

Thank you for your interest in contributing. This guide covers the development workflow, how to submit changes, and how releases work.

## Development Setup

**Prerequisites:** Node 22 LTS, npm 10+

```bash
git clone git@github.com:bitfootco/skogen.git
cd skogen
npm install
```

### Available scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Compile the library to `dist/` |
| `npm run dev` | Watch mode — rebuild on file change |
| `npm run typecheck` | Type-check without emitting files |
| `npm run lint` | Run ESLint |
| `npm test` | Run the full test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run storybook` | Start Storybook dev server on port 6006 |
| `npm run build-storybook` | Build the static Storybook site |

### Running tests

```bash
npm test
```

All tests must pass before a PR can be merged. New components must include tests in `src/tests/components/`.

### Developing a component

1. Add your component under `src/components/<Name>/index.tsx`
2. Export it from `src/index.ts`
3. Add tests in `src/tests/components/<Name>.test.tsx`
4. Add a Storybook story at `src/components/<Name>/<Name>.stories.tsx`
5. Run `npm run storybook` to see it in action

## Submitting Changes

1. **Fork** the repository
2. **Create a branch** from `main`: `git checkout -b feat/my-feature`
3. **Write your code** — follow existing patterns
4. **Add a changeset** (see below)
5. **Open a pull request** against `main`

All PRs require:
- Passing CI (lint, typecheck, test, build)
- At least one approving review
- A changeset file

## Changesets

This project uses [Changesets](https://github.com/changesets/changesets) to manage versions and the CHANGELOG.

For every change that should appear in the release notes, run:

```bash
npm run changeset
```

This opens an interactive prompt asking which packages changed and whether it's a `patch`, `minor`, or `major` bump. Commit the generated file in `.changeset/` alongside your code changes.

**When to bump what:**
- `patch` — bug fixes, internal refactors, doc updates
- `minor` — new components, new props, backwards-compatible features
- `major` — breaking changes to existing APIs

## Release Process

Releases are automated via GitHub Actions:

1. Merging a PR with a changeset to `main` causes the release workflow to open a "Version Packages" PR.
2. Merging the "Version Packages" PR triggers an automatic `npm publish` to the npm registry.

To publish manually: `npm run release` (requires `NPM_TOKEN` in the environment).

## Branch Protection

The `main` branch requires:
- All CI checks pass (`lint`, `typecheck`, `test`, `build`)
- At least 1 approving review
- Linear history (squash or rebase merges only)
- No force pushes

To configure branch protection on a fresh fork, run:

```bash
bash scripts/setup-branch-protection.sh
```

(Requires `gh` CLI authenticated with admin access to the repository.)

## Code Style

- Prettier handles formatting — run `npx prettier --write src/` or configure your editor
- ESLint enforces rules — `npm run lint` must return zero errors
- No comments describing *what* the code does — only *why* if it's non-obvious
