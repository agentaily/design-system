/**
 * Code block with mono lang label and copy button.
 */
export interface CodeBlockProps {
  code: string;
  /** Shown uppercase in the header. @default "text" */
  lang?: string;
}
export declare function CodeBlock(props: CodeBlockProps): JSX.Element;
