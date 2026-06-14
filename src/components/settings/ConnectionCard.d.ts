/**
 * ConnectionCard — the shared shell for a service-connection card (L3 organism),
 * built on the base `<Card>` primitive (`padding="none"` + status tint + the
 * header / body / TestRow bands). `DeepSeekCard` and any future
 * connector compose it and supply only their own fields as `children`.
 *
 * Pure-display: the one bit of local state is the collapse toggle — a connected
 * card (`status === "ok"`) starts collapsed to its header row; collapsed → the
 * whole row expands, expanded → the chevron button collapses. The summary line
 * is responsive (inline beside the title, stacks below at ≤560px).
 */
/**
 * This shell's own chrome strings, merged over the English defaults. DS is
 * locale-agnostic — pass `copy` to localize. The footer TestRow's strings are
 * localized separately via the `testCopy` prop.
 */
export interface ConnectionCardCopy {
  /** Collapsed summary when connected (no `summary`/`result`). @default "Connected" */
  connected?: string;
  /** Collapsed summary when not connected. @default "Not connected" */
  disconnected?: string;
  /** aria-label for the collapse toggle. @default "Collapse" */
  collapse?: string;
}
export interface ConnectionCardProps {
  /** Header icon — an Icon name (string) or a ready node. */
  icon?: string | React.ReactNode;
  /** Header title. */
  title?: React.ReactNode;
  /** Description shown at the top of the body when expanded. */
  desc?: React.ReactNode;
  /** Connection status — drives the StatusPill, the card tint, and the TestRow. @default "idle" */
  status?: "idle" | "testing" | "ok" | "error";
  /** Result line shown in the TestRow for ok / error. */
  result?: string;
  /** Collapsed one-line summary. @default `result` (or copy.connected/disconnected by status). */
  summary?: React.ReactNode;
  /** Fires when the user clicks Test in the footer. */
  onTest?: () => void;
  /** Disable the Test button. @default false */
  testDisabled?: boolean;
  /** Idle hint in the TestRow before the first test. */
  idleHint?: string;
  /** Render the TestRow footer. @default true */
  showTest?: boolean;
  /** Allow collapse-when-connected. @default true */
  collapsible?: boolean;
  /** Controlled expanded state (overrides the connected-collapses-by-default behavior). */
  expanded?: boolean;
  onExpandedChange?: (open: boolean) => void;
  /** Localizable chrome strings for this shell, merged over the English defaults. */
  copy?: ConnectionCardCopy;
  /** Localizable strings forwarded to the footer TestRow (as its `copy`). */
  testCopy?: import("./TestRow").TestRowCopy;
  /** The connector's own fields (form body). */
  children?: React.ReactNode;
}
export declare function ConnectionCard(props: ConnectionCardProps): JSX.Element;
