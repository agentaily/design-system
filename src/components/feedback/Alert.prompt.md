Inline alert with a status bar (or a leading icon).

```jsx
<Alert variant="warn" title="Approaching limit">You've used 90% of today's messages.</Alert>
<Alert variant="danger" icon={<ChatIcon name="x" />} title="Request failed">Check your API key.</Alert>
```

For transient notifications use `Toast`; Alert is persistent/inline.
