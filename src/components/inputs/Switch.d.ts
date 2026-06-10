/**
 * Square-thumbed toggle — Agentaily's hard-edged take on a switch.
 */
export interface SwitchProps {
  /** Text rendered to the right of the track. */
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: any) => void;
}
export declare function Switch(props: SwitchProps): JSX.Element;
