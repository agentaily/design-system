Suggested-prompt chips — empty states and follow-up prompts.

```jsx
<Suggestions onSelect={send} items={[
  "解释一下 CAP 定理",
  "帮我重构这段函数",
  { label: "写个正则", value: "写一个正则匹配 semver" },
]} />
```

Use `scroll` for a single non-wrapping row (e.g. follow-ups under a message). For one-off chips use `<Suggestion>` directly.
