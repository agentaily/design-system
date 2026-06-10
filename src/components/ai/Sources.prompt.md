Cited sources list + inline Citation chips.

```jsx
<Message role="assistant">
  <p>CAP 定理由 Eric Brewer 提出<Citation index={1} href="#s1" />，后被 Gilbert 与 Lynch 形式化证明<Citation index={2} href="#s2" />。</p>
</Message>
<Sources sources={[
  { title: "Brewer's CAP Theorem", url: "https://example.com/cap" },
  { title: "Gilbert & Lynch, 2002", url: "https://example.com/proof" },
]} />
```

Citations are numbered chips that invert on hover; the Sources card lists the full references.
