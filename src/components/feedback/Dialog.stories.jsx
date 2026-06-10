import React from "react";
import { Dialog } from "./Dialog.jsx";
import { Button } from "../buttons/Button.jsx";

export default {
  title: "Feedback/Dialog",
  component: Dialog,
  argTypes: {
    inline: { control: "boolean" },
  },
};

export const Inline = {
  render: () => (
    <Dialog
      inline
      title="Delete conversation"
      onClose={() => {}}
      footer={
        <React.Fragment>
          <Button variant="ghost">Cancel</Button>
          <Button variant="danger">Delete</Button>
        </React.Fragment>
      }
    >
      This cannot be undone.
    </Dialog>
  ),
};

export const Triggered = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    const close = () => setOpen(false);
    return (
      <React.Fragment>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Delete conversation
        </Button>
        <Dialog
          open={open}
          title="Delete conversation"
          onClose={close}
          footer={
            <React.Fragment>
              <Button variant="ghost" onClick={close}>
                Cancel
              </Button>
              <Button variant="danger" onClick={close}>
                Delete
              </Button>
            </React.Fragment>
          }
        >
          This cannot be undone.
        </Dialog>
      </React.Fragment>
    );
  },
};

export const WithoutFooter = {
  render: () => (
    <Dialog inline title="Keyboard shortcuts" onClose={() => {}}>
      Press ⌘K to open the command palette. Press ESC to close any overlay.
    </Dialog>
  ),
};
