import React from "react";

const AX_BTNGROUP_CSS = `
.ax-btngroup { display: inline-flex; }
.ax-btngroup > * { border-radius: 0 !important; margin-left: -1px; }
.ax-btngroup > *:first-child { border-radius: var(--radius-2) 0 0 var(--radius-2) !important; margin-left: 0; }
.ax-btngroup > *:last-child { border-radius: 0 var(--radius-2) var(--radius-2) 0 !important; }
.ax-btngroup > *:only-child { border-radius: var(--radius-2) !important; }
.ax-btngroup > *:hover, .ax-btngroup > *:focus-visible { position: relative; z-index: 1; }
.ax-btngroup--vertical { flex-direction: column; }
.ax-btngroup--vertical > * { margin-left: 0; margin-top: -1px; }
.ax-btngroup--vertical > *:first-child { border-radius: var(--radius-2) var(--radius-2) 0 0 !important; margin-top: 0; }
.ax-btngroup--vertical > *:last-child { border-radius: 0 0 var(--radius-2) var(--radius-2) !important; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-btngroup-css")) {
  const s = document.createElement("style");
  s.id = "ax-btngroup-css";
  s.textContent = AX_BTNGROUP_CSS;
  document.head.appendChild(s);
}

export function ButtonGroup({ vertical = false, children, className = "", ...rest }) {
  return (
    <div className={["ax-btngroup", vertical ? "ax-btngroup--vertical" : "", className].filter(Boolean).join(" ")} role="group" {...rest}>
      {children}
    </div>
  );
}
