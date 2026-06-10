import React from "react";

const AX_SPEECH_CSS = `
.ax-speech { display: inline-flex; align-items: center; gap: 14px; padding: 12px 18px; border: 1px solid var(--border-default); border-radius: var(--radius-full); background: var(--surface-card); }
.ax-speech__btn { width: 44px; height: 44px; flex: none; display: flex; align-items: center; justify-content: center; cursor: pointer; border: none; border-radius: var(--radius-full); transition: background var(--dur-1) var(--ease-out); }
.ax-speech__btn--idle { background: var(--accent); color: var(--accent-fg); }
.ax-speech__btn--idle:hover { background: var(--accent-hover); }
.ax-speech__btn--recording { background: var(--danger); color: #fff; }
.ax-speech__viz { display: flex; align-items: center; gap: 3px; height: 28px; min-width: 80px; }
.ax-speech__bar { width: 3px; border-radius: 1px; background: var(--border-strong); }
.ax-speech--recording .ax-speech__bar { background: var(--danger); animation: ax-speech-bounce 0.8s var(--ease-out) infinite; }
.ax-speech--recording .ax-speech__bar:nth-child(2n) { animation-delay: 0.15s; }
.ax-speech--recording .ax-speech__bar:nth-child(3n) { animation-delay: 0.3s; }
.ax-speech--recording .ax-speech__bar:nth-child(4n) { animation-delay: 0.45s; }
.ax-speech__status { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); }
.ax-speech--recording .ax-speech__status { color: var(--danger); }
.ax-speech__time { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--text-muted); }
@keyframes ax-speech-bounce { 0%, 100% { height: 6px; } 50% { height: 24px; } }
@media (prefers-reduced-motion: reduce) { .ax-speech--recording .ax-speech__bar { animation: none; height: 14px; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-speech-css")) {
  const s = document.createElement("style");
  s.id = "ax-speech-css";
  s.textContent = AX_SPEECH_CSS;
  document.head.appendChild(s);
}

const Mic = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"></rect><path d="M5 10a7 7 0 0 0 14 0M12 17v4"></path></svg>;
const Stop = <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"></rect></svg>;

export function SpeechInput({ recording = false, time = "0:00", onToggle, className = "", ...rest }) {
  return (
    <div className={["ax-speech", recording ? "ax-speech--recording" : "", className].filter(Boolean).join(" ")} {...rest}>
      <button className={"ax-speech__btn ax-speech__btn--" + (recording ? "recording" : "idle")} onClick={onToggle} aria-label={recording ? "Stop" : "Record"}>
        {recording ? Stop : Mic}
      </button>
      <div className="ax-speech__viz">
        {Array.from({ length: 16 }).map((_, i) => <span key={i} className="ax-speech__bar" style={{ height: recording ? undefined : (6 + (i % 4) * 4) }}></span>)}
      </div>
      {recording ? <span className="ax-speech__time">{time}</span> : <span className="ax-speech__status">Tap to speak</span>}
    </div>
  );
}
