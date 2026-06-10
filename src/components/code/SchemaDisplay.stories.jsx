import React from "react";
import { SchemaDisplay } from "./SchemaDisplay.jsx";

export default {
  title: "Code/SchemaDisplay",
  component: SchemaDisplay,
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <SchemaDisplay
        schema={{
          model: { type: "string", required: true, description: "Model id" },
          messages: { type: "array", required: true },
          max_tokens: { type: "number", description: "Default 1024" },
          options: {
            type: "object",
            fields: {
              stream: "boolean",
              temperature: { type: "number", description: "0 to 1" },
            },
          },
        }}
      />
    </div>
  ),
};

export const NestedFields = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <SchemaDisplay
        schema={{
          voice: {
            type: "object",
            required: true,
            fields: {
              persona: { type: "string", required: true },
              speed: { type: "number", description: "0.5 to 2.0" },
              transcript: {
                type: "object",
                fields: {
                  language: "string",
                  segments: "array",
                },
              },
            },
          },
        }}
      />
    </div>
  ),
};

export const StringShorthand = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <SchemaDisplay
        schema={{
          id: "string",
          created: "number",
          archived: "boolean",
          tags: "string[]",
        }}
      />
    </div>
  ),
};
