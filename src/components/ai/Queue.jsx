import React, { useState, useRef, useCallback } from "react";

const AX_QUEUE_CSS = `
.ax-queue { display: flex; flex-direction: column; gap: 6px; }
.ax-queue__head { display: flex; align-items: center; gap: 8px; margin-bottom: 2px; }
.ax-queue__title { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); flex: 1; }
.ax-queue__count { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }
.ax-queue__item { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border: 1px solid var(--border-default); border-radius: var(--radius-2); background: var(--surface-card); }
.ax-queue__num { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); width: 16px; flex: none; }
.ax-queue__text { flex: 1; min-width: 0; font-size: var(--text-sm); color: var(--text-body); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ax-queue__item--running { border-color: var(--border-strong); }
.ax-queue__item--running .ax-queue__num { color: var(--warn); }
.ax-queue__status { font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-label); text-transform: uppercase; flex: none; color: var(--text-faint); }
.ax-queue__item--running .ax-queue__status { color: var(--warn); }
.ax-queue__remove { appearance: none; background: none; border: none; cursor: pointer; color: var(--text-faint); font-family: var(--font-mono); font-size: 11px; padding: 2px 4px; border-radius: var(--radius-1); flex: none; }
.ax-queue__remove:hover { color: var(--danger); background: var(--danger-dim); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-queue-css")) {
  const s = document.createElement("style");
  s.id = "ax-queue-css";
  s.textContent = AX_QUEUE_CSS;
  document.head.appendChild(s);
}

export function Queue({ title = "Queued", items = [], onRemove, className = "", ...rest }) {
  return (
    <div className={["ax-queue", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-queue__head">
        <span className="ax-queue__title">{title}</span>
        <span className="ax-queue__count">{items.length}</span>
      </div>
      {items.map((it, i) => {
        const item = typeof it === "string" ? { text: it } : it;
        const running = item.status === "running";
        return (
          <div key={i} className={"ax-queue__item" + (running ? " ax-queue__item--running" : "")}>
            <span className="ax-queue__num">{running ? "▶" : i + 1}</span>
            <span className="ax-queue__text">{item.text}</span>
            {item.status ? <span className="ax-queue__status">{item.status}</span> : null}
            {onRemove && !running ? (
              <button className="ax-queue__remove" aria-label="Remove" onClick={() => onRemove(i)}>
                ✕
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   useQueue — headless "keep sending, buffer while busy" driver.
   Exposed as Queue.useQueue. Pairs with the <Queue> display above.
   The first prompt bootstraps via onFirst (once); everything sent
   while busy accumulates and drains together as a BUFFER via onBatch.
   Both callbacks are async and own the app-specific work (push
   messages, run tools) — the hook only owns the queue + pump.
   ============================================================ */
let _qid = 0;
function useQueue({ onFirst, onBatch } = {}) {
  const [queue, setQueue] = useState([]); // pending items: { id, text }
  const [busy, setBusy] = useState(false); // a drain loop is running
  const itemsRef = useRef([]); // source of truth for the pump
  const pumpingRef = useRef(false);
  const initedRef = useRef(false); // first prompt has bootstrapped
  const cbRef = useRef(null);
  cbRef.current = { onFirst, onBatch }; // always call the latest callbacks
  const pumpRef = useRef(null);

  if (!pumpRef.current) {
    pumpRef.current = async () => {
      if (pumpingRef.current) return;
      pumpingRef.current = true;
      setBusy(true);
      const cb = cbRef.current || {};
      if (!initedRef.current && itemsRef.current.length) {
        const job = itemsRef.current.shift();
        setQueue(itemsRef.current.slice());
        initedRef.current = true;
        if (cb.onFirst) await cb.onFirst(job.text);
        else if (cb.onBatch) await cb.onBatch([job.text]);
      }
      while (itemsRef.current.length) {
        const batch = itemsRef.current.splice(0, itemsRef.current.length);
        setQueue([]);
        if (cb.onBatch) await cb.onBatch(batch.map((j) => j.text));
      }
      setBusy(false);
      pumpingRef.current = false;
    };
  }

  const enqueue = useCallback((text) => {
    const t = (text || "").trim();
    if (!t) return;
    itemsRef.current = [...itemsRef.current, { id: ++_qid, text: t }];
    setQueue(itemsRef.current.slice());
    pumpRef.current();
  }, []);

  const remove = useCallback((i) => {
    itemsRef.current = itemsRef.current.filter((_, idx) => idx !== i);
    setQueue(itemsRef.current.slice());
  }, []);

  // clear the buffer and let the next prompt bootstrap again (e.g. "new chat")
  const reset = useCallback(() => {
    itemsRef.current = [];
    initedRef.current = false;
    setQueue([]);
  }, []);

  return { queue, busy, enqueue, remove, reset };
}
Queue.useQueue = useQueue;
