import React, { useState, useCallback, useRef, useMemo } from "react";

const AX_FORM_CSS = `
.ax-form { display: flex; flex-direction: column; gap: var(--space-5, 20px); }
.ax-form--tight { gap: var(--space-3, 12px); }
.ax-form--loose { gap: var(--space-6, 28px); }
.ax-form__actions {
  display: flex; align-items: center; gap: var(--space-3, 12px);
  padding-top: var(--space-2, 8px);
}
.ax-form__actions--end { justify-content: flex-end; }
.ax-form__actions--start { justify-content: flex-start; }
.ax-form__actions--between { justify-content: space-between; }
.ax-form__actions--full > * { flex: 1; }
.ax-form__actions--bordered {
  border-top: 1px solid var(--border-default);
  margin-top: var(--space-2, 8px); padding-top: var(--space-5, 20px);
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-form-css")) {
  const s = document.createElement("style");
  s.id = "ax-form-css";
  s.textContent = AX_FORM_CSS;
  document.head.appendChild(s);
}

/**
 * Form — a thin structural <form> wrapper. Pure layout, no state.
 * Pass form.handleSubmit (from Form.useForm) as onSubmit, then compose controls.
 */
export function Form({ gap = "normal", onSubmit, children, className = "", ...rest }) {
  const cls = [
    "ax-form",
    gap === "tight" ? "ax-form--tight" : gap === "loose" ? "ax-form--loose" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <form className={cls} onSubmit={onSubmit} noValidate {...rest}>
      {children}
    </form>
  );
}

/** FormActions — right-aligned footer row for submit/cancel buttons. */
export function FormActions({
  align = "end",
  bordered = false,
  full = false,
  children,
  className = "",
  ...rest
}) {
  const cls = [
    "ax-form__actions",
    "ax-form__actions--" + align,
    bordered ? "ax-form__actions--bordered" : "",
    full ? "ax-form__actions--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}

/* ============================================================
   useForm — production controlled form hook (RHF-aligned API).
   Exposed as Form.useForm. Drop it for react-hook-form / TanStack;
   the presentational components never depend on it.
   ============================================================ */

const isEmpty = (v) =>
  v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);

// Evaluate one field's built-in rules. Returns a message string or undefined.
async function evalRules(rules, value, values) {
  if (!rules) return undefined;
  const { required, minLength, maxLength, min, max, pattern, validate } = rules;

  if (required && (isEmpty(value) || value === false)) {
    return typeof required === "string" ? required : "This field is required.";
  }
  if (isEmpty(value)) return undefined; // other rules don't apply to empty optional fields

  const num = (r) => (typeof r === "object" ? r : { value: r, message: undefined });

  if (minLength != null) {
    const { value: n, message } = num(minLength);
    if (String(value).length < n) return message || `Must be at least ${n} characters.`;
  }
  if (maxLength != null) {
    const { value: n, message } = num(maxLength);
    if (String(value).length > n) return message || `Must be at most ${n} characters.`;
  }
  if (min != null) {
    const { value: n, message } = num(min);
    if (Number(value) < n) return message || `Must be ${n} or more.`;
  }
  if (max != null) {
    const { value: n, message } = num(max);
    if (Number(value) > n) return message || `Must be ${n} or less.`;
  }
  if (pattern) {
    const re = pattern instanceof RegExp ? pattern : pattern.value;
    const message = pattern instanceof RegExp ? undefined : pattern.message;
    if (re && !re.test(String(value))) return message || "Invalid format.";
  }
  if (validate) {
    const fns = typeof validate === "function" ? { _: validate } : validate;
    for (const key of Object.keys(fns)) {
      const res = await fns[key](value, values);
      if (res === false) return "Invalid value.";
      if (typeof res === "string") return res;
    }
  }
  return undefined;
}

function useForm(config = {}) {
  const {
    initialValues = {},
    defaultValues, // RHF alias
    validate, // schema-style: (values) => ({ field: message }) | Promise
    mode = "onSubmit", // onSubmit | onBlur | onChange | onTouched | all
    reValidateMode = "onChange", // onChange | onBlur (after first submit)
    onSubmit: onSubmitCfg,
    onInvalid: onInvalidCfg,
    shouldFocusError = true,
  } = config;

  const defaults = defaultValues || initialValues;
  const [values, setValuesState] = useState(defaults);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [dirtyFields, setDirtyFields] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [isValidating, setValidating] = useState(false);

  const valuesRef = useRef(values);
  valuesRef.current = values;
  const errorsRef = useRef(errors);
  errorsRef.current = errors;
  const rulesRef = useRef({}); // name -> rules registered via register/field
  const defaultsRef = useRef(defaults);
  const formElRef = useRef(null);

  const writeValues = useCallback((updater) => {
    setValuesState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      valuesRef.current = next;
      return next;
    });
  }, []);

  // Validate the whole form (or a single field). Returns a fresh errors map.
  const runValidation = useCallback(
    async (only) => {
      const vals = valuesRef.current;
      const out = {};
      const names = only ? [only] : Object.keys(rulesRef.current);
      for (const name of names) {
        const msg = await evalRules(rulesRef.current[name], vals[name], vals);
        if (msg) out[name] = msg;
      }
      if (validate) {
        const schema = (await validate(vals)) || {};
        for (const k of Object.keys(schema)) {
          if (only && k !== only) continue;
          if (!out[k] && schema[k]) out[k] = schema[k];
        }
      }
      return out;
    },
    [validate],
  );

  // Recompute one field's error and merge into state (preserving others).
  const revalidateField = useCallback(
    async (name) => {
      setValidating(true);
      const partial = await runValidation(name);
      setErrors((prev) => {
        const next = { ...prev };
        if (partial[name]) next[name] = partial[name];
        else delete next[name];
        errorsRef.current = next;
        return next;
      });
      setValidating(false);
    },
    [runValidation],
  );

  const shouldValidateOn = useCallback(
    (event, name) => {
      if (isSubmitted) return reValidateMode === event;
      switch (mode) {
        case "all":
          return true;
        case "onChange":
          return event === "change";
        case "onBlur":
          return event === "blur";
        case "onTouched":
          return event === "blur" || (event === "change" && touched[name]);
        case "onSubmit":
        default:
          return false;
      }
    },
    [isSubmitted, reValidateMode, mode, touched],
  );

  const setValue = useCallback(
    (name, value, opts = {}) => {
      writeValues((prev) => ({ ...prev, [name]: value }));
      if (opts.shouldDirty !== false) {
        setDirtyFields((p) => (defaultsRef.current[name] === value ? p : { ...p, [name]: true }));
      }
      if (opts.shouldTouch) setTouched((p) => ({ ...p, [name]: true }));
      if (opts.shouldValidate) revalidateField(name);
    },
    [writeValues, revalidateField],
  );

  // Build the props for a control. `register` is RHF-compatible; `field` adds `error`.
  const register = useCallback(
    (name, rules) => {
      if (rules) rulesRef.current[name] = rules;
      else if (!(name in rulesRef.current)) rulesRef.current[name] = undefined;
      const isCheckbox = rules && rules.type === "checkbox";
      const onChange = (e) => {
        const t = e && e.target;
        const next = t ? (t.type === "checkbox" ? t.checked : t.value) : e;
        writeValues((prev) => ({ ...prev, [name]: next }));
        setDirtyFields((p) => ({ ...p, [name]: true }));
        if (shouldValidateOn("change", name)) revalidateField(name);
      };
      const onBlur = () => {
        setTouched((p) => ({ ...p, [name]: true }));
        if (shouldValidateOn("blur", name)) revalidateField(name);
      };
      const base = { name, onChange, onBlur };
      if (isCheckbox) base.checked = !!values[name];
      else base.value = values[name] ?? "";
      return base;
    },
    [values, writeValues, shouldValidateOn, revalidateField],
  );

  const field = useCallback(
    (name, opts) => {
      const props = register(name, opts);
      props.error = errors[name];
      return props;
    },
    [register, errors],
  );

  const trigger = useCallback(
    async (name) => {
      setValidating(true);
      const errs = await runValidation(name);
      if (name) {
        setErrors((prev) => {
          const next = { ...prev };
          if (errs[name]) next[name] = errs[name];
          else delete next[name];
          errorsRef.current = next;
          return next;
        });
        setValidating(false);
        return !errs[name];
      }
      setErrors(errs);
      errorsRef.current = errs;
      setValidating(false);
      return Object.keys(errs).length === 0;
    },
    [runValidation],
  );

  const setError = useCallback((name, message) => {
    setErrors((prev) => {
      const n = { ...prev, [name]: message };
      errorsRef.current = n;
      return n;
    });
  }, []);

  const clearErrors = useCallback((name) => {
    setErrors((prev) => {
      if (!name) {
        errorsRef.current = {};
        return {};
      }
      const next = { ...prev };
      delete next[name];
      errorsRef.current = next;
      return next;
    });
  }, []);

  const getValues = useCallback((name) => (name ? valuesRef.current[name] : valuesRef.current), []);
  const watch = useCallback((name) => (name ? values[name] : values), [values]);

  const focusError = useCallback(
    (errs) => {
      if (!shouldFocusError || typeof document === "undefined") return;
      const first = Object.keys(errs)[0];
      if (!first) return;
      const el = (formElRef.current || document).querySelector(`[name="${first}"]`);
      if (el && el.focus) el.focus();
    },
    [shouldFocusError],
  );

  const handleSubmit = useCallback(
    (onValidArg, onInvalidArg) => {
      const runner = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (e && e.currentTarget && e.currentTarget.tagName === "FORM")
          formElRef.current = e.currentTarget;
        setSubmitting(true);
        setValidating(true);
        const errs = await runValidation();
        setErrors(errs);
        errorsRef.current = errs;
        setTouched(() => {
          const all = {};
          [...Object.keys(rulesRef.current), ...Object.keys(valuesRef.current)].forEach(
            (k) => (all[k] = true),
          );
          return all;
        });
        setSubmitted(true);
        setSubmitCount((c) => c + 1);
        setValidating(false);
        const valid = Object.keys(errs).length === 0;
        if (valid) {
          try {
            await (typeof onValidArg === "function" ? onValidArg : onSubmitCfg)?.(
              valuesRef.current,
            );
            setSubmitSuccessful(true);
          } catch (err) {
            setSubmitSuccessful(false);
            throw err;
          } finally {
            setSubmitting(false);
          }
        } else {
          setSubmitSuccessful(false);
          setSubmitting(false);
          (onInvalidArg || onInvalidCfg)?.(errs);
          focusError(errs);
        }
      };
      // Dual API: handleSubmit(onValid[, onInvalid]) returns a handler (RHF style);
      // handleSubmit(event) runs immediately (use as onSubmit/onClick directly).
      if (typeof onValidArg === "function") return runner;
      return runner(onValidArg);
    },
    [runValidation, onSubmitCfg, onInvalidCfg, focusError],
  );

  const reset = useCallback(
    (next, opts = {}) => {
      const target = next || defaultsRef.current;
      if (opts.keepDefaultValues !== true) defaultsRef.current = target;
      writeValues(target);
      if (!opts.keepErrors) {
        setErrors({});
        errorsRef.current = {};
      }
      if (!opts.keepTouched) setTouched({});
      if (!opts.keepDirty) setDirtyFields({});
      if (!opts.keepIsSubmitted) {
        setSubmitted(false);
        setSubmitSuccessful(false);
      }
    },
    [writeValues],
  );

  const isDirty = Object.keys(dirtyFields).length > 0;
  const isValid = Object.keys(errors).length === 0;

  const formState = useMemo(
    () => ({
      errors,
      touched,
      dirtyFields,
      isDirty,
      isValid,
      isValidating,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
      submitCount,
    }),
    [
      errors,
      touched,
      dirtyFields,
      isDirty,
      isValid,
      isValidating,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
      submitCount,
    ],
  );

  return {
    // state
    values,
    errors,
    touched,
    dirtyFields,
    isDirty,
    isValid,
    isValidating,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
    submitted: isSubmitted,
    formState,
    // binding
    register,
    field,
    // imperative
    setValue,
    setValues: writeValues,
    getValues,
    watch,
    setError,
    clearErrors,
    trigger,
    handleSubmit,
    reset,
    // internal-ish (handy for custom layouts)
    _formElRef: formElRef,
  };
}

/* ============================================================
   useFieldArray — dynamic list fields, RHF-aligned.
   const ta = Form.useFieldArray({ form, name: "members" });
   ============================================================ */
let _faKey = 0;
function useFieldArray({ form, name }) {
  const keysRef = useRef([]);
  const list = form.getValues(name) || [];
  // keep a stable key per row
  while (keysRef.current.length < list.length) keysRef.current.push(++_faKey);
  if (keysRef.current.length > list.length) keysRef.current = keysRef.current.slice(0, list.length);

  const fields = list.map((item, i) => ({ ...item, id: keysRef.current[i] }));

  const commit = (next, keys) => {
    keysRef.current = keys;
    form.setValue(name, next, { shouldDirty: true });
  };

  const append = useCallback(
    (item) => {
      const cur = form.getValues(name) || [];
      commit([...cur, item], [...keysRef.current, ++_faKey]);
    },
    [form, name],
  );
  const prepend = useCallback(
    (item) => {
      const cur = form.getValues(name) || [];
      commit([item, ...cur], [++_faKey, ...keysRef.current]);
    },
    [form, name],
  );
  const remove = useCallback(
    (index) => {
      const cur = form.getValues(name) || [];
      commit(
        cur.filter((_, i) => i !== index),
        keysRef.current.filter((_, i) => i !== index),
      );
    },
    [form, name],
  );
  const insert = useCallback(
    (index, item) => {
      const cur = (form.getValues(name) || []).slice();
      const keys = keysRef.current.slice();
      cur.splice(index, 0, item);
      keys.splice(index, 0, ++_faKey);
      commit(cur, keys);
    },
    [form, name],
  );
  const move = useCallback(
    (from, to) => {
      const cur = (form.getValues(name) || []).slice();
      const keys = keysRef.current.slice();
      cur.splice(to, 0, cur.splice(from, 1)[0]);
      keys.splice(to, 0, keys.splice(from, 1)[0]);
      commit(cur, keys);
    },
    [form, name],
  );
  const replace = useCallback(
    (items) => {
      commit(
        items,
        items.map(() => ++_faKey),
      );
    },
    [form, name],
  );
  const update = useCallback(
    (index, item) => {
      const cur = (form.getValues(name) || []).slice();
      cur[index] = item;
      commit(cur, keysRef.current.slice());
    },
    [form, name],
  );

  return { fields, append, prepend, remove, insert, move, replace, update };
}

Form.useForm = useForm;
Form.useFieldArray = useFieldArray;
Form.Actions = FormActions;
