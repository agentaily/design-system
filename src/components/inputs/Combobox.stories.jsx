import React from "react";
import { Combobox } from "./Combobox.jsx";

export default {
  title: "Inputs/Combobox",
  component: Combobox,
};

export const Default = {
  render: () => {
    const [model, setModel] = React.useState("agentaily-2");
    return (
      <div style={{ minHeight: 300 }}>
        <Combobox
          value={model}
          onChange={setModel}
          options={["agentaily-2", "agentaily-2-mini", "agentaily-1"]}
          placeholder="Select a model"
          searchPlaceholder="Search models"
        />
      </div>
    );
  },
};

export const Empty = {
  render: () => {
    const [value, setValue] = React.useState();
    return (
      <div style={{ minHeight: 300 }}>
        <Combobox
          value={value}
          onChange={setValue}
          options={["agentaily-2", "agentaily-2-mini", "agentaily-1"]}
          placeholder="Select a model"
        />
      </div>
    );
  },
};

export const WithLabels = {
  render: () => {
    const [region, setRegion] = React.useState("us-east-1");
    return (
      <div style={{ minHeight: 300 }}>
        <Combobox
          value={region}
          onChange={setRegion}
          placeholder="Select a region"
          searchPlaceholder="Search regions"
          options={[
            { value: "us-east-1", label: "US East (N. Virginia)" },
            { value: "us-west-2", label: "US West (Oregon)" },
            { value: "eu-central-1", label: "EU Central (Frankfurt)" },
            { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
            { value: "ap-northeast-1", label: "Asia Pacific (Tokyo)" },
          ]}
        />
      </div>
    );
  },
};

export const LongList = {
  render: () => {
    const [value, setValue] = React.useState();
    const options = Array.from({ length: 24 }, (_, i) => "agent-" + String(i + 1).padStart(2, "0"));
    return (
      <div style={{ minHeight: 320 }}>
        <Combobox
          value={value}
          onChange={setValue}
          options={options}
          placeholder="Select an agent"
          searchPlaceholder="Type to filter 24 agents"
        />
      </div>
    );
  },
};
