/**
 * Element-targeting overlay for "point at what to change" review. Hover
 * highlights any element carrying `data-mk-label`; click selects it; a note
 * composer emits `onSend("〔label · kind〕note")`. Mount inside a
 * position:relative container — the layer fills it (inset:0). Esc deselects,
 * then closes. Personal tool — nothing is persisted.
 */
export interface MarkupLayerProps {
  /** Called on Esc (when nothing selected) or the 退出 button. */
  onClose?: () => void;
  /** Called with the composed message: `〔label · kind〕note`. */
  onSend?: (message: string) => void;
  /** Composer textarea placeholder. */
  placeholder?: string;
  /** Hint pill text before a target is picked. */
  hintIdle?: string;
  /** Hint pill text while composing on a selected target. */
  hintActive?: string;
}
export declare function MarkupLayer(props: MarkupLayerProps): JSX.Element;
