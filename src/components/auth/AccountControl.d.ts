/**
 * Top-bar account control. Signed out → a sign-in button (onLogin). Signed in →
 * an avatar that opens a DropdownMenu with the email, your custom items, and a
 * sign-out action. Custom items use the DropdownMenu item shape.
 */
export interface AccountMenuItem {
  label?: string;
  icon?: React.ReactNode;
  onSelect?: () => void;
  type?: "label" | "separator";
  danger?: boolean;
}
/**
 * User-facing strings, merged over the English defaults. DS is locale-agnostic —
 * pass `copy` to localize. The explicit `signInLabel` prop still wins over `copy.signIn`.
 */
export interface AccountControlCopy {
  /** Signed-out button label. @default "Sign in" */
  signIn?: string;
  /** aria-label for the avatar trigger. @default "Account menu" */
  menuLabel?: string;
  /** Section label above the email row. @default "Signed in" */
  signedIn?: string;
  /** Sign-out menu item. @default "Sign out" */
  signOut?: string;
}
export interface AccountControlProps {
  /** Session user, or null/undefined when signed out. */
  user?: { email: string; name?: string } | null;
  onLogin?: () => void;
  onLogout?: () => void;
  /** Fires when the email row is selected — wire this to open a profile/account screen. */
  onProfile?: () => void;
  /** Extra menu items inserted between the email and sign-out (e.g. a "My scripts" link). */
  items?: AccountMenuItem[];
  /** Sign-in button label. Overrides `copy.signIn`. @default copy.signIn ("Sign in") */
  signInLabel?: string;
  /** Localizable strings, merged over the English defaults. */
  copy?: AccountControlCopy;
}
export declare function AccountControl(props: AccountControlProps): JSX.Element;
