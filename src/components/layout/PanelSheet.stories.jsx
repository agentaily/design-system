import React from "react";
import { PanelSheet } from "./PanelSheet.jsx";
import { PanelFooter } from "./PanelFooter.jsx";
import { Button } from "../buttons/Button.jsx";
import { Icon } from "../utilities/Icon.jsx";

// PanelSheet — a full-screen panel that rises over everything: brand/crumb bar,
// scrolling body, optional sticky footer; header / body / footer share one
// column so they align. Esc closes. Rendered fullscreen so it fills the canvas.
export default {
  title: "Layout/PanelSheet",
  component: PanelSheet,
  parameters: { layout: "fullscreen" },
};

const noop = () => {};

const Prose = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 16,
      color: "var(--text-muted)",
      fontSize: "var(--text-md)",
      lineHeight: "var(--leading-body)",
    }}
  >
    <p style={{ margin: 0 }}>
      PanelSheet 是一个浮层外壳——它只负责「升起 / 顶栏 / 滚动正文 / 吸底
      footer」，里面放任何内容。设置页、「我的表单」面板、全屏导入器都能复用它。
    </p>
    {Array.from({ length: 6 }).map((_, i) => (
      <p key={i} style={{ margin: 0 }}>
        正文在顶栏与底栏之间独立滚动。内容被收进同一列里，所以 footer 的状态对齐品牌、操作对齐 ✕。第{" "}
        {i + 1} 段占位文本。
      </p>
    ))}
  </div>
);

export const Default = {
  render: () => (
    <PanelSheet crumb="设置 / 集成" onClose={noop}>
      <Prose />
    </PanelSheet>
  ),
};

export const WithFooter = {
  render: () => (
    <PanelSheet
      crumb="设置 / 集成"
      onClose={noop}
      footer={
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
      }
    >
      <Prose />
    </PanelSheet>
  ),
};

// `barFullWidth` lets the top bar span the viewport while the body keeps its column.
export const BarFullWidth = {
  render: () => (
    <PanelSheet
      crumb="全宽顶栏"
      barFullWidth
      actions={
        <Button variant="ghost" size="sm">
          文档
        </Button>
      }
      onClose={noop}
    >
      <Prose />
    </PanelSheet>
  ),
};
