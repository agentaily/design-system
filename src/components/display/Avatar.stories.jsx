import React from "react";
import { Avatar } from "./Avatar.jsx";

const PORTRAIT =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='88' height='88'><rect width='88' height='88' fill='%231a1a1a'/><circle cx='44' cy='33' r='15' fill='%23555'/><path d='M14 84c5-19 18-26 30-26s25 7 30 26z' fill='%23555'/></svg>";

export default {
  title: "Display/Avatar",
  component: Avatar,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    solid: { control: "boolean" },
  },
  args: { name: "Lin Wei", size: "md", solid: false },
};

export const Default = {};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="Lin Wei" size="sm" />
      <Avatar name="Lin Wei" size="md" />
      <Avatar name="Lin Wei" size="lg" />
    </div>
  ),
};

export const Solid = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar solid name="Agentaily" size="sm" />
      <Avatar solid name="Agentaily" size="md" />
      <Avatar solid name="Agentaily" size="lg" />
    </div>
  ),
};

export const WithImage = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="Lin Wei" src={PORTRAIT} size="sm" />
      <Avatar name="Lin Wei" src={PORTRAIT} size="md" />
      <Avatar name="Lin Wei" src={PORTRAIT} size="lg" />
    </div>
  ),
};

export const InitialsFallback = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="Lin Wei" />
      <Avatar name="Ada" />
      <Avatar name="" />
    </div>
  ),
};
