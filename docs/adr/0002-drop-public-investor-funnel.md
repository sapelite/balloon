# ADR-0002: Drop the public investor funnel

**Date**: 2026-04-15
**Status**: accepted
**Deciders**: Alex (founder), Claude (assistant)

## Context

Investor traffic is a tiny fraction of expected visits, investor deals close through high-touch sales calls (never from a landing page), and maintaining a dedicated public funnel drags on positioning and code. The current `/investors` page, investor onboarding branch, and investor dashboard variant collectively add ~400 LoC and ~3 user-facing surfaces for near-zero ROI.

## Decision

We delete `/investors/*`, the `"investor"` value from the audience enum, the investor branch in onboarding, `InvestorDashboardClient`, and the investor pill in the nav. Investor inquiries route to a single footer link: `invest@skyrol.bali`. The "we live here · every operator vetted in person" angle from the deleted page gets salvaged into the traveler trust section and the business agency pitch.

## Alternatives Considered

### Alternative 1: Keep but hide behind auth
- **Pros**: Option to re-activate without rebuild.
- **Cons**: Still a maintained route, still drifts with each codebase change.
- **Why not**: Dormant code rots. Git history preserves it if we ever want it back.

### Alternative 2: Redirect `/investors` to a contact form
- **Pros**: Captures intent.
- **Cons**: Form adds friction vs. a direct email; we'd maintain another surface.
- **Why not**: Direct email is lower friction and signals "you'll get a human, fast."

## Consequences

### Positive
- ~400 LoC removed; smaller mental model.
- Positioning tightens to two audiences (travelers, businesses), which are the actual revenue drivers.
- Best copy from the deleted page is reused, not wasted.

### Negative
- Any SEO equity on investor-related queries disappears. (We weren't ranking anyway.)
- If an investor trend emerges later, we rebuild from scratch.

### Risks
- Losing a specific past visitor who bookmarked `/investors`. Mitigation: the route will 404, which is fine; the footer email is discoverable.
