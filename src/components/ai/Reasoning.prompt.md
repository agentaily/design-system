Collapsible chain-of-thought block — the AI "thinking" surface. Streaming shows a blinking cursor; settled shows duration + expandable steps.

```jsx
<Reasoning streaming steps={["拆解问题为三个子目标", "检索相关上下文", "综合答案"]} />
<Reasoning duration="3.2s" steps={["先确认约束：延迟优先", "排除批处理方案", "选定流式架构"]} />
```

Place directly above an assistant Message's content. Keep steps terse.
