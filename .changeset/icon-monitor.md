---
"@agentaily/design-system": minor
---

feat(icon): Icon 集新增 `monitor`(显示器)图标 + 补全 `IconName` 漏列的 `menu`

往 `components/utilities/Icon` 的 `PATHS` 集新增 `monitor`(显示器 / 桌面屏幕)glyph —— Lucide geometry(屏幕矩形 + 底座短脚:`<rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />`),与现有图标同 24px grid / stroke 2 / round caps / 单色 `currentColor` / fill none。下游 `form-design` 预览区「桌面」视图切换按钮可换回 `<Icon name="monitor" />`,不再内联设计稿 SVG。

`IconName` 联合类型同步加 `"monitor"`;并顺手补回此前漏列的 `"menu"`(`PATHS` 一直有 `menu` glyph 但类型里漏了)—— `IconName` 现与 `PATHS` 对齐、清掉漂移。

Icon 集 glyph 数 46 → 47;**barrel 模块数不变**(Icon 仍是单个 `.jsx`,组件导出数不变)。
