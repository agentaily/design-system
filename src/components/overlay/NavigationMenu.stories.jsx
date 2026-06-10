import React from "react";
import { NavigationMenu } from "./NavigationMenu.jsx";

export default {
  title: "Overlay/NavigationMenu",
  component: NavigationMenu,
};

export const Default = {
  render: () => (
    <div style={{ minHeight: 320 }}>
      <NavigationMenu
        items={[
          {
            label: "Product",
            links: [
              { title: "Chat", description: "The assistant. 128k context, cited answers." },
              { title: "API", description: "Build with it. REST and streaming." },
              { title: "CLI", description: "Pipe it into anything." },
            ],
          },
          {
            label: "Resources",
            links: [
              { title: "Docs", description: "Setup, auth, rate limits." },
              { title: "Changelog", description: "What shipped, week by week." },
              { title: "Status", description: "Uptime and incident history." },
              { title: "Model card", description: "Capabilities and limits of ax-1." },
            ],
          },
          { label: "Pricing", href: "#" },
        ]}
      />
    </div>
  ),
};
