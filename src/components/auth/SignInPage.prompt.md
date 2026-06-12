Full-page auth — split brand panel + centered card. **One component, two modes** (`signin` / `signup`); the brand panel, SSO, and chrome are shared, only fields/copy/footer differ. The built-in footer link flips mode and fires `onModeChange` — the full-page sibling of `AuthDialog`.

```jsx
const { SignInPage } = window.AxiomDesignSystem_7fc962;

// Uncontrolled — the footer "Create one" / "Sign in" link flips mode internally:
<SignInPage onSubmit={({ mode, email, password }) => doAuth(mode, email, password)} onForgot={...} onSSO={...} />

// Controlled by your router (URL stays in sync):
<SignInPage
  mode={route === "/signup" ? "signup" : "signin"}
  onModeChange={(m) => navigate(m === "signup" ? "/signup" : "/signin")}
  onSubmit={({ mode, email, password }) => doAuth(mode, email, password)}
/>
```

- **signup** adds a confirm-password field + a terms line, and submit/footer copy flips automatically.
- Built-in validation (email format · password ≥ 8 in signup · confirm match) renders inline errors; `onSubmit` only fires when valid.
- **Async submit + backend errors.** `onSubmit` can be async; drive the button's busy state with `submitting` (disables it + spins + blocks double-submit) and surface server failures (409 / 401 / 400 …) with `error`, shown in a danger banner above the button. The component owns its client-side field errors and clears them on input/mode change; the backend `error` is yours to clear — reset it before each request and on mode/input change.

```jsx
function Auth() {
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  return (
    <SignInPage
      error={error}
      submitting={submitting}
      onModeChange={() => setError(null)}
      onEmailChange={() => setError(null)}
      onPasswordChange={() => setError(null)}
      onSubmit={async ({ mode, email, password }) => {
        setError(null);
        setSubmitting(true);
        try {
          const res = await fetch("/api/" + mode, {
            method: "POST",
            body: JSON.stringify({ email, password }),
          });
          if (!res.ok) {
            setError(
              res.status === 409
                ? "该邮箱已注册"
                : res.status === 401
                  ? "账号或密码错误"
                  : "密码强度不足",
            );
            return;
          }
          location.href = "/app";
        } catch (e) {
          setError("网络错误，请重试");
        } finally {
          setSubmitting(false);
        }
      }}
    />
  );
}
```

- **Nothing is hardcoded — fully localizable.** All strings live in `copy`, deep-merged over an English default: per-mode under `signin`/`signup`; shared `labels` (email/password/confirm/forgot/or/sso), `placeholders` (email/password/passwordNew/confirm), `errors` (the six validation messages), and the signup `terms` line. Pass a full zh-CN object to flip the whole surface:

```jsx
<SignInPage
  copy={{
    signin: {
      title: "登录",
      subtitle: "欢輎回来，用邮箱继续。",
      submit: "继续",
      switchText: "还没有账号？",
      switchCta: "创建一个",
    },
    labels: {
      email: "邮箱",
      password: "密码",
      forgot: "忘记密码？",
      or: "或",
      sso: "使用 SSO 登录",
    },
    errors: { emailRequired: "请输入邮箱", passwordRequired: "请输入密码" },
  }}
/>
```

- The brand-panel tagline is the `RotatingTagline` component; forward props with `tagline={{ prefix: "Chat, ", phrases: ["build anything", "learn anything"] }}` to match the form's language.
- Override individual bits instead: `terms={null}` / `footer={null}` to hide, or replace the footer with your own node.
- Pairs with `AuthDialog` (modal) + `AuthDialog.useAuth()` for the persisted session.
