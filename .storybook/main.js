/** @type {import('@storybook/react-vite').StorybookConfig} */
export default {
  framework: "@storybook/react-vite",
  addons: ["@storybook/addon-docs"],
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx)"],
  staticDirs: ["../src/assets"],
};
