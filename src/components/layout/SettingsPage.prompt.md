Centered settings frame — sticky bar, heading, tabs, section cards.

```jsx
const { SettingsPage, Input, Button } = window.AxiomDesignSystem_7fc962;

<SettingsPage
  title="Settings"
  subtitle="Manage your profile and preferences."
  tabs={[
    { id: "general", label: "General" },
    { id: "profile", label: "Profile" },
  ]}
  activeTab={tab}
  onTabChange={setTab}
  actions={
    <>
      <Button variant="ghost" size="sm">
        Cancel
      </Button>
      <Button variant="primary" size="sm">
        Save
      </Button>
    </>
  }
>
  <SettingsPage.Card title="Profile" description="Shown across your workspace.">
    <Input label="DISPLAY NAME" placeholder="Your name" />
  </SettingsPage.Card>
</SettingsPage>;
```

Tabs are controlled (`activeTab`/`onTabChange`) or self-manage. `SettingsPage.Card` gives consistent section cards.
