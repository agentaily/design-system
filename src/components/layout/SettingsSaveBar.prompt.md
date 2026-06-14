The **per-tab bottom save bar** for a settings page — GitHub model: one bar at the bottom of each tab, committing all the fields in that tab. Explicit commit, not auto-save. Pairs with `Form.useForm`.

```jsx
import { SettingsSheet, SettingsSaveBar, Form, Input, Select } from "@agentaily/design-system";
```

### A tab backed by `Form.useForm` (recommended)

The tab owns one form; the bar reads its dirty/valid/submitting state and is the only commit point.

```jsx
function GeneralTab() {
  const form = Form.useForm({ initialValues: { name: "", lang: "zh", theme: "system" } });
  const persist = async (values) => { await api.saveGeneral(values); form.reset(values); }; // reset baseline → clean
  return {
    body: (
      <Form onSubmit={form.handleSubmit(persist)}>
        <Input label="显示名" {...form.register("name")} />
        <Select label="语言" {...form.register("lang")} options={[…]} />
      </Form>
    ),
    footer: <SettingsSaveBar form={form} onSave={persist} />,
  };
}

// in SettingsSheet:
<SettingsSheet nav={[…]} active={tab} onNavigate={setTab} footer={current.footer}>
  {current.body}
</SettingsSheet>
```

- **`form`**: pass a `Form.useForm()` return. Save is disabled until `isDirty && isValid`, shows a spinner while `isSubmitting`, runs validation then your `onSave(values)` on click; the reset button calls `form.reset()`.
- **After a successful save**, call `form.reset(values)` so the saved values become the new clean baseline (the bar goes back to the clean hint).

### A tab that isn't useForm-based (e.g. the connection section)

Drive it explicitly — track dirty yourself and pass `status` for feedback:

```jsx
<SettingsSaveBar
  dirty={cfg !== savedCfg}
  saving={saving}
  status={saveError ? "error" : justSaved ? "saved" : "idle"}
  error={saveError}
  onSave={saveConfig}
  onReset={() => setCfg(savedCfg)}
/>
```

- **Per tab, not per page.** Compute the footer from the active tab so each tab commits its own fields (`footer={tabs[active].footer}`). A tab with nothing to save passes `footer={null}`.
- **Locale-agnostic.** All strings (`Save`, `Discard changes`, `Saving…`, `Saved`, the error/clean/dirty hints) default to **English**. Pass `copy={{ save, reset, saving, saved, error, cleanHint, dirtyHint }}` (any subset) to localize, or override a single label via the matching `saveLabel` / `resetLabel` / `cleanHint` / `dirtyHint` prop (those win over `copy`).
- **`hideWhenClean`**: set true to only reveal the bar once the tab is dirty (the bar slides in on first edit). Default keeps it visible with Save disabled.
- Layout matches the sheet footer: status fills left (aligns under the brand), actions pin right (align under the ✕).
- **Guarding tab switches**: if a tab is dirty, the consumer should confirm before switching `active` — the bar reports dirty via your own state, so gate `onNavigate` on it.
