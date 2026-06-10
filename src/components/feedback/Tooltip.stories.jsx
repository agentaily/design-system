import React from "react";
import { Tooltip } from "./Tooltip.jsx";
import { Button } from "../buttons/Button.jsx";

const CopyIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2"></rect>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
  </svg>
);

export default {
  title: "Feedback/Tooltip",
  component: Tooltip,
  argTypes: {
    side: { control: "select", options: ["top", "bottom"] },
  },
};

export const Default = {
  render: () => (
    <div style={{ padding: "48px 24px" }}>
      <Tooltip label="Copy">
        <Button variant="secondary" size="sm">
          {CopyIcon}
        </Button>
      </Tooltip>
    </div>
  ),
};

export const Sides = {
  render: () => (
    <div style={{ display: "flex", gap: 24, padding: "48px 24px" }}>
      <Tooltip label="⌘K to open" side="top">
        <Button variant="secondary">Command palette</Button>
      </Tooltip>
      <Tooltip label="128k context" side="bottom">
        <Button variant="secondary">Model info</Button>
      </Tooltip>
    </div>
  ),
};
