import React from "react";
import { Carousel } from "./Carousel.jsx";
import { Card } from "./Card.jsx";

const slides = [
  {
    eyebrow: "01 / 03",
    title: "Ask in plain language",
    body: "Type a question, get an answer. Median time to first token is 0.4s.",
  },
  {
    eyebrow: "02 / 03",
    title: "Bring your own keys",
    body: "Usage is metered per token and billed to your own provider account.",
  },
  {
    eyebrow: "03 / 03",
    title: "Search everything",
    body: "Every past conversation is indexed locally. Lookups return in under 80ms.",
  },
];

export default {
  title: "Display/Carousel",
  component: Carousel,
  argTypes: {
    dots: { control: "boolean" },
    arrows: { control: "boolean" },
  },
  args: { dots: true, arrows: true },
};

export const Default = {
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <Carousel {...args}>
        {slides.map((s) => (
          <Card key={s.eyebrow} padding="lg" eyebrow={s.eyebrow} title={s.title} style={{ minHeight: 180 }}>
            <p style={{ margin: 0 }}>{s.body}</p>
          </Card>
        ))}
      </Carousel>
    </div>
  ),
};

export const DotsOnly = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Carousel arrows={false}>
        {slides.map((s) => (
          <Card key={s.eyebrow} padding="lg" eyebrow={s.eyebrow} title={s.title} style={{ minHeight: 180 }}>
            <p style={{ margin: 0 }}>{s.body}</p>
          </Card>
        ))}
      </Carousel>
    </div>
  ),
};

export const SingleSlide = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Carousel>
        <Card padding="lg" eyebrow="01 / 01" title="One slide, no controls">
          <p style={{ margin: 0 }}>Arrows and dots only render when there is more than one slide.</p>
        </Card>
      </Carousel>
    </div>
  ),
};
