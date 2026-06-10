import React from "react";
import { Badge } from "./Badge.jsx";

export default {
  title: "Display/Badge",
  component: Badge,
  argTypes: {
    variant: { control: "select", options: ["neutral", "solid", "outline", "ok", "warn", "danger"] },
    dot: { control: "boolean" },
  },
  args: { variant: "neutral", dot: false, children: "Beta" },
};

export const Default = {};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Badge>v2.1.0</Badge>
      <Badge variant="solid">New</Badge>
      <Badge variant="outline">Beta</Badge>
      <Badge variant="ok">Stable</Badge>
      <Badge variant="warn">Deprecated</Badge>
      <Badge variant="danger">Removed</Badge>
    </div>
  ),
};

export const WithDot = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Badge variant="ok" dot>Online</Badge>
      <Badge variant="warn" dot>Degraded</Badge>
      <Badge variant="danger" dot>Offline</Badge>
      <Badge dot>Idle</Badge>
    </div>
  ),
};
