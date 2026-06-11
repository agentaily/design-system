import * as React from "react";

/** Structural <form> wrapper. Pure layout — pass form.handleSubmit as onSubmit. */
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /** Vertical rhythm between children. @default "normal" */
  gap?: "tight" | "normal" | "loose";
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

/** Footer row for submit/cancel buttons. */
export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Horizontal alignment of the buttons. @default "end" */
  align?: "start" | "end" | "between";
  /** Draw a separator line above the row. @default false */
  bordered?: boolean;
  /** Stretch buttons to fill the row equally. @default false */
  full?: boolean;
  children?: React.ReactNode;
}

/** A `{ value, message }` pair, or the bare value (message falls back to a default). */
export type Rule<T> = T | { value: T; message: string };

/** Built-in per-field validation rules, RHF-aligned. Pass as the 2nd arg to register/field. */
export interface FieldRules<V = Record<string, any>> {
  /** Non-empty (and, for checkboxes, checked). String = custom message. */
  required?: boolean | string;
  minLength?: Rule<number>;
  maxLength?: Rule<number>;
  min?: Rule<number>;
  max?: Rule<number>;
  pattern?: RegExp | { value: RegExp; message: string };
  /** Custom validator(s). Return `true` (ok), a string (error message), or `false`. May be async. */
  validate?:
    | ((value: any, values: V) => boolean | string | Promise<boolean | string>)
    | Record<string, (value: any, values: V) => boolean | string | Promise<boolean | string>>;
  /** Set "checkbox" so register/field bind `checked` instead of `value`. */
  type?: "checkbox";
}

export interface RegisterReturn {
  name: string;
  value?: any;
  checked?: boolean;
  onChange: (e: any) => void;
  onBlur: () => void;
}
export interface FieldReturn extends RegisterReturn {
  /** Current error for this field (only set once it has been validated). */
  error?: string;
}

export interface FormState<V> {
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  dirtyFields: Record<string, boolean>;
  isDirty: boolean;
  /** True when the last validation run produced no errors. */
  isValid: boolean;
  isValidating: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  isSubmitSuccessful: boolean;
  submitCount: number;
}

export interface FormBag<V = Record<string, any>> extends FormState<V> {
  values: V;
  /** Alias of isSubmitted, kept for back-compat. */
  submitted: boolean;
  formState: FormState<V>;

  /** RHF-compatible binding: `<input {...form.register("email", { required: true })} />`. */
  register: (name: string, rules?: FieldRules<V>) => RegisterReturn;
  /** Like register but also injects `error` for DS controls: `<Input {...form.field("email")} />`. */
  field: (name: string, rules?: FieldRules<V>) => FieldReturn;

  setValue: (
    name: string,
    value: any,
    opts?: { shouldValidate?: boolean; shouldTouch?: boolean; shouldDirty?: boolean },
  ) => void;
  setValues: (values: V | ((prev: V) => V)) => void;
  getValues: (name?: string) => any;
  /** Read field value(s) reactively (re-renders on change). */
  watch: (name?: string) => any;
  /** Set a field error manually (e.g. a server-side error). */
  setError: (name: string, message: string) => void;
  clearErrors: (name?: string) => void;
  /** Imperatively validate the form or one field. Resolves to validity. */
  trigger: (name?: string) => Promise<boolean>;

  /**
   * Two call styles:
   * - `onSubmit={form.handleSubmit}` (uses config.onSubmit) — works as a direct event/onClick handler.
   * - `onSubmit={form.handleSubmit(onValid, onInvalid?)}` — RHF style, returns a handler.
   * Always preventDefaults, validates, marks all fields touched, focuses the first error.
   */
  handleSubmit: {
    (e?: React.FormEvent | React.MouseEvent): void;
    (
      onValid: (values: V) => void | Promise<any>,
      onInvalid?: (errors: Record<string, string>) => void,
    ): (e?: React.SyntheticEvent) => void;
  };
  reset: (
    next?: V,
    opts?: {
      keepErrors?: boolean;
      keepTouched?: boolean;
      keepDirty?: boolean;
      keepIsSubmitted?: boolean;
      keepDefaultValues?: boolean;
    },
  ) => void;
}

export interface UseFormConfig<V = Record<string, any>> {
  initialValues?: V;
  /** Alias of initialValues (RHF naming). */
  defaultValues?: V;
  /** Schema-style validator: `(values) => ({ field: message })`. Sync or async. Composes with per-field rules. */
  validate?: (values: V) => Record<string, string> | Promise<Record<string, string>> | undefined;
  /** When validation first fires. @default "onSubmit" */
  mode?: "onSubmit" | "onBlur" | "onChange" | "onTouched" | "all";
  /** When to re-validate after the first submit. @default "onChange" */
  reValidateMode?: "onChange" | "onBlur";
  /** Called with values on a clean submit. May return a promise → toggles isSubmitting. */
  onSubmit?: (values: V) => void | Promise<any>;
  /** Called with the errors map when submit is attempted while invalid. */
  onInvalid?: (errors: Record<string, string>) => void;
  /** Focus the first errored `[name]` control on a failed submit. @default true */
  shouldFocusError?: boolean;
}

export interface UseFieldArrayConfig<V = Record<string, any>> {
  form: FormBag<V>;
  /** Name of the array field on the form's values. */
  name: string;
}
export interface FieldArrayReturn<T = any> {
  /** Current rows, each with a stable `id`. */
  fields: Array<T & { id: number }>;
  append: (item: T) => void;
  prepend: (item: T) => void;
  remove: (index: number) => void;
  insert: (index: number, item: T) => void;
  move: (from: number, to: number) => void;
  replace: (items: T[]) => void;
  update: (index: number, item: T) => void;
}

export declare function Form(props: FormProps): JSX.Element;
export declare namespace Form {
  /** Production controlled form hook — RHF-aligned. Optional; drop it for RHF/TanStack. */
  function useForm<V = Record<string, any>>(config?: UseFormConfig<V>): FormBag<V>;
  /** Dynamic list fields. */
  function useFieldArray<T = any, V = Record<string, any>>(
    config: UseFieldArrayConfig<V>,
  ): FieldArrayReturn<T>;
  function Actions(props: FormActionsProps): JSX.Element;
}
export declare function FormActions(props: FormActionsProps): JSX.Element;
