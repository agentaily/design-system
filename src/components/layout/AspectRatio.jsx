import React from "react";

const AX_ASPECT_CSS = `
.ax-aspect { position: relative; width: 100%; overflow: hidden; border-radius: var(--radius-3); background: var(--surface-raised); }
.ax-aspect > * { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.ax-aspect__placeholder { display: flex; align-items: center; justify-content: center; color: var(--text-faint); font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-aspect-css")) {
  const s = document.createElement("style");
  s.id = "ax-aspect-css";
  s.textContent = AX_ASPECT_CSS;
  document.head.appendChild(s);
}

export function AspectRatio({ ratio = 16 / 9, children, className = "", style = {}, ...rest }) {
  return (
    <div className={["ax-aspect", className].filter(Boolean).join(" ")} style={{ aspectRatio: String(ratio), ...style }} {...rest}>
      {children || <span className="ax-aspect__placeholder">{typeof ratio === "number" ? ratio.toFixed(2) : ratio}</span>}
    </div>
  );
}
