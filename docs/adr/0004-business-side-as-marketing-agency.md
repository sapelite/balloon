# ADR-0004: `/business` is a marketing agency, not a SaaS

**Date**: 2026-04-15
**Status**: accepted
**Deciders**: Alex (founder), Claude (assistant)

## Context

The current `/business` page pitches like a modular SaaS dashboard — "CRM & social dashboard," "custom backend upsell," "modular offer — pick what you need." The actual business model is done-for-you marketing agency: brand identity, websites, content, video production, influencer partnerships, paid ads. The copy audit flagged the drift explicitly. Selling a dashboard when the deliverable is an agency retainer confuses buyers and caps pricing.

## Decision

We reposition `/business` as a full-service marketing agency for Bali restaurants, spas, villas, and influencers. Page structure:

1. **Proof** — a real client case study with named metrics (e.g., "We grew [Restaurant] from 2.3k → 18k followers in 6 months").
2. **How we work** — audit → brand identity → website → content calendar → ongoing social + ads, as a visual phased timeline.
3. **Packages & call-booking CTA** — two or three retainer tiers with "book a call" as the primary CTA.

The existing `BusinessDashboardClient` becomes a post-sale deliverable accessible at `/business/dashboard` (already gated by `businessClient` DB row). It is no longer surfaced as the pitch. The "modular à la carte" language is removed. Entrepreneur-path onboarding is kept as a lead-qualification form (not public marketing).

**Launch gate**: at least one real client case study with named metrics must exist before `/business` goes live. Until then, the page ships behind a "Launch partner — coming soon" placeholder.

## Alternatives Considered

### Alternative 1: Double down on the SaaS dashboard pitch
- **Pros**: Existing code matches; dashboard is the biggest asset already built.
- **Cons**: Mismatches the real revenue motion (retainers, not subscriptions).
- **Why not**: You sell what you actually deliver.

### Alternative 2: Pure services site, delete the dashboard entirely
- **Pros**: Cleanest positioning; less code to maintain.
- **Cons**: Throws away a working retention/reporting tool that's already built and seeded.
- **Why not**: Dashboard is a valid retention hook; it just shouldn't be the pitch.

## Consequences

### Positive
- Higher ticket, clearer positioning, cleaner sales conversation.
- Dashboard becomes a "wow, you also get this" moment post-sale instead of confusing pre-sale feature.
- Aligns the pitch with how Bali businesses actually buy (relationships + retainers).

### Negative
- Longer sales cycle. Requires "book a call" infrastructure (Calendly or equivalent).
- Requires one real case study before launch. Ships behind a placeholder until then.

### Risks
- Case study gate slips the launch. Mitigation: soft-launch `/business` with aggregate portfolio numbers ("7 Bali businesses, +250% avg engagement lift") if a named client isn't ready within 30 days.
