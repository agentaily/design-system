import React from "react";
import { StatusPill } from "./StatusPill.jsx";

export default {
  title: "Display/StatusPill",
  component: StatusPill,
  argTypes: {
    status: { control: "select", options: ["idle", "testing", "ok", "error"] },
  },
  args: { status: "ok" },
};

export const Default = {};

export const AllStates = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      <StatusPill status="idle" />
      <StatusPill status="testing" />
      <StatusPill status="ok" />
      <StatusPill status="error" />
    </div>
  ),
};

export const CustomLabels = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <StatusPill status="idle" labels={{ idle: "未配置" }} />
      <StatusPill status="ok" labels={{ ok: "在线" }} />
    </div>
  ),
};
