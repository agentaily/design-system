Square-marked radio group. Options may carry a `description` line.

```jsx
<RadioGroup name="plan" value={plan} onChange={setPlan}
  options={[
    { value: "free", label: "Free", description: "50 messages/day" },
    { value: "pro", label: "Pro", description: "Unlimited + memory" },
  ]} />
```

Use `row` for short horizontal choices.
