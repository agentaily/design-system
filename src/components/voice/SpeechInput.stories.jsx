import React from "react";
import { SpeechInput } from "./SpeechInput.jsx";

export default {
  title: "Voice/SpeechInput",
  component: SpeechInput,
};

export const Default = {
  render: () => <SpeechInput />,
};

export const Recording = {
  render: () => <SpeechInput recording time="0:12" />,
};

export const Interactive = {
  render: () => {
    const [recording, setRecording] = React.useState(false);
    const [secs, setSecs] = React.useState(0);
    React.useEffect(() => {
      if (!recording) return undefined;
      const t = setInterval(() => setSecs((s) => s + 1), 1000);
      return () => clearInterval(t);
    }, [recording]);
    const toggle = () => {
      setRecording((r) => {
        if (!r) setSecs(0);
        return !r;
      });
    };
    const time = Math.floor(secs / 60) + ":" + String(secs % 60).padStart(2, "0");
    return <SpeechInput recording={recording} time={time} onToggle={toggle} />;
  },
};
