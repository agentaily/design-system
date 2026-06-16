import type { ThemeInitScriptOptions } from "./types";

/** Returns a self-contained, XSS-safe JS snippet to inline in `<head>` so the
 * first paint already carries the persisted theme (no FOUC). Pure string — safe
 * to call during SSR. */
export declare function themeInitScript(options?: ThemeInitScriptOptions): string;
