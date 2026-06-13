# Agentaily Design System — ROADMAP

按**能力**跟踪这个设计系统能做什么、接下来做什么。详细设计规范见 [DESIGN.md](./DESIGN.md);发布与运维见 [OPERATIONS.md](./OPERATIONS.md);消费指南见 [skill/SKILL.md](./skill/SKILL.md)。

## 已完成 (Shipped)

- **Foundations** — 双主题单色 tokens(**亮色 paper 优先**,`:root` 默认;暗色 ink 走 `[data-theme="dark"]`)、Space Grotesk + JetBrains Mono、4px 间距栅格、硬边圆角(2/4/8px)、品牌母题(光标 ▍ / 点阵 / 角标刻线 / mono ALL-CAPS)。布局尺寸 token `--topbar-h` / `--bar-h`。(`src/tokens`、`src/foundations`)
- **组件库 — 115 个组件 / 15 个类别**:buttons · inputs · display · feedback · overlay · layout · chat · ai · code · voice · workflow · utilities,加产品域 **settings · auth · review**。每个组件 ship `.jsx` + `.d.ts`(props 契约)+ `.prompt.md`(用法)+ `.stories.jsx`。
- **生产级表单层** — `Form` / `FormActions` + 可选的 `Form.useForm` / `Form.useFieldArray`(RHF 对齐,零依赖)。(#2)
- **无头 hooks(逻辑层)** — `Queue.useQueue`、`AuthDialog.useAuth`、`Form.useForm` / `useFieldArray`,作为静态属性挂在配对组件上,状态归调用方持有。
- **整页 shells / frames(活组件,非拷贝模板)** — `AppShell`、`DesignerShell`、`DocsLayout`、`SettingsPage`、`SignInPage`、`ConversationThread`。
- **产品域图层** — auth(`AuthDialog` / `AccountControl` / `SignInPage`)、settings(`DeepSeekCard` / `FeishuCard` 纯展示连接卡 + `SecretField` / `StatusPill` / `TestRow` / `HelpSteps`)、review(`MarkupLayer` 点选式标注)、utilities(`Icon` 统一 Lucide 集、`BrandMark`、`RotatingTagline` 动画品牌标语)。
- **对话消息 markdown 渲染** — `<Markdown>` 原语(全 GFM:段落/加粗/斜体/删除线/行内代码/代码块/有序·无序·嵌套·任务列表/引用块/表格列对齐/水平线/标题/链接 + 裸 URL;XSS 安全、流式半截容错、双主题);`<Message>` 正文接受 markdown 字符串(`markdown` prop 或字符串 children),React-node children 向后兼容。(#16)
- **分发三渠道** — npm 包 `@agentaily/design-system`(ESM、每组件一模块、可 tree-shake)、托管 Storybook(GitHub Pages)、Agent Skill(`skill/SKILL.md`)。
- **全自动发版** — Changesets + GitHub Actions(Version PR → npm trusted publishing + GitHub Release)。(#1、#3)

## 进行中 (In progress)

- 暂无。

## 待办 (Backlog)

- **自托管品牌字体** — 上生产前把 `src/tokens/fonts.css` 的 Google Fonts CDN 换成自托管 `@font-face`。
- **授权条款** — `package.json` 现为 `UNLICENSED`,公开发布前确认 license。
- **参考聊天屏** — 把新 AI 原语接进一个完整范例屏(ModelSelector 进 composer、Reasoning/ToolCall 对话回合、⌘K 命令面板)。
