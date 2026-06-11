# @agentaily/design-system

## 0.2.0

### Minor Changes

- [#2](https://github.com/agentaily/design-system/pull/2) [`55bc378`](https://github.com/agentaily/design-system/commit/55bc378cfb13f060c46e50a95a78b91856f21889) Thanks [@yarnovo](https://github.com/yarnovo)! - Add the production-grade form layer (synced from Claude Design `RbM7-_aESQSDeDy1U-T1NQ`).

  - **New `Form` / `FormActions`** layout primitives (`gap`, `align`, `bordered`, `full`) — pure structure, no state.
  - **New `Form.useForm`** — optional, zero-dependency controlled hook with an API aligned to react-hook-form: validation modes (`onSubmit/onBlur/onChange/onTouched/all` + `reValidateMode`), per-field rules (`required/minLength/maxLength/min/max/pattern/validate`, incl. async), schema-style `validate(values)`, imperative `trigger/setError/clearErrors/setValue/getValues/watch/reset`, dual-signature `handleSubmit`, and full `formState`. Presentational controls never depend on it — swap in RHF/TanStack and they still work.
  - **New `Form.useFieldArray`** — dynamic lists (`append/prepend/remove/insert/move/replace/update`) with stable per-row `id`s.
  - **`Input`** gains a `required` prop (red asterisk on the label + native `required`); the error state now uses an `outline` ring so it survives overlay/instrumentation layers and never shifts layout.

## 0.1.1

### Patch Changes

- [`1af5ce3`](https://github.com/agentaily/design-system/commit/1af5ce3d0bb60503b666bbdc054124bf9391b91b) Thanks [@yarnbcoder-lgtm](https://github.com/yarnbcoder-lgtm)! - Verify the automated release pipeline (Changesets + OIDC trusted publishing). No functional changes — component code is identical to 0.1.0.
