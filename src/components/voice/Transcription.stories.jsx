import React from "react";
import { Transcription } from "./Transcription.jsx";

export default {
  title: "Voice/Transcription",
  component: Transcription,
};

export const Live = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Transcription
        live
        segments={["Summarize the last deploy log and list every", "error with a timestamp"]}
        interim=" so I can file"
      />
    </div>
  ),
};

export const Final = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Transcription text="Summarize the last deploy log and list every error with a timestamp so I can file them as issues." />
    </div>
  ),
};

export const WithSpeakers = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Transcription
        segments={[
          { speaker: "You", text: "解释一下 attention 机制,80 字以内。" },
          { speaker: "agentaily", text: "Attention 给每个 token 分配权重,模型据此决定上下文中谁更重要。" },
        ]}
      />
    </div>
  ),
};

export const LiveWithSpeakers = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Transcription
        live
        segments={[
          { speaker: "Lin", text: "Can we cut the latency below 300ms?" },
          { speaker: "Kai", text: "Streaming the first token helps;" },
        ]}
        interim=" the rest depends on"
      />
    </div>
  ),
};
