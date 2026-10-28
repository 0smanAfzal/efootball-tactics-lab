import type { Formation, FormationId, FormationSlot, Position, RoleId } from '../types';

/* -------------------------------------------------------------------------- */
/*  Slot helpers                                                              */
/* -------------------------------------------------------------------------- */

const slot = (position: Position, x: number, y: number, roleHints: RoleId[]): FormationSlot => ({
  position,
  x,
  y,
  roleHints,
});

const GK_H: RoleId[] = ['defensive-goalkeeper', 'offensive-goalkeeper'];
const CB_H: RoleId[] = ['build-up', 'anchor-man', 'the-destroyer'];
const CB_STOP_H: RoleId[] = ['the-destroyer', 'anchor-man', 'extra-frontman'];
const FB_H: RoleId[] = ['offensive-full-back', 'defensive-full-back', 'full-back-finisher'];
const DMF_H: RoleId[] = ['anchor-man', 'the-destroyer', 'orchestrator'];
const DMF_PLAY_H: RoleId[] = ['orchestrator', 'anchor-man', 'the-destroyer'];
const CMF_H: RoleId[] = ['box-to-box', 'orchestrator', 'the-destroyer'];
const AMF_H: RoleId[] = ['classic-no-10', 'hole-player', 'creative-playmaker'];
const WM_H: RoleId[] = ['roaming-flank', 'cross-specialist', 'prolific-winger', 'creative-playmaker'];
const WB_H: RoleId[] = ['offensive-full-back', 'roaming-flank', 'cross-specialist'];
const WF_H: RoleId[] = ['prolific-winger', 'creative-playmaker', 'cross-specialist'];
const SS_H: RoleId[] = ['hole-player', 'deep-lying-forward', 'dummy-runner'];
const CF_H: RoleId[] = ['goal-poacher', 'fox-in-the-box', 'target-man'];
const CF_PARTNER_H: RoleId[] = ['target-man', 'deep-lying-forward', 'goal-poacher'];

const gk = slot('GK', 50, 92, GK_H);
const backFour = [
  slot('LB', 14, 76, FB_H),
  slot('CB', 37, 78, CB_H),
  slot('CB', 63, 78, CB_STOP_H),
  slot('RB', 86, 76, FB_H),
];
const backThree = [
  slot('CB', 24, 77, CB_STOP_H),
  slot('CB', 50, 80, CB_H),
  slot('CB', 76, 77, CB_STOP_H),
];
const backFive = [
  slot('LB', 9, 64, FB_H),
  slot('CB', 29, 77, CB_STOP_H),
  slot('CB', 50, 80, CB_H),
  slot('CB', 71, 77, CB_STOP_H),
  slot('RB', 91, 64, FB_H),
];
const frontThree = [slot('LWF', 17, 24, WF_H), slot('CF', 50, 17, CF_H), slot('RWF', 83, 24, WF_H)];

/* -------------------------------------------------------------------------- */
/*  Formations                                                                */
/* -------------------------------------------------------------------------- */

export const FORMATIONS: Formation[] = [
  {
    id: '4-3-3',
    name: '4-3-3',
    shape: '4-3-3',
    slots: [
      gk,
      ...backFour,
      slot('CMF', 25, 52, CMF_H),
      slot('CMF', 50, 49, ['orchestrator', 'box-to-box', 'classic-no-10']),
      slot('CMF', 75, 52, CMF_H),
      ...frontThree,
    ],
    strengths: [
      'Three central midfielders create passing triangles in every part of the middle third',
      'Wide forwards pin the full-backs and open the half-spaces for runners',
      'Natural pressing shape: the front three can press the back line while the midfield screens',
    ],
    weaknesses: [
      'No fixed holding midfielder, so counters travel straight at your centre-backs',
      'Full-backs get isolated against wide forwards if the midfield trio drifts central',
      'A lone striker can be marked out of the game by a strong centre-back pair',
    ],
    bestForPlaystyles: ['possession-game', 'out-wide'],
    styleFit: {
      'possession-game': 'The flat midfield three gives every pass at least two short options, which is ideal for patient build-up.',
      'out-wide': 'Wide forwards plus overlapping full-backs give you two outlets on each flank.',
    },
    difficulty: 2,
    description:
      'Three central midfielders sit in a flat line behind a front three, so every passing lane has a body in it. It is the most balanced default shape in the game: the wide forwards stretch the back four while the midfield trio handles both pressing and ball progression. The price is that nobody is permanently screening your centre-backs, so one of the three must be a ball-winner who stays disciplined.',
  },
  {
    id: '4-3-3-2dmf',
    name: '4-3-3 (2 DMF)',
    shape: '4-3-3',
    slots: [
      gk,
      ...backFour,
      slot('DMF', 34, 62, DMF_H),
      slot('DMF', 66, 62, DMF_PLAY_H),
      slot('CMF', 50, 45, ['box-to-box', 'orchestrator', 'hole-player']),
      ...frontThree,
    ],
    strengths: [
      'A double pivot shields both centre-backs from through balls',
      'Full-backs can push on knowing two holders sit behind them',
      'The front three still stretch the back line and finish counters',
    ],
    weaknesses: [
      'Only one midfielder supports the attack, so wingers can be starved of service',
      'Slow ball progression if neither DMF is a good passer',
      'Gap between the pivot and the front three when the lone CMF is marked',
    ],
    bestForPlaystyles: ['quick-counter', 'long-ball-counter'],
    styleFit: {
      'quick-counter': 'The pivot wins the ball in front of the back four and releases the wide forwards into space.',
      'long-ball-counter': 'Two holders plus a back four give you the deepest block while still keeping three runners up front.',
    },
    difficulty: 2,
    description:
      'A 4-3-3 variant where two defensive midfielders sit deep and one central midfielder pushes up beside the front three. It trades creativity in the middle for an almost impenetrable screen in front of your centre-backs, and it lets the full-backs bomb forward because the pivot covers behind them. Make sure at least one DMF is a competent distributor, otherwise your front three will wait a long time for the ball.',
  },
  {
    id: '4-2-1-3',
    name: '4-2-1-3',
    shape: '4-2-1-3',
    slots: [
      gk,
      ...backFour,
      slot('DMF', 36, 62, DMF_H),
      slot('DMF', 64, 62, DMF_PLAY_H),
      slot('AMF', 50, 42, AMF_H),
      ...frontThree,
    ],
    strengths: [
      'An attacking midfielder between the lines gives the front three a direct supply',
      'Double pivot behind him keeps a stable base',
      'Three forwards stretch the opposition defence horizontally',
    ],
    weaknesses: [
      'Midfield is outnumbered by 3-man midfields, leaving the pivot overloaded',
      'The AMF does very little defending, so the pivot must cover a lot of ground',
      'Space behind advanced full-backs is easy to exploit on the break',
    ],
    bestForPlaystyles: ['possession-game', 'quick-counter'],
    styleFit: {
      'possession-game': 'The AMF and two wide forwards give you a natural diamond of options around the striker.',
      'quick-counter': 'One quick pass from the pivot reaches the AMF, who feeds the wide forwards sprinting in behind.',
    },
    difficulty: 2,
    description:
      'Four defenders, a pivot of two defensive midfielders, a single attacking midfielder and three forwards. The structure creates a vertical chain down the middle that makes the AMF the main creative link, and the wide forwards occupy the opposition full-backs. It is the shape to pick when you want to play through the middle but still keep the width of a front three.',
  },
  {
    id: '4-2-3-1',
    name: '4-2-3-1',
    shape: '4-2-3-1',
    slots: [
      gk,
      ...backFour,
      slot('DMF', 36, 62, DMF_H),
      slot('DMF', 64, 62, DMF_PLAY_H),
      slot('LMF', 14, 38, WM_H),
      slot('AMF', 50, 38, AMF_H),
      slot('RMF', 86, 38, WM_H),
      slot('CF', 50, 16, CF_H),
    ],
    strengths: [
      'The double pivot gives the best defensive security of any four-at-the-back shape',
      'Three attacking midfielders support a lone striker from three different angles',
      'Easy to read and forgiving: roles are clear and positions rarely get confused',
    ],
    weaknesses: [
      'The lone striker can be isolated if the three behind him do not join the attack',
      'Wide midfielders can be caught between attacking and defending',
      'Less penetration than a front three against a deep block',
    ],
    bestForPlaystyles: ['quick-counter', 'possession-game'],
    styleFit: {
      'quick-counter': 'A deep pivot wins the ball, and three attackers behind the striker are all within range of the first pass.',
      'possession-game': 'Three attackers and two pivots give you five ball-players who can rotate positions freely.',
    },
    difficulty: 1,
    description:
      'The workhorse of modern football: two holders, three creators and a lone striker. The pivot protects the back four so the three attackers can take risks, while the striker has support from every direction. It is the most forgiving shape for new players and still wins at the top level, because the roles are so clearly defined.',
  },
  {
    id: '4-2-2-2',
    name: '4-2-2-2',
    shape: '4-2-2-2',
    slots: [
      gk,
      ...backFour,
      slot('DMF', 36, 62, DMF_H),
      slot('DMF', 64, 62, DMF_PLAY_H),
      slot('AMF', 30, 38, ['creative-playmaker', 'hole-player', 'classic-no-10']),
      slot('AMF', 70, 38, ['creative-playmaker', 'hole-player', 'classic-no-10']),
      slot('CF', 38, 16, CF_H),
      slot('CF', 62, 16, CF_PARTNER_H),
    ],
    strengths: [
      'Two strikers occupy both centre-backs, creating 2v2 situations everywhere',
      'Two attacking midfielders in the half-spaces make the shape very narrow and hard to press',
      'Double pivot protects the centre when the AMFs push up',
    ],
    weaknesses: [
      'No natural width; the full-backs must supply all the wide play',
      'Flanks are exposed when the AMFs drift inside',
      'Vulnerable to 3-man midfields that outnumber your pivot',
    ],
    bestForPlaystyles: ['quick-counter', 'long-ball'],
    styleFit: {
      'quick-counter': 'Four players close together in the middle break lines with one-twos at pace.',
      'long-ball': 'Two strikers working as a pair make knock-downs and second balls far easier to win.',
    },
    difficulty: 2,
    description:
      'A narrow shape that stacks four players through the middle: two holding midfielders, two half-space attackers and two strikers. It overloads the centre and suits combination play, but the flanks belong to your full-backs, so you must choose between attacking and covering with them. Against a 4-3-3 with wide forwards, expect their full-backs to receive plenty of space.',
  },
  {
    id: '4-1-4-1',
    name: '4-1-4-1',
    shape: '4-1-4-1',
    slots: [
      gk,
      ...backFour,
      slot('DMF', 50, 64, DMF_H),
      slot('LMF', 14, 46, WM_H),
      slot('CMF', 38, 50, CMF_H),
      slot('CMF', 62, 50, ['orchestrator', 'box-to-box', 'classic-no-10']),
      slot('RMF', 86, 46, WM_H),
      slot('CF', 50, 18, CF_H),
    ],
    strengths: [
      'A single DMF sits as a permanent screen while the four-man midfield line stays compact',
      'Two banks of four are very hard to break through centrally',
      'The wide midfielders give you width without compromising shape',
    ],
    weaknesses: [
      'The lone DMF is a single point of failure against two attacking players',
      'Striker can be isolated without a nearby second runner',
      'The midfield four can be passive if the CMFs do not get forward',
    ],
    bestForPlaystyles: ['long-ball-counter', 'quick-counter'],
    styleFit: {
      'long-ball-counter': 'Two banks of four plus a holder leave almost no space between the lines for the opposition.',
      'quick-counter': 'The DMF wins the ball and one pass sends the wide midfielders running into the space behind full-backs.',
    },
    difficulty: 2,
    description:
      'A defensive-minded shape built around a single anchor and a flat four-man midfield. It stays compact in a mid block and suits teams that want to give the opposition the ball in non-threatening areas. Its greatest strength is also its weakness: all defensive responsibility in midfield passes through one player, so choose an Anchor Man who does not lose position.',
  },
  {
    id: '4-4-2',
    name: '4-4-2',
    shape: '4-4-2',
    slots: [
      gk,
      ...backFour,
      slot('LMF', 14, 50, WM_H),
      slot('CMF', 38, 54, CMF_H),
      slot('CMF', 62, 54, ['orchestrator', 'box-to-box', 'the-destroyer']),
      slot('RMF', 86, 50, WM_H),
      slot('CF', 38, 18, CF_H),
      slot('CF', 62, 18, CF_PARTNER_H),
    ],
    strengths: [
      'Two flat banks of four are easy to organise and very compact when defending',
      'A strike pair gives you a physical target plus a runner',
      'Wide midfielders supply crosses to two players in the box',
    ],
    weaknesses: [
      'Only two central midfielders, so you can be overrun by a 3-man midfield',
      'The gap between the strikers and the midfield is large if neither drops',
      'Predictable and easy to double-team on the flanks',
    ],
    bestForPlaystyles: ['long-ball', 'long-ball-counter', 'quick-counter'],
    styleFit: {
      'long-ball': 'Two strikers fighting for knock-downs with wide midfielders crossing is the most direct attacking structure.',
      'long-ball-counter': 'Two compact banks absorb pressure, and the strike pair gives the counter an immediate target.',
      'quick-counter': 'Wide midfielders carry the ball forward quickly while the strikers make runs in behind.',
    },
    difficulty: 1,
    description:
      'The classic British formation: two compact lines of four with a pair of strikers. It is the easiest shape to understand and the simplest to defend with, because every player has a clear marking partner. Its weakness is the midfield, where two central players are asked to cover enormous space, so tireless Box-to-Box players are almost mandatory.',
  },
  {
    id: '4-4-1-1',
    name: '4-4-1-1',
    shape: '4-4-1-1',
    slots: [
      gk,
      ...backFour,
      slot('LMF', 14, 50, WM_H),
      slot('CMF', 38, 54, CMF_H),
      slot('CMF', 62, 54, ['orchestrator', 'box-to-box', 'the-destroyer']),
      slot('RMF', 86, 50, WM_H),
      slot('SS', 50, 32, SS_H),
      slot('CF', 50, 14, CF_H),
    ],
    strengths: [
      'The second striker acts as a link, dropping to receive when the midfield is under pressure',
      'Keeps the compactness of a 4-4-2 while adding a creative outlet',
      'Hard to counter-press because the SS offers an outlet between the lines',
    ],
    weaknesses: [
      'Still only two central midfielders, so the SS must help defend',
      'If the SS is too attacking, the midfield becomes a gap',
      'Wide midfielders can be pinned back by overlapping full-backs',
    ],
    bestForPlaystyles: ['quick-counter', 'long-ball-counter'],
    styleFit: {
      'quick-counter': 'The SS receives on the turn and releases the lone striker or wide midfielders at pace.',
      'long-ball-counter': 'A flat bank of four plus a dropping SS gives you both shape and an outlet for the clearance.',
    },
    difficulty: 2,
    description:
      'A 4-4-2 with the second striker pulled back behind the main forward. That small shift changes the shape from two strikers competing for balls to one striker and one link player, giving the midfield a vital outlet between the lines. Select a mobile Deep-Lying Forward or Hole Player in the SS slot, because that player decides whether the shape works.',
  },
  {
    id: '4-2-1-2-1',
    name: '4-2-1-2-1 (Diamond)',
    shape: '4-2-1-2-1',
    slots: [
      gk,
      ...backFour,
      slot('DMF', 36, 64, DMF_H),
      slot('DMF', 64, 64, DMF_PLAY_H),
      slot('CMF', 50, 52, ['orchestrator', 'box-to-box']),
      slot('AMF', 30, 36, ['creative-playmaker', 'hole-player', 'classic-no-10']),
      slot('AMF', 70, 36, ['creative-playmaker', 'hole-player', 'classic-no-10']),
      slot('CF', 50, 16, CF_H),
    ],
    strengths: [
      'Five central players form a diamond that wins almost every central duel',
      'Pivot plus a link player gives smooth, safe ball progression',
      'Two AMFs and a striker form a tight triangle in the final third',
    ],
    weaknesses: [
      'No wide midfielders, so full-backs must supply all the width',
      'Needs excellent positional discipline: positions overlap constantly',
      'A single striker has limited support if the AMFs drift wide',
    ],
    bestForPlaystyles: ['possession-game'],
    styleFit: {
      'possession-game': 'A compact central diamond lets you pass the ball through the middle and rotate players freely.',
    },
    difficulty: 3,
    description:
      'A tightly packed central structure: two holders, a link midfielder, two attacking midfielders and a striker. The shape turns the centre of the pitch into a passing carousel and is the best formation here for pure short-pass control. It demands an excellent understanding of positioning, since the lack of width forces the full-backs to provide all the width, and a single mistake leaves a huge flank open.',
  },
  {
    id: '4-1-2-3',
    name: '4-1-2-3',
    shape: '4-1-2-3',
    slots: [
      gk,
      ...backFour,
      slot('DMF', 50, 62, DMF_H),
      slot('CMF', 31, 46, CMF_H),
      slot('CMF', 69, 46, ['orchestrator', 'box-to-box', 'classic-no-10']),
      ...frontThree,
    ],
    strengths: [
      'A single DMF anchors the shape while two CMFs push forward and support the front three',
      'The inverted triangle in midfield creates good passing angles to the wingers',
      'Two CMFs close to the forwards produce easy combination play',
    ],
    weaknesses: [
      'One holder is exposed to 3-man midfields and fast counters',
      'The CMFs must do a lot of defensive running when the ball is lost',
      'Wide forwards leave the full-backs isolated',
    ],
    bestForPlaystyles: ['possession-game', 'out-wide'],
    styleFit: {
      'possession-game': 'The DMF-plus-two-CMF triangle gives you a reliable base while two midfielders support the front line.',
      'out-wide': 'The CMFs push high enough to support wide forwards, and the DMF covers when the full-backs overlap.',
    },
    difficulty: 2,
    description:
      'This variant takes a 4-3-3 and replaces the flat midfield with a single holding midfielder and two box-crashing partners. It is much more attacking than a flat three, because the two forward CMFs can work with the front three to produce overloads. The solitary holder must be disciplined, because a counter-attack will reach him very quickly.',
  },
  {
    id: '3-5-2',
    name: '3-5-2',
    shape: '3-5-2',
    slots: [
      gk,
      ...backThree,
      slot('LMF', 8, 52, WB_H),
      slot('DMF', 50, 62, DMF_H),
      slot('CMF', 33, 48, CMF_H),
      slot('CMF', 67, 48, ['orchestrator', 'box-to-box', 'classic-no-10']),
      slot('RMF', 92, 52, WB_H),
      slot('CF', 38, 18, CF_H),
      slot('CF', 62, 18, CF_PARTNER_H),
    ],
    strengths: [
      'Five midfielders dominate the centre against any four-man or three-man midfield',
      'Wing-backs stretch the pitch with width in both phases',
      'Two strikers occupy both centre-backs and create 2v2 up front',
    ],
    weaknesses: [
      'Space behind the wing-backs is the main weakness; a fast winger will exploit it',
      'Three centre-backs can be dragged wide by clever forward runs',
      'Needs very high stamina from the wing-backs, who cover the whole flank',
    ],
    bestForPlaystyles: ['long-ball', 'quick-counter'],
    styleFit: {
      'long-ball': 'Two strikers and five midfielders mean a long ball is always supported by multiple runners.',
      'quick-counter': 'Win the ball in the five-man midfield and release a wing-back or striker into the flanks.',
    },
    difficulty: 3,
    description:
      'Three centre-backs, five midfielders with wing-backs on the flanks and a front pair. Against a 4-3-3 or 4-2-3-1 it gives you a numerical superiority in the middle while the wing-backs match their wide players. The cost is positional risk: if a wing-back is caught high, the outside centre-back has to cover a huge channel on his own.',
  },
  {
    id: '3-4-3',
    name: '3-4-3',
    shape: '3-4-3',
    slots: [
      gk,
      ...backThree,
      slot('LMF', 10, 54, WB_H),
      slot('CMF', 38, 56, CMF_H),
      slot('CMF', 62, 56, ['orchestrator', 'box-to-box', 'the-destroyer']),
      slot('RMF', 90, 54, WB_H),
      ...frontThree,
    ],
    strengths: [
      'Seven players push into the attack, creating the fastest overloads in the game',
      'Three forwards and two wing-backs flood the wide channels',
      'Three centre-backs give you cover even when the midfield pushes up',
    ],
    weaknesses: [
      'Only two central midfielders, who are easily overrun',
      'Wing-backs leave huge space behind them on the break',
      'High demands on stamina and positioning',
    ],
    bestForPlaystyles: ['out-wide', 'possession-game'],
    styleFit: {
      'out-wide': 'Wing-backs and wide forwards together produce 2v1 overloads on both flanks.',
      'possession-game': 'The back three plus two CMFs make a stable base that can circulate the ball patiently.',
    },
    difficulty: 3,
    description:
      'An all-out attacking system: a back three, four midfielders including two wing-backs, and a front three. It produces an overwhelming wide presence and relentless forward pressure, but it leaves only two central midfielders to protect the shape. Use it when you want to dominate the ball against a deep opponent, not against a quick team that loves the counter-attack.',
  },
  {
    id: '3-4-1-2',
    name: '3-4-1-2',
    shape: '3-4-1-2',
    slots: [
      gk,
      ...backThree,
      slot('LMF', 10, 52, WB_H),
      slot('CMF', 38, 56, CMF_H),
      slot('CMF', 62, 56, ['orchestrator', 'box-to-box', 'the-destroyer']),
      slot('RMF', 90, 52, WB_H),
      slot('AMF', 50, 36, AMF_H),
      slot('CF', 38, 16, CF_H),
      slot('CF', 62, 16, CF_PARTNER_H),
    ],
    strengths: [
      'An AMF and two strikers make an attacking triangle that overloads two centre-backs',
      'Three centre-backs plus four midfielders keep a stable base',
      'The wing-backs provide all the width while the middle stays dense',
    ],
    weaknesses: [
      'Wing-backs must cover enormous distances',
      'Two CMFs can be outnumbered by three-man midfields',
      'Narrow attack makes it easier to defend against with a compact block',
    ],
    bestForPlaystyles: ['long-ball', 'possession-game'],
    styleFit: {
      'long-ball': 'The two strikers and AMF attack knock-downs together, and the wing-backs hit them with crosses.',
      'possession-game': 'The AMF and two CMFs form a diamond, which makes short passing combinations easy.',
    },
    difficulty: 3,
    description:
      'Three centre-backs, wing-backs, two central midfielders and a trio of attackers in a triangle. It is a central-heavy attacking system: the creator behind two strikers means the opposition centre-backs face three runners at all times. The wing-backs have to supply width, so pick players with exceptional stamina.',
  },
  {
    id: '3-2-4-1',
    name: '3-2-4-1',
    shape: '3-2-4-1',
    slots: [
      gk,
      ...backThree,
      slot('DMF', 38, 64, DMF_H),
      slot('DMF', 62, 64, DMF_PLAY_H),
      slot('LMF', 12, 42, WM_H),
      slot('AMF', 36, 38, ['creative-playmaker', 'hole-player', 'classic-no-10']),
      slot('AMF', 64, 38, ['creative-playmaker', 'hole-player', 'classic-no-10']),
      slot('RMF', 88, 42, WM_H),
      slot('CF', 50, 16, CF_H),
    ],
    strengths: [
      'Five players behind the ball and five ahead of it, so the team is balanced in both phases',
      'The four-man attacking line makes overloads in every channel',
      'Double pivot gives the back three extra protection',
    ],
    weaknesses: [
      'Wide midfielders must defend and attack the entire flank',
      'Very difficult to run: positions rotate and overlap',
      'Lone striker risks isolation if the four behind him do not arrive on time',
    ],
    bestForPlaystyles: ['possession-game'],
    styleFit: {
      'possession-game': 'A back three and a pivot start the pass, and the four-man attack line gives constant options up the pitch.',
    },
    difficulty: 3,
    description:
      'A 3-2-4-1 that takes the box-shaped build-up of top possession teams: three defenders, two holders and a flat four of attackers behind a lone striker. It dominates the ball and creates multiple passing lanes, but it needs a coach with a great grasp of rotations. If the pivot is bypassed, the three centre-backs have to defend a large area on their own.',
  },
  {
    id: '5-3-2',
    name: '5-3-2',
    shape: '5-3-2',
    slots: [
      gk,
      ...backFive,
      slot('CMF', 27, 50, CMF_H),
      slot('CMF', 50, 52, ['anchor-man', 'orchestrator', 'the-destroyer']),
      slot('CMF', 73, 50, CMF_H),
      slot('CF', 38, 18, CF_H),
      slot('CF', 62, 18, CF_PARTNER_H),
    ],
    strengths: [
      'Five at the back plus three midfielders gives eight defensive bodies behind the ball',
      'Two strikers stay high and can break at any moment',
      'Wing-backs can switch between a back five and a wide midfield four',
    ],
    weaknesses: [
      'Little creative output from midfield, so attacks depend on the two strikers',
      'The team can get pinned into its own half',
      'Predictable if you play it too passively',
    ],
    bestForPlaystyles: ['long-ball-counter', 'quick-counter'],
    styleFit: {
      'long-ball-counter': 'The back five makes you almost impossible to play through, and two strikers stay high for the clearance.',
      'quick-counter': 'Win the ball in front of five defenders, then play to the two strikers, who are already running.',
    },
    difficulty: 1,
    description:
      'A back five, a central midfield trio and two strikers. It is the formation for protecting a lead or frustrating a stronger opponent: eight players behind the ball and two forwards always ready to counter. The wing-backs can step up to create a back four when the opponent has little width, which gives you flexibility without changing the formation.',
  },
  {
    id: '5-2-2-1',
    name: '5-2-2-1',
    shape: '5-2-2-1',
    slots: [
      gk,
      ...backFive,
      slot('DMF', 38, 58, DMF_H),
      slot('DMF', 62, 58, DMF_PLAY_H),
      slot('AMF', 30, 36, ['prolific-winger', 'creative-playmaker', 'hole-player']),
      slot('AMF', 70, 36, ['prolific-winger', 'creative-playmaker', 'hole-player']),
      slot('CF', 50, 16, CF_H),
    ],
    strengths: [
      'A back five and a double pivot create two defensive lines in front of the keeper',
      'Two AMFs in the half-spaces lead the counter-attack with pace and passing',
      'Wing-backs give width without needing wide midfielders',
    ],
    weaknesses: [
      'Only three players ahead of the pivot, so it is hard to build sustained pressure',
      'The AMFs get isolated if the pivot does not step up',
      'Lone striker needs quick support from the AMFs',
    ],
    bestForPlaystyles: ['long-ball-counter', 'quick-counter'],
    styleFit: {
      'long-ball-counter': 'Seven defensive players and a quick strike trio make a compact counter-attacking platform.',
      'quick-counter': 'The AMFs receive in the half-spaces and run directly at the opposition centre-backs.',
    },
    difficulty: 2,
    description:
      'A defensive structure that hides two attacking midfielders in front of a pivot and a back five. The AMFs are the key: they work between the lines to feed the striker and carry the ball in transition. When the opponent commits numbers forward, the 5-2-2-1 recovers into a compact 5-4-1, and when the ball is won it springs into a three-man counter.',
  },
  {
    id: '5-4-1',
    name: '5-4-1',
    shape: '5-4-1',
    slots: [
      gk,
      ...backFive,
      slot('LMF', 16, 50, WM_H),
      slot('CMF', 38, 54, CMF_H),
      slot('CMF', 62, 54, ['anchor-man', 'orchestrator', 'the-destroyer']),
      slot('RMF', 84, 50, WM_H),
      slot('CF', 50, 16, CF_H),
    ],
    strengths: [
      'The deepest and most compact defence in the game; hard to play through or around',
      'Wide midfielders can sit tight and then break into space on the flanks',
      'Excellent when protecting a lead in the final minutes',
    ],
    weaknesses: [
      'The lone striker is very isolated and can only operate on long passes',
      'Surrenders possession and territory by design',
      'Concedes shots from distance because the midfield sits so deep',
    ],
    bestForPlaystyles: ['long-ball-counter'],
    styleFit: {
      'long-ball-counter': 'Nine outfield players behind the ball and a lone striker for the long outlet pass is the purest counter structure.',
    },
    difficulty: 1,
    description:
      'Five defenders and four midfielders in two blocks, with a single striker upfront. It is built to deny space between the lines and to frustrate possession sides; the striker must hold the ball up and wait for the midfield to arrive. Pair it with a fast target man or a pacey poacher, depending on whether you want to hold the ball or run in behind.',
  },
  {
    id: '4-3-1-2',
    name: '4-3-1-2',
    shape: '4-3-1-2',
    slots: [
      gk,
      ...backFour,
      slot('CMF', 26, 54, CMF_H),
      slot('DMF', 50, 58, DMF_H),
      slot('CMF', 74, 54, ['orchestrator', 'box-to-box', 'the-destroyer']),
      slot('AMF', 50, 36, AMF_H),
      slot('CF', 38, 16, CF_H),
      slot('CF', 62, 16, CF_PARTNER_H),
    ],
    strengths: [
      'A narrow, dense midfield with a creator behind two strikers overloads the centre',
      'The DMF in a midfield three gives you a holding base without a full double pivot',
      'Two strikers occupy both centre-backs while the AMF feeds them',
    ],
    weaknesses: [
      'No width, so the full-backs must do all the stretching',
      'Easy to defend against with a wide formation',
      'The midfield three and AMF can be isolated against a 4-3-3',
    ],
    bestForPlaystyles: ['possession-game', 'long-ball'],
    styleFit: {
      'possession-game': 'Four central players and two strikers create short, tight combinations all through the middle.',
      'long-ball': 'The two strikers and the AMF all attack the same area, so knock-downs always find a teammate.',
    },
    difficulty: 2,
    description:
      'A narrow shape with three midfielders in front of the back four, an attacking midfielder and two strikers. It focuses everything on the central corridor: the midfield three controls the tempo, the AMF links to the strikers and the strikers occupy both centre-backs. Without natural width, it relies on the full-backs to supply any crossing or stretching.',
  },
];

/* -------------------------------------------------------------------------- */
/*  Lookups                                                                   */
/* -------------------------------------------------------------------------- */

export const FORMATION_BY_ID: Record<FormationId, Formation> = FORMATIONS.reduce(
  (acc, formation) => {
    acc[formation.id] = formation;
    return acc;
  },
  {} as Record<FormationId, Formation>,
);

export function getFormation(id: FormationId): Formation {
  return FORMATION_BY_ID[id];
}

export const DIFFICULTY_LABEL: Record<1 | 2 | 3, string> = {
  1: 'Beginner-friendly',
  2: 'Intermediate',
  3: 'Advanced',
};
