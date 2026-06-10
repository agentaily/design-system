/**
 * @startingPoint section="Chat" subtitle="Auto-growing chat input with model chip and send" viewport="700x180"
 * Chat input: auto-growing textarea, model chip, ⏎-send hint, send button.
 */
export interface ComposerProps {
  value: string;
  onChange?: (value: string) => void;
  /** Fired on send click or Enter (without Shift). */
  onSend?: () => void;
  /** @default "Message Agentaily…" */
  placeholder?: string;
  /** Model chip label. @default "agentaily-2" */
  model?: string;
  onModelClick?: () => void;
  disabled?: boolean;
}
export declare function Composer(props: ComposerProps): JSX.Element;
