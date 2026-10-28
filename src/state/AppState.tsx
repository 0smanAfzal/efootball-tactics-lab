import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { FORMATION_BY_ID } from '../data/formations';
import {
  MAX_SAVED_SQUADS,
  emptyAssignments,
  loadState,
  persistState,
  sanitizeSquad,
} from '../lib/storage';
import type {
  Difficulty,
  FormationId,
  PersistedState,
  PlaystyleId,
  RoleId,
  SavedSquad,
  Squad,
} from '../types';

type Action =
  | { type: 'setPlaystyle'; playstyle: PlaystyleId }
  | { type: 'setPreferred'; formationId: FormationId | null }
  | { type: 'toggleFamiliar'; formationId: FormationId }
  | { type: 'setRisk'; risk: Difficulty }
  | { type: 'setFormation'; formationId: FormationId }
  | { type: 'assign'; index: number; roleId: RoleId | null }
  | { type: 'fill'; assignments: (RoleId | null)[] }
  | { type: 'rename'; name: string }
  | { type: 'clear' }
  | { type: 'loadDraft'; squad: Squad }
  | { type: 'upsertSaved'; saved: SavedSquad[] };

function reducer(state: PersistedState, action: Action): PersistedState {
  switch (action.type) {
    case 'setPlaystyle':
      return { ...state, settings: { ...state.settings, playstyle: action.playstyle } };
    case 'setPreferred':
      return { ...state, settings: { ...state.settings, preferredFormation: action.formationId } };
    case 'toggleFamiliar': {
      const has = state.settings.familiarFormations.includes(action.formationId);
      return {
        ...state,
        settings: {
          ...state.settings,
          familiarFormations: has
            ? state.settings.familiarFormations.filter((id) => id !== action.formationId)
            : [...state.settings.familiarFormations, action.formationId],
        },
      };
    }
    case 'setRisk':
      return { ...state, settings: { ...state.settings, riskTolerance: action.risk } };
    case 'setFormation':
      if (state.draft.formationId === action.formationId) return state;
      return {
        ...state,
        draft: {
          ...state.draft,
          formationId: action.formationId,
          assignments: emptyAssignments(action.formationId),
        },
      };
    case 'assign': {
      const assignments = [...state.draft.assignments];
      assignments[action.index] = action.roleId;
      return { ...state, draft: { ...state.draft, assignments } };
    }
    case 'fill':
      return { ...state, draft: { ...state.draft, assignments: action.assignments } };
    case 'rename':
      return { ...state, draft: { ...state.draft, name: action.name.slice(0, 40) } };
    case 'clear':
      return {
        ...state,
        draft: { ...state.draft, assignments: emptyAssignments(state.draft.formationId) },
      };
    case 'loadDraft':
      return { ...state, draft: action.squad };
    case 'upsertSaved':
      return { ...state, saved: action.saved };
    default:
      return state;
  }
}

export interface SaveResult {
  ok: boolean;
  message: string;
}

interface AppStateValue {
  state: PersistedState;
  setPlaystyle: (playstyle: PlaystyleId) => void;
  setPreferredFormation: (formationId: FormationId | null) => void;
  toggleFamiliar: (formationId: FormationId) => void;
  setRiskTolerance: (risk: Difficulty) => void;
  setFormation: (formationId: FormationId) => void;
  assignRole: (index: number, roleId: RoleId | null) => void;
  autoFill: () => void;
  renameSquad: (name: string) => void;
  clearSquad: () => void;
  saveSquad: () => SaveResult;
  loadSquad: (id: string) => void;
  deleteSquad: (id: string) => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    persistState(state);
  }, [state]);

  const saveSquad = useCallback((): SaveResult => {
    const name = state.draft.name.trim() || 'My Squad';
    const existing = state.saved.find((s) => s.name.toLowerCase() === name.toLowerCase());
    const now = Date.now();
    if (existing) {
      const updated = state.saved.map((s) =>
        s.id === existing.id ? { ...state.draft, name, id: s.id, savedAt: now } : s,
      );
      dispatch({ type: 'upsertSaved', saved: updated });
      return { ok: true, message: `Updated "${name}".` };
    }
    if (state.saved.length >= MAX_SAVED_SQUADS) {
      return {
        ok: false,
        message: `You can keep up to ${MAX_SAVED_SQUADS} saved squads. Delete one to make room.`,
      };
    }
    const entry: SavedSquad = {
      ...state.draft,
      name,
      id: `squad-${now.toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      savedAt: now,
    };
    dispatch({ type: 'upsertSaved', saved: [entry, ...state.saved] });
    return { ok: true, message: `Saved "${name}".` };
  }, [state.draft, state.saved]);

  const value = useMemo<AppStateValue>(
    () => ({
      state,
      setPlaystyle: (playstyle) => dispatch({ type: 'setPlaystyle', playstyle }),
      setPreferredFormation: (formationId) => dispatch({ type: 'setPreferred', formationId }),
      toggleFamiliar: (formationId) => dispatch({ type: 'toggleFamiliar', formationId }),
      setRiskTolerance: (risk) => dispatch({ type: 'setRisk', risk }),
      setFormation: (formationId) => dispatch({ type: 'setFormation', formationId }),
      assignRole: (index, roleId) => dispatch({ type: 'assign', index, roleId }),
      autoFill: () => {
        const formation = FORMATION_BY_ID[state.draft.formationId];
        dispatch({
          type: 'fill',
          assignments: formation.slots.map((slot) => slot.roleHints[0] ?? null),
        });
      },
      renameSquad: (name) => dispatch({ type: 'rename', name }),
      clearSquad: () => dispatch({ type: 'clear' }),
      saveSquad,
      loadSquad: (id) => {
        const found = state.saved.find((s) => s.id === id);
        const squad = found ? sanitizeSquad(found) : null;
        if (squad) dispatch({ type: 'loadDraft', squad });
      },
      deleteSquad: (id) =>
        dispatch({ type: 'upsertSaved', saved: state.saved.filter((s) => s.id !== id) }),
    }),
    [state, saveSquad],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used inside <AppStateProvider>');
  return ctx;
}
