"Point at what to change" review overlay. The user hovers a real element, clicks it, and types a change request that's sent to chat with the element's identity attached — so they locate precisely instead of describing in words.

```jsx
// 1) tag the elements that should be targetable:
<h1 data-mk-label="标题" data-mk-kind="文本">…</h1>
<button data-mk-label="提交按钮" data-mk-kind="按钮">…</button>

// 2) mount the layer over a position:relative pane when markup mode is on:
<div style={{ position: "relative" }}>
  {markupOn && (
    <MarkupLayer
      onClose={() => setMarkupOn(false)}
      onSend={(msg) => sendToChat(msg)}   // msg = "〔标题 · 文本〕把字号调大"
    />
  )}
</div>
```

- The parent **must** be `position: relative`; the layer fills it (`inset: 0`).
- Only elements with `data-mk-label` are targetable; `data-mk-kind` is an optional sub-label.
- Esc deselects (then closes); ⏎ sends, ⇧⏎ newlines. Nothing is persisted — it's a personal locate-and-describe tool.
