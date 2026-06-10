import React from "react";
import { PackageInfo } from "./PackageInfo.jsx";

export default {
  title: "Code/PackageInfo",
  component: PackageInfo,
  args: {
    name: "@agentaily/sdk",
    version: "2.1.0",
    description: "Official SDK for the agentaily API. Streaming, tools, voice.",
    stats: [
      { value: "128k", label: "weekly" },
      { value: "42 kB", label: "min+gz" },
      { value: "0", label: "deps" },
    ],
  },
};

export const Default = {};

export const Minimal = {
  render: () => <PackageInfo name="left-pad" version="1.3.0" />,
};

export const WithoutStats = {
  render: () => (
    <div style={{ maxWidth: 380 }}>
      <PackageInfo
        name="@agentaily/voice"
        version="0.4.2"
        description="Speech input, transcription and TTS personas."
      />
    </div>
  ),
};
