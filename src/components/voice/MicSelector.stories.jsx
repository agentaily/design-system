import React from "react";
import { MicSelector } from "./MicSelector.jsx";

export default {
  title: "Voice/MicSelector",
  component: MicSelector,
};

export const Default = {
  render: () => {
    const [mic, setMic] = React.useState("airpods");
    return (
      <MicSelector
        devices={[
          { value: "builtin", label: "MacBook Pro Microphone" },
          { value: "airpods", label: "AirPods Pro" },
          { value: "usb", label: "Yeti X" },
        ]}
        value={mic}
        level={60}
        onChange={setMic}
      />
    );
  },
};

export const InputLevels = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <MicSelector devices={["Built-in"]} value="Built-in" level={0} />
      <MicSelector devices={["Built-in"]} value="Built-in" level={40} />
      <MicSelector devices={["Built-in"]} value="Built-in" level={100} />
    </div>
  ),
};
