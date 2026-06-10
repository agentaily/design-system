import React, { useRef } from "react";

const AX_COMPOSER_CSS = `
.ax-composer {
  background: var(--surface-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-3);
  transition: border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-1) var(--ease-out);
}
.ax-composer:focus-within { border-color: var(--fg-2); box-shadow: 0 0 0 3px var(--focus-soft); }
.ax-composer__input {
  display: block; width: 100%; resize: none;
  background: transparent; border: none; outline: none;
  padding: 14px 16px 4px; min-height: 44px; max-height: 200px;
  color: var(--text-body); font-family: var(--font-body);
  font-size: var(--text-md); line-height: var(--leading-snug);
}
.ax-composer__input::placeholder { color: var(--text-faint); }
.ax-composer__row {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 8px 8px 16px;
}
.ax-composer__model {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-mono); font-size: var(--text-xs);
  letter-spacing: 0.04em; color: var(--text-faint);
  border: 1px solid var(--border-default); border-radius: var(--radius-1);
  padding: 3px 8px; background: transparent; cursor: pointer;
  transition: color var(--dur-1) var(--ease-out), border-color var(--dur-1) var(--ease-out);
}
.ax-composer__model:hover { color: var(--text-muted); border-color: var(--border-strong); }
.ax-composer__spacer { flex: 1; }
.ax-composer__send {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; flex: none; cursor: pointer;
  background: var(--accent); color: var(--accent-fg);
  border: none; border-radius: var(--radius-2);
  transition: background var(--dur-1) var(--ease-out), transform var(--dur-1) var(--ease-out);
}
.ax-composer__send:hover:not(:disabled) { background: var(--accent-hover); }
.ax-composer__send:active:not(:disabled) { transform: translateY(1px); }
.ax-composer__send:focus-visible { outline: none; box-shadow: var(--ring); }
.ax-composer__send:disabled { opacity: 0.3; cursor: not-allowed; }
.ax-composer__hint {
  font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-faint);
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-composer-css")) {
  const s = document.createElement("style");
  s.id = "ax-composer-css";
  s.textContent = AX_COMPOSER_CSS;
  document.head.appendChild(s);
}

const SendIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5"></path>
    <path d="M5 12l7-7 7 7"></path>
  </svg>
);

export function Composer({
  value,
  onChange,
  onSend,
  placeholder = "Message Agentaily…",
  model = "agentaily-2",
  onModelClick,
  disabled = false,
  className = "",
  ...rest
}) {
  const ref = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value && value.trim() && onSend) onSend();
    }
  };

  const autoGrow = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  };

  return (
    <div className={["ax-composer", className].filter(Boolean).join(" ")} {...rest}>
      <textarea
        ref={ref}
        className="ax-composer__input"
        rows={1}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => { autoGrow(); onChange && onChange(e.target.value); }}
        onKeyDown={handleKeyDown}
      ></textarea>
      <div className="ax-composer__row">
        <button type="button" className="ax-composer__model" onClick={onModelClick}>
          ▣ {model}
        </button>
        <span className="ax-composer__spacer"></span>
        <span className="ax-composer__hint">⏎ send</span>
        <button
          type="button"
          className="ax-composer__send"
          aria-label="Send"
          disabled={disabled || !value || !value.trim()}
          onClick={() => onSend && onSend()}
        >
          {SendIcon}
        </button>
      </div>
    </div>
  );
}
