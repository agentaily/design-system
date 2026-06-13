import React from "react";
import { SettingsSheet } from "./SettingsSheet.jsx";
import { SettingsSaveBar } from "./SettingsSaveBar.jsx";
import { PageSection } from "./PageSection.jsx";
import { IntegrationSettings } from "../settings/IntegrationSettings.jsx";
import { Input } from "../inputs/Input.jsx";
import { Select } from "../inputs/Select.jsx";

// SettingsSheet — the full settings chain: a floating PanelSheet with a left
// section nav + a scrolling content pane, one SettingsSaveBar per tab in the
// footer (explicit save, GitHub model). The 集成 tab composes IntegrationSettings
// (DeepSeek + Feishu cards); 通用 is a plain form tab; 账户 needs no save bar.
// Rendered fullscreen so the sheet fills the canvas; toggle paper/ink in the toolbar.
export default {
  title: "Layout/SettingsSheet",
  component: SettingsSheet,
  parameters: { layout: "fullscreen" },
};

const noop = () => {};
const NAV = [
  { id: "integrations", label: "集成", icon: "plug" },
  { id: "general", label: "通用", icon: "settings" },
  { id: "account", label: "账户", icon: "user" },
];

function Host() {
  const [active, setActive] = React.useState("integrations");

  // 集成 tab — host owns the connection config; dirty = cfg vs saved baseline.
  const SEED = { dsKey: "", dsModel: "deepseek-chat", appId: "", secret: "", link: "" };
  const [cfg, setCfg] = React.useState(SEED);
  const [savedCfg, setSavedCfg] = React.useState(SEED);
  const [intSaving, setIntSaving] = React.useState(false);
  const intDirty = JSON.stringify(cfg) !== JSON.stringify(savedCfg);
  const saveInt = () => {
    setIntSaving(true);
    setTimeout(() => {
      setSavedCfg(cfg);
      setIntSaving(false);
    }, 600);
  };

  // 通用 tab — a plain form; dirty = current vs saved.
  const GEN = { name: "Agentaily 团队", lang: "zh-CN" };
  const [gen, setGen] = React.useState(GEN);
  const [savedGen, setSavedGen] = React.useState(GEN);
  const [genSaving, setGenSaving] = React.useState(false);
  const genDirty = JSON.stringify(gen) !== JSON.stringify(savedGen);
  const saveGen = () => {
    setGenSaving(true);
    setTimeout(() => {
      setSavedGen(gen);
      setGenSaving(false);
    }, 600);
  };

  let content;
  if (active === "integrations") {
    content = (
      <IntegrationSettings
        config={cfg}
        onConfigChange={(patch) => setCfg((c) => ({ ...c, ...patch }))}
      />
    );
  } else if (active === "general") {
    content = (
      <PageSection
        eyebrow="通用 · GENERAL"
        title="通用设置"
        description="工作区的显示名与语言。改完点底部「保存」生效。"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label className="ax-cfield__label ax-label">显示名</label>
            <Input
              value={gen.name}
              onChange={(e) => setGen((g) => ({ ...g, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="ax-cfield__label ax-label">界面语言</label>
            <Select
              value={gen.lang}
              onChange={(e) => setGen((g) => ({ ...g, lang: e.target.value }))}
              options={[
                { value: "zh-CN", label: "简体中文" },
                { value: "en", label: "English" },
              ]}
            />
          </div>
        </div>
      </PageSection>
    );
  } else {
    content = (
      <PageSection
        eyebrow="账户 · ACCOUNT"
        title="账户"
        description="此分区无需保存——操作即时生效。"
      >
        <div style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>
          登出、删除账户等即时操作放这里。
        </div>
      </PageSection>
    );
  }

  const footer =
    active === "integrations" ? (
      <SettingsSaveBar
        dirty={intDirty}
        saving={intSaving}
        onSave={saveInt}
        onReset={() => setCfg(savedCfg)}
      />
    ) : active === "general" ? (
      <SettingsSaveBar
        dirty={genDirty}
        saving={genSaving}
        onSave={saveGen}
        onReset={() => setGen(savedGen)}
      />
    ) : null;

  return (
    <SettingsSheet
      crumb="设置"
      nav={NAV}
      active={active}
      onNavigate={setActive}
      onClose={noop}
      footer={footer}
    >
      {content}
    </SettingsSheet>
  );
}

export const FullChain = { name: "Full chain (集成 / 通用 / 账户)", render: () => <Host /> };

// No nav → a single centered column with a full-width PanelSheet footer.
export const SingleColumn = {
  render: () => (
    <SettingsSheet
      crumb="设置 / 集成"
      onClose={noop}
      footer={<SettingsSaveBar dirty status="idle" onSave={noop} />}
    >
      <IntegrationSettings />
    </SettingsSheet>
  ),
};
