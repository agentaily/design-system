import React from "react";

const AX_TABS_CSS = `
.ax-tabs { display: flex; gap: var(--space-5); border-bottom: 1px solid var(--border-default); }
.ax-tabs__tab {
  appearance: none; background: none; border: none; cursor: pointer;
  padding: 0 2px 10px; margin-bottom: -1px; position: relative;
  font-family: var(--font-body); font-size: var(--text-sm);
  font-weight: var(--weight-medium); color: var(--text-faint);
  border-bottom: 1px solid transparent;
  transition: color var(--dur-1) var(--ease-out);
}
.ax-tabs__tab:hover { color: var(--text-muted); }
.ax-tabs__tab:focus-visible { outline: none; box-shadow: var(--ring); border-radius: var(--radius-1); }
.ax-tabs__tab--active { color: var(--text-body); border-bottom-color: var(--text-body); }
.ax-tabs__count { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-faint); margin-left: 6px; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-tabs-css")) {
  const s = document.createElement("style");
  s.id = "ax-tabs-css";
  s.textContent = AX_TABS_CSS;
  document.head.appendChild(s);
}

export function Tabs({ items = [], active, onChange, className = "", ...rest }) {
  return (
    <div role="tablist" className={["ax-tabs", className].filter(Boolean).join(" ")} {...rest}>
      {items.map((item) => {
        const it = typeof item === "string" ? { id: item, label: item } : item;
        const isActive = it.id === active;
        return (
          <button
            key={it.id}
            role="tab"
            aria-selected={isActive}
            className={"ax-tabs__tab" + (isActive ? " ax-tabs__tab--active" : "")}
            onClick={() => onChange && onChange(it.id)}
          >
            {it.label}
            {it.count != null ? <span className="ax-tabs__count">{it.count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
