Click-triggered floating panel. Closes on outside-click / Escape. Children can be a render fn getting `{ close }`.

```jsx
<Popover trigger={<Button variant="secondary">Filter</Button>} padded>
  {({ close }) => <FilterForm onApply={close} />}
</Popover>
```
