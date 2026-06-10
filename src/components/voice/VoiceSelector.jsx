import React, { useState, useRef, useEffect, useCallback } from "react";

const AX_VOICESEL_CSS = `
.ax-voicesel { position: relative; display: inline-flex; }
.ax-voicesel__trigger { display: inline-flex; align-items: center; gap: 10px; height: 36px; padding: 0 12px; cursor: pointer; background: var(--surface-card); border: 1px solid var(--border-default); border-radius: var(--radius-2); color: var(--text-body); font-family: var(--font-body); font-size: var(--text-sm); transition: border-color var(--dur-1) var(--ease-out); }
.ax-voicesel__trigger:hover { border-color: var(--border-strong); }
.ax-voicesel__swatch { width: 18px; height: 18px; flex: none; border-radius: var(--radius-1); display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 10px; background: var(--accent); color: var(--accent-fg); }
.ax-voicesel__panel { position: absolute; z-index: 60; top: calc(100% + 6px); left: 0; min-width: 240px; background: var(--surface-panel); border: 1px solid var(--border-strong); border-radius: var(--radius-3); box-shadow: var(--shadow-2); padding: var(--space-1); }
.ax-voicesel__opt { display: flex; align-items: center; gap: 10px; width: 100%; appearance: none; background: none; border: none; text-align: left; cursor: pointer; padding: 8px 10px; border-radius: var(--radius-2); }
.ax-voicesel__opt:hover { background: var(--surface-raised); }
.ax-voicesel__name { font-size: var(--text-sm); color: var(--text-body); flex: 1; }
.ax-voicesel__tag { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); }
.ax-voicesel__play { color: var(--text-faint); cursor: pointer; }
.ax-voicesel__play:hover { color: var(--text-body); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-voicesel-css")) {
  const s = document.createElement("style");
  s.id = "ax-voicesel-css";
  s.textContent = AX_VOICESEL_CSS;
  document.head.appendChild(s);
}

export function VoiceSelector({ voices = [], value, onChange, className = "", ...rest }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const norm = (v) => (typeof v === "string" ? { value: v, label: v } : v);
  const current = voices.map(norm).find((v) => v.value === value) || norm(voices[0] || "Voice");
  const onDoc = useCallback((e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }, []);
  useEffect(() => {
    if (open) { document.addEventListener("mousedown", onDoc); return () => document.removeEventListener("mousedown", onDoc); }
  }, [open, onDoc]);
  return (
    <div className={["ax-voicesel", className].filter(Boolean).join(" ")} ref={ref} {...rest}>
      <button className="ax-voicesel__trigger" onClick={() => setOpen((o) => !o)}>
        <span className="ax-voicesel__swatch">{(current.label || "V")[0]}</span>
        {current.label}
      </button>
      {open ? (
        <div className="ax-voicesel__panel">
          {voices.map((v) => {
            const voice = norm(v);
            return (
              <button key={voice.value} className="ax-voicesel__opt" onClick={() => { onChange && onChange(voice.value); setOpen(false); }}>
                <span className="ax-voicesel__swatch">{(voice.label || "V")[0]}</span>
                <span className="ax-voicesel__name">{voice.label}</span>
                {voice.tag ? <span className="ax-voicesel__tag">{voice.tag}</span> : null}
                <span className="ax-voicesel__play">▶</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
