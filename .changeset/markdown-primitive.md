---
"@agentaily/design-system": minor
---

feat(chat): 新增 `<Markdown>` 原语 + `<Message>` 正文支持 markdown 渲染

新增可组合的 `<Markdown>` 原语(`components/chat/Markdown`),把模型输出的 markdown 字符串渲染成排版好的、双主题的 React 节点:段落 + 软换行、加粗、斜体、删除线、行内代码、围栏代码块(复用 `CodeBlock`)、有序/无序/嵌套/任务列表、引用块(可嵌套)、GFM 表格(列对齐 + 溢出横向滚动)、水平线、`#`/`##`/`###` 标题、`[链接](url)` + 裸 URL 自动链接;图片 `![]()` 渲染为惰性占位 chip(不抓取)。

`<Message>` 正文现在接受 markdown 字符串 —— 新增 `markdown` prop,或直接把字符串作为 children —— 经 `<Markdown>` 渲染;传 React-node children 仍原样渲染,**完全向后兼容**。

安全:解析成 React 元素树后发出,不用 `dangerouslySetInnerHTML`(所有文本自动转义),链接 href 做协议净化(丢弃 `javascript:` / `data:` / `vbscript:`)。流式容错:半截表格 / 半截引用 / 未闭合标记与围栏降级为字面或部分渲染,流式中途不抛错。

Net +1 component → 115 barrel modules / 148 exports。
