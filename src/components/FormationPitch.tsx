import type { Formation } from '../types';
import { PlayerDot } from './PlayerDot';
import { Pitch } from './Pitch';

interface FormationPitchProps {
  formation: Formation;
  /** `xs` = thumbnail dots, `sm` = dots labelled with the position code. */
  size?: 'xs' | 'sm';
  tone?: 'home' | 'away';
  /** Pass null for decorative thumbnails. */
  label?: string | null;
  className?: string;
}

/** A formation drawn on a pitch, using each slot's x/y percentage. */
export function FormationPitch({ formation, size = 'xs', tone = 'home', label, className }: FormationPitchProps) {
  const dotTone = tone === 'home' ? 'accent' : 'opponent';
  const defaultLabel = `${formation.name} formation diagram`;
  return (
    <Pitch
      tone={tone}
      mini={size === 'xs'}
      label={label === undefined ? defaultLabel : label}
      className={className}
    >
      {formation.slots.map((slot, index) => (
        <PlayerDot
          key={`${slot.position}-${index}`}
          x={slot.x}
          y={slot.y}
          label={slot.position}
          size={size}
          tone={slot.position === 'GK' ? 'neutral' : dotTone}
        />
      ))}
    </Pitch>
  );
}
