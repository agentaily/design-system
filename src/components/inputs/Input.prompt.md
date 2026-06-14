Single-line field with mono ALL-CAPS label; the default form control.

```jsx
<Input label="API Key" mono placeholder="ax-…" hint="Stored locally." />
```

`error` replaces hint and paints the border; `mono` for ids/keys/code values.

Password fields can opt into a show/hide eye toggle with `reveal` (uses the same eye button as `SecretField`):

```jsx
<Input label="Password" type="password" reveal placeholder="••••••••" />
```
