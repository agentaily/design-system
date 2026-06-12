import React, { useState, useRef, useEffect } from "react";
import { Icon } from "../utilities/Icon.jsx";

// MarkupLayer — element-targeting overlay. Hover highlights the real node under
// the cursor (any element carrying data-mk-label); click selects it; type a note
// and it's emitted via onSend with the element's identity prefixed — so users
// point at what they mean instead of describing it. Personal tool, no persistence.
//
// Mount inside a position:relative container; the layer fills it (inset:0).
// Targetable elements opt in with: data-mk-label="标题" data-mk-kind="文本"(optional).
const AX_MARKUP_CSS = `
.ax-markup { position: absolute; inset: 0; z-index: 20; pointer-events: none; box-shadow: inset 0 0 0 2px var(--focus-soft); }
.ax-markup__canvas { position: absolute; inset: 0; cursor: crosshair; touch-action: none; pointer-events: auto; }
.ax-markup__box { position: absolute; pointer-events: none; border: 1.5px solid var(--accent);
  border-radius: var(--radius-1); background: rgba(127,127,127,0.06); z-index: 22;
  transition: left 80ms var(--ease-out), top 80ms var(--ease-out), width 80ms var(--ease-out), height 80ms var(--ease-out); }
.ax-markup__box.is-selected { box-shadow: 0 0 0 3px var(--focus-soft); background: rgba(127,127,127,0.10); transition: none; }
.ax-markup__tag { position: absolute; top: 0; left: -1.5px; transform: translateY(-100%);
  display: inline-flex; align-items: center; padding: 2px 7px; background: var(--accent); color: var(--accent-fg);
  font-family: var(--font-mono); font-size: 11px; font-weight: 500; letter-spacing: 0.01em;
  border-radius: var(--radius-1) var(--radius-1) 0 0; white-space: nowrap; }
.ax-markup__tagkind { opacity: 0.7; }
.ax-markup__pop { position: absolute; width: 248px; z-index: 30; display: flex; flex-direction: column; gap: 9px;
  padding: 11px; background: var(--surface-card); border: 1px solid var(--border-strong);
  border-radius: var(--radius-3); box-shadow: var(--shadow-3); pointer-events: auto; }
.ax-markup__poptarget { display: flex; align-items: center; gap: 6px; color: var(--text-muted); }
.ax-markup__poptag { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-body); }
.ax-markup__ta { width: 100%; min-height: 64px; resize: none; padding: 8px 10px; background: var(--surface-page);
  color: var(--text-body); border: 1px solid var(--border-default); border-radius: var(--radius-2);
  font-family: var(--font-body); font-size: var(--text-sm); line-height: var(--leading-snug); outline: none; }
.ax-markup__ta:focus { border-color: var(--fg-2); box-shadow: 0 0 0 3px var(--focus-soft); }
.ax-markup__ta::placeholder { color: var(--text-faint); }
.ax-markup__popbtns { display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
.ax-markup__cancel, .ax-markup__done { display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 12px;
  border-radius: var(--radius-2); font-family: var(--font-body); font-size: var(--text-sm); cursor: pointer;
  border: 1px solid transparent; transition: background var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out); }
.ax-markup__cancel { background: none; color: var(--text-faint); }
.ax-markup__cancel:hover { color: var(--text-body); background: var(--surface-raised); }
.ax-markup__done { background: var(--accent); color: var(--accent-fg); }
.ax-markup__done:hover { background: var(--accent-hover); }
.ax-markup__done:disabled { opacity: 0.4; cursor: not-allowed; }
.ax-markup__pill { position: absolute; top: 16px; left: 50%; transform: translateX(-50%); z-index: 25;
  display: flex; align-items: center; gap: 11px; padding: 7px 7px 7px 14px; max-width: calc(100% - 32px);
  background: var(--surface-card); border: 1px solid var(--border-strong); border-radius: var(--radius-full);
  box-shadow: var(--shadow-2); pointer-events: auto; }
.ax-markup__dot { flex: none; width: 7px; height: 7px; border-radius: var(--radius-full); background: var(--accent);
  animation: ax-mk-pulse 1.6s var(--ease-out) infinite; }
@keyframes ax-mk-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
@media (prefers-reduced-motion: reduce) { .ax-markup__dot { animation: none; } }
.ax-markup__pilltxt { font-size: var(--text-sm); color: var(--text-body); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ax-markup__pillsep { flex: none; width: 1px; height: 18px; background: var(--border-strong); }
.ax-markup__pillx { flex: none; display: inline-flex; align-items: center; gap: 5px; height: 28px; padding: 0 11px;
  border: none; background: var(--surface-raised); color: var(--text-muted); border-radius: var(--radius-full);
  font-family: var(--font-body); font-size: var(--text-sm); cursor: pointer; transition: color var(--dur-1) var(--ease-out), background var(--dur-1) var(--ease-out); }
.ax-markup__pillx:hover { color: var(--text-body); background: var(--border-strong); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-markup-css")) {
  const s = document.createElement("style");
  s.id = "ax-markup-css";
  s.textContent = AX_MARKUP_CSS;
  document.head.appendChild(s);
}

export function MarkupLayer({
  onClose,
  onSend,
  placeholder = "告诉 Agentaily 这里要怎么改…",
  hintIdle = "移到要改的地方，点击它再描述修改",
  hintActive = "输入修改要求，发送到左侧对话",
}) {
  const layerRef = useRef(null);
  const capRef = useRef(null);
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");

  const findTarget = (cx, cy) => {
    const cap = capRef.current;
    if (!cap) return null;
    const prev = cap.style.pointerEvents;
    cap.style.pointerEvents = "none";
    const el = document.elementFromPoint(cx, cy);
    cap.style.pointerEvents = prev || "auto";
    if (!el) return null;
    return el.closest("[data-mk-label]") || null;
  };

  const boxFor = (el) => {
    const r = el.getBoundingClientRect();
    const lr = layerRef.current.getBoundingClientRect();
    return {
      left: r.left - lr.left,
      top: r.top - lr.top,
      w: r.width,
      h: r.height,
      label: el.getAttribute("data-mk-label"),
      kind: el.getAttribute("data-mk-kind") || "",
    };
  };

  const onMove = (e) => {
    if (selected) return;
    const t = findTarget(e.clientX, e.clientY);
    setHover(t ? boxFor(t) : null);
  };
  const onLeave = () => {
    if (!selected) setHover(null);
  };
  const onClickCap = (e) => {
    const t = findTarget(e.clientX, e.clientY);
    if (!t) {
      setSelected(null);
      setNote("");
      return;
    }
    setSelected(boxFor(t));
    setNote("");
    setHover(null);
  };

  const send = () => {
    if (!selected || !note.trim()) return;
    const tag = selected.kind ? `${selected.label} · ${selected.kind}` : selected.label;
    onSend && onSend(`〔${tag}〕${note.trim()}`);
    setSelected(null);
    setNote("");
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (selected) {
        setSelected(null);
        setNote("");
      } else onClose && onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, onClose]);

  const box = selected || hover;

  const popStyle = () => {
    const W = layerRef.current ? layerRef.current.clientWidth : 800;
    const H = layerRef.current ? layerRef.current.clientHeight : 600;
    let left = selected.left;
    if (left + 268 > W) left = Math.max(8, W - 268);
    let top = selected.top + selected.h + 10;
    if (top + 150 > H) top = Math.max(8, selected.top - 158);
    return { left, top };
  };

  return (
    <div className="ax-markup" ref={layerRef}>
      <div
        className="ax-markup__canvas"
        ref={capRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClickCap}
      />

      {box ? (
        <div
          className={"ax-markup__box" + (selected ? " is-selected" : "")}
          style={{ left: box.left, top: box.top, width: box.w, height: box.h }}
        >
          <span className="ax-markup__tag">
            {box.label}
            {box.kind ? <span className="ax-markup__tagkind"> · {box.kind}</span> : null}
          </span>
        </div>
      ) : null}

      {selected ? (
        <div className="ax-markup__pop" style={popStyle()} onClick={(e) => e.stopPropagation()}>
          <div className="ax-markup__poptarget">
            <Icon name="target" size={13} />
            <span className="ax-markup__poptag">
              {selected.label}
              {selected.kind ? ` · ${selected.kind}` : ""}
            </span>
          </div>
          <textarea
            className="ax-markup__ta"
            autoFocus
            value={note}
            placeholder={placeholder}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <div className="ax-markup__popbtns">
            <button
              type="button"
              className="ax-markup__cancel"
              onClick={() => {
                setSelected(null);
                setNote("");
              }}
            >
              取消
            </button>
            <button
              type="button"
              className="ax-markup__done"
              disabled={!note.trim()}
              onClick={send}
            >
              发送到对话
              <Icon name="arrow" size={13} />
            </button>
          </div>
        </div>
      ) : null}

      <div className="ax-markup__pill">
        <span className="ax-markup__dot" />
        <span className="ax-markup__pilltxt">{selected ? hintActive : hintIdle}</span>
        <span className="ax-markup__pillsep" />
        <button
          type="button"
          className="ax-markup__pillx"
          onClick={() => onClose && onClose()}
          aria-label="退出"
        >
          <Icon name="x" size={14} />
          <span>退出</span>
        </button>
      </div>
    </div>
  );
}
