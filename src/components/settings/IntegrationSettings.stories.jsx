import React from "react";
import { IntegrationSettings } from "./IntegrationSettings.jsx";
import { Button } from "../buttons/Button.jsx";

export default {
  title: "Settings/IntegrationSettings",
  component: IntegrationSettings,
  parameters: { layout: "fullscreen" },
};

function Demo({ showUsageCap = true }) {
  const [open, setOpen] = React.useState(true);
  return (
    <div style={{ padding: 24, minHeight: 480 }}>
      <Button onClick={() => setOpen(true)}>打开集成设置</Button>
      {open && (
        <IntegrationSettings
          showUsageCap={showUsageCap}
          storageKey="agentaily.integrations.storybook"
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export const Default = { render: () => <Demo /> };

export const WithoutUsageCap = { render: () => <Demo showUsageCap={false} /> };

// Controlled / backend-wired (BYOK): the parent holds `value` (no localStorage),
// `onChange` flows every edit out, `onTest`/`onSave` reach a mock "server", and
// `readiness` + `masked` reflect creds already verified & stored server-side —
// so both pills show 已连接, the rail is 2/2, and secrets echo masked, never
// re-submitted. Omitting all of these falls back to the self-persisting Default.
function ControlledDemo() {
  const [open, setOpen] = React.useState(true);
  const [cfg, setCfg] = React.useState({
    dsKey: "",
    dsModel: "deepseek-reasoner",
    capOn: true,
    cap: "300",
    dsStatus: "idle",
    dsResult: "",
    appId: "cli_a1b2c3d4e5f6",
    secret: "",
    link: "https://acme.feishu.cn/base/bascnXXXX?table=tblYYYY",
    fsStatus: "idle",
    fsResult: "",
    saved: false,
  });
  return (
    <div style={{ padding: 24, minHeight: 480 }}>
      <Button onClick={() => setOpen(true)}>打开集成设置（受控）</Button>
      {open && (
        <IntegrationSettings
          onClose={() => setOpen(false)}
          value={cfg}
          onChange={setCfg}
          readiness={{ deepseek: true, feishu: true }}
          masked={{ deepseek: true, feishu: true }}
          onTest={async (which) => {
            await new Promise((r) => setTimeout(r, 800));
            return {
              ok: true,
              message: which === "deepseek" ? "连接正常 · 延迟 0.4s" : "已连接 · 6 个字段",
            };
          }}
          onSave={async () => {
            await new Promise((r) => setTimeout(r, 800));
          }}
        />
      )}
    </div>
  );
}

export const ControlledBackend = { render: () => <ControlledDemo /> };
