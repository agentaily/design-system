import React from "react";
import { AuthDialog } from "./AuthDialog.jsx";
import { Button } from "../buttons/Button.jsx";

export default {
  title: "Auth/AuthDialog",
  component: AuthDialog,
  parameters: { layout: "fullscreen" },
};

function Demo({ initialMode, reason }) {
  const [open, setOpen] = React.useState(true);
  return (
    <div style={{ padding: 24, minHeight: 480 }}>
      <Button onClick={() => setOpen(true)}>打开登录框</Button>
      <AuthDialog
        open={open}
        initialMode={initialMode}
        reason={reason}
        onClose={() => setOpen(false)}
        onSuccess={() => setOpen(false)}
      />
    </div>
  );
}

export const Login = { render: () => <Demo initialMode="login" /> };

export const Register = { render: () => <Demo initialMode="register" /> };

export const Gated = {
  render: () => <Demo initialMode="login" reason="登录以继续编辑与导出你的脚本。" />,
};
