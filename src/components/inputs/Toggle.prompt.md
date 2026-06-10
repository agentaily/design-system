Two-state pressable button; `ToggleGroup` is a segmented single-select.

```jsx
<Toggle pressed={bold} onPressedChange={setBold}>B</Toggle>

<ToggleGroup value={view} onChange={setView}
  options={[{ value: "chat", label: "Chat" }, { value: "code", label: "Code" }]} />
```

Pressed = inverted fill. For binary settings prefer `Switch`; use Toggle for toolbar/format state.
