import React from "react";
import { Reasoning } from "./Reasoning.jsx";

export default {
  title: "AI/Reasoning",
  component: Reasoning,
  argTypes: {
    streaming: { control: "boolean" },
    defaultOpen: { control: "boolean" },
  },
  args: {
    duration: "3.2s",
    steps: [
      "先确认约束：延迟优先",
      "排除批处理方案",
      "选定流式架构",
    ],
  },
};

export const Collapsed = {};

export const Expanded = {
  args: {
    defaultOpen: true,
    duration: "4.8s",
    steps: [
      <span key="1">
        <strong>Constraint:</strong> p95 must stay under 300ms
      </span>,
      "Batch scoring breaks the budget at 1.2s per call",
      "Stream tokens and rank incrementally instead",
      <span key="4">
        <strong>Decision:</strong> streaming pipeline, cache keyed by content hash
      </span>,
    ],
  },
};

export const Streaming = {
  args: {
    streaming: true,
    duration: undefined,
    steps: ["拆解问题为三个子目标", "检索相关上下文", "综合答案"],
  },
};
