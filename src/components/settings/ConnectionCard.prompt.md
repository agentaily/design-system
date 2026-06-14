The shared **shell** for a service-connection card (L3), built on the base `<Card>`. `DeepSeekCard` composes it; reach for it directly when you need a **new** connector card with the same anatomy (collapsible header · body · Test footer · status tint).

```jsx
import { ConnectionCard, SecretField, Button } from "@agentaily/design-system";
```

```jsx
function SlackCard({ token, onTokenChange, status, result, onTest, masked }) {
  return (
    <ConnectionCard
      icon="message"
      title="Slack"
      desc="把每条提交推送到一个 Slack 频道。"
      status={status}
      result={result}
      onTest={onTest}
      testDisabled={!(token || "").trim() && !masked}
      idleHint="填写 Bot Token 后测试"
    >
      <SecretField
        label="BOT TOKEN"
        value={token}
        onChange={onTokenChange}
        placeholder={masked ? "已保存 ········ · 留空则保持不变" : "xoxb-…"}
      />
    </ConnectionCard>
  );
}
```

- **Caller owns state.** `status` / `result` are controlled — run your probe on `onTest`, push status back. The only local state is the collapse toggle.
- **Collapse:** connected (`status === "ok"`) → starts collapsed to the header row; collapsed = whole row clicks to expand, expanded = chevron button collapses. Control with `expanded` / `onExpandedChange`.
- **`icon`** takes an Icon name or a node; **`summary`** overrides the collapsed one-liner (defaults to `result`).
- **`showTest={false}`** drops the Test footer for connectors that don't probe.
- **Locale-agnostic.** The shell's own chrome defaults to English (collapsed `Connected` / `Not connected` summary, the collapse aria-label). Pass `copy={{ connected, disconnected, collapse }}` to localize. Localize the footer Test row separately via `testCopy` (forwarded as the TestRow `copy`): `testCopy={{ idle, testing, test, retest }}`. The `title` / `desc` / `idleHint` / field placeholders are your own content — pass them in whatever language you need (the examples above show zh-CN content).
- Surface (bg / border / radius) comes from `<Card>`; this adds overflow + tint + the bands. Shell classes live here under `ax-conncard-css` — a single source (no per-card mirroring).
