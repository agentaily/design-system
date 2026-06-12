import React, { useState } from "react";
import { BrandMark } from "../utilities/BrandMark.jsx";
import { Button } from "../buttons/Button.jsx";
import { Icon } from "../utilities/Icon.jsx";
import { Input } from "../inputs/Input.jsx";

// SignInPage — full-page auth: a split brand panel (dot-grid + quote) beside a
// centered card. One component, two modes (signin / signup) — the brand panel,
// SSO, and card chrome are shared; only the fields, copy, and footer differ.
// The footer link flips mode (and fires onModeChange so a router can swap the
// URL). The full-page sibling of AuthDialog (the modal); same login/register idea.
const AX_SIGNIN_CSS = `
.ax-signin { display: grid; grid-template-columns: 1fr 1fr; height: 100%; background: var(--surface-page); }
.ax-signin__brand { position: relative; border-right: 1px solid var(--border-default); background: var(--surface-panel);
  background-image: var(--dot-grid); background-size: 24px 24px; padding: 40px; display: flex; flex-direction: column; }
.ax-signin__brandtop { display: flex; align-items: center; gap: 10px; }
.ax-signin__mid { margin-top: auto; margin-bottom: auto; max-width: 22ch; }
.ax-signin__quote { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: var(--weight-medium); line-height: var(--leading-tight); letter-spacing: var(--tracking-tight); color: var(--text-body); margin: 0; }
.ax-signin__by { margin: 16px 0 0; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; color: var(--text-faint); }
.ax-signin__form { display: flex; align-items: center; justify-content: center; padding: 40px; }
.ax-signin__card { width: 100%; max-width: 360px; }
.ax-signin__mbrand { display: none; }
.ax-signin__h { margin: 0; font-family: var(--font-display); font-size: var(--text-2xl); font-weight: var(--weight-bold); letter-spacing: var(--tracking-tight); color: var(--text-body); }
.ax-signin__sub { margin: 8px 0 28px; font-size: var(--text-sm); color: var(--text-muted); }
.ax-signin__fields { display: flex; flex-direction: column; gap: 16px; }
.ax-signin__row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 7px; }
.ax-signin__link { font-size: 12px; color: var(--text-muted); text-decoration: none; background: none; border: none; cursor: pointer; font-family: inherit; }
.ax-signin__link:hover { color: var(--text-body); }
.ax-signin__submit { margin-top: 22px; }
.ax-signin__or { display: flex; align-items: center; gap: 12px; margin: 22px 0; }
.ax-signin__or::before, .ax-signin__or::after { content: ""; flex: 1; height: 1px; background: var(--border-default); }
.ax-signin__or span { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; color: var(--text-faint); }
.ax-signin__sso { display: flex; align-items: center; justify-content: center; gap: 9px; width: 100%; height: 40px; border: 1px solid var(--border-default);
  border-radius: var(--radius-2); background: var(--surface-card); color: var(--text-body); font-family: inherit; font-size: var(--text-sm); cursor: pointer; transition: border-color var(--dur-1) var(--ease-out); }
.ax-signin__sso:hover { border-color: var(--border-strong); }
.ax-signin__terms { margin: 16px 0 0; font-size: var(--text-xs); color: var(--text-faint); line-height: var(--leading-snug); text-align: center; }
.ax-signin__terms a, .ax-signin__terms span.lk { color: var(--text-muted); text-decoration: underline; text-underline-offset: 2px; cursor: pointer; }
.ax-signin__foot { margin-top: 26px; text-align: center; font-size: var(--text-sm); color: var(--text-muted); }
.ax-signin__footlink { color: var(--text-body); background: none; border: none; cursor: pointer; font-family: inherit; font-size: var(--text-sm);
  border-bottom: 1px solid var(--border-strong); padding: 0 0 1px; transition: border-color var(--dur-1) var(--ease-out); }
.ax-signin__footlink:hover { border-color: var(--text-faint); }
@media (max-width: 860px) { .ax-signin { grid-template-columns: 1fr; } .ax-signin__brand { display: none; } .ax-signin__mbrand { display: flex; margin-bottom: 26px; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-signin-css")) {
  const s = document.createElement("style");
  s.id = "ax-signin-css";
  s.textContent = AX_SIGNIN_CSS;
  document.head.appendChild(s);
}

const DEFAULT_COPY = {
  signin: {
    title: "Sign in",
    subtitle: "Welcome back. Use your work email to continue.",
    submit: "Continue",
    switchText: "No account?",
    switchCta: "Create one",
  },
  signup: {
    title: "Create account",
    subtitle: "Start with your work email — it takes a minute.",
    submit: "Create account",
    switchText: "Already have an account?",
    switchCta: "Sign in",
  },
};

export function SignInPage({
  mode,
  defaultMode = "signin",
  onModeChange,
  brand,
  copy,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onForgot,
  ssoLabel = "Continue with SSO",
  onSSO,
  terms,
  footer,
  showBrandPanel = true,
}) {
  const [modeI, setModeI] = useState(defaultMode);
  const m = mode !== undefined ? mode : modeI;
  const isSignup = m === "signup";
  const c = { ...DEFAULT_COPY[m], ...(copy && copy[m]) };

  const [emailI, setEmailI] = useState("");
  const [pwI, setPwI] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errs, setErrs] = useState({});
  const emailV = email !== undefined ? email : emailI;
  const pwV = password !== undefined ? password : pwI;
  const setEmail = (v) => {
    if (onEmailChange) onEmailChange(v);
    else setEmailI(v);
    if (errs.email) setErrs((e) => ({ ...e, email: undefined }));
  };
  const setPw = (v) => {
    if (onPasswordChange) onPasswordChange(v);
    else setPwI(v);
    if (errs.password) setErrs((e) => ({ ...e, password: undefined }));
  };
  const setConf = (v) => {
    setConfirm(v);
    if (errs.confirm) setErrs((e) => ({ ...e, confirm: undefined }));
  };

  const switchMode = () => {
    const next = isSignup ? "signin" : "signup";
    setErrs({});
    setConfirm("");
    if (onModeChange) onModeChange(next);
    if (mode === undefined) setModeI(next);
  };

  const validate = () => {
    const e = {};
    const em = (emailV || "").trim();
    if (!em) e.email = "请输入邮箱";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) e.email = "邮箱格式不正确";
    if (!pwV) e.password = "请输入密码";
    else if (isSignup && pwV.length < 8) e.password = "密码至少 8 位";
    if (isSignup) {
      if (!confirm) e.confirm = "请再次输入密码";
      else if (confirm !== pwV) e.confirm = "两次输入的密码不一致";
    }
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrs(e);
    if (Object.keys(e).some((k) => e[k])) return;
    onSubmit && onSubmit({ mode: m, email: (emailV || "").trim(), password: pwV });
  };

  const termsNode =
    terms !== undefined ? (
      terms
    ) : (
      <>
        注册即代表你同意 <span className="lk">服务条款</span> 与{" "}
        <span className="lk">隐私政策</span>。
      </>
    );

  return (
    <div className="ax-signin">
      {showBrandPanel ? (
        <aside className="ax-signin__brand">
          <div className="ax-signin__brandtop">{brand || <BrandMark size={24} wordmark />}</div>
          <div className="ax-signin__mid">
            <p className="ax-signin__quote">
              聊天，
              <br />
              构建万物
            </p>
            <p className="ax-signin__by">— AGENTAILY</p>
          </div>
        </aside>
      ) : null}

      <main className="ax-signin__form">
        <form className="ax-signin__card" onSubmit={submit} noValidate>
          <div className="ax-signin__mbrand">{brand || <BrandMark size={22} wordmark />}</div>
          <h1 className="ax-signin__h">{c.title}</h1>
          <p className="ax-signin__sub">{c.subtitle}</p>

          <div className="ax-signin__fields">
            <Input
              label="EMAIL"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={emailV}
              error={errs.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <div className="ax-signin__row">
                <span className="ax-label">PASSWORD</span>
                {!isSignup && onForgot ? (
                  <button type="button" className="ax-signin__link" onClick={onForgot}>
                    Forgot?
                  </button>
                ) : null}
              </div>
              <Input
                type="password"
                autoComplete={isSignup ? "new-password" : "current-password"}
                placeholder={isSignup ? "至少 8 位" : "••••••••"}
                value={pwV}
                error={errs.password}
                onChange={(e) => setPw(e.target.value)}
              />
            </div>
            {isSignup ? (
              <Input
                label="CONFIRM PASSWORD"
                type="password"
                autoComplete="new-password"
                placeholder="再次输入密码"
                value={confirm}
                error={errs.confirm}
                onChange={(e) => setConf(e.target.value)}
              />
            ) : null}
          </div>

          <div className="ax-signin__submit">
            <Button variant="primary" full type="submit" icon={<Icon name="arrow" size={15} />}>
              {c.submit}
            </Button>
          </div>

          {isSignup ? <p className="ax-signin__terms">{termsNode}</p> : null}

          {onSSO ? (
            <React.Fragment>
              <div className="ax-signin__or">
                <span>OR</span>
              </div>
              <button type="button" className="ax-signin__sso" onClick={onSSO}>
                <Icon name="shield" size={15} />
                {ssoLabel}
              </button>
            </React.Fragment>
          ) : null}

          {footer !== undefined ? (
            footer ? (
              <p className="ax-signin__foot">{footer}</p>
            ) : null
          ) : (
            <p className="ax-signin__foot">
              {c.switchText}{" "}
              <button type="button" className="ax-signin__footlink" onClick={switchMode}>
                {c.switchCta}
              </button>
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
