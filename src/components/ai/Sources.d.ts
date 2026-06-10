/**
 * Cited-sources list plus an inline Citation chip for use within prose.
 */
export interface SourceItem {
  title: string;
  url?: string;
}
export interface SourcesProps {
  /** Strings or { title, url } objects. */
  sources: Array<string | SourceItem>;
  /** Mono header label. @default "Sources" */
  label?: string;
}
export declare function Sources(props: SourcesProps): JSX.Element;

export interface CitationProps {
  /** Number shown in the chip, e.g. 1. */
  index: number | string;
  href?: string;
  onClick?: (e: any) => void;
}
/** Inline numbered citation chip — place inside assistant prose. */
export declare function Citation(props: CitationProps): JSX.Element;
