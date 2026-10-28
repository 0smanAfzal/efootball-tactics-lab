import { getPlaystyle } from '../data/playstyles';
import type { Formation } from '../types';
import { Chip } from './Chip';
import { DifficultyDots } from './DifficultyDots';
import { FormationPitch } from './FormationPitch';

interface FormationCardProps {
  formation: Formation;
  onSelect: (formation: Formation) => void;
}

export function FormationCard({ formation, onSelect }: FormationCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(formation)}
      aria-label={`${formation.name}, ${formation.bestForPlaystyles.map((id) => getPlaystyle(id).name).join(', ')}. Open details`}
      className="card group flex w-full gap-4 p-3 text-left transition hover:border-accent/50 hover:shadow-glow sm:p-4"
    >
      <div className="w-[88px] shrink-0">
        <FormationPitch formation={formation} label={null} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <h3 className="text-lg font-bold text-white">{formation.name}</h3>
        </div>
        <div className="mt-1">
          <DifficultyDots level={formation.difficulty} />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {formation.bestForPlaystyles.map((id) => (
            <Chip key={id} tone="accent">
              {getPlaystyle(id).name}
            </Chip>
          ))}
        </div>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">{formation.strengths[0]}.</p>
      </div>
    </button>
  );
}
