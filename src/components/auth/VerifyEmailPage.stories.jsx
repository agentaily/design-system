import React from "react";
import { VerifyEmailPage } from "./VerifyEmailPage.jsx";

export default {
  title: "Auth/VerifyEmailPage",
  component: VerifyEmailPage,
  parameters: { layout: "fullscreen" },
};

// Promise helpers for the injected effects — resolve/reject after a beat so the
// stories show real async transitions (verifying spinner, resend in-flight).
const resolveAfter = (ms) => () => new Promise((r) => setTimeout(r, ms));
const rejectAfter = (ms, msg) => () =>
  new Promise((_, rej) => setTimeout(() => rej(new Error(msg)), ms));

// Controlled wrapper: a demo-only status switcher lives OUTSIDE the component
// (mirrors the handoff card). The component itself never renders a switcher —
// products run it uncontrolled via `verifyToken`.
function ControlledDemo({ initial = "verifying", ...props }) {
  const [status, setStatus] = React.useState(initial);
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: 6,
          padding: 4,
          borderRadius: 8,
          background: "var(--surface-card)",
          border: "1px solid var(--border-default)",
        }}
      >
        {["verifying", "ok", "error"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              background: status === s ? "var(--text-body)" : "transparent",
              color: status === s ? "var(--surface-card)" : "var(--text-muted)",
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <VerifyEmailPage
        status={status}
        email="lin@agentaily.dev"
        returnTo={{ label: "your workspace", href: "/app" }}
        onResend={resolveAfter(700)}
        onContinue={() => {}}
        onRetry={() => setStatus("verifying")}
        onBackToSignIn={() => {}}
        {...props}
      />
    </div>
  );
}

// Controlled — flip `status` from outside to walk all three states. The success
// state counts down (redirectDelay, default 5s); error offers resend + retry.
export const Controlled = { render: () => <ControlledDemo /> };

// verifying — spinner ring + mail mark while verifyToken() is pending.
export const Verifying = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <VerifyEmailPage status="verifying" email="lin@agentaily.dev" />
    </div>
  ),
};

// ok — green check + countdown. With returnTo set and noRedirect off, the
// {seconds} count renders as a real decrementing number (the fmt array fix —
// not "[object Object]s"). "Continue now" / "Stay on this page" are available.
export const Success = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <VerifyEmailPage
        status="ok"
        email="lin@agentaily.dev"
        returnTo={{ label: "Agentaily", href: "/app" }}
        redirectDelay={5}
        onContinue={() => {}}
      />
    </div>
  ),
};

// ok with noRedirect — no countdown, just a Continue button.
export const SuccessNoRedirect = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <VerifyEmailPage status="ok" email="lin@agentaily.dev" noRedirect onContinue={() => {}} />
    </div>
  ),
};

// error — never auto-redirects. Surfaces the rejection message, offers Resend
// (cooldown-gated, idempotent, confirms in place with a "resend ≠ verified"
// note), plus Try again + Back to sign in.
export const ErrorState = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <VerifyEmailPage
        status="error"
        error="This link may have expired or already been used."
        email="lin@agentaily.dev"
        resendCooldown={20}
        onResend={resolveAfter(700)}
        onRetry={() => {}}
        onBackToSignIn={() => {}}
      />
    </div>
  ),
};

// Uncontrolled (live) — inject verifyToken; the built-in machine runs on mount.
// This one resolves, so it transitions verifying → ok.
export const LiveSuccess = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <VerifyEmailPage
        verifyToken={resolveAfter(1500)}
        email="lin@agentaily.dev"
        returnTo={{ label: "your workspace", href: "/app" }}
        onContinue={() => {}}
      />
    </div>
  ),
};

// Uncontrolled (live) — verifyToken rejects (incl. network failure), landing in
// error; the rejection message becomes the subtitle.
export const LiveError = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <VerifyEmailPage
        verifyToken={rejectAfter(1500, "We couldn’t verify this link.")}
        email="lin@agentaily.dev"
        onResend={resolveAfter(700)}
        onBackToSignIn={() => {}}
      />
    </div>
  ),
};

// showBrandPanel={false} — drop the split brand panel; just the centered card.
export const NoBrandPanel = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <VerifyEmailPage
        status="ok"
        email="lin@agentaily.dev"
        showBrandPanel={false}
        onContinue={() => {}}
      />
    </div>
  ),
};

// Localizable — every string lives in `copy`, shallow-merged per group over the
// English default. {seconds} / {target} interpolate.
export const Chinese = {
  render: () => (
    <ControlledDemo
      initial="ok"
      returnTo={{ label: "你的工作区", href: "/app" }}
      copy={{
        verifying: { title: "正在验证邮箱", subtitle: "稍等片刻,马上就好。" },
        ok: {
          title: "邮箱已验证",
          subtitle: "验证完成,一切就绪。",
          continue: "继续",
          continueNow: "立即继续",
          redirectHint: "{seconds} 秒后前往 {target}…",
          cancelRedirect: "留在本页",
        },
        error: {
          title: "验证失败",
          subtitle: "链接可能已过期或已被使用。",
          retry: "重试",
          backToSignIn: "返回登录",
        },
        resend: {
          cta: "重新发送验证邮件",
          sending: "发送中…",
          cooldown: "{seconds} 秒后可重发",
          sent: "验证邮件已重新发送,请查收。",
          error: "发送失败,请重试。",
          notVerified: "重新发送只是再发一封,你仍需打开邮件中的链接完成验证。",
        },
        target: "你的工作区",
      }}
    />
  ),
};

// Below the 860px breakpoint the brand panel collapses; the card leads with a
// compact BrandMark, centered. Storybook constrains the iframe to a phone width.
export const Mobile = {
  parameters: {
    viewport: {
      viewports: { phone: { name: "Phone 390×760", styles: { width: "390px", height: "760px" } } },
      defaultViewport: "phone",
    },
  },
  render: () => (
    <div style={{ height: "100vh" }}>
      <VerifyEmailPage
        status="error"
        email="lin@agentaily.dev"
        onResend={resolveAfter(700)}
        onBackToSignIn={() => {}}
      />
    </div>
  ),
};
