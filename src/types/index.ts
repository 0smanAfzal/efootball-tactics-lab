/* -------------------------------------------------------------------------- */
/*  Core identifiers                                                          */
/* -------------------------------------------------------------------------- */

export type Position =
  | 'GK'
  | 'CB'
  | 'LB'
  | 'RB'
  | 'DMF'
  | 'CMF'
  | 'AMF'
  | 'LMF'
  | 'RMF'
  | 'LWF'
  | 'RWF'
  | 'SS'
  | 'CF';

export const POSITIONS: readonly Position[] = [
  'GK',
  'CB',
  'LB',
  'RB',
  'DMF',
  'CMF',
  'AMF',
  'LMF',
  'RMF',
  'LWF',
  'RWF',
  'SS',
  'CF',
] as const;

export type PlaystyleId =
  | 'possession-game'
  | 'quick-counter'
  | 'long-ball-counter'
  | 'out-wide'
  | 'long-ball';

export type FormationId =
  | '4-3-3'
  | '4-3-3-2dmf'
  | '4-2-1-3'
  | '4-2-3-1'
  | '4-2-2-2'
  | '4-1-4-1'
  | '4-4-2'
  | '4-4-1-1'
  | '4-2-1-2-1'
  | '4-1-2-3'
  | '3-5-2'
  | '3-4-3'
  | '3-4-1-2'
  | '3-2-4-1'
  | '5-3-2'
  | '5-2-2-1'
  | '5-4-1'
  | '4-3-1-2';

export type RoleId =
  | 'goal-poacher'
  | 'fox-in-the-box'
  | 'target-man'
  | 'deep-lying-forward'
  | 'dummy-runner'
  | 'creative-playmaker'
  | 'hole-player'
  | 'classic-no-10'
  | 'box-to-box'
  | 'the-destroyer'
  | 'anchor-man'
  | 'orchestrator'
  | 'build-up'
  | 'extra-frontman'
  | 'offensive-full-back'
  | 'defensive-full-back'
  | 'full-back-finisher'
  | 'defensive-goalkeeper'
  | 'offensive-goalkeeper'
  | 'prolific-winger'
  | 'roaming-flank'
  | 'cross-specialist';

/* -------------------------------------------------------------------------- */
/*  Formations                                                                */
/* -------------------------------------------------------------------------- */

export interface FormationSlot {
  position: Position;
  /** 0 = left touchline, 100 = right touchline (attacking up the screen). */
  x: number;
  /** 0 = opponent goal line, 100 = own goal line. */
  y: number;
  /** Roles that make the most sense in this specific slot, best first. */
  roleHints: RoleId[];
}

export type Difficulty = 1 | 2 | 3;

export interface Formation {
  id: FormationId;
  name: string;
  shape: string;
  slots: FormationSlot[];
  strengths: string[];
  weaknesses: string[];
  bestForPlaystyles: PlaystyleId[];
  /** One-line reason why the shape suits each playstyle listed in bestForPlaystyles. */
  styleFit: Partial<Record<PlaystyleId, string>>;
  difficulty: Difficulty;
  description: string;
}

/* -------------------------------------------------------------------------- */
/*  Playstyles and tactics                                                    */
/* -------------------------------------------------------------------------- */

export interface SliderSetting {
  value: number;
  max: number;
  explanation: string;
}

export interface ChoiceSetting {
  value: string;
  explanation: string;
}

export interface TacticPreset {
  attackingLevel: SliderSetting;
  defensiveLevel: SliderSetting;
  pressure: SliderSetting;
  width: SliderSetting;
  depth: SliderSetting;
  supportRange: SliderSetting;
  defensiveLine: SliderSetting;
  compactness: SliderSetting;
  buildUp: ChoiceSetting;
  attackArea: ChoiceSetting;
  positioning: ChoiceSetting;
  defensiveStyle: ChoiceSetting;
  containmentArea: ChoiceSetting;
  pressuring: ChoiceSetting;
}

export type TacticKey = keyof TacticPreset;

export interface Playstyle {
  id: PlaystyleId;
  name: string;
  summary: string;
  idealFor: string;
  watchOut: string;
  keyAttributes: string[];
  /** Best first. */
  recommendedFormations: FormationId[];
  priorityRoles: RoleId[];
  tacticPresets: TacticPreset;
}

/* -------------------------------------------------------------------------- */
/*  Roles                                                                     */
/* -------------------------------------------------------------------------- */

export type RoleTrait =
  | 'finisher'
  | 'creator'
  | 'playmaker'
  | 'ball-winner'
  | 'holder'
  | 'engine'
  | 'runner'
  | 'target'
  | 'linkup'
  | 'wide'
  | 'builder'
  | 'keeper'
  | 'decoy'
  | 'overlap';

export interface Role {
  id: RoleId;
  name: string;
  summary: string;
  naturalPositions: Position[];
  compatiblePositions: Position[];
  keyStats: string[];
  strengths: string[];
  weaknesses: string[];
  bestPlaystyles: PlaystyleId[];
  traits: RoleTrait[];
}

export type SuitabilityRating = 'ideal' | 'good' | 'ok' | 'poor';

export interface Suitability {
  rating: SuitabilityRating;
  /** 0-100. */
  score: number;
  reason: string;
}

/* -------------------------------------------------------------------------- */
/*  Counters                                                                  */
/* -------------------------------------------------------------------------- */

export type CounterTag =
  | 'midfield-overload'
  | 'wide-overload'
  | 'space-behind'
  | 'compact-block'
  | 'high-press'
  | 'aerial-threat'
  | 'central-lane'
  | 'width-stretch';

export interface CounterEntry {
  counterId: FormationId;
  /** Baseline matchup quality, 0-100, before the user's profile is applied. */
  score: number;
  why: string;
  keyInstructions: string[];
  dangerZones: string[];
  tags: CounterTag[];
}

export interface CounterProfile {
  playstyle: PlaystyleId;
  preferredFormation: FormationId | null;
  familiarFormations: FormationId[];
  /** How much formation complexity the user is comfortable with. */
  riskTolerance: Difficulty;
}

export interface ScoreAdjustment {
  label: string;
  delta: number;
  note: string;
}

export interface RankedCounter {
  entry: CounterEntry;
  baseScore: number;
  finalScore: number;
  adjustments: ScoreAdjustment[];
  /** Rank in the static, profile-agnostic list (1-based). */
  baselineRank: number;
  /** Rank after the user's profile was applied (1-based). */
  rank: number;
  playstyleTip: string;
}

/* -------------------------------------------------------------------------- */
/*  Advisor + squad                                                           */
/* -------------------------------------------------------------------------- */

export interface FormationRecommendation {
  formation: Formation;
  score: number;
  reasons: string[];
}

export interface Squad {
  name: string;
  formationId: FormationId;
  /** One entry per formation slot, in slot order. */
  assignments: (RoleId | null)[];
}

export interface SavedSquad extends Squad {
  id: string;
  savedAt: number;
}

export interface Settings {
  playstyle: PlaystyleId;
  preferredFormation: FormationId | null;
  familiarFormations: FormationId[];
  riskTolerance: Difficulty;
}

export interface PersistedState {
  version: 1;
  settings: Settings;
  draft: Squad;
  saved: SavedSquad[];
}

export interface SlotReport {
  index: number;
  position: Position;
  roleId: RoleId | null;
  suitability: Suitability | null;
  isHint: boolean;
}

export type WarningSeverity = 'info' | 'warn' | 'critical';

export interface CohesionWarning {
  severity: WarningSeverity;
  message: string;
}

export interface CohesionReport {
  total: number;
  positionalFit: number;
  roleBalance: number;
  playstyleMatch: number;
  filled: number;
  warnings: CohesionWarning[];
  slots: SlotReport[];
}
