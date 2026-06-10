import React from "react";

export default {
  title: "Foundations/Spacing",
  parameters: { layout: "padded" },
};

const label = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-xs)",
  letterSpacing: "var(--tracking-label)",
  textTransform: "uppercase",
  color: "var(--text-faint)",
};

const STEPS = [
  ["--space-1", 4],
  ["--space-2", 8],
  ["--space-3", 12],
  ["--space-4", 16],
  ["--space-5", 20],
  ["--space-6", 24],
  ["--space-8", 32],
  ["--space-10", 40],
  ["--space-12", 48],
  ["--space-16", 64],
  ["--space-20", 80],
  ["--space-24", 96],
];

export const Scale = {
  name: "4px scale",
  render: () => (
    <div style={{ display: "grid", gap: 10 }}>
      {STEPS.map(([token, px]) => (
        <div key={token} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ ...label, width: 120, flex: "none" }}>
            {token} · {px}
          </span>
          <div
            style={{
              width: px,
              height: 16,
              background: "var(--fg-1)",
              opacity: 0.85,
              borderRadius: 1,
            }}
          />
        </div>
      ))}
      <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", maxWidth: 520 }}>
        Outer space generous (sections 72–96px) — 大气;inner rhythm tight (8–16px) — 极客。
      </p>
    </div>
  ),
};

export const Layout = {
  name: "Layout constants",
  render: () => (
    <div style={{ display: "grid", gap: 20, maxWidth: 720 }}>
      {[
        ["--sidebar-w", "272px", "sidebar, fixed"],
        ["--thread-max", "760px", "chat reading column"],
        ["--container-max", "1120px", "marketing container"],
      ].map(([token, px, note]) => (
        <div key={token}>
          <div style={{ ...label, marginBottom: 6 }}>
            {token} · {px} · {note}
          </div>
          <div
            style={{
              height: 28,
              width: `calc(${px} / 1120 * 100%)`,
              maxWidth: "100%",
              background: "var(--bg-3)",
              border: "1px solid var(--line-2)",
              borderRadius: "var(--radius-1)",
            }}
          />
        </div>
      ))}
    </div>
  ),
};
