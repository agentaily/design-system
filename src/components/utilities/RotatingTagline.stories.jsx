import React from "react";
import { RotatingTagline } from "./RotatingTagline.jsx";

export default {
  title: "Brand/RotatingTagline",
  component: RotatingTagline,
  argTypes: {
    gradient: { control: "boolean" },
    cursor: { control: "boolean" },
    breakAfterPrefix: { control: "boolean" },
    typeSpeed: { control: "number" },
    deleteSpeed: { control: "number" },
    hold: { control: "number" },
    flowDuration: { control: "text" },
  },
};

// Size/weight/family are inherited — wrap it in a styled headline container.
const headline = {
  fontFamily: "var(--font-display)",
  fontWeight: "var(--weight-medium)",
  letterSpacing: "var(--tracking-tight)",
  lineHeight: 1.1,
};

export const Default = {
  render: () => (
    <div style={{ ...headline, fontSize: 46 }}>
      <RotatingTagline breakAfterPrefix />
    </div>
  ),
};

export const CustomPhrases = {
  render: () => (
    <div style={{ ...headline, fontSize: 30, color: "var(--text-muted)" }}>
      <RotatingTagline
        prefix=""
        phrases={["更快推理", "更少废话", "更长上下文"]}
        flowDuration="3.5s"
      />
    </div>
  ),
};

export const English = {
  render: () => (
    <div style={{ ...headline, fontSize: 40 }}>
      <RotatingTagline
        prefix="Chat to "
        phrases={["build anything", "learn anything", "ship anything"]}
      />
    </div>
  ),
};

export const NoGradient = {
  render: () => (
    <div style={{ ...headline, fontSize: 40 }}>
      <RotatingTagline gradient={false} />
    </div>
  ),
};

export const NoCursor = {
  render: () => (
    <div style={{ ...headline, fontSize: 40 }}>
      <RotatingTagline cursor={false} />
    </div>
  ),
};
