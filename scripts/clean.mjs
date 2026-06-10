import { rmSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
rmSync(path.join(root, "dist"), { recursive: true, force: true });
console.log("Cleaned dist/.");
