The standard **content layout for one titled section of a page** — eyebrow (锚点) + title + description header, then the body. Generic, not settings-specific: use it for any content block that wants the house heading rhythm (settings tabs, an onboarding step, a docs section, a dashboard panel…).

```jsx
import { PageSection } from "@agentaily/design-system";
```

```jsx
<PageSection
  eyebrow="通用 · GENERAL"
  title="偏好设置"
  description="工作区的基础偏好。"
  actions={
    <Button variant="ghost" size="sm">
      查看文档
    </Button>
  }
>
  <Form onSubmit={form.handleSubmit(persist)}>
    <Input label="显示名" {...form.register("name")} />…
  </Form>
</PageSection>
```

- **Header is all optional** — pass any of `eyebrow` / `title` / `description` / `actions`; omit all and only the body renders.
- **`actions`** sits to the right of the title (e.g. a "新建" / "查看文档" button).
- **`tight`** gives a smaller title + tighter spacing for stacked sub-sections within one page.
- **`headingLevel`** sets the title's `h1`–`h6` tag for a correct document outline.
- **In settings:** drop it into a `SettingsSheet` content pane and put the commit `SettingsSaveBar` in the sheet footer. The 集成 section is a `PageSection` hero with the connection cards (e.g. `DeepSeekCard`) as its body.
- `SettingsSection` remains exported as a **back-compat alias** of `PageSection`.
- Pure layout, no state. Namespace `.ax-psec*`.
