---
"@agentaily/design-system": minor
---

Add backward-compatible backend seams to `IntegrationSettings` and `SignInPage` (contracts requested by downstream consumers — pass nothing and behavior is unchanged).

- **`IntegrationSettings` — controlled / backend-wired (BYOK) seam.** New optional props let a caller own the config and reach a real backend instead of the built-in localStorage: `value` + `onChange` (controlled config; when `value` is passed the modal stops touching localStorage), `onSave(value)` → `Promise` (Save disables + spins while pending, marks saved on resolve, stays dirty on reject), `onTest(which)` → `Promise<{ ok, message }>` (drives the per-card `StatusPill` + `TestRow`; falls back to the built-in mock probe when omitted), `readiness` (external `{ deepseek, feishu }` override for the 0/2 rail, Save gating, and the green pills), and `masked` (stored secrets echo as a masked placeholder with an empty value and are never re-submitted; typing overrides the mask). Omit all of them and the component self-persists to localStorage exactly as before.
- **`SignInPage` — backend-error + submit-busy seam.** New optional props: `error` (ReactNode shown in a danger banner directly above the submit button for server failures like 409/401/400; caller-owned, cleared by you) and `submitting` (disables the submit button, shows a spinner, and blocks double-submit while an async `onSubmit` is in flight). Client-side validation is unchanged; the component still owns and clears its own field errors on input/mode change.

Both ship updated `.d.ts` + `.prompt.md` (controlled + async wiring examples) and new Storybook stories.
