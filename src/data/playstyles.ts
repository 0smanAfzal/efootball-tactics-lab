import type { ChoiceSetting, Playstyle, PlaystyleId, SliderSetting } from '../types';

const slider = (value: number, max: number, explanation: string): SliderSetting => ({
  value,
  max,
  explanation,
});
const choice = (value: string, explanation: string): ChoiceSetting => ({ value, explanation });

/**
 * The five team playstyles an eFootball manager can choose from.
 *
 * Presets mix two kinds of settings:
 *  - the 1-10 "feel" sliders (attackingLevel, defensiveLevel, pressure, width,
 *    depth) summarise the overall intent so the advisor can show it at a glance;
 *  - the remaining entries mirror real in-game options (Support Range,
 *    Defensive Line, Compactness, Build-up, Attack Area, Positioning,
 *    Defensive Style, Containment Area, Pressuring) so the user can copy them
 *    straight into the Advanced Instructions screen.
 */
export const PLAYSTYLES: Playstyle[] = [
  {
    id: 'possession-game',
    name: 'Possession Game',
    summary:
      'Short, patient passing that pulls the opponent out of shape. You win the match by owning the ball and attacking the gaps that appear.',
    idealFor:
      'Players who enjoy controlling tempo, are comfortable with manual passing and want to wear opponents down.',
    watchOut:
      'Slow circulation in your own half invites pressing traps; keep a safe outlet for every pass.',
    keyAttributes: [
      'Low Pass accuracy',
      'Ball Control',
      'Tight Possession',
      'Offensive Awareness',
      'Stamina',
    ],
    recommendedFormations: ['4-3-3', '4-1-2-3', '4-2-1-3', '4-3-3-2dmf', '4-2-3-1'],
    priorityRoles: [
      'orchestrator',
      'creative-playmaker',
      'classic-no-10',
      'build-up',
      'anchor-man',
      'deep-lying-forward',
    ],
    tacticPresets: {
      attackingLevel: slider(7, 10, 'Commit numbers forward but keep two players behind the ball to recycle possession safely.'),
      defensiveLevel: slider(5, 10, 'Defend with the ball first; counter-press for a few seconds rather than dropping off.'),
      pressure: slider(7, 10, 'Win the ball back quickly after losing it so the opponent cannot build a counter.'),
      width: slider(6, 10, 'Use the full pitch to stretch the opponent, but allow full-backs to tuck in when attacking centrally.'),
      depth: slider(7, 10, 'Push the team up the pitch so passing triangles stay short and the opponent stays pinned.'),
      supportRange: slider(11, 15, 'High support range keeps teammates within a pass of the ball carrier at all times.'),
      defensiveLine: slider(10, 15, 'A reasonably high line shrinks the pitch and supports sustained possession.'),
      compactness: slider(8, 15, 'Medium compactness keeps lines connected without clogging the wide channels.'),
      buildUp: choice('Short Pass', 'Play out from the back with short passes to bait pressure and create space behind it.'),
      attackArea: choice('Wide', 'Move the ball wide to open the middle, then switch or cut back into the box.'),
      positioning: choice('Maintain Formation', 'Keeps players in their lanes, which preserves your passing structure.'),
      defensiveStyle: choice('Frontline Pressure', 'Forwards and midfielders press immediately after a turnover.'),
      containmentArea: choice('Middle', 'Block the central lanes and force play wide where it is easier to win the ball.'),
      pressuring: choice('Aggressive', 'Closes down quickly; ensure your DMF covers the vacated space.'),
    },
  },
  {
    id: 'quick-counter',
    name: 'Quick Counter',
    summary:
      'Win the ball, then attack the space as fast as possible. Defend compactly, accept less possession and hit with pace when the opponent is stretched.',
    idealFor:
      'Players who read the game well, like to bait the opponent forward and have fast forwards to release.',
    watchOut:
      'Against a deep, patient block you may struggle to break through; you need a plan B for when the space is not there.',
    keyAttributes: [
      'Speed',
      'Acceleration',
      'Low Pass accuracy',
      'Ball Winning',
      'Finishing',
    ],
    recommendedFormations: ['4-2-3-1', '4-4-2', '4-4-1-1', '4-2-2-2', '4-1-4-1'],
    priorityRoles: [
      'the-destroyer',
      'goal-poacher',
      'prolific-winger',
      'dummy-runner',
      'box-to-box',
      'defensive-full-back',
    ],
    tacticPresets: {
      attackingLevel: slider(6, 10, 'Only a few players join the attack, but they run at full speed the moment the ball is won.'),
      defensiveLevel: slider(7, 10, 'Keep a solid block behind the ball so you have something to counter from.'),
      pressure: slider(5, 10, 'Press selectively on triggers such as bad touches and back passes, not constantly.'),
      width: slider(5, 10, 'Stay narrow when defending, then spread the wide players when you break.'),
      depth: slider(4, 10, 'Sit in a mid-block and leave space in behind for your forwards to run into.'),
      supportRange: slider(7, 15, 'Moderate support range so the ball carrier has runners but not so many that the block loosens.'),
      defensiveLine: slider(6, 15, 'A deeper line gives your runners space to attack and keeps pace-heavy forwards onside.'),
      compactness: slider(10, 15, 'Tight lines remove central gaps so the opponent has to go wide.'),
      buildUp: choice('Long Pass', 'Once the ball is won, go forward directly rather than recycling.'),
      attackArea: choice('Center', 'Attack through the centre so the shot is quick and the opponent has little time to recover.'),
      positioning: choice('Flexible', 'Lets forwards roam into channels to receive the first pass in transition.'),
      defensiveStyle: choice('All-Out Defence', 'Everyone drops behind the ball, creating a compact trap to win it back.'),
      containmentArea: choice('Middle', 'Deny central play; accept crosses and shots from wide positions.'),
      pressuring: choice('Medium', 'Press only when the ball is within reach; avoid chasing and leaving gaps.'),
    },
  },
  {
    id: 'long-ball-counter',
    name: 'Long Ball Counter',
    summary:
      'Defend deep and compact, then release the ball over the top the instant you win it. The most defensive of the counter styles.',
    idealFor:
      'Players who defend well manually, want to protect a lead or are facing a much stronger possession team.',
    watchOut:
      'With a low line and few attackers, you can be pinned in for long spells; a strong goalkeeper and Anchor Man are essential.',
    keyAttributes: [
      'Defensive Awareness',
      'Heading',
      'Lofted Pass accuracy',
      'Physical Contact',
      'Speed (for the forwards)',
    ],
    recommendedFormations: ['5-3-2', '4-4-2', '5-4-1', '4-1-4-1', '3-5-2'],
    priorityRoles: [
      'anchor-man',
      'the-destroyer',
      'defensive-goalkeeper',
      'goal-poacher',
      'target-man',
      'defensive-full-back',
    ],
    tacticPresets: {
      attackingLevel: slider(4, 10, 'Only the forwards stay high; the rest of the team prioritises shape.'),
      defensiveLevel: slider(9, 10, 'Maximum cover behind the ball; nobody leaves position unless a counter is on.'),
      pressure: slider(3, 10, 'Do not chase. Let the opponent come into your block and win it with positioning.'),
      width: slider(4, 10, 'Stay narrow to protect the middle, accepting crosses that your tall defenders can clear.'),
      depth: slider(3, 10, 'Very deep block that makes it hard to play through you and invites long balls behind.'),
      supportRange: slider(5, 15, 'Short support range keeps the team compact; only forwards need to break away.'),
      defensiveLine: slider(4, 15, 'Low line eliminates space in behind and keeps your centre-backs close to goal.'),
      compactness: slider(12, 15, 'Very tight lines leave no gaps between defence and midfield.'),
      buildUp: choice('Long Pass', 'Clear the ball into the channels for the forwards to chase.'),
      attackArea: choice('Center', 'Straight lines to goal give the opponent the least time to recover.'),
      positioning: choice('Maintain Formation', 'Keeps defensive discipline; do not let wide players wander.'),
      defensiveStyle: choice('All-Out Defence', 'Drop everybody behind the ball and absorb pressure.'),
      containmentArea: choice('Middle', 'Block the middle; concede the flanks where you have more numbers.'),
      pressuring: choice('Conservative', 'Avoid committing defenders; let the shape do the work.'),
    },
  },
  {
    id: 'out-wide',
    name: 'Out Wide',
    summary:
      'Stretch the opponent with wingers and overlapping full-backs, then attack the box with crosses and cut-backs.',
    idealFor:
      'Players who like to attack the flanks, have quick wide players and strong aerial or poaching strikers.',
    watchOut:
      'Over-committing full-backs exposes the wide channels to counters; keep a holding midfielder behind them.',
    keyAttributes: [
      'Speed',
      'Dribbling',
      'Lofted Pass accuracy',
      'Heading',
      'Stamina',
    ],
    recommendedFormations: ['4-3-3', '3-4-3', '4-2-1-3', '4-4-2', '3-5-2'],
    priorityRoles: [
      'prolific-winger',
      'cross-specialist',
      'offensive-full-back',
      'fox-in-the-box',
      'target-man',
      'roaming-flank',
    ],
    tacticPresets: {
      attackingLevel: slider(7, 10, 'Wide players and full-backs commit forward; strikers hover in the box.'),
      defensiveLevel: slider(5, 10, 'Keep a holding midfielder and two centre-backs back; the rest attack.'),
      pressure: slider(6, 10, 'Press the ball side hard to win it near the touchline where the opponent has fewer options.'),
      width: slider(9, 10, 'Use the full width of the pitch to stretch the defence and create gaps for cut-backs.'),
      depth: slider(6, 10, 'Medium-high line that supports overlapping runs but is not exposed to a long ball.'),
      supportRange: slider(9, 15, 'Keep players close enough to the wide carrier to combine, but not so close that width disappears.'),
      defensiveLine: slider(8, 15, 'A balanced line protects against counters when the full-backs are advanced.'),
      compactness: slider(7, 15, 'Slightly looser than other styles so the team can occupy the wings.'),
      buildUp: choice('Short Pass', 'Play out short, then switch to the wing once the opponent is drawn in.'),
      attackArea: choice('Wide', 'Attack the flanks first; use the cross or cut-back as the primary finisher.'),
      positioning: choice('Maintain Formation', 'Wide players stay on the touchline to keep the pitch stretched.'),
      defensiveStyle: choice('Frontline Pressure', 'Win the ball back near the opponent box so the wings stay active.'),
      containmentArea: choice('Wide', 'Force the opponent wide to protect the penalty area from cut-backs.'),
      pressuring: choice('Medium', 'Press when the ball is on the wing; avoid unnecessary chasing through the middle.'),
    },
  },
  {
    id: 'long-ball',
    name: 'Long Ball',
    summary:
      'A direct, vertical game: bypass the midfield with long passes to a strong target and attack the second balls.',
    idealFor:
      'Players with a dominant target man and tall defenders who prefer a direct route and a fast tempo.',
    watchOut:
      'Poor touches and long, hopeful passes can hand possession straight back; use the second ball and keep the midfield tight behind the striker.',
    keyAttributes: [
      'Heading',
      'Physical Contact',
      'Lofted Pass accuracy',
      'Jump',
      'Kicking Power',
    ],
    recommendedFormations: ['4-4-2', '3-5-2', '5-3-2', '4-4-1-1', '4-3-1-2'],
    priorityRoles: [
      'target-man',
      'dummy-runner',
      'classic-no-10',
      'cross-specialist',
      'the-destroyer',
      'extra-frontman',
    ],
    tacticPresets: {
      attackingLevel: slider(7, 10, 'Push the team up behind the target man so second balls land at your players\' feet.'),
      defensiveLevel: slider(6, 10, 'Keep a strong holding presence to win the knock-downs and clearances.'),
      pressure: slider(6, 10, 'Press the second ball immediately; a long pass that is lost should be contested.'),
      width: slider(6, 10, 'Use the wide players as outlets for the long diagonal ball and for crosses.'),
      depth: slider(6, 10, 'Medium line that keeps the second-ball zone within reach for midfielders.'),
      supportRange: slider(6, 15, 'Lower support range because the ball is moving over the midfield rather than through it.'),
      defensiveLine: slider(8, 15, 'Moderate line that keeps the team compact between the forwards and the back line.'),
      compactness: slider(9, 15, 'Keep midfield tight behind the striker so the second ball is contested by two or three players.'),
      buildUp: choice('Long Pass', 'Go direct from the back to the target man.'),
      attackArea: choice('Center', 'Aim at the centre-backs with the target man and hunt the knock-down.'),
      positioning: choice('Flexible', 'Lets the second striker and wide players move into the knock-down zone.'),
      defensiveStyle: choice('Frontline Pressure', 'Win the ball high to keep the next long pass short.'),
      containmentArea: choice('Wide', 'Let the opponent play wide and defend crosses with tall centre-backs.'),
      pressuring: choice('Aggressive', 'Press the second ball aggressively to keep the sequence going.'),
    },
  },
];

export const PLAYSTYLE_BY_ID: Record<PlaystyleId, Playstyle> = PLAYSTYLES.reduce(
  (acc, playstyle) => {
    acc[playstyle.id] = playstyle;
    return acc;
  },
  {} as Record<PlaystyleId, Playstyle>,
);

export function getPlaystyle(id: PlaystyleId): Playstyle {
  return PLAYSTYLE_BY_ID[id];
}

/** Display order and labels for the tactic panel. */
export const TACTIC_META: {
  key: keyof Playstyle['tacticPresets'];
  label: string;
  group: 'feel' | 'attack' | 'defence';
}[] = [
  { key: 'attackingLevel', label: 'Attacking Commitment', group: 'feel' },
  { key: 'defensiveLevel', label: 'Defensive Cover', group: 'feel' },
  { key: 'pressure', label: 'Press Intensity', group: 'feel' },
  { key: 'width', label: 'Width', group: 'feel' },
  { key: 'depth', label: 'Depth', group: 'feel' },
  { key: 'buildUp', label: 'Build-up', group: 'attack' },
  { key: 'attackArea', label: 'Attack Area', group: 'attack' },
  { key: 'supportRange', label: 'Support Range', group: 'attack' },
  { key: 'positioning', label: 'Positioning', group: 'attack' },
  { key: 'defensiveStyle', label: 'Defensive Style', group: 'defence' },
  { key: 'containmentArea', label: 'Containment Area', group: 'defence' },
  { key: 'pressuring', label: 'Pressuring', group: 'defence' },
  { key: 'defensiveLine', label: 'Defensive Line', group: 'defence' },
  { key: 'compactness', label: 'Compactness', group: 'defence' },
];
