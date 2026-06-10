/**
 * Square avatar (radius-2) with mono initials fallback.
 */
export interface AvatarProps {
  /** Used for initials + title attr. */
  name?: string;
  /** Image url; omit for initials. */
  src?: string;
  /** 24 / 32 / 44px. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Inverted fill (used for the Agentaily assistant). @default false */
  solid?: boolean;
}
export declare function Avatar(props: AvatarProps): JSX.Element;
