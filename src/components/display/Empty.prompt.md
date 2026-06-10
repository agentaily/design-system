Empty state — framed icon + title + description + actions.

```jsx
<Empty
  icon={<ChatIcon name="message" size={20} />}
  title="No conversations yet"
  description="Start a new chat to see it here."
  actions={<Button variant="primary">New chat</Button>}
/>
```

`bordered` adds a dashed frame for in-card empties.
