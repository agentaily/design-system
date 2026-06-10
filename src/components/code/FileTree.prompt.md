Collapsible file tree with git status badges.

```jsx
<FileTree activePath="src/App.jsx" onSelect={open} tree={[
  { name: "src", type: "dir", children: [
    { name: "App.jsx", status: "mod", path: "src/App.jsx" },
    { name: "index.js", path: "src/index.js" },
  ]},
]} />
```
