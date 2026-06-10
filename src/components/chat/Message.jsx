import React from "react";

const AX_MSG_CSS = `
.ax-msg { display: flex; flex-direction: column; }
.ax-msg--user { align-items: flex-end; }
.ax-msg--user .ax-msg__body {
  max-width: 78%;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-3);
  padding: 10px 14px;
}
.ax-msg--assistant { align-items: stretch; }
.ax-msg__head { display: flex; align-items: baseline; gap: 8px; margin-bottom: 6px; }
.ax-msg__name {
  font-family: var(--font-mono); font-size: var(--text-xs);
  font-weight: var(--weight-medium); letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--text-faint);
}
.ax-msg__time { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-faint); opacity: 0.7; }
.ax-msg__body { font-size: var(--text-md); line-height: var(--leading-body); color: var(--text-body); min-width: 0; }
.ax-msg__body > p { margin: 0 0 0.7em; }
.ax-msg__body > p:last-child { margin-bottom: 0; }
.ax-msg__cursor {
  display: inline-block; width: 0.55em; height: 1.05em;
  background: currentColor; vertical-align: text-bottom; margin-left: 2px;
  animation: ax-msg-blink 1.1s steps(1) infinite;
}
@keyframes ax-msg-blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .ax-msg__cursor { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-msg-css")) {
  const s = document.createElement("style");
  s.id = "ax-msg-css";
  s.textContent = AX_MSG_CSS;
  document.head.appendChild(s);
}

export function Message({
  role = "assistant",
  name,
  time,
  streaming = false,
  children,
  className = "",
  ...rest
}) {
  const isUser = role === "user";
  const cls = ["ax-msg", isUser ? "ax-msg--user" : "ax-msg--assistant", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      {!isUser ? (
        <div className="ax-msg__head">
          <span className="ax-msg__name">{name || "Agentaily"}</span>
          {time ? <span className="ax-msg__time">{time}</span> : null}
        </div>
      ) : null}
      <div className="ax-msg__body">
        {children}
        {streaming ? <span className="ax-msg__cursor"></span> : null}
      </div>
    </div>
  );
}
