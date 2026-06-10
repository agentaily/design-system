import React from "react";
import { DataTable } from "./DataTable.jsx";
import { Badge } from "./Badge.jsx";

const columns = [
  { key: "tool", label: "Tool" },
  { key: "calls", label: "Calls", numeric: true },
  { key: "p50", label: "p50 (ms)", numeric: true },
  { key: "errors", label: "Errors", numeric: true },
];

const rows = [
  { tool: "web.search", calls: 1284, p50: 412, errors: 3, status: "ok" },
  { tool: "code.run", calls: 902, p50: 1880, errors: 12, status: "warn" },
  { tool: "files.read", calls: 764, p50: 38, errors: 0, status: "ok" },
  { tool: "files.write", calls: 211, p50: 54, errors: 1, status: "ok" },
  { tool: "memory.recall", calls: 188, p50: 21, errors: 0, status: "ok" },
  { tool: "image.describe", calls: 96, p50: 940, errors: 4, status: "warn" },
  { tool: "calendar.read", calls: 71, p50: 130, errors: 0, status: "ok" },
  { tool: "mail.send", calls: 42, p50: 610, errors: 9, status: "danger" },
  { tool: "pdf.extract", calls: 38, p50: 1230, errors: 1, status: "ok" },
  { tool: "audio.transcribe", calls: 24, p50: 4100, errors: 0, status: "ok" },
  { tool: "vector.upsert", calls: 18, p50: 87, errors: 0, status: "ok" },
  { tool: "shell.exec", calls: 9, p50: 230, errors: 2, status: "warn" },
];

export default {
  title: "Display/DataTable",
  component: DataTable,
  args: { columns, rows },
};

export const Default = {};

export const Paginated = {
  render: () => <DataTable pageSize={5} columns={columns} rows={rows} />,
};

export const CustomCellRender = {
  render: () => (
    <DataTable
      pageSize={6}
      columns={[
        { key: "tool", label: "Tool" },
        { key: "calls", label: "Calls", numeric: true },
        {
          key: "status",
          label: "Status",
          sortable: false,
          render: (v) => (
            <Badge variant={v} dot>
              {v === "ok" ? "Healthy" : v === "warn" ? "Degraded" : "Failing"}
            </Badge>
          ),
        },
      ]}
      rows={rows}
    />
  ),
};

export const StringColumns = {
  render: () => (
    <DataTable
      columns={["region", "node", "version"]}
      rows={[
        { region: "us-east", node: "edge-01", version: "2.1.0" },
        { region: "eu-west", node: "edge-04", version: "2.1.0" },
        { region: "ap-south", node: "edge-07", version: "2.0.3" },
      ]}
    />
  ),
};
