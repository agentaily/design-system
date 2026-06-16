import { useContext } from "react";
import { ThemeContext } from "./context.js";

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}
