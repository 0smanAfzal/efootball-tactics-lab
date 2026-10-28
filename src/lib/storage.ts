import { FORMATION_BY_ID } from '../data/formations';
import { PLAYSTYLE_BY_ID } from '../data/playstyles';
import { ROLE_BY_ID } from '../data/roles';
import type {
  Difficulty,
  FormationId,
  PersistedState,
  PlaystyleId,
  RoleId,
  SavedSquad,
  Settings,
  Squad,
} from '../types';

export const STORAGE_KEY = 'efootball-tactics-lab:v1';
export const MAX_SAVED_SQUADS = 12;

export function emptyAssignments(formationId: FormationId): (RoleId | null)[] {
  return FORMATION_BY_ID[formationId].slots.map(() => null);
}

export function defaultSettings(): Settings {
  return {
    playstyle: 'possession-game',
    preferredFormation: null,
    familiarFormations: [],
    riskTolerance: 2,
  };
}

export function defaultSquad(): Squad {
  return {
    name: 'My Squad',
    formationId: '4-2-3-1',
    assignments: emptyAssignments('4-2-3-1'),
  };
}

export function defaultState(): PersistedState {
  return { version: 1, settings: defaultSettings(), draft: defaultSquad(), saved: [] };
}

/* -------------------------------------------------------------------------- */
/*  Validation: never trust localStorage, it may be stale or hand-edited.     */
/* -------------------------------------------------------------------------- */

const isFormationId = (v: unknown): v is FormationId => typeof v === 'string' && v in FORMATION_BY_ID;
const isPlaystyleId = (v: unknown): v is PlaystyleId => typeof v === 'string' && v in PLAYSTYLE_BY_ID;
const isRoleId = (v: unknown): v is RoleId => typeof v === 'string' && v in ROLE_BY_ID;
const isDifficulty = (v: unknown): v is Difficulty => v === 1 || v === 2 || v === 3;

export function sanitizeSquad(value: unknown): Squad | null {
  if (typeof value !== 'object' || value === null) return null;
  const v = value as Record<string, unknown>;
  if (!isFormationId(v.formationId)) return null;
  const slotCount = FORMATION_BY_ID[v.formationId].slots.length;
  const raw = Array.isArray(v.assignments) ? v.assignments : [];
  const assignments: (RoleId | null)[] = Array.from({ length: slotCount }, (_, i) =>
    isRoleId(raw[i]) ? raw[i] : null,
  );
  const name = typeof v.name === 'string' && v.name.trim() ? v.name.trim().slice(0, 40) : 'My Squad';
  return { name, formationId: v.formationId, assignments };
}

function sanitizeSettings(value: unknown): Settings {
  const base = defaultSettings();
  if (typeof value !== 'object' || value === null) return base;
  const v = value as Record<string, unknown>;
  return {
    playstyle: isPlaystyleId(v.playstyle) ? v.playstyle : base.playstyle,
    preferredFormation: isFormationId(v.preferredFormation) ? v.preferredFormation : null,
    familiarFormations: Array.isArray(v.familiarFormations)
      ? Array.from(new Set(v.familiarFormations.filter(isFormationId)))
      : [],
    riskTolerance: isDifficulty(v.riskTolerance) ? v.riskTolerance : base.riskTolerance,
  };
}

function sanitizeSaved(value: unknown): SavedSquad[] {
  if (!Array.isArray(value)) return [];
  const result: SavedSquad[] = [];
  for (const item of value) {
    const squad = sanitizeSquad(item);
    if (!squad || typeof item !== 'object' || item === null) continue;
    const meta = item as Record<string, unknown>;
    result.push({
      ...squad,
      id: typeof meta.id === 'string' ? meta.id : `squad-${result.length}-${Date.now()}`,
      savedAt: typeof meta.savedAt === 'number' ? meta.savedAt : Date.now(),
    });
  }
  return result.slice(0, MAX_SAVED_SQUADS);
}

export function loadState(): PersistedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return defaultState();
    const p = parsed as Record<string, unknown>;
    return {
      version: 1,
      settings: sanitizeSettings(p.settings),
      draft: sanitizeSquad(p.draft) ?? defaultSquad(),
      saved: sanitizeSaved(p.saved),
    };
  } catch {
    return defaultState();
  }
}

export function persistState(state: PersistedState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private mode or quota exceeded: the app still works, it just won't remember.
  }
}
