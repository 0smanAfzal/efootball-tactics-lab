import { COUNTERS } from '../data/counters';
import { FORMATION_BY_ID } from '../data/formations';
import { PLAYSTYLE_BY_ID } from '../data/playstyles';
import type {
  CounterEntry,
  CounterProfile,
  CounterTag,
  FormationId,
  PlaystyleId,
  RankedCounter,
  ScoreAdjustment,
} from '../types';

/**
 * How the counter engine works
 * ----------------------------
 * 1. Start from the hand-authored baseline score of each counter candidate
 *    (src/data/counters.ts). That score answers "how well does this shape beat
 *    the opponent's shape in the abstract?".
 * 2. Apply three profile-dependent adjustments so the ranking reflects the
 *    person actually playing:
 *      a. Playstyle fit: each counter carries tags (what it does tactically).
 *         Every playstyle values some tags and dislikes others, so a Quick
 *         Counter player sees "space behind" counters rise while a Possession
 *         player sees "midfield overload" counters rise. The formation itself
 *         also earns a bonus if it is one of the playstyle's recommended shapes.
 *      b. Familiarity: your usual formation and formations you have marked as
 *         familiar get a bonus; unfamiliar shapes are penalised in proportion
 *         to their difficulty and how much risk you said you are comfortable
 *         with.
 *      c. Difficulty: a complex shape you do not know can lose more than it
 *         gains, so hard formations above your risk tolerance are discounted.
 * 3. Clamp to 0-100 and sort. The baseline rank is kept so the UI can show how
 *    far your profile moved each option.
 */

/**
 * Positive values mean the playstyle benefits from that tactical idea.
 * Magnitudes are deliberately large enough (up to +9) to reorder candidates
 * whose baseline scores are 2-4 points apart.
 */
const TAG_AFFINITY: Record<PlaystyleId, Partial<Record<CounterTag, number>>> = {
  'possession-game': {
    'midfield-overload': 8,
    'central-lane': 5,
    'high-press': 4,
    'width-stretch': 2,
    'compact-block': -3,
    'space-behind': -4,
    'aerial-threat': -6,
  },
  'quick-counter': {
    'space-behind': 9,
    'compact-block': 6,
    'central-lane': 2,
    'wide-overload': 1,
    'midfield-overload': -2,
    'high-press': -6,
  },
  'long-ball-counter': {
    'compact-block': 7,
    'space-behind': 8,
    'aerial-threat': 3,
    'high-press': -7,
    'midfield-overload': -3,
    'width-stretch': -2,
  },
  'out-wide': {
    'wide-overload': 9,
    'width-stretch': 8,
    'aerial-threat': 2,
    'midfield-overload': -2,
    'compact-block': -3,
  },
  'long-ball': {
    'aerial-threat': 9,
    'space-behind': 4,
    'central-lane': 2,
    'wide-overload': 1,
    'midfield-overload': -5,
    'high-press': -2,
  },
};

const RECOMMENDED_RANK_BONUS = [8, 6, 5, 3, 2];
const BEST_FOR_BONUS = 4;
const PREFERRED_BONUS = 10;
const FAMILIAR_BONUS = 6;
const UNFAMILIAR_BASE_PENALTY = 3;
const DIFFICULTY_PENALTY_PER_STEP = 5;
const TAG_CAP = 12;

const STYLE_TIPS: Record<PlaystyleId, string> = {
  'possession-game':
    'Stay patient: use the numerical edge to circulate the ball and wait for the gap rather than forcing the first pass.',
  'quick-counter':
    'Defend in a compact mid-block, then play the first pass forward within two seconds of winning the ball.',
  'long-ball-counter':
    'Drop deep, protect the centre and clear the ball into the channels the moment you win it.',
  'out-wide':
    'Get the ball to the touchline early; the overload only works if your wide players receive in space.',
  'long-ball':
    'Aim the first pass at your target man and have the second striker and a CMF ready for the knock-down.',
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function scoreCandidate(entry: CounterEntry, profile: CounterProfile): { final: number; adjustments: ScoreAdjustment[] } {
  const formation = FORMATION_BY_ID[entry.counterId];
  const playstyle = PLAYSTYLE_BY_ID[profile.playstyle];
  const adjustments: ScoreAdjustment[] = [];

  // (a) Playstyle fit: tag affinity.
  const tagDelta = clamp(
    entry.tags.reduce((sum, tag) => sum + (TAG_AFFINITY[profile.playstyle][tag] ?? 0), 0),
    -TAG_CAP,
    TAG_CAP,
  );
  if (tagDelta !== 0) {
    adjustments.push({
      label: 'Playstyle fit',
      delta: tagDelta,
      note:
        tagDelta > 0
          ? `This counter works through ideas ${playstyle.name} players are comfortable with.`
          : `This counter relies on ideas that cut against ${playstyle.name}.`,
    });
  }

  // (a) Playstyle fit: is the formation itself a good home for the playstyle?
  const recommendedIndex = playstyle.recommendedFormations.indexOf(entry.counterId);
  let shapeDelta = recommendedIndex >= 0 ? RECOMMENDED_RANK_BONUS[recommendedIndex] ?? 0 : 0;
  if (formation.bestForPlaystyles.includes(profile.playstyle)) shapeDelta += BEST_FOR_BONUS;
  if (shapeDelta > 0) {
    adjustments.push({
      label: 'Shape suits your style',
      delta: shapeDelta,
      note: `${formation.name} is one of the formations that suit ${playstyle.name}.`,
    });
  }

  // (b) Familiarity.
  const isPreferred = profile.preferredFormation === entry.counterId;
  const isFamiliar = profile.familiarFormations.includes(entry.counterId);
  const hasFamiliarityData = profile.preferredFormation !== null || profile.familiarFormations.length > 0;
  if (isPreferred) {
    adjustments.push({
      label: 'Your usual shape',
      delta: PREFERRED_BONUS,
      note: `You already play ${formation.name}, so no relearning is needed.`,
    });
  } else if (isFamiliar) {
    adjustments.push({
      label: 'Familiar formation',
      delta: FAMILIAR_BONUS,
      note: `You have marked ${formation.name} as a formation you know.`,
    });
  } else {
    // (c) Difficulty applies only to unfamiliar shapes, in proportion to the
    // gap between the shape's difficulty and the player's comfort level.
    let penalty = hasFamiliarityData ? UNFAMILIAR_BASE_PENALTY : 0;
    penalty += Math.max(0, formation.difficulty - profile.riskTolerance) * DIFFICULTY_PENALTY_PER_STEP;
    if (penalty > 0) {
      adjustments.push({
        label: 'Unfamiliar shape',
        delta: -penalty,
        note:
          formation.difficulty > profile.riskTolerance
            ? `${formation.name} is harder than your comfort level and is not in your familiar list.`
            : `${formation.name} is not in your familiar list.`,
      });
    }
  }

  const total = adjustments.reduce((sum, a) => sum + a.delta, 0);
  return { final: clamp(Math.round(entry.score + total), 0, 100), adjustments };
}

/** Profile-agnostic ranking, used as the reference point for the personalised one. */
export function baselineRanking(opponentId: FormationId): CounterEntry[] {
  return [...COUNTERS[opponentId]].sort((a, b) => b.score - a.score);
}

/**
 * Ranks counter-formations for an opponent shape, personalised to the user's
 * playstyle and formation familiarity. See the header comment for the model.
 */
export function rankCounters(opponentId: FormationId, profile: CounterProfile): RankedCounter[] {
  const baseline = baselineRanking(opponentId);

  const scored = baseline.map((entry, index) => {
    const { final, adjustments } = scoreCandidate(entry, profile);
    return {
      entry,
      baseScore: entry.score,
      finalScore: final,
      adjustments,
      baselineRank: index + 1,
      rank: 0,
      playstyleTip: STYLE_TIPS[profile.playstyle],
    };
  });

  // Ties keep the baseline order, so equal-scoring options stay predictable.
  scored.sort((a, b) => b.finalScore - a.finalScore || a.baselineRank - b.baselineRank);
  scored.forEach((item, index) => {
    item.rank = index + 1;
  });
  return scored;
}
