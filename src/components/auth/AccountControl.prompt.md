Top-bar account affordance — pairs with `AuthDialog`.

```jsx
import { AccountControl, AuthDialog } from "@agentaily/design-system";
const { user, signOut } = AuthDialog.useAuth();

<AccountControl
  user={user}
  onLogin={() => setAuthOpen(true)}
  onLogout={signOut}
  onProfile={openAccount}
  items={[
    { label: "我的脚本", icon: <Icon name="film" size={15} />, onSelect: openScripts },
    { label: "集成设置", icon: <Icon name="settings" size={15} />, onSelect: openSettings },
  ]}
/>;
```

Signed out shows a sign-in button; signed in shows a square avatar that opens a menu (a "Signed in" label → the email → your `items` → a sign-out item). The email row is clickable — wire `onProfile` to open a profile/account screen.

All chrome strings default to **English**. DS is locale-agnostic — pass `copy` to localize:

```jsx
<AccountControl
  user={user}
  onLogout={signOut}
  copy={{ signIn: "登录", menuLabel: "账户菜单", signedIn: "已登录账户", signOut: "退出登录" }}
/>
```

(Your `items` labels are your own content — pass them in whatever language you need. The single `signInLabel` prop, if given, wins over `copy.signIn`.)
