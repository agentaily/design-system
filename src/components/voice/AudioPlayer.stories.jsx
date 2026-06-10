import React from "react";
import { AudioPlayer } from "./AudioPlayer.jsx";

export default {
  title: "Voice/AudioPlayer",
  component: AudioPlayer,
  argTypes: {
    progress: { control: { type: "range", min: 0, max: 100 } },
  },
  args: { duration: "0:48", progress: 35 },
};

export const Default = {
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <AudioPlayer {...args} />
    </div>
  ),
};

export const Playing = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <AudioPlayer playing duration="1:24" progress={62} />
    </div>
  ),
};

export const Interactive = {
  render: () => {
    const [playing, setPlaying] = React.useState(false);
    return (
      <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: 8 }}>
        <AudioPlayer duration="0:48" progress={playing ? 50 : 0} onToggle={setPlaying} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)" }}>
          state: {playing ? "playing" : "paused"}
        </span>
      </div>
    );
  },
};
