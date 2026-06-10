import React from "react";

export default {
  title: "Foundations/Typography",
  parameters: { layout: "padded" },
};

const label = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-xs)",
  letterSpacing: "var(--tracking-label)",
  textTransform: "uppercase",
  color: "var(--text-faint)",
};

const SCALE = [
  ["--text-hero", "68px", "Reasoning, distilled"],
  ["--text-3xl", "44px", "Reasoning, distilled"],
  ["--text-2xl", "32px", "Reasoning, distilled"],
  ["--text-xl", "24px", "Reasoning, distilled"],
  ["--text-lg", "18px", "Reasoning, distilled"],
  ["--text-md", "15px", "先给结论,再给推导——不废话,不卖萌。"],
  ["--text-sm", "13px", "Secondary copy and control labels."],
  ["--text-xs", "12px", "TIMESTAMPS · LABELS"],
];

export const Scale = {
  name: "Type scale",
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      {SCALE.map(([token, px, sample]) => (
        <div key={token} style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
          <span style={{ ...label, width: 140, flex: "none" }}>
            {token} · {px}
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: `var(${token})`,
              fontWeight: parseInt(px) >= 24 ? "var(--weight-medium)" : "var(--weight-regular)",
              letterSpacing: parseInt(px) >= 24 ? "var(--tracking-tight)" : 0,
              lineHeight: parseInt(px) >= 24 ? "var(--leading-tight)" : "var(--leading-body)",
              whiteSpace: "nowrap",
            }}
          >
            {sample}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Families = {
  name: "Families",
  render: () => (
    <div style={{ display: "grid", gap: 32, maxWidth: 640 }}>
      <div>
        <div style={{ ...label, marginBottom: 8 }}>--FONT-DISPLAY / --FONT-BODY · SPACE GROTESK</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)" }}>
          Plain answers first, derivation second. 0.4s median response.
        </div>
      </div>
      <div>
        <div style={{ ...label, marginBottom: 8 }}>--FONT-MONO · JETBRAINS MONO</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)" }}>
          const tokens = 128_000; // context window
        </div>
      </div>
      <div>
        <div style={{ ...label, marginBottom: 8 }}>CJK FALLBACK · PINGFANG SC</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-md)" }}>
          有什么要解决的?
        </div>
      </div>
    </div>
  ),
};

export const Weights = {
  name: "Weights",
  render: () => (
    <div style={{ display: "grid", gap: 12, fontSize: "var(--text-xl)" }}>
      <div style={{ fontWeight: "var(--weight-regular)" }}>Regular 400 — body, prose</div>
      <div style={{ fontWeight: "var(--weight-medium)" }}>Medium 500 — display, buttons, emphasis</div>
      <div style={{ fontWeight: "var(--weight-bold)" }}>Bold 700 — rare, page titles</div>
    </div>
  ),
};

export const MonoLabel = {
  name: "Mono label motif",
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <span className="ax-label">CONVERSATIONS</span>
      <span className="ax-label">AGENTAILY MAY MAKE MISTAKES</span>
      <span className="ax-label">DROP FILES HERE</span>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", maxWidth: 520 }}>
        The signature: 12px JetBrains Mono, ALL-CAPS, +0.08em tracking, faint ink. Use
        <code style={{ fontFamily: "var(--font-mono)" }}> .ax-label</code>.
      </p>
    </div>
  ),
};
