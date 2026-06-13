Renders a model's markdown **string** into typeset React nodes — paragraphs + soft breaks, **bold**, _italic_, ~~strikethrough~~, `inline code`, fenced code blocks, unordered/ordered/nested (mixed) lists, GitHub task lists (`- [ ]` / `- [x]`), blockquotes (nested), GFM tables with per-column alignment, horizontal rules, `#`/`##`/`###` headings, `[links](url)`, and bare-URL autolinks. Images `![alt](url)` show an inert placeholder chip — never fetched. Theme-aware (light default, `data-theme="dark"`), built entirely from design tokens.

Safe by construction: parses to React elements only (no `dangerouslySetInnerHTML`, so all text is auto-escaped), sanitizes link schemes, and degrades unterminated/streamed markdown — half tables, half blockquotes, unclosed fences/marks — to literal or partial output instead of crashing.

````jsx
const md =
  "## Plan\n\n" +
  "- parse the **input**\n" +
  "  - call `run()`\n" +
  "    1. validate\n    2. execute\n\n" +
  "- [x] design done\n- [ ] ship it\n\n" +
  "> note: falls back to plain text on error\n\n" +
  "| cap | state |\n| :-- | ---: |\n| tables | done |\n\n" +
  "```js\nrun();\n```\n\nSee https://example.com.";

<Markdown content={md} />;
````

Standalone, or let `<Message>` drive it — a **string** child (or the `markdown` prop) is auto-rendered through `<Markdown>`; React-node children stay raw for back-compat:

```jsx
<Message role="assistant" streaming markdown={partialStream} />
```

Use for any model-output surface (chat assistant prose, reasoning, tool results). For a single code block on its own, use `<CodeBlock>` directly.
