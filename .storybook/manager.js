import { addons } from "storybook/manager-api";
import { themes } from "storybook/theming";

addons.setConfig({
  theme: {
    ...themes.dark,
    brandTitle: "agentaily",
    appBg: "#0A0A0B",
    appContentBg: "#0A0A0B",
    barBg: "#111113",
  },
});
