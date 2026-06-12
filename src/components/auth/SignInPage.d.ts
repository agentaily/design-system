/**
 * Full-page auth: a split brand panel (dot-grid + quote) beside a centered card.
 * One component, two modes (signin / signup) — the brand panel, SSO, and chrome
 * are shared; only fields, copy, and footer differ. The built-in footer link
 * flips mode and fires onModeChange (wire it to your router to swap the URL).
 * Light built-in validation (email format, password length, confirm match).
 * For a modal instead, use AuthDialog. Brand panel hides < 860px.
 */
export interface SignInPageCopy {
  title?: string;
  subtitle?: string;
  submit?: string;
  /** Footer lead-in, e.g. "No account?" */
  switchText?: string;
  /** Footer link label that flips mode, e.g. "Create one" */
  switchCta?: string;
}
export interface SignInPageProps {
  /** Controlled mode. Omit for uncontrolled (uses defaultMode). */
  mode?: "signin" | "signup";
  /** Initial mode when uncontrolled. @default "signin" */
  defaultMode?: "signin" | "signup";
  /** Fires when the footer link flips mode — wire to your router (/signin ↔ /signup). */
  onModeChange?: (mode: "signin" | "signup") => void;
  /** Brand-panel lockup. @default <BrandMark wordmark /> (blinking cursor) */
  brand?: React.ReactNode;
  /** Per-mode copy overrides, merged over defaults: { signin?, signup? }. */
  copy?: { signin?: SignInPageCopy; signup?: SignInPageCopy };
  email?: string;
  password?: string;
  onEmailChange?: (value: string) => void;
  onPasswordChange?: (value: string) => void;
  /** Submit handler (after validation passes); receives { mode, email, password }. */
  onSubmit?: (values: { mode: "signin" | "signup"; email: string; password: string }) => void;
  /** Show + handle the "Forgot?" link (signin mode only). */
  onForgot?: () => void;
  /** @default "Continue with SSO" */
  ssoLabel?: string;
  /** Show + handle the SSO button (hidden when omitted). */
  onSSO?: () => void;
  /** Terms line shown in signup mode. Pass null to hide; omit for the default. */
  terms?: React.ReactNode;
  /** Override the built-in mode-flip footer. Pass null to hide; omit for the default. */
  footer?: React.ReactNode;
  /** Show the left brand panel. @default true */
  showBrandPanel?: boolean;
}
export declare function SignInPage(props: SignInPageProps): JSX.Element;
