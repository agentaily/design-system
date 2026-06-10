import React from "react";

const AX_TYPOGRAPHY_CSS = `
.ax-prose { color: var(--text-body); font-size: var(--text-md); line-height: var(--leading-body); max-width: 68ch; }
.ax-prose > * { margin: 0 0 1em; }
.ax-prose > *:last-child { margin-bottom: 0; }
.ax-prose h1 { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: var(--weight-medium); letter-spacing: var(--tracking-tight); line-height: var(--leading-tight); margin: 0 0 0.5em; }
.ax-prose h2 { font-family: var(--font-display); font-size: var(--text-xl); font-weight: var(--weight-medium); letter-spacing: var(--tracking-tight); margin: 1.5em 0 0.5em; }
.ax-prose h3 { font-family: var(--font-display); font-size: var(--text-lg); font-weight: var(--weight-medium); margin: 1.4em 0 0.4em; }
.ax-prose a { color: var(--text-body); text-decoration: underline; text-decoration-color: var(--border-strong); text-underline-offset: 2px; }
.ax-prose a:hover { text-decoration-color: var(--text-body); }
.ax-prose strong { font-weight: var(--weight-medium); color: var(--text-body); }
.ax-prose code { font-family: var(--font-mono); font-size: 0.88em; padding: 1px 5px; background: var(--surface-raised); border: 1px solid var(--border-default); border-radius: var(--radius-1); }
.ax-prose blockquote { border-left: 2px solid var(--border-strong); padding-left: 16px; color: var(--text-muted); font-style: normal; }
.ax-prose ul, .ax-prose ol { padding-left: 20px; }
.ax-prose li { margin-bottom: 0.4em; }
.ax-prose hr { border: none; border-top: 1px solid var(--border-default); margin: 2em 0; }

.ax-text--mono { font-family: var(--font-mono); }
.ax-text--muted { color: var(--text-muted); }
.ax-text--faint { color: var(--text-faint); }
.ax-text--label { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); }
.ax-text--display { font-family: var(--font-display); letter-spacing: var(--tracking-tight); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-typography-css")) {
  const s = document.createElement("style");
  s.id = "ax-typography-css";
  s.textContent = AX_TYPOGRAPHY_CSS;
  document.head.appendChild(s);
}

export function Prose({ children, className = "", ...rest }) {
  return <div className={["ax-prose", className].filter(Boolean).join(" ")} {...rest}>{children}</div>;
}

export function Text({ as = "span", variant, className = "", children, ...rest }) {
  const Tag = as;
  const cls = ["ax-text", variant ? "ax-text--" + variant : "", className].filter(Boolean).join(" ");
  return <Tag className={cls} {...rest}>{children}</Tag>;
}

/** Namesake export — Typography is the Prose wrapper. Prose / Text are the primary exports. */
export const Typography = Prose;
