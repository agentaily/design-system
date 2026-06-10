import React from "react";
import { Artifact } from "./Artifact.jsx";
import { Button } from "../buttons/Button.jsx";

export default {
  title: "Code/Artifact",
  component: Artifact,
};

const src = `export function Hello({ name }) {
  return <p className="hello">Hi, {name}</p>;
}`;

export const PreviewAndCode = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <Artifact
        title="Hello.jsx"
        subtitle="React component · 2 lines"
        code={src}
        preview={<p style={{ margin: 0 }}>Hi, Lin</p>}
      />
    </div>
  ),
};

export const CodeOnly = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <Artifact
        title="tokens.css"
        subtitle="Stylesheet · 14 lines"
        code={`:root {
  --bg-0: #0a0a0b;
  --text-body: #e4e4e7;
  --radius-2: 6px;
}`}
      />
    </div>
  ),
};

export const WithActions = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <Artifact
        title="Button.jsx"
        subtitle="React component"
        code={src}
        preview={<Button>Save changes</Button>}
        actions={
          <Button variant="ghost" size="sm">
            Copy
          </Button>
        }
      />
    </div>
  ),
};
