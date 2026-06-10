import React from "react";

const AX_SCROLLAREA_CSS = `
.ax-scrollarea { overflow: auto; position: relative; }
.ax-scrollarea::-webkit-scrollbar { width: 10px; height: 10px; }
.ax-scrollarea::-webkit-scrollbar-track { background: transparent; }
.ax-scrollarea::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: var(--radius-1); border: 3px solid transparent; background-clip: padding-box; }
.ax-scrollarea::-webkit-scrollbar-thumb:hover { background: var(--text-faint); background-clip: padding-box; }
.ax-scrollarea { scrollbar-width: thin; scrollbar-color: var(--border-strong) transparent; }
.ax-scrollarea--fade::before, .ax-scrollarea--fade::after { content: ""; position: sticky; left: 0; right: 0; display: block; height: 16px; pointer-events: none; z-index: 1; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-scrollarea-css")) {
  const s = document.createElement("style");
  s.id = "ax-scrollarea-css";
  s.textContent = AX_SCROLLAREA_CSS;
  document.head.appendChild(s);
}

export function ScrollArea({ maxHeight = 240, children, className = "", style = {}, ...rest }) {
  return (
    <div className={["ax-scrollarea", className].filter(Boolean).join(" ")} style={{ maxHeight, ...style }} {...rest}>
      {children}
    </div>
  );
}
