# Agentaily Design System

**Agentaily** is an AI chatbot. The brand brief, verbatim: **极客风格，简约，大气，科技感** — geek-flavored, minimal, expansive, technological. Agentaily answers in plain language first, then shows its work: conclusion → derivation, no hype, no mascots.

This is a **greenfield system** — no codebase, Figma, or existing assets were provided. Everything here (name, mark, palette, type, components, screens) was originated in this project on 2026-06-10 and is the source of truth. The only inputs were the one-line brief and these choices from the kickoff questionnaire: dual theme (dark default), **monochrome accent**, everything else delegated.

Two product surfaces are represented as full UI kits:
- **Chat app** (`ui_kits/chat/`) — the core product: sidebar + thread + composer.
- **Marketing website** (`ui_kits/website/`) — the landing page.
- **Documentation site** (`ui_kits/docs/`) — three-pane developer docs (nav + article + TOC).

The component library is **deliberately exhaustive** — 116 exports across 11 categories, covering the full shadcn/ui primitive set plus AI-native surfaces (reasoning, tool calls, agents, voice, workflow graphs). See the INDEX below.

---

## CONTENT FUNDAMENTALS

**Tone:** plain, precise, slightly dry. Confidence through restraint — Agentaily never sells, it states. The voice of a good senior engineer: short declaratives, concrete numbers, zero filler.

**Language:** bilingual by design. Display/English carries the tech identity ("Reasoning, distilled"), body copy is natural Chinese（"先给结论，再给推导——不废话，不卖萌"）. Mixing is intentional, but within one element pick one language.

**Casing:**
- Product copy and buttons: sentence case — "New chat", "Start free", "Read the docs".
- The label motif: mono ALL-CAPS with letter-spacing — `CONVERSATIONS`, `AGENTAILY MAY MAKE MISTAKES`.
- The wordmark is always lowercase: **agentaily**.

**Person:** address the user as 你/you; Agentaily refers to itself as Agentaily, never "I'm excited to…". System text is impersonal: "This cannot be undone."

**Emoji: never.** Status is carried by square dots and color tokens. Keyboard glyphs (⌘ ⌥ ⇧ ⏎) and geometric unicode (▣ ▍) are typed as text and ARE part of the vocabulary.

**Numbers are copy.** "0.4s", "128k", "Retry in 18s" — specific figures replace adjectives.

Examples — ✓ "Rate limited. Retry in 18s." ✗ "Oops! Something went wrong 😅" · ✓ "有什么要解决的？" ✗ "✨ 开启你的奇妙旅程！"

---

## VISUAL FOUNDATIONS

**Color.** Monochrome-first. Two scales: **paper** (light, the default on `:root`) and **ink** (dark, scoped under `[data-theme="dark"]`). The accent is **inversion, not hue** — the primary button is white-on-black in dark, black-on-white in light. Semantic green/amber/red exist (`--ok/--warn/--danger`) but appear only as status; never decorative. There are no gradients anywhere except the dot-grid mask fade.

**Type.** Space Grotesk (display + UI) and JetBrains Mono (code, timestamps, labels). CJK falls back to system sans (PingFang SC / Microsoft YaHei). Display sizes use tight tracking (−0.02em) and medium weight — never bold-black. The mono ALL-CAPS label (12px, +0.08em) is the system's signature. Body is 15px/1.6, max ~76ch.

**Spacing.** 4px grid. Outer space is generous (sections 72–96px) — 大气; inner rhythm is tight (8–16px) — 极客. Chat thread column maxes at 760px; marketing container 1120px; sidebar fixed 272px.

**Backgrounds.** Flat solids from the scale. No photography, no illustration. The only textures permitted: the **dot grid** (24px, for heroes/empty states, usually mask-faded) and hairline rules. Marketing hero art is the product window itself.

**Corners.** Hard-edged: 2px chips, 4px buttons/inputs, 8px cards/dialogs. Full-round only for rare avatar cases; default avatars are **square** (4px).

**Borders & shadows.** Hierarchy comes from 1px hairlines (`--line-1` resting, `--line-2` hover/strong), not shadows. Shadows exist only for floating layers (menus `--shadow-2`, dialogs/marketing window `--shadow-3`). No inner shadows except the Kbd's 2px bottom border.

**Hover:** background fill (`--bg-3`) or border step-up (`--line-1`→`--line-2`) — never opacity fades on text. **Press:** translateY(1px) — mechanical, no scale. **Focus:** keyboard focus uses the double ring (`--ring`); inputs use border-color swap.

**Motion.** One ease (`cubic-bezier(0.2,0,0,1)`), three durations (120/200/320ms). Decisive and damped — no bounce, no parallax. Mechanical exceptions that define the brand: the cursor blinks in `steps(1)`, the spinner rotates in `steps(8)`. Respect `prefers-reduced-motion`.

**Transparency & blur:** only on overlay layers — dialog scrim (`--bg-overlay` + 12px blur) and the sticky marketing nav. Never on content.

**Cards:** flat `--bg-2`, 1px `--line-1`, 8px radius, no shadow. Featured cards may carry the **corner-tick** motif (two L-shaped ticks on opposite corners).

**Motifs (use 1, max 2 per view):** block cursor ▍ (liveness) · dot grid (potential space) · corner ticks (selection/precision) · mono ALL-CAPS labels.

**Chat anatomy:** user turns are right-aligned hairline cards (max 78%); assistant turns are full-width prose under a mono `AGENTAILY` label — no bubble. Streaming = blinking block cursor.

---

## ICONOGRAPHY

- **System: [Lucide](https://lucide.dev)** — 24px grid, stroke 2, round caps, `currentColor`, rendered at 14–20px. Chosen as the open-source set matching the hairline aesthetic. No brand icon font existed (greenfield); this substitution is flagged in CAVEATS.
- **In static HTML:** load the UMD build from CDN (`https://unpkg.com/lucide@latest/dist/umd/lucide.js`) and call `lucide.createIcons()` on `<i data-lucide="plus">` elements — see `guidelines/iconography.card.html`.
- **In React kits:** use `ChatIcon` from `ui_kits/chat/ChatIcons.jsx` — inline copies of Lucide path geometry (plus, search, settings, sun, moon, pen, trash, copy, refresh, chevron-down, x, paperclip, panel-left, arrow-up, message, share). Add icons by copying paths from Lucide, never by drawing freehand.
- **Never:** filled icons, duotone, emoji-as-icon, mixed stroke weights.
- **Unicode as UI:** ⌘ ⌥ ⇧ ⏎ in `Kbd`; ▣ as model-chip glyph; ✕ for dismiss; ✓ in copy-confirmation. These are text, set in mono.
- **Logo:** `assets/logo/agentaily-mark-{white,black}.svg` — cursor-block-in-corner-ticks mark. Wordmark is typed, not drawn: lowercase mono `agentaily` + optional blinking cursor.

---

## INDEX

| Path | What |
|---|---|
| `styles.css` | Global entry — `@import`s everything below. Link this one file. |
| `tokens/colors.css` | Ink + paper scales, accent, semantic, aliases |
| `tokens/typography.css` | Families, scale (12–68px), weights, tracking |
| `tokens/spacing.css` | 4px scale + layout constants |
| `tokens/effects.css` | Radii, shadows, motion, focus ring, blur |
| `tokens/base.css` | Body defaults + motif utilities (`.ax-label`, `.ax-cursor`, `.ax-dotgrid`, `.ax-ticks`) |
| `tokens/fonts.css` | Google Fonts imports (substitution — see CAVEATS) |
| `assets/logo/` | Mark SVGs (white/black) |
| `guidelines/` | 17 specimen cards (Colors ×4, Type ×4, Spacing ×5, Brand ×4) |
| `states/` | 5 interaction-state matrices (buttons, form controls, selection/nav, loading/streaming, status/feedback) — force-rendered hover/focus/active/disabled |
| `components/buttons/` | Button, IconButton, **ButtonGroup** |
| `components/inputs/` | Input, Textarea, Select, Switch, Checkbox, Label, RadioGroup, Slider, Toggle, ToggleGroup, **Field, FieldGroup, InputGroup, InputOTP, Combobox, Calendar, DatePicker, Form (+FormActions, Form.useForm), SecretField** |
| `components/display/` | Card, Badge, Avatar, Tabs, Kbd, Separator, Skeleton, Progress, Accordion, Breadcrumb, Table, Pagination, Empty, **Collapsible, Item, Carousel, Chart (BarChart/LineChart), DataTable, Typography (Prose/Text), StatusPill** |
| `components/feedback/` | Spinner, Toast, Tooltip, Dialog, Alert |
| `components/overlay/` | Popover, DropdownMenu, Command, Sheet, **HoverCard, ContextMenu, Menubar, NavigationMenu, AlertDialog** |
| `components/layout/` | **AspectRatio, ScrollArea, Resizable, Sidebar, AppShell, DesignerShell, DocsLayout, SettingsPage** — incl. full-page shells/frames |
| `components/chat/` | Message, Composer, CodeBlock, **ConversationThread** |
| `components/ai/` | Reasoning, ToolCall, Sources + Citation, Suggestion/Suggestions, ModelSelector, Attachments, Shimmer, **Conversation, Task, Plan, Context, Confirmation, Checkpoint, Queue** |
| `components/code/` | **Terminal, FileTree, Snippet, StackTrace, TestResults, Artifact, WebPreview, Agent, Commit, EnvironmentVariables, PackageInfo, Sandbox, SchemaDisplay, JSXPreview** |
| `components/voice/` | **AudioPlayer, MicSelector, VoiceSelector, SpeechInput, Transcription, Persona** |
| `components/workflow/` | **Flow (Canvas), Canvas, Node, Edge, Connection, Controls, Panel, Toolbar** |
| `components/utilities/` | **Image, OpenInChat, Icon (unified Lucide set), BrandMark, RotatingTagline** |
| `components/settings/` | **TestRow, HelpSteps, IntegrationSettings** — connection-card primitives + the DeepSeek/Feishu integration modal |
| `components/auth/` | **AuthDialog (+ AuthDialog.useAuth), AccountControl, SignInPage** — sign-in/register modal + persisted session + top-bar account menu + full-page sign-in |
| `components/review/` | **MarkupLayer** — point-at-an-element review overlay (`data-mk-label`) |
| **Hooks** (headless) | `Queue.useQueue`, `AuthDialog.useAuth`, `Form.useForm` / `Form.useFieldArray` — logic without UI, exposed as statics on the paired component |
| `ui_kits/chat/` | Chat app (interactive) |
| `ui_kits/website/` | Marketing landing page |
| `ui_kits/docs/` | Documentation site (interactive) |
| `SKILL.md` | Agent-skill entry point |

Every component ships `<Name>.jsx` + `<Name>.d.ts` (props) + `<Name>.prompt.md` (usage) — **146 component exports** across the primitive categories (buttons, inputs, display, feedback, overlay, layout, chat, ai, code, voice, workflow, utilities) plus product-domain layers (**settings, auth, review**). Full-page frames — `AppShell` / `DesignerShell` / `DocsLayout` / `SettingsPage` (layout), `ConversationThread` (chat), `SignInPage` (auth) — are **live components, not copy-templates**: change one, every consuming project benefits on re-sync. Consume via the compiled bundle: `window.AxiomDesignSystem_7fc962`. Read each component's `.prompt.md` for copy-paste usage.

**Forms are layered, not monolithic.** Presentational controls (Input/Select/Field…) own layout and never depend on a form engine. `Form` + `FormActions` add pure structure. `Form.useForm` is an **optional**, zero-dependency orchestration hook (values/errors/touched/validate/submit) exposed off the capitalized `Form` export — drop it for react-hook-form or TanStack and the controls still work. Errors surface only after blur or submit; spread `form.field(name)` onto any value control, or `form.field(name, {type:"checkbox"})` for boolean ones.

## ARCHITECTURE — 分层与复用 (layering & reuse)

The system sits on **two orthogonal axes**. Don't conflate them: a *domain* is not a *layer*.

### ① 纵向 — abstraction layers (dependencies point **down only**)

| Layer | What | Depends on | Examples |
|---|---|---|---|
| **L0 Tokens** | colour / type / space / radius / shadow / motion variables | — | `tokens/*.css` |
| **L1 Primitives** (atoms) | no business meaning, usable anywhere | tokens | `Button`, `Input`, `Badge`, `Icon`, `BrandMark`, `RotatingTagline` |
| **L2 Composites** (molecules) | a few primitives combined; still cross-product | L1 | `Composer`, `SecretField`, `StatusPill` |
| **L3 Patterns** (organisms) | self-contained interaction + state, configurable | L1–L2 | `AuthDialog`, `IntegrationSettings`, `MarkupLayer`, `ConversationThread` |
| **L4 Page shells / frames** | full-page layout with slots | L1–L3 | `AppShell`, `DesignerShell`, `DocsLayout`, `SettingsPage`, `SignInPage` |
| **L5 Product code** | real content + business logic — **never lives in the DS** | L4 | each app's flow / preview renderer |

### ② 横向 — domains (categorization *inside* a layer, not a level)

`buttons · inputs · display · feedback · overlay · layout · chat · ai · code · voice · workflow · utilities · settings · auth · review`. A product-domain component (e.g. `IntegrationSettings`) lives at its **abstraction layer** (L3) and is merely *filed* under its **domain folder** (`settings/`). Domains are folders, not tiers.

**Where does a component go?** Ask: (1) what does it depend on? — composites + own state → higher. (2) reused by ≥2 surfaces? — if not, keep it in the app, not the DS. (3) how much business meaning? — more → higher layer, more generic → lower.

### 复用类型与传播 (reuse types & propagation)

| Type | Mechanism | Does an upstream change propagate? |
|---|---|---|
| Tokens ①, global/motif classes ②, components ③ | **reference** — linked `styles.css` + `_ds_bundle.js` loaded at runtime | ✅ **yes** — re-sync the binding and every consumer updates (single source of truth) |
| Templates (`templates/<slug>/`) | **copy / fork** — the folder is copied into the consuming project | ❌ **no** — frozen at copy time; *however* the copy still live-links tokens + components, so its *colours/buttons* update while its *layout* does not |

### 原则:有共享就「上移」成组件,而不是复制 (share by moving up)

For internal unification, push anything shared **up into a component** (live, single-source) — not into a template. Templates are one-off scaffolds meant to be forked and to diverge. This is exactly why the designer shell and the former `starters/` pages now live as **components** (`AppShell`, `DesignerShell`, `DocsLayout`, `SettingsPage`, `ConversationThread`, `SignInPage`): fix the shell once and every project benefits on re-sync. The single rule that keeps layering from rotting: **dependencies are strictly one-way down — a lower layer never reaches up.**

### Headless hooks (逻辑层 — logic without UI)

Some logic deserves reuse without dragging a specific UI along. It ships as a **headless hook**, exposed as a static on the capitalized component it pairs with (mirroring `Form.useForm`). **The hook owns the state; the component only renders.** The caller holds the hook and injects it (e.g. `<ConversationThread controller={q} />`), so one piece of state can drive UI in several places at once — a composer, a publish button, and a markup layer can all share a single `Queue.useQueue`.

| Hook | Returns | Pairs with |
|---|---|---|
| `Queue.useQueue({ onFirst, onBatch })` | `{ queue, busy, enqueue, remove, reset }` — keep-sending-while-busy buffer | `<Queue>`, `ConversationThread controller` |
| `AuthDialog.useAuth(storageKey?)` | `{ user, signIn, signOut }` — localStorage-persisted session | `<AuthDialog>`, `<AccountControl>` |
| `Form.useForm(config)` | controlled-form orchestration (values/errors/touched/validate/submit) | the input controls |
| `Form.useFieldArray({ form, name })` | dynamic list fields (append/remove/move…) | `Form` |

This is the headless pattern (React Aria / Downshift / TanStack): split logic from rendering, compose downstream. Keep the *reusable* glue upstream too — if every consumer wires a hook + component the same way, add a convenience wrapper; if the wiring genuinely differs (e.g. each app's `renderTurn` turn-mapping), leave it downstream. Headless hooks are their own layer (browsable under **Hooks** in the Design System tab), not buried inside components.

## CAVEATS
- **Fonts are CDN substitutions:** Space Grotesk + JetBrains Mono via Google Fonts `@import` (no binaries shipped). Replace `tokens/fonts.css` with real `@font-face` + files for offline/production use.
- **Icons are Lucide** (CDN / copied paths), not a bespoke set.
- All product copy, stats and names in the kits are invented placeholders.
