import type { CounterEntry, FormationId } from '../types';

/**
 * Baseline counter matrix: for each opponent shape, the 2-4 formations that
 * cause it the most trouble.
 *
 * `score` is the profile-agnostic matchup quality. The counter engine
 * (src/lib/counterEngine.ts) layers the user's playstyle and formation
 * familiarity on top, using the `tags` as the bridge between "what this counter
 * does" and "what this playstyle wants".
 *
 * Settings referenced in instructions (Defensive Line, Compactness, Containment
 * Area, Pressuring, man-marking) are the in-game Advanced Instructions options.
 */
export const COUNTERS: Record<FormationId, CounterEntry[]> = {
  /* ------------------------------------------------------------------ 4-3-3 */
  '4-3-3': [
    {
      counterId: '4-2-3-1',
      score: 86,
      why: 'Two DMFs and a central AMF give you a 3v3 in the middle with a spare man between the lines, while your wide midfielders track their advancing full-backs.',
      keyInstructions: [
        'Man-mark their central CMF with one DMF and let the other screen your centre-backs.',
        'Set Compactness to 9-10 so your DMFs and AMF always stay one pass apart.',
        'Containment Area: Middle, with your wide midfielders dropping in when they shift.',
      ],
      dangerZones: [
        'The half-spaces when their wide forwards cut inside',
        'Long diagonals to the far-side winger when your wide midfielder is caught narrow',
      ],
      tags: ['midfield-overload', 'central-lane'],
    },
    {
      counterId: '3-5-2',
      score: 84,
      why: 'Your wing-backs hold the width against their wide forwards, three centre-backs outnumber their lone striker, and a five-man midfield physically outweighs their flat trio.',
      keyInstructions: [
        'Defensive Line 8-9: three centre-backs can hold a mid-line against a single striker.',
        'Only let one wing-back attack at a time; the other must stay level with the centre-backs.',
        'Use your two strikers to press their centre-backs on goal kicks and back passes.',
      ],
      dangerZones: [
        'The channel between your outside centre-back and wing-back',
        'A quick switch to the winger on the side your wing-back just left',
      ],
      tags: ['midfield-overload', 'width-stretch'],
    },
    {
      counterId: '4-4-2',
      score: 80,
      why: 'Two flat banks of four stay compact against their trio, and when you win the ball there is space behind their attacking full-backs for your wide midfielders to run into.',
      keyInstructions: [
        'Defensive Line 6-8 with Compactness 10 to keep the banks of four close together.',
        'On the turnover, play the first pass to the striker who drifts wide into the full-back channel.',
        'Keep one CMF deeper than the other so you are never two-v-three in the middle.',
      ],
      dangerZones: [
        'The gap between your two CMFs when their trio rotates',
        'Their wide forwards cutting inside onto your full-backs',
      ],
      tags: ['space-behind', 'compact-block'],
    },
  ],

  /* ----------------------------------------------------------- 4-3-3 (2 DMF) */
  '4-3-3-2dmf': [
    {
      counterId: '3-4-3',
      score: 88,
      why: 'Their two DMFs sit narrow, so your wing-backs and wide forwards create 2v1 overloads against their full-backs on both flanks.',
      keyInstructions: [
        'Attack Area: Wide. Make them cover the touchline before you cut back inside.',
        'Keep both of your CMFs behind the ball when the wing-backs overlap.',
        'Switch play quickly with long diagonal passes to exploit their narrow block.',
      ],
      dangerZones: [
        'The wide channels behind your wing-backs',
        'A quick counter through their single advanced CMF',
      ],
      tags: ['wide-overload', 'width-stretch'],
    },
    {
      counterId: '3-5-2',
      score: 84,
      why: 'A five-man midfield outnumbers their pivot plus one, and your two strikers pin both centre-backs so their DMFs cannot step out to press.',
      keyInstructions: [
        'Let the wing-backs push to the byline and cross early to the strike pair.',
        'Use your DMF to man-mark their advanced CMF.',
        'Set Compactness to 8 so you can still stretch the pitch in possession.',
      ],
      dangerZones: [
        'Counter-attacks down the channels when your wing-backs are advanced',
        'Their DMFs jumping into long shots from outside the box',
      ],
      tags: ['midfield-overload', 'width-stretch'],
    },
    {
      counterId: '4-2-2-2',
      score: 80,
      why: 'Two AMFs in the half-spaces drag their DMFs apart, opening a lane for your strikers to receive between their centre-backs and pivot.',
      keyInstructions: [
        'Instruct your AMFs to drift into the half-spaces and avoid central congestion.',
        'Go direct to the strikers when their DMFs step out to press.',
        'Keep your own pivot compact (Compactness 10) to stop their lone CMF getting free.',
      ],
      dangerZones: [
        'Wide forwards attacking your full-backs one-on-one',
        'The vacated space when your AMFs leave the central lane',
      ],
      tags: ['midfield-overload', 'central-lane'],
    },
    {
      counterId: '4-4-2',
      score: 77,
      why: 'Two strikers directly challenge their two centre-backs in the air, and their fixed holding midfielders are poor at coping with direct, wide crosses.',
      keyInstructions: [
        'Build-up: Long Pass to the target-man striker, with the partner running to the second ball.',
        'Wide midfielders should stay on the touchline to receive and cross early.',
        'Pressuring: Aggressive on goal kicks to take away their short build-up.',
      ],
      dangerZones: [
        'Their quick wide forwards when your full-backs are caught high',
        'Overloaded CMFs against their three central players',
      ],
      tags: ['aerial-threat', 'wide-overload'],
    },
  ],

  /* ----------------------------------------------------------------- 4-2-1-3 */
  '4-2-1-3': [
    {
      counterId: '5-3-2',
      score: 87,
      why: 'A back five absorbs their front three, while your two strikers attack the space left by their advancing full-backs and lone AMF.',
      keyInstructions: [
        'Defensive Line 4-6; stay deep so their forwards have no space to run into.',
        'Wing-backs track their wide forwards and stay in the defensive line, not ahead of it.',
        'After winning the ball, go direct: the strikers should be already moving into the channels.',
      ],
      dangerZones: [
        'Overloaded centre where their AMF and pivot outnumber your three CMFs',
        'Cut-backs from their wide forwards into the penalty spot',
      ],
      tags: ['compact-block', 'space-behind'],
    },
    {
      counterId: '4-4-2',
      score: 84,
      why: 'Your wide midfielders match their full-backs, and a flat midfield four is wider than their pivot, so the AMF has nobody to receive from.',
      keyInstructions: [
        'Man-mark their AMF with your more disciplined CMF.',
        'Wide midfielders should track their full-backs; do not let them overlap freely.',
        'Compactness 9-10 to deny the AMF space between your lines.',
      ],
      dangerZones: [
        'Their wide forwards isolating your full-backs',
        'Second balls dropping to the AMF at the edge of your box',
      ],
      tags: ['wide-overload', 'compact-block'],
    },
    {
      counterId: '4-1-4-1',
      score: 81,
      why: 'Your single DMF shadows their AMF, and a flat midfield four gives you extra bodies in front of your centre-backs.',
      keyInstructions: [
        'Instruct your DMF to man-mark the AMF and stay close to him.',
        'Wide midfielders should drop to form a back six when they lose the ball.',
        'Use the lone striker to hold up play and wait for the wide midfielders to arrive.',
      ],
      dangerZones: [
        'Their pivot stepping forward into your midfield',
        'The back-post cross when your full-back is caught high',
      ],
      tags: ['compact-block', 'central-lane'],
    },
  ],

  /* ----------------------------------------------------------------- 4-2-3-1 */
  '4-2-3-1': [
    {
      counterId: '3-5-2',
      score: 86,
      why: 'An extra body in midfield neutralises their AMF, and your wing-backs match their wide midfielders while two strikers stretch their back four.',
      keyInstructions: [
        'Set your DMF to man-mark their AMF so he cannot receive between the lines.',
        'Wing-backs should push high to pin their wide midfielders back.',
        'Two strikers should split their centre-backs and stay on the shoulder of the last defender.',
      ],
      dangerZones: [
        'Their wide midfielders running into the space behind your wing-backs',
        'Switches of play from their pivot to the far side',
      ],
      tags: ['midfield-overload', 'width-stretch'],
    },
    {
      counterId: '4-1-4-1',
      score: 83,
      why: 'You mirror their midfield bank and use a single DMF to take their AMF out of the game, then break through the wide midfielders.',
      keyInstructions: [
        'The DMF must stay close to their AMF and not follow the ball.',
        'Compactness 10-11 so the AMF never gets time on the ball.',
        'Hit the space behind their full-backs with your wide midfielders on the turnover.',
      ],
      dangerZones: [
        'A double pivot supporting their AMF when your DMF is pulled out of position',
        'Isolated striker if your midfielders stay too deep',
      ],
      tags: ['compact-block', 'central-lane'],
    },
    {
      counterId: '4-4-2',
      score: 81,
      why: 'Two strikers pin their centre-backs, and your two banks of four are hard for a lone striker and three attackers to break down.',
      keyInstructions: [
        'Keep the CMFs central and tight so their AMF cannot find space.',
        'Aim long passes into the channels behind their full-backs.',
        'Use one striker to press their DMF when he receives from the centre-backs.',
      ],
      dangerZones: [
        'Their double pivot outnumbering your two CMFs',
        'The AMF dropping between your midfield and defence',
      ],
      tags: ['space-behind', 'compact-block'],
    },
    {
      counterId: '4-3-3',
      score: 79,
      why: 'Wide forwards pin their full-backs, a three-man midfield matches their pivot plus AMF, and you can press high to disturb their build-up.',
      keyInstructions: [
        'Press their pivot with your front three to deny them the first pass.',
        'Instruct your midfield trio to stay compact and cover for the full-backs.',
        'Make runs in behind with your wide forwards when their wide midfielders push up.',
      ],
      dangerZones: [
        'Their wide midfielders cutting inside behind your pressing line',
        'A long ball to their lone striker if your high line is exposed',
      ],
      tags: ['wide-overload', 'high-press'],
    },
  ],

  /* ----------------------------------------------------------------- 4-2-2-2 */
  '4-2-2-2': [
    {
      counterId: '3-4-3',
      score: 88,
      why: 'The 4-2-2-2 has no natural width, so your wing-backs and wide forwards attack their full-backs in constant 2v1 situations.',
      keyInstructions: [
        'Attack Area: Wide. Their AMFs will not track back fast enough.',
        'Keep your two CMFs deep and compact to protect against counters through the middle.',
        'Cross early to the central forward while their centre-backs are pinned.',
      ],
      dangerZones: [
        'Their two strikers attacking the space behind your wing-backs',
        'The overload through the middle when their AMFs combine with the pivot',
      ],
      tags: ['wide-overload', 'width-stretch'],
    },
    {
      counterId: '4-3-3',
      score: 84,
      why: 'Wide forwards isolate their full-backs and your midfield three covers their narrow AMF pair.',
      keyInstructions: [
        'Instruct your wide forwards to stay wide and receive near the touchline.',
        'Keep one CMF as a defensive screen to handle their strikers dropping short.',
        'Press their pivot with your striker to stop the build-up.',
      ],
      dangerZones: [
        'Quick one-twos between their AMFs and strikers through the centre',
        'The gap behind your full-backs when they push up',
      ],
      tags: ['wide-overload', 'high-press'],
    },
    {
      counterId: '3-5-2',
      score: 82,
      why: 'Your wing-backs have the whole flank to themselves because the AMFs stay narrow, while five midfielders dominate the centre.',
      keyInstructions: [
        'Push the wing-backs high from the start, forcing their full-backs to hold position.',
        'Use the two strikers to occupy both of their centre-backs.',
        'Man-mark one of their AMFs with your DMF.',
      ],
      dangerZones: [
        'Their fast strikers running in behind your back three',
        'Switches that catch your wing-backs advanced',
      ],
      tags: ['midfield-overload', 'width-stretch'],
    },
  ],

  /* ----------------------------------------------------------------- 4-1-4-1 */
  '4-1-4-1': [
    {
      counterId: '3-4-1-2',
      score: 86,
      why: 'Your AMF and two strikers form a three-v-three against their single DMF and two centre-backs, and the lone DMF cannot cover all three.',
      keyInstructions: [
        'Instruct the AMF to receive between their DMF and centre-backs and turn.',
        'Keep your wing-backs high to pin their wide midfielders.',
        'Use one-twos between the strikers to drag a centre-back out.',
      ],
      dangerZones: [
        'Their wide midfielders running at your wing-backs after a turnover',
        'A long ball over your high wing-backs',
      ],
      tags: ['midfield-overload', 'central-lane'],
    },
    {
      counterId: '4-4-1-1',
      score: 84,
      why: 'Your second striker operates between their DMF and the centre-backs, a zone a single holder cannot cover alone.',
      keyInstructions: [
        'Give the SS a free role so he can drop deep and force the DMF to follow.',
        'Wide midfielders should hold width to stop their wide men pressing inside.',
        'Use the main striker to run in behind when the DMF steps up.',
      ],
      dangerZones: [
        'The two central midfielders being outnumbered by their four-man line',
        'Quick switches that stretch your compact four',
      ],
      tags: ['central-lane', 'compact-block'],
    },
    {
      counterId: '4-2-3-1',
      score: 82,
      why: 'Two DMFs and three attackers give you more bodies in the centre than their one holder, and the AMF finds space in front of their back four.',
      keyInstructions: [
        'Use your AMF to pin their DMF and force him to stay deep.',
        'Wide midfielders should stay high to stop their full-backs overlapping.',
        'Keep the double pivot compact to stop their CMFs advancing.',
      ],
      dangerZones: [
        'Their wide midfielders overlapping with the full-backs',
        'Aerial balls to their lone striker',
      ],
      tags: ['midfield-overload', 'central-lane'],
    },
  ],

  /* ------------------------------------------------------------------- 4-4-2 */
  '4-4-2': [
    {
      counterId: '4-2-3-1',
      score: 88,
      why: 'Your AMF operates between their two banks of four, where nobody has clear responsibility, and the double pivot protects against their strike pair.',
      keyInstructions: [
        'Instruct the AMF to receive between the lines and turn.',
        'Your DMFs should split to cover their two strikers.',
        'Compactness 9 keeps your three attackers close enough to combine.',
      ],
      dangerZones: [
        'Their wide midfielders overlapping with the full-backs',
        'Direct balls to their two strikers when your pivot is high',
      ],
      tags: ['central-lane', 'midfield-overload'],
    },
    {
      counterId: '4-3-3',
      score: 84,
      why: 'Your three central midfielders outnumber their two, so you can always find a free man and dominate possession.',
      keyInstructions: [
        'Use the extra CMF to create a triangle and always have a short passing option.',
        'Wide forwards should receive near the touchline to stretch their wide midfielders.',
        'Stay compact when defending to prevent their strikers from finding space.',
      ],
      dangerZones: [
        'Their wide midfielders pushing in to double up on your CMFs',
        'Long balls to their strikers in behind your full-backs',
      ],
      tags: ['midfield-overload', 'wide-overload'],
    },
    {
      counterId: '3-5-2',
      score: 82,
      why: 'Five midfielders outnumber their four, and your three centre-backs can handle their two strikers with a spare man.',
      keyInstructions: [
        'Use your spare centre-back to step into midfield when needed.',
        'Wing-backs should push high to pin their wide midfielders.',
        'Pressuring: Aggressive in midfield, because you can afford to lose a duel with the spare man behind.',
      ],
      dangerZones: [
        'Their wide midfielders attacking the space behind your wing-backs',
        'Long balls over your high line',
      ],
      tags: ['midfield-overload', 'width-stretch'],
    },
    {
      counterId: '4-3-1-2',
      score: 79,
      why: 'A narrow midfield three plus an AMF overloads their two central midfielders, while two strikers match their centre-backs.',
      keyInstructions: [
        'Use your DMF to step in front of their strikers when they drop deep.',
        'Play through the centre where they have only two CMFs.',
        'Full-backs must stay home because their wide midfielders will go outside.',
      ],
      dangerZones: [
        'Their wide midfielders in the space outside your CMFs',
        'Crosses from the flank to their two strikers',
      ],
      tags: ['midfield-overload', 'central-lane'],
    },
  ],

  /* ----------------------------------------------------------------- 4-4-1-1 */
  '4-4-1-1': [
    {
      counterId: '4-2-3-1',
      score: 86,
      why: 'Your two DMFs can mark their SS and CMFs, and the AMF has space between their midfield bank and the back four.',
      keyInstructions: [
        'Man-mark their SS with one of the DMFs so he cannot drop to link play.',
        'Instruct your AMF to find pockets between their CMFs and full-backs.',
        'Use Compactness 9 so your five central players support each other.',
      ],
      dangerZones: [
        'Their wide midfielders getting behind your full-backs',
        'The SS dropping into the half-space when your DMF follows the ball',
      ],
      tags: ['central-lane', 'compact-block'],
    },
    {
      counterId: '4-3-3',
      score: 84,
      why: 'Three central midfielders can absorb their two CMFs and the SS, and wide forwards stretch their full-backs.',
      keyInstructions: [
        'Put one CMF in a deeper role to pick up the SS.',
        'Wide forwards should stay wide and take on their full-backs.',
        'Press the central defenders with the striker to disrupt their build-up.',
      ],
      dangerZones: [
        'Their wide midfielders doubling up on your full-backs',
        'The SS dropping between your midfield and defence',
      ],
      tags: ['midfield-overload', 'wide-overload'],
    },
    {
      counterId: '4-1-4-1',
      score: 80,
      why: 'A dedicated DMF takes the SS out of the game, and a flat midfield four mirrors their shape to stay compact.',
      keyInstructions: [
        'Tell the DMF to stay on the SS at all times.',
        'Wide midfielders should stay high to keep their full-backs back.',
        'Use the lone striker to occupy both centre-backs and hold up play.',
      ],
      dangerZones: [
        'Their wide midfielders cutting inside',
        'Crosses from their full-backs onto the main striker',
      ],
      tags: ['compact-block', 'central-lane'],
    },
  ],

  /* ------------------------------------------------------------- 4-2-1-2-1 */
  '4-2-1-2-1': [
    {
      counterId: '3-4-3',
      score: 88,
      why: 'The diamond has no wide midfielders, so your wing-backs and wide forwards attack their full-backs and stretch the shape beyond what a narrow block can handle.',
      keyInstructions: [
        'Attack Area: Wide. Switch play to the far flank as soon as they shift.',
        'Keep your two CMFs central and disciplined against their five-man central block.',
        'Make wide runs in behind their full-backs when they step up.',
      ],
      dangerZones: [
        'Quick central combinations through their five-man central group',
        'The vacated wing-back space on a counter-attack',
      ],
      tags: ['wide-overload', 'width-stretch'],
    },
    {
      counterId: '4-3-3',
      score: 85,
      why: 'Wide forwards and overlapping full-backs exploit the space their diamond leaves on both flanks.',
      keyInstructions: [
        'Instruct full-backs to overlap when the wide forward cuts inside.',
        'Use your midfield trio to cover the central overload.',
        'Press the DMFs with your striker to disrupt their build-up.',
      ],
      dangerZones: [
        'Their AMFs and CMF combining in the central zone',
        'Quick strikes through the centre when your full-backs are high',
      ],
      tags: ['wide-overload', 'width-stretch'],
    },
    {
      counterId: '4-4-2',
      score: 80,
      why: 'Wide midfielders attack the flanks that their diamond leaves open, while two compact banks keep the centre sealed.',
      keyInstructions: [
        'Wide midfielders should stay on the touchline and receive in space.',
        'Compactness 10: your CMFs must stay close to prevent central combinations.',
        'Strikers should drop and drag the centre-backs wide.',
      ],
      dangerZones: [
        'Their five central players overloading your two CMFs',
        'Switches that bypass your wide midfielders',
      ],
      tags: ['wide-overload', 'compact-block'],
    },
  ],

  /* ----------------------------------------------------------------- 4-1-2-3 */
  '4-1-2-3': [
    {
      counterId: '4-2-3-1',
      score: 85,
      why: 'Your double pivot outnumbers their lone DMF and the AMF finds space between their CMFs and the back four.',
      keyInstructions: [
        'Man-mark their DMF with your AMF so he cannot start attacks.',
        'Your own double pivot should stay close to protect against their CMFs.',
        'Use wide midfielders to track their full-backs when they push up.',
      ],
      dangerZones: [
        'Their wide forwards cutting inside onto your full-backs',
        'The half-spaces when your DMFs get pulled wide',
      ],
      tags: ['midfield-overload', 'central-lane'],
    },
    {
      counterId: '5-3-2',
      score: 84,
      why: 'Eight players behind the ball neutralise their front three, and two strikers attack the space left by their advanced CMFs.',
      keyInstructions: [
        'Defensive Line 4-6 with Compactness 11-12 to keep the block tight.',
        'Play the first pass quickly to the strikers after winning the ball.',
        'Wing-backs should stay level with the centre-backs when defending.',
      ],
      dangerZones: [
        'Crosses from their full-backs into the box',
        'Long shots from their CMFs when your midfield sits deep',
      ],
      tags: ['compact-block', 'space-behind'],
    },
    {
      counterId: '3-5-2',
      score: 82,
      why: 'Five midfielders outnumber their four and your wing-backs can match their wide forwards.',
      keyInstructions: [
        'Use the DMF to pin their single holder.',
        'Wing-backs should be aggressive but only one at a time.',
        'Two strikers should drag their centre-backs into wide positions.',
      ],
      dangerZones: [
        'Their wingers running into the channels behind your wing-backs',
        'Fast switches that exploit your back three',
      ],
      tags: ['midfield-overload', 'width-stretch'],
    },
  ],

  /* ------------------------------------------------------------------- 3-5-2 */
  '3-5-2': [
    {
      counterId: '4-3-3',
      score: 88,
      why: 'Wide forwards attack the space behind their wing-backs, and your full-backs only face two strikers, so you can defend with a numerical advantage.',
      keyInstructions: [
        'Wide forwards should stay high and receive in the space behind their wing-backs.',
        'Full-backs should stay home unless the strikers are being pressed.',
        'Use your midfield trio to stay compact against their five-man midfield.',
      ],
      dangerZones: [
        'Their wing-backs overlapping with the CMFs',
        'Being outnumbered in midfield if your trio spreads wide',
      ],
      tags: ['wide-overload', 'space-behind'],
    },
    {
      counterId: '4-2-3-1',
      score: 84,
      why: 'A double pivot plus AMF contests their five-man midfield, and your wide midfielders track their wing-backs.',
      keyInstructions: [
        'Man-mark their central DMF with your AMF.',
        'Keep your wide midfielders tight to their wing-backs.',
        'Counter through the lone striker when they push up.',
      ],
      dangerZones: [
        'Two strikers against your two centre-backs',
        'Their wing-backs crossing from deep',
      ],
      tags: ['central-lane', 'midfield-overload'],
    },
    {
      counterId: '3-4-3',
      score: 81,
      why: 'Three forwards face their three centre-backs and your wing-backs match theirs, so nobody wins the wide battle.',
      keyInstructions: [
        'Match their wing-backs and press them aggressively.',
        'Use the central forward to occupy their middle centre-back.',
        'Switch to the weak side when the wing-back goes forward.',
      ],
      dangerZones: [
        'Their five-man midfield against your two CMFs',
        'Counters in the half-spaces behind your wing-backs',
      ],
      tags: ['wide-overload', 'width-stretch'],
    },
  ],

  /* ------------------------------------------------------------------- 3-4-3 */
  '3-4-3': [
    {
      counterId: '3-5-2',
      score: 86,
      why: 'Five midfielders outnumber their two central midfielders, and your wing-backs match theirs on the flanks.',
      keyInstructions: [
        'Use your central midfielders to win the ball and quickly find the strikers.',
        'Wing-backs should stay home when their wingers are on the ball.',
        'Counter by sending one striker into the channel behind their wing-back.',
      ],
      dangerZones: [
        'Their front three attacking your back three',
        'Crosses from their wing-backs',
      ],
      tags: ['midfield-overload', 'width-stretch'],
    },
    {
      counterId: '4-2-3-1',
      score: 84,
      why: 'Your AMF and wide midfielders overload their central pair, and the double pivot protects against their three forwards.',
      keyInstructions: [
        'Play through the AMF, who will have time on the ball in front of their back three.',
        'Wide midfielders should track their wing-backs.',
        'Do not over-commit; their front three is dangerous on the break.',
      ],
      dangerZones: [
        'Their wide forwards isolating your full-backs',
        'Direct runs through the middle against your double pivot',
      ],
      tags: ['midfield-overload', 'central-lane'],
    },
    {
      counterId: '5-3-2',
      score: 80,
      why: 'A back five matches their three attackers plus wing-backs, and the two strikers punish their high wing-backs on the counter.',
      keyInstructions: [
        'Defensive Line 5-7; stay compact and keep wing-backs deep.',
        'Counter with the two strikers into the space behind their wing-backs.',
        'Use the three CMFs to stay narrow and compact.',
      ],
      dangerZones: [
        'Overloaded midfield if they commit wing-backs forward',
        'Crosses into your box from their wing-backs',
      ],
      tags: ['compact-block', 'space-behind'],
    },
  ],

  /* ----------------------------------------------------------------- 3-4-1-2 */
  '3-4-1-2': [
    {
      counterId: '4-3-3',
      score: 86,
      why: 'Their shape is narrow and relies on wing-backs for width; wide forwards occupy the wing-backs and stretch their back three.',
      keyInstructions: [
        'Wide forwards should receive near the touchline and attack the wing-backs.',
        'Use your midfield three to stay compact against their central diamond.',
        'Keep your full-backs home to cover against their two strikers.',
      ],
      dangerZones: [
        'Their AMF and two strikers against your two centre-backs',
        'Counter-attacks down the channels when your forwards are high',
      ],
      tags: ['wide-overload', 'width-stretch'],
    },
    {
      counterId: '3-4-3',
      score: 84,
      why: 'A mirror structure with an extra forward gives you a numerical advantage in the wide channels where their shape is thin.',
      keyInstructions: [
        'Use the wide forwards to pull their back three apart.',
        'Wing-backs should push high and cross early.',
        'Keep your two CMFs deep to guard against the AMF.',
      ],
      dangerZones: [
        'Their strikers attacking your back three',
        'Central overload when their AMF and CMFs combine',
      ],
      tags: ['wide-overload', 'width-stretch'],
    },
    {
      counterId: '5-3-2',
      score: 80,
      why: 'Five defenders handle their three attackers, and your three midfielders cover their narrow midfield.',
      keyInstructions: [
        'Man-mark their AMF with a central midfielder.',
        'Wing-backs should track their wing-backs.',
        'Counter quickly through the strikers into the space behind their wing-backs.',
      ],
      dangerZones: [
        'Crosses into your box from their wing-backs',
        'Second balls at the edge of your box',
      ],
      tags: ['compact-block', 'space-behind'],
    },
    {
      counterId: '4-4-2',
      score: 77,
      why: 'Wide midfielders attack the flanks that their wing-backs leave open while the banks of four stay compact in the middle.',
      keyInstructions: [
        'Wide midfielders should stay wide and attack the wing-backs.',
        'Compactness 10 to restrict central combinations.',
        'Strikers drop and drag their centre-backs out of position.',
      ],
      dangerZones: [
        'Their strikers behind your full-backs',
        'A central overload against your two CMFs',
      ],
      tags: ['wide-overload', 'compact-block'],
    },
  ],

  /* ----------------------------------------------------------------- 3-2-4-1 */
  '3-2-4-1': [
    {
      counterId: '4-4-2',
      score: 88,
      why: 'Their back three and two DMFs are exposed on the counter, and two strikers can run at their centre-backs with their full-backs high.',
      keyInstructions: [
        'Defensive Line 6-8; sit in two banks and invite the pressure.',
        'Counter immediately into the channels with both strikers.',
        'Wide midfielders should stay on the touchline to receive the first pass.',
      ],
      dangerZones: [
        'Their four attackers against your two CMFs',
        'Switches that exploit your wide midfielders',
      ],
      tags: ['space-behind', 'compact-block'],
    },
    {
      counterId: '5-3-2',
      score: 84,
      why: 'A back five plus midfield trio gives you eight defenders, and two strikers are always ready to counter.',
      keyInstructions: [
        'Defensive Line 4-6; stay deep and compact.',
        'Use wing-backs to track their wide midfielders.',
        'Aim long passes for the strikers to chase into space.',
      ],
      dangerZones: [
        'Being pinned into your own half for long spells',
        'Long shots from their AMFs',
      ],
      tags: ['compact-block', 'space-behind'],
    },
    {
      counterId: '4-2-3-1',
      score: 81,
      why: 'Your pivot and AMF match their central players, and the wide midfielders exploit the space behind their wide attackers.',
      keyInstructions: [
        'Man-mark their AMFs with your pivot.',
        'Counter through the wide midfielders into their back three.',
        'Keep the AMF high as an outlet for fast counter-attacks.',
      ],
      dangerZones: [
        'Their wide midfielders overlapping',
        'Their four attackers against your back four',
      ],
      tags: ['space-behind', 'central-lane'],
    },
  ],

  /* ------------------------------------------------------------------- 5-3-2 */
  '5-3-2': [
    {
      counterId: '3-4-3',
      score: 86,
      why: 'A deep back five is stretched by three forwards and two wing-backs, and their midfield three cannot cover the width.',
      keyInstructions: [
        'Use the wide forwards to pull their wing-backs apart.',
        'Cross early to the central forward while their centre-backs are pinned.',
        'Your two CMFs should recycle possession and be patient.',
      ],
      dangerZones: [
        'Their two strikers on the counter',
        'Crosses from their wing-backs when you lose the ball',
      ],
      tags: ['width-stretch', 'wide-overload'],
    },
    {
      counterId: '4-2-3-1',
      score: 84,
      why: 'Your AMF operates in the pocket between their midfield trio and the back five, a zone they struggle to cover.',
      keyInstructions: [
        'Play into the AMF and let him turn and shoot or find the striker.',
        'Use your wide midfielders to stretch their wing-backs.',
        'Keep your pivot behind the ball to handle their two strikers.',
      ],
      dangerZones: [
        'Counter-attacks through their two strikers',
        'Overloaded midfield if your pivot is bypassed',
      ],
      tags: ['central-lane', 'midfield-overload'],
    },
    {
      counterId: '4-4-2',
      score: 80,
      why: 'Two strikers challenge their centre-backs aerially, and wide midfielders deliver crosses into a crowded but disjointed box.',
      keyInstructions: [
        'Use your wide midfielders to cross early to the near post.',
        'Strikers should attack different zones: one near post, one far post.',
        'CMFs should stay deep to handle the counter.',
      ],
      dangerZones: [
        'Their strikers behind your high full-backs',
        'A crowded midfield that you struggle to pass through',
      ],
      tags: ['aerial-threat', 'wide-overload'],
    },
  ],

  /* ----------------------------------------------------------------- 5-2-2-1 */
  '5-2-2-1': [
    {
      counterId: '3-4-3',
      score: 86,
      why: 'A flat back five and two DMFs struggle to cover the full width of the pitch, and your three forwards occupy their centre-backs.',
      keyInstructions: [
        'Use the wide forwards to stretch their back five.',
        'Cross to the near post early.',
        'Your two CMFs should stay deep and screen against their AMFs.',
      ],
      dangerZones: [
        'Their AMFs counter-attacking into the space behind your wing-backs',
        'Fast breaks through the centre',
      ],
      tags: ['width-stretch', 'wide-overload'],
    },
    {
      counterId: '4-2-1-3',
      score: 84,
      why: 'Your AMF overloads their pivot and the front three occupies their back five, creating gaps for late runs.',
      keyInstructions: [
        'Use the AMF to find space between their two DMFs.',
        'Wide forwards should stay wide to stretch the back five.',
        'Keep your pivot compact to deal with their AMFs.',
      ],
      dangerZones: [
        'Counter-attacks through their two AMFs',
        'Crosses from their wing-backs',
      ],
      tags: ['central-lane', 'high-press'],
    },
    {
      counterId: '4-3-3',
      score: 82,
      why: 'Three central midfielders outnumber their pivot and the wide forwards stretch the back five.',
      keyInstructions: [
        'Use the midfield trio to circulate the ball and look for a pass to the wide forwards.',
        'Press their pivot with your striker.',
        'Keep one CMF deep to protect against the AMFs.',
      ],
      dangerZones: [
        'Their two AMFs running into the channels',
        'A long ball over your high line',
      ],
      tags: ['wide-overload', 'midfield-overload'],
    },
  ],

  /* ------------------------------------------------------------------- 5-4-1 */
  '5-4-1': [
    {
      counterId: '3-4-3',
      score: 86,
      why: 'The deepest block in the game cannot defend the full width of the pitch against three forwards and two wing-backs.',
      keyInstructions: [
        'Use the wide forwards and wing-backs to stretch the five-man defence.',
        'Cross early before their midfield four drops into the box.',
        'Keep your two CMFs deep to protect against the lone counter.',
      ],
      dangerZones: [
        'Their lone striker on the counter',
        'Long shots when your midfield stays too deep',
      ],
      tags: ['width-stretch', 'wide-overload'],
    },
    {
      counterId: '4-2-3-1',
      score: 84,
      why: 'Three attackers behind a lone striker find pockets in front of their back five, and your pivot recycles possession safely.',
      keyInstructions: [
        'Play into the AMF between their midfield four and back five.',
        'Wide midfielders should stay high and force their wing-backs deep.',
        'Rotate the AMF and wide midfielders to confuse their markers.',
      ],
      dangerZones: [
        'Counter-attacks through their single striker',
        'Crosses from their flanks',
      ],
      tags: ['central-lane', 'midfield-overload'],
    },
    {
      counterId: '3-2-4-1',
      score: 82,
      why: 'Four attackers behind a lone striker overload their four-man midfield and force the back five to stay deep.',
      keyInstructions: [
        'Use the four attackers to rotate and create overloads in each channel.',
        'Your two DMFs should recycle possession and stay compact.',
        'Press high to win the ball back quickly.',
      ],
      dangerZones: [
        'A quick counter through their lone striker',
        'Wide midfielders being pulled out of position',
      ],
      tags: ['midfield-overload', 'high-press'],
    },
  ],

  /* ----------------------------------------------------------------- 4-3-1-2 */
  '4-3-1-2': [
    {
      counterId: '4-3-3',
      score: 88,
      why: 'A narrow diamond-style shape has no wide players, so wide forwards and overlapping full-backs attack the space on both flanks.',
      keyInstructions: [
        'Instruct the wide forwards to stay wide and take on their full-backs.',
        'Keep your midfield trio compact to deal with their AMF and CMFs.',
        'Switch the ball quickly to the opposite flank.',
      ],
      dangerZones: [
        'Their AMF and strikers attacking your centre-backs',
        'Central overloads when your midfield spreads wide',
      ],
      tags: ['wide-overload', 'width-stretch'],
    },
    {
      counterId: '3-4-3',
      score: 85,
      why: 'Wing-backs and wide forwards overload their full-backs on both sides, and your three centre-backs handle their two strikers.',
      keyInstructions: [
        'Push the wing-backs high and cross early.',
        'Use the central CMFs to stay narrow and cover the AMF.',
        'Wide forwards should attack their full-backs one-on-one.',
      ],
      dangerZones: [
        'Their narrow attack running through your two CMFs',
        'The space behind your wing-backs on a counter',
      ],
      tags: ['wide-overload', 'width-stretch'],
    },
    {
      counterId: '4-4-2',
      score: 80,
      why: 'Wide midfielders attack the flanks that their narrow shape leaves open while the two banks of four stay compact centrally.',
      keyInstructions: [
        'Wide midfielders should stay wide and attack their full-backs.',
        'Compactness 10 to restrict central combinations.',
        'Two strikers should occupy both centre-backs.',
      ],
      dangerZones: [
        'Their three CMFs and AMF overloading your two CMFs',
        'Direct balls to their two strikers',
      ],
      tags: ['wide-overload', 'compact-block'],
    },
  ],
};
