import React from "react";
import { Sheet } from "./Sheet.jsx";
import { Button } from "../buttons/Button.jsx";

function SettingsBody() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gap: 4 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--text-faint)",
          }}
        >
          Model
        </span>
        <span style={{ fontSize: "var(--text-sm)", color: "var(--text-body)" }}>ax-1</span>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
          128k context. Median first token in 0.4s.
        </span>
      </div>
      <div style={{ display: "grid", gap: 4 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--text-faint)",
          }}
        >
          History
        </span>
        <span style={{ fontSize: "var(--text-sm)", color: "var(--text-body)" }}>
          24 conversations on this device
        </span>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
          Deleting history cannot be undone.
        </span>
      </div>
    </div>
  );
}

export default {
  title: "Overlay/Sheet",
  component: Sheet,
  argTypes: {
    side: { control: "select", options: ["right", "left", "bottom"] },
  },
};

export const Triggered = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    return (
      <React.Fragment>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Open settings
        </Button>
        <Sheet open={open} side="right" title="Settings" onClose={() => setOpen(false)}>
          <SettingsBody />
        </Sheet>
      </React.Fragment>
    );
  },
};

export const OpenRight = {
  render: () => (
    <Sheet open side="right" title="Settings" onClose={() => {}}>
      <SettingsBody />
    </Sheet>
  ),
};

export const Sides = {
  render: function Render() {
    const [side, setSide] = React.useState(null);
    return (
      <React.Fragment>
        <div style={{ display: "flex", gap: 12 }}>
          <Button variant="secondary" onClick={() => setSide("right")}>
            Right
          </Button>
          <Button variant="secondary" onClick={() => setSide("left")}>
            Left
          </Button>
          <Button variant="secondary" onClick={() => setSide("bottom")}>
            Bottom
          </Button>
        </div>
        <Sheet open={side != null} side={side || "right"} title="Settings" onClose={() => setSide(null)}>
          <SettingsBody />
        </Sheet>
      </React.Fragment>
    );
  },
};
