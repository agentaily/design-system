import React from "react";
import { DocsLayout } from "./DocsLayout.jsx";
import { Badge } from "../display/Badge.jsx";

export default {
  title: "Layout/DocsLayout",
  component: DocsLayout,
  parameters: { layout: "fullscreen" },
};

const sections = [
  { title: "Get started", items: ["Introduction", "Quickstart", "Installation"] },
  { title: "Guides", items: ["Core concepts", "Streaming", "Tool use"] },
];

const toc = ["Overview", "Install", "First request"];

export const Default = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <DocsLayout sections={sections} toc={toc}>
        <Badge variant="outline">GUIDE</Badge>
        <h1>Quickstart</h1>
        <p style={{ color: "var(--text-muted)" }}>
          Get from zero to your first request in a couple of minutes.
        </p>
        <h2 id="install">Install</h2>
        <p style={{ color: "var(--text-muted)" }}>Add the package and import the tokens once.</p>
        <h2 id="first-request">First request</h2>
        <p style={{ color: "var(--text-muted)" }}>Compose the primitives into your first screen.</p>
      </DocsLayout>
    </div>
  ),
};
