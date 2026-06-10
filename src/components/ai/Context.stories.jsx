import React from "react";
import { Context } from "./Context.jsx";

export default {
  title: "AI/Context",
  component: Context,
  args: { used: 42000, max: 128000 },
};

export const Default = {};

export const SplitInputOutput = {
  args: { used: 86000, max: 128000, input: 72000, output: 14000 },
};

export const NearCap = {
  args: { used: 118000, max: 128000, input: 109000, output: 9000 },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <Context label="Context" used={9500} max={32000} />
      <Context label="Context" used={86000} max={128000} input={72000} output={14000} />
      <Context label="上下文" used={118000} max={128000} input={109000} output={9000} />
    </div>
  ),
};
