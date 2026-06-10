import React from "react";
import { Terminal } from "./Terminal.jsx";

export default {
  title: "Code/Terminal",
  component: Terminal,
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <Terminal
        title="zsh"
        lines={[
          { type: "command", text: "npm run build" },
          { type: "output", text: "vite v6.0.3 building for production..." },
          { type: "output", text: "✓ built in 1.2s" },
        ]}
      />
    </div>
  ),
};

export const Running = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <Terminal
        title="bash"
        cursor
        lines={[
          { type: "command", text: "npm test -- --watch" },
          { type: "output", text: "RUNS src/components/Composer.test.jsx" },
        ]}
      />
    </div>
  ),
};

export const WithError = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <Terminal
        title="bash"
        lines={[
          { type: "command", text: "node server.js" },
          { type: "error", text: "Error: listen EADDRINUSE: address already in use :::3000" },
          { type: "command", text: "lsof -ti:3000 | xargs kill" },
          { type: "output", text: "" },
        ]}
      />
    </div>
  ),
};

export const StringShorthand = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <Terminal lines={["git status", "git add -A", "git commit -m 'Fix focus ring'"]} cursor />
    </div>
  ),
};
