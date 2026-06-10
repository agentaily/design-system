import React from "react";
import { CodeBlock } from "./CodeBlock.jsx";

const JS_STREAM = `const res = await fetch("/v1/chat", {
  method: "POST",
  body: JSON.stringify({ model: "agentaily-2", stream: true }),
});
for await (const chunk of res.body) {
  render(decode(chunk));
}`;

const PY_COSINE = `def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    return dot / (norm(a) * norm(b))`;

const SH_CURL = `curl -N https://api.agentaily.com/v1/chat \\
  -H "authorization: Bearer $AGENTAILY_KEY" \\
  -d '{"model":"agentaily-2","stream":true}'`;

export default {
  title: "Chat/CodeBlock",
  component: CodeBlock,
  argTypes: {
    lang: { control: "text" },
  },
  args: { lang: "js", code: JS_STREAM },
};

export const Default = {};

export const Python = {
  args: { lang: "python", code: PY_COSINE },
};

export const Shell = {
  args: { lang: "bash", code: SH_CURL },
};

export const SingleLine = {
  args: { lang: "python", code: "print('hello')" },
};
