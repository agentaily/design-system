Auto-scrolling thread container. Sticks to the bottom as messages stream; if the user scrolls up, a "Jump to latest" pill appears.

```jsx
<Conversation style={{ height: 480 }}>
  {messages.map(m => <Message key={m.id} role={m.role}>{m.text}</Message>)}
</Conversation>
```
