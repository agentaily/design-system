A **pure-display** card for connecting a Feishu (Lark) Bitable as a data sink. Renders one card (App ID · App Secret · share link · parsed App-Token/table read-out · security note · optional field-map table · help · Test row) — no state, no localStorage, no save bar, no gating. **The caller owns the config, persistence, Save, backend errors, and any readiness gate.** Pairs with `DeepSeekCard`.

```jsx
import { FeishuCard } from "@agentaily/design-system";
```

### Controlled + backend-wired (the only mode)

The host holds the config, persists it, and drives `status`/`result` from its own probe. The card auto-parses App Token + table id out of the share link for the read-out — that's the only thing it derives. See `DeepSeekCard` for the full screen-level example (Save bar + gate + backend-error display all live with the caller).

```jsx
function FeishuSection({ cfg, set }) {
  const testFeishu = async () => {
    set({ fsStatus: "testing", fsResult: "" });
    try {
      const r = await fetch("/api/integrations/test/feishu", { method: "POST" });
      const { ok, message } = await r.json();
      set({ fsStatus: ok ? "ok" : "error", fsResult: message });
    } catch (e) {
      set({ fsStatus: "error", fsResult: e.message });
    }
  };

  return (
    <FeishuCard
      appId={cfg.appId}
      onAppIdChange={(v) => set({ appId: v, fsStatus: "idle" })}
      secret={cfg.secret}
      onSecretChange={(v) => set({ secret: v, fsStatus: "idle" })}
      link={cfg.link}
      onLinkChange={(v) => set({ link: v, fsStatus: "idle" })}
      status={cfg.fsStatus}
      result={cfg.fsResult}
      onTest={testFeishu}
      masked={cfg.hasStoredSecret} // a secret is stored server-side → echo masked
      appIdError={cfg.appIdError} // field-level backend errors, if any
      secretError={cfg.secretError}
      linkError={cfg.linkError}
      // showMapping defaults to true once status === "ok"; override to force it:
      // showMapping={connected}
      // fieldMap={myRows}                // override the default RSVP sample
    />
  );
}
```

- **Pure display:** resets nothing on its own — clear a green pill via `status: "idle"` from your change handler.
- **`masked`:** stored secret echoes as "已保存… 留空则保持不变" and still allows Test; never re-submitted. Typing overrides.
- **Field errors:** `appIdError` / `secretError` / `linkError` render directly under their inputs.
- **Read-out:** App Token + 数据表 are parsed from `link` and shown with ✓/缺失 — purely from the prop. `parseFeishuLink(url)` is exported if you need the same parse.
- **`fieldMap` / `showMapping`:** the mapping table is sample data shown once connected; pass your own rows or control visibility.
