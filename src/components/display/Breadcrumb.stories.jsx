import React from "react";
import { Breadcrumb } from "./Breadcrumb.jsx";

export default {
  title: "Display/Breadcrumb",
  component: Breadcrumb,
  argTypes: {
    separator: { control: "text" },
  },
  args: { items: ["API", "Reference", "Messages"], separator: "/" },
};

export const Default = {};

export const CustomSeparator = {
  render: () => <Breadcrumb separator="›" items={["Docs", "Guides", "Streaming"]} />,
};

export const WithObjectItems = {
  render: () => (
    <Breadcrumb
      items={[
        { id: "home", label: "Console" },
        { id: "keys", label: "API keys" },
        { id: "key-3", label: "sk-prod-01" },
      ]}
      onNavigate={(id) => console.log("navigate:", id)}
    />
  ),
};

export const LongTrail = {
  render: () => <Breadcrumb items={["Console", "Workspaces", "Team", "Settings", "Billing"]} />,
};
