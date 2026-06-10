import React from "react";
import { Attachments } from "./Attachments.jsx";

const THUMB =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="#161616"/><path d="M0 74 30 42l20 20 16-13 30 25v22H0z" fill="#2e2e2e"/><circle cx="70" cy="24" r="8" fill="#3a3a3a"/></svg>'
  );

const FILES = [
  { id: "1", name: "mountain.jpg", type: "image/jpeg", size: "1.8 MB", src: THUMB },
  { id: "2", name: "report-q2.pdf", type: "application/pdf", size: "2.4 MB" },
  { id: "3", name: "standup.m4a", type: "audio/mp4", size: "6.1 MB" },
  { id: "4", name: "demo-run.mp4", type: "video/mp4", size: "48 MB" },
];

export default {
  title: "AI/Attachments",
  component: Attachments,
  argTypes: {
    variant: { control: "select", options: ["grid", "inline", "list"] },
  },
  args: { variant: "list", files: FILES },
};

export const List = {};

export const Grid = {
  render: () => (
    <Attachments
      variant="grid"
      files={[
        { id: "1", name: "mountain.jpg", type: "image/jpeg", src: THUMB },
        { id: "2", name: "report-q2.pdf", type: "application/pdf" },
        { id: "3", name: "standup.m4a", type: "audio/mp4" },
      ]}
    />
  ),
};

export const Inline = {
  render: () => (
    <Attachments
      variant="inline"
      files={[
        { id: "1", name: "schema.sql", type: "application/sql" },
        { id: "2", name: "trace.log", type: "text/plain" },
        { id: "3", name: "mountain.jpg", type: "image/jpeg" },
      ]}
    />
  ),
};

export const Removable = {
  render: () => {
    const [files, setFiles] = React.useState(FILES);
    return (
      <div style={{ maxWidth: 480 }}>
        <Attachments
          variant="list"
          files={files}
          onRemove={(id) => setFiles((fs) => fs.filter((f) => f.id !== id))}
        />
        {files.length === 0 ? (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-faint)" }}>
            0 files attached
          </p>
        ) : null}
      </div>
    );
  },
};
