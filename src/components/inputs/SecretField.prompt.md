Masked credential input with a show/hide eye toggle — for API keys and secrets.

```jsx
const { SecretField } = window.AxiomDesignSystem_7fc962;

<SecretField
  label="API KEY"
  value={key}
  onChange={setKey}
  placeholder="sk-xxxxxxxxxxxxxxxx"
  error={invalid ? "此项必填" : undefined}
/>;
```

- Toggles between `password` and `text`; the eye button is `tabIndex=-1` so it never steals tab focus.
- Mono input by default (keys read better in mono). `hint` shows when there's no `error`.
