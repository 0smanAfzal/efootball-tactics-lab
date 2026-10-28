/**
 * Data integrity check. Run with `npm run validate`.
 * Fails (exit code 1) if any formation, playstyle, role or counter references an id
 * that does not exist, or if a formation / counter entry is malformed.
 */
import { COUNTERS } from '../src/data/counters';
import { FORMATIONS, FORMATION_BY_ID } from '../src/data/formations';
import { PLAYSTYLES, PLAYSTYLE_BY_ID } from '../src/data/playstyles';
import { ROLES, ROLE_BY_ID } from '../src/data/roles';
import { POSITIONS } from '../src/types';
import { rankCounters } from '../src/lib/counterEngine';
import { evaluateSquad } from '../src/lib/cohesion';
import { suitability } from '../src/lib/suitability';
import type { CounterProfile, FormationId, PlaystyleId, RoleId } from '../src/types';

const errors: string[] = [];
const fail = (msg: string) => errors.push(msg);

/* ------------------------------ formations -------------------------------- */
if (FORMATIONS.length < 18) fail(`Expected at least 18 formations, found ${FORMATIONS.length}`);

for (const f of FORMATIONS) {
  if (FORMATION_BY_ID[f.id] !== f) fail(`${f.id}: lookup table mismatch`);
  if (f.slots.length !== 11) fail(`${f.id}: has ${f.slots.length} slots, expected 11`);
  if (f.slots.filter((s) => s.position === 'GK').length !== 1) fail(`${f.id}: must have exactly one GK`);
  if (f.description.trim().length < 80) fail(`${f.id}: description too short`);
  if (f.strengths.length < 2 || f.weaknesses.length < 2) fail(`${f.id}: needs at least 2 strengths and 2 weaknesses`);

  // The shape string should match the outfield line counts (e.g. 4-3-3 → 10 outfielders).
  const outfield = f.shape.split('-').reduce((sum, n) => sum + Number(n), 0);
  if (outfield !== 10) fail(`${f.id}: shape "${f.shape}" does not describe 10 outfield players`);

  f.slots.forEach((slot, i) => {
    if (!POSITIONS.includes(slot.position)) fail(`${f.id} slot ${i}: unknown position ${slot.position}`);
    if (slot.x < 0 || slot.x > 100 || slot.y < 0 || slot.y > 100) fail(`${f.id} slot ${i}: coordinates out of range`);
    if (slot.roleHints.length === 0) fail(`${f.id} slot ${i}: no role hints`);
    for (const hint of slot.roleHints) {
      if (!(hint in ROLE_BY_ID)) fail(`${f.id} slot ${i}: unknown role hint ${hint}`);
      else if (suitability(hint, slot.position).rating === 'poor') {
        fail(`${f.id} slot ${i}: hint ${hint} is a poor fit for ${slot.position}`);
      }
    }
  });

  for (const ps of f.bestForPlaystyles) {
    if (!(ps in PLAYSTYLE_BY_ID)) fail(`${f.id}: unknown playstyle ${ps}`);
    if (!f.styleFit[ps]) fail(`${f.id}: bestForPlaystyles includes ${ps} but styleFit has no explanation`);
  }
  for (const ps of Object.keys(f.styleFit) as PlaystyleId[]) {
    if (!f.bestForPlaystyles.includes(ps)) fail(`${f.id}: styleFit has ${ps} not listed in bestForPlaystyles`);
  }
}

/* ------------------------------- playstyles ------------------------------- */
for (const p of PLAYSTYLES) {
  for (const id of p.recommendedFormations) {
    if (!(id in FORMATION_BY_ID)) fail(`playstyle ${p.id}: unknown formation ${id}`);
  }
  for (const id of p.priorityRoles) {
    if (!(id in ROLE_BY_ID)) fail(`playstyle ${p.id}: unknown role ${id}`);
  }
  for (const [key, setting] of Object.entries(p.tacticPresets)) {
    if (!setting.explanation.trim()) fail(`playstyle ${p.id}: ${key} has no explanation`);
    if ('max' in setting && (setting.value < 1 || setting.value > setting.max)) {
      fail(`playstyle ${p.id}: ${key} value ${setting.value} outside 1-${setting.max}`);
    }
  }
}
if (PLAYSTYLES.length !== 5) fail(`Expected 5 playstyles, found ${PLAYSTYLES.length}`);

/* ---------------------------------- roles --------------------------------- */
const requiredRoles = [
  'goal-poacher', 'fox-in-the-box', 'target-man', 'deep-lying-forward', 'dummy-runner',
  'creative-playmaker', 'hole-player', 'classic-no-10', 'box-to-box', 'the-destroyer',
  'anchor-man', 'orchestrator', 'build-up', 'extra-frontman', 'offensive-full-back',
  'defensive-full-back', 'full-back-finisher', 'defensive-goalkeeper', 'offensive-goalkeeper',
] as RoleId[];
for (const id of requiredRoles) if (!(id in ROLE_BY_ID)) fail(`missing required role ${id}`);

for (const r of ROLES) {
  if (ROLE_BY_ID[r.id] !== r) fail(`${r.id}: lookup table mismatch`);
  if (r.naturalPositions.length === 0) fail(`${r.id}: no natural positions`);
  for (const pos of [...r.naturalPositions, ...r.compatiblePositions]) {
    if (!POSITIONS.includes(pos)) fail(`${r.id}: unknown position ${pos}`);
  }
  for (const ps of r.bestPlaystyles) if (!(ps in PLAYSTYLE_BY_ID)) fail(`${r.id}: unknown playstyle ${ps}`);
  if (r.keyStats.length < 3) fail(`${r.id}: needs at least 3 key stats`);
}

/* -------------------------------- counters -------------------------------- */
for (const f of FORMATIONS) {
  const list = COUNTERS[f.id];
  if (!list) {
    fail(`${f.id}: no counters defined`);
    continue;
  }
  if (list.length < 2 || list.length > 4) fail(`${f.id}: needs 2-4 counters, has ${list.length}`);
  const seen = new Set<FormationId>();
  for (const c of list) {
    if (!(c.counterId in FORMATION_BY_ID)) fail(`${f.id}: unknown counter ${c.counterId}`);
    if (c.counterId === f.id) fail(`${f.id}: lists itself as a counter`);
    if (seen.has(c.counterId)) fail(`${f.id}: duplicate counter ${c.counterId}`);
    seen.add(c.counterId);
    if (c.score < 0 || c.score > 100) fail(`${f.id} → ${c.counterId}: score out of range`);
    if (c.keyInstructions.length < 2 || c.keyInstructions.length > 4) {
      fail(`${f.id} → ${c.counterId}: needs 2-4 key instructions`);
    }
    if (c.dangerZones.length < 1) fail(`${f.id} → ${c.counterId}: needs danger zones`);
    if (c.tags.length === 0) fail(`${f.id} → ${c.counterId}: needs tags`);
    if (c.why.trim().length < 40) fail(`${f.id} → ${c.counterId}: reasoning too short`);
  }
}

/* ------------------- engine behaviour: rankings must adapt ------------------ */
const baseProfile: Omit<CounterProfile, 'playstyle'> = {
  preferredFormation: null,
  familiarFormations: [],
  riskTolerance: 2,
};
let opponentsWithAdaptiveRanking = 0;
for (const f of FORMATIONS) {
  const orders = new Set(
    PLAYSTYLES.map((p) =>
      rankCounters(f.id, { ...baseProfile, playstyle: p.id })
        .map((r) => r.entry.counterId)
        .join(','),
    ),
  );
  if (orders.size > 1) opponentsWithAdaptiveRanking += 1;
}
if (opponentsWithAdaptiveRanking < Math.ceil(FORMATIONS.length * 0.6)) {
  fail(
    `Counter engine is too static: only ${opponentsWithAdaptiveRanking}/${FORMATIONS.length} opponents change ranking with playstyle`,
  );
}

/* ------------------------------- cohesion smoke ----------------------------- */
const sample = FORMATION_BY_ID['4-2-3-1'];
const report = evaluateSquad(
  { name: 'test', formationId: sample.id, assignments: sample.slots.map((s) => s.roleHints[0]) },
  'quick-counter',
);
if (report.positionalFit < 90) fail(`cohesion: hint-filled squad should have high positional fit, got ${report.positionalFit}`);

/* --------------------------------- result --------------------------------- */
if (errors.length > 0) {
  console.error(`\nData validation failed with ${errors.length} problem(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(
  `Data OK: ${FORMATIONS.length} formations, ${PLAYSTYLES.length} playstyles, ${ROLES.length} roles, ` +
    `${Object.values(COUNTERS).reduce((n, l) => n + l.length, 0)} counters. ` +
    `Ranking adapts to playstyle for ${opponentsWithAdaptiveRanking}/${FORMATIONS.length} opponents.`,
);
