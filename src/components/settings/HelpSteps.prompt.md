Collapsible numbered "如何获取" guide with an optional external link.

```jsx
const { HelpSteps } = window.AxiomDesignSystem_7fc962;

<HelpSteps
  title="如何获取 DeepSeek API Key？"
  steps={[
    <>
      登录 <code>platform.deepseek.com</code>，进入「API Keys」页面。
    </>,
    <>点击「创建 API Key」，命名后立即复制。</>,
    <>
      把以 <code>sk-</code> 开头的密钥粘贴到上方。
    </>,
  ]}
  link={{ href: "https://platform.deepseek.com", label: "打开 DeepSeek 开放平台" }}
/>;
```

Steps are auto-numbered; pass rich nodes to embed `<code>` spans.
