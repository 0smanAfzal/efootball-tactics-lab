import { DIFFICULTY_LABEL } from '../data/formations';
import type { Difficulty } from '../types';

/** Three dots plus the written level, so difficulty is readable without colour. */
export function DifficultyDots({ level }: { level: Difficulty }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-300" title={`Difficulty ${level} of 3`}>
      <span className="flex gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span key={n} className={`h-2 w-2 rounded-full ${n <= level ? 'bg-accent' : 'bg-ink-600'}`} />
        ))}
      </span>
      {DIFFICULTY_LABEL[level]}
    </span>
  );
}
