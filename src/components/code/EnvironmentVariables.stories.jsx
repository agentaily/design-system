import React from "react";
import { EnvironmentVariables } from "./EnvironmentVariables.jsx";

export default {
  title: "Code/EnvironmentVariables",
  component: EnvironmentVariables,
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <EnvironmentVariables
        vars={[
          { key: "AGENTAILY_KEY", value: "ag-7f29c4e1b8d2" },
          { key: "DATABASE_URL", value: "postgres://app:5432/prod" },
          { key: "NODE_ENV", value: "production", secret: false },
          { key: "PORT", value: "3000", secret: false },
        ]}
      />
    </div>
  ),
};

export const SecretsOnly = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <EnvironmentVariables
        title="Production secrets"
        vars={[
          { key: "AGENTAILY_KEY", value: "ag-7f29c4e1b8d2" },
          { key: "WEBHOOK_SECRET", value: "whsec_c90b2154a31f" },
          { key: "JWT_SIGNING_KEY", value: "jk-d41d8cd98f00" },
        ]}
      />
    </div>
  ),
};

export const TupleShorthand = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <EnvironmentVariables
        title="Sandbox env"
        vars={[
          ["API_TOKEN", "tok-9d1c44ab07"],
          ["REGION", "sfo"],
        ]}
      />
    </div>
  ),
};
