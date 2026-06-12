import React from "react";
import { AppShell } from "./AppShell.jsx";
import { Icon } from "../utilities/Icon.jsx";
import { Button } from "../buttons/Button.jsx";
import { AccountControl } from "../auth/AccountControl.jsx";

export default {
  title: "Layout/AppShell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
};

const nav = [
  { id: "overview", label: "Overview", icon: <Icon name="layout" size={16} /> },
  { id: "scripts", label: "Scripts", icon: <Icon name="film" size={16} /> },
  { id: "archive", label: "Archive", icon: <Icon name="archive" size={16} /> },
  { id: "settings", label: "Settings", icon: <Icon name="settings" size={16} /> },
];

export const Default = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <AppShell
        nav={nav}
        crumb={
          <>
            workspace / <b>Overview</b>
          </>
        }
        actions={
          <Button variant="primary" size="sm" icon={<Icon name="plus" size={15} />}>
            New
          </Button>
        }
        account={<AccountControl user={{ email: "designer@agentaily.chat" }} onLogout={() => {}} />}
      >
        <div style={{ padding: 24, color: "var(--text-body)" }}>
          <h2 style={{ marginTop: 0 }}>Overview</h2>
          <p style={{ color: "var(--text-muted)" }}>Your screen content goes here.</p>
        </div>
      </AppShell>
    </div>
  ),
};
