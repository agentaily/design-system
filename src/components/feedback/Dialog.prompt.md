Modal on a blurred overlay; mono uppercase header with ESC ✕ close.

```jsx
<Dialog open={open} title="Delete conversation" onClose={close}
  footer={<><Button variant="ghost" onClick={close}>Cancel</Button><Button variant="danger">Delete</Button></>}>
  This cannot be undone.
</Dialog>
```

`inline` renders the panel without the overlay (specimens/docs).
