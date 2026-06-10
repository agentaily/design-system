import React from "react";
import { Empty } from "./Empty.jsx";
import { Button } from "../buttons/Button.jsx";

const messageIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const searchIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default {
  title: "Display/Empty",
  component: Empty,
  argTypes: {
    bordered: { control: "boolean" },
  },
  args: {
    title: "No conversations yet",
    description: "Start a new chat to see it here.",
    bordered: false,
  },
};

export const Default = {};

export const WithIconAndActions = {
  render: () => (
    <Empty
      icon={messageIcon}
      title="No conversations yet"
      description="Start a new chat to see it here."
      actions={
        <React.Fragment>
          <Button variant="primary">New chat</Button>
          <Button variant="ghost">Read the docs</Button>
        </React.Fragment>
      }
    />
  ),
};

export const Bordered = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Empty
        bordered
        icon={searchIcon}
        title="No results"
        description='Nothing matched "vector index". Try a shorter query.'
      />
    </div>
  ),
};
