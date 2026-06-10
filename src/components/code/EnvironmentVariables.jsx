import React, { useState } from "react";

const AX_ENVVARS_CSS = `
.ax-envvars { border: 1px solid var(--border-default); border-radius: var(--radius-3); overflow: hidden; background: var(--surface-card); font-family: var(--font-mono); }
.ax-envvars__head { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid var(--border-default); }
.ax-envvars__title { font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); flex: 1; }
.ax-envvars__reveal { appearance: none; background: none; border: 1px solid var(--border-default); cursor: pointer; color: var(--text-faint); font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.04em; text-transform: uppercase; padding: 3px 7px; border-radius: var(--radius-1); }
.ax-envvars__reveal:hover { color: var(--text-body); border-color: var(--border-strong); }
.ax-envvars__row { display: flex; align-items: center; gap: 12px; padding: 8px 12px; border-bottom: 1px solid var(--border-default); }
.ax-envvars__row:last-child { border-bottom: none; }
.ax-envvars__key { color: var(--text-body); font-size: var(--text-sm); flex: none; min-width: 140px; }
.ax-envvars__val { color: var(--text-muted); font-size: var(--text-sm); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ax-envvars__val--hidden { letter-spacing: 1px; }
.ax-envvars__copy { appearance: none; background: none; border: none; cursor: pointer; color: var(--text-faint); font-size: 11px; padding: 2px 5px; border-radius: var(--radius-1); flex: none; }
.ax-envvars__copy:hover { color: var(--text-body); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-envvars-css")) {
  const s = document.createElement("style");
  s.id = "ax-envvars-css";
  s.textContent = AX_ENVVARS_CSS;
  document.head.appendChild(s);
}

export function EnvironmentVariables({ title = "Environment", vars = [], className = "", ...rest }) {
  const [reveal, setReveal] = useState(false);
  return (
    <div className={["ax-envvars", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-envvars__head">
        <span className="ax-envvars__title">{title}</span>
        <button className="ax-envvars__reveal" onClick={() => setReveal((r) => !r)}>{reveal ? "Hide" : "Reveal"}</button>
      </div>
      {vars.map((v, i) => {
        const item = Array.isArray(v) ? { key: v[0], value: v[1] } : v;
        const secret = item.secret !== false;
        return (
          <div className="ax-envvars__row" key={i}>
            <span className="ax-envvars__key">{item.key}</span>
            <span className={"ax-envvars__val" + (secret && !reveal ? " ax-envvars__val--hidden" : "")}>
              {secret && !reveal ? "••••••••••••" : item.value}
            </span>
            <button className="ax-envvars__copy" onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText(item.value); } catch (e) {} }}>copy</button>
          </div>
        );
      })}
    </div>
  );
}
