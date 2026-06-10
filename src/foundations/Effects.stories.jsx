import React from "react";

export default {
  title: "Foundations/Effects",
  parameters: { layout: "padded" },
};

const label = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-xs)",
  letterSpacing: "var(--tracking-label)",
  textTransform: "uppercase",
  color: "var(--text-faint)",
};

export const Radii = {
  name: "Radii — hard-edged",
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
      {[
        ["--radius-1", "2px", "chips, kbd"],
        ["--radius-2", "4px", "buttons, inputs"],
        ["--radius-3", "8px", "cards, dialogs"],
      ].map(([token, px, note]) => (
        <div key={token} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 96,
              height: 96,
              background: "var(--bg-2)",
              border: "1px solid var(--line-2)",
              borderRadius: `var(${token})`,
            }}
          />
          <div style={{ ...label, marginTop: 8 }}>{px}</div>
          <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{note}</div>
        </div>
      ))}
    </div>
  ),
};

export const Shadows = {
  name: "Shadows — floating layers only",
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 16 }}>
      {[
        ["--shadow-1", "subtle lift"],
        ["--shadow-2", "menus, popovers"],
        ["--shadow-3", "dialogs, marketing window"],
      ].map(([token, note]) => (
        <div key={token} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 140,
              height: 90,
              background: "var(--bg-2)",
              border: "1px solid var(--line-1)",
              borderRadius: "var(--radius-3)",
              boxShadow: `var(${token})`,
            }}
          />
          <div style={{ ...label, marginTop: 12 }}>{token}</div>
          <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{note}</div>
        </div>
      ))}
    </div>
  ),
};

export const Motion = {
  name: "Motion — decisive and damped",
  render: () => {
    const [on, setOn] = React.useState(false);
    return (
      <div style={{ display: "grid", gap: 24, maxWidth: 560 }}>
        <button
          type="button"
          onClick={() => setOn((v) => !v)}
          style={{
            alignSelf: "start",
            width: 120,
            height: 36,
            background: "var(--accent)",
            color: "var(--accent-fg)",
            border: "none",
            borderRadius: "var(--radius-2)",
            fontFamily: "var(--font-body)",
            fontWeight: "var(--weight-medium)",
            cursor: "pointer",
          }}
        >
          Run
        </button>
        {[
          ["--dur-1", "120ms", "hovers, presses"],
          ["--dur-2", "200ms", "reveals, toggles"],
          ["--dur-3", "320ms", "dialogs, page-level"],
        ].map(([token, ms, note]) => (
          <div key={token}>
            <div style={{ ...label, marginBottom: 6 }}>
              {token} · {ms} · {note}
            </div>
            <div
              style={{
                height: 20,
                width: 20,
                background: "var(--fg-1)",
                borderRadius: "var(--radius-1)",
                transform: on ? "translateX(400px)" : "translateX(0)",
                transition: `transform var(${token}) var(--ease-out)`,
              }}
            />
          </div>
        ))}
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          One ease: cubic-bezier(0.2, 0, 0, 1). No bounce, no parallax.
        </p>
      </div>
    );
  },
};

export const FocusRing = {
  name: "Focus ring",
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <button
        type="button"
        style={{
          height: 36,
          padding: "0 14px",
          background: "var(--accent)",
          color: "var(--accent-fg)",
          border: "none",
          borderRadius: "var(--radius-2)",
          fontFamily: "var(--font-body)",
          fontWeight: "var(--weight-medium)",
          boxShadow: "var(--ring)",
        }}
      >
        Focused button
      </button>
      <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
        Keyboard focus = double ring (--ring). Inputs swap border-color instead.
      </span>
    </div>
  ),
};
