/** Browser-chrome wrapper (URL bar + lock + refresh) around an iframe or custom content. */
export interface WebPreviewProps { url?: string; height?: number; src?: string; srcDoc?: string; children?: React.ReactNode; }
export declare function WebPreview(props: WebPreviewProps): JSX.Element;
