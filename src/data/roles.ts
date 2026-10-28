import type { Role, RoleId } from '../types';

/**
 * Player archetypes, using eFootball's playing-style names.
 *
 * `naturalPositions` / `compatiblePositions` are curated approximations of where
 * each style is normally found on player cards. In-game availability varies per
 * card, so treat these as strong guidance rather than a database dump.
 *
 * Three winger styles (Prolific Winger, Roaming Flank, Cross Specialist) are
 * included on top of the core list because without them the wide slots
 * (LWF/RWF/LMF/RMF) of most formations would have no sensible archetype.
 */
export const ROLES: Role[] = [
  {
    id: 'goal-poacher',
    name: 'Goal Poacher',
    summary:
      'A penalty-box predator who makes late, sharp runs onto through balls and rarely drops deep to link play.',
    naturalPositions: ['CF'],
    compatiblePositions: ['SS'],
    keyStats: ['Finishing', 'Offensive Awareness', 'Acceleration', 'Kicking Power'],
    strengths: [
      'Arrives in scoring positions before defenders react',
      'Threatens every through ball over the top',
      'Needs very few touches to produce a shot',
    ],
    weaknesses: [
      'Contributes little to build-up',
      'Goes missing if the team cannot create chances for him',
    ],
    bestPlaystyles: ['quick-counter', 'long-ball-counter', 'out-wide'],
    traits: ['finisher', 'runner'],
  },
  {
    id: 'fox-in-the-box',
    name: 'Fox in the Box',
    summary:
      'A poacher who lives between the centre-backs and the keeper, specialising in rebounds, cut-backs and first-time finishes.',
    naturalPositions: ['CF'],
    compatiblePositions: ['SS'],
    keyStats: ['Finishing', 'Offensive Awareness', 'Balance', 'Heading'],
    strengths: [
      'Excellent at attacking crosses and cut-backs',
      'Positions himself on the most dangerous spot in the box',
      'Clinical from close range',
    ],
    weaknesses: [
      'Hardly ever creates for others',
      'Limited use when the ball is outside the final third',
    ],
    bestPlaystyles: ['possession-game', 'out-wide', 'quick-counter'],
    traits: ['finisher'],
  },
  {
    id: 'target-man',
    name: 'Target Man',
    summary:
      'A big, physical striker who holds the ball up with his back to goal and wins aerial duels.',
    naturalPositions: ['CF'],
    compatiblePositions: ['SS'],
    keyStats: ['Physical Contact', 'Heading', 'Balance', 'Jump'],
    strengths: [
      'Wins long balls and lays them off to runners',
      'Dominant in the air at both ends',
      'Hard to dispossess under pressure',
    ],
    weaknesses: ['Lacks pace to run in behind', 'Poor in tight, technical interplay'],
    bestPlaystyles: ['long-ball', 'long-ball-counter', 'out-wide'],
    traits: ['target', 'finisher'],
  },
  {
    id: 'deep-lying-forward',
    name: 'Deep-Lying Forward',
    summary:
      'A forward who drops off the front line to receive, turn and play teammates in, acting as a link between midfield and attack.',
    naturalPositions: ['SS', 'CF'],
    compatiblePositions: ['AMF', 'LWF', 'RWF'],
    keyStats: ['Ball Control', 'Low Pass', 'Finishing', 'Tight Possession'],
    strengths: [
      'Gives the midfield an extra passing option between the lines',
      'Drags centre-backs out of position',
      'Can still finish chances when he arrives late',
    ],
    weaknesses: [
      'Leaves the box empty if there is no second striker',
      'Less threatening in behind than a poacher',
    ],
    bestPlaystyles: ['possession-game', 'quick-counter'],
    traits: ['linkup', 'creator'],
  },
  {
    id: 'dummy-runner',
    name: 'Dummy Runner',
    summary:
      'An off-the-ball specialist who makes decoy runs to pull defenders away and open lanes for teammates.',
    naturalPositions: ['SS'],
    compatiblePositions: ['CF', 'AMF', 'LWF', 'RWF'],
    keyStats: ['Acceleration', 'Speed', 'Offensive Awareness', 'Stamina'],
    strengths: [
      'Stretches the back line with constant movement',
      'Creates space for the ball carrier without touching the ball',
      'Useful in fast transitions',
    ],
    weaknesses: [
      'Frustrating when the passer does not read the run',
      'Low individual output with the ball at his feet',
    ],
    bestPlaystyles: ['quick-counter', 'long-ball-counter', 'long-ball'],
    traits: ['runner', 'decoy'],
  },
  {
    id: 'creative-playmaker',
    name: 'Creative Playmaker',
    summary:
      'A technical creator who drifts into pockets of space and unlocks defences with dribbling and clever final passes.',
    naturalPositions: ['AMF', 'LMF', 'RMF', 'LWF', 'RWF'],
    compatiblePositions: ['SS', 'CMF'],
    keyStats: ['Dribbling', 'Ball Control', 'Lofted Pass', 'Low Pass', 'Tight Possession'],
    strengths: [
      'Breaks lines with the pass and the dribble',
      'Produces chances out of nothing against a deep block',
      'Wins fouls in dangerous areas',
    ],
    weaknesses: [
      'Often loses the ball when overplaying',
      'Minimal defensive contribution',
    ],
    bestPlaystyles: ['possession-game', 'out-wide'],
    traits: ['creator', 'playmaker'],
  },
  {
    id: 'hole-player',
    name: 'Hole Player',
    summary:
      'A free-roaming attacking midfielder or second striker who hunts for the space between the opposition midfield and defence.',
    naturalPositions: ['AMF', 'SS'],
    compatiblePositions: ['CF', 'CMF', 'LWF', 'RWF'],
    keyStats: ['Offensive Awareness', 'Ball Control', 'Finishing', 'Acceleration'],
    strengths: [
      'Appears between the lines and punishes loose marking',
      'Dangerous with late runs into the box',
      'Links and finishes in the same move',
    ],
    weaknesses: [
      'Leaves a gap behind him when possession is lost',
      'Needs a midfield that covers his roaming',
    ],
    bestPlaystyles: ['possession-game', 'quick-counter'],
    traits: ['creator', 'runner'],
  },
  {
    id: 'classic-no-10',
    name: 'Classic No. 10',
    summary:
      'A traditional playmaker who stays between the lines and dictates the final third with vision and passing range.',
    naturalPositions: ['AMF', 'SS'],
    compatiblePositions: ['CMF', 'CF'],
    keyStats: ['Low Pass', 'Lofted Pass', 'Ball Control', 'Curl'],
    strengths: [
      'Threads the final ball to forwards',
      'Calms the tempo and holds possession',
      'Excellent from set pieces and long shots',
    ],
    weaknesses: ['Low work-rate off the ball', 'Slow to recover when possession turns over'],
    bestPlaystyles: ['possession-game', 'long-ball'],
    traits: ['creator', 'playmaker'],
  },
  {
    id: 'box-to-box',
    name: 'Box-to-Box',
    summary:
      'A tireless central midfielder who contributes to defending and arrives late in the opposition box.',
    naturalPositions: ['CMF'],
    compatiblePositions: ['DMF', 'AMF'],
    keyStats: ['Stamina', 'Offensive Awareness', 'Defensive Awareness', 'Physical Contact'],
    strengths: [
      'Covers huge ground in both directions',
      'Supports the front line and the back line equally',
      'Scores from late runs',
    ],
    weaknesses: [
      'Not a specialist in either defending or creating',
      'Stamina drops late in matches if overused',
    ],
    bestPlaystyles: ['possession-game', 'quick-counter'],
    traits: ['engine', 'runner'],
  },
  {
    id: 'the-destroyer',
    name: 'The Destroyer',
    summary:
      'An aggressive ball-winner who breaks up play, wins duels and hands the ball to a creative teammate.',
    naturalPositions: ['DMF', 'CB'],
    compatiblePositions: ['CMF', 'LB', 'RB'],
    keyStats: ['Ball Winning', 'Defensive Awareness', 'Physical Contact', 'Aggression'],
    strengths: [
      'Wins the ball high and kills counters at the source',
      'Strong in 50-50 challenges',
      'Frees creative midfielders from defensive work',
    ],
    weaknesses: [
      'Prone to fouls and bookings',
      'Limited passing quality, so he should release the ball quickly',
    ],
    bestPlaystyles: ['quick-counter', 'long-ball-counter', 'long-ball'],
    traits: ['ball-winner'],
  },
  {
    id: 'anchor-man',
    name: 'Anchor Man',
    summary:
      'A disciplined holder who sits in front of the centre-backs, cuts passing lanes and rarely leaves position.',
    naturalPositions: ['DMF', 'CB'],
    compatiblePositions: ['CMF'],
    keyStats: ['Defensive Awareness', 'Ball Winning', 'Balance', 'Stamina'],
    strengths: [
      'Shields the back line against through balls',
      'Reads danger early and intercepts',
      'Gives full-backs and midfielders the security to push on',
    ],
    weaknesses: [
      'Offers little going forward',
      'Can be bypassed by quick wide play',
    ],
    bestPlaystyles: ['possession-game', 'long-ball-counter'],
    traits: ['holder', 'ball-winner'],
  },
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    summary:
      'A deep or central passer who controls tempo, switches play and dictates where the team attacks.',
    naturalPositions: ['CMF', 'DMF'],
    compatiblePositions: ['AMF', 'LMF', 'RMF'],
    keyStats: ['Low Pass', 'Lofted Pass', 'Ball Control', 'Curl'],
    strengths: [
      'Switches play accurately to the weak side',
      'Sets the tempo of possession',
      'Starts attacks with line-breaking passes',
    ],
    weaknesses: [
      'Needs protection from a ball-winning partner',
      'Slower in pure transition play',
    ],
    bestPlaystyles: ['possession-game', 'long-ball-counter'],
    traits: ['playmaker', 'creator'],
  },
  {
    id: 'build-up',
    name: 'Build Up',
    summary:
      'A ball-playing centre-back who starts attacks from deep with composed short and medium passing.',
    naturalPositions: ['CB'],
    compatiblePositions: ['DMF', 'LB', 'RB'],
    keyStats: ['Low Pass', 'Lofted Pass', 'Defensive Awareness', 'Ball Control'],
    strengths: [
      'Breaks the first press with a clean pass',
      'Adds an extra passing option in possession',
      'Calm on the ball under pressure',
    ],
    weaknesses: [
      'Less dominant physically than a stopper',
      'Risky if forced into errors near his own box',
    ],
    bestPlaystyles: ['possession-game'],
    traits: ['builder', 'playmaker'],
  },
  {
    id: 'extra-frontman',
    name: 'Extra Frontman',
    summary:
      'A defender or deep player who pushes into attack as an additional forward, especially when chasing a goal.',
    naturalPositions: ['CB'],
    compatiblePositions: ['DMF', 'CMF'],
    keyStats: ['Offensive Awareness', 'Heading', 'Physical Contact', 'Speed'],
    strengths: [
      'Adds an unexpected body to the box on set pieces and crosses',
      'Overloads the final third when the team is pressing high',
      'Strong aerial presence',
    ],
    weaknesses: [
      'Leaves the back line short-handed',
      'Dangerous against fast counters',
    ],
    bestPlaystyles: ['long-ball', 'out-wide'],
    traits: ['runner'],
  },
  {
    id: 'offensive-full-back',
    name: 'Offensive Full-Back',
    summary:
      'An overlapping full-back who provides width, delivers crosses and acts as an extra winger in possession.',
    naturalPositions: ['LB', 'RB'],
    compatiblePositions: ['LMF', 'RMF'],
    keyStats: ['Speed', 'Stamina', 'Lofted Pass', 'Dribbling'],
    strengths: [
      'Creates 2v1 overloads on the flank',
      'Delivers early crosses',
      'Makes the team very wide without needing wingers',
    ],
    weaknesses: [
      'Leaves space behind that fast wingers can exploit',
      'Demands a covering midfielder or centre-back',
    ],
    bestPlaystyles: ['out-wide', 'possession-game'],
    traits: ['wide', 'overlap'],
  },
  {
    id: 'defensive-full-back',
    name: 'Defensive Full-Back',
    summary:
      'A full-back who stays home, tracks wingers and prioritises stopping crosses over joining the attack.',
    naturalPositions: ['LB', 'RB'],
    compatiblePositions: ['CB', 'DMF'],
    keyStats: ['Defensive Awareness', 'Ball Winning', 'Speed', 'Physical Contact'],
    strengths: [
      'Neutralises dangerous wingers',
      'Keeps the back line compact',
      'Reliable when the team defends deep',
    ],
    weaknesses: [
      'Gives the team little width in attack',
      'Passing is usually basic',
    ],
    bestPlaystyles: ['long-ball-counter', 'quick-counter', 'long-ball'],
    traits: ['ball-winner'],
  },
  {
    id: 'full-back-finisher',
    name: 'Full-Back Finisher',
    summary:
      'An attacking full-back who cuts in off the flank and gets into scoring positions rather than simply crossing.',
    naturalPositions: ['LB', 'RB'],
    compatiblePositions: ['LMF', 'RMF', 'LWF', 'RWF'],
    keyStats: ['Offensive Awareness', 'Finishing', 'Speed', 'Acceleration'],
    strengths: [
      'Unpredictable late runs into the half-space and box',
      'Scores far more than a typical full-back',
      'Adds an extra body to the final third',
    ],
    weaknesses: [
      'Leaves his flank open when he cuts inside',
      'Weak in one-on-one defending',
    ],
    bestPlaystyles: ['out-wide', 'quick-counter'],
    traits: ['wide', 'finisher', 'overlap'],
  },
  {
    id: 'defensive-goalkeeper',
    name: 'Defensive Goalkeeper',
    summary:
      'A traditional shot-stopper who stays on his line, commands the box and prioritises saves over distribution.',
    naturalPositions: ['GK'],
    compatiblePositions: [],
    keyStats: ['GK Awareness', 'GK Reflexes', 'GK Catching', 'GK Reach'],
    strengths: [
      'Reliable shot-stopping and handling',
      'Rarely caught out of position',
      'Suits teams that defend in a deep block',
    ],
    weaknesses: [
      'Does not sweep behind a high line',
      'Basic distribution',
    ],
    bestPlaystyles: ['long-ball-counter', 'long-ball'],
    traits: ['keeper'],
  },
  {
    id: 'offensive-goalkeeper',
    name: 'Offensive Goalkeeper',
    summary:
      'A sweeper-keeper who starts attacks with accurate distribution and covers space behind a high defensive line.',
    naturalPositions: ['GK'],
    compatiblePositions: [],
    keyStats: ['GK Awareness', 'Low Pass', 'Lofted Pass', 'GK Reflexes'],
    strengths: [
      'Acts as an extra passer in build-up',
      'Allows a much higher defensive line',
      'Launches quick counters with accurate throws and kicks',
    ],
    weaknesses: [
      'Can be lobbed or beaten by errors when he sweeps',
      'Slightly weaker pure shot-stopping than a defensive keeper',
    ],
    bestPlaystyles: ['possession-game', 'quick-counter'],
    traits: ['keeper', 'builder'],
  },
  {
    id: 'prolific-winger',
    name: 'Prolific Winger',
    summary:
      'A fast wide forward who cuts inside from the flank and scores as often as he creates.',
    naturalPositions: ['LWF', 'RWF', 'LMF', 'RMF'],
    compatiblePositions: ['SS', 'AMF'],
    keyStats: ['Speed', 'Dribbling', 'Finishing', 'Acceleration'],
    strengths: [
      'Terrifying in one-on-one situations',
      'Goal threat from wide areas',
      'Stretches the pitch in transition',
    ],
    weaknesses: [
      'Defensive work is minimal',
      'Can be shut down by a disciplined full-back and midfielder double team',
    ],
    bestPlaystyles: ['quick-counter', 'out-wide'],
    traits: ['wide', 'finisher', 'runner'],
  },
  {
    id: 'roaming-flank',
    name: 'Roaming Flank',
    summary:
      'A hard-working wide player who moves across the pitch, supports central areas and tracks back.',
    naturalPositions: ['LMF', 'RMF', 'LWF', 'RWF'],
    compatiblePositions: ['CMF', 'AMF', 'LB', 'RB'],
    keyStats: ['Stamina', 'Low Pass', 'Speed', 'Defensive Awareness'],
    strengths: [
      'Provides numbers in midfield when the ball is central',
      'Reliable defensive cover on the flank',
      'Link-up passer between wide and central zones',
    ],
    weaknesses: [
      'Less explosive than a pure winger',
      'Leaves the touchline empty at times',
    ],
    bestPlaystyles: ['out-wide', 'possession-game'],
    traits: ['wide', 'engine'],
  },
  {
    id: 'cross-specialist',
    name: 'Cross Specialist',
    summary:
      'A wide player whose main job is to deliver accurate crosses from the byline or on the run.',
    naturalPositions: ['LMF', 'RMF', 'LWF', 'RWF'],
    compatiblePositions: ['LB', 'RB', 'AMF'],
    keyStats: ['Lofted Pass', 'Curl', 'Speed', 'Stamina'],
    strengths: [
      'Consistently accurate deliveries to the far post',
      'Perfect partner for a Target Man or Fox in the Box',
      'Hugs the touchline and keeps the pitch wide',
    ],
    weaknesses: [
      'Predictable if the box is not occupied',
      'Weak when asked to dribble through the middle',
    ],
    bestPlaystyles: ['out-wide', 'long-ball'],
    traits: ['wide', 'creator'],
  },
];

export const ROLE_BY_ID: Record<RoleId, Role> = ROLES.reduce(
  (acc, role) => {
    acc[role.id] = role;
    return acc;
  },
  {} as Record<RoleId, Role>,
);

export function getRole(id: RoleId): Role {
  return ROLE_BY_ID[id];
}
