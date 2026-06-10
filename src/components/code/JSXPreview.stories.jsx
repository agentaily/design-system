import React from "react";
import { JSXPreview } from "./JSXPreview.jsx";
import { Badge } from "../display/Badge.jsx";
import { Button } from "../buttons/Button.jsx";

export default {
  title: "Code/JSXPreview",
  component: JSXPreview,
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <JSXPreview code={'<Badge variant="ok" dot>Live</Badge>'}>
        <Badge variant="ok" dot>
          Live
        </Badge>
      </JSXPreview>
    </div>
  ),
};

export const Stacked = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <JSXPreview
        stacked
        code={`<Button variant="secondary" size="sm">
  Cancel
</Button>`}
      >
        <Button variant="secondary" size="sm">
          Cancel
        </Button>
      </JSXPreview>
    </div>
  ),
};
