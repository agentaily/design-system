/**
 * Two-state pressable button, and a segmented ToggleGroup of them.
 */
export interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}
export declare function Toggle(props: ToggleProps): JSX.Element;

export interface ToggleGroupProps {
  /** Currently selected value (single-select). */
  value?: string;
  /** Strings or { value, label, icon? }. */
  options: Array<string | { value: string; label?: string; icon?: React.ReactNode }>;
  onChange?: (value: string) => void;
}
export declare function ToggleGroup(props: ToggleGroupProps): JSX.Element;
