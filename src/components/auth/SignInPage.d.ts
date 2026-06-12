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
/** Shared, non-mode-specific strings. All optional — merged over the English defaults. */
export interface SignInPageSharedCopy {
  /** Field labels + chrome: { email, password, confirm, forgot, or, sso }. */
  labels?: { email?: string; password?: string; confirm?: string; forgot?: string; or?: string; sso?: string };
  /** Input placeholders: { email, password, passwordNew, confirm }. */
  placeholders?: { email?: string; password?: string; passwordNew?: string; confirm?: string };
  /** Validation messages: { emailRequired, emailInvalid, passwordRequired, passwordShort, confirmRequired, confirmMismatch }. */
  errors?: {
    emailRequired?: string; emailInvalid?: string;
    passwordRequired?: string; passwordShort?: string;
    confirmRequired?: string; confirmMismatch?: string;
  };
  /** Default signup terms line (string). Overridden by the `terms` prop if passed. */
  terms?: React.ReactNode;
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
  /**
   * All user-facing strings, deep-merged over the English defaults. Per-mode
   * copy under `signin`/`signup`; shared labels, placeholders, errors, and the
   * terms line at the top level. Pass a full zh-CN object to localize.
   */
  copy?: { signin?: SignInPageCopy; signup?: SignInPageCopy } & SignInPageSharedCopy;
  /** Props forwarded to the brand-panel RotatingTagline (prefix, phrases, flowDuration…). @default { breakAfterPrefix: true } */
  tagline?: Record<string, unknown>;
  email?: string;
  password?: string;
  onEmailChange?: (value: string) => void;
  onPasswordChange?: (value: string) => void;
  /** Submit handler (after validation passes); receives { mode, email, password }. */
  onSubmit?: (values: { mode: "signin" | "signup"; email: string; password: string }) => void;
  /** Show + handle the "Forgot?" link (signin mode only). */
  onForgot?: () => void;
  /** SSO button label. Overrides copy.labels.sso. @default "Continue with SSO" */
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
