import React from "react";
import { PanelFooter } from "./PanelFooter.jsx";
// Import PanelSheet so its `.ax-psheet__foot*` helper CSS (which PanelFooter's
// layout relies on) is injected even when we render the footer band standalone.
import { PanelSheet } from "./PanelSheet.jsx";
import { Button } from "../buttons/Button.jsx";
import { Icon } from "../utilities/Icon.jsx";

// PanelFooter is the content for a sheet's `footer` slot: a status region (left,
// fills) + an actions region (right, pinned). The sticky band itself comes from
// the sheet; here we mimic that band so the footer reads on its own.
export default {
  title: "Layout/PanelFooter",
  component: PanelFooter,
  parameters: { layout: "padded" },
};

void PanelSheet; // referenced only for its injected footer CSS

const Band = ({ children }) => (
  <div
    style={{
      maxWidth: 768,
      margin: "0 auto",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-3)",
      overflow: "hidden",
    }}
  >
    <div className="ax-psheet__foot" style={{ borderTop: "none" }}>
      <div className="ax-psheet__foot-inner">{children}</div>
    </div>
  </div>
);

// Status-only — a valid footer (the sheet's ✕ already closes; don't add a
// duplicate "Done" button).
export const StatusOnly = {
  render: () => (
    <Band>
      <PanelFooter
        status={
          <>
            <Icon name="check" size={15} style={{ color: "var(--ok)" }} />
            <span>更改已自动保存</span>
          </>
        }
      />
    </Band>
  ),
};

export const StatusAndActions = {
  render: () => (
    <Band>
      <PanelFooter
        status={<span>有未保存的更改</span>}
        actions={
          <>
            <Button variant="ghost" size="md">
              放弃更改
            </Button>
            <Button variant="primary" size="md" icon={<Icon name="save" size={14} />}>
              保存配置
            </Button>
          </>
        }
      />
    </Band>
  ),
};
