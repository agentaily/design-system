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

Signed out shows a 登录 button; signed in shows a square avatar that opens a menu (email → your `items` → 退出登录). The email row is clickable — wire `onProfile` to open a profile/account screen.
