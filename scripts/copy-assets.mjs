// Ships brand assets (logo SVGs) referenced by components such as
// OpenInChat and the Logo motif, exposed via the "./assets/*" export.
import { cpSync, existsSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const from = path.join(root, "src", "assets");
const to = path.join(root, "dist", "assets");

if (existsSync(from)) {
  cpSync(from, to, { recursive: true });
  console.log("Copied src/assets -> dist/assets.");
} else {
  console.log("No src/assets to copy.");
}
