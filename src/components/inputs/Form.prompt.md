Production-grade controlled form layer. Components own layout; the hook owns orchestration. The presentational controls never depend on the hook — swap in react-hook-form or TanStack and they still work. `useForm` is a controlled hook (state-backed, re-renders on keystroke) with an API surface aligned to react-hook-form.

```jsx
const form = Form.useForm({
  initialValues: { email: "", password: "", terms: false },
  mode: "onBlur", // onSubmit | onBlur | onChange | onTouched | all
  reValidateMode: "onChange",
  onSubmit: async (v) => {
    await api.signup(v);
  },
});

<Form onSubmit={form.handleSubmit}>
  <Input
    label="Email"
    {...form.field("email", {
      required: "Email is required.",
      pattern: { value: /^[^@]+@[^@]+$/, message: "Enter a valid email." },
    })}
  />
  <Input
    label="Password"
    type="password"
    {...form.field("password", {
      required: true,
      minLength: { value: 8, message: "At least 8 characters." },
    })}
  />
  <FormActions bordered>
    <Button type="button" variant="ghost" onClick={() => form.reset()}>
      Reset
    </Button>
    <Button type="submit" onClick={form.handleSubmit} disabled={form.isSubmitting}>
      Sign up
    </Button>
  </FormActions>
</Form>;
```

**Binding** — `form.field(name, rules)` spreads `name/value(or checked)/onChange/onBlur/error` onto a DS control; `form.register(name, rules)` is the same minus `error` (RHF-compatible, for any control). Checkboxes: pass `{ type: "checkbox" }`.

**Validation** — two composable sources: per-field `rules` (`required, minLength, maxLength, min, max, pattern, validate`) and a schema-style `validate(values) => { field: message }` in config (sync or async — wire zod/yup here). `validate` rules may be async (e.g. server availability checks).

**Imperative API** — `trigger(name?)`, `setError(name, msg)` (server errors), `clearErrors(name?)`, `setValue(name, val, { shouldValidate, shouldTouch, shouldDirty })`, `getValues(name?)`, `watch(name?)` (reactive, for dependent fields), `reset(values?, opts)`.

**formState** — `errors, touched, dirtyFields, isDirty, isValid, isValidating, isSubmitting, isSubmitted, isSubmitSuccessful, submitCount` (also on `form.formState`).

**handleSubmit** — dual call style: use `form.handleSubmit` directly as the handler (uses `config.onSubmit`), or `form.handleSubmit(onValid, onInvalid)` RHF-style. Either way it prevents default, validates, marks all fields touched, and focuses the first errored `[name]`. **In sandboxed iframes (incl. the DS card grid) also put `onClick={form.handleSubmit}` on the submit button** — native form submission is blocked there, so the click handler is what fires.

**Dynamic lists** — `Form.useFieldArray({ form, name })` → `{ fields, append, prepend, remove, insert, move, replace, update }`. Each row in `fields` carries a stable `id` for keys.

See `Form.stories.jsx` — `HeroSignup` (basic required + submit-error banner) and `Validation` (async availability checks, dependent fields, server errors, field array, live formState readout).
