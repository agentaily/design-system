Model picker dropdown — ▣ glyph, per-model description + tag, check on the active one.

```jsx
<ModelSelector value={model} onChange={setModel} models={[
  { value: "agentaily-2", description: "最强推理 · 128k context", tag: "DEFAULT" },
  { value: "agentaily-2-mini", description: "更快更省 · 64k context", tag: "FAST" },
  { value: "agentaily-1", description: "上一代 · 32k context" },
]} />
```

Sits in the composer or chat header. For a plain field-style picker use `Select` instead.
