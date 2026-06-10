Data table in a bordered, scrollable frame. Mark figure columns `numeric`; use `render` for cells with badges etc.

```jsx
<Table
  columns={[
    { key: "model", label: "Model" },
    { key: "ctx", label: "Context", numeric: true },
    { key: "status", label: "Status", render: (v) => <Badge variant="ok" dot>{v}</Badge> },
  ]}
  rows={[{ model: "agentaily-2", ctx: "128k", status: "Stable" }]}
/>
```
