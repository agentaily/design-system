import React from "react";
import { RadioGroup } from "./RadioGroup.jsx";

export default {
  title: "Inputs/RadioGroup",
  component: RadioGroup,
};

export const Default = {
  render: () => {
    const [plan, setPlan] = React.useState("free");
    return (
      <RadioGroup
        name="plan"
        value={plan}
        onChange={setPlan}
        options={[
          { value: "free", label: "Free", description: "50 messages/day" },
          { value: "pro", label: "Pro", description: "Unlimited + memory" },
        ]}
      />
    );
  },
};

export const Row = {
  render: () => {
    const [lang, setLang] = React.useState("en");
    return (
      <RadioGroup
        name="language"
        value={lang}
        onChange={setLang}
        row
        options={[
          { value: "en", label: "English" },
          { value: "zh", label: "中文" },
        ]}
      />
    );
  },
};

export const WithDisabledOption = {
  render: () => {
    const [tier, setTier] = React.useState("standard");
    return (
      <RadioGroup
        name="tier"
        value={tier}
        onChange={setTier}
        options={[
          { value: "standard", label: "Standard", description: "Median latency 0.4s" },
          { value: "batch", label: "Batch", description: "Up to 24h turnaround" },
          { value: "dedicated", label: "Dedicated", description: "Contact sales", disabled: true },
        ]}
      />
    );
  },
};

export const StringOptions = {
  render: () => {
    const [size, setSize] = React.useState("medium");
    return (
      <RadioGroup
        name="context"
        value={size}
        onChange={setSize}
        row
        options={["small", "medium", "large"]}
      />
    );
  },
};
