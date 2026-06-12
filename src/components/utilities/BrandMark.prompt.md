The agentaily mark + optional wordmark. Monochrome `currentColor` — inherits and inverts with the theme.

```jsx
<BrandMark size={20} />                    // mark only
<BrandMark size={18} wordmark />           // mark + "agentaily" (no cursor — the lockup default)
<BrandMark size={16} wordmark cursor />    // opt in to the blinking block cursor (liveness motif)
<BrandMark size={18} wordmark cursor blink={false} />   // cursor shown but static (no blink)
```

- Drawn in `currentColor`; set `color` on a wrapper to tint (stay monochrome — never a brand hue).
- The wordmark is always lowercase mono. The block cursor is the brand liveness motif but is **off by default** so shells (DesignerShell / SignInPage / AppShell / SettingsPage / DocsLayout…) read clean — pass `cursor` where you want the live motif.
