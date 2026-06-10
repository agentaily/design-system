import React from "react";

const AX_SOURCES_CSS = `
.ax-citation {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 16px; height: 16px; padding: 0 4px; vertical-align: top;
  background: var(--surface-raised); border: 1px solid var(--border-strong);
  border-radius: var(--radius-1); cursor: pointer; margin: 0 1px;
  font-family: var(--font-mono); font-size: 10px; color: var(--text-muted);
  text-decoration: none; transition: background var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out);
}
.ax-citation:hover { background: var(--accent); color: var(--accent-fg); border-color: var(--accent); }

.ax-sources { border: 1px solid var(--border-default); border-radius: var(--radius-3); overflow: hidden; }
.ax-sources__head { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); padding: 10px 14px; border-bottom: 1px solid var(--border-default); display: flex; align-items: center; gap: 8px; }
.ax-sources__count { color: var(--text-body); }
.ax-source {
  display: flex; align-items: flex-start; gap: 10px; padding: 11px 14px; text-decoration: none;
  border-bottom: 1px solid var(--border-default); transition: background var(--dur-1) var(--ease-out);
}
.ax-source:last-child { border-bottom: none; }
.ax-source:hover { background: var(--surface-raised); }
.ax-source__num { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); flex: none; width: 18px; text-align: right; line-height: 1.5; }
.ax-source__body { min-width: 0; flex: 1; }
.ax-source__title { font-size: var(--text-sm); color: var(--text-body); font-weight: var(--weight-medium); margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ax-source__url { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); margin: 2px 0 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ax-source__arrow { color: var(--text-faint); flex: none; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-sources-css")) {
  const s = document.createElement("style");
  s.id = "ax-sources-css";
  s.textContent = AX_SOURCES_CSS;
  document.head.appendChild(s);
}

export function Citation({ index, href, onClick, className = "", ...rest }) {
  return (
    <a className={["ax-citation", className].filter(Boolean).join(" ")} href={href || "#"} onClick={onClick} {...rest}>{index}</a>
  );
}

export function Sources({ sources = [], label = "Sources", className = "", ...rest }) {
  return (
    <div className={["ax-sources", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-sources__head">{label} <span className="ax-sources__count">· {sources.length}</span></div>
      {sources.map((src, i) => {
        const s = typeof src === "string" ? { title: src } : src;
        return (
          <a className="ax-source" key={i} href={s.url || "#"} target="_blank" rel="noreferrer">
            <span className="ax-source__num">{i + 1}</span>
            <span className="ax-source__body">
              <p className="ax-source__title">{s.title}</p>
              {s.url ? <p className="ax-source__url">{s.url.replace(/^https?:\/\//, "")}</p> : null}
            </span>
            <svg className="ax-source__arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8"></path></svg>
          </a>
        );
      })}
    </div>
  );
}
