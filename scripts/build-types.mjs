// Ships the hand-written component prop contracts. Copies every
// src/components/**/<Name>.d.ts into dist/components/** and emits a
// dist/index.d.ts barrel mirroring src/index.js so `types` resolves.
import { readdirSync, statSync, mkdirSync, copyFileSync, writeFileSync, existsSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const componentsDir = path.join(root, "src", "components");
const outComponents = path.join(root, "dist", "components");

const categories = readdirSync(componentsDir).filter((c) =>
  statSync(path.join(componentsDir, c)).isDirectory(),
);

const lines = ["// AUTO-GENERATED — type barrel for the Agentaily design system.", ""];

let copied = 0;
for (const cat of categories.sort()) {
  const dir = path.join(componentsDir, cat);
  const dts = readdirSync(dir)
    .filter((f) => f.endsWith(".d.ts"))
    .sort();
  if (!dts.length) continue;
  mkdirSync(path.join(outComponents, cat), { recursive: true });
  lines.push(`// ${cat}`);
  for (const f of dts) {
    copyFileSync(path.join(dir, f), path.join(outComponents, cat, f));
    const stem = f.replace(/\.d\.ts$/, "");
    lines.push(`export * from "./components/${cat}/${stem}";`);
    copied++;
  }
  lines.push("");
}

// Non-component browser runtime (theme / i18n / persistence). Unlike components,
// these are hand-written .js/.jsx + adjacent hand-written .d.ts. Copy the whole
// src/runtime/ .d.ts tree (preserving structure) into dist/runtime/ and surface
// it through the barrel via src/runtime/index.d.ts.
const runtimeDir = path.join(root, "src", "runtime");
function copyRuntimeDts(srcDir, outDir) {
  for (const entry of readdirSync(srcDir)) {
    const srcPath = path.join(srcDir, entry);
    if (statSync(srcPath).isDirectory()) {
      copyRuntimeDts(srcPath, path.join(outDir, entry));
    } else if (entry.endsWith(".d.ts")) {
      mkdirSync(outDir, { recursive: true });
      copyFileSync(srcPath, path.join(outDir, entry));
      copied++;
    }
  }
}
if (existsSync(path.join(runtimeDir, "index.d.ts"))) {
  copyRuntimeDts(runtimeDir, path.join(root, "dist", "runtime"));
  lines.push("// runtime");
  lines.push(`export * from "./runtime";`);
  lines.push("");
}

writeFileSync(path.join(root, "dist", "index.d.ts"), lines.join("\n"));
console.log(`Wrote dist/index.d.ts and copied ${copied} declaration files.`);
