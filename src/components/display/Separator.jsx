import React from "react";

const AX_SEPARATOR_CSS = `
.ax-sep { border: none; background: var(--border-default); flex: none; }
.ax-sep--h { width: 100%; height: 1px; margin: var(--space-4) 0; }
.ax-sep--v { width: 1px; align-self: stretch; min-height: 1em; margin: 0 var(--space-4); }
.ax-sep--label {
  display: flex; align-items: center; gap: 12px; width: 100%; margin: var(--space-4) 0;
  background: none; height: auto;
}
.ax-sep--label::before, .ax-sep--label::after { content: ""; flex: 1; height: 1px; background: var(--border-default); }
.ax-sep__text {
  font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--text-faint); white-space: nowrap;
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-separator-css")) {
  const s = document.createElement("style");
  s.id = "ax-separator-css";
  s.textContent = AX_SEPARATOR_CSS;
  document.head.appendChild(s);
}

export function Separator({ orientation = "horizontal", label, className = "", ...rest }) {
  if (label) {
    return (
      <div className={["ax-sep--label", className].filter(Boolean).join(" ")} role="separator" {...rest}>
        <span className="ax-sep__text">{label}</span>
      </div>
    );
  }
  const cls = ["ax-sep", orientation === "vertical" ? "ax-sep--v" : "ax-sep--h", className].filter(Boolean).join(" ");
  return <hr className={cls} role="separator" aria-orientation={orientation} {...rest} />;
}
