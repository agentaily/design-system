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

// Chrome strings default to English; pass `copy` to localize (here, zh-CN).
export const Localized = {
  render: () => (
    <AccountControl
      user={{ email: "designer@agentaily.chat", name: "Designer" }}
      items={items}
      onLogout={() => {}}
      copy={{
        signIn: "登录",
        menuLabel: "账户菜单",
        signedIn: "已登录账户",
        signOut: "退出登录",
      }}
    />
  ),
};
