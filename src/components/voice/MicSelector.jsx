import React from "react";

const AX_MICSEL_CSS = `
.ax-micsel { display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 10px; background: var(--surface-card); border: 1px solid var(--border-default); border-radius: var(--radius-2); }
.ax-micsel__icon { color: var(--text-faint); flex: none; }
.ax-micsel__select { appearance: none; background: none; border: none; outline: none; color: var(--text-body); font-family: var(--font-body); font-size: var(--text-sm); cursor: pointer; padding-right: 16px; }
.ax-micsel__level { display: flex; align-items: center; gap: 2px; flex: none; }
.ax-micsel__seg { width: 3px; height: 12px; border-radius: 1px; background: var(--border-strong); }
.ax-micsel__seg--on { background: var(--ok); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-micsel-css")) {
  const s = document.createElement("style");
  s.id = "ax-micsel-css";
  s.textContent = AX_MICSEL_CSS;
  document.head.appendChild(s);
}

const Mic = <svg className="ax-micsel__icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"></rect><path d="M5 10a7 7 0 0 0 14 0M12 17v4"></path></svg>;

export function MicSelector({ devices = [], value, level = 0, onChange, className = "", ...rest }) {
  const segs = 5;
  const on = Math.round((level / 100) * segs);
  return (
    <div className={["ax-micsel", className].filter(Boolean).join(" ")} {...rest}>
      {Mic}
      <select className="ax-micsel__select" value={value} onChange={(e) => onChange && onChange(e.target.value)}>
        {devices.map((d) => {
          const dev = typeof d === "string" ? { value: d, label: d } : d;
          return <option key={dev.value} value={dev.value}>{dev.label}</option>;
        })}
      </select>
      <span className="ax-micsel__level">
        {Array.from({ length: segs }).map((_, i) => <span key={i} className={"ax-micsel__seg" + (i < on ? " ax-micsel__seg--on" : "")}></span>)}
      </span>
    </div>
  );
}
