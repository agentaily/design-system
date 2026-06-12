import React, { useRef, useEffect } from "react";
import { Badge } from "../display/Badge.jsx";
import { BrandMark } from "../utilities/BrandMark.jsx";
import { Composer } from "./Composer.jsx";
import { Icon } from "../utilities/Icon.jsx";
import { IconButton } from "../buttons/IconButton.jsx";
import { Message } from "./Message.jsx";
import { Queue } from "../ai/Queue.jsx";

// ConversationThread — a pure-render chat surface: header (title · model ·
// actions), an empty state with hint chips, a scrolling thread of turns, and a
// pinned Composer. State lives OUTSIDE: the caller holds the queue
// (Queue.useQueue) and injects it as `controller`. The component only renders.
//
// The composer enqueues into the controller; the buffer list, busy state, and
// "keep typing while busy" all flow through it — and because the caller owns the
// hook, it can also enqueue programmatically and read controller.busy elsewhere.
const AX_CTHREAD_CSS = `
.ax-cthread { display: flex; flex-direction: column; height: 100%; background: var(--surface-page); }
.ax-cthread__head { display: flex; align-items: center; gap: 12px; height: var(--bar-h); padding: 0 20px; border-bottom: 1px solid var(--border-default); flex: none; }
.ax-cthread__title { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-body); margin: 0; }
.ax-cthread__sp { flex: 1; }
.ax-cthread__thread { flex: 1; overflow-y: auto; }
.ax-cthread__col { max-width: var(--thread-max, 760px); margin: 0 auto; padding: 32px 24px 16px; display: flex; flex-direction: column; gap: 24px; }
.ax-cthread__turn { display: flex; flex-direction: column; }
.ax-cthread__tools { display: flex; gap: 2px; margin-top: 6px; opacity: 0; transition: opacity var(--dur-1) var(--ease-out); }
.ax-cthread__turn:hover .ax-cthread__tools { opacity: 1; }
.ax-cthread__empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 40px; }
.ax-cthread__emptyh { font-family: var(--font-display); font-size: var(--text-xl); font-weight: var(--weight-medium); letter-spacing: var(--tracking-tight); color: var(--text-body); margin: 12px 0 0; }
.ax-cthread__hints { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; justify-content: center; }
.ax-cthread__hint { appearance: none; cursor: pointer; background: none; border: 1px solid var(--border-default); border-radius: var(--radius-2);
  padding: 7px 12px; font-family: var(--font-body); font-size: var(--text-sm); color: var(--text-muted); transition: border-color var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out); }
.ax-cthread__hint:hover { border-color: var(--border-strong); color: var(--text-body); }
.ax-cthread__foot { padding: 8px 24px 14px; flex: none; }
.ax-cthread__footcol { max-width: var(--thread-max, 760px); margin: 0 auto; }
.ax-cthread__queue { margin-bottom: 10px; }
.ax-cthread__note { text-align: center; font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); margin: 8px 0 0; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-cthread-css")) {
  const s = document.createElement("style");
  s.id = "ax-cthread-css";
  s.textContent = AX_CTHREAD_CSS;
  document.head.appendChild(s);
}

export function ConversationThread({
  title = "New chat",
  model = "agentaily-2",
  actions,
  messages = [],
  draft = "",
  onDraftChange,
  controller,
  queueTitle = "缓冲区 · 下一轮一起发",
  disabled = false,
  hints = [],
  onHint,
  emptyTitle = "有什么要解决的？",
  placeholder = "Message Agentaily…",
  busyPlaceholder = "可继续输入，会收进缓冲区一起处理…",
  note = "AGENTAILY MAY MAKE MISTAKES · VERIFY CRITICAL OUTPUT",
  onCopy,
  onRegenerate,
  renderTurn,
}) {
  const queue = controller ? controller.queue : [];
  const busy = controller ? controller.busy : false;

  const threadRef = useRef(null);
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, queue.length]);

  const send = (text) => {
    const t = (text || "").trim();
    if (!t || !controller) return;
    controller.enqueue(t);
    if (onDraftChange) onDraftChange("");
  };

  const empty = messages.length === 0 && queue.length === 0;
  const showTools = onCopy || onRegenerate;

  return (
    <div className="ax-cthread">
      <header className="ax-cthread__head">
        <h1 className="ax-cthread__title">{title}</h1>
        {model ? <Badge variant="outline">{model}</Badge> : null}
        <span className="ax-cthread__sp"></span>
        {actions}
      </header>

      {empty ? (
        <div className="ax-cthread__empty ax-dotgrid">
          <BrandMark size={40} />
          <h2 className="ax-cthread__emptyh">{emptyTitle}</h2>
          {hints.length ? (
            <div className="ax-cthread__hints">
              {hints.map((h) => (
                <button
                  key={h}
                  className="ax-cthread__hint"
                  onClick={() => (onHint ? onHint(h) : send(h))}
                >
                  {h}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="ax-cthread__thread" ref={threadRef}>
          <div className="ax-cthread__col">
            {messages.map((m, idx) => (
              <div className="ax-cthread__turn" key={m.id != null ? m.id : idx}>
                {renderTurn ? (
                  renderTurn(m, idx, {
                    streaming: !!m.streaming,
                    isLast: idx === messages.length - 1,
                  })
                ) : (
                  <React.Fragment>
                    <Message role={m.role} time={m.time} streaming={!!m.streaming}>
                      <p>{m.text}</p>
                    </Message>
                    {m.role === "assistant" && showTools ? (
                      <div className="ax-cthread__tools">
                        {onCopy ? (
                          <IconButton size="sm" label="Copy" onClick={() => onCopy(m, idx)}>
                            <Icon name="copy" size={13} />
                          </IconButton>
                        ) : null}
                        {onRegenerate ? (
                          <IconButton
                            size="sm"
                            label="Regenerate"
                            onClick={() => onRegenerate(m, idx)}
                          >
                            <Icon name="refresh" size={13} />
                          </IconButton>
                        ) : null}
                      </div>
                    ) : null}
                  </React.Fragment>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="ax-cthread__foot">
        <div className="ax-cthread__footcol">
          {queue.length > 0 ? (
            <div className="ax-cthread__queue">
              <Queue title={queueTitle} items={queue} onRemove={controller.remove} />
            </div>
          ) : null}
          <Composer
            value={draft}
            onChange={onDraftChange}
            onSend={() => send(draft)}
            disabled={disabled}
            placeholder={busy ? busyPlaceholder : placeholder}
            model={model}
          />
          {note ? <p className="ax-cthread__note">{note}</p> : null}
        </div>
      </div>
    </div>
  );
}
