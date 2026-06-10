import React from "react";
import { Kbd } from "./Kbd.jsx";

export default {
  title: "Display/Kbd",
  component: Kbd,
  args: { children: "K" },
};

export const Default = {};

export const Combo = {
  render: () => (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </span>
  ),
};

export const InlineHint = {
  render: () => (
    <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>
      Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command menu, <Kbd>Esc</Kbd> to stop generation.
    </p>
  ),
};

export const CommonKeys = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <Kbd>⌘</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>Ctrl</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>/</Kbd>
    </div>
  ),
};
