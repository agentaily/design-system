import React from "react";
import { BrandMark } from "./BrandMark.jsx";

export default {
  title: "Utilities/BrandMark",
  component: BrandMark,
  argTypes: {
    size: { control: "number" },
    wordmark: { control: "boolean" },
    cursor: { control: "boolean" },
    blink: { control: "boolean" },
  },
  args: { size: 20, wordmark: true, cursor: false, blink: true },
};

// Default lockup: no cursor — shells read clean.
export const Default = {};

export const MarkOnly = { args: { wordmark: false } };

// Opt in to the block cursor (the brand liveness motif).
export const WithCursor = { args: { cursor: true } };

export const StaticCursor = { args: { cursor: true, blink: false } };

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, color: "var(--text-body)" }}>
      <BrandMark size={16} wordmark />
      <BrandMark size={20} wordmark />
      <BrandMark size={28} wordmark />
    </div>
  ),
};
