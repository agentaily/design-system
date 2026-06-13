import React from "react";
import { CodeBlock } from "./CodeBlock.jsx";

/* ============================================================
   Agentaily — Markdown primitive
   Renders a model's markdown STRING into typeset React nodes.

   Safety model: the source string is parsed into a block/inline
   tree and rendered as React elements only. All literal text
   becomes React text nodes (auto-escaped) — we NEVER touch
   dangerouslySetInnerHTML, so there is no HTML-injection surface.
   Link hrefs are scheme-sanitized; images render as inert
   placeholders (no remote fetch).

   Streaming model: inline delimiters match only when their
   closing delimiter is present, so an unterminated ** ` _ ~~ or
   [..]( degrades to literal text. A half table, a half blockquote,
   and an unclosed ``` fence all render their partial content
   instead of throwing — nothing disappears mid-stream.

   Coverage: paragraphs + soft breaks, bold, italic, strikethrough,
   inline code, code blocks, ordered/unordered/nested/task lists,
   blockquotes (nested), tables (GFM, column alignment), horizontal
   rules, headings, links, bare-URL autolinks, image placeholders.
   ============================================================ */

const AX_MD_CSS = `
.ax-md { font-size: var(--text-md); line-height: var(--leading-body); color: var(--text-body); min-width: 0; }
.ax-md > :first-child { margin-top: 0; }
.ax-md > :last-child { margin-bottom: 0; }

.ax-md__p { margin: 0 0 0.7em; text-wrap: pretty; }

.ax-md__ul, .ax-md__ol { margin: 0 0 0.7em; padding-left: 1.5em; }
.ax-md__li { margin: 0.2em 0; }
.ax-md__li > .ax-md__ul, .ax-md__li > .ax-md__ol { margin: 0.25em 0 0; padding-left: 1.3em; }

.ax-md__ul { list-style: none; padding-left: 1.35em; }
.ax-md__ul > .ax-md__li { position: relative; }
.ax-md__ul > .ax-md__li::before {
  content: ""; position: absolute; left: -1.05em; top: 0.62em;
  width: 4px; height: 4px; background: var(--text-faint);
}

.ax-md__ol { list-style: decimal; padding-left: 1.7em; }
.ax-md__ol > .ax-md__li::marker {
  font-family: var(--font-mono); font-size: 0.9em; color: var(--text-faint);
}

.ax-md__li--task { list-style: none; display: flex; align-items: flex-start; gap: 8px; }
.ax-md__ul > .ax-md__li--task::before { display: none; }
.ax-md__check {
  appearance: none; -webkit-appearance: none; margin: 3px 0 0; flex: none;
  width: 15px; height: 15px; border: 1px solid var(--border-strong);
  border-radius: var(--radius-1); background: var(--bg-0); position: relative; cursor: default;
}
.ax-md__check:checked { background: var(--accent); border-color: var(--accent); }
.ax-md__check:checked::after {
  content: ""; position: absolute; left: 4px; top: 1px; width: 4px; height: 8px;
  border: solid var(--accent-fg); border-width: 0 1.6px 1.6px 0; transform: rotate(45deg);
}
.ax-md__li--task > .ax-md__taskbody { flex: 1; min-width: 0; }

.ax-md__strong { font-weight: var(--weight-bold); color: var(--text-body); }
.ax-md__em { font-style: italic; }
.ax-md__del { text-decoration: line-through; text-decoration-thickness: 1px; color: var(--text-muted); }

.ax-md__code {
  font-family: var(--font-mono); font-size: 0.86em;
  background: var(--bg-3); color: var(--text-body);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-1); padding: 0.12em 0.36em;
  white-space: break-spaces; word-break: break-word;
}
[data-theme="dark"] .ax-md__code { background: var(--bg-2); }

.ax-md > .ax-code, .ax-md__li > .ax-code, .ax-md__quote > .ax-code { margin: 0 0 0.7em; }

.ax-md__link {
  color: var(--text-body); text-decoration: underline;
  text-underline-offset: 2px; text-decoration-color: var(--border-strong);
  transition: text-decoration-color var(--dur-1) var(--ease-out);
  word-break: break-word;
}
.ax-md__link:hover { text-decoration-color: var(--text-body); }

.ax-md__img {
  display: inline-flex; align-items: center; gap: 6px; vertical-align: baseline;
  padding: 1px 8px; border: 1px dashed var(--border-strong); border-radius: var(--radius-1);
  font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-faint);
}
.ax-md__img b { font-weight: var(--weight-medium); letter-spacing: var(--tracking-label); }

.ax-md__quote {
  margin: 0 0 0.7em; padding: 2px 0 2px 14px;
  border-left: 2px solid var(--border-strong); color: var(--text-muted);
}
.ax-md__quote > :last-child { margin-bottom: 0; }
.ax-md__quote .ax-md__quote { margin-top: 0.5em; }

.ax-md__hr { border: none; border-top: 1px solid var(--border-default); margin: 1.2em 0; }

.ax-md__tablewrap {
  margin: 0 0 0.7em; overflow-x: auto;
  border: 1px solid var(--border-default); border-radius: var(--radius-2);
}
.ax-md__table { border-collapse: collapse; width: 100%; font-size: var(--text-sm); }
.ax-md__table th, .ax-md__table td {
  padding: 7px 12px; text-align: left; vertical-align: top;
  border-bottom: 1px solid var(--border-default); border-right: 1px solid var(--border-default);
}
.ax-md__table th:last-child, .ax-md__table td:last-child { border-right: none; }
.ax-md__table tbody tr:last-child td { border-bottom: none; }
.ax-md__table thead th {
  background: var(--surface-card); color: var(--text-body);
  font-weight: var(--weight-medium); white-space: nowrap;
}

.ax-md__h { font-family: var(--font-display); font-weight: var(--weight-medium);
  line-height: var(--leading-snug); letter-spacing: var(--tracking-tight);
  margin: 1.1em 0 0.5em; color: var(--text-body); }
.ax-md__h--1 { font-size: var(--text-xl); }
.ax-md__h--2 { font-size: var(--text-lg); }
.ax-md__h--3 { font-size: var(--text-md); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-md-css")) {
  const s = document.createElement("style");
  s.id = "ax-md-css";
  s.textContent = AX_MD_CSS;
  document.head.appendChild(s);
}

/* ---- url sanitizer: only allow safe schemes / relative ---- */
function sanitizeUrl(raw) {
  // eslint-disable-next-line no-control-regex
  const url = String(raw || "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim();
  if (!url) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) {
    if (/^(https?|mailto|tel):/i.test(url)) return url;
    return null; // blocks javascript:, data:, vbscript:, file:, etc.
  }
  return url; // relative, anchor, query, protocol-relative
}

/* ==================== inline parser ==================== */
/* string -> React node array. At each position it tries inline
   rules in priority order; a rule fires only when its CLOSING
   delimiter exists, so streamed/partial delimiters fall through
   to literal text. */
function parseInline(text, keyBase) {
  const out = [];
  let buf = "";
  let i = 0;
  let k = 0;
  const len = text.length;
  const flush = () => {
    if (buf) {
      out.push(buf);
      buf = "";
    }
  };

  while (i < len) {
    const ch = text[i];
    const rest = text.slice(i);

    if (ch === "\n") {
      flush();
      out.push(<br key={keyBase + "-br" + k++} />);
      i++;
      continue;
    }

    if (ch === "\\" && i + 1 < len && /[\\`*_{}\[\]()#+\-.!~|>]/.test(text[i + 1])) {
      buf += text[i + 1];
      i += 2;
      continue;
    }

    let m;
    // inline code
    if (ch === "`" && (m = /^`([^`\n]+?)`/.exec(rest))) {
      flush();
      out.push(
        <code key={keyBase + "-c" + k++} className="ax-md__code">
          {m[1]}
        </code>,
      );
      i += m[0].length;
      continue;
    }
    // image placeholder  ![alt](url)  — inert, never fetched
    if (ch === "!" && text[i + 1] === "[" && (m = /^!\[([^\]]*)\]\(([^)\s]*)\)/.exec(rest))) {
      flush();
      out.push(
        <span key={keyBase + "-img" + k++} className="ax-md__img" title={m[2]}>
          <b>IMG</b>
          {m[1] ? " · " + m[1] : ""}
        </span>,
      );
      i += m[0].length;
      continue;
    }
    // link  [text](url)
    if (ch === "[" && (m = /^\[([^\]]*)\]\(([^)\s]*)\)/.exec(rest))) {
      flush();
      const href = sanitizeUrl(m[2]);
      const inner = parseInline(m[1], keyBase + "-lt" + k);
      out.push(
        href ? (
          <a
            key={keyBase + "-l" + k++}
            className="ax-md__link"
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {inner}
          </a>
        ) : (
          <span key={keyBase + "-l" + k++}>{inner}</span>
        ),
      );
      i += m[0].length;
      continue;
    }
    // bare-URL autolink (word boundary on the left)
    if (
      (ch === "h" || ch === "w") &&
      (i === 0 || /[\s(]/.test(text[i - 1])) &&
      (m = /^((?:https?:\/\/|www\.)[^\s<>]+)/i.exec(rest))
    ) {
      let urlText = m[1];
      const trail = /[.,;:!?'")\]]+$/.exec(urlText);
      if (trail) urlText = urlText.slice(0, urlText.length - trail[0].length);
      const href = sanitizeUrl(/^www\./i.test(urlText) ? "http://" + urlText : urlText);
      if (href) {
        flush();
        out.push(
          <a
            key={keyBase + "-a" + k++}
            className="ax-md__link"
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {urlText}
          </a>,
        );
        i += urlText.length;
        continue;
      }
    }
    // bold  ** **  or  __ __
    if (ch === "*" && (m = /^\*\*([\s\S]+?)\*\*/.exec(rest))) {
      flush();
      out.push(
        <strong key={keyBase + "-b" + k++} className="ax-md__strong">
          {parseInline(m[1], keyBase + "-bt" + k)}
        </strong>,
      );
      i += m[0].length;
      continue;
    }
    if (ch === "_" && (m = /^__([\s\S]+?)__/.exec(rest))) {
      flush();
      out.push(
        <strong key={keyBase + "-b" + k++} className="ax-md__strong">
          {parseInline(m[1], keyBase + "-bt" + k)}
        </strong>,
      );
      i += m[0].length;
      continue;
    }
    // strikethrough  ~~ ~~
    if (ch === "~" && (m = /^~~([\s\S]+?)~~/.exec(rest))) {
      flush();
      out.push(
        <del key={keyBase + "-s" + k++} className="ax-md__del">
          {parseInline(m[1], keyBase + "-st" + k)}
        </del>,
      );
      i += m[0].length;
      continue;
    }
    // italic  * *  or  _ _   (no adjacent whitespace)
    if (ch === "*" && (m = /^\*(?!\s)([^*]+?)(?<!\s)\*/.exec(rest))) {
      flush();
      out.push(
        <em key={keyBase + "-i" + k++} className="ax-md__em">
          {parseInline(m[1], keyBase + "-it" + k)}
        </em>,
      );
      i += m[0].length;
      continue;
    }
    if (ch === "_" && (m = /^_(?!\s)([^_]+?)(?<!\s)_/.exec(rest))) {
      flush();
      out.push(
        <em key={keyBase + "-i" + k++} className="ax-md__em">
          {parseInline(m[1], keyBase + "-it" + k)}
        </em>,
      );
      i += m[0].length;
      continue;
    }

    buf += ch;
    i++;
  }
  flush();
  return out;
}

/* ==================== block parser ==================== */
const RE_FENCE = /^(\s{0,3})(`{3,}|~{3,})\s*([\w+#.-]*)\s*$/;
const RE_HEADING = /^(#{1,6})\s+(.*)$/;
const RE_HR = /^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/;
const RE_BLANK = /^\s*$/;
const RE_QUOTE = /^\s*>/;
const RE_LIST_ITEM = /^([ \t]*)([-*+]|\d{1,9}[.)])\s+(.*)$/;

function leadingSpaces(s) {
  const m = /^[ \t]*/.exec(s);
  return m[0].length;
}

function listMarkerInfo(line) {
  const m = RE_LIST_ITEM.exec(line);
  if (!m) return null;
  const ordered = /\d/.test(m[2]);
  return {
    indent: m[1].length,
    bullet: ordered ? "ol" : "ul",
    start: ordered ? parseInt(m[2], 10) : null,
    text: m[3],
    raw: m[0],
  };
}

function splitTableRow(row) {
  let s = row.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|")) s = s.slice(0, -1);
  return s.split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, "|"));
}

function isTableSep(line) {
  if (!line.includes("|")) return false;
  const cells = splitTableRow(line);
  return cells.length > 0 && cells.every((c) => /^:?-{1,}:?$/.test(c.trim()));
}

function alignOf(cell) {
  const c = cell.trim();
  const l = c.startsWith(":"),
    r = c.endsWith(":");
  if (l && r) return "center";
  if (r) return "right";
  if (l) return "left";
  return null;
}

function startsBlock(lines, i) {
  const line = lines[i];
  if (RE_FENCE.test(line)) return true;
  if (RE_HR.test(line)) return true;
  if (RE_HEADING.test(line)) return true;
  if (RE_QUOTE.test(line)) return true;
  if (listMarkerInfo(line)) return true;
  if (line.includes("|") && i + 1 < lines.length && isTableSep(lines[i + 1])) return true;
  return false;
}

function parseList(lines, i) {
  const base = leadingSpaces(lines[i]);
  const baseInfo = listMarkerInfo(lines[i]);
  const type = baseInfo.bullet;
  const start = baseInfo.start;
  const items = [];

  while (i < lines.length) {
    if (RE_BLANK.test(lines[i])) {
      let j = i;
      while (j < lines.length && RE_BLANK.test(lines[j])) j++;
      const info = j < lines.length ? listMarkerInfo(lines[j]) : null;
      if (
        j < lines.length &&
        ((info && leadingSpaces(lines[j]) === base) || leadingSpaces(lines[j]) > base)
      ) {
        i = j;
        continue;
      }
      break;
    }
    const ind = leadingSpaces(lines[i]);
    const info = listMarkerInfo(lines[i]);
    if (info && ind === base && info.bullet === type) {
      const markerWidth = info.raw.length - info.text.length;
      const itemLines = [info.text];
      i++;
      while (i < lines.length) {
        if (RE_BLANK.test(lines[i])) {
          let j = i;
          while (j < lines.length && RE_BLANK.test(lines[j])) j++;
          if (j < lines.length && leadingSpaces(lines[j]) > base) {
            itemLines.push("");
            i++;
            continue;
          }
          break;
        }
        if (leadingSpaces(lines[i]) > base) {
          itemLines.push(lines[i].slice(Math.min(markerWidth, leadingSpaces(lines[i]))));
          i++;
        } else break;
      }
      while (itemLines.length && itemLines[itemLines.length - 1] === "") itemLines.pop();

      let checked = null;
      const tm = /^\[([ xX])\]\s+([\s\S]*)$/.exec(itemLines[0] || "");
      if (tm) {
        checked = tm[1].toLowerCase() === "x";
        itemLines[0] = tm[2];
      }

      items.push({ checked, blocks: parseBlocks(itemLines.join("\n")) });
    } else {
      break; // sibling of different type, dedent, or non-list line ends the list
    }
  }
  return { type, start, items, next: i };
}

function parseBlocks(src) {
  const lines = String(src || "")
    .replace(/\r\n?/g, "\n")
    .split("\n");
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // fenced code (tolerates a missing closing fence)
    const fence = RE_FENCE.exec(line);
    if (fence) {
      const mark = fence[2][0];
      const len = fence[2].length;
      const close = new RegExp("^\\s{0,3}" + mark + "{" + len + ",}\\s*$");
      i++;
      const code = [];
      while (i < lines.length && !close.test(lines[i])) {
        code.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++;
      blocks.push({ type: "code", lang: fence[3] || "", code: code.join("\n") });
      continue;
    }

    if (RE_BLANK.test(line)) {
      i++;
      continue;
    }

    if (RE_HR.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    const h = RE_HEADING.exec(line);
    if (h) {
      blocks.push({ type: "heading", level: h[1].length, text: h[2] });
      i++;
      continue;
    }

    // blockquote — strip one '>' level, recurse (enables nesting + inner blocks)
    if (RE_QUOTE.test(line)) {
      const inner = [];
      while (i < lines.length && RE_QUOTE.test(lines[i])) {
        inner.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      blocks.push({ type: "quote", blocks: parseBlocks(inner.join("\n")) });
      continue;
    }

    // GFM table (header + separator). Half tables render their partial rows.
    if (line.includes("|") && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const header = splitTableRow(line);
      const aligns = splitTableRow(lines[i + 1]).map(alignOf);
      i += 2;
      const rows = [];
      while (
        i < lines.length &&
        !RE_BLANK.test(lines[i]) &&
        lines[i].includes("|") &&
        !RE_FENCE.test(lines[i]) &&
        !RE_QUOTE.test(lines[i])
      ) {
        rows.push(splitTableRow(lines[i]));
        i++;
      }
      blocks.push({ type: "table", header, aligns, rows });
      continue;
    }

    // lists (nested + mixed handled recursively)
    if (listMarkerInfo(line)) {
      const res = parseList(lines, i);
      blocks.push({ type: "list", listType: res.type, start: res.start, items: res.items });
      i = res.next;
      continue;
    }

    // paragraph
    const para = [line];
    i++;
    while (i < lines.length && !RE_BLANK.test(lines[i]) && !startsBlock(lines, i)) {
      para.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", text: para.join("\n") });
  }

  return blocks;
}

/* ==================== render ==================== */
function renderItemContent(blocks, key) {
  if (blocks.length === 1 && blocks[0].type === "p") return parseInline(blocks[0].text, key);
  return blocks.map((b, j) =>
    b.type === "p" ? (
      <React.Fragment key={j}>{parseInline(b.text, key + "-" + j)}</React.Fragment>
    ) : (
      renderBlock(b, key + "-" + j)
    ),
  );
}

function renderList(b, key) {
  const Tag = b.listType === "ol" ? "ol" : "ul";
  const cls = b.listType === "ol" ? "ax-md__ol" : "ax-md__ul";
  const startAttr = b.listType === "ol" && b.start && b.start !== 1 ? b.start : undefined;
  return (
    <Tag key={key} className={cls} start={startAttr}>
      {b.items.map((it, j) => {
        const content = renderItemContent(it.blocks, key + "-" + j);
        if (it.checked !== null) {
          return (
            <li key={j} className="ax-md__li ax-md__li--task">
              <input
                type="checkbox"
                className="ax-md__check"
                checked={it.checked}
                disabled
                readOnly
              />
              <span className="ax-md__taskbody">{content}</span>
            </li>
          );
        }
        return (
          <li key={j} className="ax-md__li">
            {content}
          </li>
        );
      })}
    </Tag>
  );
}

function renderTable(b, key) {
  const cols = b.header.length;
  return (
    <div key={key} className="ax-md__tablewrap">
      <table className="ax-md__table">
        <thead>
          <tr>
            {b.header.map((c, ci) => (
              <th key={ci} style={{ textAlign: b.aligns[ci] || "left" }}>
                {parseInline(c, key + "-h" + ci)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {b.rows.map((r, ri) => (
            <tr key={ri}>
              {Array.from({ length: cols }).map((_, ci) => (
                <td key={ci} style={{ textAlign: b.aligns[ci] || "left" }}>
                  {parseInline(r[ci] || "", key + "-r" + ri + "c" + ci)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderBlock(b, key) {
  switch (b.type) {
    case "code":
      return <CodeBlock key={key} code={b.code} lang={b.lang || "text"} />;
    case "hr":
      return <hr key={key} className="ax-md__hr" />;
    case "quote":
      return (
        <blockquote key={key} className="ax-md__quote">
          {renderBlocks(b.blocks, key)}
        </blockquote>
      );
    case "table":
      return renderTable(b, key);
    case "list":
      return renderList(b, key);
    case "heading": {
      const lvl = Math.min(b.level, 3);
      const Tag = "h" + Math.min(b.level + 1, 6);
      return (
        <Tag key={key} className={"ax-md__h ax-md__h--" + lvl}>
          {parseInline(b.text, key)}
        </Tag>
      );
    }
    case "p":
    default:
      return (
        <p key={key} className="ax-md__p">
          {parseInline(b.text, key)}
        </p>
      );
  }
}

function renderBlocks(blocks, keyBase) {
  return blocks.map((b, idx) => renderBlock(b, keyBase + "-blk" + idx));
}

export function Markdown({ content, children, className = "", ...rest }) {
  const src = typeof content === "string" ? content : typeof children === "string" ? children : "";
  const blocks = React.useMemo(() => parseBlocks(src), [src]);
  const cls = ["ax-md", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      {renderBlocks(blocks, "md")}
    </div>
  );
}
