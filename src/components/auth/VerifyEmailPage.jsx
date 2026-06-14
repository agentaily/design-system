import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "../buttons/Button.jsx";
import { Icon } from "../utilities/Icon.jsx";
import { BrandMark } from "../utilities/BrandMark.jsx";
import { RotatingTagline } from "../utilities/RotatingTagline.jsx";
import { Spinner } from "../feedback/Spinner.jsx";

// VerifyEmailPage — the full-page email-verification shell, the symmetric sibling
// of SignInPage (same split brand panel + centered card). It owns ONLY the flow
// and the verifying → ok / error state machine; it never validates the token,
// writes a session, or navigates. Real validation, persistence, the success
// toast, and the (open-redirect-guarded) redirect decision all stay in the
// product (L5). The product injects two promise-returning effects —
// verifyToken() and onResend() — and passes display inputs (email, returnTo,
// noRedirect, resendCooldown, copy). Hard rules baked in: the error state never
// auto-redirects; success can count down to a return (noRedirect turns it off);
// resend is cooldown-gated, idempotent, and confirms in place; resend ≠ verified.
const AX_VERIFY_CSS = `
.ax-verify { display: grid; grid-template-columns: 1fr 1fr; height: 100%; background: var(--surface-page); }
.ax-verify__brand { position: relative; border-right: 1px solid var(--border-default); background: var(--surface-panel);
  background-image: var(--dot-grid); background-size: 24px 24px; padding: 40px; display: flex; flex-direction: column; }
.ax-verify__brandtop { display: flex; align-items: center; gap: 10px; }
.ax-verify__mid { margin-top: auto; margin-bottom: auto; }
.ax-verify__quote { font-family: var(--font-display); white-space: nowrap; font-size: clamp(40px, 4.4vw, var(--text-hero)); font-weight: var(--weight-medium); line-height: var(--leading-tight); letter-spacing: var(--tracking-tight); color: var(--text-body); margin: 0; }
.ax-verify__by { margin: 16px 0 0; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; color: var(--text-faint); }
.ax-verify__form { display: flex; align-items: center; justify-content: center; padding: 40px; }
.ax-verify__card { width: 100%; max-width: 384px; }
.ax-verify__mbrand { display: none; }

.ax-verify__state { display: flex; flex-direction: column; align-items: center; text-align: center; }
.ax-verify__mark { position: relative; width: 56px; height: 56px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; margin-bottom: 22px; }
.ax-verify__mark--pending { background: var(--surface-card); border: 1px solid var(--border-default); color: var(--text-muted); }
.ax-verify__mark--ok { background: var(--ok-dim); color: var(--ok); }
.ax-verify__mark--error { background: var(--danger-dim); color: var(--danger); }
.ax-verify__ring { position: absolute; inset: -7px; border-radius: var(--radius-full); border: 2px solid transparent; border-top-color: var(--text-muted); animation: axv-spin 0.9s linear infinite; }
@keyframes axv-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .ax-verify__ring { animation-duration: 2.4s; } }

.ax-verify__h { margin: 0; font-family: var(--font-display); font-size: var(--text-2xl); font-weight: var(--weight-bold); letter-spacing: var(--tracking-tight); color: var(--text-body); }
.ax-verify__sub { margin: 9px 0 0; font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-snug); max-width: 320px; }
.ax-verify__email { margin: 16px 0 0; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); letter-spacing: 0.02em; border: 1px solid var(--border-default); border-radius: var(--radius-2); padding: 7px 12px; background: var(--surface-card); }

.ax-verify__actions { width: 100%; margin-top: 28px; display: flex; flex-direction: column; gap: 12px; }
.ax-verify__hint { margin: 0; font-size: var(--text-xs); color: var(--text-faint); line-height: var(--leading-snug); }
.ax-verify__hint b { color: var(--text-muted); font-weight: var(--weight-medium); font-variant-numeric: tabular-nums; }
.ax-verify__link { background: none; border: none; cursor: pointer; font-family: inherit; font-size: var(--text-xs); color: var(--text-muted); text-decoration: underline; text-underline-offset: 2px; padding: 2px; }
.ax-verify__link:hover { color: var(--text-body); }

.ax-verify__resend { display: flex; align-items: center; justify-content: center; gap: 9px; width: 100%; height: 40px; border: 1px solid var(--border-default);
  border-radius: var(--radius-2); background: var(--surface-card); color: var(--text-body); font-family: inherit; font-size: var(--text-sm); cursor: pointer;
  transition: border-color var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out); }
.ax-verify__resend:hover:not(:disabled) { border-color: var(--border-strong); }
.ax-verify__resend:disabled { color: var(--text-faint); cursor: default; }
.ax-verify__resend .ax-spinner { border-top-color: var(--text-body); }

.ax-verify__confirm { display: flex; align-items: flex-start; gap: 8px; margin: 0; padding: 10px 12px; border: 1px solid var(--border-default); border-radius: var(--radius-2);
  background: var(--surface-card); font-size: var(--text-xs); color: var(--text-muted); line-height: var(--leading-snug); text-align: left; }
.ax-verify__confirm svg { flex: none; margin-top: 1px; }
.ax-verify__confirm--ok svg { color: var(--ok); }
.ax-verify__confirm--err { border-color: var(--danger); background: var(--danger-dim); color: var(--danger); }
.ax-verify__confirm em { display: block; margin-top: 4px; color: var(--text-faint); font-style: normal; }

@media (max-width: 860px) {
  .ax-verify { grid-template-columns: 1fr; }
  .ax-verify__brand { display: none; }
  .ax-verify__form { padding: 56px 32px; }
  .ax-verify__mbrand { display: flex; justify-content: center; margin-bottom: 36px; }
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-verify-css")) {
  const s = document.createElement("style");
  s.id = "ax-verify-css";
  s.textContent = AX_VERIFY_CSS;
  document.head.appendChild(s);
}

// Every user-facing string lives here so nothing is hardcoded in the markup.
// Defaults are a self-consistent English baseline; pass `copy` (any subset,
// shallow-merged per group) to localize — e.g. a full zh-CN object.
const DEFAULT_COPY = {
  verifying: { title: "Verifying your email", subtitle: "Hang tight — this only takes a moment." },
  ok: {
    title: "Email verified",
    subtitle: "Your address is confirmed. You're all set.",
    continue: "Continue",
    continueNow: "Continue now",
    // {seconds} and {target} are interpolated
    redirectHint: "Returning to {target} in {seconds}s…",
    cancelRedirect: "Stay on this page",
  },
  error: {
    title: "Verification failed",
    subtitle: "This link may have expired or already been used.",
    retry: "Try again",
    backToSignIn: "Back to sign in",
  },
  resend: {
    cta: "Resend verification email",
    sending: "Sending…",
    cooldown: "Resend in {seconds}s",
    sent: "Verification email sent — check your inbox.",
    error: "Couldn’t send the email. Please try again.",
    notVerified: "Resending only sends a new link — you still need to open it to finish verifying.",
  },
  target: "your destination",
};

// Interpolate {key} placeholders. Returns an array so a value can be a React
// node (e.g. a bold <b> seconds count) — String.replace would stringify a node
// to "[object Object]". Unmatched placeholders fall back to their literal text.
const fmt = (str, vars) => {
  const s = String(str);
  const out = [];
  const re = /\{(\w+)\}/g;
  let last = 0,
    m;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) out.push(s.slice(last, m.index));
    out.push(vars[m[1]] != null ? vars[m[1]] : m[0]);
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push(s.slice(last));
  return out;
};

// Headless flow runner — exposed as VerifyEmailPage.useVerify. Drives a token
// check into a verifying → ok / error machine. A network/throw becomes `error`
// (never a silent hang). `retry` re-runs the check; a runId guards against a
// stale resolve landing after a newer retry.
function useVerify({ verifyToken, autoStart = true } = {}) {
  const [status, setStatus] = useState("verifying");
  const [error, setError] = useState(null);
  const runId = useRef(0);

  const run = useCallback(() => {
    if (typeof verifyToken !== "function") return;
    const id = ++runId.current;
    setStatus("verifying");
    setError(null);
    Promise.resolve()
      .then(() => verifyToken())
      .then(() => {
        if (runId.current === id) setStatus("ok");
      })
      .catch((e) => {
        if (runId.current === id) {
          setError(e || new Error("verify_failed"));
          setStatus("error");
        }
      });
  }, [verifyToken]);

  useEffect(() => {
    if (autoStart) run();
    // run once on mount; retry() is the explicit re-entry point
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, error, retry: run };
}

export function VerifyEmailPage({
  // Controlled machine — pass to drive the state yourself (omit to let the
  // injected verifyToken run the built-in machine).
  status: statusProp,
  error: errorProp,
  // Injected effect (uncontrolled): a promise-returning token check.
  verifyToken,
  // Display + behavior inputs
  email,
  returnTo,
  noRedirect = false,
  redirectDelay = 5,
  resendCooldown = 30,
  // Injected effects + product-owned decisions
  onResend,
  onContinue,
  onRetry,
  onBackToSignIn,
  // Chrome / copy
  brand,
  tagline,
  copy,
  showBrandPanel = true,
}) {
  const controlled = statusProp !== undefined;
  const machine = useVerify({ verifyToken, autoStart: !controlled });
  const status = controlled ? statusProp : machine.status;
  const errObj = controlled ? errorProp : machine.error;
  const retry = onRetry || (controlled ? undefined : machine.retry);

  const c = {
    verifying: { ...DEFAULT_COPY.verifying, ...(copy && copy.verifying) },
    ok: { ...DEFAULT_COPY.ok, ...(copy && copy.ok) },
    error: { ...DEFAULT_COPY.error, ...(copy && copy.error) },
    resend: { ...DEFAULT_COPY.resend, ...(copy && copy.resend) },
    target: (copy && copy.target) || DEFAULT_COPY.target,
  };
  const taglineProps = { breakAfterPrefix: true, ...tagline };

  const errorMessage =
    typeof errObj === "string" ? errObj : (errObj && errObj.message) || c.error.subtitle;
  const targetLabel =
    returnTo == null ? null : typeof returnTo === "string" ? returnTo : returnTo.label || c.target;

  // ── success countdown ────────────────────────────────────────────────
  const [secondsLeft, setSecondsLeft] = useState(redirectDelay);
  const [cancelled, setCancelled] = useState(false);
  const firedRef = useRef(false);
  const redirecting = status === "ok" && !noRedirect && targetLabel != null && !cancelled;

  useEffect(() => {
    if (status === "ok") {
      setSecondsLeft(redirectDelay);
      setCancelled(false);
      firedRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (!redirecting) return undefined;
    if (secondsLeft <= 0) {
      if (!firedRef.current) {
        firedRef.current = true;
        onContinue && onContinue(returnTo);
      }
      return undefined;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [redirecting, secondsLeft, onContinue, returnTo]);

  // ── resend (cooldown-gated, idempotent, confirms in place) ────────────
  const [resendState, setResendState] = useState("idle"); // idle | sending | sent | error
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const resendBusy = useRef(false);

  const doResend = () => {
    if (resendBusy.current || cooldownLeft > 0 || typeof onResend !== "function") return;
    resendBusy.current = true;
    setResendState("sending");
    Promise.resolve()
      .then(() => onResend(email))
      .then(() => {
        setResendState("sent");
        setCooldownLeft(resendCooldown);
      })
      .catch(() => {
        setResendState("error");
      })
      .finally(() => {
        resendBusy.current = false;
      });
  };

  useEffect(() => {
    if (cooldownLeft <= 0) return undefined;
    const t = setTimeout(() => setCooldownLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldownLeft]);

  const resendDisabled =
    resendState === "sending" || cooldownLeft > 0 || typeof onResend !== "function";
  let resendInner;
  if (resendState === "sending")
    resendInner = (
      <React.Fragment>
        <Spinner size="sm" />
        {c.resend.sending}
      </React.Fragment>
    );
  else if (cooldownLeft > 0) resendInner = fmt(c.resend.cooldown, { seconds: cooldownLeft });
  else
    resendInner = (
      <React.Fragment>
        <Icon name="refresh" size={15} />
        {c.resend.cta}
      </React.Fragment>
    );

  // ── state bodies ──────────────────────────────────────────────────────
  const emailNode = email ? <p className="ax-verify__email">{email}</p> : null;

  let body;
  if (status === "ok") {
    body = (
      <div className="ax-verify__state">
        <span className="ax-verify__mark ax-verify__mark--ok">
          <Icon name="check" size={24} strokeWidth={2.2} />
        </span>
        <h1 className="ax-verify__h">{c.ok.title}</h1>
        <p className="ax-verify__sub">{c.ok.subtitle}</p>
        {emailNode}
        <div className="ax-verify__actions">
          {redirecting ? (
            <React.Fragment>
              <Button
                variant="primary"
                full
                onClick={() => {
                  firedRef.current = true;
                  onContinue && onContinue(returnTo);
                }}
                icon={<Icon name="arrow" size={15} />}
              >
                {c.ok.continueNow}
              </Button>
              <p className="ax-verify__hint">
                {fmt(c.ok.redirectHint, {
                  target: targetLabel,
                  seconds: <b key="s">{secondsLeft}</b>,
                })}
              </p>
              <button type="button" className="ax-verify__link" onClick={() => setCancelled(true)}>
                {c.ok.cancelRedirect}
              </button>
            </React.Fragment>
          ) : (
            <Button
              variant="primary"
              full
              onClick={() => onContinue && onContinue(returnTo)}
              icon={<Icon name="arrow" size={15} />}
            >
              {c.ok.continue}
            </Button>
          )}
        </div>
      </div>
    );
  } else if (status === "error") {
    body = (
      <div className="ax-verify__state">
        <span className="ax-verify__mark ax-verify__mark--error">
          <Icon name="warn" size={22} />
        </span>
        <h1 className="ax-verify__h">{c.error.title}</h1>
        <p className="ax-verify__sub">{errorMessage}</p>
        {emailNode}
        <div className="ax-verify__actions">
          {onResend ? (
            <button
              type="button"
              className="ax-verify__resend"
              onClick={doResend}
              disabled={resendDisabled}
            >
              {resendInner}
            </button>
          ) : null}
          {resendState === "sent" ? (
            <p className="ax-verify__confirm ax-verify__confirm--ok">
              <Icon name="check" size={14} />
              <span>
                {c.resend.sent}
                <em>{c.resend.notVerified}</em>
              </span>
            </p>
          ) : resendState === "error" ? (
            <p className="ax-verify__confirm ax-verify__confirm--err">
              <Icon name="warn" size={14} />
              <span>{c.resend.error}</span>
            </p>
          ) : null}
          <div
            className="ax-verify__actions"
            style={{ marginTop: 2, gap: 10, flexDirection: "row", justifyContent: "center" }}
          >
            {retry ? (
              <button type="button" className="ax-verify__link" onClick={retry}>
                {c.error.retry}
              </button>
            ) : null}
            {onBackToSignIn ? (
              <button type="button" className="ax-verify__link" onClick={onBackToSignIn}>
                {c.error.backToSignIn}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    body = (
      <div className="ax-verify__state">
        <span className="ax-verify__mark ax-verify__mark--pending">
          <span className="ax-verify__ring" aria-hidden="true"></span>
          <Icon name="mail" size={22} />
        </span>
        <h1 className="ax-verify__h">{c.verifying.title}</h1>
        <p className="ax-verify__sub">{c.verifying.subtitle}</p>
        {emailNode}
      </div>
    );
  }

  return (
    <div className="ax-verify">
      {showBrandPanel ? (
        <aside className="ax-verify__brand">
          <div className="ax-verify__brandtop">
            {brand || <BrandMark size={24} wordmark blink={false} />}
          </div>
          <div className="ax-verify__mid">
            <p className="ax-verify__quote">
              <RotatingTagline {...taglineProps} />
            </p>
            <p className="ax-verify__by">— AGENTAILY</p>
          </div>
        </aside>
      ) : null}

      <main className="ax-verify__form">
        <div className="ax-verify__card">
          <div className="ax-verify__mbrand">
            {brand || <BrandMark size={22} wordmark blink={false} />}
          </div>
          {body}
        </div>
      </main>
    </div>
  );
}

// headless flow hook, exposed off the capitalized component (mirrors AuthDialog.useAuth)
VerifyEmailPage.useVerify = useVerify;
