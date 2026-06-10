Tool / function-call display: mono name(), status pill (running/done/error), expandable arguments + result.

```jsx
<ToolCall name="search_web" status="running" args={{ query: "CAP theorem" }} />
<ToolCall name="get_weather" status="done" args={{ city: "SF" }} result={{ temp: 14, unit: "C" }} defaultOpen />
```

Objects are pretty-printed as JSON. Stack multiple in sequence for multi-step agent runs.
