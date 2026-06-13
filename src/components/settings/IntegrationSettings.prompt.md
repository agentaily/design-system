The **集成 / Integrations section** of a settings page (L3/L4) — content, not a panel. It does not own a shell; drop it inside `<SettingsSheet>` (which floats it via `<PanelSheet>`). The section is **compositional**: slot connection cards into it via `children`, and it wraps them with the integration hero + a readiness rail. It owns **no save UI** — the container's `<SettingsSaveBar>` is the commit point. Exported as **`IntegrationSettings`** and identically **`ServiceConnections`**.

```jsx
import {
  SettingsSheet,
  IntegrationSettings,
  SettingsSaveBar,
  DeepSeekCard,
  FeishuCard,
} from "@agentaily/design-system";
```

### Compositional — 往里面塞卡片 (the intended use)

The host owns each card's state; the section just frames them. Drive the readiness rail with `ready` / `total`. **Explicit save** lives in the SettingsSheet footer via `<SettingsSaveBar>` — the integration config isn't `Form.useForm`-based (masked secrets + a separate Test action), so track dirty against the last-saved snapshot and feed the bar explicitly.

```jsx
const dirty = JSON.stringify(cfg) !== JSON.stringify(savedCfg);

<SettingsSheet
  open
  onClose={onClose}
  nav={[{ id: "integrations", label: "集成", icon: "plug" }]}
  footer={
    <SettingsSaveBar
      dirty={dirty}
      saving={saving}
      status={saveError ? "error" : "idle"}
      error={saveError}
      onSave={save}
      onReset={() => setCfg(savedCfg)}
    />
  }
>
  <IntegrationSettings ready={ready} total={2}>
    <DeepSeekCard {...deepSeekWiring} />
    <FeishuCard {...feishuWiring} />
    {/* add a third connection card here anytime — it just composes in */}
  </IntegrationSettings>
</SettingsSheet>;
```

### Standalone — default cards (no children)

Pass no children and it renders the built-in DeepSeek + Feishu pair from `config`, runs a mock Test, and derives the readiness rail itself. Good for demos / quick wiring.

```jsx
<IntegrationSettings config={cfg} onConfigChange={patch} />
```

- **`children`** = the cards (compositional). With children, drive the rail via **`ready` / `total`**; omit them (or set `showRail={false}`) to hide the rail.
- **Default mode** (no children): `config` + `onConfigChange` to control, or `defaultConfig` for internal state. Readiness derives from `dsStatus`/`fsStatus`. `onTestDeepSeek`/`onTestFeishu` replace the mock probes; `deepSeekProps` / `feishuProps` tune the built-in cards.
- **Save is the container's job** — the section emits changes via `onConfigChange` and exposes readiness; the page commits through `<SettingsSaveBar>` in the footer. The section renders no save button or error banner itself.
- **Test ≠ Save** — the cards' "测试连接" only verifies connectivity; persistence happens on the footer's 保存.
- **Copy:** `title` / `kicker` / `intro`.
- **Layering:** section composes cards (L3) + primitives; the floating shell is `SettingsSheet` → `PanelSheet`. Dependencies point down only.
