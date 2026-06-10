import React, { useState } from "react";

const AX_CALENDAR_CSS = `
.ax-calendar { display: inline-block; padding: 14px; background: var(--surface-panel); border: 1px solid var(--border-default); border-radius: var(--radius-3); font-family: var(--font-body); user-select: none; }
.ax-calendar__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.ax-calendar__month { font-family: var(--font-mono); font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-body); letter-spacing: 0.02em; }
.ax-calendar__nav { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; cursor: pointer; background: none; border: 1px solid var(--border-default); border-radius: var(--radius-2); color: var(--text-muted); transition: background var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out); }
.ax-calendar__nav:hover { background: var(--surface-raised); color: var(--text-body); }
.ax-calendar__grid { display: grid; grid-template-columns: repeat(7, 32px); gap: 2px; }
.ax-calendar__dow { height: 28px; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); }
.ax-calendar__day { height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; background: none; border: none; border-radius: var(--radius-2); color: var(--text-body); font-family: var(--font-mono); font-size: var(--text-sm); transition: background var(--dur-1) var(--ease-out); }
.ax-calendar__day:hover:not(:disabled) { background: var(--surface-raised); }
.ax-calendar__day--muted { color: var(--text-faint); opacity: 0.5; }
.ax-calendar__day--today { box-shadow: inset 0 0 0 1px var(--border-strong); }
.ax-calendar__day--selected { background: var(--accent) !important; color: var(--accent-fg); }
.ax-calendar__day:disabled { color: var(--text-faint); opacity: 0.3; cursor: not-allowed; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-calendar-css")) {
  const s = document.createElement("style");
  s.id = "ax-calendar-css";
  s.textContent = AX_CALENDAR_CSS;
  document.head.appendChild(s);
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DOW = ["Mo","Tu","We","Th","Fr","Sa","Su"];

function sameDay(a, b) { return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

export function Calendar({ value, onChange, month: monthProp, className = "", ...rest }) {
  const init = value || new Date();
  const [view, setView] = useState({ y: (monthProp || init).getFullYear(), m: (monthProp || init).getMonth() });
  const today = new Date();

  const first = new Date(view.y, view.m, 1);
  const startOffset = (first.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const prevDays = new Date(view.y, view.m, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push({ day: prevDays - startOffset + i + 1, muted: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, muted: false, date: new Date(view.y, view.m, d) });
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - startOffset - daysInMonth + 1, muted: true });

  const shift = (delta) => {
    let m = view.m + delta, y = view.y;
    if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
    setView({ y, m });
  };

  return (
    <div className={["ax-calendar", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-calendar__head">
        <button className="ax-calendar__nav" onClick={() => shift(-1)} aria-label="Previous month">‹</button>
        <span className="ax-calendar__month">{MONTHS[view.m]} {view.y}</span>
        <button className="ax-calendar__nav" onClick={() => shift(1)} aria-label="Next month">›</button>
      </div>
      <div className="ax-calendar__grid">
        {DOW.map((d) => <span key={d} className="ax-calendar__dow">{d}</span>)}
        {cells.map((c, i) => (
          <button
            key={i}
            className={["ax-calendar__day", c.muted ? "ax-calendar__day--muted" : "", c.date && sameDay(c.date, today) ? "ax-calendar__day--today" : "", c.date && sameDay(c.date, value) ? "ax-calendar__day--selected" : ""].filter(Boolean).join(" ")}
            disabled={c.muted}
            onClick={() => c.date && onChange && onChange(c.date)}
          >{c.day}</button>
        ))}
      </div>
    </div>
  );
}
