import React from "react";

const AX_SUGGESTION_CSS = `
.ax-suggestions { display: flex; gap: 8px; flex-wrap: wrap; }
.ax-suggestions--scroll { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 4px; }
.ax-suggestion {
  display: inline-flex; align-items: center; gap: 7px; cursor: pointer; white-space: nowrap;
  appearance: none; background: none; color: var(--text-muted);
  border: 1px solid var(--border-default); border-radius: var(--radius-2);
  padding: 7px 12px; font-family: var(--font-body); font-size: var(--text-sm);
  transition: border-color var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out), background var(--dur-1) var(--ease-out);
}
.ax-suggestion:hover { border-color: var(--border-strong); color: var(--text-body); background: var(--surface-raised); }
.ax-suggestion:focus-visible { outline: none; box-shadow: var(--ring); }
.ax-suggestion__icon { color: var(--text-faint); display: inline-flex; }
.ax-suggestion__icon svg { width: 13px; height: 13px; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-suggestion-css")) {
  const s = document.createElement("style");
  s.id = "ax-suggestion-css";
  s.textContent = AX_SUGGESTION_CSS;
  document.head.appendChild(s);
}

export function Suggestion({ children, icon, onClick, className = "", ...rest }) {
  return (
    <button type="button" className={["ax-suggestion", className].filter(Boolean).join(" ")} onClick={onClick} {...rest}>
      {icon ? <span className="ax-suggestion__icon">{icon}</span> : null}
      {children}
    </button>
  );
}

export function Suggestions({ items = [], onSelect, scroll = false, className = "", ...rest }) {
  return (
    <div className={["ax-suggestions", scroll ? "ax-suggestions--scroll" : "", className].filter(Boolean).join(" ")} {...rest}>
      {items.map((item, i) => {
        const it = typeof item === "string" ? { label: item } : item;
        return <Suggestion key={i} icon={it.icon} onClick={() => onSelect && onSelect(it.value ?? it.label)}>{it.label}</Suggestion>;
      })}
    </div>
  );
}
