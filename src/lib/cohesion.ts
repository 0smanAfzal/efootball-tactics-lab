import { FORMATION_BY_ID } from '../data/formations';
import { POSITION_INFO } from '../data/positions';
import { PLAYSTYLE_BY_ID } from '../data/playstyles';
import { ROLE_BY_ID } from '../data/roles';
import { suitability } from './suitability';
import type {
  CohesionReport,
  CohesionWarning,
  PlaystyleId,
  Position,
  RoleId,
  RoleTrait,
  SlotReport,
  Squad,
} from '../types';

const WEIGHTS = { positionalFit: 0.5, roleBalance: 0.25, playstyleMatch: 0.25 } as const;
/** Added to a slot's score when the chosen role is one of the formation's hints for that slot. */
const HINT_BONUS = 8;

const ATTACK_POSITIONS: Position[] = ['CF', 'SS', 'LWF', 'RWF'];
const MIDFIELD_POSITIONS: Position[] = ['DMF', 'CMF', 'AMF', 'LMF', 'RMF'];
const DEFENSIVE_SCREEN_POSITIONS: Position[] = ['DMF', 'CMF', 'CB'];
const FIXED_LINE_POSITIONS: Position[] = ['GK', 'CB', 'LB', 'RB'];

/** Traits each playstyle needs at least once to work as intended. */
const PLAYSTYLE_REQUIREMENTS: Record<
  PlaystyleId,
  { traits: RoleTrait[]; minCount: number; message: string }
> = {
  'possession-game': {
    traits: ['playmaker', 'builder'],
    minCount: 1,
    message: 'Possession Game needs a deep passer (Orchestrator, Build Up, Classic No. 10 or Creative Playmaker) to control the tempo.',
  },
  'quick-counter': {
    traits: ['runner', 'decoy'],
    minCount: 1,
    message: 'Quick Counter needs a runner (Goal Poacher, Dummy Runner or Prolific Winger) to attack the space you win the ball into.',
  },
  'long-ball-counter': {
    traits: ['holder', 'ball-winner'],
    minCount: 2,
    message: 'Long Ball Counter needs at least two ball-winners or holders so the deep block holds.',
  },
  'out-wide': {
    traits: ['wide'],
    minCount: 2,
    message: 'Out Wide needs at least two wide specialists (wingers, wing-backs or crossers) to stretch the pitch.',
  },
  'long-ball': {
    traits: ['target'],
    minCount: 1,
    message: 'Long Ball needs a Target Man to win the first ball and hold it up.',
  },
};

function round(value: number): number {
  return Math.round(Math.max(0, Math.min(100, value)));
}

/**
 * Scores a squad from 0-100 using three weighted components:
 *
 *  - positionalFit (50%): average suitability of every slot. An empty slot counts as 0,
 *    because a hole in the XI is the most damaging thing you can have. Choosing a role the
 *    formation lists as a hint for that slot adds a small bonus.
 *  - roleBalance (25%): starts at 100 and loses points for structural gaps (no finisher,
 *    no creator, nobody shielding the back line, too many copies of one role, both
 *    full-backs attacking with no holder).
 *  - playstyleMatch (25%): how well the chosen roles and formation fit the manager's
 *    playstyle, plus whether the playstyle's key requirement is present.
 */
export function evaluateSquad(squad: Squad, playstyleId: PlaystyleId): CohesionReport {
  const formation = FORMATION_BY_ID[squad.formationId];
  const playstyle = PLAYSTYLE_BY_ID[playstyleId];
  const warnings: CohesionWarning[] = [];

  const slots: SlotReport[] = formation.slots.map((slot, index) => {
    const roleId = squad.assignments[index] ?? null;
    return {
      index,
      position: slot.position,
      roleId,
      suitability: roleId ? suitability(roleId, slot.position) : null,
      isHint: roleId ? slot.roleHints.includes(roleId) : false,
    };
  });

  const filledSlots = slots.filter((s) => s.roleId !== null);
  const filled = filledSlots.length;

  /* ------------------------------ positional fit ----------------------------- */
  const fitTotal = slots.reduce((sum, s) => {
    if (!s.suitability) return sum;
    return sum + Math.min(100, s.suitability.score + (s.isHint ? HINT_BONUS : 0));
  }, 0);
  const positionalFit = round(fitTotal / formation.slots.length);

  if (filled < formation.slots.length) {
    const missing = formation.slots.length - filled;
    warnings.push({
      severity: filled === 0 ? 'info' : 'warn',
      message: filled === 0
        ? 'Start by tapping a position on the pitch and choosing a player archetype.'
        : `${missing} ${missing === 1 ? 'position is' : 'positions are'} still empty and counted as zero.`,
    });
  }

  for (const s of filledSlots) {
    if (!s.suitability || !s.roleId) continue;
    const role = ROLE_BY_ID[s.roleId];
    const pos = POSITION_INFO[s.position].name;
    if (s.suitability.rating === 'poor') {
      warnings.push({ severity: 'critical', message: `${role.name} at ${pos} is a poor fit.` });
    } else if (s.suitability.rating === 'ok') {
      warnings.push({ severity: 'warn', message: `${role.name} at ${pos} is a stretch and will underperform.` });
    }
  }

  /* ------------------------------- role balance ------------------------------ */
  let roleBalance = 0;
  if (filled > 0) {
    roleBalance = 100;
    const roles = filledSlots.map((s) => ({ role: ROLE_BY_ID[s.roleId as RoleId], position: s.position }));
    const hasTrait = (trait: RoleTrait, positions?: Position[]) =>
      roles.some((r) => r.role.traits.includes(trait) && (!positions || positions.includes(r.position)));

    const hasAttackSlots = formation.slots.some((s) => ATTACK_POSITIONS.includes(s.position));
    const filledAttack = roles.some((r) => ATTACK_POSITIONS.includes(r.position));
    if (hasAttackSlots && filledAttack && !hasTrait('finisher')) {
      roleBalance -= 20;
      warnings.push({ severity: 'warn', message: 'No dedicated finisher: add a Goal Poacher, Fox in the Box or Prolific Winger.' });
    }

    const filledMidfield = roles.some((r) => MIDFIELD_POSITIONS.includes(r.position));
    if (filledMidfield && !hasTrait('creator') && !hasTrait('playmaker')) {
      roleBalance -= 15;
      warnings.push({ severity: 'warn', message: 'No creative outlet: nobody will unlock a compact defence.' });
    }

    const filledScreen = roles.some((r) => DEFENSIVE_SCREEN_POSITIONS.includes(r.position));
    if (filledScreen && !hasTrait('ball-winner') && !hasTrait('holder')) {
      roleBalance -= 20;
      warnings.push({ severity: 'warn', message: 'Nobody is shielding the back line: add The Destroyer or an Anchor Man.' });
    }

    // Too many copies of the same role (defensive-line roles are naturally duplicated).
    const counts = new Map<RoleId, number>();
    for (const r of roles) counts.set(r.role.id, (counts.get(r.role.id) ?? 0) + 1);
    for (const [roleId, count] of counts) {
      const role = ROLE_BY_ID[roleId];
      const isFixedLine = role.naturalPositions.some((p) => FIXED_LINE_POSITIONS.includes(p));
      if (!isFixedLine && count > 2) {
        roleBalance -= 8 * (count - 2);
        warnings.push({ severity: 'info', message: `${count} players share the ${role.name} style; the team becomes predictable.` });
      }
    }

    const fullBacks = roles.filter((r) => r.position === 'LB' || r.position === 'RB');
    const bothOverlap = fullBacks.length === 2 && fullBacks.every((r) => r.role.traits.includes('overlap'));
    if (bothOverlap && !hasTrait('holder')) {
      roleBalance -= 10;
      warnings.push({ severity: 'warn', message: 'Both full-backs attack and nobody holds: expect to be exposed on counters.' });
    }

    if (!roles.some((r) => r.position === 'GK')) {
      roleBalance -= 15;
      warnings.push({ severity: 'critical', message: 'No goalkeeper selected.' });
    }
  }
  roleBalance = round(roleBalance);

  /* ----------------------------- playstyle match ----------------------------- */
  let playstyleMatch = 0;
  if (filled > 0) {
    const roleAffinity =
      filledSlots.reduce(
        (sum, s) => sum + (ROLE_BY_ID[s.roleId as RoleId].bestPlaystyles.includes(playstyleId) ? 100 : 40),
        0,
      ) / filled;

    const formationFit = formation.bestForPlaystyles.includes(playstyleId) ? 100 : 55;

    const req = PLAYSTYLE_REQUIREMENTS[playstyleId];
    const reqCount = filledSlots.filter((s) =>
      ROLE_BY_ID[s.roleId as RoleId].traits.some((t) => req.traits.includes(t)),
    ).length;
    const requirementScore = Math.min(100, (reqCount / req.minCount) * 100);
    if (reqCount < req.minCount) warnings.push({ severity: 'warn', message: req.message });

    if (formationFit < 100) {
      warnings.push({
        severity: 'info',
        message: `${formation.name} is not a core ${playstyle.name} shape; consider ${playstyle.recommendedFormations
          .slice(0, 2)
          .map((id) => FORMATION_BY_ID[id].name)
          .join(' or ')}.`,
      });
    }

    playstyleMatch = round(roleAffinity * 0.6 + formationFit * 0.2 + requirementScore * 0.2);
  }

  const total = round(
    positionalFit * WEIGHTS.positionalFit +
      roleBalance * WEIGHTS.roleBalance +
      playstyleMatch * WEIGHTS.playstyleMatch,
  );

  return { total, positionalFit, roleBalance, playstyleMatch, filled, warnings, slots };
}

export function cohesionLabel(total: number): string {
  if (total >= 85) return 'Title contender';
  if (total >= 70) return 'Strong';
  if (total >= 50) return 'Needs work';
  if (total > 0) return 'Unbalanced';
  return 'Empty squad';
}
