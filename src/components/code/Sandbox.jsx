import React from "react";

const AX_SANDBOX_CSS = `
.ax-sandbox { border: 1px solid var(--border-default); border-radius: var(--radius-3); overflow: hidden; background: var(--surface-card); }
.ax-sandbox__head { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-bottom: 1px solid var(--border-default); font-family: var(--font-mono); }
.ax-sandbox__status { display: inline-flex; align-items: center; gap: 6px; font-size: 10px; letter-spacing: var(--tracking-label); text-transform: uppercase; }
.ax-sandbox__dot { width: 7px; height: 7px; border-radius: 1px; }
.ax-sandbox--running .ax-sandbox__status { color: var(--ok); }
.ax-sandbox--running .ax-sandbox__dot { background: var(--ok); animation: ax-sb-pulse 1.2s var(--ease-out) infinite; }
.ax-sandbox--booting .ax-sandbox__status { color: var(--warn); }
.ax-sandbox--booting .ax-sandbox__dot { background: var(--warn); animation: ax-sb-pulse 0.8s var(--ease-out) infinite; }
.ax-sandbox--stopped .ax-sandbox__status { color: var(--text-faint); }
.ax-sandbox--stopped .ax-sandbox__dot { background: var(--text-faint); }
.ax-sandbox__id { flex: 1; font-size: 11px; color: var(--text-faint); }
.ax-sandbox__region { font-size: 10px; color: var(--text-faint); border: 1px solid var(--border-default); border-radius: var(--radius-1); padding: 1px 5px; }
.ax-sandbox__body { padding: 12px; }
@keyframes ax-sb-pulse { 50% { opacity: 0.3; } }
@media (prefers-reduced-motion: reduce) { .ax-sandbox__dot { animation: none !important; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-sandbox-css")) {
  const s = document.createElement("style");
  s.id = "ax-sandbox-css";
  s.textContent = AX_SANDBOX_CSS;
  document.head.appendChild(s);
}

const STATUS = { running: "Running", booting: "Booting", stopped: "Stopped" };

export function Sandbox({ id = "sandbox-7f29c4", status = "running", region, children, className = "", ...rest }) {
  return (
    <div className={["ax-sandbox", "ax-sandbox--" + status, className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-sandbox__head">
        <span className="ax-sandbox__status"><span className="ax-sandbox__dot"></span>{STATUS[status]}</span>
        <span className="ax-sandbox__id">{id}</span>
        {region ? <span className="ax-sandbox__region">{region}</span> : null}
      </div>
      {children ? <div className="ax-sandbox__body">{children}</div> : null}
    </div>
  );
}
