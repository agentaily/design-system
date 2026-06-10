/** Searchable single-select with keyboard nav and a check on the chosen option. */
export interface ComboboxProps { value?: string; options: Array<string | { value: string; label: string }>; placeholder?: string; searchPlaceholder?: string; onChange?: (value: string) => void; }
export declare function Combobox(props: ComboboxProps): JSX.Element;
