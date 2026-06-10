import React from "react";
import { AlertDialog } from "./AlertDialog.jsx";
import { Button } from "../buttons/Button.jsx";

export default {
  title: "Overlay/AlertDialog",
  component: AlertDialog,
  argTypes: {
    tone: { control: "select", options: ["danger", "warn"] },
    inline: { control: "boolean" },
  },
};

export const InlineDanger = {
  render: () => (
    <AlertDialog
      inline
      tone="danger"
      title="Delete conversation?"
      description="This cannot be undone."
      confirmLabel="Delete"
      onCancel={() => {}}
      onConfirm={() => {}}
    />
  ),
};

export const InlineWarn = {
  render: () => (
    <AlertDialog
      inline
      tone="warn"
      title="Clear local cache?"
      description="Drafts saved on this device will be removed. Synced conversations are not affected."
      confirmLabel="Clear cache"
      onCancel={() => {}}
      onConfirm={() => {}}
    />
  ),
};

export const Triggered = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    const close = () => setOpen(false);
    return (
      <React.Fragment>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete conversation
        </Button>
        <AlertDialog
          open={open}
          tone="danger"
          title="Delete conversation?"
          description="This cannot be undone."
          confirmLabel="Delete"
          onCancel={close}
          onConfirm={close}
        />
      </React.Fragment>
    );
  },
};
