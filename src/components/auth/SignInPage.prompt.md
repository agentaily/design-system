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
