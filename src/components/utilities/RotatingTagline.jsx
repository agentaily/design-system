import React, { useState, useEffect } from "react";

// RotatingTagline — the brand's signature animated headline: a fixed prefix
// followed by a phrase that types in, holds, deletes, and advances to the next.
// The rotating phrase wears the flowing geek-rainbow gradient; a block cursor
// trails the text and blinks only while at rest. Used in the auth brand panel
// and the marketing hero. Respects prefers-reduced-motion (whole-phrase swap,
// no gradient flow). Font size / weight are inherited from the parent — size it
// by styling the container, not this component.
const AX_RTAG_CSS = `
.ax-rtag { display: inline; color: var(--text-body); }
.ax-rtag__prefix { color: var(--text-body); }
.ax-rtag__verb { color: var(--text-body); }
.ax-rtag__grad {
  background: linear-gradient(95deg, #F2806B 0%, #E9B24F 18%, #6FB66A 36%, #4DB6AE 54%, #5B8DEF 72%, #9B7BEA 86%, #F2806B 100%);
  background-size: 220% 100%;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent;
  animation: ax-rtag-flow var(--ax-rtag-flow, 1.2s) linear infinite;
}
.ax-rtag__cursor {
  display: inline-block; width: 0.5em; height: 0.84em; background: var(--text-body);
  vertical-align: -0.02em; margin-left: 0.04em;
}
.ax-rtag__cursor.is-blink { animation: ax-rtag-blink 1.1s steps(1) infinite; }
@keyframes ax-rtag-flow { to { background-position: 220% 0; } }
@keyframes ax-rtag-blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .ax-rtag__grad { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-rtag-css")) {
  const s = document.createElement("style");
  s.id = "ax-rtag-css";
  s.textContent = AX_RTAG_CSS;
  document.head.appendChild(s);
}

export function RotatingTagline({
  prefix = "聊天，",
  phrases = ["构建万物", "生成万物", "设计万物", "学习万物"],
  gradient = true,
  cursor = true,
  breakAfterPrefix = false,
  typeSpeed = 140,
  deleteSpeed = 70,
  hold = 1700,
  flowDuration = "1.2s",
  className = "",
  ...rest
}) {
  const list = phrases && phrases.length ? phrases : [""];
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [wi, setWi] = useState(0);
  const [txt, setTxt] = useState(list[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => setWi((w) => (w + 1) % list.length), hold + 700);
      return () => clearTimeout(t);
    }
    const word = list[wi % list.length];
    let t;
    if (!deleting && txt === word) {
      t = setTimeout(() => setDeleting(true), hold);
    } else if (deleting && txt === "") {
      setDeleting(false);
      setWi((w) => (w + 1) % list.length);
    } else {
      const next = deleting ? word.slice(0, txt.length - 1) : word.slice(0, txt.length + 1);
      t = setTimeout(() => setTxt(next), deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(t);
  }, [txt, deleting, wi, reduced, hold, typeSpeed, deleteSpeed]);

  useEffect(() => {
    if (reduced) setTxt(list[wi % list.length]);
  }, [wi, reduced]);

  const atRest = reduced || (!deleting && txt === list[wi % list.length]);
  const verbCls = ["ax-rtag__verb", gradient ? "ax-rtag__grad" : ""].filter(Boolean).join(" ");

  return (
    <span
      className={["ax-rtag", className].filter(Boolean).join(" ")}
      style={{ "--ax-rtag-flow": flowDuration }}
      {...rest}
    >
      {prefix ? (
        <span className="ax-rtag__prefix">
          {prefix}
          {breakAfterPrefix ? <br /> : null}
        </span>
      ) : null}
      <span className={verbCls}>{txt}</span>
      {cursor ? (
        <i className={"ax-rtag__cursor" + (atRest ? " is-blink" : "")} aria-hidden="true"></i>
      ) : null}
    </span>
  );
}
