import React from "react";
import { SettingsSaveBar } from "./SettingsSaveBar.jsx";
// PanelSheet injects the `.ax-psheet__foot*` helper CSS the bar's PanelFooter uses.
import { PanelSheet } from "./PanelSheet.jsx";
import { Input } from "../inputs/Input.jsx";

// SettingsSaveBar — the per-tab footer save bar (explicit save). Two modes: pass
// `form` (a Form.useForm return) and it wires dirty/valid/submitting + reset
// automatically; or pass explicit `dirty`/`saving`/`status`/`onSave`/`onReset`
// for non-form content like the connection cards. These stories use the explicit
// mode (self-contained); the `form` mode is documented in the .prompt.md. Shown
// inside a mock footer band.
export default {
  title: "Layout/SettingsSaveBar",
  component: SettingsSaveBar,
  parameters: { layout: "padded" },
};

void PanelSheet; // referenced for its injected footer CSS

const Band = ({ children, content }) => (
  <div
    style={{
      maxWidth: 768,
      margin: "0 auto",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-3)",
      overflow: "hidden",
    }}
  >
    {content ? <div style={{ padding: "20px 24px" }}>{content}</div> : null}
    <div className="ax-psheet__foot">
      <div className="ax-psheet__foot-inner">{children}</div>
    </div>
  </div>
);

// Edit the field → the bar lights up; 保存 commits a new baseline, 放弃更改 reverts.
function ExplicitHost() {
  const SAVED = { name: "Agentaily 团队" };
  const [v, setV] = React.useState(SAVED);
  const [saved, setSaved] = React.useState(SAVED);
  const [saving, setSaving] = React.useState(false);
  const dirty = JSON.stringify(v) !== JSON.stringify(saved);
  const save = () => {
    setSaving(true);
    setTimeout(() => {
      setSaved(v);
      setSaving(false);
    }, 600);
  };
  return (
    <Band
      content={
        <div>
          <label className="ax-cfield__label ax-label">显示名</label>
          <Input value={v.name} onChange={(e) => setV({ name: e.target.value })} />
        </div>
      }
    >
      <SettingsSaveBar dirty={dirty} saving={saving} onSave={save} onReset={() => setV(saved)} />
    </Band>
  );
}

export const Explicit = { name: "Explicit dirty (interactive)", render: () => <ExplicitHost /> };

export const Clean = {
  render: () => (
    <Band>
      <SettingsSaveBar dirty={false} onSave={() => {}} onReset={() => {}} />
    </Band>
  ),
};

export const Saving = {
  render: () => (
    <Band>
      <SettingsSaveBar dirty status="saving" onSave={() => {}} onReset={() => {}} />
    </Band>
  ),
};

export const Saved = {
  render: () => (
    <Band>
      <SettingsSaveBar dirty={false} status="saved" onSave={() => {}} onReset={() => {}} />
    </Band>
  ),
};

export const Errored = {
  render: () => (
    <Band>
      <SettingsSaveBar
        dirty
        status="error"
        error="保存失败 · 500"
        onSave={() => {}}
        onReset={() => {}}
      />
    </Band>
  ),
};
