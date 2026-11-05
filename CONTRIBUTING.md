# Contributing

## Branches

- `main`: released, tagged code
- `dev`: integration branch
- `ft/*`, `fix/*`, `chore/*`: working branches cut from `dev`
- `release/vX.Y.Z`: release candidates cut from `dev`

Branches are never deleted after merging.

## Commits

One line, imperative, Conventional Commits: `type(scope): summary`.
Types: feat, fix, chore, docs, refactor, test, style, perf, ci, build.

## Merging

Always `--no-ff` so branch history stays visible.

## Releases

1. Cut `release/vX.Y.Z` from `dev`
2. Add `docs/releases/vX.Y.Z.md` and update `CHANGELOG.md`
3. Merge into `main`, tag `vX.Y.Z`, merge back into `dev`

## Automated checks

Git hooks (Husky) run after `pnpm install`:

- **pre-commit:** Prettier formats staged files (lint-staged)
- **commit-msg:** commitlint enforces `type(scope): summary`, one line, max 72 characters
