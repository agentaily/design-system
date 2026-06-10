import React from "react";
import { WebPreview } from "./WebPreview.jsx";

export default {
  title: "Code/WebPreview",
  component: WebPreview,
};

const doc = `<!doctype html>
<html>
  <body style="margin:0;display:grid;place-items:center;height:100vh;background:#0a0a0b;color:#e4e4e7;font-family:monospace">
    <div>
      <h1 style="font-size:18px;margin:0 0 6px">agentaily</h1>
      <p style="margin:0;color:#a1a1aa;font-size:12px">build 2.1.0 · ready in 0.4s</p>
    </div>
  </body>
</html>`;

export const Default = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <WebPreview url="localhost:3000" srcDoc={doc} height={220} />
    </div>
  ),
};

export const CustomContent = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <WebPreview url="preview.agentaily.chat/sb-7f29c4" height={180}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "var(--text-faint)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
          }}
        >
          Waiting for first paint
        </div>
      </WebPreview>
    </div>
  ),
};

export const Tall = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <WebPreview url="localhost:5173" srcDoc={doc} height={360} />
    </div>
  ),
};
