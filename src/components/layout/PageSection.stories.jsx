import React from "react";
import { PageSection } from "./PageSection.jsx";
import { Button } from "../buttons/Button.jsx";

// PageSection is pure layout: an eyebrow + title + description header over a body.
// Generic (not settings-specific) — use it for any titled page block. The two
// themes (paper / ink) are driven by the Storybook toolbar.
export default {
  title: "Layout/PageSection",
  component: PageSection,
  parameters: { layout: "padded" },
  argTypes: {
    headingLevel: { control: { type: "number", min: 1, max: 6 } },
    tight: { control: "boolean" },
  },
};

const Frame = ({ children }) => <div style={{ maxWidth: 720, margin: "0 auto" }}>{children}</div>;

const Body = () => (
  <div
    style={{
      border: "1px dashed var(--border-default)",
      borderRadius: "var(--radius-3)",
      padding: 24,
      color: "var(--text-muted)",
      fontSize: "var(--text-sm)",
    }}
  >
    分区正文（children）—— 字段、卡片、表格等任意内容。
  </div>
);

export const Default = {
  render: () => (
    <Frame>
      <PageSection
        eyebrow="集成 · INTEGRATIONS"
        title="连接你的服务"
        description="一个通用的页面内容分区：眉标 + 标题 + 描述，下面是正文。集成 / 通用 / 账户分区都复用同一头部布局。"
      >
        <Body />
      </PageSection>
    </Frame>
  ),
};

export const WithActions = {
  render: () => (
    <Frame>
      <PageSection
        eyebrow="通用 · GENERAL"
        title="通用设置"
        description="标题右侧可放对齐的次要操作。"
        actions={
          <Button variant="ghost" size="sm">
            重置为默认
          </Button>
        }
      >
        <Body />
      </PageSection>
    </Frame>
  ),
};

// `tight` renders a smaller heading + tighter spacing for stacked sub-sections.
export const TightSubSections = {
  render: () => (
    <Frame>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <PageSection
          tight
          headingLevel={2}
          eyebrow="账户 · ACCOUNT"
          title="个人资料"
          description="显示名与头像。"
        >
          <Body />
        </PageSection>
        <PageSection
          tight
          headingLevel={2}
          title="危险操作"
          description="删除账户与数据，不可撤销。"
        >
          <Body />
        </PageSection>
      </div>
    </Frame>
  ),
};
