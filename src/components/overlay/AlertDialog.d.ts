/** Confirmation modal with a tone icon and cancel/confirm actions. */
export interface AlertDialogProps { open?: boolean; inline?: boolean; tone?: "danger" | "warn"; title?: React.ReactNode; description?: React.ReactNode; cancelLabel?: string; confirmLabel?: string; onCancel?: () => void; onConfirm?: () => void; }
export declare function AlertDialog(props: AlertDialogProps): JSX.Element;
