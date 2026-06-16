---
name: agentaily-design
description: Use this skill to generate well-branded Agentaily interfaces and assets (AI chatbot — 极客风格，简约，大气，科技感), either as production React using the @agentaily/design-system package or as throwaway static prototypes. Self-contained brand rules + usage; no repo internals needed.
---

# Agentaily design system — usage skill

**Agentaily** is an AI chatbot. Brand brief, verbatim: **极客风格，简约，大气，科技感** (geek-flavored, minimal, expansive, technological). It answers in plain language first, then shows its work: conclusion → derivation. No hype, no mascots.

This skill is the **consumer guide** for the published design system. You do not need the repo internals — build on top of the package and the rules below.

- **Package:** `@agentaily/design-system` (npm) · **Catalog:** https://agentaily.github.io/design-system/ (Storybook) · **Full brand guide:** https://github.com/agentaily/design-system/blob/main/DESIGN.md

## Use it in production React

```bash
npm i @agentaily/design-system
```

```jsx
import "@agentaily/design-system/styles.css"; // once, at the app root — loads design tokens
import { Button, Composer, Reasoning } from "@agentaily/design-system";
```

- **120 components across 15 categories** — buttons, inputs, display, feedback, overlay, layout, chat, ai, code, voice, workflow, utilities, plus the product-domain layers **settings, auth, review**. Compose them; never re-implement a primitive.
- **Find a component and its props:** browse the Storybook (every variant/state is a story); TypeScript contracts ship with the package (`.d.ts`).
- Light theme (`paper`) is the default (on `:root`). For dark, set `data-theme="dark"` on a wrapping element (e.g. `<html data-theme="dark">`).

### Forms

Layered and library-agnostic. Controls (`Field`/`Input`/`Select`/…) own layout and never depend on a form engine. `Form` + `FormActions` add pure structure. `Form.useForm` is an **optional**, zero-dependency, react-hook-form-aligned hook (values/errors/touched, per-field rules incl. async, `handleSubmit`, full `formState`); `Form.useFieldArray` covers dynamic lists. Drop the hook for RHF/TanStack and the controls still work.

```jsx
import { Form, FormActions, Input, Button } from "@agentaily/design-system";

const form = Form.useForm({ initialValues: { email: "" }, mode: "onBlur" });
<Form onSubmit={form.handleSubmit}>
  <Input label="Email" {...form.field("email", { required: "Email is required." })} />
  <FormActions bordered>
    <Button type="submit" onClick={form.handleSubmit}>
      Save
    </Button>
  </FormActions>
</Form>;
```

`form.field(name, rules)` spreads `value/onChange/onBlur/error`; checkboxes use `{ type: "checkbox" }`. In sandboxed iframes also put `onClick={form.handleSubmit}` on the submit button — native form submission is blocked there.

### Page shells & frames

Full-page layouts are **live components**, not copy-templates — every region is a slot, so you fill content and the chrome stays in sync on package upgrades. `AppShell` (sidebar + topbar + content), `DesignerShell` (two-pane chat/preview, draggable divider), `DocsLayout` (nav · article · TOC), `SettingsSheet` (floating settings page: left section nav + content, built on the full-screen `PanelSheet` overlay shell — see **Settings** below), `SignInPage` (split-brand auth page), and `VerifyEmailPage` (split-brand full-page email verification — `verifying → ok / error` state machine; inject `verifyToken`/`onResend`, see **Auth** below). Bar heights are tokens (`--topbar-h` / `--bar-h`) so panes line up.

```jsx
import { AppShell, AccountControl, Icon } from "@agentaily/design-system";

<AppShell
  nav={[{ id: "overview", label: "Overview", icon: <Icon name="layout" size={16} /> }]}
  crumb={
    <>
      workspace / <b>Overview</b>
    </>
  }
  account={<AccountControl user={user} onLogin={openAuth} onLogout={signOut} />}
>
  {/* your screen */}
</AppShell>;
```

### Settings (floating panel + connection cards)

The settings UI is a four-layer chain, each layer built on the one below and reusable on its own:

```
PanelSheet            full-screen rise-up overlay shell (Header + body + optional Footer slot)
  └ SettingsSheet     floating settings page: left section nav + right content
      └ PageSection   the 「集成」 (or any) section: eyebrow + title + body slot ← you compose it
          └ DeepSeekCard   connection card(s) composed in via children (built on ConnectionCard ← Card)
PanelFooter           footer-content component (status-left / actions-right) for a sheet's footer slot
SettingsSaveBar       per-tab bottom save bar (explicit save, GitHub model) — composes PanelFooter
PageSection           generic eyebrow + title + description + body section (alias SettingsSection)
```

You configure the left nav (`集成 / 通用 / 账户 …`) via `SettingsSheet`'s `nav`; the footer is **per tab**. Save is **explicit** (not auto-save): the integration section uses caller-owned state + explicit `dirty`; normal form tabs use `Form.useForm`. Both share one `SettingsSaveBar`.

```jsx
import {
  SettingsSheet,
  PageSection,
  DeepSeekCard,
  SettingsSaveBar,
} from "@agentaily/design-system";

// caller owns cfg + persistence; cards are pure-display (props in, events out)
<SettingsSheet
  nav={[
    { id: "integrations", label: "集成", icon: "plug" },
    { id: "general", label: "通用", icon: "settings" },
  ]}
  active={tab}
  onNavigate={setTab}
  onClose={close}
  footer={
    tab === "integrations" ? (
      <SettingsSaveBar dirty={cfg !== saved} saving={saving} onSave={save} onReset={revert} />
    ) : null
  }
>
  {tab === "integrations" && (
    <PageSection eyebrow="集成 · INTEGRATIONS" title="连接你的服务">
      <DeepSeekCard {...deepSeekProps} />
    </PageSection>
  )}
</SettingsSheet>;
```

Migrating from a hand-rolled overlay? Delete any local `.s-overlay / .s-modal / .s-wrap` shell CSS and mount `<PanelSheet>`; compose the 集成 section yourself as a `<PageSection>` holding the connection cards — the old all-in-one `IntegrationSettings` and the `FeishuCard` were removed, so you own the config + persistence + Save (via the footer's `SettingsSaveBar`); for "save instantly" instead, skip `SettingsSaveBar` and persist in `onChange`.

**Locale-agnostic copy (the settings/account components are headless).** The DS ships **no i18n** — these components no longer hardcode Chinese; every user-facing string now **defaults to English** and is overridable via a `copy` prop (the same `DEFAULT_COPY` idiom as `SignInPage` / `AuthDialog`). Affected: `DeepSeekCard` · `ConnectionCard` · `TestRow` · `SettingsSaveBar` · `AccountControl` (each takes `copy`), and `SettingsSheet` (`crumb` / `navLabel` default to `"Settings"`). **A Chinese-locale product must pass `copy` (e.g. via your `L()` helper) or it will show the English defaults.** `DeepSeekCard`'s `copy` threads down through `ConnectionCard` → `TestRow`, so one object localizes the whole card:

```jsx
<DeepSeekCard {...deepSeekProps} copy={zh ? { title: "DeepSeek", desc: "驱动对话式交互…", connected: "已连接", disconnected: "未连接", apiKeyLabel: "API KEY", idleHint: "填写密钥后测试连通性", test: "测试连接", retest: "重新测试", testing: "正在握手…", help: { /* … */ } } : undefined} />
<SettingsSaveBar /* … */ copy={zh ? { save: "保存", reset: "放弃更改", saving: "正在保存…", saved: "已保存", cleanHint: "全部更改已保存", dirtyHint: "有未保存的更改" } : undefined} />
<AccountControl user={user} copy={zh ? { signIn: "登录", menuLabel: "账户菜单", signedIn: "已登录账户", signOut: "退出登录" } : undefined} />
```

Each component's `.prompt.md` lists its full `copy` key set. (`StatusPill`'s badge text still defaults to zh — localize it via its existing `labels` prop; a forwarded seam is a follow-up.)

### Auth (full-page email verification)

`SignInPage` (sign-in / sign-up) and `VerifyEmailPage` are the split-brand auth pages; `AuthDialog` is the modal sibling. `VerifyEmailPage` owns **only** the `verifying → ok / error` flow — it never validates the token, writes a session, shows a toast, or navigates. You inject the effects and keep the real validation, persistence, and the (open-redirect-guarded) redirect decision in your product.

```jsx
import { VerifyEmailPage } from "@agentaily/design-system";

<VerifyEmailPage
  email="lin@agentaily.dev"
  returnTo={{ label: "your workspace", href: "/app" }}
  verifyToken={async () => {
    const res = await fetch("/api/verify?token=" + token);
    if (!res.ok) throw new Error("This link has expired."); // reject/throw/network → error
    // success: persist the session HERE, then resolve
  }}
  onResend={() => fetch("/api/verify/resend", { method: "POST" })}
  onContinue={(rt) => {
    location.href = isSameOrigin(rt?.href) ? rt.href : "/app";
  }} // YOU guard the redirect
  onBackToSignIn={() => navigate("/signin")}
  copy={
    {
      /* every string is localizable, shallow-merged per group */
    }
  }
/>;
```

Hard rules the component enforces (so products can't get them wrong): the **error** state never auto-redirects; **success** counts down (`redirectDelay`, default 5s; `noRedirect` turns it off) then calls `onContinue(returnTo)`; **resend** is cooldown-gated + idempotent + confirms in place, with a "resend ≠ verified" reminder. Pass `status` (+ optional `error`) to drive the machine yourself, or use the headless `VerifyEmailPage.useVerify({ verifyToken })` (see below) with your own UI.

### Headless hooks (logic without UI)

Some logic ships as a **headless hook**, exposed as a static on the component it pairs with (mirroring `Form.useForm`). The hook owns state; the caller injects it, so one piece of state can drive UI in several places.

- `Queue.useQueue({ onFirst, onBatch })` → `{ queue, busy, enqueue, remove, reset }` — keep-sending-while-busy buffer; pair with `<ConversationThread controller={q} />` (pure-render chat surface).
- `AuthDialog.useAuth(storageKey?)` → `{ user, signIn, signOut }` — localStorage-persisted session; pair with `<AuthDialog>` + `<AccountControl>`.
- `VerifyEmailPage.useVerify({ verifyToken })` → `{ status, error, retry }` — runs an injected token check into a `verifying → ok / error` machine (reject/throw/network → `error`, never a silent hang); pair with `<VerifyEmailPage>` or bring your own UI.

```jsx
import { ConversationThread, Queue } from "@agentaily/design-system";

const q = Queue.useQueue({
  onFirst: async (text) => {
    push({ role: "user", text });
    await run(text);
  },
  onBatch: async (texts) => texts.forEach((t) => push({ role: "user", text: t })),
});
<ConversationThread controller={q} messages={messages} draft={draft} onDraftChange={setDraft} />;
```

**Chat message bodies render markdown.** `<Message>` takes a markdown **string** (the `markdown` prop, or a plain string as children) and renders it through `<Markdown>` — paragraphs, **bold**/_italic_/~~strike~~, `inline code`, fenced code blocks, ordered/unordered/nested/task lists, blockquotes, GFM tables (per-column alignment), links + bare-URL autolinks, `#`/`##`/`###` headings. Safe by construction (no `dangerouslySetInnerHTML`, link hrefs scheme-sanitized, images inert) and streaming-tolerant (half tables / unclosed marks degrade to partial/literal, never throw). React-node children still render unchanged (back-compat). Use `<Markdown content={…} />` standalone for any model-output surface.

```jsx
import { Message, Markdown } from "@agentaily/design-system";

<Message role="assistant" streaming markdown={modelText} />; // chat turn, typeset
<Markdown content={modelText} />; // standalone
```

For credential/connection UIs there are also `SecretField` (masked **mono** key/secret input + show/hide — for API keys and the like; a login/signup password box instead uses `Input` with `type="password" reveal`, which sprouts the same eye toggle inside the standard form-field chrome), `StatusPill` (connection status chip), and `TestRow` / `HelpSteps` (connection-card atoms). `ConnectionCard` is the shared connection-card shell (built on `Card`: collapsible header + body + test row + status tint); `DeepSeekCard` (LLM key) composes it into a **pure-display** card — props in, events out, **zero state / localStorage / gating**; the caller owns the config, persistence, Save, backend errors, and any readiness gate (same headless philosophy as `Form.useForm` / `Queue.useQueue`). Build cards for other services by composing `ConnectionCard` the same way. Connected cards collapse to a one-line summary by default (`collapsible`). `AccountControl` (auth) takes `onProfile` to make its email row jump to a profile/account screen. `Icon` is the unified Lucide set (`Icon.names` lists all); `BrandMark` is the agentaily mark + wordmark; `RotatingTagline` is the animated brand headline (typing phrases + flowing rainbow gradient + trailing cursor — used in the auth brand panel and the marketing hero). `MarkupLayer` (review) is a point-at-an-element overlay driven by `data-mk-label`.

### Runtime — theme switching, i18n, cross-subdomain persistence (non-visual)

The package also ships the **browser runtime** (Providers / hooks / utilities, no rendered UI) absorbed from `@agentaily/web-kit` — use these instead of hand-rolling theme toggles, locale state, or preference storage. `@agentaily/web-kit` is being deprecated; import this from `@agentaily/design-system`.

```jsx
import {
  ThemeProvider,
  useTheme,
  themeInitScript,
  createI18n,
  createStorage,
  persistentState,
} from "@agentaily/design-system";
```

- **Theme.** Wrap your app in `<ThemeProvider>`. It resolves the theme (`light | dark`, resolving `system` via `prefers-color-scheme`) and applies it to `<html data-theme="…">` — which is exactly what the component tokens read (so this is how you drive dark mode). `useTheme()` → `{ theme, resolvedTheme, setTheme }` for a theme switcher. To kill the flash-of-wrong-theme on first paint, inline `themeInitScript()` (a small, XSS-safe, dependency-free string) synchronously in `<head>` before any paint.
- **i18n.** `createI18n({ catalogs, defaultLocale })` returns `{ LocaleProvider, useLocale, useMessages }`. The mechanism is shared; each product injects its own message catalogs. Initial locale resolves persisted → `navigator.language` → fallback; `useMessages()` is typed to the catalog shape. (DS **components** stay locale-agnostic via their `copy` props — this is the app-level locale state that feeds those props.)
- **Persistence.** `createStorage({ backend, cookieDomain, keyPrefix })` builds a `PreferenceStorage` that defaults to a cross-`.agentaily.com`-subdomain cookie (so theme/locale stay consistent across subdomains), falling back through localStorage → domain-less cookie → in-memory. It **never throws** — SSR and private mode degrade silently. `persistentState({ key, defaultValue, storage, decode, encode })` binds one typed value to it. `ThemeProvider` / `createI18n` accept a `storage` config to customize this.

## Use it for throwaway artifacts (slides, mocks, static HTML)

Link the published stylesheet and the logo, then build with the tokens/classes:

```html
<link rel="stylesheet" href="https://unpkg.com/@agentaily/design-system/dist/styles.css" />
```

Logo marks: `@agentaily/design-system/assets/logo/agentaily-mark-{white,black}.svg`.

## Brand rules (stay on-brand)

- **Color — monochrome, no hue accent.** Two scales: `paper` (light, default on `:root`) and `ink` (dark, under `[data-theme="dark"]`). The "accent" is **inversion**: primary = black-on-white in light, white-on-black in dark. Green/amber/red (`--ok/--warn/--danger`) are **status only**, never decorative. No gradients (except the dot-grid mask fade).
- **Type.** Space Grotesk (display + UI) and JetBrains Mono (code, timestamps, labels). CJK falls back to system sans. Display sizes use tight tracking (−0.02em), medium weight — never bold-black. Body 15px / 1.6, max ~76ch. The signature is the **mono ALL-CAPS label** (12px, +0.08em): `CONVERSATIONS`.
- **Spacing — 4px grid.** Outer space generous (sections 72–96px, 大气); inner rhythm tight (8–16px, 极客). Chat column maxes 760px, container 1120px, sidebar 272px.
- **Corners — hard-edged.** 2px chips · 4px buttons/inputs · 8px cards/dialogs. Default avatars are square (4px).
- **Hierarchy via 1px hairlines, not shadows.** Shadows only for floating layers (menus, dialogs).
- **Interaction.** Hover = background fill or border step-up, never opacity on text. Press = `translateY(1px)`. Focus = double ring (keyboard); inputs swap border-color.
- **Motion.** One ease `cubic-bezier(0.2,0,0,1)`, three durations 120/200/320ms. Decisive, no bounce. Mechanical exceptions: cursor blinks in `steps(1)`, spinner rotates in `steps(8)`. Respect `prefers-reduced-motion`.
- **Motifs (use 1, max 2 per view):** block cursor ▍ · dot grid · corner ticks · mono ALL-CAPS labels.
- **Icons:** Lucide (24px grid, stroke 2, `currentColor`, rendered 14–20px). Unicode ⌘ ⌥ ⇧ ⏎ ▣ ▍ are typed text, set in mono. Never filled icons, duotone, or emoji-as-icon.

## Voice

Plain, precise, slightly dry — the voice of a good senior engineer: short declaratives, concrete numbers, zero filler. **No emoji, ever** (status is carried by square dots + color tokens). Numbers are copy: "0.4s", "128k", "Retry in 18s". Bilingual by design (English carries the tech identity, Chinese the body copy), but pick one language per element. Sentence case for product copy and buttons; mono ALL-CAPS for the label motif; the wordmark is always lowercase **agentaily**.

- ✓ "Rate limited. Retry in 18s." ✗ "Oops! Something went wrong 😅"
- ✓ "有什么要解决的？" ✗ "✨ 开启你的奇妙旅程！"

## When invoked without specifics

Ask what the user wants to build, ask a couple of scoping questions, then act as an expert Agentaily designer — output production React (consuming the package) **or** static HTML artifacts, depending on the need. Read the full DESIGN.md (linked above) when you need depth beyond these rules.
