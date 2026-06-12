import React from "react";
import { SignInPage } from "./SignInPage.jsx";

export default {
  title: "Auth/SignInPage",
  component: SignInPage,
  parameters: { layout: "fullscreen" },
};

function Demo({ defaultMode }) {
  const [mode, setMode] = React.useState(defaultMode ?? "signin");
  return (
    <div style={{ height: "100vh" }}>
      <SignInPage
        mode={mode}
        onModeChange={setMode}
        onSubmit={() => {}}
        onForgot={() => {}}
        onSSO={() => {}}
      />
    </div>
  );
}

export const SignIn = { render: () => <Demo defaultMode="signin" /> };

export const SignUp = { render: () => <Demo defaultMode="signup" /> };

export const NoBrandPanel = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <SignInPage showBrandPanel={false} onSubmit={() => {}} />
    </div>
  ),
};
