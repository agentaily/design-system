import React from "react";
import { Image } from "./Image.jsx";

export default {
  title: "Utilities/Image",
  component: Image,
};

export const Default = {
  render: () => (
    <Image
      src="/logo/agentaily-mark-white.svg"
      alt="Agentaily mark"
      ratio={16 / 9}
      caption="agentaily-mark-white.svg"
      bordered
      width={360}
    />
  ),
};

export const Placeholder = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Image ratio={1} width={120} />
      <Image ratio={4 / 3} width={160} bordered />
    </div>
  ),
};

export const FixedSize = {
  render: () => (
    <Image
      src="/logo/agentaily-mark-white.svg"
      alt="Agentaily mark"
      width={96}
      height={96}
      bordered
    />
  ),
};

export const WithCaption = {
  render: () => <Image ratio={16 / 9} width={320} caption="frame 0042 · 1280x720" bordered />,
};
