import React from "react";

const AX_PROGRESS_CSS = `
.ax-progress { display: flex; flex-direction: column; gap: 6px; }
.ax-progress__top { display: flex; align-items: baseline; justify-content: space-between; }
.ax-progress__val { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); }
.ax-progress__track {
  height: 6px; width: 100%; background: var(--surface-raised);
  border: 1px solid var(--border-default); border-radius: var(--radius-1); overflow: hidden;
}
.ax-progress__bar {
  height: 100%; background: var(--accent); border-radius: 1px;
  transition: width var(--dur-3) var(--ease-out);
}
.ax-progress--indeterminate .ax-progress__bar {
  width: 35% !important; animation: ax-prog-slide 1.3s var(--ease-out) infinite;
}
@keyframes ax-prog-slide { 0% { margin-left: -35%; } 100% { margin-left: 100%; } }
@media (prefers-reduced-motion: reduce) { .ax-progress--indeterminate .ax-progress__bar { animation-duration: 3s; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-progress-css")) {
  const s = document.createElement("style");
  s.id = "ax-progress-css";
  s.textContent = AX_PROGRESS_CSS;
  document.head.appendChild(s);
}

export function Progress({ value = 0, max = 100, label, showValue = false, indeterminate = false, className = "", ...rest }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={["ax-progress", indeterminate ? "ax-progress--indeterminate" : "", className].filter(Boolean).join(" ")} {...rest}>
      {(label != null || showValue) ? (
        <div className="ax-progress__top">
          {label != null ? <span className="ax-label">{label}</span> : <span></span>}
          {showValue && !indeterminate ? <span className="ax-progress__val">{Math.round(pct)}%</span> : null}
        </div>
      ) : null}
      <div className="ax-progress__track" role="progressbar" aria-valuenow={indeterminate ? undefined : value} aria-valuemax={max}>
        <div className="ax-progress__bar" style={{ width: pct + "%" }}></div>
      </div>
    </div>
  );
}
