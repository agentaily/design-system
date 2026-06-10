Compose any control into a labelled field; `FieldGroup` stacks fields or wraps a titled fieldset.

```jsx
<FieldGroup legend="Profile">
  <Field label="Name" required hint="Shown publicly"><Input /></Field>
  <Field label="Notifications" row><Switch /></Field>
</FieldGroup>
```
