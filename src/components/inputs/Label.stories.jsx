import React from "react";
import { Label } from "./Label.jsx";

export default {
  title: "Inputs/Label",
  component: Label,
  argTypes: {
    plain: { control: "boolean" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { children: "Display name" },
};

export const Default = {};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Label>Display name</Label>
      <Label required>API key</Label>
      <Label plain>Remember me</Label>
      <Label disabled>Legacy endpoint</Label>
    </div>
  ),
};

export const Bilingual = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Label>Workspace</Label>
      <Label plain>工作区名称</Label>
    </div>
  ),
};
