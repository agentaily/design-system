import React from "react";
import { StackTrace } from "./StackTrace.jsx";

export default {
  title: "Code/StackTrace",
  component: StackTrace,
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <StackTrace
        type="TypeError"
        message="Cannot read properties of undefined (reading 'map')"
        frames={[
          { fn: "renderList", location: "src/App.jsx:42", app: true },
          { fn: "MessageList", location: "src/MessageList.jsx:18", app: true },
          { fn: "renderWithHooks", location: "react-dom.development.js:14985" },
          { fn: "beginWork", location: "react-dom.development.js:19049" },
        ]}
      />
    </div>
  ),
};

export const DeepVendorTrace = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <StackTrace
        type="FetchError"
        message="request to https://api.agentaily.chat/v1/chat failed, ETIMEDOUT after 30s"
        frames={[
          { fn: "sendMessage", location: "src/lib/client.js:71", app: true },
          { fn: "onSubmit", location: "src/Composer.jsx:24", app: true },
          { fn: "fetch", location: "node:internal/deps/undici/undici:12345" },
          { fn: "Timeout._onTimeout", location: "node:internal/timers:573" },
          { fn: "processTimers", location: "node:internal/timers:514" },
        ]}
      />
    </div>
  ),
};

export const StringFrames = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <StackTrace
        type="Error"
        message="exit code 1"
        frames={["at build (vite.config.js:9)", "at async CAC.run", "at async main"]}
      />
    </div>
  ),
};
