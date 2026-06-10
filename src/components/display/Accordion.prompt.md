Stacked disclosure sections; the plus icon rotates to a cross when open.

```jsx
<Accordion defaultOpen={["a"]} items={[
  { id: "a", title: "What is agentaily?", content: "An AI chatbot…" },
  { id: "b", title: "Is my data private?", content: "Yes — encrypted locally." },
]} />
```

`multiple` lets several stay open. Great for FAQ sections.
