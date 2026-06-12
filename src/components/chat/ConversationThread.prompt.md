Pure-render chat surface — header, empty state w/ hint chips, auto-scrolling thread, pinned Composer. **State lives outside the component:** the caller holds the queue (`Queue.useQueue`) and injects it as `controller`.

```jsx
function Designer() {
  const [messages, setMessages] = React.useState([]);
  const [draft, setDraft] = React.useState("");
  const push = (m) => setMessages((ms) => [...ms, m]);

  // the queue is the single state source — held here, not inside the thread
  const q = Queue.useQueue({
    onFirst: async (text) => {
      push({ role: "user", text });
      await runBuild(text);
    },
    onBatch: async (texts) => {
      texts.forEach((t) => push({ role: "user", text: t }));
      await runBatch(texts);
    },
  });

  return (
    <>
      {/* same queue, driven from outside the thread */}
      <button disabled={q.busy} onClick={() => q.enqueue("发布并生成链接")}>
        发布
      </button>

      <ConversationThread
        controller={q}
        messages={messages}
        draft={draft}
        onDraftChange={setDraft}
        hints={["做一个活动报名表", "加一个邮箱字段"]}
        renderTurn={(m, i, ctx) => {
          if (m.role === "user")
            return (
              <Message role="user">
                <p>{m.text}</p>
              </Message>
            );
          if (m.kind === "reasoning")
            return (
              <Reasoning
                steps={m.steps}
                duration={m.duration}
                streaming={m.streaming}
                defaultOpen={m.streaming}
              />
            );
          if (m.kind === "tool")
            return <ToolCall name={m.name} args={m.args} result={m.result} status={m.status} />;
          return (
            <Message role="assistant" streaming={ctx.streaming}>
              <p>{m.text}</p>
              {m.suggestions && !ctx.streaming ? (
                <Suggestions items={m.suggestions} onSelect={q.enqueue} />
              ) : null}
            </Message>
          );
        }}
      />
    </>
  );
}
```

- **`controller`** (a `Queue.useQueue` value) is how the thread sends, shows the buffer, and reads busy. Because the caller owns it, the same queue drives buttons/markup/chips outside the thread, and `q.busy` is readable anywhere. The composer stays live while busy; `busyPlaceholder` shows during draining.
- **`renderTurn(message, index, ctx)`** — render rich turns (Reasoning / ToolCall / Suggestions / Message). `ctx = { streaming, isLast }`; messages carry any fields (`kind`, `steps`, `name`, `args`, `result`, `status`, `suggestions`, …). Omit it for plain-text turns (per-message `streaming` still drives the cursor).
- Empty-state hint chips enqueue through the controller. Call `controller.reset()` to clear the buffer + re-bootstrap (new chat).
