/**
 * Renders a model's markdown STRING into typeset, theme-aware React nodes.
 *
 * Composable primitive for any surface that shows model output. `<Message>`
 * uses it internally to render assistant prose, but it stands alone too.
 *
 * Coverage: paragraphs + soft line breaks, **bold**, *italic*, ~~strikethrough~~,
 * `inline code`, fenced ```code blocks``` (rendered via <CodeBlock>), unordered +
 * ordered + nested (mixed) lists, GitHub task lists (- [ ] / - [x]), blockquotes
 * (nested), GFM tables with per-column alignment (overflow scrolls), horizontal
 * rules (--- / *** / ___), #/##/### headings, [links](url), and bare-URL autolinks.
 * Images ![alt](url) render as an inert placeholder chip — never fetched.
 *
 * Safety: the string is parsed to a node tree and emitted as React elements
 * only — never dangerouslySetInnerHTML — so all literal text is auto-escaped
 * and there is no HTML-injection surface. Link hrefs are scheme-sanitized
 * (javascript:/data:/vbscript: are dropped); images are not loaded.
 *
 * Streaming: unterminated inline delimiters (** ` _ ~~ [..]( ) degrade to literal
 * text; a half table, a half blockquote, and an unclosed ``` fence render their
 * partial content, so a half-streamed token never throws or vanishes mid-stream.
 */
export interface MarkdownProps {
  /** The markdown source string. Takes precedence over a string `children`. */
  content?: string;
  /** Alternative to `content`: a markdown string passed as children. */
  children?: string;
  className?: string;
}
export declare function Markdown(props: MarkdownProps): JSX.Element;
