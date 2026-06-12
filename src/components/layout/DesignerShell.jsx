import React, { useState, useRef, useEffect } from "react";
import { BrandMark } from "../utilities/BrandMark.jsx";

// DesignerShell — the two-pane "AI designer" frame: a chat column on the left
// and a live preview on the right, separated by a draggable divider, collapsing
// to a single pane with a segmented switcher on phones. Pure frame: pass `chat`
// and `preview` nodes plus top-bar slots; mount your own overlays (AuthDialog,
// integration cards, MarkupLayer) as siblings.
const AX_DESIGNERSHELL_CSS = `
.ax-dshell { display: flex; flex-direction: column; height: 100%; background: var(--surface-page); }
.ax-dshell__top { display: flex; align-items: center; gap: 16px; height: var(--topbar-h); flex: none; padding: 0 16px; border-bottom: 1px solid var(--border-default); background: var(--surface-panel); }
/* helper: use on a pane's sub-header (e.g. the preview tabs bar) so both panes' bars share --bar-h and line up */
.ax-dshell__panebar { display: flex; align-items: center; gap: 12px; height: var(--bar-h); flex: none; padding: 0 16px; border-bottom: 1px solid var(--border-default); background: var(--surface-panel); }
.ax-dshell__div { color: var(--text-faint); }
.ax-dshell__crumb { font-family: var(--font-mono); font-size: 13px; color: var(--text-muted); }
.ax-dshell__title { flex: 1; display: flex; align-items: center; gap: 10px; justify-content: center; }
.ax-dshell__actions { display: flex; align-items: center; gap: 8px; }
.ax-dshell__sep { width: 1px; height: 20px; background: var(--border-default); margin: 0 2px; flex: none; }
.ax-dshell__split { flex: 1; display: flex; min-height: 0; }
.ax-dshell__pane { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
.ax-dshell__pane--preview { flex: 1; position: relative; }
.ax-dshell__divider { width: 9px; flex: none; cursor: col-resize; display: flex; align-items: center; justify-content: center;
  background: var(--surface-page); border-left: 1px solid var(--border-default); border-right: 1px solid var(--border-default); }
.ax-dshell__grip { width: 2px; height: 26px; border-radius: 2px; background: var(--border-strong); transition: background var(--dur-1) var(--ease-out); }
.ax-dshell__divider:hover .ax-dshell__grip { background: var(--text-faint); }
.ax-dshell__mbar { display: none; }
@media (max-width: 720px) {
  .ax-dshell__split { flex-direction: column; }
  .ax-dshell__divider { display: none; }
  .ax-dshell__pane { width: 100% !important; flex: 1; }
  .ax-dshell__split[data-mview="chat"] .ax-dshell__pane--preview { display: none; }
  .ax-dshell__split[data-mview="preview"] .ax-dshell__pane--chat { display: none; }
  .ax-dshell__div, .ax-dshell__crumb { display: none; }
  .ax-dshell__mbar { display: flex; flex: none; gap: 8px; padding: 8px 12px; border-bottom: 1px solid var(--border-default); background: var(--surface-panel); }
  .ax-dshell__mseg { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 7px; height: 38px; border: 1px solid var(--border-default);
    background: var(--surface-page); border-radius: var(--radius-2); font-family: var(--font-body); font-size: var(--text-sm); color: var(--text-muted); cursor: pointer; }
  .ax-dshell__mseg.is-on { background: var(--surface-card); border-color: var(--border-strong); color: var(--text-body); }
  .ax-dshell__mcount { font-family: var(--font-mono); font-size: 11px; line-height: 16px; color: var(--text-faint); border: 1px solid var(--border-default); border-radius: var(--radius-1); padding: 0 5px; }
  .ax-dshell__mseg.is-on .ax-dshell__mcount { color: var(--text-muted); }
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-dshell-css")) {
  const s = document.createElement("style");
  s.id = "ax-dshell-css";
  s.textContent = AX_DESIGNERSHELL_CSS;
  document.head.appendChild(s);
}

export function DesignerShell({
  brand,
  crumb = "设计器",
  title,
  actions,
  account,
  chat,
  preview,
  split,
  onSplitChange,
  defaultSplit = 0.42,
  minSplit = 0.28,
  maxSplit = 0.7,
  mobileLabels = { chat: "对话", preview: "预览" },
  mobileView,
  onMobileViewChange,
}) {
  const controlled = split !== undefined;
  const [internalW, setInternalW] = useState(defaultSplit);
  const leftW = controlled ? split : internalW;
  const [internalMV, setInternalMV] = useState("chat");
  const mview = mobileView !== undefined ? mobileView : internalMV;
  const setView = (v) => {
    if (onMobileViewChange) onMobileViewChange(v);
    if (mobileView === undefined) setInternalMV(v);
  };
  const dragging = useRef(false);
  const splitRef = useRef(null);

  // latest applier (clamp + write back, controlled or internal), kept in a ref so
  // the window drag listeners always see current props without re-binding.
  const applyRef = useRef(null);
  applyRef.current = (f) => {
    const v = Math.min(maxSplit, Math.max(minSplit, f));
    if (onSplitChange) onSplitChange(v); // drag writes back to a controlled value (e.g. a slider)
    if (!controlled) setInternalW(v);
  };

  useEffect(() => {
    const move = (e) => {
      if (!dragging.current || !splitRef.current) return;
      const r = splitRef.current.getBoundingClientRect();
      applyRef.current((e.clientX - r.left) / r.width);
    };
    const up = () => {
      dragging.current = false;
      document.body.style.cursor = "";
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <div className="ax-dshell">
      <div className="ax-dshell__top">
        {brand || <BrandMark size={18} wordmark blink={false} />}
        {crumb ? (
          <React.Fragment>
            <span className="ax-dshell__div">/</span>
            <span className="ax-dshell__crumb">{crumb}</span>
          </React.Fragment>
        ) : null}
        <div className="ax-dshell__title">{title}</div>
        <div className="ax-dshell__actions">
          {actions}
          {actions && account ? <span className="ax-dshell__sep"></span> : null}
          {account}
        </div>
      </div>

      <div className="ax-dshell__mbar">
        <button
          className={"ax-dshell__mseg" + (mview === "chat" ? " is-on" : "")}
          onClick={() => setView("chat")}
        >
          {mobileLabels.chat}
        </button>
        <button
          className={"ax-dshell__mseg" + (mview === "preview" ? " is-on" : "")}
          onClick={() => setView("preview")}
        >
          {mobileLabels.preview}
        </button>
      </div>

      <div className="ax-dshell__split" ref={splitRef} data-mview={mview}>
        <div className="ax-dshell__pane ax-dshell__pane--chat" style={{ width: leftW * 100 + "%" }}>
          {chat}
        </div>
        <div
          className="ax-dshell__divider"
          onMouseDown={() => {
            dragging.current = true;
            document.body.style.cursor = "col-resize";
          }}
        >
          <span className="ax-dshell__grip"></span>
        </div>
        <div className="ax-dshell__pane ax-dshell__pane--preview">{preview}</div>
      </div>
    </div>
  );
}
