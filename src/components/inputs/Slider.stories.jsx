import React from "react";
import { Slider } from "./Slider.jsx";

export default {
  title: "Inputs/Slider",
  component: Slider,
};

export const Default = {
  render: () => {
    const [t, setT] = React.useState(0.7);
    return (
      <div style={{ width: 320 }}>
        <Slider label="Temperature" value={t} min={0} max={2} step={0.1} onChange={setT} />
      </div>
    );
  },
};

export const WithSuffix = {
  render: () => {
    const [p, setP] = React.useState(90);
    return (
      <div style={{ width: 320 }}>
        <Slider label="Top-p" value={p} suffix="%" onChange={setP} />
      </div>
    );
  },
};

export const Steps = {
  render: () => {
    const [tokens, setTokens] = React.useState(64);
    return (
      <div style={{ width: 320 }}>
        <Slider label="Max output" value={tokens} min={8} max={128} step={8} suffix="k" onChange={setTokens} />
      </div>
    );
  },
};

export const Disabled = {
  render: () => (
    <div style={{ width: 320 }}>
      <Slider label="Temperature" value={0.7} min={0} max={2} step={0.1} disabled />
    </div>
  ),
};

export const NoLabel = {
  render: () => {
    const [v, setV] = React.useState(40);
    return (
      <div style={{ width: 320 }}>
        <Slider value={v} onChange={setV} />
      </div>
    );
  },
};
