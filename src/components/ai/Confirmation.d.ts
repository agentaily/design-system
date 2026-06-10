/** Tool-permission prompt: Allow / Deny with optional detail; shows a verdict once resolved. */
export interface ConfirmationProps { title?: string; description?: React.ReactNode; detail?: React.ReactNode; allowLabel?: string; denyLabel?: string; resolved?: "allowed" | "denied"; onAllow?: () => void; onDeny?: () => void; }
export declare function Confirmation(props: ConfirmationProps): JSX.Element;
