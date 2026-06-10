/**
 * Hairline-bordered surface. ticks adds Agentaily's corner-tick frame motif.
 */
export interface CardProps {
  /** Mono uppercase eyebrow above the title. */
  eyebrow?: string;
  title?: string;
  /** Inner padding. @default "md" */
  padding?: "none" | "md" | "lg";
  /** Draw corner ticks on opposite corners. @default false */
  ticks?: boolean;
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): JSX.Element;
