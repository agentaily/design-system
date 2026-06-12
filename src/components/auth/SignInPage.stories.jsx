import React from "react";
import { SignInPage } from "./SignInPage.jsx";

export default {
  title: "Auth/SignInPage",
  component: SignInPage,
  parameters: { layout: "fullscreen" },
};

function Demo({ defaultMode, ...props }) {
  const [mode, setMode] = React.useState(defaultMode ?? "signin");
  return (
    <div style={{ height: "100vh" }}>
      <SignInPage
        mode={mode}
        onModeChange={setMode}
        onSubmit={() => {}}
        onForgot={() => {}}
        onSSO={() => {}}
        {...props}
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

// The brand-panel tagline is a RotatingTagline; override its phrases via `tagline`.
export const CustomTagline = {
  render: () => (
    <Demo
      defaultMode="signin"
      tagline={{
        prefix: "Chat to ",
        phrases: ["build anything", "ship anything", "learn anything"],
      }}
    />
  ),
};

// `error` surfaces a backend failure (409 / 401 / 400 …) in a danger banner
// directly above the submit button. It's caller-owned — clear it on mode/input
// change; the component only owns its own client-side validation errors.
export const WithBackendError = {
  render: () => <Demo defaultMode="signup" error="该邮箱已注册" />,
};

// `submitting` drives the async busy state: while an async onSubmit is in flight
// the submit button disables, shows a spinner, and blocks double-submit.
export const Submitting = {
  render: () => <Demo defaultMode="signin" submitting />,
};

// Below the 860px breakpoint the brand panel collapses; the card leads with a
// compact BrandMark + tagline, left-aligned. Storybook constrains the iframe to
// a phone width so the responsive layout renders.
export const Mobile = {
  parameters: {
    viewport: {
      viewports: { phone: { name: "Phone 390×760", styles: { width: "390px", height: "760px" } } },
      defaultViewport: "phone",
    },
  },
  render: () => <Demo defaultMode="signin" />,
};
