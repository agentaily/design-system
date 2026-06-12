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
  args: { size: 20, wordmark: true, cursor: true, blink: true },
};

export const Default = {};

export const MarkOnly = { args: { wordmark: false } };

export const StaticCursor = { args: { blink: false } };

export const NoCursor = { args: { cursor: false } };

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, color: "var(--text-body)" }}>
      <BrandMark size={16} wordmark />
      <BrandMark size={20} wordmark />
      <BrandMark size={28} wordmark />
    </div>
  ),
};
