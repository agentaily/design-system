import type { ThemeContextValue } from "./types";

/** Read the current theme + setter. Throws if used outside a `<ThemeProvider>`. */
export declare function useTheme(): ThemeContextValue;
