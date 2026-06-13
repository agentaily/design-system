import React from "react";
import { Markdown } from "./Markdown.jsx";

const KITCHEN_SINK = `## Reasoning, distilled

Agentaily answers in **plain language** first, then shows its work — *conclusion*
first, then derivation. Inline \`code\` and ~~hedging~~ both render.

- parse the **input**
  - call \`run()\`
    1. validate
    2. execute
- stream the result

See https://example.com for the full spec, or the [API reference](https://api.agentaily.com).`;

const TABLE = `| capability | state | notes |
| :--------- | :---: | ----: |
| tables | done | column alignment |
| streaming | done | half rows render |
| images | inert | placeholder chip |`;

const LISTS_TASKS = `Mixed nested lists and GitHub task lists:

1. first
   - nested unordered
   - with a second item
2. second
   1. deep ordered
   2. and another

- [x] design approved
- [x] verifier green
- [ ] merged + published`;

const QUOTES_RULES = `> Confidence through restraint — Agentaily never sells, it states.
>
> > Nested quote: 先给结论，再给推导。

---

A fenced block survives below the rule:

\`\`\`js
const res = await fetch("/v1/chat", { method: "POST" });
for await (const chunk of res.body) render(decode(chunk));
\`\`\``;

// Half table, unclosed bold, and an unterminated fence — nothing throws.
const STREAMING_PARTIAL = `Streaming a response right now:

| cap | sta
| :-- | :-

This is **bold that hasn't closed yet and a half \`\`\`js
run(`;

export default {
  title: "Chat/Markdown",
  component: Markdown,
  argTypes: {
    content: { control: "text" },
  },
  args: { content: KITCHEN_SINK },
};

export const Default = {};

export const Tables = {
  args: { content: TABLE },
};

export const ListsAndTasks = {
  args: { content: LISTS_TASKS },
};

export const BlockquotesAndRules = {
  args: { content: QUOTES_RULES },
};

export const StreamingPartial = {
  args: { content: STREAMING_PARTIAL },
};
