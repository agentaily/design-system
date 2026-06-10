import React from "react";
import { Persona } from "./Persona.jsx";

export default {
  title: "Voice/Persona",
  component: Persona,
  args: { name: "agentaily", tag: "default", description: "Calm, concise. Answers in under 30 words." },
};

export const Default = {
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <Persona {...args} />
    </div>
  ),
};

export const Speaking = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Persona name="agentaily" tag="default" description="Calm, concise" speaking />
    </div>
  ),
};

export const PersonaList = {
  render: () => {
    const [selected, setSelected] = React.useState("ash");
    const personas = [
      { id: "ash", name: "Ash", tag: "calm", description: "Even pace, low pitch. Good for long answers." },
      { id: "echo", name: "Echo", tag: "bright", description: "Quick, upbeat. Good for short confirmations." },
      { id: "wen", name: "文", tag: "zh", description: "沉稳、简洁,适合中文播报。" },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 360 }}>
        {personas.map((p) => (
          <div key={p.id} onClick={() => setSelected(p.id)} style={{ cursor: "pointer" }}>
            <Persona name={p.name} tag={p.tag} description={p.description} selected={selected === p.id} />
          </div>
        ))}
      </div>
    );
  },
};
