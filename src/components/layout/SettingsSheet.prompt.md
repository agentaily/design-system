A floating **settings page** built on `<PanelSheet>` — the middle layer between the bare floating shell and the section content.

```jsx
import { SettingsSheet, PageSection, DeepSeekCard } from "@agentaily/design-system";
```

### The full chain

```
PanelSheet            floating layout shell (holds any content)
  └ SettingsSheet     settings page based on PanelSheet  ← this
      └ PageSection   the "集成" section (hero + body)    ← content slot
          └ DeepSeekCard   composed-in connection card
```

```jsx
function Settings({ onClose }) {
  const [section, setSection] = React.useState("integrations");
  const [cfg, setCfg] = React.useState(initialFromServer);
  const patch = (p) => setCfg((c) => ({ ...c, ...p }));

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
        <PageSection eyebrow="集成 · INTEGRATIONS" title="连接你的服务">
          <DeepSeekCard {...deepSeekWiring} />
        </PageSection>
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
