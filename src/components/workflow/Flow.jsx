import React from "react";

const AX_FLOW_CSS = `
.ax-canvas { position: relative; width: 100%; height: 320px; overflow: hidden; border: 1px solid var(--border-default); border-radius: var(--radius-3); background: var(--surface-page); background-image: var(--dot-grid); background-size: 20px 20px; }
.ax-canvas__inner { position: absolute; inset: 0; }
.ax-canvas__edges { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; }

.ax-node { position: absolute; min-width: 130px; background: var(--surface-card); border: 1px solid var(--border-strong); border-radius: var(--radius-2); box-shadow: var(--shadow-1); user-select: none; }
.ax-node--selected { border-color: var(--text-body); box-shadow: var(--ring); }
.ax-node__head { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-bottom: 1px solid var(--border-default); }
.ax-node__dot { width: 7px; height: 7px; border-radius: 1px; flex: none; background: var(--text-faint); }
.ax-node__dot--ok { background: var(--ok); }
.ax-node__dot--warn { background: var(--warn); }
.ax-node__title { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-body); letter-spacing: 0.02em; flex: 1; }
.ax-node__body { padding: 8px 10px; font-size: var(--text-xs); color: var(--text-muted); line-height: var(--leading-snug); }
.ax-node__port { position: absolute; width: 9px; height: 9px; border-radius: var(--radius-1); background: var(--surface-page); border: 1px solid var(--border-strong); top: 50%; transform: translateY(-50%); }
.ax-node__port--in { left: -5px; }
.ax-node__port--out { right: -5px; }

.ax-flow-controls { position: absolute; bottom: 12px; left: 12px; z-index: 5; display: flex; flex-direction: column; background: var(--surface-panel); border: 1px solid var(--border-strong); border-radius: var(--radius-2); overflow: hidden; box-shadow: var(--shadow-1); }
.ax-flow-controls--horizontal { flex-direction: row; }
.ax-flow-controls__btn { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; background: none; border: none; color: var(--text-muted); border-bottom: 1px solid var(--border-default); transition: background var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out); }
.ax-flow-controls--horizontal .ax-flow-controls__btn { border-bottom: none; border-right: 1px solid var(--border-default); }
.ax-flow-controls__btn:last-child { border: none; }
.ax-flow-controls__btn:hover { background: var(--surface-raised); color: var(--text-body); }

.ax-flow-panel { position: absolute; z-index: 5; background: var(--surface-panel); border: 1px solid var(--border-strong); border-radius: var(--radius-2); box-shadow: var(--shadow-1); padding: var(--space-3); }
.ax-flow-panel--top-right { top: 12px; right: 12px; }
.ax-flow-panel--top-left { top: 12px; left: 12px; }
.ax-flow-panel--bottom-right { bottom: 12px; right: 12px; }

.ax-flow-toolbar { display: inline-flex; gap: 2px; padding: 3px; background: var(--surface-panel); border: 1px solid var(--border-strong); border-radius: var(--radius-2); box-shadow: var(--shadow-1); }
.ax-flow-toolbar__btn { width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; background: none; border: none; border-radius: var(--radius-1); color: var(--text-muted); transition: background var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out); }
.ax-flow-toolbar__btn:hover, .ax-flow-toolbar__btn--active { background: var(--surface-raised); color: var(--text-body); }
.ax-flow-toolbar__sep { width: 1px; align-self: stretch; background: var(--border-default); margin: 2px 2px; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-flow-css")) {
  const s = document.createElement("style");
  s.id = "ax-flow-css";
  s.textContent = AX_FLOW_CSS;
  document.head.appendChild(s);
}

export function Canvas({ children, edges, className = "", ...rest }) {
  return (
    <div className={["ax-canvas", className].filter(Boolean).join(" ")} {...rest}>
      <svg className="ax-canvas__edges">{edges}</svg>
      <div className="ax-canvas__inner">{children}</div>
    </div>
  );
}

export function Node({ x = 0, y = 0, title, status, ports = true, selected = false, children, className = "", style = {}, ...rest }) {
  return (
    <div className={["ax-node", selected ? "ax-node--selected" : "", className].filter(Boolean).join(" ")} style={{ left: x, top: y, ...style }} {...rest}>
      {ports ? <span className="ax-node__port ax-node__port--in"></span> : null}
      <div className="ax-node__head">
        <span className={"ax-node__dot" + (status ? " ax-node__dot--" + status : "")}></span>
        <span className="ax-node__title">{title}</span>
      </div>
      {children ? <div className="ax-node__body">{children}</div> : null}
      {ports ? <span className="ax-node__port ax-node__port--out"></span> : null}
    </div>
  );
}

export function Edge({ from, to, animated = false, label, ...rest }) {
  const dx = Math.abs(to.x - from.x) * 0.5;
  const d = `M ${from.x} ${from.y} C ${from.x + dx} ${from.y}, ${to.x - dx} ${to.y}, ${to.x} ${to.y}`;
  const mx = (from.x + to.x) / 2, my = (from.y + to.y) / 2;
  return (
    <g {...rest}>
      <path d={d} fill="none" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray={animated ? "4 4" : undefined}>
        {animated ? <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.5s" repeatCount="indefinite"></animate> : null}
      </path>
      {label ? <text x={mx} y={my - 4} fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">{label}</text> : null}
    </g>
  );
}

export function Connection({ from, to, ...rest }) {
  return <Edge from={from} to={to} animated {...rest} />;
}

export function Controls({ orientation = "vertical", onZoomIn, onZoomOut, onFit, className = "", ...rest }) {
  return (
    <div className={["ax-flow-controls", orientation === "horizontal" ? "ax-flow-controls--horizontal" : "", className].filter(Boolean).join(" ")} {...rest}>
      <button className="ax-flow-controls__btn" onClick={onZoomIn} aria-label="Zoom in">+</button>
      <button className="ax-flow-controls__btn" onClick={onZoomOut} aria-label="Zoom out">−</button>
      <button className="ax-flow-controls__btn" onClick={onFit} aria-label="Fit view">⊡</button>
    </div>
  );
}

export function Panel({ position = "top-right", children, className = "", ...rest }) {
  return <div className={["ax-flow-panel", "ax-flow-panel--" + position, className].filter(Boolean).join(" ")} {...rest}>{children}</div>;
}

export function Toolbar({ children, className = "", ...rest }) {
  return <div className={["ax-flow-toolbar", className].filter(Boolean).join(" ")} {...rest}>{children}</div>;
}

/** Namesake export — Flow aliases Canvas (the graph root). Canvas/Node/Edge/… are the primary exports. */
export const Flow = Canvas;
