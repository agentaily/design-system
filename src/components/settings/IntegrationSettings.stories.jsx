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
