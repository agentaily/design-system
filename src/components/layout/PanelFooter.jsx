import React from "react";

// PanelFooter — the optional content component for a PanelSheet / SettingsSheet
// `footer` slot. It lays out a status region (left, fills) + an actions region
// (right, pinned) that align to the sheet's gutters; pass `status` and `actions`,
// and/or freeform `children` between them. It renders only these slots — the
// sticky band, border and background come from the sheet's footer band itself
// (PanelSheet `.ax-psheet__foot` / SettingsSheet `.ax-ssheet__foot`), and the
// `.ax-psheet__foot-status` / `.ax-psheet__foot-actions` helper classes it uses
// are injected by PanelSheet. Use it as: `footer={<PanelFooter status=… actions=… />}`.
export function PanelFooter({ status, actions, children, ...rest }) {
  return (
    <React.Fragment>
      {status != null ? (
        <div className="ax-psheet__foot-status" {...rest}>
          {status}
        </div>
      ) : null}
      {children}
      {actions != null ? <div className="ax-psheet__foot-actions">{actions}</div> : null}
    </React.Fragment>
  );
}
