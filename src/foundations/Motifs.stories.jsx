import React from "react";

export default {
  title: "Foundations/Motifs",
  parameters: { layout: "padded" },
};

const label = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-xs)",
  letterSpacing: "var(--tracking-label)",
  textTransform: "uppercase",
  color: "var(--text-faint)",
};

export const BlockCursor = {
  name: "Block cursor ▍ — liveness",
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xl)",
          fontWeight: "var(--weight-medium)",
        }}
      >
        agentaily<span className="ax-cursor" style={{ marginLeft: 4 }} />
      </div>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", maxWidth: 520 }}>
        Blinks in steps(1) — mechanical, terminal-like. Used for streaming responses and the
        wordmark. Class: <code style={{ fontFamily: "var(--font-mono)" }}>.ax-cursor</code>.
      </p>
    </div>
  ),
};

export const DotGrid = {
  name: "Dot grid — potential space",
  render: () => (
    <div>
      <div
        className="ax-dotgrid"
        style={{
          height: 220,
          border: "1px solid var(--line-1)",
          borderRadius: "var(--radius-3)",
          display: "grid",
          placeItems: "center",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      >
        <span style={label}>EMPTY STATE / HERO SURFACE</span>
      </div>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", maxWidth: 520 }}>
        24px dot grid, usually mask-faded. The only texture allowed besides hairline rules.
      </p>
    </div>
  ),
};

export const CornerTicks = {
  name: "Corner ticks — precision",
  render: () => (
    <div>
      <div
        className="ax-ticks"
        style={{
          position: "relative",
          maxWidth: 360,
          padding: 24,
          background: "var(--bg-2)",
          border: "1px solid var(--line-1)",
        }}
      >
        <div style={{ ...label, marginBottom: 8 }}>FEATURED</div>
        <div style={{ fontSize: "var(--text-md)" }}>
          Two L-shaped ticks on opposite corners mark selection and featured cards.
        </div>
      </div>
    </div>
  ),
};

export const Logo = {
  name: "Logo & wordmark",
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <img src="/logo/agentaily-mark-white.svg" alt="agentaily mark" width={48} height={48} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xl)",
            fontWeight: "var(--weight-medium)",
          }}
        >
          agentaily<span className="ax-cursor" style={{ marginLeft: 4 }} />
        </span>
      </div>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", maxWidth: 520 }}>
        The mark is a cursor block inside corner ticks. The wordmark is typed, never drawn:
        lowercase mono "agentaily" + optional blinking cursor.
      </p>
    </div>
  ),
};

export const UnicodeAsUI = {
  name: "Unicode as UI",
  render: () => (
    <div style={{ display: "grid", gap: 12, fontFamily: "var(--font-mono)" }}>
      <div>
        <kbd
          style={{
            display: "inline-block",
            padding: "2px 6px",
            fontSize: "var(--text-xs)",
            background: "var(--bg-3)",
            border: "1px solid var(--line-2)",
            borderBottomWidth: 2,
            borderRadius: "var(--radius-1)",
          }}
        >
          ⌘
        </kbd>{" "}
        <kbd
          style={{
            display: "inline-block",
            padding: "2px 6px",
            fontSize: "var(--text-xs)",
            background: "var(--bg-3)",
            border: "1px solid var(--line-2)",
            borderBottomWidth: 2,
            borderRadius: "var(--radius-1)",
          }}
        >
          ⏎
        </kbd>{" "}
        <span style={{ ...label }}>KEYBOARD GLYPHS IN KBD</span>
      </div>
      <div>
        ▣ <span style={label}>MODEL CHIP GLYPH</span>
      </div>
      <div>
        ✕ <span style={label}>DISMISS</span>
      </div>
      <div>
        ✓ <span style={label}>COPY CONFIRMATION</span>
      </div>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", fontFamily: "var(--font-body)", maxWidth: 520 }}>
        These are text, set in mono. Emoji: never.
      </p>
    </div>
  ),
};
