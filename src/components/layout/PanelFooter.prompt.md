The optional **footer content** for a `PanelSheet` / `SettingsSheet` `footer` slot — a status region (left, fills) + an actions region (right, pinned), aligned to the sheet gutters. It's the generic footer primitive; for a settings save bar use `<SettingsSaveBar>` (which composes this).

```jsx
import { PanelSheet, PanelFooter, Button, Icon } from "@agentaily/design-system";
```

### Status only (no forced buttons)

The sheet header already has a ✕ close, so a status-only footer is complete — don't add a "Done" button that just duplicates it.

```jsx
<PanelSheet
  footer={
    <PanelFooter
      status={
        <>
          <Icon name="info" size={14} style={{ color: "var(--text-faint)" }} />
          <span>未连接的服务无法运行</span>
        </>
      }
    />
  }
>
  …
</PanelSheet>
```

### With real actions

Use the `actions` slot only for genuinely useful, non-duplicate actions (e.g. a docs link, "re-test all"):

```jsx
<PanelFooter
  status={<span>未连接的服务无法运行</span>}
  actions={
    <Button variant="ghost" icon={<Icon name="external" size={13} />}>
      查看文档
    </Button>
  }
/>
```

- **`status`** fills the left (`.ax-psheet__foot-status`), **`actions`** pins right (`.ax-psheet__foot-actions`); both align to the sheet's header gutters.
- Renders only the slots — the sticky band + border come from the sheet. Use it inside a sheet's `footer` prop, not on its own.
- In `SettingsSheet` with a `nav`, the footer is scoped to the content pane (left edge stops at the rail).
