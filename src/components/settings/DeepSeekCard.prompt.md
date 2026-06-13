A **pure-display** card for connecting a DeepSeek LLM key. Renders one card (masked key field · model select · help · Test row) — no state, no localStorage, no save bar, no gating. **The caller owns the config, persistence, Save, backend errors, and any readiness gate.** Reusable by any product wiring DeepSeek, not just the integration screen.

```jsx
import { DeepSeekCard, FeishuCard, Button } from "@agentaily/design-system";
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
  const allReady = cfg.dsStatus === "ok" && cfg.fsStatus === "ok";

  const save = async () => {
    setSaving(true);
    setSaveError("");
    try {
      // empty dsKey / secret mean "keep the stored one" — omit them
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
        model={cfg.dsModel}
        onModelChange={(v) => set({ dsModel: v })}
        status={cfg.dsStatus}
        result={cfg.dsResult}
        onTest={testDeepSeek}
        masked={cfg.hasStoredKey} // a key is stored server-side → echo masked
        keyError={cfg.dsKeyError} // field-level backend error, if any
      />

      <FeishuCard
        appId={cfg.appId}
        onAppIdChange={(v) => set({ appId: v })}
        secret={cfg.secret}
        onSecretChange={(v) => set({ secret: v, fsStatus: "idle" })}
        link={cfg.link}
        onLinkChange={(v) => set({ link: v })}
        status={cfg.fsStatus}
        result={cfg.fsResult}
        onTest={testFeishu}
        masked={cfg.hasStoredSecret}
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
- **`masked`:** while true and `apiKey` is empty, the field shows "已保存… 留空则保持不变" and still lets the user Test; the mask is never echoed back. Typing overrides it.
- **`keyError`:** render a backend/validation error directly under the key field.
- **`help`:** pass `{ title, steps, link }` (or a ready node) to override the default "如何获取 DeepSeek API Key" guide.
- The card never gates Save and never reports readiness — those are caller rules (`allReady` above).
