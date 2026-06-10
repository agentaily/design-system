import React from "react";
import { Commit } from "./Commit.jsx";

export default {
  title: "Code/Commit",
  component: Commit,
  args: {
    message: "Fix focus ring on secondary buttons",
    hash: "7f29c4e",
    author: "lin",
    time: "2h ago",
    additions: 12,
    deletions: 3,
  },
};

export const Default = {};

export const CommitList = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 480 }}>
      <Commit message="Add voice persona picker" hash="a31f08d" author="lin" time="10m ago" additions={86} deletions={4} connected />
      <Commit message="Fix focus ring on secondary buttons" hash="7f29c4e" author="kai" time="2h ago" additions={12} deletions={3} connected />
      <Commit message="Bump @agentaily/sdk to 2.1.0" hash="c90b215" author="bot" time="1d ago" additions={2} deletions={2} />
    </div>
  ),
};

export const MessageOnly = {
  render: () => <Commit message="Initial commit" hash="0000001" />,
};
