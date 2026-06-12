---
"@agentaily/design-system": minor
---

Add the `RotatingTagline` brand component and align `SignInPage` to use it.

- **New `utilities/RotatingTagline`** — the animated brand headline: a fixed `prefix` then `phrases[]` that type in, hold, delete, and advance; the rotating phrase wears the flowing geek-rainbow gradient with a trailing block cursor that blinks only at rest. Props: `prefix` / `phrases` / `gradient` / `cursor` / `breakAfterPrefix` / `typeSpeed` / `deleteSpeed` / `hold` / `flowDuration` / `className`. Self-handles `prefers-reduced-motion` (whole-phrase swap, no flow). Now 113 components.
- **`SignInPage`** — the brand-panel tagline is now a `RotatingTagline` (new `tagline` prop passes through to it). All user-facing strings moved into a layered, deep-mergeable `copy` prop (signin/signup + labels + placeholders + errors + terms) with an English baseline. Desktop tagline enlarged (`clamp(40px, 4.4vw, --text-hero)`, nowrap); mobile reworked — brand panel collapses, compact in-card logo + tagline, `SIGN IN` demoted to a mono label, left-aligned with roomier spacing.
