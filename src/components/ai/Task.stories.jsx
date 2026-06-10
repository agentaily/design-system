import React from "react";
import { Task } from "./Task.jsx";

export default {
  title: "AI/Task",
  component: Task,
  args: {
    title: "Building feature",
    items: [
      { label: "Read existing code", status: "done" },
      { label: "Write component", status: "active" },
      { label: "Add tests", status: "pending" },
    ],
  },
};

export const Default = {};

export const WithMeta = {
  args: {
    title: "Indexing repo",
    items: [
      { label: "Scan workspace", status: "done", meta: "0.4s" },
      { label: "Parse 4,218 files", status: "done", meta: "12.6s" },
      { label: "Embed chunks", status: "active", meta: "61%" },
      { label: "Write index to disk", status: "pending" },
    ],
  },
};

export const Completed = {
  args: {
    title: "发布 v0.9.2",
    items: [
      { label: "跑完测试套件", status: "done", meta: "48s" },
      { label: "生成 changelog", status: "done", meta: "3.1s" },
      { label: "打 tag 并推送", status: "done", meta: "1.2s" },
    ],
  },
};

export const NotStarted = {
  args: {
    title: "Pending plan",
    items: [
      { label: "Reproduce the bug", status: "pending" },
      { label: "Bisect the regression", status: "pending" },
      { label: "Patch and verify", status: "pending" },
    ],
  },
};
