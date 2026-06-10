import React, { useRef, useEffect } from "react";

const AX_CONVO_CSS = `
.ax-convo { position: relative; overflow-y: auto; display: flex; flex-direction: column; }
.ax-convo__inner { max-width: var(--thread-max); width: 100%; margin: 0 auto; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
.ax-convo__stick {
  position: sticky; bottom: 12px; align-self: center; margin-top: -36px;
  display: inline-flex; align-items: center; gap: 6px; cursor: pointer;
  background: var(--surface-panel); border: 1px solid var(--border-strong);
  border-radius: var(--radius-full); padding: 6px 12px; box-shadow: var(--shadow-2);
  font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted);
  transition: opacity var(--dur-2) var(--ease-out);
}
.ax-convo__stick:hover { color: var(--text-body); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-convo-css")) {
  const s = document.createElement("style");
  s.id = "ax-convo-css";
  s.textContent = AX_CONVO_CSS;
  document.head.appendChild(s);
}

export function Conversation({ children, autoStick = true, className = "", style = {}, ...rest }) {
  const ref = useRef(null);
  const stickRef = useRef(true);
  const [showJump, setShowJump] = React.useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
      stickRef.current = dist < 80;
      setShowJump(dist >= 80);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (el && autoStick && stickRef.current) el.scrollTop = el.scrollHeight;
  });

  const jump = () => {
    const el = ref.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className={["ax-convo", className].filter(Boolean).join(" ")} ref={ref} style={style} {...rest}>
      <div className="ax-convo__inner">{children}</div>
      {showJump ? (
        <button className="ax-convo__stick" onClick={jump}>↓ Jump to latest</button>
      ) : null}
    </div>
  );
}
