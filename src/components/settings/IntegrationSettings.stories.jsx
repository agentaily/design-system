import React from "react";
import { IntegrationSettings } from "./IntegrationSettings.jsx";
import { DeepSeekCard } from "./DeepSeekCard.jsx";
import { FeishuCard } from "./FeishuCard.jsx";

// IntegrationSettings (alias ServiceConnections) — the 集成 SECTION, not a panel.
// It renders the integration hero + readiness rail + a slot for connection cards.
// Shown standalone here; in production it lives inside <SettingsSheet> (see the
// Layout/SettingsSheet story). It owns no save UI — the container's SettingsSaveBar
// is the commit point.
export default {
  title: "Settings/IntegrationSettings",
  component: IntegrationSettings,
  parameters: { layout: "padded" },
};

const Frame = ({ children }) => <div style={{ maxWidth: 760, margin: "0 auto" }}>{children}</div>;

// No children + no config → renders the built-in DeepSeek + Feishu cards with a
// mock probe and derives the readiness rail itself. Test either card to light a dot.
export const DefaultCards = {
  render: () => (
    <Frame>
      <IntegrationSettings />
    </Frame>
  ),
};

// Controlled default cards — the host owns the config; here DeepSeek is connected.
function ControlledHost() {
  const [cfg, setCfg] = React.useState({
    dsKey: "",
    dsModel: "deepseek-chat",
    dsStatus: "ok",
    dsResult: "连接正常 · 延迟 0.4s · deepseek-chat",
    hasStoredKey: true,
    appId: "cli_a1b2c3d4e5f6",
    secret: "",
    link: "https://team.feishu.cn/base/bascnEXAMPLE?table=tblRSVP",
    fsStatus: "idle",
    fsResult: "",
  });
  return (
    <Frame>
      <IntegrationSettings
        config={cfg}
        onConfigChange={(patch) => setCfg((c) => ({ ...c, ...patch }))}
      />
    </Frame>
  );
}
export const Controlled = { name: "Controlled (1/2 ready)", render: () => <ControlledHost /> };

// Compositional — drive the rail with explicit ready/total and slot cards in via children.
export const Compositional = {
  render: () => (
    <Frame>
      <IntegrationSettings ready={1} total={2}>
        <DeepSeekCard status="ok" result="连接正常 · deepseek-chat" masked />
        <FeishuCard
          status="idle"
          appId="cli_a1b2c3d4e5f6"
          link="https://team.feishu.cn/base/bascnEXAMPLE?table=tblRSVP"
        />
      </IntegrationSettings>
    </Frame>
  ),
};
