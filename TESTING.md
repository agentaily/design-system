# TESTING.md — Agentaily Design System

How this repo tests, what gets tested where, and the guardrails. This is a
**verbatim-mirror component library**, so its testing posture is deliberately
different from a logic-heavy product — read the philosophy first, it explains why
there are 30 tests and not 3000.

## Philosophy — test logic, not mirrors

~115 components here are a **literal mirror** of a claude.ai/design handoff
(`.jsx` + `.d.ts` + `.prompt.md`, with a repo-authored `.stories.jsx`). The vast
majority are **presentational** — they take props and render tokens. For those,
"does it render / does it read right in both themes" is already covered by:

- `npm run build:lib` — the ESM lib build (catches broken exports/imports), and
- `npm run build-storybook` + Storybook-by-eye in **`paper` (light)** and **`ink` (dark)**.

Unit tests are reserved for the **rare primitive with real, dangerous logic** —
a parser, an XSS sanitizer, a stateful headless hook (`useForm` / `useAuth` /
`useQueue`), derived computation. Those have failure modes (security holes,
crashes on edge input) that eyeballing **cannot** exhaustively catch. **Don't
write a unit test for a presentational mirror** — there's nothing to assert
beyond "it renders", and the build + Storybook already prove that.

The first (and currently only) component that earns a suite is **`<Markdown>`**
(`src/components/chat/Markdown.jsx`): markdown → React-node parsing, URL-scheme
sanitization, and streaming-tolerant degradation. Its failure modes are
**security** (`javascript:` / `data:` href injection, raw-HTML injection) and
**crashes** (a half-streamed `**` / fence / table throwing mid-stream).

> This suite is the realization of the prophecy in `.claude/agents/README.md`:
> _"If this repo ever grows a real logic layer … reintroduce `implementer` + a
> unit-test gate and a `TESTING.md` at that point."_ `<Markdown>` is that moment.

## Layering (what we test where)

| Layer                 | Status  | Tool                                                       | What it covers                                                                                   |
| --------------------- | ------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Unit**              | **now** | `vitest` + `@testing-library/react` + `jsdom`              | Logic-bearing primitives: parsing, sanitization, streaming tolerance, stateful-hook transitions. |
| **Visual regression** | later   | reuse the ~120 stories + Storybook test-runner / Chromatic | Per-component pixel/diff across `paper` + `ink`.                                                 |
| **Interaction**       | later   | Storybook `play()` + `@storybook/test-runner`              | Keyboard / focus / open-close flows, driven from the existing stories.                           |
| **a11y**              | later   | `axe` via the test-runner                                  | Roles, labels, contrast.                                                                         |

Unit is the only layer wired today; the rest are intentionally deferred (the
stories already exist and are the natural substrate for them). Add them when a
real need appears, not pre-emptively.

## Guardrails (the hard rules)

1. **Tests live OUTSIDE the mirror — always in `tests/`.** Never put a test file
   next to or inside `src/components/**`. The component `.jsx` / `.d.ts` /
   `.prompt.md` are a **verbatim Claude Design mirror**, owned by `design-syncer`
   and re-landed by the `design-sync` skill — a test sitting in the mirror would
   be **clobbered on the next re-sync**. `vitest.config.js` only picks up
   `tests/**/*.test.{js,jsx}`.
2. **A failing test on a mirror component is an upstream signal, not a patch
   target.** If a unit test proves a mirror component has a real bug, **do not
   hand-edit the component** — its logic comes from upstream Claude Design.
   Escalate: re-sync from a corrected handoff via `design-syncer`, or ask a human
   (upstream design decision). The test's job is to _pin the contract_.
3. **Assert behavior / contract, not snapshot trivia.** Query DOM structure,
   roles, attributes, escaping via `@testing-library/react`. **No DOM snapshots**
   — they break on cosmetic handoff churn and pin nothing meaningful. Cover the
   dangerous edges (XSS, crash-on-partial-input), not just the happy path.
4. **Never run repo-wide prettier.** lefthook formats only staged files.

## How to run

```bash
npm test            # vitest run — the CI / pre-push gate
npm run test:watch  # vitest watch — the local inner TDD loop (red → green → refactor)
```

## The "done" gate (for a logic change)

A change that touches logic-bearing code is done when **all three** are green:

```bash
npm test                  # unit gate — vitest
npm run build:lib         # ESM lib build — catches broken exports/imports
npm run build-storybook   # static Storybook — catches broken stories
```

Plus, for any component change, the by-eye Storybook pass in **both themes** and
the doc/count sync described in `.claude/agents/README.md` still apply. `npm test`
also runs automatically on **pre-push** (lefthook), alongside `build:lib`.

## Who drives it

The **`implementer`** agent owns the inner unit-test loop (writes the failing
test, brings it green, refactors — same hand), strictly within `tests/`. The
**`reviewer`** independently re-checks test quality and the security contract.
See `.claude/agents/README.md` for the full roster.
