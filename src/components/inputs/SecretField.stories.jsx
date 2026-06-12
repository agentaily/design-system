import React from "react";
import { SecretField } from "./SecretField.jsx";

export default {
  title: "Inputs/SecretField",
  component: SecretField,
};

function Demo(props) {
  const [value, setValue] = React.useState(props.initial ?? "");
  return (
    <div style={{ maxWidth: 360 }}>
      <SecretField {...props} value={value} onChange={setValue} />
    </div>
  );
}

export const Default = {
  render: () => (
    <Demo label="API KEY" placeholder="sk-xxxxxxxxxxxxxxxx" initial="sk-7f3a9c2e1b4d" />
  ),
};

export const WithHint = {
  render: () => (
    <Demo label="API KEY" placeholder="sk-xxxxxxxxxxxxxxxx" hint="以 sk- 开头，仅存于本地" />
  ),
};

export const WithError = {
  render: () => <Demo label="API KEY" placeholder="sk-xxxxxxxxxxxxxxxx" error="此项必填" />,
};

export const PlainFont = {
  render: () => <Demo label="PASSWORD" placeholder="••••••••" mono={false} />,
};
