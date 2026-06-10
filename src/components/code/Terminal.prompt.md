Terminal window: green prompt, command/output/error line types, copy + optional blinking cursor.

```jsx
<Terminal title="zsh" cursor lines={[
  { type: "command", text: "npm run build" },
  { type: "output", text: "✓ built in 1.2s" },
  { type: "error", text: "warning: 2 peer deps" },
]} />
```
