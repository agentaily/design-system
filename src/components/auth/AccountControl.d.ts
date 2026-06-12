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
export interface AccountControlProps {
  /** Session user, or null/undefined when signed out. */
  user?: { email: string; name?: string } | null;
  onLogin?: () => void;
  onLogout?: () => void;
  /** Extra menu items inserted between the email and sign-out (e.g. 我的脚本). */
  items?: AccountMenuItem[];
  /** @default "登录" */
  signInLabel?: string;
}
export declare function AccountControl(props: AccountControlProps): JSX.Element;
