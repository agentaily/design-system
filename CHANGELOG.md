# @agentaily/design-system

## 0.5.0

### Minor Changes

- [#9](https://github.com/agentaily/design-system/pull/9) [`64629e7`](https://github.com/agentaily/design-system/commit/64629e7a1a45221b80ade3e9eaa58e7f711e2f11) Thanks [@yarnovo](https://github.com/yarnovo)! - Add backward-compatible backend seams to `IntegrationSettings` and `SignInPage` (contracts requested by downstream consumers — pass nothing and behavior is unchanged).

  - **`IntegrationSettings` — controlled / backend-wired (BYOK) seam.** New optional props let a caller own the config and reach a real backend instead of the built-in localStorage: `value` + `onChange` (controlled config; when `value` is passed the modal stops touching localStorage), `onSave(value)` → `Promise` (Save disables + spins while pending, marks saved on resolve, stays dirty on reject), `onTest(which)` → `Promise<{ ok, message }>` (drives the per-card `StatusPill` + `TestRow`; falls back to the built-in mock probe when omitted), `readiness` (external `{ deepseek, feishu }` override for the 0/2 rail, Save gating, and the green pills), and `masked` (stored secrets echo as a masked placeholder with an empty value and are never re-submitted; typing overrides the mask). Omit all of them and the component self-persists to localStorage exactly as before.
  - **`SignInPage` — backend-error + submit-busy seam.** New optional props: `error` (ReactNode shown in a danger banner directly above the submit button for server failures like 409/401/400; caller-owned, cleared by you) and `submitting` (disables the submit button, shows a spinner, and blocks double-submit while an async `onSubmit` is in flight). Client-side validation is unchanged; the component still owns and clears its own field errors on input/mode change.

  Both ship updated `.d.ts` + `.prompt.md` (controlled + async wiring examples) and new Storybook stories.

## 0.4.0

### Minor Changes

- [#7](https://github.com/agentaily/design-system/pull/7) [`bb7af40`](https://github.com/agentaily/design-system/commit/bb7af407f960a3960cb8bf062eb6b51c07cc5353) Thanks [@yarnovo](https://github.com/yarnovo)! - Add the `RotatingTagline` brand component and align `SignInPage` to use it.

  - **New `utilities/RotatingTagline`** — the animated brand headline: a fixed `prefix` then `phrases[]` that type in, hold, delete, and advance; the rotating phrase wears the flowing geek-rainbow gradient with a trailing block cursor that blinks only at rest. Props: `prefix` / `phrases` / `gradient` / `cursor` / `breakAfterPrefix` / `typeSpeed` / `deleteSpeed` / `hold` / `flowDuration` / `className`. Self-handles `prefers-reduced-motion` (whole-phrase swap, no flow). Now 113 components.
  - **`SignInPage`** — the brand-panel tagline is now a `RotatingTagline` (new `tagline` prop passes through to it). All user-facing strings moved into a layered, deep-mergeable `copy` prop (signin/signup + labels + placeholders + errors + terms) with an English baseline. Desktop tagline enlarged (`clamp(40px, 4.4vw, --text-hero)`, nowrap); mobile reworked — brand panel collapses, compact in-card logo + tagline, `SIGN IN` demoted to a mono label, left-aligned with roomier spacing.

## 0.3.0

### Minor Changes

- [#4](https://github.com/agentaily/design-system/pull/4) [`636a97c`](https://github.com/agentaily/design-system/commit/636a97c145481663f335b261edf0e9b818c4565d) Thanks [@yarnovo](https://github.com/yarnovo)! - Sync the latest Claude Design handoff (`6Ovub8OJ`): light-first theme flip, 16 new components, and a `Queue.useQueue` hook.

  - **BREAKING (visual): default theme flipped dark → light.** `:root` is now the `paper` (light) scale; the `ink` (dark) scale moved to `[data-theme="dark"]`. Consumers who relied on the dark default must add `data-theme="dark"` to opt back in. Shadow tokens and per-component theme overrides flipped to match.
  - **New layout tokens** `--topbar-h` (52px) and `--bar-h` (48px) so app/pane bars align.
  - **16 new components across 3 new categories + existing ones** (112 total): `auth/` (`AuthDialog` + `AuthDialog.useAuth`, `AccountControl`, `SignInPage`), `settings/` (`IntegrationSettings`, `SecretField`, `StatusPill`, `TestRow`, `HelpSteps`), `review/` (`MarkupLayer`), plus `layout/` full-page shells (`AppShell`, `DesignerShell`, `DocsLayout`, `SettingsPage`), `chat/ConversationThread`, and `utilities/` (`Icon`, `BrandMark`).
  - **`Queue.useQueue`** — headless keep-sending-while-busy buffer, exposed as a static on `Queue` (pairs with `ConversationThread`).

## 0.2.0

### Minor Changes

- [#2](https://github.com/agentaily/design-system/pull/2) [`55bc378`](https://github.com/agentaily/design-system/commit/55bc378cfb13f060c46e50a95a78b91856f21889) Thanks [@yarnovo](https://github.com/yarnovo)! - Add the production-grade form layer (synced from Claude Design `RbM7-_aESQSDeDy1U-T1NQ`).

  - **New `Form` / `FormActions`** layout primitives (`gap`, `align`, `bordered`, `full`) — pure structure, no state.
  - **New `Form.useForm`** — optional, zero-dependency controlled hook with an API aligned to react-hook-form: validation modes (`onSubmit/onBlur/onChange/onTouched/all` + `reValidateMode`), per-field rules (`required/minLength/maxLength/min/max/pattern/validate`, incl. async), schema-style `validate(values)`, imperative `trigger/setError/clearErrors/setValue/getValues/watch/reset`, dual-signature `handleSubmit`, and full `formState`. Presentational controls never depend on it — swap in RHF/TanStack and they still work.
  - **New `Form.useFieldArray`** — dynamic lists (`append/prepend/remove/insert/move/replace/update`) with stable per-row `id`s.
  - **`Input`** gains a `required` prop (red asterisk on the label + native `required`); the error state now uses an `outline` ring so it survives overlay/instrumentation layers and never shifts layout.

## 0.1.1

### Patch Changes

- [`1af5ce3`](https://github.com/agentaily/design-system/commit/1af5ce3d0bb60503b666bbdc054124bf9391b91b) Thanks [@yarnbcoder-lgtm](https://github.com/yarnbcoder-lgtm)! - Verify the automated release pipeline (Changesets + OIDC trusted publishing). No functional changes — component code is identical to 0.1.0.
