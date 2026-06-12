/**
 * Sign in / register modal with a localStorage-persisted session. Tabs switch
 * mode; client-side validation; a brief faux-submit then a success panel that
 * fires `onSuccess(email)`. The session hook is exposed as `AuthDialog.useAuth`.
 */
export interface AuthUser {
  email: string;
  name: string;
  since: number;
}
export interface AuthSession {
  user: AuthUser | null;
  signIn: (email: string) => void;
  signOut: () => void;
}
export interface AuthCopy {
  title?: string;
  sub?: string;
  cta?: string;
  busy?: string;
  okh?: string;
}
export interface AuthDialogProps {
  open: boolean;
  /** Optional gated-reason line shown above the form (e.g. "登录以继续导出"). */
  reason?: string;
  /** @default "login" */
  initialMode?: "login" | "register";
  /** Override per-mode copy (title / sub / cta / busy / okh). */
  copy?: { login?: AuthCopy; register?: AuthCopy };
  onClose?: () => void;
  /** Fires with the email after a successful submit. */
  onSuccess?: (email: string) => void;
}
export declare function AuthDialog(props: AuthDialogProps): JSX.Element | null;
export declare namespace AuthDialog {
  /** localStorage-persisted session: { user, signIn, signOut }. */
  function useAuth(storageKey?: string): AuthSession;
}
