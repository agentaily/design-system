Queued prompts — running item highlighted, pending removable. The display, plus a headless driver hook (`Queue.useQueue`) for "keep typing & sending while the agent is busy; buffered prompts flush together".

```jsx
const { Queue, Composer } = window.AxiomDesignSystem_7fc962;

// display only:
<Queue
  items={[{ text: "Summarize PR", status: "running" }, "Write changelog"]}
  onRemove={remove}
/>;
```

### Queue.useQueue — continuous send + buffer

The first prompt bootstraps via `onFirst` (run once); everything sent **while busy** accumulates and drains together as a buffer via `onBatch`. The hook owns the queue + pump; your callbacks own the app-specific work (push messages, run tools).

```jsx
function Chat() {
  const { queue, busy, enqueue, remove } = Queue.useQueue({
    onFirst: async (text) => {
      pushUser(text);
      await runBuild(text);
    }, // first message
    onBatch: async (texts) => {
      texts.forEach(pushUser);
      await runBatch(texts);
    }, // buffered batch
  });
  const [draft, setDraft] = React.useState("");
  const send = () => {
    enqueue(draft);
    setDraft("");
  };

  return (
    <>
      {queue.length > 0 && <Queue title="缓冲区·下一轮一起发" items={queue} onRemove={remove} />}
      <Composer
        value={draft}
        onChange={setDraft}
        onSend={send}
        placeholder={busy ? "可继续输入，会收进缓冲区一起处理…" : "继续描述要怎么改…"}
      />
    </>
  );
}
```

This is exactly the queue/pump that the Scripts and Forms designers each hand-rolled — now a single upstream hook. Call `reset()` to clear the buffer and re-bootstrap (e.g. "new chat").
