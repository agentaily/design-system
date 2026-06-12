import React from "react";
import { DeepSeekCard } from "./DeepSeekCard.jsx";

export default {
  title: "Settings/DeepSeekCard",
  component: DeepSeekCard,
  parameters: { layout: "padded" },
  argTypes: {
    status: { control: "select", options: ["idle", "testing", "ok", "error"] },
  },
};

const Frame = ({ children }) => <div style={{ maxWidth: 560, margin: "0 auto" }}>{children}</div>;

// A tiny caller that owns the config and drives status/result from a mock probe —
// exactly the contract the pure-display card expects (props in, events out, no
// internal state, no localStorage). The host clears the green pill on edit.
function Host({ initial, masked = false, showUsageCap = false }) {
  const [cfg, setCfg] = React.useState({
    dsKey: "",
    dsModel: "deepseek-chat",
    dsStatus: "idle",
    dsResult: "",
    capOn: false,
    cap: "",
    ...initial,
  });
  const set = (patch) => setCfg((c) => ({ ...c, ...patch }));
  const test = () => {
    set({ dsStatus: "testing", dsResult: "" });
    setTimeout(
      () => set({ dsStatus: "ok", dsResult: "连接正常 · 延迟 0.4s · " + cfg.dsModel }),
      700,
    );
  };
  return (
    <Frame>
      <DeepSeekCard
        apiKey={cfg.dsKey}
        onApiKeyChange={(v) => set({ dsKey: v, dsStatus: "idle", dsResult: "" })}
        model={cfg.dsModel}
        onModelChange={(v) => set({ dsModel: v })}
        status={cfg.dsStatus}
        result={cfg.dsResult}
        onTest={test}
        masked={masked}
        showUsageCap={showUsageCap}
        capOn={cfg.capOn}
        onCapOnChange={(on) => set({ capOn: on })}
        cap={cfg.cap}
        onCapChange={(v) => set({ cap: v })}
      />
    </Frame>
  );
}

export const Default = { render: () => <Host /> };

export const Connected = {
  render: () => (
    <Host
      initial={{
        dsKey: "sk-demo1234567890",
        dsStatus: "ok",
        dsResult: "连接正常 · 延迟 0.4s · deepseek-chat",
      }}
    />
  ),
};

export const Failed = {
  render: () => (
    <Host
      initial={{ dsKey: "sk-bad", dsStatus: "error", dsResult: "401 · API key 无效或已撤销" }}
    />
  ),
};

// A key is already stored server-side (`masked`): the field echoes a masked
// placeholder + "leave blank to keep", the user can Test without re-entering it,
// and the mask is never submitted back. Typing a new value overrides.
export const MaskedStoredKey = {
  render: () => (
    <Host
      masked
      initial={{
        dsModel: "deepseek-reasoner",
        dsStatus: "ok",
        dsResult: "连接正常 · deepseek-reasoner",
      }}
    />
  ),
};

export const WithUsageCap = {
  render: () => <Host showUsageCap initial={{ capOn: true, cap: "200" }} />,
};
