# CLAUDE.md — Agentaily Design System(组件库本体)

这是上游**组件库** `@agentaily/design-system`(单色亮色优先的 React 组件库 + Storybook)。
本文是入口与约定速查;细节各有专档,别在这里重复。

## 文档地图

- **品牌 / 设计规范全文** → [DESIGN.md](./DESIGN.md)(来自 claude.ai/design 的 handoff 镜像)
- **能力地图(已完成 / 进行中 / 待办)** → [ROADMAP.md](./ROADMAP.md)
- **发版 / 下游通知** → [RELEASE.md](./RELEASE.md)
- **运维手册(构建产物 / CI / 首发引导 / 故障排查)** → [OPERATIONS.md](./OPERATIONS.md)
- **消费者使用指南(给下游用的 skill)** → [skill/SKILL.md](./skill/SKILL.md)

## 关键约定(改这个仓库前必读)

- **组件是 Claude Design handoff 的 verbatim 镜像**:每个组件 ship `.jsx` + `.d.ts`(props 契约)
  - `.prompt.md`(用法)+ 仓库自写的 `.stories.jsx`。`.jsx` 把原型的 `window.AxiomDesignSystem_*`
    解构翻成 ES import;`.d.ts` 原样拷贝(prettier 不碰 `.d.ts`,也不碰 `DESIGN.md`)。
- **落地新 / 改版 handoff 走 `design-sync` skill**(三路合并:base=上次快照 `.design-baseline/`,
  new=新 handoff,local=本仓实现),别手搓界面。
- **`src/index.js` 是自动生成的**(`npm run gen:barrel`),别手改;lefthook pre-commit 在 staged
  含 `src/components/**/*.jsx` 时会自动重生成并 re-stage。
- **别跑全仓 prettier**。lefthook pre-commit 只对 staged 文件按 `printWidth 100` 自动 prettier;
  pre-push 跑 `npm run build:lib` 拦截坏构建。验证改动:`npm run build:lib && npm run build-storybook`。
- 组件计数有两个口径:barrel 模块数(= `.jsx` 文件数,见 package.json / README / ROADMAP / skill)
  与 DESIGN.md 的「component exports」数(含 hook / helper 等子导出)。增删组件时**两处都要同步**。
- 改公开能力(组件 / 导出 / prop / 默认值)时,同一次改动里更新消费文档:对应 `.prompt.md`、
  `DESIGN.md`、`README.md`、`skill/SKILL.md`、`ROADMAP.md`、组件计数,并加 changeset。
