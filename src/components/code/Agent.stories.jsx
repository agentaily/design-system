import React from "react";
import { Agent } from "./Agent.jsx";

export default {
  title: "Code/Agent",
  component: Agent,
  argTypes: {
    status: { control: "select", options: ["working", "idle", "error"] },
  },
  args: { name: "builder", model: "agentaily-2", status: "working", task: "Editing App.jsx" },
};

export const Working = {};

export const Statuses = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Agent name="builder" model="agentaily-2" status="working" task="Running tests" />
      <Agent name="scout" model="agentaily-2-mini" status="idle" />
      <Agent name="deploy" status="error" task="Build failed" />
    </div>
  ),
};

export const WithoutModel = {
  render: () => <Agent name="reviewer" status="idle" />,
};
