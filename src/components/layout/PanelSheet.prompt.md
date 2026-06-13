A full-screen **rises-up overlay shell** (L4). The single source of the overlay-shell CSS — downstream code that copied `settings.css`'s `.s-overlay / .s-modal / @keyframes s-rise+s-fade / .s-modal__bar / .s-modal__body / .s-wrap` should delete those copies and mount `<PanelSheet>` instead. Canonical class namespace: **`.ax-psheet*`**.

```jsx
import { PanelSheet, Button } from "@agentaily/design-system";
```

### Pick the right shell

| Need                                                                    | Use                  |
| ----------------------------------------------------------------------- | -------------------- |
| Slides in from an edge (right/left/bottom), ~420px, scrim + blur        | `<Sheet>`            |
| In-flow page inside an AppShell region, never floats                    | a plain page section |
| **Full-screen panel that rises over everything, top bar + scroll body** | **`<PanelSheet>`**   |

### Slots

```jsx
function MyFormsPanel({ onClose }) {
  return (
    <PanelSheet
      open
      crumb="我的表单"
      label="我的表单"
      onClose={onClose} /* renders ✕ + wires Esc */
      actions={
        <Button variant="ghost" size="sm">
          新建表单
        </Button>
      }
    >
      {/* body — width-capped + centered by default (wrap) */}
      <YourFormsList />
    </PanelSheet>
  );
}
```

### With a sticky save footer (aligned with the header)

The footer is a full-bleed band whose content shares the header's gutter, so the status sits under the brand and the actions sit under the ✕. Use the helper classes for the canonical layout:

```jsx
<PanelSheet
  crumb="服务连接"
  onClose={onClose}
  footer={
    <>
      <div className="ax-psheet__foot-status">配置就绪，保存后立即生效。</div>
      <div className="ax-psheet__foot-actions">
        <Button variant="ghost" onClick={onClose}>
          取消
        </Button>
        <Button variant="primary" onClick={save}>
          保存配置
        </Button>
      </div>
    </>
  }
>
  <YourCards />
</PanelSheet>
```

**Best practice — who owns Save?** The _container_ (PanelSheet / SettingsSheet) owns the persistent footer + commit actions; the _section_ (e.g. `IntegrationSettings`) owns the content and exposes its state (readiness / dirty) to the page, which wires the footer button. Never bury the primary commit action in the scrolling body.

- **Default brand:** the bar shows `<BrandMark wordmark blink={false} />` (no blinking cursor) + the breadcrumb. Override with `brand`, or pass `word=""` for the mark only.
- **`wrap`** (default `true`): header / body / footer content all align to one centered `maxWidth` column (default 768) with a shared `gutter` (default 24). Set `wrap={false}` for full-bleed bands (e.g. a split layout with a nav rail — what `SettingsSheet` does) and lay out the inside yourself.
- **`maxWidth` / `gutter`:** override the shared column width / side gutter; they drive `--ax-psheet-max` / `--ax-psheet-gutter`, which all three bands read — change them once and header, body, and footer stay aligned.
- **`barFullWidth`** (default `false`): by default the top bar aligns to the same content column. Set it `true` to let the bar span the full viewport width — e.g. when it carries a wide toolbar, or a left nav rail sits below it (as in `SettingsSheet`).
- **`footer`:** a full-bleed sticky band below the scroll region; its inner content shares the header gutter. Use `ax-psheet__foot-status` (fills left) + `ax-psheet__foot-actions` (pins right) so status aligns under the brand and actions under the ✕. The footer never scrolls.
- **`onClose`:** required to render the ✕ and to enable Esc. Omit it for a panel that can only be dismissed by its own internal actions.
- **Accessibility:** `role="dialog"` + `aria-modal="true"`. Pass `label` (or a string `crumb`) so screen readers announce the panel.
- **Motion:** scrim fades (`--dur-2`), panel rises (`--dur-3`), both `--ease-out`; collapses to no-motion under `prefers-reduced-motion`. Token-driven, monochrome — no new colors.
