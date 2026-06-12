import React from "react";
import { SettingsPage } from "./SettingsPage.jsx";
import { Input } from "../inputs/Input.jsx";
import { Button } from "../buttons/Button.jsx";

export default {
  title: "Layout/SettingsPage",
  component: SettingsPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <SettingsPage
        title="Settings"
        subtitle="Manage your profile and preferences."
        tabs={[
          { id: "general", label: "General" },
          { id: "profile", label: "Profile" },
        ]}
        actions={
          <>
            <Button variant="ghost" size="sm">
              Cancel
            </Button>
            <Button variant="primary" size="sm">
              Save
            </Button>
          </>
        }
      >
        <SettingsPage.Card title="Profile" description="Shown across your workspace.">
          <Input label="DISPLAY NAME" placeholder="Your name" />
        </SettingsPage.Card>
        <SettingsPage.Card title="Email" description="Used for sign-in and notifications.">
          <Input label="EMAIL" placeholder="you@agentaily.chat" />
        </SettingsPage.Card>
      </SettingsPage>
    </div>
  ),
};
