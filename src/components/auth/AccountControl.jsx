import React from "react";
import { Avatar } from "../display/Avatar.jsx";
import { Button } from "../buttons/Button.jsx";
import { DropdownMenu } from "../overlay/DropdownMenu.jsx";
import { Icon } from "../utilities/Icon.jsx";

// AccountControl — top-bar account affordance. Signed out: a sign-in button.
// Signed in: an avatar that opens a dropdown (email, custom items, sign out).
const AX_ACCOUNT_CSS = `
.am-acct { appearance: none; border: none; background: none; padding: 0; cursor: pointer;
  display: inline-flex; border-radius: var(--radius-2); transition: box-shadow var(--dur-1) var(--ease-out); }
.am-acct:hover { box-shadow: 0 0 0 2px var(--border-strong); }
.am-acct:active { transform: translateY(1px); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-account-css")) {
  const s = document.createElement("style");
  s.id = "ax-account-css";
  s.textContent = AX_ACCOUNT_CSS;
  document.head.appendChild(s);
}

// Self-consistent English baseline. DS is locale-agnostic — pass `copy` (any
// subset) to localize. The explicit `signInLabel` prop still wins over copy.signIn.
const DEFAULT_COPY = {
  signIn: "Sign in",
  menuLabel: "Account menu",
  signedIn: "Signed in",
  signOut: "Sign out",
};

export function AccountControl({
  user,
  onLogin,
  onLogout,
  onProfile,
  items = [],
  signInLabel,
  copy,
}) {
  const c = { ...DEFAULT_COPY, ...copy };
  const signInText = signInLabel !== undefined ? signInLabel : c.signIn;
  if (!user) {
    return (
      <Button variant="ghost" icon={<Icon name="user" size={14} />} onClick={onLogin}>
        {signInText}
      </Button>
    );
  }
  return (
    <DropdownMenu
      align="end"
      trigger={
        <button className="am-acct" aria-label={c.menuLabel}>
          <Avatar name={user.name || user.email} size="sm" />
        </button>
      }
      items={[
        { type: "label", label: c.signedIn },
        {
          label: user.email,
          icon: <Icon name="mail" size={15} />,
          onSelect: onProfile || (() => {}),
        },
        ...(items.length ? [{ type: "separator" }, ...items] : []),
        { type: "separator" },
        {
          label: c.signOut,
          icon: <Icon name="logout" size={15} />,
          danger: true,
          onSelect: onLogout,
        },
      ]}
    />
  );
}
