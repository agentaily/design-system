import React from "react";
import { VoiceSelector } from "./VoiceSelector.jsx";

export default {
  title: "Voice/VoiceSelector",
  component: VoiceSelector,
};

export const Default = {
  render: () => {
    const [voice, setVoice] = React.useState("ash");
    return (
      <div style={{ minHeight: 220 }}>
        <VoiceSelector
          value={voice}
          onChange={setVoice}
          voices={[
            { value: "ash", label: "Ash", tag: "calm" },
            { value: "echo", label: "Echo", tag: "bright" },
            { value: "wen", label: "文", tag: "zh" },
          ]}
        />
      </div>
    );
  },
};

export const StringShorthand = {
  render: () => {
    const [voice, setVoice] = React.useState("Ash");
    return (
      <div style={{ minHeight: 180 }}>
        <VoiceSelector value={voice} onChange={setVoice} voices={["Ash", "Echo", "Sage"]} />
      </div>
    );
  },
};
