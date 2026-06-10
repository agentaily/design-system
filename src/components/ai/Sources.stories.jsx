import React from "react";
import { Sources, Citation } from "./Sources.jsx";
import { Message } from "../chat/Message.jsx";

const SOURCES = [
  { title: "Brewer's CAP Theorem", url: "https://example.com/cap" },
  { title: "Gilbert & Lynch, 2002", url: "https://example.com/proof" },
  { title: "Jepsen analyses: consistency in practice", url: "https://example.com/jepsen" },
];

export default {
  title: "AI/Sources",
  component: Sources,
  args: { sources: SOURCES },
};

export const Default = {};

export const WithCitations = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 640 }}>
      <Message role="assistant" time="14:02">
        <p>
          CAP 定理由 Eric Brewer 提出
          <Citation index={1} href="#s1" />
          ，后被 Gilbert 与 Lynch 形式化证明
          <Citation index={2} href="#s2" />
          。工程上的取舍通常落在 CP 与 AP 之间
          <Citation index={3} href="#s3" />
          。
        </p>
      </Message>
      <Sources sources={SOURCES} />
    </div>
  ),
};

export const CitationChip = {
  render: () => (
    <p style={{ maxWidth: 560, color: "var(--text-body)", lineHeight: "var(--leading-body)" }}>
      Streaming cuts time to first token from 2.1s to 0.4s
      <Citation index={1} href="#s1" /> without changing total generation time
      <Citation index={2} href="#s2" />.
    </p>
  ),
};

export const PlainStrings = {
  args: {
    label: "参考",
    sources: ["内部检索：vector-index v3", "运行日志 2026-06-09", "CHANGELOG.md"],
  },
};
