Full-page auth — split brand panel + centered card. **One component, two modes** (`signin` / `signup`); the brand panel, SSO, and chrome are shared, only fields/copy/footer differ. The built-in footer link flips mode and fires `onModeChange` — the full-page sibling of `AuthDialog`.

```jsx
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
- Override copy per mode with `copy={{ signin: { title, switchCta }, signup: {...} }}`; hide the terms or footer with `terms={null}` / `footer={null}`, or replace the footer with your own node.
- Pairs with `AuthDialog` (modal) + `AuthDialog.useAuth()` for the persisted session.
