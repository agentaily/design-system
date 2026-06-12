Standard product frame — sidebar + topbar + content. Every region is a slot.

```jsx
<AppShell
  nav={[
    { id: "overview", label: "Overview", icon: <Icon name="layout" size={16} /> },
    { id: "archive",  label: "Archive",  icon: <Icon name="archive" size={16} /> },
  ]}
  crumb={<>workspace / <b>Overview</b></>}
  actions={<Button variant="primary" size="sm" icon={<Icon name="plus" size={15} />}>New</Button>}
  account={<AccountControl user={user} onLogin={…} onLogout={…} />}
>
  {/* your screen */}
</AppShell>
```

Nav is controlled with `activeId` + `onNavigate`, or self-manages if you omit both. `brand` defaults to a static-cursor `BrandMark`. **Responsive:** below 860px the sidebar becomes an off-canvas drawer toggled by a hamburger in the top bar (tap a nav item or the scrim to close).
