# Subagents — Agentaily Design System

Project subagents for **`@agentaily/design-system`**, the upstream **component library** (light-first monochrome React + Storybook). Each has a single responsibility, least-privilege tools, and communicates through **durable artifacts** — for this repo the artifacts are the **mirrored component files** (`.jsx` / `.d.ts` / `.prompt.md` / `.stories.jsx`), the **`.design-baseline/` snapshot**, `DESIGN.md`, and structured review reports. **This project is self-contained**: the model below + the verification recipe are the agents' shared truth — no external skill needed beyond the ones an agent explicitly loads (`design-sync` / `changesets-auto-release`).

> ⚠️ This is **still not a double-loop-TDD product** like `form-design`. There is **no `src/core` logic layer, no authored SPEC/Gherkin `features/`, and no integration/e2e suite**. Components are a **verbatim mirror** of a claude.ai/design handoff; the only repo-authored code is each component's `.stories.jsx` **plus the unit tests in `tests/`**. But the library has now grown its first **logic-bearing primitive** — `<Markdown>` (markdown parser + XSS sanitizer + streaming tolerance) — so, exactly as this file predicted, a **`vitest` unit-test gate + `implementer` + [`TESTING.md`](../../TESTING.md)** have been reintroduced for that thin logic layer. The roster is **still tailored** (see "Why this roster"): `spec-architect` / `outer-tester` / `designer` remain cut — don't reintroduce them, they have nothing to own.

## Roster (5 agents)

| Agent           | Owns                                                                                                                                                                                                                                 | Doesn't touch                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| `design-syncer` | Landing/updating handoffs via the **`design-sync` skill** (3-way merge into `.design-baseline/`); the mirrored `.jsx`/`.d.ts`/`.prompt.md` + repo-authored `.stories.jsx`; keeping component-count + consumer docs in sync           | release/CI config, breaking-change notification, merging              |
| `implementer`   | The **inner unit-test loop** for logic-bearing primitives (parser/sanitizer/stateful hooks — today `<Markdown>`): writes the failing `tests/` unit test + brings it green (red→green→refactor). See [`TESTING.md`](../../TESTING.md) | the verbatim mirror files (`src/components/**`), handoffs, release/CI |
| `reviewer`      | Independent adversarial review (read-only): mirror fidelity, contract/stories completeness, dual-theme, tokens-only, no hand-edited barrel, **unit-test quality + security contract**                                                | editing any file                                                      |
| `release-eng`   | Changesets auto-release · lefthook · Storybook→Pages · `build:lib`/`build-storybook`/`test` gates · **downstream breaking-change notification** (per `RELEASE.md`)                                                                   | component source, stories, tests, `.design-baseline/`                 |

## Flow (mirror-sync + PR-driven)

```
PR (task ticket) ─► worker self-triage ─► classify + route ──────────────┐
Claude Design handoff link ─► design-syncer ─► design-sync 3-way merge ───┤
                                              (mirrored .jsx/.d.ts/.prompt.md
                                               + repo-authored .stories.jsx
                                               + gen:barrel + doc/count sync)
logic-bearing primitive (e.g. <Markdown>) ─► implementer ─────────────────┤
                                              (red→green→refactor unit test
                                               in tests/ ONLY · npm test gate)
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
- **Least privilege** — tools encode the boundary (reviewer has no Write).
- **Don't hand-edit generated/upstream artifacts** — `src/index.js` is generated by `gen:barrel`; `.d.ts` is copied verbatim from the handoff; `DESIGN.md` is the handoff mirror. Prettier never touches `.d.ts` / `DESIGN.md`, and **never run repo-wide prettier** — lefthook formats only staged files.
- **Parallelism needs isolation** — concurrent work runs in separate git worktrees (`git worktree add <dir> origin/main`) so the shared barrel / baseline aren't clobbered.
- **Persistent memory** — each agent carries `memory: project` + a `# Persistent Agent Memory` block; learnings accrue into `.claude/agent-memory/<agent>/` (per-agent, project-scoped, version-controlled & team-shared) and survive across conversations.

## Why this roster (what got cut, and why)

This is a **mirror library**, so the double-loop TDD roster doesn't map 1:1:

- **`spec-architect` — cut.** There's no authored `SPEC.md` and no Gherkin `features/`. The "what" comes from **upstream Claude Design** (mirrored into `DESIGN.md`), not authored here. The contract layer that _does_ exist (per-component `.d.ts` + `.prompt.md`) is **copied with the handoff**, owned by `design-syncer`, not invented.
- **`implementer` — reintroduced (tailored).** The library grew its first real logic primitive — `<Markdown>` (markdown parser + XSS sanitizer + streaming tolerance) — so it now has a red→green→refactor inner loop and a `vitest` unit gate. `implementer` owns that loop, but **tailored**: it writes tests **only in `tests/`** and **never hand-edits the verbatim mirror** (a real bug in a mirror component is escalated upstream to `design-syncer` / a human, not patched here). Most components are still presentational mirrors with nothing to unit-test — see [`TESTING.md`](../../TESTING.md).
- **`outer-tester` — still cut.** There's a `vitest` **unit** gate now (owned by `implementer`), but no **integration / e2e** suite (no Playwright) and no `features/` to realize. Verification beyond unit is still **`npm run build:lib && npm run build-storybook`** + reviewing every variant/state as a Storybook story in **both themes**. Nothing for a separate outer-tester to own yet — revisit if interaction/e2e via the Storybook test-runner gets wired (the deferred layers in `TESTING.md`).
- **`designer` — not installed.** `designer` is for products that _consume_ a design system via their own Claude Design project. **This repo IS the design system** — it doesn't consume another one. Its design-ingest need (landing handoffs from _its own_ upstream Claude Design project) is owned by **`design-syncer`** instead.

That prophecy has now partially fired: `<Markdown>` was the logic layer, so `implementer` + a `vitest` unit gate + [`TESTING.md`](../../TESTING.md) are in. If a **further** layer appears (integration/e2e needs, or `spec-architect`-level behavior contracts), reintroduce the matching role _then_ — still don't pre-stub.

## Verification recipe (the "done" gate — full detail in [`TESTING.md`](../../TESTING.md))

The test posture and layering now live in **[`TESTING.md`](../../TESTING.md)** (this repo grew its first logic primitive — `<Markdown>` — so it has a `vitest` unit gate; most components remain presentational mirrors with nothing to unit-test). "Done" for a change is:

```bash
npm test                  # unit gate — vitest (logic primitives; also runs on pre-push)
npm run gen:barrel        # regenerate the public entry (pre-commit also auto-runs this)
npm run build:lib         # ESM lib build — pre-push gate; catches broken exports/imports
npm run build-storybook   # static Storybook — catches broken stories
```

Plus, by eye in Storybook (`npm run storybook`): every variant/state has a story, and it reads correctly in **both `paper` (light, default) and `ink` (dark)** via the toolbar theme switch. Tokens only — no hand-rolled values where a token exists. Update the component count (barrel-module count **and** `DESIGN.md`'s "component exports" count) and consumer docs (`.prompt.md` / `README.md` / `skill/SKILL.md` / `ROADMAP.md`) + add a changeset in the **same change**.

## Invocation

Invoke via the Agent tool (`subagent_type: <name>`). The main loop stays the **orchestrator**: the worker self-triages incoming PRs, lands handoffs (`design-syncer`), gets an independent `reviewer` pass, then `release-eng` ships. **Project-level agents override global same-name agents.**
