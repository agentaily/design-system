Three-pane docs frame — section nav · article · on-this-page TOC.

```jsx
<DocsLayout
  sections={[
    { title: "Get started", items: ["Introduction", "Quickstart"] },
    { title: "Guides", items: ["Core concepts", "Examples"] },
  ]}
  activeItem={item}
  onNavigate={setItem}
  toc={["Overview", "First section"]}
  activeToc={toc}
  onTocChange={setToc}
>
  <Badge variant="outline">GUIDE</Badge>
  <h1>Page title</h1>
  <p>Your article body…</p>
</DocsLayout>
```

Nav/TOC are controlled (`activeItem`/`onNavigate`, `activeToc`/`onTocChange`) or self-manage if omitted. **Responsive:** the TOC pane hides below 1080px; below 760px a top bar with a hamburger appears and the section nav becomes an off-canvas drawer (tap a item or the scrim to close).
