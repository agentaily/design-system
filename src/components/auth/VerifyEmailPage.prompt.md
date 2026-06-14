Full-page email verification — the symmetric sibling of `SignInPage` (same split brand panel + centered card). It owns **only** the flow and the `verifying → ok / error` state machine. It never validates the token, writes a session, shows the success toast, or navigates — you inject the effects and own those decisions (L5).

```jsx
const { VerifyEmailPage } = window.AxiomDesignSystem_7fc962;

// Uncontrolled — inject the token check; it runs once on mount:
<VerifyEmailPage
  email="lin@agentaily.dev"
  returnTo={{ label: "your workspace", href: "/app" }}
  verifyToken={async () => {
    const res = await fetch("/api/verify?token=" + token);
    if (!res.ok)
      throw new Error(
        res.status === 410 ? "This link has expired." : "We couldn’t verify this link.",
      );
    // success: persist the session HERE (L5), then resolve
  }}
  onResend={() => fetch("/api/verify/resend", { method: "POST" })}
  onContinue={(returnTo) => {
    // YOU decide the redirect — guard it against open-redirects
    const safe = isSameOrigin(returnTo?.href) ? returnTo.href : "/app";
    location.href = safe;
  }}
  onBackToSignIn={() => navigate("/signin")}
/>;
```

**The three states**

- `verifying` — spinner ring + mail mark while `verifyToken()` is pending.
- `ok` — green check. If `returnTo` is set and `noRedirect` is off, a countdown (`redirectDelay`, default 5s) ticks down and then calls `onContinue(returnTo)`; the user can **Continue now** or **Stay on this page** to cancel. With `noRedirect`, no countdown — just a Continue button.
- `error` — never auto-redirects. Surfaces the rejection message, offers **Resend**, optional **Try again** (re-runs the check) and **Back to sign in**.

**Hard rules** (enforced by the component, so products can't get them wrong):

- A `verifyToken()` rejection — including a thrown network error — lands in `error`, never a silent hang.
- The error state **never** navigates on its own; redirect is only ever your `onContinue`.
- **Resend** is cooldown-gated and idempotent (disabled while in-flight + during `resendCooldown`, default 30s), and confirms **in place** — and a note reminds the user that **resend ≠ verified** (they still must open the new link).

**Controlled** — drive the machine yourself (e.g. your router/L5 owns it). Pass `status` (+ `error`); `verifyToken` is then ignored:

```jsx
<VerifyEmailPage
  status={status}
  error={errMsg}
  email={email}
  onResend={resend}
  onContinue={go}
  onBackToSignIn={backToSignIn}
/>
```

**Headless** — just the runner, bring your own UI:

```jsx
const { status, error, retry } = VerifyEmailPage.useVerify({ verifyToken });
```

**Localizable** — every string lives in `copy`, shallow-merged per group over the English default (`verifying` / `ok` / `error` / `resend` + `target`). `{seconds}` and `{target}` interpolate:

```jsx
<VerifyEmailPage
  copy={{
    verifying: { title: "正在验证邮箱", subtitle: "稍等片刻…" },
    ok: {
      title: "邮箱已验证",
      subtitle: "验证完成,一切就绪。",
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
      cooldown: "{seconds} 秒后可重发",
      sent: "验证邮件已重新发送,请查收。",
      notVerified: "重新发送只是再发一封,你仍需打开邮件中的链接完成验证。",
    },
    target: "你的工作区",
  }}
/>
```

Pairs with `SignInPage` (sign in / sign up) and `AuthDialog` (modal) in the auth domain.
