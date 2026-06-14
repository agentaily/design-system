---
"@agentaily/design-system": minor
---

`Input` 新增 opt-in `reveal` prop:当 `type="password"` 且 `reveal` 时,字段内右下角渲染一个显隐「小眼睛」按钮,点击在 `password` / `text` 间切换。视觉与 `SecretField` 的眼睛一致(`eye` / `eyeOff` 图标),`tabIndex={-1}` + `onMouseDown` preventDefault 不抢 Tab 焦点、不打断表单填写流。向后兼容:不传 `reveal` 行为不变;非 password 字段即便传 `reveal` 也不渲染眼睛。

`SignInPage` 的密码 + 确认密码字段已开启 `reveal`,登录 / 注册页密码框即得显隐切换。下游 wrap 了 `SignInPage` 的登录页 bump 本包即自动获得此能力,无需改 signin 逻辑。
