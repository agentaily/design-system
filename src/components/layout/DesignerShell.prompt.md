Two-pane AI-designer frame — chat on the left, live preview on the right, draggable divider, phone-collapsing. Pure frame; you supply the panes and mount overlays yourself.

```jsx
<DesignerShell
  crumb="脚本设计器"
  actions={<>
    <Button variant="secondary" size="sm" icon={<Icon name="share" size={14} />}>分享</Button>
  </>}
  account={<AccountControl user={user} onLogin={…} onLogout={…} />}
  chat={<MyThread /* …Composer at the bottom… */ />}
  preview={
    <div style={{ position: "relative", height: "100%" }}>
      <MyPreview />
      {markupOn && <MarkupLayer onClose={…} onSend={…} />}
    </div>
  }
/>
```

The preview pane is `position: relative`, so a `MarkupLayer` (inset:0) fills it. Divider drag is clamped by `minSplit`/`maxSplit`; phones show a segmented 对话/预览 switcher.

**Controlled split** (so a width slider/Tweak stays in sync and drag writes back):

```jsx
<DesignerShell split={t.split / 100} onSplitChange={(f) => setTweak("split", Math.round(f * 100))} … />
```

**Mobile labels accept nodes** — keep an icon + a live count badge:

```jsx
mobileLabels={{
  chat: <><Icon name="message" size={15} /> 对话</>,
  preview: <><Icon name="eye" size={15} /> 预览 {n ? <span className="ax-dshell__mcount">{n}</span> : null}</>,
}}
```

**Aligning the two panes' sub-headers** — the chat pane's header (`ConversationThread`) is `height: var(--bar-h)`. Give the preview pane its own sub-bar the same height by wrapping it in `ax-dshell__panebar` (or just set `height: var(--bar-h)`), so both bars line up:

```jsx
preview={
  <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <div className="ax-dshell__panebar"><Tabs … /><span style={{ flex: 1 }} />{/* view toggles */}</div>
    <div style={{ flex: 1, position: "relative", overflow: "auto" }}>{/* preview body + MarkupLayer */}</div>
  </div>
}
```

`--bar-h` (and `--topbar-h`) are layout tokens — change the bar height once and every pane bar follows.

**Mobile (< 720px)** — the two panes collapse to one at a time, with a segmented `对话 / 预览` switcher under the top bar. The right-side content isn't dropped — it's behind the 预览 tab. Design the preview content responsively (fluid width, its body scrolls); on phones the pane is full-width, so drop desktop-only controls (e.g. a desktop/phone width toggle) from the preview's `ax-dshell__panebar`. Drive which pane shows with `mobileView` / `onMobileViewChange` — e.g. jump to preview once generation finishes:

```jsx
const [mview, setMview] = React.useState("chat");
<DesignerShell mobileView={mview} onMobileViewChange={setMview} chat={…} preview={…} />
// after the first build completes:
if (isMobile) setMview("preview");
// reflect a field/section count on the preview tab:
mobileLabels={{ chat: "对话", preview: <>预览 {n ? <span className="ax-dshell__mcount">{n}</span> : null}</> }}
```
