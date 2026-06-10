# agentaily design system

Agentaily(AI chatbot)设计系统的 Storybook 实现。品牌一句话:**极客风格,简约,大气,科技感**。

设计规范全文见 [DESIGN.md](./DESIGN.md)(来自 claude.ai/design 的 handoff)。

## 开发

```bash
npm install
npm run storybook        # 开发服务器 http://localhost:6006
npm run build-storybook  # 静态构建到 storybook-static/
```

## 结构

```
.storybook/          Storybook 配置(深色默认 + 工具栏 ink/paper 双主题切换)
src/styles.css       全局入口,@import 所有 token
src/tokens/          颜色 / 字体 / 间距 / 效果 / 基础母题 CSS 变量
src/assets/logo/     品牌 mark SVG(白/黑)
src/foundations/     Foundations stories(Intro / Colors / Typography / Spacing / Effects / Motifs)
src/components/      11 个类别的组件源码 + stories
  <cat>/<Name>.jsx        组件(自包含,注入自身 CSS,只消费 token 变量)
  <cat>/<Name>.d.ts       props 契约
  <cat>/<Name>.prompt.md  用法说明
  <cat>/<Name>.stories.jsx
```

## 约定

- 暗色 ink 是默认主题(`:root`);亮色 paper 走 `[data-theme="light"]`,用 Storybook 工具栏切换。
- 单色反相 accent,无渐变;语义色(--ok/--warn/--danger)只作状态。
- 圆角 2/4/8px;层级靠 1px hairline 边框;阴影只给浮层。
- 文案:平实精确,无 emoji,具体数字即文案("0.4s"、"128k")。
- 字体经 Google Fonts CDN 引入(Space Grotesk + JetBrains Mono),生产环境请替换 `src/tokens/fonts.css` 为自托管 @font-face。
