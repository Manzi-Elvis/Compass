# ADR 0002: Pin TypeScript to 6.x

**Status:** Accepted (revisit when typescript-eslint supports TypeScript 7)

## Context

TypeScript 7.0 was installed first. typescript-eslint refuses to run against it
(tracking issue: typescript-eslint/typescript-eslint#10940), which blocks typed linting.

## Decision

Pin the workspace to TypeScript 6.x until typescript-eslint supports the newer major version.

## Consequences

- Typed lint rules work in the editor, locally and in CI
- We forgo TypeScript 7 improvements for now
- Upgrade is a single small `chore` change once support lands
