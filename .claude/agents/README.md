# Subagents — Agentaily Design System

Project subagents for **`@agentaily/design-system`**, the upstream **component library** (light-first monochrome React + Storybook). Each has a single responsibility, least-privilege tools, and communicates through **durable artifacts** — for this repo the artifacts are the **mirrored component files** (`.jsx` / `.d.ts` / `.prompt.md` / `.stories.jsx`), the **`.design-baseline/` snapshot**, `DESIGN.md`, and structured review reports. **This project is self-contained**: the model below + the verification recipe are the agents' shared truth — no external skill needed beyond the ones an agent explicitly loads (`design-sync` / `changesets-auto-release`).

> ⚠️ This is **NOT a double-loop-TDD product** like `form-design`. There is **no `src/core` logic layer, no authored SPEC/Gherkin `features/`, and no unit/integration/e2e test suite**. Components are a **verbatim mirror** of a claude.ai/design handoff; the only repo-authored code is each component's `.stories.jsx`. So the classic 5-agent roster is **deliberately tailored down** (see "Why this roster" below). Don't reintroduce `spec-architect` / `implementer` / `outer-tester` / `designer` here — they have nothing to own.

## Roster (4 agents)

| Agent           | Owns                                                                                                                                                                                                                       | Doesn't touch                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `design-syncer` | Landing/updating handoffs via the **`design-sync` skill** (3-way merge into `.design-baseline/`); the mirrored `.jsx`/`.d.ts`/`.prompt.md` + repo-authored `.stories.jsx`; keeping component-count + consumer docs in sync | release/CI config, breaking-change notification, merging |
| `reviewer`      | Independent adversarial review (read-only): mirror fidelity, contract/stories completeness, dual-theme, tokens-only, no hand-edited barrel                                                                                 | editing any file                                         |
| `release-eng`   | Changesets auto-release · lefthook · Storybook→Pages · `build:lib`/`build-storybook` gates · **downstream breaking-change notification** (per `RELEASE.md`)                                                                | component source, stories, `.design-baseline/`           |
| `pr-analyst`    | Triage an incoming PR → classify / decompose / route (read-only)                                                                                                                                                           | implementing, designing, merging                         |

## Flow (mirror-sync + PR-driven)

```
PR (task ticket) ─► pr-analyst ─► classify + route ──────────────────────┐
Claude Design handoff link ─► design-syncer ─► design-sync 3-way merge ───┤
                                              (mirrored .jsx/.d.ts/.prompt.md
                                               + repo-authored .stories.jsx
                                               + gen:barrel + doc/count sync)
                                                                          ▼
                                                       reviewer  (independent, read-only)
                                                       ─► findings + verdict (ship | fix-first)
                                                                          ▼
                                                       release-eng  (changeset → Pages → npm publish
                                                                      + notify breaking downstreams)
```

## Principles (the hard rules — this project's methodology truth)

- **Contract-first via artifacts** — hand off through the mirrored files + `.design-baseline/` snapshot + structured review reports, not prose. `DESIGN.md` is the upstream handoff mirror; the per-component `.d.ts` + `.prompt.md` are the consumer contract.
- **Mirror fidelity over invention** — components are a **verbatim mirror** of the handoff; the only thing the repo authors is `.stories.jsx`. Land handoffs through **`design-sync`** (base = last `.design-baseline/` snapshot, new = handoff, local = this repo), **never hand-search a UI** and never re-spec a primitive.
- **Independent verification** — `reviewer` ≠ `design-syncer`; reviewer is read-only and adversarial (assumes the mirror drifted from the handoff and tries to prove it).
- **Least privilege** — tools encode the boundary (reviewer has no Write; pr-analyst has no Write).
- **Don't hand-edit generated/upstream artifacts** — `src/index.js` is generated by `gen:barrel`; `.d.ts` is copied verbatim from the handoff; `DESIGN.md` is the handoff mirror. Prettier never touches `.d.ts` / `DESIGN.md`, and **never run repo-wide prettier** — lefthook formats only staged files.
- **Parallelism needs isolation** — concurrent work runs in separate git worktrees (`git worktree add <dir> origin/main`) so the shared barrel / baseline aren't clobbered.
- **Persistent memory** — each agent carries `memory: project` + a `# Persistent Agent Memory` block; learnings accrue into `.claude/agent-memory/<agent>/` (per-agent, project-scoped, version-controlled & team-shared) and survive across conversations.

## Why this roster (what got cut, and why)

This is a **mirror library**, so the double-loop TDD roster doesn't map 1:1:

- **`spec-architect` — cut.** There's no authored `SPEC.md` and no Gherkin `features/`. The "what" comes from **upstream Claude Design** (mirrored into `DESIGN.md`), not authored here. The contract layer that _does_ exist (per-component `.d.ts` + `.prompt.md`) is **copied with the handoff**, owned by `design-syncer`, not invented.
- **`implementer` — cut.** There is no `src/core` logic layer and no red→green→refactor inner loop — components are mirrored, not written. The closest real role is **`design-syncer`** (lands the mirror + authors stories).
- **`outer-tester` — cut.** There is no unit / integration / e2e suite (no vitest, no Playwright). Verification is **`npm run build:lib && npm run build-storybook`** + reviewing every variant/state as a Storybook story in **both themes**. There's no behavior suite for an outer-tester to own.
- **`designer` — not installed.** `designer` is for products that _consume_ a design system via their own Claude Design project. **This repo IS the design system** — it doesn't consume another one. Its design-ingest need (landing handoffs from _its own_ upstream Claude Design project) is owned by **`design-syncer`** instead.

If this repo ever grows a real logic layer (e.g. richer headless hooks with their own tests), reintroduce `implementer` + a unit-test gate and a `TESTING.md` at that point — don't pre-stub them.

## Verification recipe (the "done" gate — replaces a TESTING.md)

There is no test pyramid here. "Done" for a component change is:

```bash
npm run gen:barrel        # regenerate the public entry (pre-commit also auto-runs this)
npm run build:lib         # ESM lib build — pre-push gate; catches broken exports/imports
npm run build-storybook   # static Storybook — catches broken stories
```

Plus, by eye in Storybook (`npm run storybook`): every variant/state has a story, and it reads correctly in **both `paper` (light, default) and `ink` (dark)** via the toolbar theme switch. Tokens only — no hand-rolled values where a token exists. Update the component count (barrel-module count **and** `DESIGN.md`'s "component exports" count) and consumer docs (`.prompt.md` / `README.md` / `skill/SKILL.md` / `ROADMAP.md`) + add a changeset in the **same change**.

## Invocation

Invoke via the Agent tool (`subagent_type: <name>`). The main loop stays the **orchestrator**: it triages incoming PRs (route via `pr-analyst`), lands handoffs (`design-syncer`), gets an independent `reviewer` pass, then `release-eng` ships. **Project-level agents override global same-name agents.**
