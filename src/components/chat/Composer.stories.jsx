import React from "react";
import { Composer } from "./Composer.jsx";

export default {
  title: "Chat/Composer",
  component: Composer,
};

export const Default = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [sent, setSent] = React.useState(null);
    return (
      <div style={{ maxWidth: 640 }}>
        <Composer
          value={value}
          onChange={setValue}
          onSend={() => {
            setSent(value.trim());
            setValue("");
          }}
        />
        {sent ? (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--text-faint)",
              margin: "10px 2px 0",
            }}
          >
            sent: {sent}
          </p>
        ) : null}
      </div>
    );
  },
};

export const Prefilled = {
  render: () => {
    const [value, setValue] = React.useState("解释一下 CAP 定理，给一个工程上的取舍例子。");
    return (
      <div style={{ maxWidth: 640 }}>
        <Composer value={value} onChange={setValue} onSend={() => setValue("")} />
      </div>
    );
  },
};

export const CustomModelAndPlaceholder = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div style={{ maxWidth: 640 }}>
        <Composer
          value={value}
          onChange={setValue}
          onSend={() => setValue("")}
          placeholder="有什么要解决的？"
          model="agentaily-2-mini"
        />
      </div>
    );
  },
};

export const Disabled = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <Composer value="" disabled placeholder="Waiting for the current run to finish…" />
    </div>
  ),
};
