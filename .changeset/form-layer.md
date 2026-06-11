---
"@agentaily/design-system": minor
---

Add the production-grade form layer (synced from Claude Design `RbM7-_aESQSDeDy1U-T1NQ`).

- **New `Form` / `FormActions`** layout primitives (`gap`, `align`, `bordered`, `full`) — pure structure, no state.
- **New `Form.useForm`** — optional, zero-dependency controlled hook with an API aligned to react-hook-form: validation modes (`onSubmit/onBlur/onChange/onTouched/all` + `reValidateMode`), per-field rules (`required/minLength/maxLength/min/max/pattern/validate`, incl. async), schema-style `validate(values)`, imperative `trigger/setError/clearErrors/setValue/getValues/watch/reset`, dual-signature `handleSubmit`, and full `formState`. Presentational controls never depend on it — swap in RHF/TanStack and they still work.
- **New `Form.useFieldArray`** — dynamic lists (`append/prepend/remove/insert/move/replace/update`) with stable per-row `id`s.
- **`Input`** gains a `required` prop (red asterisk on the label + native `required`); the error state now uses an `outline` ring so it survives overlay/instrumentation layers and never shifts layout.
