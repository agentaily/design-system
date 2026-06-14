# agentaily design system

Agentaily(AI chatbot)设计系统:120 个 React 组件 + Storybook,单色亮色优先(暗色可切)。品牌一句话:**极客风格,简约,大气,科技感**。

📖 **在线 Storybook:** https://agentaily.github.io/design-system/

设计规范全文见 [DESIGN.md](./DESIGN.md)(来自 claude.ai/design 的 handoff);运维与发布操作见 [OPERATIONS.md](./OPERATIONS.md)。

## 开发

```bash
npm install
npm run storybook        # 开发服务器 http://localhost:6006
npm run build-storybook  # 静态构建到 storybook-static/
```

## 分发(三条渠道)

### ① npm 组件库

作为 React 组件库被其他项目消费。ESM-only,每个组件一个模块(`preserveModules`),消费方可 tree-shake 未用到的组件;`react` / `react-dom` 为 peer dependency。

```bash
npm run build:lib   # 产出 dist/:每组件一个 .js + index.d.ts + styles.css + assets/
```

产物结构:

| 路径                                            | 内容                                      |
| ----------------------------------------------- | ----------------------------------------- |
| `dist/index.js`                                 | ESM 入口,re-export 全部 120 个组件符号    |
| `dist/components/**/*.js`                       | 每个组件独立模块(含运行时 CSS 注入)       |
| `dist/index.d.ts` + `dist/components/**/*.d.ts` | TypeScript 类型契约                       |
| `dist/styles.css`                               | 内联好的 tokens + 字体,消费方 import 一次 |
| `dist/assets/logo/*.svg`                        | 品牌 mark                                 |

消费方用法:

```jsx
import "@agentaily/design-system/styles.css"; // 一次,加载 tokens
import { Button, Composer, Reasoning } from "@agentaily/design-system";
```

**版本与发布走 [Changesets](https://github.com/changesets/changesets)**:

- 改动值得发版时,跑 `npm run changeset` 选 patch/minor/major 并写一行摘要,把生成的 `.changeset/*.md` 跟代码一起提交。
- `.github/workflows/release.yml` 在 push 到 `main` 时,要么开一个「Version Packages」PR(消费 changeset、bump 版本、写 `CHANGELOG.md`),要么在该 PR 合并后**发布到 npm**(OIDC trusted publishing + provenance,仓库零 token)并创建 GitHub Release。
- **首发为引导步骤**:scoped 包要先存在才能配可信发布者,所以 v0.1.0 先本地手动 `npm publish` 一次;之后到 npmjs.com 给该包加 Trusted Publisher(org `agentaily` / repo `design-system` / workflow `release.yml`),后续全自动。

注:`package.json` 的 `license` 暂为 `UNLICENSED`,公开发布前请确认授权条款。

### ② 托管 Storybook(活文档)

`.github/workflows/storybook.yml` 在推送到 `main` 时自动 `build-storybook` 并部署到 GitHub Pages —— 已上线:**https://agentaily.github.io/design-system/**。

### ③ Agent Skill

`skill/SKILL.md` 是一个自包含的 Claude Code / Agent Skill —— 面向**消费者**的使用指南(品牌规则 + 如何用 `@agentaily/design-system` 包 + Storybook 目录链接),不含仓库内部实现。把 `skill/` 软链到 `~/.claude/skills/agentaily-design` 即可全局调用:

```bash
ln -s "$PWD/skill" ~/.claude/skills/agentaily-design
```

## 结构

```
.storybook/          Storybook 配置(浅色默认 + 工具栏 paper/ink 双主题切换)
src/styles.css       全局入口,@import 所有 token
src/tokens/          颜色 / 字体 / 间距 / 效果 / 基础母题 CSS 变量
src/assets/logo/     品牌 mark SVG(白/黑)
src/foundations/     Foundations stories(Intro / Colors / Typography / Spacing / Effects / Motifs)
src/components/      15 个类别的组件源码 + stories(含 auth / settings / review 产品域)
  <cat>/<Name>.jsx        组件(自包含,注入自身 CSS,只消费 token 变量)
  <cat>/<Name>.d.ts       props 契约
  <cat>/<Name>.prompt.md  用法说明
  <cat>/<Name>.stories.jsx
tests/               逻辑原语的单测(vitest;镜像组件之外,design-sync 不覆盖)— 见 TESTING.md
```

测试约定(分层 / 选型 / 护栏)见 [TESTING.md](./TESTING.md):多数组件是展示型镜像,无逻辑可测;`vitest` 单测只覆盖**有逻辑的原语**(解析 / 净化 / 有状态 hook,目前是 `<Markdown>`)。`npm test` 跑单测,`npm run test:watch` 本地内环。

## 约定

- 亮色 paper 是默认主题(`:root`);暗色 ink 走 `[data-theme="dark"]`,用 Storybook 工具栏切换。
- 单色反相 accent,无渐变;语义色(--ok/--warn/--danger)只作状态。
- 圆角 2/4/8px;层级靠 1px hairline 边框;阴影只给浮层。
- 文案:平实精确,无 emoji,具体数字即文案("0.4s"、"128k")。
- 字体经 Google Fonts CDN 引入(Space Grotesk + JetBrains Mono),生产环境请替换 `src/tokens/fonts.css` 为自托管 @font-face。
