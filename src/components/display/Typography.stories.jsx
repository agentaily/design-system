import React from "react";
import { Prose, Text, Typography } from "./Typography.jsx";

export default {
  title: "Display/Typography",
  component: Prose,
  args: { children: "Agentaily answers in plain text. No decoration, no filler." },
};

export const Default = {};

export const Article = {
  render: () => (
    <Prose>
      <h1>Streaming responses</h1>
      <p>
        Tokens render as they arrive. Median time to first token is <strong>0.4s</strong>; a full
        answer usually lands in under 6s.
      </p>
      <h2>How it works</h2>
      <p>
        The client opens one connection per turn and reads <code>text/event-stream</code> chunks.
        See the <a href="#">streaming reference</a> for frame formats.
      </p>
      <ul>
        <li>Partial tokens are buffered until a word boundary.</li>
        <li>Code blocks render once the closing fence arrives.</li>
        <li>Interrupted turns keep everything received so far.</li>
      </ul>
      <blockquote>Stop generation at any point with Esc. Nothing is billed past the stop.</blockquote>
      <hr />
      <h3>Limits</h3>
      <p>One active stream per conversation. Reconnects resume within 30s.</p>
    </Prose>
  ),
};

export const TextVariants = {
  render: () => (
    <div style={{ display: "grid", gap: 10 }}>
      <Text>Default run of body text.</Text>
      <Text variant="mono">tokens_in=2104 tokens_out=480</Text>
      <Text variant="muted">Muted — secondary detail.</Text>
      <Text variant="faint">Faint — tertiary detail.</Text>
      <Text variant="label">Section label</Text>
      <Text variant="display" as="p" style={{ fontSize: 28, margin: 0 }}>
        Display face for headings
      </Text>
    </div>
  ),
};

export const TypographyAlias = {
  render: () => (
    <Typography>
      <h2>Typography is Prose</h2>
      <p>
        The <code>Typography</code> export is an alias of <code>Prose</code>. Use either; the output
        is identical.
      </p>
    </Typography>
  ),
};

export const ChineseProse = {
  render: () => (
    <Prose>
      <h2>流式输出</h2>
      <p>token 一边生成一边渲染,首字中位延迟 0.4s,完整回答通常在 6s 内完成。</p>
      <ul>
        <li>代码块在收到闭合围栏后整体渲染。</li>
        <li>随时按 Esc 停止,停止之后不再计费。</li>
      </ul>
    </Prose>
  ),
};
