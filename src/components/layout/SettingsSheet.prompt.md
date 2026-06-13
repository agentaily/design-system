A floating **settings page** built on `<PanelSheet>` — the middle layer between the bare floating shell and the section content.

```jsx
import {
  SettingsSheet,
  IntegrationSettings,
  DeepSeekCard,
  FeishuCard,
} from "@agentaily/design-system";
```

### The full chain

```
PanelSheet            floating layout shell (holds any content)
  └ SettingsSheet     settings page based on PanelSheet  ← this
      └ IntegrationSettings   the "集成" section          ← content slot
          └ DeepSeekCard / FeishuCard   composed-in cards
```

```jsx
function Settings({ onClose }) {
  const [section, setSection] = React.useState("integrations");
  const [cfg, setCfg] = React.useState(initialFromServer);
  const patch = (p) => setCfg((c) => ({ ...c, ...p }));
  const ready = (cfg.dsStatus === "ok" ? 1 : 0) + (cfg.fsStatus === "ok" ? 1 : 0);

  return (
    <SettingsSheet
      open
      onClose={onClose}
      crumb="设置"
      nav={[
        { id: "integrations", label: "集成", icon: "plug" },
        { id: "general", label: "通用", icon: "settings" },
        { id: "account", label: "账户", icon: "user" },
      ]}
      active={section}
      onNavigate={setSection}
    >
      {section === "integrations" && (
        <IntegrationSettings ready={ready} total={2}>
          <DeepSeekCard {...deepSeekWiring} />
          <FeishuCard {...feishuWiring} />
        </IntegrationSettings>
      )}
      {section === "general" && <GeneralSection />}
    </SettingsSheet>
  );
}
```

- **`nav`** draws the left section rail (strings or `{id,label,icon}`). Omit it for a single nav-less column.
- **Fixed rail + scrolling content:** with `nav`, the header and the rail stay put while only the content pane scrolls (independent scroll regions).
- **`footer`** is scoped to the **content pane** when `nav` is present — its left edge stops at the rail (not under it) and it justifies status-left / actions-right. With no `nav`, `footer` becomes a full-width PanelSheet footer aligned with the header.
- **Gate the footer per section.** `footer` is SettingsSheet-level, so compute it from the active section — only the section that needs one shows a footer (`footer={tabs[active].footer}`); other sections render no footer.
- **Per-tab save bar (the model).** Settings commit on an explicit 保存, not on edit (GitHub model). Put a `<SettingsSaveBar>` in the footer, scoped to the active tab — it pairs with `Form.useForm` for normal form tabs, or takes explicit `dirty`/`onSave` for non-form content like the connection section:

```jsx
footer={<SettingsSaveBar form={tabForm} onSave={persist} />}        // a Form.useForm tab
footer={<SettingsSaveBar dirty={dirty} saving={saving} onSave={save} onReset={revert} />}  // 集成 tab
```

- **Floats over everything** via PanelSheet (unlike an in-flow settings frame that lives inside an AppShell region and never floats).
