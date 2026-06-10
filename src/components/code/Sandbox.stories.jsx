import React from "react";
import { Sandbox } from "./Sandbox.jsx";
import { Terminal } from "./Terminal.jsx";

export default {
  title: "Code/Sandbox",
  component: Sandbox,
  argTypes: {
    status: { control: "select", options: ["running", "booting", "stopped"] },
  },
  args: { id: "sb-7f29c4", status: "running", region: "sfo" },
};

export const Running = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <Sandbox id="sb-7f29c4" status="running" region="sfo">
        <Terminal
          title="bash"
          lines={[
            { type: "command", text: "npm start" },
            { type: "output", text: "ready on http://localhost:3000 in 0.4s" },
          ]}
        />
      </Sandbox>
    </div>
  ),
};

export const Lifecycle = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420 }}>
      <Sandbox id="sb-a31f08" status="booting" region="sfo" />
      <Sandbox id="sb-7f29c4" status="running" region="sfo" />
      <Sandbox id="sb-c90b21" status="stopped" region="fra" />
    </div>
  ),
};

export const HeaderOnly = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Sandbox id="sb-d41d8c" status="running" />
    </div>
  ),
};
