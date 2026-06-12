import React, { useEffect } from "react";
import "../src/styles.css";

/* Agentaily is light-first ("paper", on :root); dark ("ink") is scoped under
   [data-theme="dark"] in tokens/colors.css. Light needs no attribute — clearing
   it falls back to the :root (paper) defaults. */
const WithTheme = (Story, context) => {
  const theme = context.globals.theme || "light";
  useEffect(() => {
    if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
  }, [theme]);
  return <Story />;
};

/** @type {import('@storybook/react-vite').Preview} */
export default {
  decorators: [WithTheme],
  globalTypes: {
    theme: {
      description: "Agentaily theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "dark", title: "Ink (dark)" },
          { value: "light", title: "Paper (light)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  parameters: {
    layout: "padded",
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          "Foundations",
          ["Intro", "Colors", "Typography", "Spacing", "Effects", "Motifs"],
          "Buttons",
          "Inputs",
          "Display",
          "Feedback",
          "Overlay",
          "Layout",
          "Chat",
          "AI",
          "Code",
          "Voice",
          "Workflow",
          "Utilities",
          "Settings",
          "Auth",
          "Review",
        ],
      },
    },
  },
};
