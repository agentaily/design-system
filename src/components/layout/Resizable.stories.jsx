import React from "react";
import { Resizable } from "./Resizable.jsx";

function Panel({ label, children }) {
  return (
    <div style={{ padding: 16, height: "100%", boxSizing: "border-box" }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          color: "var(--text-faint)",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--text-muted)",
          lineHeight: "var(--leading-body)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default {
  title: "Layout/Resizable",
  component: Resizable,
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    defaultSize: { control: "number" },
  },
};

export const Horizontal = {
  render: () => (
    <div style={{ maxWidth: 720, height: 360 }}>
      <Resizable
        defaultSize={45}
        first={<Panel label="Prompt">Summarize the attached log file. Keep it under 200 words.</Panel>}
        second={
          <Panel label="Response">
            The log covers 03:14–03:52 UTC. 412 requests, 3 failures, all from one
            client retrying with an expired key. Latency held at p50 0.4s.
          </Panel>
        }
        style={{ height: "100%" }}
      />
    </div>
  ),
};

export const Vertical = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <Resizable
        orientation="vertical"
        height={400}
        defaultSize={40}
        first={<Panel label="Editor">system: answer in plain text, cite sources.</Panel>}
        second={
          <Panel label="Preview">
            Plain text only. Each claim is followed by a bracketed source index.
          </Panel>
        }
      />
    </div>
  ),
};

export const Constrained = {
  render: () => (
    <div style={{ maxWidth: 720, height: 320 }}>
      <Resizable
        defaultSize={30}
        min={20}
        max={60}
        first={<Panel label="Sidebar">Drag the divider. This panel stays between 20% and 60%.</Panel>}
        second={<Panel label="Content">The remaining width belongs to this panel.</Panel>}
        style={{ height: "100%" }}
      />
    </div>
  ),
};
