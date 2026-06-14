---
"@agentaily/design-system": minor
---

新增 `VerifyEmailPage`(auth 域整页邮箱验证,`SignInPage` 的对称兄弟)。只管 `verifying → ok / error` 状态机,不校验/不落库/不跳转/不弹 toast——产品注入 `verifyToken()` / `onResend()`,传入 `email / returnTo / noRedirect / redirectDelay / resendCooldown / copy`。组件内置硬约束:失败态绝不自动跳;成功态可倒计时返回(`redirectDelay` 默认 5s,`noRedirect` 可关);重发带冷却 + 幂等 + 就地确认,并提示「重发 ≠ 已验证」;`verifyToken()` reject/抛错/网络失败一律归 `error`。含 headless `VerifyEmailPage.useVerify({ verifyToken })` → `{ status, error, retry }`,可控/非可控两种模式,全文案 `copy` 可本地化。barrel 119 → 120。
