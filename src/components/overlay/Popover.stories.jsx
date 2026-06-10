import React from "react";
import { Popover } from "./Popover.jsx";
import { Button } from "../buttons/Button.jsx";

export default {
  title: "Overlay/Popover",
  component: Popover,
  argTypes: {
    side: { control: "select", options: ["top", "bottom"] },
    align: { control: "select", options: ["start", "end"] },
    padded: { control: "boolean" },
  },
};

export const Default = {
  render: () => (
    <div style={{ minHeight: 220 }}>
      <Popover trigger={<Button variant="secondary">Model</Button>} padded>
        <div style={{ width: 220, display: "grid", gap: 6 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
              color: "var(--text-faint)",
            }}
          >
            Active model
          </span>
          <span style={{ fontSize: "var(--text-sm)", color: "var(--text-body)" }}>ax-1</span>
          <span
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--text-muted)",
              lineHeight: "var(--leading-snug)",
            }}
          >
            128k context. Median first token in 0.4s.
          </span>
        </div>
      </Popover>
    </div>
  ),
};

export const RenderFunctionChild = {
  render: () => (
    <div style={{ minHeight: 220 }}>
      <Popover trigger={<Button variant="secondary">Clear history</Button>} padded>
        {({ close }) => (
          <div style={{ width: 240, display: "grid", gap: 12 }}>
            <span
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-muted)",
                lineHeight: "var(--leading-snug)",
              }}
            >
              Removes 24 conversations from this device. This cannot be undone.
            </span>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Button variant="ghost" size="sm" onClick={close}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={close}>
                Clear
              </Button>
            </div>
          </div>
        )}
      </Popover>
    </div>
  ),
};

export const Placement = {
  render: () => (
    <div
      style={{
        minHeight: 280,
        display: "flex",
        gap: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Popover side="top" align="start" trigger={<Button variant="secondary">Top start</Button>} padded>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>Opens above.</span>
      </Popover>
      <Popover side="bottom" align="end" trigger={<Button variant="secondary">Bottom end</Button>} padded>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>Opens below, right-aligned.</span>
      </Popover>
    </div>
  ),
};
