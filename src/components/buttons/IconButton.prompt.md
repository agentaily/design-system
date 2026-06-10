Square icon-only button; use for toolbars, message actions, close affordances.

```jsx
<IconButton label="Copy" onClick={copy}><CopySvg /></IconButton>
```

Variants: ghost (default), outline, solid. Always pass `label` — it becomes aria-label and the title tooltip.
