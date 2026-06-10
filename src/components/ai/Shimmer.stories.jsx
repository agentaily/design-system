import React from "react";
import { Shimmer } from "./Shimmer.jsx";

export default {
  title: "AI/Shimmer",
  component: Shimmer,
  args: { children: "Searching the web…" },
};

export const Default = {};

export const LoadingLabels = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        fontSize: "var(--text-sm)",
      }}
    >
      <Shimmer>Searching the web…</Shimmer>
      <Shimmer>Reading 12 files…</Shimmer>
      <Shimmer>正在检索向量索引…</Shimmer>
      <Shimmer>Compiling the answer…</Shimmer>
    </div>
  ),
};

export const AsBlock = {
  args: {
    as: "p",
    children: "Indexing the repository — 4,218 files, about 40s remaining…",
  },
};

export const Mono = {
  render: () => (
    <Shimmer style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>
      search_web("CAP theorem proof") · 1.4s elapsed
    </Shimmer>
  ),
};
