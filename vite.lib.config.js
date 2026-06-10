import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

// Library build for npm distribution. ESM-only, one module per component
// (preserveModules) so consumers tree-shake unused components. React and
// its JSX runtime are peer deps, externalized. Component CSS is injected
// at runtime by each component; design tokens ship separately as
// dist/styles.css (see scripts/build-css.mjs).
export default defineConfig({
  plugins: [react({ jsxRuntime: "automatic" })],
  build: {
    outDir: "dist",
    emptyOutDir: false, // dist/styles.css + dist/index.d.ts are written by sibling scripts
    minify: false,
    sourcemap: true,
    rollupOptions: {
      input: path.join(root, "src", "index.js"),
      preserveEntrySignatures: "strict",
      external: [/^react($|\/)/, /^react-dom($|\/)/],
      output: {
        format: "es",
        dir: "dist",
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
  },
});
