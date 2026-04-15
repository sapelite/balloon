# ADR-0003: "Bali in 10 seconds" — one-screen package picker

**Date**: 2026-04-15
**Status**: accepted
**Deciders**: Alex (founder), Claude (assistant)

## Context

The current traveler onboarding is a 6-question multi-step quiz. It contradicts the "Bali in 10 seconds" pitch, adds friction at the top of the funnel, and blocks checkout behind auth. Post-pivot, the traveler side exists to convert cold visitors into paid packages as fast as possible.

## Decision

We replace the quiz with a single-screen package picker driven by three toggle groups:

- **Area** — Canggu / Uluwatu / Ubud / any
- **Duration** — <1 week / 1–2 weeks / 2–4 weeks / 1 month+
- **Tier** — Quick Start (€800) / Signature (€1,490) / Premium (€2,900)

A live price ticker updates as toggles flip. One CTA: *"Continue to checkout."* **No auth required before checkout.** Email is collected at payment; an account is created silently post-pay. The 6-question quiz component (`OnboardingClient.tsx`) is removed for travelers (the entrepreneur path, which has different information needs, is kept or replaced separately in ADR-0004).

## Alternatives Considered

### Alternative 1: Keep the existing multi-step quiz
- **Pros**: Rich personalization data captured upfront.
- **Cons**: Kills conversion. Contradicts the "10 seconds" headline. Personalization isn't actually used post-form.
- **Why not**: Conversion optimization beats data collection pre-sale.

### Alternative 2: 20-option multiselect picker
- **Pros**: Feels bespoke, more hooks.
- **Cons**: Overwhelms a cold visitor; contradicts the "simple" pitch.
- **Why not**: Paradox of choice. Three toggles give the same personalization outcome with 10% of the cognitive load.

### Alternative 3: Gate checkout behind account creation
- **Pros**: Captures leads even if they abandon mid-checkout.
- **Cons**: Signup drops conversion ~20% at the top of funnel.
- **Why not**: The WhatsApp handoff (ADR-0005) is a much better lead-capture mechanism than a login wall.

## Consequences

### Positive
- Drastically lower friction from landing → checkout.
- One screen to test, one screen to instrument.
- Pricing transparency builds trust instantly.

### Negative
- Less upfront personalization data. Mitigated by the human WhatsApp handoff picking up context in conversation.
- Three tiers is a pricing commitment we can't A/B test easily without real traffic.

### Risks
- Anchoring wrong on Signature (€1,490). Mitigation: treat the first 60 days as a price-discovery period; the live price ticker makes it trivial to shift anchors.
- Quick Start at €800 may cannibalize Signature. Acceptable: Quick Start exists to kill sticker shock and prove the funnel converts.
