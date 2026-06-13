One chat turn. User = right-aligned card; assistant = full-width prose under a mono "AGENTAILY" label.

```jsx
<Message role="user"><p>What is an agentaily?</p></Message>
<Message role="assistant" time="14:02" streaming><p>A statement taken to be true…</p></Message>
```

`streaming` appends the blinking block cursor.

The body accepts markdown: pass a string as `children` or use the `markdown` prop and it renders through `<Markdown>` (lists, bold/italic, inline code, code blocks, links). Passing React nodes still works unchanged.

````jsx
<Message
  role="assistant"
  streaming
  markdown={"Steps:\n\n- parse **input**\n- call `run()`\n\n```js\nrun();\n```"}
/>
````
