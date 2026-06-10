import React from "react";
import { Spinner } from "./Spinner.jsx";

export default {
  title: "Feedback/Spinner",
  component: Spinner,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: { size: "md" },
};

export const Default = {};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const WithLabel = {
  render: () => (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <Spinner size="sm" />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--text-muted)",
        }}
      >
        Loading model — 0.4s
      </span>
    </div>
  ),
};
