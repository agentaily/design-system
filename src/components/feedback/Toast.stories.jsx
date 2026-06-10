import React from "react";
import { Toast } from "./Toast.jsx";
import { Button } from "../buttons/Button.jsx";

export default {
  title: "Feedback/Toast",
  component: Toast,
  argTypes: {
    variant: { control: "select", options: ["neutral", "ok", "warn", "danger"] },
  },
  args: {
    variant: "ok",
    title: "Saved",
    description: "Conversation exported.",
  },
};

export const Default = {};

export const Variants = {
  render: () => (
    <div style={{ display: "grid", gap: 8 }}>
      <Toast title="Update available" description="Restart to apply v1.4.2." />
      <Toast variant="ok" title="Saved" description="Conversation exported." />
      <Toast variant="warn" title="Rate limited" description="Retry in 18s." />
      <Toast variant="danger" title="Request failed" description="Check your API key." />
    </div>
  ),
};

export const Dismissible = {
  render: function Render() {
    const [visible, setVisible] = React.useState(true);
    if (!visible) {
      return (
        <Button variant="secondary" onClick={() => setVisible(true)}>
          Show toast
        </Button>
      );
    }
    return (
      <Toast
        variant="ok"
        title="Saved"
        description="Conversation exported."
        onClose={() => setVisible(false)}
      />
    );
  },
};

/* Toast is presentational — this story shows the recommended stack:
   bottom-right, gap 8px, newest at the bottom. */
export const Stacked = {
  render: function Render() {
    const [toasts, setToasts] = React.useState([]);
    const nextId = React.useRef(0);
    const fire = () => {
      const id = nextId.current++;
      const pool = [
        { variant: "ok", title: "Saved", description: "Conversation exported." },
        { variant: "warn", title: "Rate limited", description: "Retry in 18s." },
        { variant: "neutral", title: "Update available", description: "Restart to apply v1.4.2." },
      ];
      setToasts((t) => [...t, { id, ...pool[id % pool.length] }]);
    };
    const dismiss = (id) => setToasts((t) => t.filter((x) => x.id !== id));
    return (
      <React.Fragment>
        <Button variant="secondary" onClick={fire}>
          Fire toast
        </Button>
        <div
          style={{
            position: "fixed",
            right: 16,
            bottom: 16,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            zIndex: 120,
          }}
        >
          {toasts.map((t) => (
            <Toast
              key={t.id}
              variant={t.variant}
              title={t.title}
              description={t.description}
              onClose={() => dismiss(t.id)}
            />
          ))}
        </div>
      </React.Fragment>
    );
  },
};
