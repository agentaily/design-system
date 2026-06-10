import React, { useEffect } from "react";
import "../src/styles.css";

/* Agentaily is dark-first ("ink"); light ("paper") is scoped under
   [data-theme="light"] in tokens/colors.css. */
const WithTheme = (Story, context) => {
  const theme = context.globals.theme || "dark";
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
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
  initialGlobals: { theme: "dark" },
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
        ],
      },
    },
  },
};
