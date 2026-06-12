import React from "react";
import { DesignerShell } from "./DesignerShell.jsx";
import { Icon } from "../utilities/Icon.jsx";
import { Button } from "../buttons/Button.jsx";
import { AccountControl } from "../auth/AccountControl.jsx";

export default {
  title: "Layout/DesignerShell",
  component: DesignerShell,
  parameters: { layout: "fullscreen" },
};

const pane = (label) => (
  <div
    style={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--text-muted)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
    }}
  >
    {label}
  </div>
);

export const Default = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <DesignerShell
        crumb="脚本设计器"
        actions={
          <Button variant="secondary" size="sm" icon={<Icon name="share" size={14} />}>
            分享
          </Button>
        }
        account={<AccountControl user={{ email: "designer@agentaily.chat" }} onLogout={() => {}} />}
        chat={pane("对话面板（Composer 在底部）")}
        preview={<div style={{ position: "relative", height: "100%" }}>{pane("实时预览")}</div>}
      />
    </div>
  ),
};
