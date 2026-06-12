Test-connection footer — four-state inline result + a test button. Sits at the bottom of a connection card.

```jsx
const { TestRow } = window.AxiomDesignSystem_7fc962;

<TestRow
  status={status} // "idle" | "testing" | "ok" | "error"
  result={resultText} // shown for ok / error
  onTest={runTest}
  disabled={!apiKey.trim()}
  idleHint="填写密钥后测试连通性"
/>;
```

Spinner shows during `testing`; check/× icon + `result` shows for ok/error. Button label flips to 重新测试 once connected.
