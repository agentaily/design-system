Fullscreen modal for connecting the two services an Agentaily designer needs: a DeepSeek key and a Feishu Bitable. Mount it as an overlay over the app.

```jsx
{
  settingsOpen && <IntegrationSettings onClose={() => setSettingsOpen(false)} />;
}

// hide the usage-cap block (e.g. for surfaces that bill centrally):
<IntegrationSettings onClose={close} showUsageCap={false} />;
```

- Persists everything to `localStorage` under `storageKey` (default `agentaily.integrations.v1`); reopen restores connected state. **This is the default only — passing `value` switches off localStorage entirely (see below).**
- Readiness rail tracks 0/2; **Save** stays disabled until both DeepSeek and Feishu test green.
- Composes the settings atoms (`SecretField`, `StatusPill`, `TestRow`, `HelpSteps`) — it's the reference example of how they fit together.

### Controlled + backend-wired (BYOK)

Pass `value` + `onChange` to hold the config yourself (no localStorage). Add `onSave`/`onTest` to reach your server, `readiness` to reflect what the backend already knows, and `masked` so stored secrets echo masked and are never re-submitted. Empty `dsKey`/`secret` in the saved value mean "keep the stored one".

```jsx
function Settings({ onClose }) {
  const [cfg, setCfg] = React.useState(serverConfigOrDefault); // your config object
  // backend already has both creds verified + stored, secrets never sent back:
  const readiness = { deepseek: cfg.dsVerified, feishu: cfg.fsVerified };
  const masked = { deepseek: cfg.hasStoredKey, feishu: cfg.hasStoredSecret };

  return (
    <IntegrationSettings
      onClose={onClose}
      value={cfg}
      onChange={setCfg}
      readiness={readiness}
      masked={masked}
      onTest={async (which) => {
        const r = await fetch(`/api/integrations/test/${which}`, { method: "POST" });
        const body = await r.json(); // { ok, message }
        return { ok: body.ok, message: body.message };
      }}
      onSave={async (value) => {
        // value.dsKey / value.secret are "" when masked + untouched → omit them
        await fetch("/api/integrations", { method: "PUT", body: JSON.stringify(value) });
        // resolve = Save marks saved + re-masks; throw to keep the form dirty
      }}
    />
  );
}
```

- **`onTest(which)` → `Promise<{ ok, message }>`** drives the per-card StatusPill + TestRow. Without it, a built-in mock probe runs.
- **`onSave(value)` → `Promise`**: Save disables + spins while pending, marks saved on resolve, stays dirty on reject.
- **`masked`**: a true flag shows a masked placeholder for an untouched stored secret, keeps its value empty, and still lets the user Test — the mask is never echoed back. Typing overrides it.
- **`readiness`**: when set, it (not the in-app test) decides the rail count, Save gating, and the green pills — perfect for creds verified server-side before the modal opens.
- Omit all of these and the component behaves exactly as before (self-persisting to localStorage).
