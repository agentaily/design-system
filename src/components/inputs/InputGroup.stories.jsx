import React from "react";
import { InputGroup } from "./InputGroup.jsx";

const SearchIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>
);

export default {
  title: "Inputs/InputGroup",
  component: InputGroup,
};

export const Default = {
  render: () => (
    <div style={{ width: 380 }}>
      <InputGroup prefix="https://" suffix=".agentaily.chat" inputProps={{ placeholder: "your-team" }} />
    </div>
  ),
};

export const WithButton = {
  render: () => {
    const [query, setQuery] = React.useState("");
    return (
      <div style={{ width: 380 }}>
        <InputGroup
          inputProps={{
            placeholder: "Search 128k indexed documents",
            value: query,
            onChange: (e) => setQuery(e.target.value),
          }}
          button="Go"
          onButtonClick={() => setQuery("")}
        />
      </div>
    );
  },
};

export const WithIconPrefix = {
  render: () => (
    <div style={{ width: 380 }}>
      <InputGroup prefix={SearchIcon} inputProps={{ placeholder: "Search chats" }} />
    </div>
  ),
};

export const UnitSuffix = {
  render: () => (
    <div style={{ width: 260 }}>
      <InputGroup
        suffix="ms"
        inputProps={{ placeholder: "400", inputMode: "numeric", defaultValue: "400" }}
      />
    </div>
  ),
};
