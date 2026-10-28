import { useMemo, useState } from 'react';
import { Chip } from '../components/Chip';
import { Icon } from '../components/Icon';
import { PageHeader } from '../components/PageHeader';
import { Pitch } from '../components/Pitch';
import { PlayerDot, type DotTone } from '../components/PlayerDot';
import { PlaystylePicker } from '../components/PlaystylePicker';
import { RatingBadge } from '../components/RatingBadge';
import { ScoreBar } from '../components/ScoreBar';
import { SlotPicker } from '../components/SlotPicker';
import { FORMATIONS, getFormation } from '../data/formations';
import { positionName } from '../data/positions';
import { getPlaystyle } from '../data/playstyles';
import { getRole } from '../data/roles';
import { cohesionLabel, evaluateSquad } from '../lib/cohesion';
import { useAppState } from '../state/AppState';
import type { CohesionWarning, FormationId } from '../types';

const SEVERITY_STYLE: Record<CohesionWarning['severity'], { cls: string; label: string; icon: 'info' | 'alert' }> = {
  info: { cls: 'border-signal-cyan/40 bg-signal-cyan/5 text-signal-cyan', label: 'Tip', icon: 'info' },
  warn: { cls: 'border-signal-amber/40 bg-signal-amber/5 text-signal-amber', label: 'Warning', icon: 'alert' },
  critical: { cls: 'border-signal-red/40 bg-signal-red/5 text-signal-red', label: 'Problem', icon: 'alert' },
};

/** Two-letter-ish abbreviation shown inside a filled dot. */
function abbreviate(name: string): string {
  const words = name.replace(/[.-]/g, ' ').split(/\s+/).filter(Boolean);
  return words.length === 1 ? words[0].slice(0, 3).toUpperCase() : words.map((w) => w[0]).join('').slice(0, 3).toUpperCase();
}

export function SquadPage() {
  const { state, setFormation, assignRole, autoFill, renameSquad, clearSquad, saveSquad, loadSquad, deleteSquad, setPlaystyle } =
    useAppState();
  const { draft, saved, settings } = state;
  const formation = getFormation(draft.formationId);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const report = useMemo(() => evaluateSquad(draft, settings.playstyle), [draft, settings.playstyle]);
  const playstyle = getPlaystyle(settings.playstyle);

  const toneFor = (index: number): DotTone => report.slots[index].suitability?.rating ?? 'empty';

  const onSave = () => {
    const result = saveSquad();
    setNotice(result.message);
  };

  return (
    <div>
      <PageHeader
        kicker="Squad builder"
        title="Build your XI"
        description="Pick a formation, tap a position and choose a player archetype. Every slot is rated for fit and the whole team gets a cohesion score."
        actions={
          <>
            <button type="button" className="btn-ghost" onClick={autoFill}>
              <Icon name="wand" size={16} /> Auto-fill
            </button>
            <button type="button" className="btn-ghost" onClick={clearSquad} disabled={report.filled === 0}>
              <Icon name="rotate" size={16} /> Clear
            </button>
            <button type="button" className="btn-primary" onClick={onSave}>
              <Icon name="save" size={16} /> Save squad
            </button>
          </>
        }
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="squad-name" className="mb-1.5 block text-sm font-semibold text-white">
            Squad name
          </label>
          <input
            id="squad-name"
            className="field"
            value={draft.name}
            maxLength={40}
            onChange={(e) => renameSquad(e.target.value)}
            placeholder="My Squad"
          />
        </div>
        <div>
          <label htmlFor="squad-formation" className="mb-1.5 block text-sm font-semibold text-white">
            Formation
          </label>
          <select
            id="squad-formation"
            className="field"
            value={draft.formationId}
            onChange={(e) => {
              if (report.filled > 0 && !window.confirm('Changing formation clears the players you have placed. Continue?')) return;
              setFormation(e.target.value as FormationId);
            }}
          >
            {FORMATIONS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-5">
        <p className="mb-2 text-sm font-semibold text-white">Scored against playstyle</p>
        <PlaystylePicker variant="chips" value={settings.playstyle} onChange={setPlaystyle} />
      </div>

      {notice && (
        <p role="status" className="mb-4 rounded-xl border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-accent">
          {notice}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        <section aria-label={`${formation.name} pitch. Tap a position to choose a player.`}>
          <Pitch label={null}>
            {formation.slots.map((slot, index) => {
              const roleId = draft.assignments[index];
              const slotReport = report.slots[index];
              const role = roleId ? getRole(roleId) : null;
              const ariaLabel = role
                ? `${positionName(slot.position)}: ${role.name}, ${slotReport.suitability?.rating} fit. Tap to change.`
                : `${positionName(slot.position)}: empty. Tap to choose a player.`;
              return (
                <PlayerDot
                  key={`${slot.position}-${index}`}
                  x={slot.x}
                  y={slot.y}
                  label={role ? abbreviate(role.name) : slot.position}
                  sublabel={role ? role.name : slot.position}
                  tone={toneFor(index)}
                  size="md"
                  ariaLabel={ariaLabel}
                  tooltip={slotReport.suitability ? `${role?.name}: ${slotReport.suitability.reason}` : `Choose a ${positionName(slot.position)}.`}
                  selected={activeSlot === index}
                  onClick={() => setActiveSlot(index)}
                />
              );
            })}
          </Pitch>
          <ul className="mt-3 flex flex-wrap gap-2 text-xs" aria-label="Legend">
            <li><RatingBadge rating="ideal" /></li>
            <li><RatingBadge rating="good" /></li>
            <li><RatingBadge rating="ok" /></li>
            <li><RatingBadge rating="poor" /></li>
          </ul>
        </section>

        <div className="space-y-5">
          <section className="card-pad" aria-labelledby="cohesion-title">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h2 id="cohesion-title" className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Team cohesion
                </h2>
                <p className="mt-1 text-5xl font-extrabold text-white" aria-live="polite">
                  {report.total}
                  <span className="text-xl font-semibold text-slate-500"> / 100</span>
                </p>
              </div>
              <Chip tone={report.total >= 70 ? 'accent' : report.total >= 50 ? 'amber' : 'red'}>{cohesionLabel(report.total)}</Chip>
            </div>
            <div className="mt-5 space-y-4">
              <ScoreBar label="Positional fit" value={report.positionalFit} hint="How well each archetype suits its position (50% of the score)." />
              <ScoreBar label="Role balance" value={report.roleBalance} hint="Finishers, creators and defensive cover across the XI (25%)." />
              <ScoreBar label={`${playstyle.name} match`} value={report.playstyleMatch} hint="Roles and shape against your chosen playstyle (25%)." />
            </div>
            <p className="mt-4 text-xs text-slate-500">
              {report.filled} of {formation.slots.length} positions filled.
            </p>
          </section>

          <section aria-labelledby="warnings-title">
            <h2 id="warnings-title" className="mb-2 text-lg font-bold text-white">
              Warnings and tips
            </h2>
            {report.warnings.length === 0 ? (
              <p className="rounded-xl border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-accent">
                <Icon name="check" size={14} strokeWidth={3} className="mr-1 inline" />
                No issues found. This squad is balanced for {playstyle.name}.
              </p>
            ) : (
              <ul className="space-y-2">
                {report.warnings.map((w) => {
                  const s = SEVERITY_STYLE[w.severity];
                  return (
                    <li key={w.message} className={`flex gap-2 rounded-xl border px-3 py-2 text-sm ${s.cls}`}>
                      <Icon name={s.icon} size={16} className="mt-0.5 shrink-0" />
                      <span>
                        <span className="font-bold">{s.label}: </span>
                        <span className="text-slate-200">{w.message}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section aria-labelledby="saved-title">
            <h2 id="saved-title" className="mb-2 text-lg font-bold text-white">
              Saved squads
            </h2>
            {saved.length === 0 ? (
              <p className="muted">Nothing saved yet. Name your squad and press Save squad to keep it on this device.</p>
            ) : (
              <ul className="space-y-2">
                {saved.map((s) => (
                  <li key={s.id} className="card flex items-center gap-3 p-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-white">{s.name}</p>
                      <p className="text-xs text-slate-400">
                        {getFormation(s.formationId).name} · {s.assignments.filter(Boolean).length}/11 placed ·{' '}
                        {new Date(s.savedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-ghost !min-h-[40px]"
                      onClick={() => {
                        loadSquad(s.id);
                        setNotice(`Loaded "${s.name}".`);
                      }}
                    >
                      Load
                    </button>
                    <button
                      type="button"
                      className="btn-danger !min-h-[40px] !px-3"
                      aria-label={`Delete ${s.name}`}
                      onClick={() => {
                        deleteSquad(s.id);
                        setNotice(`Deleted "${s.name}".`);
                      }}
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>

      <SlotPicker
        open={activeSlot !== null}
        slot={activeSlot !== null ? formation.slots[activeSlot] : null}
        currentRoleId={activeSlot !== null ? draft.assignments[activeSlot] : null}
        onClose={() => setActiveSlot(null)}
        onPick={(roleId) => {
          if (activeSlot !== null) assignRole(activeSlot, roleId);
          setActiveSlot(null);
        }}
      />
    </div>
  );
}
