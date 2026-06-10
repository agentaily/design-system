import React from "react";
import { Confirmation } from "./Confirmation.jsx";

export default {
  title: "AI/Confirmation",
  component: Confirmation,
  argTypes: {
    resolved: { control: "select", options: [undefined, "allowed", "denied"] },
  },
  args: {
    title: "Run shell command?",
    description: "Agentaily wants to run a command in /Users/dev/app.",
    detail: "rm -rf ./build",
  },
};

export const Default = {};

export const Interactive = {
  render: () => {
    const [resolved, setResolved] = React.useState(undefined);
    return (
      <div style={{ maxWidth: 520 }}>
        <Confirmation
          title="Run shell command?"
          description="Agentaily wants to run a command in /Users/dev/app."
          detail="rm -rf ./build"
          resolved={resolved}
          onAllow={() => setResolved("allowed")}
          onDeny={() => setResolved("denied")}
        />
        {resolved ? (
          <button
            type="button"
            onClick={() => setResolved(undefined)}
            style={{
              marginTop: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--text-faint)",
              padding: 0,
            }}
          >
            reset
          </button>
        ) : null}
      </div>
    );
  },
};

export const Allowed = {
  args: { resolved: "allowed" },
};

export const Denied = {
  args: {
    title: "Send email?",
    description: "Draft to 3 recipients via the gmail tool.",
    detail: 'send_email({ to: ["team@agentaily.com"], subject: "Q2 报告" })',
    resolved: "denied",
  },
};

export const CustomLabels = {
  args: {
    title: "覆盖本地改动？",
    description: "工作区有 4 个未提交的文件，继续将丢弃这些改动。",
    detail: "git checkout -- src/",
    allowLabel: "继续",
    denyLabel: "取消",
  },
};
