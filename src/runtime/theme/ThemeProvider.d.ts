import type { ThemeProviderProps } from "./types";

/** Provides theme state to the subtree and applies the resolved theme to `<html>`
 * (no rendered UI of its own). Persists the user's choice cross-subdomain. */
export declare function ThemeProvider(props: ThemeProviderProps): JSX.Element;
