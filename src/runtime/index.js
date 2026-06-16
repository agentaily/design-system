// @agentaily/design-system runtime — cross-product browser runtime
// (theme + i18n + cross-subdomain persistence). Non-visual: Providers / hooks /
// utilities only — no rendered UI, no CSS. Ported from @agentaily/web-kit, which
// this package supersedes; re-exported from the package root barrel so consumers
// `import { ThemeProvider, createI18n, … } from "@agentaily/design-system"`.

// Theme
export { ThemeProvider } from "./theme/ThemeProvider.jsx";
export { useTheme } from "./theme/useTheme.js";
export { themeInitScript } from "./theme/themeInitScript.js";

// i18n
export { createI18n } from "./i18n/createI18n.js";

// Persistence
export { createStorage, persistentState } from "./persistence/index.js";
