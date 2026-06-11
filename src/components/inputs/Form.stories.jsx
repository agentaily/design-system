import React from "react";
import { Form, FormActions } from "./Form.jsx";
import { Input } from "./Input.jsx";
import { Checkbox } from "./Checkbox.jsx";
import { Button } from "../buttons/Button.jsx";

export default {
  title: "Inputs/Form",
  component: Form,
  parameters: {
    docs: {
      description: {
        component:
          "Production-grade controlled form layer. `Form` + `FormActions` are pure layout; " +
          "`Form.useForm` is an optional, RHF-aligned orchestration hook (values/errors/touched/" +
          "validate/handleSubmit) and `Form.useFieldArray` covers dynamic lists. The presentational " +
          "controls never depend on the hook — drop in react-hook-form or TanStack and they still work.",
      },
    },
  },
};

/* Demo-local CSS for the showcase chrome (alert banners, async status, field
   array rows, the live formState chip bar). The Form/Input/Checkbox/Button
   visuals all come from the design system itself. */
const DEMO_CSS = `
.axd-wrap { max-width: 480px; }
.axd-eyebrow {
  font-family: var(--font-mono); font-size: var(--text-xs);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--text-faint); margin: 0 0 4px;
}
.axd-h { font-size: var(--text-lg); font-weight: var(--weight-semibold); color: var(--text-strong); margin: 0 0 4px; }
.axd-sub { font-size: var(--text-sm); color: var(--text-muted); margin: 0 0 22px; }

.axd-alert {
  display: flex; align-items: flex-start; gap: 9px;
  padding: 10px 12px; border-radius: var(--radius-2);
  background: var(--danger-dim); border: 1px solid var(--danger);
  color: var(--danger); font-size: var(--text-sm);
}
.axd-alert svg { flex: none; margin-top: 1px; }
.axd-ok {
  display: flex; align-items: center; gap: 9px;
  padding: 10px 12px; border-radius: var(--radius-2);
  background: var(--ok-dim); border: 1px solid var(--ok);
  color: var(--ok); font-size: var(--text-sm);
}
.axd-inline-error { font-size: var(--text-xs); color: var(--danger); }
.axd-check-field { display: flex; flex-direction: column; gap: 6px; }

.axd-field-status { display: flex; align-items: center; gap: 6px; margin-top: 5px; font-size: var(--text-xs); }
.axd-field-status--checking { color: var(--text-faint); }
.axd-field-status--ok { color: var(--ok); }
.axd-spin { width: 11px; height: 11px; border: 1.5px solid var(--border-strong); border-top-color: var(--text-muted); border-radius: 50%; animation: axd-spin .6s linear infinite; }
@keyframes axd-spin { to { transform: rotate(360deg); } }

.axd-array { display: flex; flex-direction: column; gap: 10px; }
.axd-array-head { display: flex; align-items: center; justify-content: space-between; }
.axd-array-label {
  font-family: var(--font-mono); font-size: var(--text-xs);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint);
}
.axd-array-row { display: flex; align-items: flex-start; gap: 8px; }
.axd-array-row > :first-child { flex: 1; }

.axd-state-bar {
  display: flex; flex-wrap: wrap; gap: 6px; margin-top: 20px;
  padding-top: 16px; border-top: 1px dashed var(--border-default);
}
.axd-chip {
  font-family: var(--font-mono); font-size: 11px; letter-spacing: .02em;
  padding: 3px 8px; border-radius: 999px;
  border: 1px solid var(--border-default); color: var(--text-faint);
}
.axd-chip[data-on="true"] { color: var(--text-body); border-color: var(--border-strong); background: var(--surface-raised); }
.axd-done {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-mono); font-size: var(--text-xs);
  color: var(--accent); margin-top: 14px;
}
`;

const IconAlert = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const IconCheck = ({ size = 16, width = 2.5 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* HeroSignup — basic required fields + submit-error banner (schema validate) */

function HeroSignupDemo() {
  const [done, setDone] = React.useState(false);
  const form = Form.useForm({
    initialValues: { workspace: "", slug: "", terms: false },
    validate: (v) => {
      const e = {};
      if (!v.workspace.trim()) e.workspace = "Workspace name is required.";
      if (!v.slug.trim()) e.slug = "A URL slug is required.";
      else if (!/^[a-z0-9-]+$/.test(v.slug)) e.slug = "Lowercase letters, numbers and dashes only.";
      if (!v.terms) e.terms = "You must accept the terms.";
      return e;
    },
    onSubmit: (v) => {
      setDone(true);
      console.log("submit", v);
    },
  });

  return (
    <div className="axd-wrap">
      <style>{DEMO_CSS}</style>
      <p className="axd-eyebrow">Settings</p>
      <h2 className="axd-h">Create workspace</h2>

      <Form onSubmit={form.handleSubmit} gap="tight">
        {form.submitted && !form.isValid ? (
          <div className="axd-alert" role="alert">
            <IconAlert />
            <span>
              <b>
                {Object.keys(form.errors).length} field
                {Object.keys(form.errors).length > 1 ? "s" : ""} need attention.
              </b>{" "}
              Fix the items marked below to continue.
            </span>
          </div>
        ) : null}

        <Input
          label="Workspace name"
          required
          placeholder="Acme Research"
          {...form.field("workspace")}
        />
        <Input label="URL slug" mono required placeholder="acme-research" {...form.field("slug")} />

        {/* Checkbox has no built-in error slot, so destructure field and render it inline */}
        {(() => {
          const terms = form.field("terms", { type: "checkbox" });
          return (
            <div className="axd-check-field">
              <Checkbox
                label="I accept the terms of service"
                checked={terms.checked}
                onChange={terms.onChange}
                onBlur={terms.onBlur}
              />
              {terms.error ? <span className="axd-inline-error">{terms.error}</span> : null}
            </div>
          );
        })()}

        <FormActions bordered>
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              form.reset();
              setDone(false);
            }}
          >
            Reset
          </Button>
          {/* onClick (not just <Form onSubmit>) so submit works even inside sandboxed iframes that block native form submission */}
          <Button type="submit" disabled={form.isSubmitting} onClick={form.handleSubmit}>
            Create workspace
          </Button>
        </FormActions>
      </Form>

      {done ? (
        <div className="axd-done">
          <IconCheck size={14} />
          Workspace created.
        </div>
      ) : null}
    </div>
  );
}

export const HeroSignup = {
  name: "Hero · required + submit error",
  render: () => <HeroSignupDemo />,
};

/* ------------------------------------------------------------------ */
/* Validation — async availability, dependent fields, server errors, field array */

// Pretend server: "admin", "root", "support" are taken. 600ms latency.
const TAKEN = ["admin", "root", "support"];
function checkHandle(handle) {
  return new Promise((res) => setTimeout(() => res(!TAKEN.includes(handle.toLowerCase())), 600));
}

function StatusDot({ state }) {
  if (state === "checking")
    return (
      <span className="axd-field-status axd-field-status--checking">
        <span className="axd-spin" /> Checking availability…
      </span>
    );
  if (state === "ok")
    return (
      <span className="axd-field-status axd-field-status--ok">
        <IconCheck size={12} width={3} /> Available
      </span>
    );
  return null;
}

function ValidationDemo() {
  const [handleState, setHandleState] = React.useState(null); // null | checking | ok
  const [done, setDone] = React.useState(false);

  const form = Form.useForm({
    initialValues: {
      handle: "",
      email: "",
      password: "",
      confirm: "",
      members: [{ email: "" }],
      terms: false,
    },
    mode: "onTouched", // validate on first blur, then live
    reValidateMode: "onChange",
    onSubmit: async (v) => {
      // simulate a server round-trip that can reject
      await new Promise((r) => setTimeout(r, 700));
      if (v.email.endsWith("@blocked.com")) {
        form.setError("email", "This email domain is not allowed.");
        throw new Error("server rejected");
      }
      setDone(true);
    },
  });

  const members = Form.useFieldArray({ form, name: "members" });
  const fs = form.formState;

  return (
    <div className="axd-wrap">
      <style>{DEMO_CSS}</style>
      <p className="axd-eyebrow">Onboarding</p>
      <h2 className="axd-h">Create your account</h2>
      <p className="axd-sub">
        Production <code>Form.useForm</code> — async availability, dependent fields, server errors,
        dynamic invites.
      </p>

      <Form onSubmit={form.handleSubmit} gap="normal">
        {fs.isSubmitted && !fs.isValid ? (
          <div className="axd-alert" role="alert">
            <IconAlert />
            <span>
              <b>
                {Object.keys(fs.errors).length} field{Object.keys(fs.errors).length > 1 ? "s" : ""}{" "}
                need attention.
              </b>{" "}
              Fix the items marked below.
            </span>
          </div>
        ) : null}
        {done ? (
          <div className="axd-ok" role="status">
            <IconCheck />
            Account created. Welcome aboard.
          </div>
        ) : null}

        <div>
          <Input
            label="Handle"
            mono
            required
            placeholder="lin_wei"
            {...form.field("handle", {
              required: "Pick a handle.",
              pattern: {
                value: /^[a-z0-9_]{3,}$/,
                message: "Lowercase letters, numbers, underscore — 3+ chars.",
              },
              // field-level async rule: scoped to this field, runs only after format passes
              validate: async (val) => {
                setHandleState("checking");
                const ok = await checkHandle(val);
                setHandleState(ok ? "ok" : null);
                return ok || "That handle is already taken.";
              },
            })}
          />
          <StatusDot state={form.errors.handle ? null : handleState} />
        </div>

        <Input
          label="Email"
          type="email"
          required
          placeholder="lin@acme.com"
          {...form.field("email", {
            required: "Email is required.",
            pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Enter a valid email." },
          })}
        />

        <Input
          label="Password"
          type="password"
          required
          placeholder="••••••••"
          {...form.field("password", {
            required: "Choose a password.",
            minLength: { value: 8, message: "At least 8 characters." },
          })}
        />

        <Input
          label="Confirm password"
          type="password"
          required
          placeholder="••••••••"
          {...form.field("confirm", {
            required: "Re-enter your password.",
            validate: (val, vals) => val === vals.password || "Passwords don't match.",
          })}
        />

        {/* Field array: team invites */}
        <div className="axd-array">
          <div className="axd-array-head">
            <span className="axd-array-label">Invite teammates</span>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => members.append({ email: "" })}
            >
              + Add
            </Button>
          </div>
          {members.fields.map((row, i) => (
            <div className="axd-array-row" key={row.id}>
              <Input
                placeholder="teammate@acme.com"
                value={row.email}
                onChange={(e) => members.update(i, { email: e.target.value })}
              />
              {members.fields.length > 1 ? (
                <Button
                  type="button"
                  size="md"
                  variant="ghost"
                  aria-label="Remove"
                  onClick={() => members.remove(i)}
                >
                  ×
                </Button>
              ) : null}
            </div>
          ))}
        </div>

        <div className="axd-check-field">
          {(() => {
            const terms = form.field("terms", {
              type: "checkbox",
              required: "You must accept the terms.",
            });
            return (
              <>
                <Checkbox
                  label="I accept the terms of service"
                  checked={terms.checked}
                  onChange={terms.onChange}
                  onBlur={terms.onBlur}
                />
                {terms.error ? <span className="axd-inline-error">{terms.error}</span> : null}
              </>
            );
          })()}
        </div>

        <FormActions bordered>
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              form.reset();
              setDone(false);
              setHandleState(null);
            }}
          >
            Reset
          </Button>
          <Button type="submit" onClick={form.handleSubmit} disabled={fs.isSubmitting}>
            {fs.isSubmitting ? "Creating…" : "Create account"}
          </Button>
        </FormActions>
      </Form>

      {/* live formState readout — proves the hook surface */}
      <div className="axd-state-bar">
        <span className="axd-chip" data-on={fs.isDirty}>
          isDirty
        </span>
        <span className="axd-chip" data-on={fs.isValid}>
          isValid
        </span>
        <span className="axd-chip" data-on={fs.isValidating}>
          isValidating
        </span>
        <span className="axd-chip" data-on={fs.isSubmitting}>
          isSubmitting
        </span>
        <span className="axd-chip" data-on={fs.isSubmitted}>
          isSubmitted
        </span>
        <span className="axd-chip" data-on={fs.submitCount > 0}>
          submitCount: {fs.submitCount}
        </span>
        <span className="axd-chip" data-on={Object.keys(fs.dirtyFields).length > 0}>
          dirty: {Object.keys(fs.dirtyFields).length}
        </span>
      </div>
    </div>
  );
}

export const Validation = {
  name: "Validation · async, dependent, field array",
  render: () => <ValidationDemo />,
};

/* ------------------------------------------------------------------ */
/* Layout — the pure structural primitives, no hook */

export const Layout = {
  name: "Layout · Form + FormActions",
  render: () => (
    <div style={{ maxWidth: 440 }}>
      <Form gap="normal" onSubmit={(e) => e.preventDefault()}>
        <Input label="Name" placeholder="Ada Lovelace" />
        <Input label="Email" type="email" placeholder="ada@acme.com" />
        <FormActions bordered>
          <Button variant="ghost" type="button">
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </FormActions>
      </Form>
    </div>
  ),
};
