import React, { useState } from "react";

const AX_FILETREE_CSS = `
.ax-filetree { border: 1px solid var(--border-default); border-radius: var(--radius-3); background: var(--surface-card); padding: 8px; font-family: var(--font-mono); font-size: var(--text-sm); }
.ax-filetree__row { display: flex; align-items: center; gap: 7px; padding: 4px 6px; border-radius: var(--radius-1); cursor: pointer; color: var(--text-muted); user-select: none; transition: background var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out); }
.ax-filetree__row:hover { background: var(--surface-raised); color: var(--text-body); }
.ax-filetree__row--active { background: var(--surface-raised); color: var(--text-body); }
.ax-filetree__row--active::before { content: ""; position: absolute; }
.ax-filetree__chev { width: 12px; height: 12px; flex: none; color: var(--text-faint); transition: transform var(--dur-1) var(--ease-out); }
.ax-filetree__chev--open { transform: rotate(90deg); }
.ax-filetree__chev--spacer { visibility: hidden; }
.ax-filetree__icon { width: 14px; height: 14px; flex: none; color: var(--text-faint); }
.ax-filetree__name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ax-filetree__badge { font-size: 9px; letter-spacing: 0.06em; text-transform: uppercase; padding: 1px 4px; border-radius: var(--radius-1); }
.ax-filetree__badge--add { color: var(--ok); background: var(--ok-dim); }
.ax-filetree__badge--mod { color: var(--warn); background: var(--warn-dim); }
.ax-filetree__badge--del { color: var(--danger); background: var(--danger-dim); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-filetree-css")) {
  const s = document.createElement("style");
  s.id = "ax-filetree-css";
  s.textContent = AX_FILETREE_CSS;
  document.head.appendChild(s);
}

const Folder = <svg className="ax-filetree__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>;
const FileIcon = <svg className="ax-filetree__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6"></path></svg>;
const Chev = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>;

function Node({ node, depth, activePath, onSelect }) {
  const [open, setOpen] = useState(node.defaultOpen !== false);
  const isDir = node.type === "dir" || node.children;
  const pad = { paddingLeft: 6 + depth * 14 };
  return (
    <React.Fragment>
      <div
        className={"ax-filetree__row" + (activePath === node.path ? " ax-filetree__row--active" : "")}
        style={pad}
        onClick={() => isDir ? setOpen((o) => !o) : onSelect && onSelect(node.path || node.name)}
      >
        {isDir
          ? <span className={"ax-filetree__chev" + (open ? " ax-filetree__chev--open" : "")}>{Chev}</span>
          : <span className="ax-filetree__chev ax-filetree__chev--spacer">{Chev}</span>}
        {isDir ? Folder : FileIcon}
        <span className="ax-filetree__name">{node.name}</span>
        {node.status ? <span className={"ax-filetree__badge ax-filetree__badge--" + node.status}>{node.status === "add" ? "A" : node.status === "mod" ? "M" : "D"}</span> : null}
      </div>
      {isDir && open && node.children ? node.children.map((c, i) => (
        <Node key={i} node={c} depth={depth + 1} activePath={activePath} onSelect={onSelect} />
      )) : null}
    </React.Fragment>
  );
}

export function FileTree({ tree = [], activePath, onSelect, className = "", ...rest }) {
  return (
    <div className={["ax-filetree", className].filter(Boolean).join(" ")} {...rest}>
      {tree.map((n, i) => <Node key={i} node={n} depth={0} activePath={activePath} onSelect={onSelect} />)}
    </div>
  );
}
