import React from "react";
import { AccountControl } from "./AccountControl.jsx";
import { Icon } from "../utilities/Icon.jsx";

export default {
  title: "Auth/AccountControl",
  component: AccountControl,
};

const items = [
  { label: "我的脚本", icon: <Icon name="film" size={15} />, onSelect: () => {} },
  { label: "集成设置", icon: <Icon name="settings" size={15} />, onSelect: () => {} },
];

export const SignedOut = {
  render: () => <AccountControl user={null} onLogin={() => {}} />,
};

export const SignedIn = {
  render: () => (
    <AccountControl
      user={{ email: "designer@agentaily.chat", name: "Designer" }}
      items={items}
      onLogout={() => {}}
    />
  ),
};
