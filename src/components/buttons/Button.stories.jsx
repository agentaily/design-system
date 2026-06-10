import React from "react";
import { Button } from "./Button.jsx";

export default {
  title: "Buttons/Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    full: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { variant: "primary", size: "md", children: "Save changes" },
};

export const Primary = {};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button variant="primary">Start free</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="ghost">Read the docs</Button>
      <Button variant="danger">Delete chat</Button>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="sm">New chat</Button>
      <Button size="md">New chat</Button>
      <Button size="lg">New chat</Button>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button disabled>Save changes</Button>
      <Button variant="secondary" disabled>
        Cancel
      </Button>
    </div>
  ),
};

export const Full = {
  render: () => (
    <div style={{ width: 320 }}>
      <Button full>Continue</Button>
    </div>
  ),
};
