import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Unit-test runner for the rare logic-bearing primitives (parsers, sanitizers,
// stateful hooks). Most components are verbatim presentational mirrors with
// nothing to assert beyond "it renders" — those are covered by build + Storybook,
// not here. See TESTING.md for the layering and guardrails.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.js"],
    // Tests live OUTSIDE the mirror (never next to src/components/**) so a
    // design-sync re-sync can't clobber them. See TESTING.md.
    include: ["tests/**/*.test.{js,jsx}"],
  },
});
