import React from "react";
import { Icon } from "./Icon.jsx";

export default {
  title: "Utilities/Icon",
  component: Icon,
  argTypes: {
    name: { control: "select", options: Icon.names },
    size: { control: "number" },
    strokeWidth: { control: "number" },
  },
  args: { name: "send", size: 20, strokeWidth: 2 },
};

export const Default = {};

export const Gallery = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
        gap: 4,
        maxWidth: 720,
        color: "var(--text-body)",
      }}
    >
      {Icon.names.map((n) => (
        <div
          key={n}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            padding: "12px 4px",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-2)",
          }}
        >
          <Icon name={n} size={18} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--text-muted)",
            }}
          >
            {n}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16, color: "var(--text-body)" }}>
      {[14, 16, 18, 20, 24].map((s) => (
        <Icon key={s} name="settings" size={s} />
      ))}
    </div>
  ),
};

export const Colored = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Icon name="check" size={20} style={{ color: "var(--ok)" }} />
      <Icon name="warn" size={20} style={{ color: "var(--warn)" }} />
      <Icon name="x" size={20} style={{ color: "var(--danger)" }} />
    </div>
  ),
};

// The `monitor` glyph — added for the downstream form-design preview "desktop"
// view toggle. Lucide geometry (screen rect + stand foot); currentColor follows
// the active theme. Toggle Storybook's theme to verify paper/ink rendering.
export const Monitor = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16, color: "var(--text-body)" }}>
      {[14, 16, 18, 20, 24].map((s) => (
        <Icon key={s} name="monitor" size={s} />
      ))}
    </div>
  ),
};
