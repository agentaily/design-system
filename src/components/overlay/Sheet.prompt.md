Edge-anchored slide-in drawer on a blurred scrim.

```jsx
<Sheet open={open} side="right" title="Settings" onClose={close}>
  <SettingsForm />
</Sheet>
```

Sides: right (default), left, bottom. For centered modals use `Dialog`; for slide-in panels use Sheet.
