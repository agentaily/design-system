Action menu with icons, shortcuts, danger items, separators and labels.

```jsx
<DropdownMenu align="end" trigger={<IconButton label="More">⋯</IconButton>} items={[
  { type: "label", label: "Conversation" },
  { label: "Rename", icon: <ChatIcon name="pen" />, shortcut: "⌘R", onSelect: rename },
  { type: "separator" },
  { label: "Delete", icon: <ChatIcon name="trash" />, danger: true, onSelect: del },
]} />
```
