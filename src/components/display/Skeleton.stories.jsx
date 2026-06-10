import React from "react";
import { Skeleton } from "./Skeleton.jsx";

export default {
  title: "Display/Skeleton",
  component: Skeleton,
  argTypes: {
    variant: { control: "select", options: ["block", "text", "circle"] },
    lines: { control: { type: "number", min: 1 } },
  },
  args: { variant: "block", width: 120, height: 20, lines: 1 },
};

export const Default = {};

export const TextLines = {
  render: () => (
    <div style={{ maxWidth: 360, fontSize: 14 }}>
      <Skeleton variant="text" lines={3} />
    </div>
  ),
};

export const Circle = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Skeleton variant="circle" width={24} height={24} />
      <Skeleton variant="circle" width={32} height={32} />
      <Skeleton variant="circle" width={44} height={44} />
    </div>
  ),
};

export const ChatRowLoading = {
  render: () => (
    <div style={{ display: "flex", gap: 12, maxWidth: 420 }}>
      <Skeleton variant="circle" width={32} height={32} />
      <div style={{ flex: 1, fontSize: 14 }}>
        <Skeleton width={96} height={12} style={{ marginBottom: 8 }} />
        <Skeleton variant="text" lines={2} />
      </div>
    </div>
  ),
};
