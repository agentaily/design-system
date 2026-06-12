The agentaily mark + optional wordmark. Monochrome `currentColor` — inherits and inverts with the theme.

```jsx
const { BrandMark } = window.AxiomDesignSystem_7fc962;

<BrandMark size={20} />                    // mark only
<BrandMark size={18} wordmark />           // mark + "agentaily" + blinking cursor
<BrandMark size={16} wordmark cursor={false} />
<BrandMark size={18} wordmark blink={false} />   // cursor shown but static (no blink)
```

- Drawn in `currentColor`; set `color` on a wrapper to tint (stay monochrome — never a brand hue).
- The wordmark is always lowercase mono; the block cursor is the brand liveness motif.
