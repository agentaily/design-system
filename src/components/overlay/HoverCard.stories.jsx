import React from "react";
import { HoverCard } from "./HoverCard.jsx";

export default {
  title: "Overlay/HoverCard",
  component: HoverCard,
  argTypes: {
    side: { control: "select", options: ["top", "bottom"] },
  },
};

export const Default = {
  render: () => (
    <p
      style={{
        paddingTop: 160,
        maxWidth: 480,
        fontSize: "var(--text-sm)",
        color: "var(--text-muted)",
        lineHeight: "var(--leading-body)",
      }}
    >
      The 128k context window is documented in the{" "}
      <HoverCard trigger={<span style={{ color: "var(--text-body)" }}>model card</span>}>
        <span style={{ display: "block" }}>
          <span
            style={{
              display: "block",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--weight-medium)",
              color: "var(--text-body)",
            }}
          >
            Model card — ax-1
          </span>
          <span
            style={{
              display: "block",
              margin: "4px 0 8px",
              fontSize: "var(--text-xs)",
              color: "var(--text-muted)",
              lineHeight: "var(--leading-snug)",
            }}
          >
            128k context, tool use, structured output. Updated 2026-05-18.
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--text-faint)",
            }}
          >
            docs/models/ax-1
          </span>
        </span>
      </HoverCard>
      .
    </p>
  ),
};

export const SideBottom = {
  render: () => (
    <div style={{ paddingBottom: 160 }}>
      <HoverCard
        side="bottom"
        trigger={
          <span style={{ fontSize: "var(--text-sm)", color: "var(--text-body)" }}>@agentaily</span>
        }
      >
        <span style={{ display: "block" }}>
          <span
            style={{
              display: "block",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--weight-medium)",
              color: "var(--text-body)",
            }}
          >
            agentaily
          </span>
          <span
            style={{
              display: "block",
              marginTop: 4,
              fontSize: "var(--text-xs)",
              color: "var(--text-muted)",
              lineHeight: "var(--leading-snug)",
            }}
          >
            AI assistant. Answers in 0.4s, cites sources.
          </span>
        </span>
      </HoverCard>
    </div>
  ),
};
