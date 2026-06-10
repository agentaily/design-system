import React from "react";
import { Separator } from "./Separator.jsx";
import { Button } from "../buttons/Button.jsx";

export default {
  title: "Display/Separator",
  component: Separator,
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    label: { control: "text" },
  },
  args: { orientation: "horizontal" },
};

export const Default = {};

export const BetweenContent = {
  render: () => (
    <div style={{ maxWidth: 420, fontSize: 14, color: "var(--text-muted)" }}>
      <p style={{ margin: 0 }}>Conversations are kept for 30 days.</p>
      <Separator />
      <p style={{ margin: 0 }}>Exports include every message and attachment.</p>
    </div>
  ),
};

export const Vertical = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--text-muted)",
      }}
    >
      <span>128k context</span>
      <Separator orientation="vertical" />
      <span>0.4s first token</span>
      <Separator orientation="vertical" />
      <span>30-day retention</span>
    </div>
  ),
};

export const WithLabel = {
  render: () => (
    <div style={{ display: "grid", maxWidth: 320 }}>
      <Button variant="secondary" full>
        Continue with SSO
      </Button>
      <Separator label="OR" />
      <Button variant="secondary" full>
        Use an API key
      </Button>
    </div>
  ),
};
