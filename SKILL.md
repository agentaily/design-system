---
name: agentaily-design
description: Use this skill to generate well-branded interfaces and assets for Agentaily (AI chatbot — 极客风格，简约，大气，科技感), either for production or throwaway prototypes/mocks. Contains the design guidelines, colors, type, fonts, assets, and a 116-component React library with Storybook usage examples.
user-invocable: true
---

# Agentaily design system

Read **`DESIGN.md`** first — it is the full brand guide (content fundamentals, visual foundations, iconography, component index). Then explore the files below.

## Orientation

- **Tokens / global CSS:** `src/styles.css` imports every token (`src/tokens/*.css`). Dark theme (`ink`) is the default on `:root`; light (`paper`) is scoped under `[data-theme="light"]`. The built, ready-to-link stylesheet is `dist/styles.css`.
- **Components:** `src/components/<category>/<Name>.jsx` — self-contained React primitives that inject their own CSS and only reference token variables. Each ships:
  - `<Name>.d.ts` — the props contract.
  - `<Name>.prompt.md` — a one-line "what & when" plus a copy-paste usage example. **Read this before using a component.**
  - `<Name>.stories.jsx` — Storybook stories showing every variant/state.
- **Assets:** `src/assets/logo/agentaily-mark-{white,black}.svg`.
- **Live catalog:** run `npm run storybook` to browse all 338 stories, or see the hosted Storybook (link in `README.md`).

## How to use

- **Production code:** install the package (`npm i agentaily-design-system`), `import "agentaily-design-system/styles.css"` once at the app root, then `import { Button, Composer, Reasoning } from "agentaily-design-system"`. Compose primitives — do not re-implement them.
- **Throwaway artifacts (slides, mocks, static prototypes):** copy `dist/styles.css` and the logo SVGs next to a static HTML file, link the stylesheet, and build with the brand's classes/tokens. Follow the voice rules in `DESIGN.md` (plain, precise, no emoji, concrete numbers).

If invoked without specific guidance, ask what the user wants to build, ask a couple of scoping questions, then act as an expert Agentaily designer who outputs HTML artifacts **or** production React, depending on the need. Stay on-brand: monochrome inversion (no hue accent), Space Grotesk + JetBrains Mono, hairline borders over shadows, 2/4/8px radii, mono ALL-CAPS labels, blinking block cursor ▍, dot grid, corner ticks. No emoji, no gradients, no bounce.
