# ADR-0005: WhatsApp + email handoff as canonical fulfillment

**Date**: 2026-04-15
**Status**: accepted
**Deciders**: Alex (founder), Claude (assistant)

## Context

Every transaction on the platform — paid traveler package, agency call request, bespoke quote — depends on human follow-up to build trust and close. Trip quality perception hinges on the first human touchpoint. The 24/7 concierge promise requires a real human channel, not a ticketing queue.

## Decision

Every checkout success page and every lead form ends in a **WhatsApp DM (primary) + email (backup)** from the concierge, with a target SLA of 2 minutes during ops hours. The confirmation page states explicitly: *"We're DMing you on WhatsApp now."* Booking data, package selection, and contact preferences are packed into a structured internal notification (Slack webhook or email to ops) triggered on purchase success.

WhatsApp and email contacts are stored as environment variables (`NEXT_PUBLIC_CONCIERGE_WA`, `NEXT_PUBLIC_CONCIERGE_EMAIL`) so they can be rotated without code changes. No purely-digital fulfillment flow exists.

## Alternatives Considered

### Alternative 1: Fully automated email-only fulfillment
- **Pros**: Scales infinitely, zero labor cost per sale.
- **Cons**: Kills the 24/7 concierge promise; makes Skyrol indistinguishable from Booking.com.
- **Why not**: The human touch is the product.

### Alternative 2: Build in-app chat (Intercom-style)
- **Pros**: Data stays on our platform; better analytics.
- **Cons**: Requires infrastructure we don't have; users don't return to the app between trips; push notifications are unreliable.
- **Why not**: WhatsApp is where Bali travelers already communicate daily. Meet them where they are.

### Alternative 3: Ticketing system (Zendesk / Freshdesk)
- **Pros**: Robust ops tooling, SLA tracking.
- **Cons**: Adds a SaaS subscription, a new UI for the ops team to learn, and a cold ticket feel.
- **Why not**: Premature at current scale. Revisit when WhatsApp volume becomes unmanageable.

## Consequences

### Positive
- Massive trust gain at the critical purchase moment.
- No new SaaS tools to buy or learn initially.
- Every transaction yields a direct human conversation — best source of product feedback.

### Negative
- Labor scales linearly with sales until volume justifies automation.
- 24/7 SLA requires an on-call rotation (or explicit "ops hours" caveat in the meantime).
- Message templates, not full automation, must be built and maintained.

### Risks
- WhatsApp account gets flagged/banned for spam behavior. Mitigation: use WhatsApp Business API (not personal numbers) and keep message cadence human.
- Ops can't keep up with the 2-minute SLA. Mitigation: soft-launch with "ops hours 08:00–22:00 Bali time" and a "we'll reply within an hour outside these hours" fallback. Tighten SLA as staffing grows.
