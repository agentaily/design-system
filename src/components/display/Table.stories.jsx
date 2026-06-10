import React from "react";
import { Table } from "./Table.jsx";
import { Badge } from "./Badge.jsx";

const modelColumns = [
  { key: "model", label: "Model" },
  { key: "ctx", label: "Context", numeric: true },
  { key: "p50", label: "First token", numeric: true },
];

const modelRows = [
  { model: "agentaily-2", ctx: "128k", p50: "0.4s", status: "Stable" },
  { model: "agentaily-2-mini", ctx: "64k", p50: "0.2s", status: "Stable" },
  { model: "agentaily-1", ctx: "32k", p50: "0.8s", status: "Deprecated" },
];

export default {
  title: "Display/Table",
  component: Table,
  argTypes: {
    hover: { control: "boolean" },
  },
  args: { columns: modelColumns, rows: modelRows, hover: true },
};

export const Default = {};

export const WithBadgeCells = {
  render: () => (
    <Table
      columns={[
        { key: "model", label: "Model" },
        { key: "ctx", label: "Context", numeric: true },
        {
          key: "status",
          label: "Status",
          render: (v) => (
            <Badge variant={v === "Stable" ? "ok" : "warn"} dot>
              {v}
            </Badge>
          ),
        },
      ]}
      rows={modelRows}
    />
  ),
};

export const StringColumns = {
  render: () => (
    <Table
      columns={["key", "scope", "created"]}
      rows={[
        { key: "sk-prod-01", scope: "read-write", created: "2026-05-12" },
        { key: "sk-ci-02", scope: "read-only", created: "2026-04-30" },
        { key: "sk-dev-03", scope: "read-write", created: "2026-03-08" },
      ]}
    />
  ),
};

export const NoHover = {
  render: () => <Table hover={false} columns={modelColumns} rows={modelRows} />,
};
