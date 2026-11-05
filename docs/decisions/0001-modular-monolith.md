# ADR 0001: Start with a modular monolith

**Status:** Accepted

## Context

COMPASS needs fast early development, simple deployment and low cost, with a path to scale.

## Decision

One deployable Express API, split internally into business modules (tasks, habits, journal and so on).

## Consequences

- Easy debugging and deployment
- Module boundaries stay explicit, so services can be extracted later if measurements justify it
- Avoids distributed-system complexity before it is needed
