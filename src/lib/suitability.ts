import { ROLE_BY_ID } from '../data/roles';
import { POSITION_INFO } from '../data/positions';
import type { Position, RoleId, Suitability, SuitabilityRating } from '../types';

/**
 * Which positions sit next to each other on the pitch. Used to decide whether a
 * role that is neither natural nor compatible at a position is still a
 * plausible "stretch" (ok) or simply wrong (poor).
 */
const ADJACENT: Record<Position, Position[]> = {
  GK: [],
  CB: ['DMF', 'LB', 'RB'],
  LB: ['CB', 'LMF', 'DMF'],
  RB: ['CB', 'RMF', 'DMF'],
  DMF: ['CB', 'CMF', 'LB', 'RB'],
  CMF: ['DMF', 'AMF', 'LMF', 'RMF'],
  AMF: ['CMF', 'SS', 'LWF', 'RWF', 'LMF', 'RMF'],
  LMF: ['CMF', 'LWF', 'LB', 'AMF'],
  RMF: ['CMF', 'RWF', 'RB', 'AMF'],
  LWF: ['LMF', 'AMF', 'SS', 'CF'],
  RWF: ['RMF', 'AMF', 'SS', 'CF'],
  SS: ['AMF', 'CF', 'LWF', 'RWF'],
  CF: ['SS', 'LWF', 'RWF'],
};

export const SUITABILITY_SCORE: Record<SuitabilityRating, number> = {
  ideal: 100,
  good: 75,
  ok: 45,
  poor: 12,
};

export const RATING_LABEL: Record<SuitabilityRating, string> = {
  ideal: 'Ideal fit',
  good: 'Good fit',
  ok: 'Stretch',
  poor: 'Poor fit',
};

/**
 * Rates how well a player archetype fits a pitch position.
 *
 *  - ideal: the position is one of the role's natural positions (100)
 *  - good:  the position is listed as compatible (75)
 *  - ok:    the position borders a natural/compatible one, so the role can
 *           function but loses its edge (45)
 *  - poor:  anything else. Goalkeepers and outfielders never mix: a goalkeeper
 *           style outfield (or vice versa) scores 0 because it is unplayable.
 */
export function suitability(roleId: RoleId, position: Position): Suitability {
  const role = ROLE_BY_ID[roleId];
  const positionName = POSITION_INFO[position].name;
  const roleIsKeeper = role.naturalPositions.includes('GK');
  const slotIsKeeper = position === 'GK';

  if (roleIsKeeper !== slotIsKeeper) {
    return {
      rating: 'poor',
      score: 0,
      reason: roleIsKeeper
        ? `${role.name} is a goalkeeper style and cannot play ${positionName}.`
        : `${role.name} is an outfield style and cannot play in goal.`,
    };
  }

  if (role.naturalPositions.includes(position)) {
    return {
      rating: 'ideal',
      score: SUITABILITY_SCORE.ideal,
      reason: `${role.name} is a natural ${positionName}. Prioritise ${role.keyStats.slice(0, 2).join(' and ')}.`,
    };
  }

  if (role.compatiblePositions.includes(position)) {
    return {
      rating: 'good',
      score: SUITABILITY_SCORE.good,
      reason: `${role.name} can cover ${positionName}, but loses some of its edge compared with ${role.naturalPositions.join('/')}.`,
    };
  }

  const reachable = [...role.naturalPositions, ...role.compatiblePositions];
  const isStretch = reachable.some((p) => ADJACENT[p].includes(position));
  if (isStretch) {
    return {
      rating: 'ok',
      score: SUITABILITY_SCORE.ok,
      reason: `${role.name} is a stretch at ${positionName}. Expect weaker positioning and decision-making than at ${role.naturalPositions.join('/')}.`,
    };
  }

  return {
    rating: 'poor',
    score: SUITABILITY_SCORE.poor,
    reason: `${role.name} does not suit ${positionName}. This style is built for ${role.naturalPositions.join('/')}.`,
  };
}

/** Every role ranked from best to worst fit for a position. */
export function rankRolesForPosition(
  position: Position,
  hints: RoleId[],
): { roleId: RoleId; suitability: Suitability; isHint: boolean }[] {
  return (Object.keys(ROLE_BY_ID) as RoleId[])
    .map((roleId) => ({
      roleId,
      suitability: suitability(roleId, position),
      isHint: hints.includes(roleId),
    }))
    .sort((a, b) => {
      if (b.suitability.score !== a.suitability.score) return b.suitability.score - a.suitability.score;
      if (a.isHint !== b.isHint) return a.isHint ? -1 : 1;
      return ROLE_BY_ID[a.roleId].name.localeCompare(ROLE_BY_ID[b.roleId].name);
    });
}
