import React from "react";
import { Sidebar } from "./Sidebar.jsx";
import { Button } from "../buttons/Button.jsx";

const HomeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path>
    <path d="M9 22V12h6v10"></path>
  </svg>
);

const ChatIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"></path>
  </svg>
);

const KeyIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5"></circle>
    <path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"></path>
  </svg>
);

const SettingsIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v4M12 19v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M1 12h4M19 12h4M4.2 19.8 7 17M17 7l2.8-2.8"></path>
  </svg>
);

const groups = [
  {
    label: "Main",
    items: [
      { id: "home", label: "Home", icon: HomeIcon },
      { id: "chats", label: "Chats", icon: ChatIcon, badge: 12 },
    ],
  },
  {
    label: "Account",
    items: [
      { id: "keys", label: "API keys", icon: KeyIcon, badge: 3 },
      { id: "settings", label: "Settings", icon: SettingsIcon },
    ],
  },
];

const header = (
  <span
    style={{
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-body)",
      whiteSpace: "nowrap",
    }}
  >
    agentaily
  </span>
);

const footer = (
  <span
    style={{
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      color: "var(--text-faint)",
      whiteSpace: "nowrap",
    }}
  >
    v1.4.2
  </span>
);

function Frame({ children }) {
  return (
    <div
      style={{
        display: "flex",
        height: 420,
        maxWidth: 720,
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-3)",
        overflow: "hidden",
      }}
    >
      {children}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-faint)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
        }}
      >
        Content
      </div>
    </div>
  );
}

export default {
  title: "Layout/Sidebar",
  component: Sidebar,
  argTypes: {
    collapsed: { control: "boolean" },
  },
};

export const Default = {
  render: function Render() {
    const [active, setActive] = React.useState("chats");
    return (
      <Frame>
        <Sidebar groups={groups} activeId={active} onSelect={setActive} header={header} footer={footer} />
      </Frame>
    );
  },
};

export const Collapsed = {
  render: () => (
    <Frame>
      <Sidebar groups={groups} activeId="chats" collapsed header={header} footer={footer} />
    </Frame>
  ),
};

export const Collapsible = {
  render: function Render() {
    const [active, setActive] = React.useState("home");
    const [collapsed, setCollapsed] = React.useState(false);
    return (
      <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
        <Button variant="secondary" size="sm" onClick={() => setCollapsed((c) => !c)}>
          Toggle sidebar ⌘B
        </Button>
        <Frame>
          <Sidebar
            groups={groups}
            activeId={active}
            onSelect={setActive}
            collapsed={collapsed}
            header={header}
            footer={footer}
          />
        </Frame>
      </div>
    );
  },
};
