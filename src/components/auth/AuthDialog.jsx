import React, { useState, useRef } from "react";
import { BrandMark } from "../utilities/BrandMark.jsx";
import { Button } from "../buttons/Button.jsx";
import { Checkbox } from "../inputs/Checkbox.jsx";
import { Icon } from "../utilities/Icon.jsx";
import { Tabs } from "../display/Tabs.jsx";

// AuthDialog — sign in / register modal with localStorage-persisted session.
// The session hook is exposed as a static: AuthDialog.useAuth(). Copy text is
// overridable so each product can say what it gates ("编辑与导出你的脚本" etc).
// Built on the bundle's .ax-dialog + .ax-field; uses Tabs / Button / Checkbox.
const AX_AUTH_CSS = `
.am-modal { width: min(412px, calc(100vw - 40px)); position: relative; }
.am-x { position: absolute; top: 14px; right: 14px; z-index: 1; appearance: none; background: none; border: none;
  cursor: pointer; color: var(--text-faint); font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.02em;
  padding: 3px 5px; border-radius: var(--radius-1); transition: color var(--dur-1) var(--ease-out), background var(--dur-1) var(--ease-out); }
.am-x:hover { color: var(--text-body); background: var(--surface-raised); }
.am-body { padding: 30px 30px 26px; }
.am-brand { display: flex; align-items: center; gap: 9px; margin-bottom: 18px; }
.am-reason { display: flex; align-items: center; gap: 8px; margin-bottom: 18px; padding: 9px 11px;
  background: var(--surface-card); border: 1px solid var(--border-default); border-radius: var(--radius-2);
  font-size: var(--text-xs); color: var(--text-muted); line-height: var(--leading-snug); }
.am-reason svg { flex: none; color: var(--text-faint); }
.am-switch { margin-bottom: 20px; }
.am-head { margin-bottom: 20px; }
.am-title { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 500;
  letter-spacing: var(--tracking-tight); line-height: var(--leading-tight); color: var(--text-body); margin: 0 0 7px; }
.am-sub { font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-snug); margin: 0; }
.am-form { display: flex; flex-direction: column; }
.am-fields { display: flex; flex-direction: column; gap: 16px; }
.am-pwwrap { position: relative; display: block; }
.am-pwtoggle { position: absolute; top: 0; right: 0; height: 36px; width: 38px; display: flex;
  align-items: center; justify-content: center; background: none; border: none; cursor: pointer;
  color: var(--text-faint); border-radius: 0 var(--radius-2) var(--radius-2) 0; transition: color var(--dur-1) var(--ease-out); }
.am-pwtoggle:hover { color: var(--text-body); }
.am-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 16px; }
.am-link { appearance: none; border: none; background: none; padding: 0; cursor: pointer;
  font-family: var(--font-body); font-size: var(--text-sm); color: var(--text-muted);
  text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--border-strong);
  transition: color var(--dur-1) var(--ease-out), text-decoration-color var(--dur-1) var(--ease-out); }
.am-link:hover { color: var(--text-body); text-decoration-color: var(--text-faint); }
.am-link--mute { color: var(--text-muted); }
.am-note { margin: 12px 0 0; font-size: var(--text-xs); color: var(--text-faint); line-height: var(--leading-snug); }
.am-note strong { color: var(--text-muted); font-weight: 500; }
.am-submit { margin-top: 22px; }
.am-terms { margin: 14px 0 0; text-align: center; font-size: var(--text-xs); color: var(--text-faint); line-height: var(--leading-snug); }
.am-done { padding: 46px 30px 42px; display: flex; flex-direction: column; align-items: center; text-align: center; }
.am-donemark { width: 48px; height: 48px; border-radius: var(--radius-full); background: var(--ok-dim); color: var(--ok);
  display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.am-doneh { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 500;
  letter-spacing: var(--tracking-tight); color: var(--text-body); margin: 0 0 9px; }
.am-donep { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); letter-spacing: 0.02em;
  border: 1px solid var(--border-default); border-radius: var(--radius-2); padding: 7px 12px; margin: 0; }
.am-in { animation: am-in var(--dur-3) var(--ease-out) both; }
@keyframes am-in { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .am-in { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-auth-css")) {
  const s = document.createElement("style");
  s.id = "ax-auth-css";
  s.textContent = AX_AUTH_CSS;
  document.head.appendChild(s);
}

const AUTH_KEY = "agentaily.auth.v1";

// localStorage-persisted session hook (exposed as AuthDialog.useAuth)
function useAuth(storageKey = AUTH_KEY) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "null");
    } catch (e) {
      return null;
    }
  });
  const signIn = (email) => {
    const u = { email, name: email.split("@")[0], since: Date.now() };
    setUser(u);
    try {
      localStorage.setItem(storageKey, JSON.stringify(u));
    } catch (e) {}
  };
  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {}
  };
  return { user, signIn, signOut };
}

function AuthPwField({ label, value, onChange, error, placeholder, autoComplete, name }) {
  const [show, setShow] = useState(false);
  return (
    <label className="ax-field">
      <span className="ax-field__label">{label}</span>
      <span className="am-pwwrap">
        <input
          className={"ax-input" + (error ? " ax-input--error" : "")}
          type={show ? "text" : "password"}
          value={value}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{ paddingRight: 42 }}
        />
        <button
          type="button"
          className="am-pwtoggle"
          tabIndex={-1}
          aria-label={show ? "隐藏密码" : "显示密码"}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setShow((s) => !s)}
        >
          <Icon name={show ? "eyeOff" : "eye"} size={16} />
        </button>
      </span>
      {error ? <span className="ax-field__hint ax-field__hint--error">{error}</span> : null}
    </label>
  );
}

const DEFAULT_COPY = {
  login: { title: "欢迎回来", sub: "登录以继续。", cta: "登录", busy: "登录中…", okh: "登录成功" },
  register: {
    title: "创建账户",
    sub: "注册一个 Agentaily 账户开始创作。",
    cta: "创建账户",
    busy: "创建中…",
    okh: "账户已创建",
  },
};

export function AuthDialog({ open, reason, initialMode = "login", copy, onClose, onSuccess }) {
  const COPY = {
    login: { ...DEFAULT_COPY.login, ...(copy && copy.login) },
    register: { ...DEFAULT_COPY.register, ...(copy && copy.register) },
  };

  const [mode, setMode] = useState(initialMode);
  const [vals, setVals] = useState({ email: "", password: "", confirm: "" });
  const [errs, setErrs] = useState({});
  const [remember, setRemember] = useState(true);
  const [forgot, setForgot] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState(false);
  const busy = useRef(false);
  const lastOpen = useRef(false);

  if (open && !lastOpen.current) {
    lastOpen.current = true;
    setMode(initialMode);
    setVals({ email: "", password: "", confirm: "" });
    setErrs({});
    setForgot(false);
    setSubmitting(false);
    setOk(false);
    busy.current = false;
  }
  if (!open && lastOpen.current) lastOpen.current = false;
  if (!open) return null;

  const c = COPY[mode];
  const setField = (k, v) => {
    setVals((s) => ({ ...s, [k]: v }));
    if (errs[k])
      setErrs((e) => {
        const n = { ...e };
        delete n[k];
        return n;
      });
  };
  const switchMode = (m) => {
    if (m === mode || submitting || ok) return;
    setMode(m);
    setErrs({});
    setForgot(false);
  };
  const validate = () => {
    const e = {};
    const email = vals.email.trim();
    if (!email) e.email = "请输入邮箱";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = "邮箱格式不正确";
    if (!vals.password) e.password = "请输入密码";
    else if (vals.password.length < 8) e.password = "密码至少 8 位";
    if (mode === "register") {
      if (!vals.confirm) e.confirm = "请再次输入密码";
      else if (vals.confirm !== vals.password) e.confirm = "两次输入的密码不一致";
    }
    return e;
  };
  const submit = (ev) => {
    if (ev) ev.preventDefault();
    if (busy.current || ok) return;
    const e = validate();
    setErrs(e);
    if (Object.keys(e).length) return;
    const email = vals.email.trim();
    busy.current = true;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setOk(true);
      setTimeout(() => onSuccess && onSuccess(email), 720);
    }, 780);
  };

  return (
    <div className="ax-dialog-overlay" onClick={onClose}>
      <div
        className="ax-dialog am-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="am-x" onClick={onClose} aria-label="关闭">
          ESC ✕
        </button>

        {ok ? (
          <div className="am-body am-done">
            <span className="am-donemark">
              <Icon name="check" size={22} strokeWidth={2.2} />
            </span>
            <h2 className="am-doneh">{c.okh}</h2>
            <p className="am-donep">{vals.email.trim()}</p>
          </div>
        ) : (
          <div className="am-body">
            <div className="am-brand">
              <BrandMark size={20} wordmark blink={false} />
            </div>

            {reason ? (
              <div className="am-reason">
                <Icon name="lock" size={13} />
                <span>{reason}</span>
              </div>
            ) : null}

            <div className="am-switch">
              <Tabs
                items={[
                  { id: "login", label: "登录" },
                  { id: "register", label: "注册" },
                ]}
                active={mode}
                onChange={switchMode}
              />
            </div>

            <div className="am-head">
              <h2 className="am-title">{c.title}</h2>
              <p className="am-sub">{c.sub}</p>
            </div>

            <form className="am-form" onSubmit={submit} noValidate>
              <div className="am-fields">
                <label className="ax-field">
                  <span className="ax-field__label">邮箱</span>
                  <input
                    className={"ax-input" + (errs.email ? " ax-input--error" : "")}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@domain.com"
                    value={vals.email}
                    onChange={(e) => setField("email", e.target.value)}
                  />
                  {errs.email ? (
                    <span className="ax-field__hint ax-field__hint--error">{errs.email}</span>
                  ) : null}
                </label>

                <AuthPwField
                  label="密码"
                  name="password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  placeholder={mode === "login" ? "输入密码" : "至少 8 位"}
                  value={vals.password}
                  error={errs.password}
                  onChange={(v) => setField("password", v)}
                />

                {mode === "register" ? (
                  <div className="am-in">
                    <AuthPwField
                      label="确认密码"
                      name="confirm"
                      autoComplete="new-password"
                      placeholder="再次输入密码"
                      value={vals.confirm}
                      error={errs.confirm}
                      onChange={(v) => setField("confirm", v)}
                    />
                  </div>
                ) : null}
              </div>

              {mode === "login" ? (
                <div className="am-row">
                  <Checkbox
                    label="记住我"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <button type="button" className="am-link" onClick={() => setForgot(true)}>
                    忘记密码？
                  </button>
                </div>
              ) : null}
              {mode === "login" && forgot ? (
                <p className="am-note am-in">
                  重置链接将发送到你的邮箱
                  {vals.email.trim() ? (
                    <>
                      {" "}
                      · <strong>{vals.email.trim()}</strong>
                    </>
                  ) : (
                    <>，请先填写邮箱</>
                  )}
                  。
                </p>
              ) : null}

              <div className="am-submit">
                <Button
                  variant="primary"
                  size="lg"
                  full
                  type="submit"
                  disabled={submitting}
                  onClick={submit}
                >
                  {submitting ? c.busy : c.cta}
                </Button>
              </div>

              {mode === "register" ? (
                <p className="am-terms">
                  注册即代表你同意 <span className="am-link am-link--mute">服务条款</span> 与{" "}
                  <span className="am-link am-link--mute">隐私政策</span>。
                </p>
              ) : null}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// session hook, exposed off the capitalized component (mirrors Form.useForm)
AuthDialog.useAuth = useAuth;
