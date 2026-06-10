File attachment display — three layouts: `grid` (thumbnails), `inline` (badges), `list` (rows + metadata).

```jsx
<Attachments variant="grid" onRemove={remove} files={[
  { id: "1", name: "mountain.jpg", type: "image/jpeg", src: "/mountain.jpg" },
  { id: "2", name: "report.pdf", type: "application/pdf", size: "2.4 MB" },
]} />
```

Media icon is auto-detected from `type`. Use grid in messages, inline in the composer, list in file managers. Omit `onRemove` for read-only.
