# ADR-0006: Restructure deletion manifest

**Date**: 2026-04-15
**Status**: accepted
**Deciders**: Alex (founder), Claude (assistant)

## Context

The restructure defined in ADR-0001 through ADR-0005 invalidates ~15% of the codebase. Leaving dead code creates cognitive drift, bloats typecheck time, and hides bugs. We need an explicit, auditable manifest of what disappears in Phase 1 of the restructure before the rebuild starts.

## Decision

In Phase 1, we delete the items below. Items under "Keep, re-evaluate" are intentionally preserved and revisited in later phases.

### Safe deletes (0 risk)
- `src/app/investors/**/*` (3 files)
- `src/app/dashboard/InvestorDashboardClient.tsx`
- `src/app/trip-guide/**/*` (2 files) — replaced by the package picker
- `src/app/api/waitlist/route.ts` — no surviving UI; lead capture moves to WhatsApp handoff
- `Waitlist` Prisma model

### Delete with surrounding edits
- Homepage filler components: `Competitors.tsx`, `SocialProof.tsx`, `TrustStrip.tsx`, `MobileStickyCTA.tsx`, `CTA.tsx`
- `INVESTOR_STEPS` array and investor branch in `OnboardingClient.tsx`
- Investor pill in `Navbar.tsx` and `BusinessNavbar.tsx` (desktop + mobile variants)
- Investor link in `Footer.tsx`
- `"investor"` from audience enum across `src/lib/session.ts`, `/api/audience`, `/api/profile`
- Legacy `"business"` → `"entrepreneur"` back-compat in `getAudienceCookie` (no live traffic predates the new enum)

### Keep, re-evaluate in later phases
- `/guides/*` + `/api/guides` — retained as SEO/lead-magnet surface even though not in the primary funnel. Decision revisited in Phase 4.
- `/partners/*` + `/api/partners` — repositioned as social proof ("hotels we work with") on the new traveler homepage. Kept as-is structurally.
- `HowItWorks.tsx`, `FAQ.tsx`, `Partners.tsx` — retained but fully rewritten for copy in Phase 3.

## Alternatives Considered

### Alternative 1: Move deleted files to `src/archive/`
- **Pros**: Easy un-delete without git operations.
- **Cons**: Still imported by TypeScript, still shows up in searches, still rots.
- **Why not**: Git history is already the un-delete mechanism.

### Alternative 2: Gate deleted features behind a feature flag
- **Pros**: Can re-enable per environment.
- **Cons**: Doubles every touched file with conditionals; flag sprawl within months.
- **Why not**: The decisions above are not experimental — they're positioning choices.

## Consequences

### Positive
- ~1,800 LoC removed; typecheck and build both get faster.
- Clearer codebase mental model; less ambiguity about which surfaces are active.
- Forces explicit rebuild decisions instead of implicit legacy drag.

### Negative
- Un-deletion requires `git revert`. This is a feature, not a bug.

### Risks
- Accidentally deleting a load-bearing import that the audit missed. Mitigation: run `npx tsc --noEmit` after each batch of deletions; fix errors before moving on. Commit after each successful batch so bisecting is cheap if a problem surfaces later.
