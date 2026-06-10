import React, { useState, useRef, useCallback } from "react";

const AX_RESIZABLE_CSS = `
.ax-resizable { display: flex; width: 100%; border: 1px solid var(--border-default); border-radius: var(--radius-3); overflow: hidden; }
.ax-resizable--vertical { flex-direction: column; }
.ax-resizable__panel { overflow: auto; min-width: 0; min-height: 0; }
.ax-resizable__handle { flex: none; position: relative; background: var(--border-default); transition: background var(--dur-1) var(--ease-out); }
.ax-resizable__handle:hover, .ax-resizable__handle--active { background: var(--border-strong); }
.ax-resizable--horizontal .ax-resizable__handle { width: 1px; cursor: col-resize; }
.ax-resizable--vertical .ax-resizable__handle { height: 1px; cursor: row-resize; }
.ax-resizable__handle::after { content: ""; position: absolute; }
.ax-resizable--horizontal .ax-resizable__handle::after { inset: 0 -4px; }
.ax-resizable--vertical .ax-resizable__handle::after { inset: -4px 0; }
.ax-resizable__grip { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); display: flex; gap: 2px; }
.ax-resizable--horizontal .ax-resizable__grip { flex-direction: column; }
.ax-resizable__grip span { width: 3px; height: 3px; border-radius: 1px; background: var(--text-faint); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-resizable-css")) {
  const s = document.createElement("style");
  s.id = "ax-resizable-css";
  s.textContent = AX_RESIZABLE_CSS;
  document.head.appendChild(s);
}

export function Resizable({ orientation = "horizontal", defaultSize = 50, min = 15, max = 85, first, second, height = 220, className = "", ...rest }) {
  const [size, setSize] = useState(defaultSize);
  const ref = useRef(null);
  const dragging = useRef(false);
  const vertical = orientation === "vertical";

  const onMove = useCallback((e) => {
    if (!dragging.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const pct = vertical
      ? ((e.clientY - rect.top) / rect.height) * 100
      : ((e.clientX - rect.left) / rect.width) * 100;
    setSize(Math.max(min, Math.min(max, pct)));
  }, [vertical, min, max]);

  const stop = useCallback(() => {
    dragging.current = false;
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", stop);
  }, [onMove]);

  const start = () => {
    dragging.current = true;
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", stop);
  };

  return (
    <div className={["ax-resizable", "ax-resizable--" + orientation, className].filter(Boolean).join(" ")} ref={ref} style={{ height: vertical ? height : undefined }} {...rest}>
      <div className="ax-resizable__panel" style={vertical ? { height: size + "%" } : { width: size + "%" }}>{first}</div>
      <div className="ax-resizable__handle" onMouseDown={start}>
        <span className="ax-resizable__grip"><span></span><span></span><span></span></span>
      </div>
      <div className="ax-resizable__panel" style={{ flex: 1 }}>{second}</div>
    </div>
  );
}
