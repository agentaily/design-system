# 发版 · 下游通知 — Agentaily Design System

这个仓库是**上游组件库**(`@agentaily/design-system`)。本文讲两件事:① 怎么发版(全自动);
② 破坏性变更怎么通知下游。运维细节(首发引导、OIDC、故障排查)见 [OPERATIONS.md](./OPERATIONS.md) §5。

---

## ① 发版机制(Changesets 全自动)

发版是 **hands-off** 的:维护者只做「加 changeset + 合 feature PR」,其余全自动。

```
改代码 → npm run changeset(选 patch/minor/major + 写一行摘要)→ 把 .changeset/*.md 连代码一起提交、开 PR
  → feature PR 合并到 main
  → 发版机器人(agentaily-release-bot)自动开一个「Version Packages」PR(消费 changeset:bump version + 写 CHANGELOG.md)
  → 该 Version PR 的 CI 自动跑,绿了 auto-merge 自动合(无需人点批准)
  → release.yml 自动执行 `changeset publish`:OIDC 可信发布到 npm(带 provenance)+ 打 git tag + 建 GitHub Release
```

- **版本级别(0.x 语义)**:本包仍在 `0.x`。约定:
  - **破坏性变更(删组件 / 改签名 / 移除默认行为)→ `minor`**(如 0.5.0 → 0.6.0)。0.x 下没有「major 之前不破坏」的承诺,minor 即可承载 breaking,但 changeset 摘要里**必须显式标 `BREAKING`** 并写迁移说明。
  - **向后兼容的新增 / 修复 → `patch`**(加 prop、加组件、不改既有行为)。
- **维护者不手动**改版本号、不手动 `npm publish`、不手动合 Version PR。
- **本地不要跑 `changeset version`**(changelog-github 需要 token,交给 CI)。
- ⚠️ **开分支前先 `git fetch` 并把工作基于 `origin/main`**。本地 `main` 落后会让 changeset 把版本算错(基于过期版本号 bump),需 rebase 到 `origin/main` 才对。用 worktree 时:`git worktree add <dir> origin/main`。

凭证与权限(org 级 `RELEASE_BOT_APP_ID` / `RELEASE_BOT_PRIVATE_KEY`、为何必须用 App token、Allow auto-merge 开关)见 OPERATIONS.md §4–5。

---

## ② 破坏性变更的下游通知流程

**原则(业界最佳实践):破坏性变更由上游负责通知下游。** 下游不可能盯着上游每次发版的 diff;
谁制造了不兼容,谁就主动把受影响方找出来、逐个开 PR 通知。向后兼容的增量(加 prop / 加组件)**不必**主动通知 —— 下游按需升级即可。

### 什么算「需要通知」

| 变更类型            | 例子                                        | 通知?               |
| ------------------- | ------------------------------------------- | ------------------- |
| 删除导出            | 移除 `IntegrationSettings`                  | ✅ 必须             |
| 改签名 / 改默认行为 | 必填 prop 改名、`BrandMark cursor` 默认翻转 | ✅ 必须             |
| 视觉破坏            | 默认主题 dark → light                       | ✅ 必须             |
| 向后兼容新增        | 加一个组件、加可选 prop                     | ❌ 不必(下游按需升) |

### 怎么找到「所有下游」—— 扫 monorepo 邻居,别手维护清单

下游 = `~/agentaily/` 下任何 `package.json` 把 `@agentaily/design-system` 列为依赖的仓库。
**不要手动维护下游清单**(会过期),每次发破坏性变更时现扫:

```bash
# 列出所有依赖本包的下游仓库(排除本包自身;只匹配「作为依赖」的版本行,不匹配 name 字段)
grep -l '"@agentaily/design-system": "[\^~0-9]' /Users/yarnb/agentaily/*/package.json
```

> 当前(2026-06)唯一下游:**`form-design`**(`~/agentaily/form-design`)。

### 通知 = 给每个下游各开一个 PR

- **每个下游仓库各开一个 PR**,而不是在上游一个 PR 里改所有人。
- PR 内容:说明破坏点 + 迁移做法(把旧用法换成新用法),让下游 review 后自己合。
- **每个下游自己消费、自己开 PR、自己合** —— 上游负责「发起通知 + 给出迁移路径」,落地权在下游。
- 把本次破坏点链到对应的 changeset / CHANGELOG 条目,别在 PR 里复述全部细节。

> 注意:`form-design` 当前 pin 的是 `^0.2.0`(`^` 在 0.x 下只放行 `>=0.2.0 <0.3.0`),
> 不会自动收到 0.6.0 —— 升级版本范围本身就是下游 PR 的一部分。

### 谁来开下游 PR

由**上游这次破坏性变更的负责人**发起通知;但**不要越俎代庖直接把下游仓库改完合掉** ——
下游有自己的会话 / 维护者来采用与验证(例:本轮连接卡的破坏性变更,由 `form-design` 自己的会话采用两张卡)。
