/**
 * Full-page email verification — the symmetric sibling of SignInPage (same split
 * brand panel + centered card). It owns ONLY the flow and the
 * verifying → ok / error state machine; it never validates the token, writes a
 * session, shows the success toast, or navigates. Inject two promise-returning
 * effects (verifyToken / onResend) and pass display inputs; keep real
 * validation, persistence, and the (open-redirect-guarded) redirect decision in
 * your product (L5).
 *
 * Hard rules baked in:
 * - The **error** state never auto-redirects.
 * - **Success** can count down to a return (`noRedirect` turns it off); on
 *   elapse / click it calls `onContinue(returnTo)` — your code decides where.
 * - **Resend** is cooldown-gated, idempotent (disabled while in-flight), and
 *   confirms in place — resending is never treated as "verified".
 *
 * Uncontrolled by default: `verifyToken` runs the built-in machine on mount.
 * Pass `status` (+ optional `error`) to drive the machine yourself.
 * Brand panel hides < 860px. For the headless runner, use VerifyEmailPage.useVerify.
 */
export type VerifyStatus = "verifying" | "ok" | "error";

/** A return destination. String = label only; object carries an href your onContinue can use. */
export type VerifyReturnTo = string | { label: string; href?: string };

export interface VerifyEmailCopy {
  verifying?: { title?: string; subtitle?: string };
  ok?: {
    title?: string; subtitle?: string;
    continue?: string; continueNow?: string;
    /** Interpolates {target} and {seconds}. */
    redirectHint?: string;
    cancelRedirect?: string;
  };
  error?: { title?: string; subtitle?: string; retry?: string; backToSignIn?: string };
  resend?: {
    cta?: string; sending?: string;
    /** Interpolates {seconds}. */
    cooldown?: string;
    sent?: string; error?: string; notVerified?: string;
  };
  /** Fallback label when returnTo carries no label. */
  target?: string;
}

export interface VerifyEmailPageProps {
  /** Controlled status. Omit to let the injected `verifyToken` drive the built-in machine. */
  status?: VerifyStatus;
  /** Controlled error shown in the error state (string or node). Used only when `status` is controlled. */
  error?: React.ReactNode;
  /**
   * Injected token check (uncontrolled mode). A promise-returning function — it
   * runs once on mount: resolve → `ok`, reject/throw (incl. network failure) →
   * `error` (the rejection's `.message` becomes the error subtitle). The
   * component does NOT inspect or trust the token; do the real check here.
   */
  verifyToken?: () => Promise<unknown>;
  /** Address being verified — shown in a mono chip across all states. */
  email?: string;
  /** Return destination shown in the success countdown and passed to `onContinue`. Display only — guard the actual URL in your product. */
  returnTo?: VerifyReturnTo;
  /** Disable the success auto-return countdown (user continues manually). @default false */
  noRedirect?: boolean;
  /** Success countdown length in seconds (ignored when `noRedirect`). @default 5 */
  redirectDelay?: number;
  /** Resend cooldown in seconds after a successful resend. @default 30 */
  resendCooldown?: number;
  /**
   * Injected resend effect (promise-returning). Shown only in the error state.
   * Disabled while in-flight and during cooldown (idempotent); resolve → in-place
   * confirmation + cooldown, reject → in-place error. Omit to hide the button.
   */
  onResend?: (email?: string) => Promise<unknown>;
  /** Continue/return handler — fired on countdown elapse and on the continue button. Receives `returnTo`. You own the redirect (validate it). */
  onContinue?: (returnTo?: VerifyReturnTo) => void;
  /** Override the error-state "Try again" action. Defaults to re-running the built-in machine (uncontrolled only). Omit + controlled = no retry link. */
  onRetry?: () => void;
  /** Show + handle a "Back to sign in" link in the error state. */
  onBackToSignIn?: () => void;
  /** Brand-panel lockup. @default <BrandMark wordmark /> */
  brand?: React.ReactNode;
  /** Props forwarded to the brand-panel RotatingTagline. @default { breakAfterPrefix: true } */
  tagline?: Record<string, unknown>;
  /** All user-facing strings, shallow-merged per group over the English defaults. */
  copy?: VerifyEmailCopy;
  /** Show the left brand panel. @default true */
  showBrandPanel?: boolean;
}

export interface UseVerifyResult {
  status: VerifyStatus;
  error: unknown;
  /** Re-run the token check (back to `verifying`). */
  retry: () => void;
}

export declare function VerifyEmailPage(props: VerifyEmailPageProps): JSX.Element;
export declare namespace VerifyEmailPage {
  /** Headless flow runner: drives verifyToken into a verifying → ok / error machine. */
  function useVerify(opts?: { verifyToken?: () => Promise<unknown>; autoStart?: boolean }): UseVerifyResult;
}
