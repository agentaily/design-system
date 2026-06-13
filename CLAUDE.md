# CLAUDE.md — Agentaily Design System(组件库本体)

这是上游**组件库** `@agentaily/design-system`(单色亮色优先的 React 组件库 + Storybook)。
本文是入口与约定速查;细节各有专档,别在这里重复。

## 文档地图

- **品牌 / 设计规范全文** → [DESIGN.md](./DESIGN.md)(来自 claude.ai/design 的 handoff 镜像)
- **能力地图(已完成 / 进行中 / 待办)** → [ROADMAP.md](./ROADMAP.md)
- **发版 / 下游通知** → [RELEASE.md](./RELEASE.md)
- **运维手册(构建产物 / CI / 首发引导 / 故障排查)** → [OPERATIONS.md](./OPERATIONS.md)
- **测试分层 / 选型 / 护栏** → [TESTING.md](./TESTING.md)(逻辑组件的 `vitest` 单测 gate;测试落 `tests/`,别动镜像组件)
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
  pre-push 跑 `npm test`(单测 gate)+ `npm run build:lib` 拦截坏构建。验证改动:
  `npm test && npm run build:lib && npm run build-storybook`(逻辑组件还要跑单测,见 `TESTING.md`)。
- 组件计数有两个口径:barrel 模块数(= `.jsx` 文件数,见 package.json / README / ROADMAP / skill)
  与 DESIGN.md 的「component exports」数(含 hook / helper 等子导出)。增删组件时**两处都要同步**。
- 改公开能力(组件 / 导出 / prop / 默认值)时,同一次改动里更新消费文档:对应 `.prompt.md`、
  `DESIGN.md`、`README.md`、`skill/SKILL.md`、`ROADMAP.md`、组件计数,并加 changeset。

## Sub agents(项目级分工 · 镜像库裁剪版)

这个仓库有项目级 sub agents,见 [`.claude/agents/README.md`](./.claude/agents/README.md)。**注意:它仍不是
`form-design` 那种双循环 TDD 产品** —— 没有 `src/core` 逻辑层、没有 SPEC/Gherkin `features/`、没有
integration/e2e 套件。组件是 Claude Design handoff 的 **verbatim 镜像**,仓库自写的只有 `.stories.jsx`
**和 `tests/` 里的单测**。但本仓长出了第一个**有逻辑的原语** —— `<Markdown>`(parser + XSS 净化 + 流式容错),
所以正如 agents/README 早写好的预言,**`vitest` 单测 gate + 重引 `implementer` + `TESTING.md`** 都已落地。
经典 5 角色现为 **5 个**:

| Agent           | 干什么                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `design-syncer` | 用 `design-sync` skill 落地 handoff(三路合并进 `.design-baseline/`)+ 写 stories + 同步计数/文档/changeset。镜像库的「实现」角色 |
| `implementer`   | 逻辑原语(parser/sanitizer/有状态 hook,今天是 `<Markdown>`)的**单测内环**:红→绿→重构,**只动 `tests/`**,不碰镜像组件文件          |
| `reviewer`      | 独立只读对抗 review:镜像忠实度、四件套齐不齐、双主题、token-only、barrel 没被手改、**单测质量 + 安全契约**                      |
| `release-eng`   | Changesets 自动发版 · lefthook · Storybook→Pages · 破坏性变更通知下游(见 `RELEASE.md`)                                          |
| `pr-analyst`    | PR triage / 路由(只读)                                                                                                          |

**仍裁掉的(3 个)**:`spec-architect`(无 SPEC/features,「该做什么」来自上游 Claude Design)、
`outer-tester`(有 unit 但无 integration/e2e 套件,没 `features/` 可 realize)、`designer`(本仓**就是**组件库,
不消费别的 DS;落 handoff 由 `design-syncer` 干)。理由详见 agents/README「Why this roster」。**别**往这个仓库
重新塞这三个角色——它们没东西可 own。验证靠 `npm test`(逻辑组件单测)+ `npm run build:lib && npm run build-storybook`

- Storybook 双主题肉眼看(分层与护栏见 `TESTING.md`)。

## 自主运作约定(就绪 + 双轮询)

被 `fleet` 起成常驻终端后,读完本 `CLAUDE.md` + `.claude/agents/README.md` 即**就绪**,开始**双轮询**:

- **① 自己仓的 PR(任务工单)**:`gh pr list --label autopilot --draft` → `pr-analyst` 分析 → 按性质路由
  (handoff-sync → `design-syncer` · stories/docs → `design-syncer` 轻量 · 发版/CI → `release-eng` ·
  破坏性通知 → `release-eng` · 缺组件 / 设计方向 / handoff 不全 → **叫人**)→ worktree 隔离 +
  落地 + 自测(`npm test` + `build:lib` + `build-storybook`)+ push 到 PR 分支 + 等 CI。
- **② 上游 Claude Design**:本仓的「上游」是 claude.ai/design 的设计项目(不是 NPM 包)。**自动操作
  claude.ai/design 目前不稳定**,所以这一轮不赌全自动 —— 有新 handoff 链接时把分析做好、**叫人去点几下**
  拿链接,再 `design-syncer` 落地。(本仓是发布**端**而非消费端,不轮询自身的 NPM 发版;下游 `form-design`
  那边轮询本包的新版本。)

**命门(不自主,叫人)**:合并 PR · 设计方向 / 缺组件拍板(上游 Claude Design)· 触发不可逆发布
(合 Version PR / 发 npm)· 给下游开破坏性迁移 PR · 要凭证 / 点 GUI。push 到自己 draft PR 分支可自主
(仍要人 review + 合)。轮询用 `ScheduleWakeup` 控节奏(空闲拉长省钱)。
