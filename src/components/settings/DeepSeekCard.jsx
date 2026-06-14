import React from "react";
import { ConnectionCard } from "./ConnectionCard.jsx";
import { HelpSteps } from "./HelpSteps.jsx";
import { SecretField } from "../inputs/SecretField.jsx";

// DeepSeekCard — a PURE-DISPLAY connection card for a DeepSeek LLM key. Props in
// (apiKey, status, result, masked, errors, help…), events out
// (onApiKeyChange / onTest). The caller owns config + persistence.
// It composes the shared <ConnectionCard> shell (header / collapse / TestRow) and
// only supplies its own fields (key · help).
//
// Every user-facing string lives in DEFAULT_COPY (a self-consistent English
// baseline). DS is locale-agnostic — pass a `copy` prop (any subset) to localize;
// it is forwarded down to the ConnectionCard shell + its TestRow so one object
// covers the whole card. The explicit `help` / `idleHint` props still win.
const DEFAULT_COPY = {
  title: "DeepSeek",
  desc: "Powers conversational interaction. Every message a user sends calls DeepSeek completion through this key.",
  connected: "Connected",
  disconnected: "Not connected",
  collapse: "Collapse",
  apiKeyLabel: "API KEY",
  keyPlaceholder: "sk-xxxxxxxxxxxxxxxxxxxxxxxx",
  maskedPlaceholder: "Saved ········  ·  leave blank to keep",
  maskedHint: "Key stored · leave blank to keep, enter a new value to replace",
  idleHint: "Enter a key, then test the connection",
  testing: "Handshaking…",
  test: "Test connection",
  retest: "Test again",
  help: {
    title: "How do I get a DeepSeek API key?",
    steps: [
      <React.Fragment>
        Sign in to <code>platform.deepseek.com</code> and open the “API Keys” page.
      </React.Fragment>,
      <React.Fragment>
        Click “Create API Key”, name it, then copy it right away — the key is shown in full only
        once.
      </React.Fragment>,
      <React.Fragment>
        Top up your balance under “Billing” so conversations can keep calling the API.
      </React.Fragment>,
      <React.Fragment>
        Paste the key (it starts with <code>sk-</code>) into the field above.
      </React.Fragment>,
    ],
    link: { href: "https://platform.deepseek.com", label: "Open the DeepSeek platform" },
  },
};

export function DeepSeekCard({
  apiKey = "",
  onApiKeyChange,
  status = "idle",
  result,
  onTest,
  masked = false,
  keyError,
  help,
  canTest,
  idleHint,
  collapsible = true,
  expanded,
  onExpandedChange,
  copy,
}) {
  const c = { ...DEFAULT_COPY, ...copy };
  // Masked echo is derived, not stateful: a stored key is present (masked) and
  // the field is still empty → show the masked placeholder + "leave blank" hint.
  const maskedNow = masked && !(apiKey || "").trim();
  const testDisabled = canTest !== undefined ? !canTest : !(apiKey || "").trim() && !masked;
  const help_ = help || c.help;
  const idle = idleHint !== undefined ? idleHint : c.idleHint;
  const summary = result || (status === "ok" ? c.connected : c.disconnected);

  return (
    <ConnectionCard
      icon="key"
      title={c.title}
      desc={c.desc}
      status={status}
      result={result}
      summary={summary}
      onTest={onTest}
      testDisabled={testDisabled}
      idleHint={idle}
      collapsible={collapsible}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      copy={{ connected: c.connected, disconnected: c.disconnected, collapse: c.collapse }}
      testCopy={{ testing: c.testing, test: c.test, retest: c.retest }}
    >
      <SecretField
        label={c.apiKeyLabel}
        value={apiKey}
        onChange={onApiKeyChange}
        placeholder={maskedNow ? c.maskedPlaceholder : c.keyPlaceholder}
        hint={maskedNow ? c.maskedHint : undefined}
        error={keyError}
      />

      <HelpStepsSlot help={help_} />
    </ConnectionCard>
  );
}

// Renders a HelpSteps node from either a {title, steps, link} object or a
// ready-made React node passed straight through.
function HelpStepsSlot({ help }) {
  if (!help) return null;
  if (React.isValidElement(help)) return help;
  return (
    <HelpSteps
      title={help.title}
      steps={help.steps}
      link={help.link}
      defaultOpen={help.defaultOpen}
    />
  );
}
