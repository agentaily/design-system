⌘K command palette: fuzzy filter, ↑/↓/↵ keyboard nav, grouped results. The signature agentaily power-user surface.

```jsx
<Command open={open} onClose={() => setOpen(false)} onSelect={run} groups={[
  { label: "Actions", items: [{ id: "new", label: "New chat", shortcut: "⌘N" }] },
  { label: "Navigate", items: [{ id: "docs", label: "Open docs" }] },
]} />
```

Wire a global ⌘K listener to toggle `open`. Use `inline` to embed in a doc/specimen.
