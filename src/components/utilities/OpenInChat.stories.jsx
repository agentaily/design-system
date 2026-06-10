import React from "react";
import { OpenInChat } from "./OpenInChat.jsx";

export default {
  title: "Utilities/OpenInChat",
  component: OpenInChat,
  args: { href: "https://agentaily.chat/c/7f29c4", logoSrc: "/logo/agentaily-mark-white.svg" },
};

export const Default = {};

export const CustomLabel = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <OpenInChat label="Continue this chat" href="https://agentaily.chat/c/7f29c4" logoSrc="/logo/agentaily-mark-white.svg" />
      <OpenInChat label="在 agentaily 中打开" href="https://agentaily.chat/c/7f29c4" logoSrc="/logo/agentaily-mark-white.svg" />
    </div>
  ),
};

export const WithoutLogo = {
  render: () => <OpenInChat label="Open in agentaily" href="https://agentaily.chat/c/7f29c4" logoSrc="" />,
};
