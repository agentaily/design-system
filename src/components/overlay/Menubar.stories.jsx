import React from "react";
import { Menubar } from "./Menubar.jsx";

export default {
  title: "Overlay/Menubar",
  component: Menubar,
};

export const Default = {
  render: () => (
    <div style={{ minHeight: 280 }}>
      <Menubar
        menus={[
          {
            label: "File",
            items: [
              { label: "New chat", shortcut: "⌘N" },
              { label: "Open…", shortcut: "⌘O" },
              { type: "separator" },
              { label: "Export conversation" },
              { type: "separator" },
              { label: "Quit", shortcut: "⌘Q" },
            ],
          },
          {
            label: "Edit",
            items: [
              { label: "Undo", shortcut: "⌘Z" },
              { label: "Redo", shortcut: "⇧⌘Z" },
              { type: "separator" },
              { label: "Copy last reply", shortcut: "⌘C" },
            ],
          },
          {
            label: "View",
            items: [
              { label: "Toggle sidebar", shortcut: "⌘B" },
              { label: "Command palette", shortcut: "⌘K" },
              { type: "separator" },
              { label: "Zoom in", shortcut: "⌘+" },
              { label: "Zoom out", shortcut: "⌘-" },
            ],
          },
        ]}
      />
    </div>
  ),
};
