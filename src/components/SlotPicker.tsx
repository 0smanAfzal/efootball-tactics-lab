import { useMemo } from 'react';
import { positionName } from '../data/positions';
import { getRole } from '../data/roles';
import { rankRolesForPosition } from '../lib/suitability';
import type { FormationSlot, RoleId } from '../types';
import { Chip } from './Chip';
import { RatingBadge } from './RatingBadge';
import { Sheet } from './Sheet';

interface SlotPickerProps {
  open: boolean;
  slot: FormationSlot | null;
  currentRoleId: RoleId | null;
  onPick: (roleId: RoleId | null) => void;
  onClose: () => void;
}

/** Bottom sheet listing every archetype, ranked by how well it suits the chosen position. */
export function SlotPicker({ open, slot, currentRoleId, onPick, onClose }: SlotPickerProps) {
  const ranked = useMemo(
    () => (slot ? rankRolesForPosition(slot.position, slot.roleHints) : []),
    [slot],
  );

  if (!slot) return null;

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={`Choose a player for ${positionName(slot.position)}`}
      subtitle="Ranked by how well each archetype suits this position."
    >
      <ul className="space-y-2">
        {ranked.map(({ roleId, suitability, isHint }) => {
          const role = getRole(roleId);
          const selected = roleId === currentRoleId;
          return (
            <li key={roleId}>
              <button
                type="button"
                onClick={() => onPick(roleId)}
                aria-pressed={selected}
                aria-label={`${role.name}: ${suitability.rating} fit. ${suitability.reason}${isHint ? ' Recommended for this slot.' : ''}`}
                className={`w-full rounded-xl border p-3 text-left transition ${
                  selected
                    ? 'border-accent bg-accent/10'
                    : 'border-ink-600 bg-ink-850 hover:border-ink-500 hover:bg-ink-800'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-white">{role.name}</span>
                  <RatingBadge rating={suitability.rating} />
                  {isHint && <Chip tone="cyan">Recommended here</Chip>}
                  {selected && <Chip tone="accent">Selected</Chip>}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{suitability.reason}</p>
              </button>
            </li>
          );
        })}
      </ul>
      {currentRoleId && (
        <button type="button" onClick={() => onPick(null)} className="btn-ghost mt-4 w-full">
          Clear this position
        </button>
      )}
    </Sheet>
  );
}
