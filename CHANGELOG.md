# Changelog

All notable changes are documented here.
Format: [Keep a Changelog](https://keepachangelog.com). Versioning: [SemVer](https://semver.org).

## [0.1.0] - 2026-11-05

### Added

- Monorepo foundation, git workflow and project documentation

## [0.2.0] - 2026-11-05

### Added

- Commit checks (Husky, lint-staged, commitlint), ESLint with typed rules, GitHub Actions CI, Dependabot
- `@compass/shared` package with task and pagination schemas

### Fixed

- Partial task updates no longer receive default values
- Shared package manifest was missing from the first merge

### Changed

- TypeScript pinned to 6.x (ADR 0002)
