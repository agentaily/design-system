---
"@agentaily/design-system": minor
---

settings / 账户区组件 **headless 化**:把写死的用户可见文案改成走 `copy` prop(英文默认 fallback + 消费方覆盖),DS 保持 locale-agnostic。仿照 `SignInPage` / `VerifyEmailPage` / `AuthDialog` 的 `DEFAULT_COPY` idiom。

- `TestRow` — 新增 `copy={{ idle, testing, test, retest }}`;`testLabel` / `retestLabel` / `idleHint` 显式 prop 仍优先。
- `ConnectionCard` — 新增 `copy={{ connected, disconnected, collapse }}`(折叠 summary + 收起 aria-label)+ `testCopy`(转发给内嵌 `TestRow`)。
- `DeepSeekCard` — 新增 `copy`(title / desc / connected / disconnected / collapse / apiKeyLabel / keyPlaceholder / maskedPlaceholder / maskedHint / idleHint / test / retest / testing / help),**一个对象向下贯穿** `ConnectionCard` → `TestRow`,整张卡可一处本地化;`help` / `idleHint` 显式 prop 仍优先。
- `SettingsSaveBar` — 新增 `copy={{ save, reset, saving, saved, error, cleanHint, dirtyHint }}`;`saveLabel` / `resetLabel` / `cleanHint` / `dirtyHint` / `error` 显式 prop 仍优先。
- `AccountControl` — 新增 `copy={{ signIn, menuLabel, signedIn, signOut }}`;`signInLabel` 显式 prop 仍优先。
- `SettingsSheet` — `crumb` / `navLabel` 默认值由 `"设置"` 翻为 `"Settings"`(本就可覆盖)。
- `HelpSteps` / `PageSection` — 本就 headless(全部可见文案来自 props),无需改动。

**⚠️ 回归窗口(英文默认带来的前后耦合)**:这些组件的默认文案由中文翻成**英文**,下游 `form-design` 不传 `copy` 会在中文模式露英文。`form-design` 需另起一根 PR:bump 本包 + 给这些组件传 `L()` copy,两边协调部署时机。详见 PR #35 描述的「回归窗口清单」。barrel 模块数不变(120),纯 optional 加法、向后兼容。`StatusPill` 的 badge 文案(`已连接`/`未连接`/…)不在本轮、保留中文默认(follow-up)。
