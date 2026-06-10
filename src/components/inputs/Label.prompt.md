Form label — mono ALL-CAPS by default (the system motif), or `plain` for sentence case.

```jsx
<Label htmlFor="name" required>Display name</Label>
<Label plain>Remember me</Label>
```

Note: Input/Textarea/Select already render their own label via the `label` prop — reach for standalone `Label` when composing custom field layouts.
