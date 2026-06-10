/**
 * File attachment display in three layouts: grid thumbnails, inline badges, list rows.
 */
export interface AttachmentFile {
  id?: string | number;
  name: string;
  /** MIME type — drives the auto icon + list metadata. */
  type?: string;
  /** Human size, e.g. "2.4 MB" (list variant). */
  size?: string;
  /** Image src for grid thumbnails. */
  src?: string;
  /** Override auto media category. */
  category?: "image" | "video" | "audio" | "document";
}
export interface AttachmentsProps {
  files: AttachmentFile[];
  /** @default "list" */
  variant?: "grid" | "inline" | "list";
  /** Renders a ✕ per item when provided; receives the file id (or index). */
  onRemove?: (id: string | number) => void;
}
export declare function Attachments(props: AttachmentsProps): JSX.Element;
