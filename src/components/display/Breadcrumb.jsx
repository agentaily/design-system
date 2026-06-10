import React from "react";

const AX_BREADCRUMB_CSS = `
.ax-breadcrumb { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-family: var(--font-mono); font-size: var(--text-xs); }
.ax-breadcrumb__link {
  color: var(--text-faint); text-decoration: none; letter-spacing: var(--tracking-label); text-transform: uppercase;
  transition: color var(--dur-1) var(--ease-out); cursor: pointer; background: none; border: none; padding: 0; font: inherit;
}
.ax-breadcrumb__link:hover { color: var(--text-body); }
.ax-breadcrumb__sep { color: var(--text-faint); opacity: 0.5; }
.ax-breadcrumb__current { color: var(--text-body); letter-spacing: var(--tracking-label); text-transform: uppercase; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-breadcrumb-css")) {
  const s = document.createElement("style");
  s.id = "ax-breadcrumb-css";
  s.textContent = AX_BREADCRUMB_CSS;
  document.head.appendChild(s);
}

export function Breadcrumb({ items = [], separator = "/", onNavigate, className = "", ...rest }) {
  return (
    <nav aria-label="Breadcrumb" className={["ax-breadcrumb", className].filter(Boolean).join(" ")} {...rest}>
      {items.map((item, i) => {
        const it = typeof item === "string" ? { label: item } : item;
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {last
              ? <span className="ax-breadcrumb__current" aria-current="page">{it.label}</span>
              : <button className="ax-breadcrumb__link" onClick={() => onNavigate && onNavigate(it.id ?? it.label)}>{it.label}</button>}
            {!last ? <span className="ax-breadcrumb__sep">{separator}</span> : null}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
