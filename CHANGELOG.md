# @agentaily/design-system

## 0.14.0

### Minor Changes

- [#35](https://github.com/agentaily/design-system/pull/35) [`04f24ad`](https://github.com/agentaily/design-system/commit/04f24ada32f7c2ff9519d0058ef47d60140c66c8) Thanks [@yarnovo](https://github.com/yarnovo)! - settings / 账户区组件 **headless 化**:把写死的用户可见文案改成走 `copy` prop(英文默认 fallback + 消费方覆盖),DS 保持 locale-agnostic。仿照 `SignInPage` / `VerifyEmailPage` / `AuthDialog` 的 `DEFAULT_COPY` idiom。

  - `TestRow` — 新增 `copy={{ idle, testing, test, retest }}`;`testLabel` / `retestLabel` / `idleHint` 显式 prop 仍优先。
  - `ConnectionCard` — 新增 `copy={{ connected, disconnected, collapse }}`(折叠 summary + 收起 aria-label)+ `testCopy`(转发给内嵌 `TestRow`)。
  - `DeepSeekCard` — 新增 `copy`(title / desc / connected / disconnected / collapse / apiKeyLabel / keyPlaceholder / maskedPlaceholder / maskedHint / idleHint / test / retest / testing / help),**一个对象向下贯穿** `ConnectionCard` → `TestRow`,整张卡可一处本地化;`help` / `idleHint` 显式 prop 仍优先。
  - `SettingsSaveBar` — 新增 `copy={{ save, reset, saving, saved, error, cleanHint, dirtyHint }}`;`saveLabel` / `resetLabel` / `cleanHint` / `dirtyHint` / `error` 显式 prop 仍优先。
  - `AccountControl` — 新增 `copy={{ signIn, menuLabel, signedIn, signOut }}`;`signInLabel` 显式 prop 仍优先。
  - `SettingsSheet` — `crumb` / `navLabel` 默认值由 `"设置"` 翻为 `"Settings"`(本就可覆盖)。
  - `HelpSteps` / `PageSection` — 本就 headless(全部可见文案来自 props),无需改动。

  **⚠️ 回归窗口(英文默认带来的前后耦合)**:这些组件的默认文案由中文翻成**英文**,下游 `form-design` 不传 `copy` 会在中文模式露英文。`form-design` 需另起一根 PR:bump 本包 + 给这些组件传 `L()` copy,两边协调部署时机。详见 PR [#35](https://github.com/agentaily/design-system/issues/35) 描述的「回归窗口清单」。barrel 模块数不变(120),纯 optional 加法、向后兼容。`StatusPill` 的 badge 文案(`已连接`/`未连接`/…)不在本轮、保留中文默认(follow-up)。

## 0.13.0

### Minor Changes

- [#33](https://github.com/agentaily/design-system/pull/33) [`09c3eb7`](https://github.com/agentaily/design-system/commit/09c3eb76f1c90593e312d8fcd808885e83ab70b2) Thanks [@yarnovo](https://github.com/yarnovo)! - `Input` 新增 opt-in `reveal` prop:当 `type="password"` 且 `reveal` 时,字段内右下角渲染一个显隐「小眼睛」按钮,点击在 `password` / `text` 间切换。视觉与 `SecretField` 的眼睛一致(`eye` / `eyeOff` 图标),`tabIndex={-1}` + `onMouseDown` preventDefault 不抢 Tab 焦点、不打断表单填写流。向后兼容:不传 `reveal` 行为不变;非 password 字段即便传 `reveal` 也不渲染眼睛。

  `SignInPage` 的密码 + 确认密码字段已开启 `reveal`,登录 / 注册页密码框即得显隐切换。下游 wrap 了 `SignInPage` 的登录页 bump 本包即自动获得此能力,无需改 signin 逻辑。

## 0.12.0

### Minor Changes

- [#31](https://github.com/agentaily/design-system/pull/31) [`18c7420`](https://github.com/agentaily/design-system/commit/18c7420ce23748ded34b8343d398b02cd2828100) Thanks [@yarnovo](https://github.com/yarnovo)! - 新增 `VerifyEmailPage`(auth 域整页邮箱验证,`SignInPage` 的对称兄弟)。只管 `verifying → ok / error` 状态机,不校验/不落库/不跳转/不弹 toast——产品注入 `verifyToken()` / `onResend()`,传入 `email / returnTo / noRedirect / redirectDelay / resendCooldown / copy`。组件内置硬约束:失败态绝不自动跳;成功态可倒计时返回(`redirectDelay` 默认 5s,`noRedirect` 可关);重发带冷却 + 幂等 + 就地确认,并提示「重发 ≠ 已验证」;`verifyToken()` reject/抛错/网络失败一律归 `error`。含 headless `VerifyEmailPage.useVerify({ verifyToken })` → `{ status, error, retry }`,可控/非可控两种模式,全文案 `copy` 可本地化。barrel 119 → 120。

## 0.11.0

### Minor Changes

- [#29](https://github.com/agentaily/design-system/pull/29) [`046d799`](https://github.com/agentaily/design-system/commit/046d799cda885861df3c8bb8294d6665d7b68168) Thanks [@yarnovo](https://github.com/yarnovo)! - ConversationThread 透传 `onModelClick` 给内部 Composer:新增可选 prop `onModelClick?: () => void`,直接转发到内部 `<Composer>` 的模型 pill 点击回调。下游可直接拿到模型 pill 的点击回调去开模型选择菜单,不必再用 wrapper 截内部类 `.ax-composer__model`。纯新增 optional prop,向后兼容,其余 API 不变。

## 0.10.1

### Patch Changes

- [#27](https://github.com/agentaily/design-system/pull/27) [`ad0a74e`](https://github.com/agentaily/design-system/commit/ad0a74eb65ec0d35a8df5faf5247db02d8fa4240) Thanks [@yarnovo](https://github.com/yarnovo)! - DataTable 宽表横滚时分页脚/表头漂移修复:表头 `thead th` 改为 `position: sticky`(横滚列对齐、纵滚留顶),分页脚 `.ax-datatable__foot` 移出横向滚动容器(变为新增 `.ax-datatable-box` 外壳下、`.ax-datatable-wrap` 的兄弟节点)并加背景,横滚不再漂移。纯 CSS/DOM seam 修复,props/API 不变。

## 0.10.0

### Minor Changes

- [#25](https://github.com/agentaily/design-system/pull/25) [`11ded47`](https://github.com/agentaily/design-system/commit/11ded47430967cd06f577eaf1e9ffe4f9bfaf9f6) Thanks [@yarnovo](https://github.com/yarnovo)! - 移除厂商专用连接卡并精简 DeepSeekCard —— **破坏性变更**(下游需迁移;`0.x` 约定故走 minor)。

  - **移除 `FeishuCard`**(连同导出的 `parseFeishuLink` 助手):厂商专用、不通用。
  - **移除 `IntegrationSettings`**(及其别名 `ServiceConnections`):把就绪栏 / 校验 / 持久化固化进组件,过度业务化。集成分区现由调用方自行组合(例如一个装着连接卡的 `<PageSection>`),保存归容器 footer 的 `<SettingsSaveBar>`。
  - **`DeepSeekCard` 去掉「对话模型」选择**:移除 props `model` / `onModelChange` / `models` 与类型 `DeepSeekModelOption`,以及卡片内的 model `<Select>`。展开后从 API KEY 字段直接到「如何获取 DeepSeek API Key?」帮助。

  下游迁移:用通用 `ConnectionCard` 组合自己的服务卡(`DeepSeekCard` 即如此),集成屏的就绪栏 / 保存 / 门禁由调用方拥有;不再传 `model` 相关 props 给 `DeepSeekCard`。

## 0.9.0

### Minor Changes

- [#23](https://github.com/agentaily/design-system/pull/23) [`6d24179`](https://github.com/agentaily/design-system/commit/6d241791b2ff82c41ee4ffd520cbef7d58c4aafa) Thanks [@yarnovo](https://github.com/yarnovo)! - feat(icon): Icon 集新增 `monitor`(显示器)图标 + 补全 `IconName` 漏列的 `menu`

  往 `components/utilities/Icon` 的 `PATHS` 集新增 `monitor`(显示器 / 桌面屏幕)glyph —— Lucide geometry(屏幕矩形 + 底座短脚:`<rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />`),与现有图标同 24px grid / stroke 2 / round caps / 单色 `currentColor` / fill none。下游 `form-design` 预览区「桌面」视图切换按钮可换回 `<Icon name="monitor" />`,不再内联设计稿 SVG。

  `IconName` 联合类型同步加 `"monitor"`;并顺手补回此前漏列的 `"menu"`(`PATHS` 一直有 `menu` glyph 但类型里漏了)—— `IconName` 现与 `PATHS` 对齐、清掉漂移。

  Icon 集 glyph 数 46 → 47;**barrel 模块数不变**(Icon 仍是单个 `.jsx`,组件导出数不变)。

## 0.8.0

### Minor Changes

- [#21](https://github.com/agentaily/design-system/pull/21) [`ed679ca`](https://github.com/agentaily/design-system/commit/ed679ca618889d6a3737bca232b8a3c3f6be2937) Thanks [@yarnovo](https://github.com/yarnovo)! - feat(layout,settings): 同步 Claude Design handoff `wUuoiOO9` — 设置/集成区重构为四层浮层链

  多组件设计同步(verbatim 镜像)。新增 7 个组件、删除 1 个、改动 6 个 —— net **+6 → 121 barrel 模块**(was 115)。

  **新增(layout):**

  - `PanelSheet` —— 全屏「上浮」浮层外壳:Header + 滚动 body + 可选吸底 Footer 槽;header/body/footer 共享同一 gutter+max-width 对齐;Esc 关闭、`role="dialog"`。**`.ax-psheet*` 是浮层骨架 CSS 的唯一来源**。
  - `SettingsSheet` —— 基于 PanelSheet 的浮动设置页:左侧分区导航(`nav`)固定 + 右侧内容独立滚动 + footer 槽。
  - `PageSection`(别名 `SettingsSection`)—— 通用「眉标 + 标题 + 描述 + 正文」页面分区布局(不限设置)。
  - `PanelFooter` —— 页脚内容组件:`status`(左)+ `actions`(右)。
  - `SettingsSaveBar` —— 每个 tab 底部的**显式保存条**(GitHub 模型,非自动保存);配 `Form.useForm` 或显式 `dirty`/`onSave`,composes `PanelFooter`。

  **新增(settings):**

  - `ConnectionCard` —— 连接卡共享外壳,基于底层 `Card`:可折叠头部 + 内容 + 测试底栏 + 状态着色。
  - `IntegrationSettings`(别名 `ServiceConnections`)—— 组合式「集成」分区(基于 `PageSection`):hero + 就绪栏 + 连接卡槽(`children`),不再自带外壳/保存 UI。

  **改动:**

  - `DeepSeekCard` / `FeishuCard` —— 改为组合 `ConnectionCard`,连上后默认折叠成一行摘要(`collapsible` / `expanded` / `onExpandedChange`);**移除用量上限**(`showUsageCap` / `capOn` / `cap`)。
  - `AccountControl` —— 新增 `onProfile`,邮箱行可点跳转个人/账户页。
  - `SecretField` / `HelpSteps` / `TestRow` —— 无前缀类名收敛为带前缀命名空间(`.s-secret*→.ax-secret*`、`.s-field*→.ax-cfield*`、`.s-help*→.ax-helpsteps*`、`.s-foot*→.ax-testrow*`),防下游 CSS 撞车。

  **破坏性变更(下游 `form-design` 需迁移):**

  - **删除 `SettingsPage`**(被 `SettingsSheet` 取代)。
  - `IntegrationSettings` 由「整页」改为「分区」:不再有 `onSave` / `saving` / `saveError`,也不再渲染内嵌保存行 —— 保存归容器 footer 的 `SettingsSaveBar`;`open` / `onClose` 移到 `SettingsSheet`。
  - 移除 `showUsageCap` / 用量上限相关一切。
  - 无前缀 `.s-*` 类名收敛(下游若复制过这些类需改用组件)。

    0.x 上 breaking → **minor** bump。下游迁移指引见 `skill/SKILL.md` 的 Settings 段与 `DESIGN.md` 的 Settings architecture。

## 0.7.1

### Patch Changes

- [#18](https://github.com/agentaily/design-system/pull/18) [`9365141`](https://github.com/agentaily/design-system/commit/9365141e53688f67a1fa9da40e3d4923a05c1ef6) Thanks [@yarnovo](https://github.com/yarnovo)! - Ship `CHANGELOG.md` inside the npm package (added to `files`), so downstreams can read the changelog from `node_modules/@agentaily/design-system/CHANGELOG.md` instead of only on GitHub.

## 0.7.0

### Minor Changes

- [#16](https://github.com/agentaily/design-system/pull/16) [`6fbf758`](https://github.com/agentaily/design-system/commit/6fbf758040deb10465cb2a736ecf752089c7bd35) Thanks [@yarnovo](https://github.com/yarnovo)! - feat(chat): 新增 `<Markdown>` 原语 + `<Message>` 正文支持 markdown 渲染

  新增可组合的 `<Markdown>` 原语(`components/chat/Markdown`),把模型输出的 markdown 字符串渲染成排版好的、双主题的 React 节点:段落 + 软换行、加粗、斜体、删除线、行内代码、围栏代码块(复用 `CodeBlock`)、有序/无序/嵌套/任务列表、引用块(可嵌套)、GFM 表格(列对齐 + 溢出横向滚动)、水平线、`#`/`##`/`###` 标题、`[链接](url)` + 裸 URL 自动链接;图片 `![]()` 渲染为惰性占位 chip(不抓取)。

  `<Message>` 正文现在接受 markdown 字符串 —— 新增 `markdown` prop,或直接把字符串作为 children —— 经 `<Markdown>` 渲染;传 React-node children 仍原样渲染,**完全向后兼容**。

  安全:解析成 React 元素树后发出,不用 `dangerouslySetInnerHTML`(所有文本自动转义),链接 href 做协议净化(丢弃 `javascript:` / `data:` / `vbscript:`)。流式容错:半截表格 / 半截引用 / 未闭合标记与围栏降级为字面或部分渲染,流式中途不抛错。

  Net +1 component → 115 barrel modules / 148 exports。

## 0.6.0

### Minor Changes

- [#11](https://github.com/agentaily/design-system/pull/11) [`ab5bd2d`](https://github.com/agentaily/design-system/commit/ab5bd2dca4f7d42e81c81c007721b1381b208fa0) Thanks [@yarnovo](https://github.com/yarnovo)! - Replace the `IntegrationSettings` modal with two pure-display connection cards, and turn the BrandMark cursor off by default. Second round aligned with downstream `form-design` after the 0.5.0 backend-seam round — the seam approach was the wrong shape; state belongs to the caller, not the component.

  - **BREAKING — `IntegrationSettings` removed.** The all-in-one modal welded localStorage persistence + a Save bar + readiness gating onto the two cards; downstream hit hard walls (an empty `catch` swallowing `onSave` rejects, no backend-error slot, Save blocked by `allReady` so the "save → backend validates → 400" path was unreachable, and a built-in `localStorage` nobody downstream uses). It is gone, along with its internal `localStorage`. Consumers move to the two cards below and own their own config / persistence / Save / gating. The only current downstream (`form-design`) is switching to the cards, so this breaks no one in practice; on `0.x` it ships as a **minor**.
  - **New `settings/DeepSeekCard`** (LLM key) **+ `settings/FeishuCard`** (Feishu Bitable data sink) — **pure-display** connection cards: props in (per-field `value` / `onChange`, `status`, `result`, `masked`, field `error`s, `help`…), events out (`onTest`). **Zero state, zero localStorage, zero save bar, zero readiness gating** — the caller owns the config object, persistence, the Save button, backend-error display, and any "both connected?" gate (the same headless philosophy as `Form.useForm` / `Queue.useQueue`). Each composes `SecretField` / `StatusPill` / `TestRow` / `HelpSteps`; the masked-secret echo is derived from props (`masked && !value`) and is never re-submitted. Both ship `.d.ts` + `.prompt.md` (a controlled + backend-wired example) and Storybook stories, plus a `ConnectionCards` reference story where the caller owns the readiness rail + Save bar.
  - **`BrandMark` `cursor` now defaults to `false`.** The block cursor (a brand liveness motif) is off by default so every layout shell (`DesignerShell` / `SignInPage` / `AppShell` / `SettingsPage` / `DocsLayout` …) reads clean without each shell passing a prop. Opt back in with `<BrandMark wordmark cursor />`. Behavioral default change, visual-only.

  Now 114 components.

## 0.5.0

### Minor Changes

- [#9](https://github.com/agentaily/design-system/pull/9) [`64629e7`](https://github.com/agentaily/design-system/commit/64629e7a1a45221b80ade3e9eaa58e7f711e2f11) Thanks [@yarnovo](https://github.com/yarnovo)! - Add backward-compatible backend seams to `IntegrationSettings` and `SignInPage` (contracts requested by downstream consumers — pass nothing and behavior is unchanged).

  - **`IntegrationSettings` — controlled / backend-wired (BYOK) seam.** New optional props let a caller own the config and reach a real backend instead of the built-in localStorage: `value` + `onChange` (controlled config; when `value` is passed the modal stops touching localStorage), `onSave(value)` → `Promise` (Save disables + spins while pending, marks saved on resolve, stays dirty on reject), `onTest(which)` → `Promise<{ ok, message }>` (drives the per-card `StatusPill` + `TestRow`; falls back to the built-in mock probe when omitted), `readiness` (external `{ deepseek, feishu }` override for the 0/2 rail, Save gating, and the green pills), and `masked` (stored secrets echo as a masked placeholder with an empty value and are never re-submitted; typing overrides the mask). Omit all of them and the component self-persists to localStorage exactly as before.
  - **`SignInPage` — backend-error + submit-busy seam.** New optional props: `error` (ReactNode shown in a danger banner directly above the submit button for server failures like 409/401/400; caller-owned, cleared by you) and `submitting` (disables the submit button, shows a spinner, and blocks double-submit while an async `onSubmit` is in flight). Client-side validation is unchanged; the component still owns and clears its own field errors on input/mode change.

  Both ship updated `.d.ts` + `.prompt.md` (controlled + async wiring examples) and new Storybook stories.

## 0.4.0

### Minor Changes

- [#7](https://github.com/agentaily/design-system/pull/7) [`bb7af40`](https://github.com/agentaily/design-system/commit/bb7af407f960a3960cb8bf062eb6b51c07cc5353) Thanks [@yarnovo](https://github.com/yarnovo)! - Add the `RotatingTagline` brand component and align `SignInPage` to use it.

  - **New `utilities/RotatingTagline`** — the animated brand headline: a fixed `prefix` then `phrases[]` that type in, hold, delete, and advance; the rotating phrase wears the flowing geek-rainbow gradient with a trailing block cursor that blinks only at rest. Props: `prefix` / `phrases` / `gradient` / `cursor` / `breakAfterPrefix` / `typeSpeed` / `deleteSpeed` / `hold` / `flowDuration` / `className`. Self-handles `prefers-reduced-motion` (whole-phrase swap, no flow). Now 113 components.
  - **`SignInPage`** — the brand-panel tagline is now a `RotatingTagline` (new `tagline` prop passes through to it). All user-facing strings moved into a layered, deep-mergeable `copy` prop (signin/signup + labels + placeholders + errors + terms) with an English baseline. Desktop tagline enlarged (`clamp(40px, 4.4vw, --text-hero)`, nowrap); mobile reworked — brand panel collapses, compact in-card logo + tagline, `SIGN IN` demoted to a mono label, left-aligned with roomier spacing.

## 0.3.0

### Minor Changes

- [#4](https://github.com/agentaily/design-system/pull/4) [`636a97c`](https://github.com/agentaily/design-system/commit/636a97c145481663f335b261edf0e9b818c4565d) Thanks [@yarnovo](https://github.com/yarnovo)! - Sync the latest Claude Design handoff (`6Ovub8OJ`): light-first theme flip, 16 new components, and a `Queue.useQueue` hook.

  - **BREAKING (visual): default theme flipped dark → light.** `:root` is now the `paper` (light) scale; the `ink` (dark) scale moved to `[data-theme="dark"]`. Consumers who relied on the dark default must add `data-theme="dark"` to opt back in. Shadow tokens and per-component theme overrides flipped to match.
  - **New layout tokens** `--topbar-h` (52px) and `--bar-h` (48px) so app/pane bars align.
  - **16 new components across 3 new categories + existing ones** (112 total): `auth/` (`AuthDialog` + `AuthDialog.useAuth`, `AccountControl`, `SignInPage`), `settings/` (`IntegrationSettings`, `SecretField`, `StatusPill`, `TestRow`, `HelpSteps`), `review/` (`MarkupLayer`), plus `layout/` full-page shells (`AppShell`, `DesignerShell`, `DocsLayout`, `SettingsPage`), `chat/ConversationThread`, and `utilities/` (`Icon`, `BrandMark`).
  - **`Queue.useQueue`** — headless keep-sending-while-busy buffer, exposed as a static on `Queue` (pairs with `ConversationThread`).

## 0.2.0

### Minor Changes

- [#2](https://github.com/agentaily/design-system/pull/2) [`55bc378`](https://github.com/agentaily/design-system/commit/55bc378cfb13f060c46e50a95a78b91856f21889) Thanks [@yarnovo](https://github.com/yarnovo)! - Add the production-grade form layer (synced from Claude Design `RbM7-_aESQSDeDy1U-T1NQ`).

  - **New `Form` / `FormActions`** layout primitives (`gap`, `align`, `bordered`, `full`) — pure structure, no state.
  - **New `Form.useForm`** — optional, zero-dependency controlled hook with an API aligned to react-hook-form: validation modes (`onSubmit/onBlur/onChange/onTouched/all` + `reValidateMode`), per-field rules (`required/minLength/maxLength/min/max/pattern/validate`, incl. async), schema-style `validate(values)`, imperative `trigger/setError/clearErrors/setValue/getValues/watch/reset`, dual-signature `handleSubmit`, and full `formState`. Presentational controls never depend on it — swap in RHF/TanStack and they still work.
  - **New `Form.useFieldArray`** — dynamic lists (`append/prepend/remove/insert/move/replace/update`) with stable per-row `id`s.
  - **`Input`** gains a `required` prop (red asterisk on the label + native `required`); the error state now uses an `outline` ring so it survives overlay/instrumentation layers and never shifts layout.

## 0.1.1

### Patch Changes

- [`1af5ce3`](https://github.com/agentaily/design-system/commit/1af5ce3d0bb60503b666bbdc054124bf9391b91b) Thanks [@yarnbcoder-lgtm](https://github.com/yarnbcoder-lgtm)! - Verify the automated release pipeline (Changesets + OIDC trusted publishing). No functional changes — component code is identical to 0.1.0.
