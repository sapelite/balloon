# ADR-0001: Single Next.js app, split via route groups

**Date**: 2026-04-15
**Status**: accepted
**Deciders**: Alex (founder), Claude (assistant)

## Context

The project is becoming two distinct sites — a fast-conversion traveler funnel and a marketing-agency pitch for Bali businesses — with different voice, visual feel, and funnel shape, but sharing auth, database, session, and design tokens. We need structural separation without duplicating infrastructure.

## Decision

We keep one Next.js app. Traveler and business surfaces live in separate route groups: `src/app/(traveler)/` and `src/app/(business)/`, each with its own root layout, navbar, and footer. Shared primitives stay in `src/lib/` and `src/components/shared/`.

## Alternatives Considered

### Alternative 1: Two separate repos / deployments
- **Pros**: Hard isolation, independent release cadence, per-site bundle size.
- **Cons**: Duplicates auth, DB access, session, design tokens, CI. Doubles ops work.
- **Why not**: A solo founder can't afford two deploy surfaces; shared login/profile across the two sites is a product requirement.

### Alternative 2: Turborepo monorepo with shared packages
- **Pros**: Stronger module boundaries, explicit shared packages.
- **Cons**: Heavy tooling tax; overkill at current scale; slower local dev.
- **Why not**: We're pre-launch with one engineer. The added ceremony beats the value.

## Consequences

### Positive
- One deploy, one session, one DB. Login works across both surfaces natively.
- Clear visual separation via per-group layouts and navbars.
- Easy to move a route between groups if positioning shifts.

### Negative
- Discipline required: no importing `(business)` components from `(traveler)` and vice versa.
- Tailwind tokens bleed across both surfaces; differentiation happens via per-layout accent classes, not separate themes.

### Risks
- Drift between the two site voices if one person edits both in one sitting. Mitigation: run `design-system` skill before any cross-group commit.
