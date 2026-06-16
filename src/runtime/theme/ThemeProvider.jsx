import { useCallback, useEffect, useMemo, useState } from "react";
import { isBrowser } from "../internal/env.js";
import { createStorage } from "../persistence/createStorage.js";
import { persistentState } from "../persistence/persistentState.js";
import { ThemeContext } from "./context.js";

const THEME_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const VALID_MODES = ["system", "light", "dark"];

function systemResolved() {
  if (!isBrowser() || typeof window.matchMedia !== "function") return "light";
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function resolve(theme) {
  return theme === "system" ? systemResolved() : theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storage,
  attribute = "data-theme",
}) {
  // Storage config is fixed for the provider's lifetime; build once.
  const state = useMemo(
    () =>
      persistentState({
        key: THEME_KEY,
        defaultValue: defaultTheme,
        storage: createStorage(storage),
        decode: (raw) => (VALID_MODES.includes(raw) ? raw : undefined),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Initial render reads the persisted choice (browser) or the default (SSR).
  // The theme is never written into the JSX tree — only as a side effect onto
  // <html> — so there is no hydration mismatch even if SSR/client differ.
  const [theme, setThemeState] = useState(() => state.get());
  const [resolvedTheme, setResolvedTheme] = useState(() => resolve(theme));

  // Apply the resolved theme to <html> whenever the selection changes.
  useEffect(() => {
    const next = resolve(theme);
    setResolvedTheme(next);
    if (isBrowser()) document.documentElement.setAttribute(attribute, next);
  }, [theme, attribute]);

  // While following the system, react to OS-level scheme changes in real time.
  useEffect(() => {
    if (theme !== "system" || !isBrowser() || typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia(DARK_QUERY);
    const onChange = () => {
      const next = mql.matches ? "dark" : "light";
      setResolvedTheme(next);
      document.documentElement.setAttribute(attribute, next);
    };
    if (typeof mql.addEventListener === "function") mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (typeof mql.removeEventListener === "function")
        mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [theme, attribute]);

  const setTheme = useCallback(
    (next) => {
      setThemeState(next);
      state.set(next);
    },
    [state],
  );

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
