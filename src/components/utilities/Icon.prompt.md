Single Lucide-geometry icon set for product surfaces — replaces ad-hoc inline icon maps. Stroke 2, round caps, `currentColor`, rendered at 14–20px.

```jsx
<Icon name="send" size={16} />
<Icon name="settings" size={18} />
<Icon name="check" size={15} style={{ color: "var(--ok)" }} />
```

- Color follows `currentColor` — set `color` on the icon or any ancestor.
- `Icon.names` lists every available name (use for pickers/specimens).
- Unknown names render `null` and warn once in dev. Add an icon by pasting a Lucide path into the source `PATHS` map — never draw freehand.
- Accepts kebab aliases: `eye-off` → `eyeOff`, `chevron-down` → `chevronDown`.
