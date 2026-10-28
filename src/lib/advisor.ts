import { FORMATIONS, DIFFICULTY_LABEL } from '../data/formations';
import { PLAYSTYLE_BY_ID } from '../data/playstyles';
import type { Difficulty, FormationRecommendation, PlaystyleId } from '../types';

const RECOMMENDED_RANK_POINTS = [40, 32, 26, 20, 14];
const BEST_FOR_POINTS = 16;
const DIFFICULTY_PENALTY = 10;

/**
 * Ranks every formation for a playstyle.
 *
 * Score = 40 base
 *       + points for being in the playstyle's recommended list (earlier = more)
 *       + points when the formation lists the playstyle in bestForPlaystyles
 *       - 10 per difficulty step above the player's comfort level.
 */
export function recommendFormations(
  playstyleId: PlaystyleId,
  riskTolerance: Difficulty,
  limit = 3,
): FormationRecommendation[] {
  const playstyle = PLAYSTYLE_BY_ID[playstyleId];

  const scored = FORMATIONS.map((formation) => {
    const reasons: string[] = [];
    let score = 40;

    const recommendedIndex = playstyle.recommendedFormations.indexOf(formation.id);
    if (recommendedIndex >= 0) {
      score += RECOMMENDED_RANK_POINTS[recommendedIndex] ?? 10;
      reasons.push(`Ranked #${recommendedIndex + 1} among formations for ${playstyle.name}.`);
    }

    const fit = formation.styleFit[playstyleId];
    if (formation.bestForPlaystyles.includes(playstyleId)) {
      score += BEST_FOR_POINTS;
      if (fit) reasons.push(fit);
    }

    const overBy = formation.difficulty - riskTolerance;
    if (overBy > 0) {
      score -= overBy * DIFFICULTY_PENALTY;
      reasons.push(`${DIFFICULTY_LABEL[formation.difficulty]} shape, above your comfort level, so it is ranked lower.`);
    } else {
      reasons.push(`${DIFFICULTY_LABEL[formation.difficulty]} shape that fits your comfort level.`);
    }

    reasons.push(`Strength: ${formation.strengths[0]}.`);

    return { formation, score: Math.max(0, Math.min(100, score)), reasons };
  });

  scored.sort((a, b) => b.score - a.score || a.formation.difficulty - b.formation.difficulty);
  return scored.slice(0, limit);
}
