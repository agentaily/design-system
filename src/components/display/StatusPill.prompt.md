Connection status chip — a thin semantic wrapper over `Badge`.

```jsx
const { StatusPill } = window.AxiomDesignSystem_7fc962;

<StatusPill status="ok" />        // 已连接 (green dot)
<StatusPill status="testing" />   // 测试中 (neutral dot)
<StatusPill status="error" />     // 连接失败 (red dot)
<StatusPill status="idle" labels={{ idle: "未配置" }} />
```

Four states: `idle` · `testing` · `ok` · `error`. Override copy with `labels`.
