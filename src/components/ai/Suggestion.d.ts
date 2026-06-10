/**
 * Suggested-prompt chips for empty states and follow-ups.
 */
export interface SuggestionProps {
  /** Optional leading icon. */
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
}
export declare function Suggestion(props: SuggestionProps): JSX.Element;

export interface SuggestionsProps {
  /** Strings or { label, value?, icon? }. */
  items: Array<string | { label: string; value?: string; icon?: React.ReactNode }>;
  onSelect?: (value: string) => void;
  /** Single-row horizontal scroll instead of wrap. @default false */
  scroll?: boolean;
}
export declare function Suggestions(props: SuggestionsProps): JSX.Element;
