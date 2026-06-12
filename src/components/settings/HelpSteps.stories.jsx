import React from "react";
import { HelpSteps } from "./HelpSteps.jsx";

export default {
  title: "Settings/HelpSteps",
  component: HelpSteps,
};

const steps = [
  <>
    登录 <code>platform.deepseek.com</code>，进入「API Keys」页面。
  </>,
  <>点击「创建 API Key」，命名后立即复制。</>,
  <>
    把以 <code>sk-</code> 开头的密钥粘贴到上方。
  </>,
];

const link = { href: "https://platform.deepseek.com", label: "打开 DeepSeek 开放平台" };

export const Default = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <HelpSteps title="如何获取 DeepSeek API Key？" steps={steps} link={link} />
    </div>
  ),
};

export const Open = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <HelpSteps title="如何获取 DeepSeek API Key？" steps={steps} link={link} defaultOpen />
    </div>
  ),
};
