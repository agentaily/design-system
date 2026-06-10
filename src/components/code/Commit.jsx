import React from "react";

const AX_COMMIT_CSS = `
.ax-commit { display: flex; gap: 12px; padding: 10px 12px; border: 1px solid var(--border-default); border-radius: var(--radius-3); background: var(--surface-card); font-family: var(--font-mono); }
.ax-commit__graph { display: flex; flex-direction: column; align-items: center; flex: none; padding-top: 2px; }
.ax-commit__node { width: 10px; height: 10px; border-radius: var(--radius-1); border: 2px solid var(--text-muted); background: var(--surface-card); }
.ax-commit__line { width: 2px; flex: 1; background: var(--border-strong); margin-top: 2px; min-height: 8px; }
.ax-commit__body { flex: 1; min-width: 0; }
.ax-commit__msg { font-family: var(--font-body); font-size: var(--text-sm); color: var(--text-body); margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ax-commit__meta { display: flex; align-items: center; gap: 8px; margin-top: 4px; font-size: 11px; color: var(--text-faint); }
.ax-commit__hash { color: var(--text-muted); background: var(--surface-raised); padding: 0 5px; border-radius: var(--radius-1); }
.ax-commit__author { color: var(--text-faint); }
.ax-commit__stat { display: inline-flex; gap: 6px; margin-left: auto; }
.ax-commit__add { color: var(--ok); }
.ax-commit__del { color: var(--danger); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-commit-css")) {
  const s = document.createElement("style");
  s.id = "ax-commit-css";
  s.textContent = AX_COMMIT_CSS;
  document.head.appendChild(s);
}

export function Commit({ message, hash, author, time, additions, deletions, connected = false, className = "", ...rest }) {
  return (
    <div className={["ax-commit", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-commit__graph">
        <span className="ax-commit__node"></span>
        {connected ? <span className="ax-commit__line"></span> : null}
      </div>
      <div className="ax-commit__body">
        <p className="ax-commit__msg">{message}</p>
        <div className="ax-commit__meta">
          {hash ? <span className="ax-commit__hash">{hash}</span> : null}
          {author ? <span className="ax-commit__author">{author}</span> : null}
          {time ? <span className="ax-commit__author">· {time}</span> : null}
          {(additions != null || deletions != null) ? (
            <span className="ax-commit__stat">
              {additions != null ? <span className="ax-commit__add">+{additions}</span> : null}
              {deletions != null ? <span className="ax-commit__del">−{deletions}</span> : null}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
