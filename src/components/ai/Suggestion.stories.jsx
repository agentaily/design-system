import React from "react";
import { Suggestion, Suggestions } from "./Suggestion.jsx";

const SearchIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>
);

const CodeIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 16 4-4-4-4"></path>
    <path d="m6 8-4 4 4 4"></path>
  </svg>
);

export default {
  title: "AI/Suggestion",
  component: Suggestion,
};

export const Single = {
  render: () => <Suggestion icon={CodeIcon}>帮我重构这段函数</Suggestion>,
};

export const EmptyState = {
  render: () => {
    const [picked, setPicked] = React.useState(null);
    return (
      <div style={{ maxWidth: 560 }}>
        <Suggestions
          onSelect={setPicked}
          items={[
            "解释一下 CAP 定理",
            "帮我重构这段函数",
            { label: "写个正则", value: "写一个正则匹配 semver" },
            { label: "Search the docs", icon: SearchIcon },
          ]}
        />
        {picked ? (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--text-faint)",
              marginTop: 12,
            }}
          >
            selected: {picked}
          </p>
        ) : null}
      </div>
    );
  },
};

export const FollowUpsScroll = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Suggestions
        scroll
        onSelect={() => {}}
        items={[
          "Show the proof sketch",
          "Compare CP vs AP databases",
          "What breaks at 128k tokens?",
          "给一个工程上的反例",
        ]}
      />
    </div>
  ),
};
