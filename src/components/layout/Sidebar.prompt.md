Generic collapsible app sidebar. (The chat & docs kits use bespoke versions; this is the reusable one.)

```jsx
<Sidebar activeId={tab} onSelect={setTab} header={<Logo />} groups={[
  { label: "Main", items: [{ id: "home", label: "Home", icon: <Icon/> }, { id: "chats", label: "Chats", badge: 12 }] },
]} />
```
