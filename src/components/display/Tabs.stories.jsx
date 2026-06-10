import React from "react";
import { Tabs } from "./Tabs.jsx";

const chatTabs = [
  { id: "all", label: "All", count: 12 },
  { id: "starred", label: "Starred", count: 3 },
  { id: "archived", label: "Archived" },
];

export default {
  title: "Display/Tabs",
  component: Tabs,
  args: { items: chatTabs },
};

export const Default = {
  render: (args) => {
    const [active, setActive] = React.useState("all");
    return <Tabs {...args} active={active} onChange={setActive} />;
  },
};

export const StringItems = {
  render: () => {
    const [active, setActive] = React.useState("Overview");
    return <Tabs items={["Overview", "Usage", "Keys", "Billing"]} active={active} onChange={setActive} />;
  },
};

export const WithPanels = {
  render: () => {
    const [active, setActive] = React.useState("usage");
    const panels = {
      usage: "1,284 messages this month. 2.1M tokens in, 480k out.",
      limits: "60 requests/min, 128k context, 4,096 max output tokens.",
      logs: "Last error 14 minutes ago: rate limit hit. Retry in 18s.",
    };
    return (
      <div style={{ maxWidth: 480 }}>
        <Tabs
          items={[
            { id: "usage", label: "Usage" },
            { id: "limits", label: "Limits" },
            { id: "logs", label: "Logs", count: 1 },
          ]}
          active={active}
          onChange={setActive}
        />
        <p style={{ fontSize: 14, color: "var(--text-muted)", padding: "16px 2px 0", margin: 0 }}>
          {panels[active]}
        </p>
      </div>
    );
  },
};
