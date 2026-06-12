Sign in / register modal + a persisted session hook. The hook lives on the component (`AuthDialog.useAuth`), mirroring `Form.useForm`.

```jsx
const { AuthDialog } = window.AxiomDesignSystem_7fc962;

function App() {
  const { user, signIn, signOut } = AuthDialog.useAuth();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <AuthDialog
        open={open}
        reason="登录以继续编辑与导出你的脚本。"
        copy={{ login: { sub: "登录以继续编辑与导出你的脚本。" } }}
        onClose={() => setOpen(false)}
        onSuccess={(email) => {
          signIn(email);
          setOpen(false);
        }}
      />
    </>
  );
}
```

- Tabs toggle 登录 / 注册; validation surfaces on submit; success panel fires `onSuccess(email)` after ~0.7s.
- Pair with `AccountControl` for the top-bar avatar/menu. `useAuth` persists to `localStorage` (`agentaily.auth.v1`).
