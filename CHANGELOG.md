# @agentaily/design-system

## 0.7.0

### Minor Changes

- [#16](https://github.com/agentaily/design-system/pull/16) [`6fbf758`](https://github.com/agentaily/design-system/commit/6fbf758040deb10465cb2a736ecf752089c7bd35) Thanks [@yarnovo](https://github.com/yarnovo)! - feat(chat): 新增 `<Markdown>` 原语 + `<Message>` 正文支持 markdown 渲染

  新增可组合的 `<Markdown>` 原语(`components/chat/Markdown`),把模型输出的 markdown 字符串渲染成排版好的、双主题的 React 节点:段落 + 软换行、加粗、斜体、删除线、行内代码、围栏代码块(复用 `CodeBlock`)、有序/无序/嵌套/任务列表、引用块(可嵌套)、GFM 表格(列对齐 + 溢出横向滚动)、水平线、`#`/`##`/`###` 标题、`[链接](url)` + 裸 URL 自动链接;图片 `![]()` 渲染为惰性占位 chip(不抓取)。

  `<Message>` 正文现在接受 markdown 字符串 —— 新增 `markdown` prop,或直接把字符串作为 children —— 经 `<Markdown>` 渲染;传 React-node children 仍原样渲染,**完全向后兼容**。

  安全:解析成 React 元素树后发出,不用 `dangerouslySetInnerHTML`(所有文本自动转义),链接 href 做协议净化(丢弃 `javascript:` / `data:` / `vbscript:`)。流式容错:半截表格 / 半截引用 / 未闭合标记与围栏降级为字面或部分渲染,流式中途不抛错。

  Net +1 component → 115 barrel modules / 148 exports。

## 0.6.0

### Minor Changes

- [#11](https://github.com/agentaily/design-system/pull/11) [`ab5bd2d`](https://github.com/agentaily/design-system/commit/ab5bd2dca4f7d42e81c81c007721b1381b208fa0) Thanks [@yarnovo](https://github.com/yarnovo)! - Replace the `IntegrationSettings` modal with two pure-display connection cards, and turn the BrandMark cursor off by default. Second round aligned with downstream `form-design` after the 0.5.0 backend-seam round — the seam approach was the wrong shape; state belongs to the caller, not the component.

  - **BREAKING — `IntegrationSettings` removed.** The all-in-one modal welded localStorage persistence + a Save bar + readiness gating onto the two cards; downstream hit hard walls (an empty `catch` swallowing `onSave` rejects, no backend-error slot, Save blocked by `allReady` so the "save → backend validates → 400" path was unreachable, and a built-in `localStorage` nobody downstream uses). It is gone, along with its internal `localStorage`. Consumers move to the two cards below and own their own config / persistence / Save / gating. The only current downstream (`form-design`) is switching to the cards, so this breaks no one in practice; on `0.x` it ships as a **minor**.
  - **New `settings/DeepSeekCard`** (LLM key) **+ `settings/FeishuCard`** (Feishu Bitable data sink) — **pure-display** connection cards: props in (per-field `value` / `onChange`, `status`, `result`, `masked`, field `error`s, `help`…), events out (`onTest`). **Zero state, zero localStorage, zero save bar, zero readiness gating** — the caller owns the config object, persistence, the Save button, backend-error display, and any "both connected?" gate (the same headless philosophy as `Form.useForm` / `Queue.useQueue`). Each composes `SecretField` / `StatusPill` / `TestRow` / `HelpSteps`; the masked-secret echo is derived from props (`masked && !value`) and is never re-submitted. Both ship `.d.ts` + `.prompt.md` (a controlled + backend-wired example) and Storybook stories, plus a `ConnectionCards` reference story where the caller owns the readiness rail + Save bar.
  - **`BrandMark` `cursor` now defaults to `false`.** The block cursor (a brand liveness motif) is off by default so every layout shell (`DesignerShell` / `SignInPage` / `AppShell` / `SettingsPage` / `DocsLayout` …) reads clean without each shell passing a prop. Opt back in with `<BrandMark wordmark cursor />`. Behavioral default change, visual-only.

  Now 114 components.

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
