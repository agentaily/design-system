Fullscreen modal for connecting the two services an Agentaily designer needs: a DeepSeek key and a Feishu Bitable. Mount it as an overlay over the app.

```jsx
const { IntegrationSettings } = window.AxiomDesignSystem_7fc962;

{
  settingsOpen && <IntegrationSettings onClose={() => setSettingsOpen(false)} />;
}

// hide the usage-cap block (e.g. for surfaces that bill centrally):
<IntegrationSettings onClose={close} showUsageCap={false} />;
```

- Persists everything to `localStorage` under `storageKey` (default `agentaily.integrations.v1`); reopen restores connected state.
- Readiness rail tracks 0/2; **Save** stays disabled until both DeepSeek and Feishu test green.
- Composes the settings atoms (`SecretField`, `StatusPill`, `TestRow`, `HelpSteps`) — it's the reference example of how they fit together.
