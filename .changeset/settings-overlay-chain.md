---
"@agentaily/design-system": minor
---

feat(layout,settings): 同步 Claude Design handoff `wUuoiOO9` — 设置/集成区重构为四层浮层链

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
