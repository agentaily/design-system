Test-connection footer — four-state inline result + a test button. Sits at the bottom of a connection card.

```jsx
<TestRow
  status={status} // "idle" | "testing" | "ok" | "error"
  result={resultText} // shown for ok / error
  onTest={runTest}
  disabled={!apiKey.trim()}
/>
```

Spinner shows during `testing`; check/× icon + `result` shows for ok/error. Button label flips to the re-test label once connected.

All chrome strings default to English. DS is locale-agnostic — pass `copy` (any subset) to localize:

```jsx
<TestRow
  status="idle"
  copy={{
    idle: "尚未测试",
    testing: "正在握手…",
    test: "测试连接",
    retest: "重新测试",
  }}
/>
```

The explicit `idleHint` / `testLabel` / `retestLabel` props still win over the matching `copy` field when both are passed.
