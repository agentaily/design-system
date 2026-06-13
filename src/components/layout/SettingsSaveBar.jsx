import React from "react";
import { Button } from "../buttons/Button.jsx";
import { Icon } from "../utilities/Icon.jsx";
import { PanelFooter } from "./PanelFooter.jsx";
import { Spinner } from "../feedback/Spinner.jsx";

// SettingsSaveBar — the per-tab bottom save bar for a settings page (GitHub
// model: one bar at the bottom of each tab, committing ALL the fields in that
// tab). Drop it into a PanelSheet / SettingsSheet `footer` slot. It is the
// commit affordance — NOT auto-save: edits stay local until the user clicks 保存.
//
// Pairs with the existing Form.useForm: pass `form` and the bar reads
// `isDirty / isValid / isSubmitting`, gates 保存 on dirty+valid, runs validation
// then your handler on click, and 放弃更改 calls form.reset(). For content that
// isn't useForm-based (e.g. the connection-card section), pass explicit
// `dirty` / `saving` / `status` / `onSave` / `onReset` instead.
//
// It renders only the footer's status + actions slots (via <PanelFooter>); the
// sticky band, border and background come from the sheet's footer band.
export function SettingsSaveBar({
  form,
  dirty,
  valid,
  saving,
  status, // explicit mode: "idle" | "saving" | "saved" | "error"
  error,
  onSave,
  onReset,
  saveLabel = "保存",
  resetLabel = "放弃更改",
  cleanHint = "全部更改已保存",
  dirtyHint = "有未保存的更改",
  hideWhenClean = false,
  showReset = true,
  ...rest
}) {
  const isDirty = dirty !== undefined ? dirty : form ? form.isDirty : false;
  const isValid = valid !== undefined ? valid : form ? form.isValid : true;
  const isSaving = saving !== undefined ? saving : form ? form.isSubmitting : false;
  const state = status || (isSaving ? "saving" : "idle");

  if (hideWhenClean && !isDirty && !isSaving && state !== "error" && state !== "saved") return null;

  const handleSave = () => {
    if (!onSave) return;
    if (form && typeof form.handleSubmit === "function") {
      form.handleSubmit(onSave)();
      return;
    }
    onSave();
  };
  const handleReset = () => {
    if (form && typeof form.reset === "function") form.reset();
    if (onReset) onReset();
  };

  let statusNode;
  if (state === "saving") {
    statusNode = (
      <React.Fragment>
        <Spinner size="sm" />
        <span>正在保存…</span>
      </React.Fragment>
    );
  } else if (state === "error") {
    statusNode = (
      <React.Fragment>
        <Icon name="warn" size={15} style={{ color: "var(--danger)" }} />
        <span style={{ color: "var(--danger)" }}>{error || "保存失败，请重试"}</span>
      </React.Fragment>
    );
  } else if (state === "saved" && !isDirty) {
    statusNode = (
      <React.Fragment>
        <Icon name="check" size={15} style={{ color: "var(--ok)" }} />
        <span>已保存</span>
      </React.Fragment>
    );
  } else if (isDirty) {
    statusNode = (
      <React.Fragment>
        <span className="ax-savebar__dot" aria-hidden="true"></span>
        <span>{dirtyHint}</span>
      </React.Fragment>
    );
  } else {
    statusNode = (
      <React.Fragment>
        <Icon name="check" size={15} style={{ color: "var(--text-faint)" }} />
        <span>{cleanHint}</span>
      </React.Fragment>
    );
  }

  const canReset = showReset && (onReset || form);

  return (
    <PanelFooter
      status={statusNode}
      actions={
        <React.Fragment>
          {canReset ? (
            <Button variant="ghost" size="md" disabled={!isDirty || isSaving} onClick={handleReset}>
              {resetLabel}
            </Button>
          ) : null}
          <Button
            variant="primary"
            size="md"
            disabled={!isDirty || !isValid || isSaving}
            aria-busy={isSaving || undefined}
            icon={isSaving ? <Spinner size="sm" /> : <Icon name="save" size={14} />}
            onClick={handleSave}
          >
            {saveLabel}
          </Button>
        </React.Fragment>
      }
      {...rest}
    />
  );
}

if (typeof document !== "undefined" && !document.getElementById("ax-savebar-css")) {
  const s = document.createElement("style");
  s.id = "ax-savebar-css";
  s.textContent = `.ax-savebar__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--warn, var(--text-body)); flex: none; }`;
  document.head.appendChild(s);
}
