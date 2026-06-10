import React from "react";
import { Field, FieldGroup } from "./Field.jsx";
import { Input } from "./Input.jsx";
import { Switch } from "./Switch.jsx";

export default {
  title: "Inputs/Field",
  component: Field,
  argTypes: {
    label: { control: "text" },
    required: { control: "boolean" },
    hint: { control: "text" },
    error: { control: "text" },
    row: { control: "boolean" },
  },
  args: { label: "Name", required: true, hint: "Shown publicly" },
};

export const Default = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <Field {...args}>
        <Input placeholder="Ada Lovelace" />
      </Field>
    </div>
  ),
};

export const WithError = {
  render: () => (
    <div style={{ width: 320 }}>
      <Field label="Workspace slug" error="Already taken. Try another.">
        <Input mono defaultValue="agentaily" />
      </Field>
    </div>
  ),
};

export const RowLayout = {
  render: () => (
    <div style={{ width: 360 }}>
      <Field label="Notifications" row>
        <Switch defaultChecked />
      </Field>
    </div>
  ),
};

export const GroupWithLegend = {
  render: () => (
    <div style={{ width: 380 }}>
      <FieldGroup legend="Profile">
        <Field label="Name" required hint="Shown publicly">
          <Input placeholder="Ada Lovelace" />
        </Field>
        <Field label="Handle" hint="Lowercase, 3 to 24 characters">
          <Input mono placeholder="ada" />
        </Field>
        <Field label="Notifications" row>
          <Switch defaultChecked />
        </Field>
      </FieldGroup>
    </div>
  ),
};

export const StackedGroup = {
  render: () => (
    <div style={{ width: 380 }}>
      <FieldGroup>
        <Field label="API key" hint="Stored locally.">
          <Input mono placeholder="ax-" />
        </Field>
        <Field label="Endpoint">
          <Input mono defaultValue="https://api.agentaily.chat/v2" />
        </Field>
      </FieldGroup>
    </div>
  ),
};
