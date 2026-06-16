---
"@agentaily/design-system": minor
---

新增**非视觉浏览器运行时**(从 `@agentaily/web-kit` 移植,为弃用 web-kit 铺路):主题切换、国际化、跨子域偏好持久化。纯加法,现有组件 / 导出不变。

从包根 barrel 新增导出:

- **主题** — `ThemeProvider`、`useTheme`、`themeInitScript`(FOUC 防抖的 `<head>` 内联脚本,XSS 安全)
- **i18n** — `createI18n`(工厂:机制共享、各产品注入 catalogs,返回 `LocaleProvider` / `useLocale` / `useMessages`)
- **持久化** — `createStorage`(auto/cookie/local 后端,默认跨 `.agentaily.com` 子域 cookie,SSR / 隐私模式静默降级、永不抛)、`persistentState`

```js
import {
  ThemeProvider,
  useTheme,
  themeInitScript,
  createI18n,
  createStorage,
  persistentState,
} from "@agentaily/design-system";
```

代码落在 `src/runtime/{theme,i18n,persistence}/`(手写非镜像代码),从 `dist/runtime/**` ship JS + `.d.ts`。`react` / `react-dom` 仍为 peerDeps。
