import React, { useState, useRef, useEffect, useCallback } from "react";
import { Calendar } from "./Calendar.jsx";

const AX_DATEPICKER_CSS = `
.ax-datepicker { position: relative; display: inline-flex; }
.ax-datepicker__trigger { display: inline-flex; align-items: center; gap: 10px; height: 36px; padding: 0 12px; cursor: pointer; background: var(--surface-card); border: 1px solid var(--border-default); border-radius: var(--radius-2); color: var(--text-body); font-family: var(--font-mono); font-size: var(--text-sm); transition: border-color var(--dur-1) var(--ease-out); }
.ax-datepicker__trigger:hover { border-color: var(--border-strong); }
.ax-datepicker__trigger:focus-visible { outline: none; box-shadow: var(--ring); }
.ax-datepicker__icon { width: 15px; height: 15px; color: var(--text-faint); }
.ax-datepicker__value--empty { color: var(--text-faint); }
.ax-datepicker__pop { position: absolute; z-index: 60; top: calc(100% + 6px); left: 0; animation: ax-datepicker-in var(--dur-2) var(--ease-out); }
@keyframes ax-datepicker-in { from { opacity: 0; transform: translateY(-4px); } }
@media (prefers-reduced-motion: reduce) { .ax-datepicker__pop { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-datepicker-css")) {
  const s = document.createElement("style");
  s.id = "ax-datepicker-css";
  s.textContent = AX_DATEPICKER_CSS;
  document.head.appendChild(s);
}

const CalIcon = <svg className="ax-datepicker__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg>;

function format(d) {
  if (!d) return null;
  const p = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}

export function DatePicker({ value, onChange, placeholder = "Pick a date", className = "", ...rest }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const onDoc = useCallback((e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }, []);
  useEffect(() => {
    if (open) { document.addEventListener("mousedown", onDoc); return () => document.removeEventListener("mousedown", onDoc); }
  }, [open, onDoc]);
  return (
    <div className={["ax-datepicker", className].filter(Boolean).join(" ")} ref={ref} {...rest}>
      <button className="ax-datepicker__trigger" onClick={() => setOpen((o) => !o)}>
        {CalIcon}
        <span className={value ? "" : "ax-datepicker__value--empty"}>{value ? format(value) : placeholder}</span>
      </button>
      {open ? (
        <div className="ax-datepicker__pop">
          <Calendar value={value} onChange={(d) => { onChange && onChange(d); setOpen(false); }} />
        </div>
      ) : null}
    </div>
  );
}
