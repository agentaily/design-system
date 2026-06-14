A **pure-display** card for connecting a DeepSeek LLM key. Renders one card (masked key field · help · Test row) — no state, no localStorage, no save bar, no gating. **The caller owns the config, persistence, Save, backend errors, and any readiness gate.** Reusable by any product wiring DeepSeek, not just the integration screen.

```jsx
import { DeepSeekCard, Button } from "@agentaily/design-system";
```

### Controlled + backend-wired (the only mode)

The host holds the config, persists it, draws its own Save button + backend-error bar + gate, and drives each card's `status`/`result` from its own probe. Stored secrets echo masked and are never re-submitted.

```jsx
function IntegrationsScreen({ initial, onClose }) {
  // The caller owns ALL state + persistence (here useState; in a real app a hook
  // backed by your API). The cards never touch localStorage.
  const [cfg, setCfg] = React.useState(initial);
  const [saving, setSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState(""); // backend 400 lives here
  const set = (patch) => setCfg((c) => ({ ...c, ...patch }));

  // run your probe, push status/result back into the caller's state:
  const testDeepSeek = async () => {
    set({ dsStatus: "testing", dsResult: "" });
    try {
      const r = await fetch("/api/integrations/test/deepseek", { method: "POST" });
      const { ok, message } = await r.json();
      set({ dsStatus: ok ? "ok" : "error", dsResult: message });
    } catch (e) {
      set({ dsStatus: "error", dsResult: e.message });
    }
  };

  // gating is the caller's rule, not the card's:
  const allReady = cfg.dsStatus === "ok";

  const save = async () => {
    setSaving(true);
    setSaveError("");
    try {
      // an empty dsKey means "keep the stored one" — omit it
      await fetch("/api/integrations", { method: "PUT", body: JSON.stringify(cfg) });
    } catch (e) {
      setSaveError(e.message);
    } finally {
      // ← the card has no error slot; you own it
      setSaving(false);
    }
  };

  return (
    <div>
      <DeepSeekCard
        apiKey={cfg.dsKey}
        onApiKeyChange={(v) => set({ dsKey: v, dsStatus: "idle", dsResult: "" })}
        status={cfg.dsStatus}
        result={cfg.dsResult}
        onTest={testDeepSeek}
        masked={cfg.hasStoredKey} // a key is stored server-side → echo masked
        keyError={cfg.dsKeyError} // field-level backend error, if any
      />

      {/* Save bar, gate, and backend-error display all belong to the caller: */}
      {saveError ? <div role="alert">{saveError}</div> : null}
      <Button variant="primary" disabled={!allReady || saving} onClick={save}>
        保存配置
      </Button>
    </div>
  );
}
```

- **Pure display:** the card resets nothing on its own. Clear a green pill by setting `status: "idle"` from your change handler (shown above).
- **`masked`:** while true and `apiKey` is empty, the field shows the masked placeholder + "leave blank to keep" hint and still lets the user Test; the mask is never echoed back. Typing overrides it.
- **`keyError`:** render a backend/validation error directly under the key field.
- **`help`:** pass `{ title, steps, link }` (or a ready node) to override the default "how to get a key" guide.
- The card never gates Save and never reports readiness — those are caller rules (`allReady` above).

### Locale-agnostic (`copy`)

Every user-facing string defaults to **English** (title, description, the `Connected`/`Not connected` summary, field label + placeholders + hint, and the Test row). DS ships no i18n — pass a `copy` object (any subset, deep-merged over the defaults) to localize. It is forwarded down to the `ConnectionCard` shell and its `TestRow`, so **one object covers the whole card**:

```jsx
<DeepSeekCard
  apiKey={cfg.dsKey}
  status={cfg.dsStatus}
  onTest={testDeepSeek}
  copy={{
    title: "DeepSeek",
    desc: "驱动对话式交互。用户发送的每一条消息，都通过这把密钥调用 DeepSeek 补全。",
    connected: "已连接",
    disconnected: "未连接",
    apiKeyLabel: "API KEY",
    keyPlaceholder: "sk-xxxxxxxxxxxxxxxxxxxxxxxx",
    maskedPlaceholder: "已保存 ········  ·  留空则保持不变",
    maskedHint: "已存密钥 · 留空表示不修改，输入新值即覆盖",
    idleHint: "填写密钥后测试连通性",
    test: "测试连接",
    retest: "重新测试",
    testing: "正在握手…",
    help: { title: "如何获取 DeepSeek API Key？", steps: […], link: { href, label } },
  }}
/>
```

The explicit `help` / `idleHint` props still win over `copy.help` / `copy.idleHint` when both are passed. (The `StatusPill` badge text inside the card is **not** covered by `copy` yet — it keeps its own zh-CN defaults; localizing it is a follow-up.)
