import React from "react";
import { ScrollArea } from "./ScrollArea.jsx";

const sessions = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: `Session ${String(i + 1).padStart(2, "0")}`,
  meta: `${(i % 9) + 3} messages`,
}));

export default {
  title: "Layout/ScrollArea",
  component: ScrollArea,
  argTypes: {
    maxHeight: { control: "number" },
  },
};

export const List = {
  render: () => (
    <div
      style={{
        width: 320,
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-3)",
        overflow: "hidden",
      }}
    >
      <ScrollArea maxHeight={320}>
        <div style={{ padding: 8 }}>
          {sessions.map((s) => (
            <div
              key={s.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                padding: "8px 10px",
                borderRadius: "var(--radius-2)",
                fontSize: "var(--text-sm)",
                color: "var(--text-body)",
              }}
            >
              <span>{s.title}</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--text-faint)",
                }}
              >
                {s.meta}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};

export const Prose = {
  render: () => (
    <div
      style={{
        maxWidth: 480,
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-3)",
        overflow: "hidden",
      }}
    >
      <ScrollArea maxHeight={240}>
        <div
          style={{
            padding: 16,
            fontSize: "var(--text-sm)",
            color: "var(--text-muted)",
            lineHeight: "var(--leading-body)",
          }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <p key={i} style={{ margin: "0 0 12px" }}>
              Rate limits apply per key. The default tier allows 60 requests per
              minute and 128k tokens per request. When a limit is hit the API
              returns 429 with a Retry-After header — back off and retry, do not
              rotate keys.
            </p>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};
