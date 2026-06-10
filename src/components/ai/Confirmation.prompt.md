Tool-permission gate. Render before a side-effecting tool runs; pass `resolved` to show the verdict after.

```jsx
<Confirmation title="Run shell command?" detail="rm -rf ./build" onAllow={allow} onDeny={deny} />
```
