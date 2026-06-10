// Inlines src/styles.css (which is a list of @imports) into a single
// dist/styles.css that consumers import once. Remote @imports (e.g. the
// Google Fonts line in tokens/fonts.css) are hoisted to the top, as the
// CSS spec requires all @import rules to precede other statements.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const stylesEntry = path.join(root, "src", "styles.css");

const importRe = () => /@import\s+(?:url\()?["']?([^"')]+)["']?\)?\s*;/g;
const REMOTE_RE = /^(?:https?:)?\/\//;

const remoteImports = [];
const blocks = [];

function inline(filePath) {
  const css = readFileSync(filePath, "utf8");
  // Collect all @imports up front so recursion can't disturb iteration state.
  const matches = [...css.matchAll(importRe())];
  for (const m of matches) {
    const target = m[1];
    if (REMOTE_RE.test(target)) {
      remoteImports.push(`@import url("${target}");`);
    } else {
      inline(path.resolve(path.dirname(filePath), target)); // depth-first; preserves order
    }
  }
  // strip the @import lines we just resolved/hoisted
  const body = css.replace(importRe(), "").replace(/^\s*\n/gm, "").trim();
  if (body) blocks.push(`/* ${path.relative(root, filePath)} */\n${body}`);
}

inline(stylesEntry);

const out = [
  "/* Agentaily design system — bundled tokens + fonts. Import once at your app root. */",
  ...[...new Set(remoteImports)],
  "",
  ...blocks,
  "",
].join("\n");

mkdirSync(path.join(root, "dist"), { recursive: true });
writeFileSync(path.join(root, "dist", "styles.css"), out);
console.log(`Wrote dist/styles.css — ${blocks.length} token blocks, ${new Set(remoteImports).size} remote import(s).`);
