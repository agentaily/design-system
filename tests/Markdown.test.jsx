import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Markdown } from "../src/components/chat/Markdown.jsx";

/* <Markdown> is the first DS primitive with real, dangerous logic: a markdown
   parser + XSS sanitizer + streaming-tolerant renderer. Its failure modes are
   security (script/href injection) and crashes (a half-streamed token throwing) —
   neither of which build + Storybook-by-eye can catch exhaustively. So it gets the
   library's first unit suite. We assert DOM structure / behavior (roles, elements,
   escaping), NOT snapshot trivia. See TESTING.md.

   Source under test: src/components/chat/Markdown.jsx (a verbatim Claude Design
   mirror — these tests live OUTSIDE it so a design-sync re-sync never clobbers them). */

/** Render markdown and return the wrapping container element to query against. */
function md(content) {
  return render(<Markdown content={content} />).container;
}

describe("Markdown — XSS / sanitization (the security contract)", () => {
  it("drops javascript: link hrefs (renders inert text, no anchor)", () => {
    const c = md("[click](javascript:alert)");
    expect(c.querySelector("a")).toBeNull();
    expect(c.querySelector("[href]")).toBeNull();
    expect(c.textContent).toContain("click");
  });

  it("drops data: link hrefs", () => {
    const c = md("[x](data:text/html;base64,PHNjcmlwdD4=)");
    expect(c.querySelector("a")).toBeNull();
  });

  it("drops vbscript: and file: link hrefs", () => {
    expect(md("[a](vbscript:msgbox)").querySelector("a")).toBeNull();
    expect(md("[b](file:///etc/passwd)").querySelector("a")).toBeNull();
  });

  it("keeps safe link schemes: https / mailto / tel / relative / anchor", () => {
    expect(md("[s](https://example.com)").querySelector("a")).not.toBeNull();
    expect(md("[m](mailto:hi@example.com)").querySelector("a")).not.toBeNull();
    expect(md("[t](tel:+15551234)").querySelector("a")).not.toBeNull();
    expect(md("[r](/local/guide)").querySelector("a").getAttribute("href")).toBe("/local/guide");
    expect(md("[h](#section)").querySelector("a").getAttribute("href")).toBe("#section");
  });

  it("adds rel=noopener + target=_blank to rendered links", () => {
    const a = md("[ok](https://example.com)").querySelector("a");
    expect(a).toHaveAttribute("href", "https://example.com");
    expect(a).toHaveAttribute("target", "_blank");
    expect(a.getAttribute("rel")).toContain("noopener");
  });

  it("escapes raw HTML instead of injecting it (no <img>/<script> nodes)", () => {
    const c = md("<img src=x onerror=alert(1)> and <script>alert(2)</script>");
    expect(c.querySelector("img")).toBeNull();
    expect(c.querySelector("script")).toBeNull();
    // the angle-bracket source survives as literal, auto-escaped text
    expect(c.textContent).toContain("<img src=x onerror=alert(1)>");
    expect(c.textContent).toContain("<script>alert(2)</script>");
  });

  it("renders images as inert placeholder chips — never a fetching <img>", () => {
    const safe = md("![pic](https://cdn.example.com/x.png)");
    expect(safe.querySelector("img")).toBeNull();
    expect(safe.querySelector(".ax-md__img")).not.toBeNull();

    const evil = md("![evil](javascript:boom)");
    expect(evil.querySelector("img")).toBeNull();
    expect(evil.querySelector(".ax-md__img")).not.toBeNull();
  });

  it("never uses dangerouslySetInnerHTML (no HTML-injection surface)", () => {
    // jsdom makes import.meta.url an http URL, so resolve from the project root
    // (vitest's cwd) instead of from the test module.
    const src = readFileSync(resolve(process.cwd(), "src/components/chat/Markdown.jsx"), "utf8");
    // match actual JSX usage (dangerouslySetInnerHTML={...}), not the safety-model
    // comment that merely names it ("we NEVER touch dangerouslySetInnerHTML").
    expect(src).not.toMatch(/dangerouslySetInnerHTML\s*[=:]/);
  });
});

describe("Markdown — inline syntax", () => {
  it("bold (** and __)", () => {
    expect(md("**bold**").querySelector("strong")?.textContent).toBe("bold");
    expect(md("__also bold__").querySelector("strong")?.textContent).toBe("also bold");
  });

  it("italic (* and _)", () => {
    expect(md("*italic*").querySelector("em")?.textContent).toBe("italic");
    expect(md("_also italic_").querySelector("em")?.textContent).toBe("also italic");
  });

  it("strikethrough (~~)", () => {
    const del = md("~~gone~~").querySelector("del");
    expect(del).not.toBeNull();
    expect(del.textContent).toBe("gone");
  });

  it("inline code (`)", () => {
    const code = md("use `npm test` now").querySelector("code.ax-md__code");
    expect(code).not.toBeNull();
    expect(code.textContent).toBe("npm test");
  });

  it("named links and bare-URL / www autolinks", () => {
    const a = md("see [docs](https://a.com/x)").querySelector("a.ax-md__link");
    expect(a).toHaveAttribute("href", "https://a.com/x");
    expect(a.textContent).toBe("docs");

    expect(md("visit https://example.com now").querySelector("a")?.getAttribute("href")).toBe(
      "https://example.com",
    );
    expect(md("at www.example.com today").querySelector("a")?.getAttribute("href")).toBe(
      "http://www.example.com",
    );
  });
});

describe("Markdown — block syntax", () => {
  it("unordered list", () => {
    const ul = md("- a\n- b\n- c").querySelector("ul.ax-md__ul");
    expect(ul).not.toBeNull();
    expect(ul.querySelectorAll("li").length).toBe(3);
  });

  it("ordered list (with custom start)", () => {
    const ol = md("1. one\n2. two").querySelector("ol.ax-md__ol");
    expect(ol.querySelectorAll("li").length).toBe(2);
    expect(md("3. three\n4. four").querySelector("ol.ax-md__ol").getAttribute("start")).toBe("3");
  });

  it("nested list", () => {
    const outer = md("- parent\n  - child\n  - child2").querySelector("ul.ax-md__ul");
    const nested = outer.querySelector("li ul.ax-md__ul");
    expect(nested).not.toBeNull();
    expect(nested.querySelectorAll("li").length).toBe(2);
  });

  it("task list (checked + unchecked, disabled)", () => {
    const c = md("- [ ] todo\n- [x] done");
    const checks = c.querySelectorAll('input.ax-md__check[type="checkbox"]');
    expect(checks.length).toBe(2);
    expect(checks[0].checked).toBe(false);
    expect(checks[1].checked).toBe(true);
    expect(checks[0].disabled).toBe(true);
    expect(c.querySelectorAll("li.ax-md__li--task").length).toBe(2);
  });

  it("blockquote (and nested blockquote)", () => {
    expect(md("> quoted").querySelector("blockquote.ax-md__quote")?.textContent).toContain(
      "quoted",
    );
    const inner = md("> outer\n> > inner")
      .querySelector("blockquote.ax-md__quote")
      .querySelector("blockquote.ax-md__quote");
    expect(inner).not.toBeNull();
    expect(inner.textContent).toContain("inner");
  });

  it("GFM table with column alignment", () => {
    const c = md(
      ["| Left | Center | Right |", "|:-----|:------:|------:|", "| a | b | c |"].join("\n"),
    );
    const table = c.querySelector("table.ax-md__table");
    expect(table).not.toBeNull();
    const ths = table.querySelectorAll("thead th");
    expect(ths.length).toBe(3);
    expect(ths[0].style.textAlign).toBe("left");
    expect(ths[1].style.textAlign).toBe("center");
    expect(ths[2].style.textAlign).toBe("right");
    const tds = table.querySelectorAll("tbody td");
    expect(tds.length).toBe(3);
    expect(tds[1].textContent).toBe("b");
    expect(tds[1].style.textAlign).toBe("center");
  });

  it("horizontal rule", () => {
    expect(md("above\n\n---\n\nbelow").querySelector("hr.ax-md__hr")).not.toBeNull();
  });

  it("headings (shifted one level: # -> h2, capped)", () => {
    expect(md("# A").querySelector("h2.ax-md__h.ax-md__h--1")?.textContent).toBe("A");
    expect(md("## B").querySelector("h3.ax-md__h--2")?.textContent).toBe("B");
    expect(md("### C").querySelector("h4.ax-md__h--3")?.textContent).toBe("C");
  });

  it("fenced code block (renders CodeBlock with lang + content)", () => {
    const c = md("```js\nconst x = 1;\n```");
    const pre = c.querySelector("pre.ax-code__pre");
    expect(pre).not.toBeNull();
    expect(pre.textContent).toContain("const x = 1;");
    expect(c.querySelector(".ax-code__lang")?.textContent).toBe("js");
  });
});

describe("Markdown — streaming tolerance (half-rendered input never throws)", () => {
  it("unterminated bold degrades to literal text", () => {
    const c = md("this is **bold but not closed");
    expect(c.querySelector("strong")).toBeNull();
    expect(c.textContent).toContain("**bold but not closed");
  });

  it("unterminated inline code degrades to literal text", () => {
    const c = md("here is `code without close");
    expect(c.querySelector("code")).toBeNull();
    expect(c.textContent).toContain("`code without close");
  });

  it("unclosed code fence renders a partial code block", () => {
    let c;
    expect(() => {
      c = md("```js\nconst x = 1;\nstill streaming");
    }).not.toThrow();
    const pre = c.querySelector("pre.ax-code__pre");
    expect(pre).not.toBeNull();
    expect(pre.textContent).toContain("const x = 1;");
    expect(pre.textContent).toContain("still streaming");
  });

  it("half table (header + separator, no rows) renders without throwing", () => {
    let c;
    expect(() => {
      c = md("| A | B |\n|:--|:--|");
    }).not.toThrow();
    expect(c.querySelector("table.ax-md__table")).not.toBeNull();
    expect(c.querySelectorAll("tbody tr").length).toBe(0);
  });

  it("partial table row pads missing cells without throwing", () => {
    let c;
    expect(() => {
      c = md("| A | B |\n|:--|:--|\n| 1 |");
    }).not.toThrow();
    const tds = c.querySelectorAll("tbody td");
    expect(tds.length).toBe(2);
    expect(tds[0].textContent).toBe("1");
    expect(tds[1].textContent).toBe("");
  });

  it("half blockquote streamed mid-line renders without throwing", () => {
    let c;
    expect(() => {
      c = md("> quote being streamed");
    }).not.toThrow();
    expect(c.querySelector("blockquote.ax-md__quote")).not.toBeNull();
  });

  it("empty / whitespace / missing content does not throw", () => {
    expect(() => md("")).not.toThrow();
    expect(() => md("   \n  \n")).not.toThrow();
    expect(() => render(<Markdown />)).not.toThrow();
  });

  it("a kitchen-sink document renders without throwing", () => {
    const doc = [
      "# Title",
      "",
      "Some **bold**, *italic*, ~~strike~~ and `code`.",
      "",
      "- [ ] todo",
      "- [x] done",
      "",
      "> a quote",
      "",
      "| A | B |",
      "|:--|--:|",
      "| 1 | 2 |",
      "",
      "```py",
      "print('hi')",
      "```",
      "",
      "See https://example.com and [docs](/guide).",
    ].join("\n");
    let c;
    expect(() => {
      c = md(doc);
    }).not.toThrow();
    expect(c.querySelector("h2")).not.toBeNull();
    expect(c.querySelector("table")).not.toBeNull();
    expect(c.querySelector("pre.ax-code__pre")).not.toBeNull();
    expect(c.querySelector("img")).toBeNull();
  });
});
