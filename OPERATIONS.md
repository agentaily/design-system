# 运维手册 · Agentaily Design System

本仓库的运维与发布操作手册。面向维护者:本地开发、构建、发版、CI/CD、排障。
设计规范看 [DESIGN.md](./DESIGN.md),消费方接入看 [README.md](./README.md)。

---

## 0. 速查

| 项             | 值                                                       |
| -------------- | -------------------------------------------------------- |
| GitHub 仓库    | https://github.com/agentaily/design-system               |
| 在线 Storybook | https://agentaily.github.io/design-system/               |
| npm 包         | `@agentaily/design-system`(scoped,public,`UNLICENSED`)   |
| npm org        | `agentaily`(owner:`yarnovo`)                             |
| GitHub org     | `agentaily`(admin:`yarnovo`)                             |
| 默认分支       | `main`                                                   |
| 运行时         | 本地 Node ≥ 20;CI 用 Node 22                             |
| 技术栈         | React 19 · Vite 7 · Storybook 10 · Changesets · lefthook |

> ⚠️ 包尚为 `UNLICENSED`(保留所有权利)。公开发布前请确认授权条款,必要时改 `license` 并补 LICENSE 文件。

---

## 1. 本地开发

```bash
npm install          # 装依赖;prepare 钩子会自动 lefthook install 装好 git hooks
npm run storybook    # 开发服务器 http://localhost:6006
```

### npm 脚本一览

| 脚本                                                      | 作用                                         |
| --------------------------------------------------------- | -------------------------------------------- |
| `storybook`                                               | Storybook 开发服务器(6006)                   |
| `build-storybook`                                         | 静态构建 Storybook → `storybook-static/`     |
| `build:lib`                                               | 完整构建 npm 库 → `dist/`(见 §3)             |
| `gen:barrel`                                              | 重新生成 `src/index.js` 入口(扫描组件)       |
| `build:js` / `build:css` / `build:types` / `build:assets` | 库构建的各分步                               |
| `clean`                                                   | 删除 `dist/`                                 |
| `format`                                                  | Prettier 全量格式化                          |
| `changeset`                                               | 新增一个 changeset(发版用,见 §5)             |
| `release`                                                 | `changeset publish`(由 CI 调用,勿手动跑)     |
| `prepare`                                                 | `lefthook install`(`npm install` 时自动触发) |
| `prepublishOnly`                                          | `npm publish` 前自动 `build:lib`             |

---

## 2. Git Hooks（lefthook）

配置在 [`lefthook.yml`](./lefthook.yml)。`npm install` 时经 `prepare` 脚本自动装好。

| 钩子           | 动作                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| **pre-commit** | `format`:对暂存文件跑 Prettier 并自动 re-stage;`sync-barrel`:组件 `.jsx` 增删时重生成 `src/index.js` 并 `git add` |
| **pre-push**   | `build`:跑 `npm run build:lib`,构建失败则拦截推送                                                                 |

常用操作:

```bash
npx lefthook install            # 手动重装钩子(换机器/钩子丢失时)
npx lefthook run pre-commit     # 手动跑一遍 pre-commit
git commit --no-verify ...      # 紧急跳过钩子(慎用)
git push --no-verify            # 跳过 pre-push 构建(慎用)
```

> `src/index.js` 是 `gen:barrel` 自动生成的,**勿手改**。新增/删除组件后由 pre-commit 自动同步,或手动 `npm run gen:barrel`。

---

## 3. npm 库构建产物

```bash
npm run build:lib
```

ESM-only,每个组件一个模块(Vite `preserveModules`),消费方可 tree-shake;`react`/`react-dom` 为 peer dependency,被外部化。组件运行时自行注入 CSS,设计 token 单独走 `dist/styles.css`(消费方 import 一次)。

| 路径                                            | 内容                                   |
| ----------------------------------------------- | -------------------------------------- |
| `dist/index.js`                                 | ESM 入口,re-export 全部 110 个组件符号 |
| `dist/components/**/*.js`                       | 每组件独立模块(+ sourcemap)            |
| `dist/index.d.ts` + `dist/components/**/*.d.ts` | TypeScript 类型契约                    |
| `dist/styles.css`                               | 内联好的 tokens + 字体                 |
| `dist/assets/logo/*.svg`                        | 品牌 mark                              |

`dist/` 已 gitignore;`package.json` 的 `files: ["dist"]` 白名单确保发布时仍打包进去(已验证)。

消费方:

```jsx
import "@agentaily/design-system/styles.css"; // 一次,加载 tokens
import { Button, Composer } from "@agentaily/design-system";
```

---

## 4. CI/CD 工作流

| 文件                                                                   | 触发               | 作用                                             | 关键权限                                           |
| ---------------------------------------------------------------------- | ------------------ | ------------------------------------------------ | -------------------------------------------------- |
| [`.github/workflows/storybook.yml`](./.github/workflows/storybook.yml) | push `main` / 手动 | 构建并部署 Storybook 到 GitHub Pages             | `pages: write`, `id-token: write`                  |
| [`.github/workflows/release.yml`](./.github/workflows/release.yml)     | push `main`        | Changesets:开 Version PR 或发布 npm + 建 Release | `contents/pull-requests: write`, `id-token: write` |

**密钥需求:无。**

- npm 发布走 **OIDC trusted publishing**,仓库不存任何 `NPM_TOKEN`。
- `GITHUB_TOKEN` 由 Actions 自动注入。

---

## 5. 发布流程（Changesets + OIDC）

### 5.1 首次引导（一次性,scoped 包的鸡生蛋问题）

> 可信发布者要求包先存在,所以首发必须手动做一次。

1. **本地首发**(用你登录的 npm 会话,token 认证):
   ```bash
   npm whoami                 # 确认已登录(应为 yarnovo)
   npm publish                # prepublishOnly 自动 build:lib;2FA 则 --otp=123456
   npm view @agentaily/design-system   # 核对
   ```
   做完这步后,`release.yml` 在下次 push 时会看到 0.1.0 已存在 → 无可发布内容 → **变绿**(红只在首发前出现)。
2. **配 Trusted Publisher**:npmjs.com → 包 Settings → Trusted Publisher → GitHub Actions,填:
   - Organization/Repository:`agentaily/design-system`
   - Workflow filename:`release.yml`

### 5.2 日常发版(全自动)

```
改代码 → npm run changeset(选 patch/minor/major + 写一行摘要)→ 连同代码提交并开 PR
   → 合并到 main
   → 机器人自动开「Version Packages」PR(bump version + 写 CHANGELOG.md)
   → 合并那个 PR
   → release.yml 自动:OIDC 发布 npm(带 provenance)+ 创建 GitHub Release
```

维护者**不手动**改版本号、不手动 `npm publish`。只需:加 changeset + 合并两个 PR。

`npm run changeset` 会在 `.changeset/` 落一个 markdown,描述本次改动与 bump 级别,务必随代码一起提交。

---

## 6. 托管 Storybook（GitHub Pages）

- 每次 push 到 `main`,`storybook.yml` 自动 `build-storybook` 并部署。
- Pages 已启用(Source = GitHub Actions),站点:**https://agentaily.github.io/design-system/**。
- 本地预览静态产物:`npm run build-storybook && npx http-server storybook-static`。

---

## 7. 故障排查

| 现象                                                                                | 原因 / 处理                                                                                                         |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **release.yml 红,日志 `E404 ... PUT .../@agentaily/design-system - Not found`**     | 包还没首发 / 可信发布者未配。按 §5.1 手动首发即可转绿。**预期行为,非配置错误。**                                    |
| 日志出现 `No NPM_TOKEN found, but OIDC is available - using npm trusted publishing` | 正常 —— OIDC 链路已生效,这是好消息。                                                                                |
| 本地 `npm publish` 卡在要验证码                                                     | 账号开了 2FA,用 `npm publish --otp=<6位码>`。                                                                       |
| pre-push 被 `build:lib` 失败拦住                                                    | 库构建坏了,先 `npm run build:lib` 本地修复;勿用 `--no-verify` 绕过。                                                |
| `changeset version` 在本地报 GitHub token 相关错误                                  | changelog-github 需要 token,**版本生成应交给 CI**(release.yml 有 `GITHUB_TOKEN`),本地不要手动 `changeset version`。 |
| Storybook/组件缺字体                                                                | 字体是 Google Fonts CDN 替身(见 `src/tokens/fonts.css`)。离线/生产环境替换为自托管 `@font-face`。                   |
| 钩子没生效                                                                          | `npx lefthook install` 重装;确认 `.git/hooks/pre-commit` 由 lefthook 写入。                                         |
| CI 报 Node 20 actions 弃用警告                                                      | 非阻断。2026-06-16 起 GitHub 强制 Node 24,届时升级 `actions/*` 版本。                                               |

---

## 8. 常见运维任务 Cookbook

**给 npm org 加成员**(让别人也能发版)
npmjs.com → Organizations → `agentaily` → Members → Invite。CI 发布走 OIDC 不需要成员 token。

**回滚一次发布**
npm 不建议 unpublish(72h 限制且影响下游)。优先**前滚**:修复 → 加 changeset → 发补丁版。确需弃用:`npm deprecate @agentaily/design-system@<版本> "理由"`。

**新增一个组件**
在 `src/components/<类别>/` 加 `<Name>.jsx` + `<Name>.d.ts` + `<Name>.prompt.md` + `<Name>.stories.jsx`。提交时 pre-commit 自动把它同步进 `src/index.js`。

**改了组件想发版**
`npm run changeset`(选 bump)→ 提交 → 合并;后续交给机器人(§5.2)。

**临时本地验证库产物**
`npm run build:lib && npm pack`(生成 tgz,可 `npm i ./agentaily-design-system-x.y.z.tgz` 到别处试装)。

---

## 9. 关键约定回顾

- 默认分支 `main`,直推会触发钩子与两条 workflow;发版通过 PR + Changesets,不手动改版本。
- `dist/`、`src/index.js`、`CHANGELOG.md`(由 Changesets 写)等为生成物,勿手改 `dist`/`src/index.js`。
- 发布零密钥(OIDC);唯一需要人工的是 §5.1 的一次性引导。
