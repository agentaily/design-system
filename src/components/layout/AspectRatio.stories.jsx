import React from "react";
import { AspectRatio } from "./AspectRatio.jsx";

export default {
  title: "Layout/AspectRatio",
  component: AspectRatio,
  argTypes: {
    ratio: { control: "number" },
  },
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AspectRatio ratio={16 / 9} />
    </div>
  ),
};

export const Ratios = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, maxWidth: 720 }}>
      <AspectRatio ratio={1} />
      <AspectRatio ratio={4 / 3} />
      <AspectRatio ratio={16 / 9} />
      <AspectRatio ratio={21 / 9} />
    </div>
  ),
};

export const WithContent = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AspectRatio ratio={16 / 9}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "repeating-linear-gradient(45deg, var(--surface-raised) 0 12px, var(--surface-panel) 12px 24px)",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
          }}
        >
          1280 × 720
        </div>
      </AspectRatio>
    </div>
  ),
};
