import type { Formation } from '../types';
import { FormationPitch } from './FormationPitch';

interface ComparisonPitchProps {
  yours: Formation;
  opponent: Formation;
}

/** Two shapes side by side: yours in green, the opponent's in blue. */
export function ComparisonPitch({ yours, opponent }: ComparisonPitchProps) {
  return (
    <figure className="grid grid-cols-2 gap-3 sm:gap-5">
      <div>
        <FormationPitch formation={yours} size="sm" tone="home" label={`Your shape: ${yours.name}`} />
        <figcaption className="mt-2 text-center text-sm">
          <span className="font-bold text-accent">You</span>
          <span className="text-slate-300"> · {yours.name}</span>
        </figcaption>
      </div>
      <div>
        <FormationPitch formation={opponent} size="sm" tone="away" label={`Opponent shape: ${opponent.name}`} />
        <figcaption className="mt-2 text-center text-sm">
          <span className="font-bold text-signal-cyan">Opponent</span>
          <span className="text-slate-300"> · {opponent.name}</span>
        </figcaption>
      </div>
    </figure>
  );
}
