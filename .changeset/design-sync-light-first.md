---
"@agentaily/design-system": minor
---

Sync the latest Claude Design handoff (`6Ovub8OJ`): light-first theme flip, 16 new components, and a `Queue.useQueue` hook.

- **BREAKING (visual): default theme flipped dark → light.** `:root` is now the `paper` (light) scale; the `ink` (dark) scale moved to `[data-theme="dark"]`. Consumers who relied on the dark default must add `data-theme="dark"` to opt back in. Shadow tokens and per-component theme overrides flipped to match.
- **New layout tokens** `--topbar-h` (52px) and `--bar-h` (48px) so app/pane bars align.
- **16 new components across 3 new categories + existing ones** (112 total): `auth/` (`AuthDialog` + `AuthDialog.useAuth`, `AccountControl`, `SignInPage`), `settings/` (`IntegrationSettings`, `SecretField`, `StatusPill`, `TestRow`, `HelpSteps`), `review/` (`MarkupLayer`), plus `layout/` full-page shells (`AppShell`, `DesignerShell`, `DocsLayout`, `SettingsPage`), `chat/ConversationThread`, and `utilities/` (`Icon`, `BrandMark`).
- **`Queue.useQueue`** — headless keep-sending-while-busy buffer, exposed as a static on `Queue` (pairs with `ConversationThread`).
