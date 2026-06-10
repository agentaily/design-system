import React from "react";

const AX_ITEM_CSS = `
.ax-item { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border: 1px solid var(--border-default); border-radius: var(--radius-3); background: var(--surface-card); transition: border-color var(--dur-1) var(--ease-out), background var(--dur-1) var(--ease-out); }
.ax-item--interactive { cursor: pointer; }
.ax-item--interactive:hover { border-color: var(--border-strong); background: var(--surface-raised); }
.ax-item--flush { border: none; border-radius: 0; background: none; padding: 10px 0; }
.ax-item__media { flex: none; display: flex; align-items: center; justify-content: center; color: var(--text-muted); }
.ax-item__media--box { width: 36px; height: 36px; border: 1px solid var(--border-default); border-radius: var(--radius-2); }
.ax-item__content { flex: 1; min-width: 0; }
.ax-item__title { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-body); margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ax-item__desc { font-size: var(--text-xs); color: var(--text-muted); margin: 2px 0 0; line-height: var(--leading-snug); }
.ax-item__actions { flex: none; display: flex; align-items: center; gap: 6px; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-item-css")) {
  const s = document.createElement("style");
  s.id = "ax-item-css";
  s.textContent = AX_ITEM_CSS;
  document.head.appendChild(s);
}

export function Item({ media, mediaBox = true, title, description, actions, interactive = false, flush = false, children, className = "", ...rest }) {
  const cls = ["ax-item", interactive ? "ax-item--interactive" : "", flush ? "ax-item--flush" : "", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      {media ? <span className={"ax-item__media" + (mediaBox ? " ax-item__media--box" : "")}>{media}</span> : null}
      <div className="ax-item__content">
        {title ? <p className="ax-item__title">{title}</p> : null}
        {description ? <p className="ax-item__desc">{description}</p> : null}
        {children}
      </div>
      {actions ? <div className="ax-item__actions">{actions}</div> : null}
    </div>
  );
}
