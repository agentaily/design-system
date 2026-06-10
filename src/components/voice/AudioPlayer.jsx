import React, { useState } from "react";

const AX_AUDIO_CSS = `
.ax-audio { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border: 1px solid var(--border-default); border-radius: var(--radius-3); background: var(--surface-card); }
.ax-audio__play { width: 36px; height: 36px; flex: none; display: flex; align-items: center; justify-content: center; cursor: pointer; background: var(--accent); color: var(--accent-fg); border: none; border-radius: var(--radius-2); transition: background var(--dur-1) var(--ease-out); }
.ax-audio__play:hover { background: var(--accent-hover); }
.ax-audio__body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
.ax-audio__wave { display: flex; align-items: center; gap: 2px; height: 24px; cursor: pointer; }
.ax-audio__bar { flex: 1; border-radius: 1px; background: var(--border-strong); transition: background var(--dur-1) var(--ease-out); }
.ax-audio__bar--played { background: var(--text-body); }
.ax-audio__meta { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-audio-css")) {
  const s = document.createElement("style");
  s.id = "ax-audio-css";
  s.textContent = AX_AUDIO_CSS;
  document.head.appendChild(s);
}

const Play = <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>;
const Pause = <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"></path></svg>;

const WAVE = [40,70,55,90,60,80,45,75,50,85,65,55,95,70,45,60,80,50,70,40,60,88,52,72,48,82,58,68,44,78];

export function AudioPlayer({ duration = "0:48", progress = 35, playing: playingProp, onToggle, className = "", ...rest }) {
  const [playing, setPlaying] = useState(playingProp || false);
  const toggle = () => { setPlaying((p) => !p); onToggle && onToggle(!playing); };
  return (
    <div className={["ax-audio", className].filter(Boolean).join(" ")} {...rest}>
      <button className="ax-audio__play" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>{playing ? Pause : Play}</button>
      <div className="ax-audio__body">
        <div className="ax-audio__wave">
          {WAVE.map((h, i) => (
            <span key={i} className={"ax-audio__bar" + (i / WAVE.length * 100 <= progress ? " ax-audio__bar--played" : "")} style={{ height: h + "%" }}></span>
          ))}
        </div>
        <div className="ax-audio__meta">
          <span>{playing ? "Playing" : "Voice message"}</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
}
