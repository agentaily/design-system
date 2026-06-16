import { describe, it, expect } from "vitest";
import { themeInitScript } from "../src/runtime/index.js";

/* themeInitScript() returns a JS string to inline in <head> (FOUC prevention).
   Its dangerous surface is XSS: every interpolated config value must be JSON-
   encoded with `<` escaped so a `</script>` in the data cannot break out of the
   tag. Pure string builder — no DOM needed. Ported from @agentaily/web-kit. */

describe("themeInitScript — output shape + defaults", () => {
  it("returns a self-contained IIFE string", () => {
    const s = themeInitScript();
    expect(typeof s).toBe("string");
    expect(s.startsWith("(function(){")).toBe(true);
    expect(s.trim().endsWith("})();")).toBe(true);
  });

  it("uses the documented defaults (data-theme / system / agentaily:theme)", () => {
    const s = themeInitScript();
    expect(s).toContain("data-theme");
    expect(s).toContain("(prefers-color-scheme: dark)");
    // localStorage key (raw) + cookie name (URI-encoded `:` → %3A)
    expect(s).toContain('"agentaily:theme"');
    expect(s).toContain('"agentaily%3Atheme="');
  });

  it("reflects custom attribute / defaultTheme / storageKey", () => {
    const s = themeInitScript({ attribute: "data-mode", defaultTheme: "dark", storageKey: "x:y" });
    expect(s).toContain("data-mode");
    expect(s).toContain('"dark"');
    expect(s).toContain('"x:y"'); // localStorage key
    expect(s).toContain('"x%3Ay="'); // cookie name
  });
});

describe("themeInitScript — XSS safety (the security contract)", () => {
  it("escapes `<` so a `</script>` in config cannot break out of the tag", () => {
    const evil = themeInitScript({ attribute: "</script><img src=x onerror=alert(1)>" });
    // No raw closing tag survives — every `<` is escaped to <.
    expect(evil).not.toContain("</script>");
    expect(evil).not.toContain("<img");
    expect(evil).toContain("\\u003c/script>");
  });

  it("escapes `<` in a malicious storageKey too", () => {
    const evil = themeInitScript({ storageKey: "a<b" });
    expect(evil).not.toMatch(/"a<b"/);
    expect(evil).toContain("a\\u003cb");
  });
});
