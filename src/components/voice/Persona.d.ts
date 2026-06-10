/** Voice persona identity: avatar orb (pulses while speaking), name, tag, description. */
export interface PersonaProps { name?: string; tag?: string; description?: React.ReactNode; avatar?: string; speaking?: boolean; selected?: boolean; }
export declare function Persona(props: PersonaProps): JSX.Element;
