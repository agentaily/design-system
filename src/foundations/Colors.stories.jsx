import React from "react";

export default {
  title: "Foundations/Colors",
  parameters: { layout: "padded" },
};

const label = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-xs)",
  letterSpacing: "var(--tracking-label)",
  textTransform: "uppercase",
  color: "var(--text-faint)",
};

function Swatch({ token, note, height = 64 }) {
  return (
    <div style={{ flex: 1, minWidth: 120 }}>
      <div
        style={{
          height,
          background: `var(${token})`,
          border: "1px solid var(--line-1)",
          borderRadius: "var(--radius-2)",
        }}
      />
      <div style={{ ...label, marginTop: 8 }}>{token}</div>
      {note && (
        <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: 2 }}>
          {note}
        </div>
      )}
    </div>
  );
}

const row = { display: "flex", gap: 16, marginBottom: 32 };

export const Scale = {
  name: "Surface scale",
  render: () => (
    <div>
      <div style={{ ...label, marginBottom: 12 }}>SURFACES</div>
      <div style={row}>
        <Swatch token="--bg-0" note="page canvas" />
        <Swatch token="--bg-1" note="panels, sidebar" />
        <Swatch token="--bg-2" note="cards, composer" />
        <Swatch token="--bg-3" note="hover fills, code" />
      </div>
      <div style={{ ...label, marginBottom: 12 }}>TEXT</div>
      <div style={row}>
        <Swatch token="--fg-1" note="primary text" />
        <Swatch token="--fg-2" note="secondary text" />
        <Swatch token="--fg-3" note="faint, placeholders" />
      </div>
    </div>
  ),
};

export const Accent = {
  name: "Accent — inversion, not hue",
  render: () => (
    <div>
      <div style={row}>
        <Swatch token="--accent" note="filled buttons, active states" />
        <Swatch token="--accent-hover" note="hover" />
        <Swatch token="--accent-fg" note="text on accent" />
      </div>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", maxWidth: 560 }}>
        The accent is the inverted foreground — white-on-black in dark, black-on-white in light.
        No hue anywhere. Toggle the theme in the toolbar to see the inversion.
      </p>
    </div>
  ),
};

export const Semantic = {
  name: "Semantic — status only",
  render: () => (
    <div>
      <div style={row}>
        <Swatch token="--ok" note="success" height={40} />
        <Swatch token="--warn" note="warning" height={40} />
        <Swatch token="--danger" note="error / destructive" height={40} />
      </div>
      <div style={row}>
        <Swatch token="--ok-dim" note="success fill" height={40} />
        <Swatch token="--warn-dim" note="warning fill" height={40} />
        <Swatch token="--danger-dim" note="error fill" height={40} />
      </div>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", maxWidth: 560 }}>
        Green, amber and red appear only as status — never decorative.
      </p>
    </div>
  ),
};

export const Hairlines = {
  name: "Borders & lines",
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 480 }}>
      <div
        style={{
          padding: 16,
          border: "1px solid var(--line-1)",
          borderRadius: "var(--radius-3)",
          background: "var(--bg-2)",
        }}
      >
        <span style={label}>--LINE-1</span>
        <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          resting hairline
        </div>
      </div>
      <div
        style={{
          padding: 16,
          border: "1px solid var(--line-2)",
          borderRadius: "var(--radius-3)",
          background: "var(--bg-2)",
        }}
      >
        <span style={label}>--LINE-2</span>
        <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          hover / strong border
        </div>
      </div>
    </div>
  ),
};
