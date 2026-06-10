import React, { useRef, useCallback } from "react";

const AX_SLIDER_CSS = `
.ax-slider { display: flex; flex-direction: column; gap: 8px; }
.ax-slider__top { display: flex; align-items: baseline; justify-content: space-between; }
.ax-slider__val { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--text-body); }
.ax-slider__track {
  position: relative; height: 20px; display: flex; align-items: center; cursor: pointer;
}
.ax-slider__rail { position: absolute; left: 0; right: 0; height: 4px; background: var(--surface-raised); border: 1px solid var(--border-default); border-radius: var(--radius-1); }
.ax-slider__fill { position: absolute; left: 0; height: 4px; background: var(--accent); border-radius: var(--radius-1); }
.ax-slider__thumb {
  position: absolute; width: 14px; height: 14px; margin-left: -7px;
  background: var(--accent); border: 2px solid var(--surface-page); border-radius: var(--radius-1);
  box-shadow: 0 0 0 1px var(--border-strong);
  transition: transform var(--dur-1) var(--ease-out);
}
.ax-slider__track:hover .ax-slider__thumb { transform: scale(1.1); }
.ax-slider input { position: absolute; opacity: 0; width: 100%; height: 20px; margin: 0; cursor: pointer; }
.ax-slider input:focus-visible + .ax-slider__thumb { box-shadow: var(--ring); }
.ax-slider input:disabled { cursor: not-allowed; }
.ax-slider--disabled { opacity: 0.4; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-slider-css")) {
  const s = document.createElement("style");
  s.id = "ax-slider-css";
  s.textContent = AX_SLIDER_CSS;
  document.head.appendChild(s);
}

export function Slider({ label, value = 0, min = 0, max = 100, step = 1, suffix = "", onChange, disabled = false, className = "", ...rest }) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return (
    <div className={["ax-slider", disabled ? "ax-slider--disabled" : "", className].filter(Boolean).join(" ")} {...rest}>
      {(label != null) ? (
        <div className="ax-slider__top">
          <span className="ax-label">{label}</span>
          <span className="ax-slider__val">{value}{suffix}</span>
        </div>
      ) : null}
      <div className="ax-slider__track">
        <span className="ax-slider__rail"></span>
        <span className="ax-slider__fill" style={{ width: pct + "%" }}></span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange && onChange(Number(e.target.value))}
        />
        <span className="ax-slider__thumb" style={{ left: pct + "%" }}></span>
      </div>
    </div>
  );
}
