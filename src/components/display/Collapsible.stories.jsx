import React from "react";
import { Collapsible } from "./Collapsible.jsx";

export default {
  title: "Display/Collapsible",
  component: Collapsible,
  argTypes: {
    defaultOpen: { control: "boolean" },
  },
  args: {
    label: "Advanced options",
    defaultOpen: false,
    children: "Temperature 0.7, top-p 0.9, max output 4,096 tokens. Defaults apply to new chats only.",
  },
};

export const Default = {};

export const DefaultOpen = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Collapsible label="Why was this answer cut off?" defaultOpen>
        The response hit the 4,096-token output limit. Ask the model to continue, or raise the limit
        in advanced options.
      </Collapsible>
    </div>
  ),
};

export const Stacked = {
  render: () => (
    <div style={{ display: "grid", gap: 8, maxWidth: 420 }}>
      <Collapsible label="Model settings">Model agentaily-2, context 128k, streaming on.</Collapsible>
      <Collapsible label="Data retention">Conversations are kept for 30 days, then deleted.</Collapsible>
      <Collapsible label="Keyboard shortcuts">Cmd K opens the command menu. Esc stops generation.</Collapsible>
    </div>
  ),
};
