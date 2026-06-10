import React, { useRef, useState } from "react";

const AX_OTP_CSS = `
.ax-otp { display: inline-flex; gap: 8px; }
.ax-otp__slot { width: 40px; height: 48px; text-align: center; background: var(--surface-card); border: 1px solid var(--border-strong); border-radius: var(--radius-2); color: var(--text-body); font-family: var(--font-mono); font-size: var(--text-xl); transition: border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-1) var(--ease-out); }
.ax-otp__slot:focus { outline: none; border-color: var(--fg-2); box-shadow: 0 0 0 3px var(--focus-soft); }
.ax-otp__slot--filled { border-color: var(--fg-2); }
.ax-otp__sep { display: flex; align-items: center; color: var(--text-faint); font-family: var(--font-mono); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-otp-css")) {
  const s = document.createElement("style");
  s.id = "ax-otp-css";
  s.textContent = AX_OTP_CSS;
  document.head.appendChild(s);
}

export function InputOTP({ length = 6, value = "", onChange, groupSize, className = "", ...rest }) {
  const refs = useRef([]);
  const chars = value.split("").slice(0, length);
  while (chars.length < length) chars.push("");

  const setChar = (i, ch) => {
    const next = chars.slice();
    next[i] = ch.slice(-1);
    const joined = next.join("").slice(0, length);
    onChange && onChange(joined);
    if (ch && i < length - 1) refs.current[i + 1] && refs.current[i + 1].focus();
  };
  const onKeyDown = (i, e) => {
    if (e.key === "Backspace" && !chars[i] && i > 0) refs.current[i - 1] && refs.current[i - 1].focus();
  };

  return (
    <div className={["ax-otp", className].filter(Boolean).join(" ")} {...rest}>
      {chars.map((c, i) => (
        <React.Fragment key={i}>
          <input
            ref={(el) => (refs.current[i] = el)}
            className={"ax-otp__slot" + (c ? " ax-otp__slot--filled" : "")}
            inputMode="numeric"
            maxLength={1}
            value={c}
            onChange={(e) => setChar(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
          />
          {groupSize && (i + 1) % groupSize === 0 && i < length - 1 ? <span className="ax-otp__sep">·</span> : null}
        </React.Fragment>
      ))}
    </div>
  );
}
