import { useMemo, useState } from 'react';
import { Chip } from '../components/Chip';
import { ComparisonPitch } from '../components/ComparisonPitch';
import { FormationPitch } from '../components/FormationPitch';
import { Icon } from '../components/Icon';
import { PageHeader } from '../components/PageHeader';
import { ProfilePanel } from '../components/ProfilePanel';
import { ScoreBar } from '../components/ScoreBar';
import { FORMATIONS, getFormation } from '../data/formations';
import { rankCounters } from '../lib/counterEngine';
import { useAppState } from '../state/AppState';
import type { FormationId, RankedCounter } from '../types';

function RankShift({ counter }: { counter: RankedCounter }) {
  const moved = counter.baselineRank - counter.rank;
  if (moved === 0) return null;
  return (
    <Chip tone={moved > 0 ? 'accent' : 'amber'}>
      {moved > 0 ? '▲' : '▼'} {Math.abs(moved)} vs. default ranking
    </Chip>
  );
}

function CounterCard({ counter, opponentId }: { counter: RankedCounter; opponentId: FormationId }) {
  const [open, setOpen] = useState(counter.rank === 1);
  const formation = getFormation(counter.entry.counterId);
  const opponent = getFormation(opponentId);
  const panelId = `why-${opponentId}-${counter.entry.counterId}`;

  return (
    <li className="card overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-base font-extrabold ${
              counter.rank === 1 ? 'bg-accent text-ink-950' : 'bg-ink-700 text-white'
            }`}
            aria-label={`Rank ${counter.rank}`}
          >
            #{counter.rank}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold text-white">{formation.name}</h3>
            <div className="mt-1 flex flex-wrap gap-1.5">
              <RankShift counter={counter} />
              {counter.entry.tags.map((t) => (
                <Chip key={t}>{t.replace(/-/g, ' ')}</Chip>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <ScoreBar
            label="Matchup score for you"
            value={counter.finalScore}
            size="lg"
            hint={`Baseline ${counter.baseScore}, adjusted to ${counter.finalScore} for your profile.`}
          />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-300">{counter.entry.why}</p>

        <section className="mt-4" aria-label={`Key instructions for ${formation.name}`}>
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Key instructions</h4>
          <ol className="space-y-2">
            {counter.entry.keyInstructions.map((ins, i) => (
              <li key={ins} className="flex gap-3 text-sm text-slate-200">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent">
                  {i + 1}
                </span>
                {ins}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-4" aria-label={`Danger zones for ${formation.name}`}>
          <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-signal-amber">
            <Icon name="alert" size={14} strokeWidth={2.5} /> Danger zones
          </h4>
          <ul className="space-y-1.5">
            {counter.entry.dangerZones.map((d) => (
              <li key={d} className="flex gap-2 text-sm text-slate-300">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-amber" />
                {d}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="border-t border-ink-700">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-[48px] w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-white hover:bg-ink-800 sm:px-5"
        >
          Why this works for you
          <Icon name="chevron-down" size={18} className={`transition ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div id={panelId} className="space-y-5 bg-ink-900/60 px-4 pb-5 pt-2 sm:px-5">
            <ComparisonPitch yours={formation} opponent={opponent} />

            <div>
              <h4 className="mb-2 text-sm font-semibold text-white">How your profile changed this score</h4>
              {counter.adjustments.length === 0 ? (
                <p className="muted">No profile adjustments: this is the baseline matchup score.</p>
              ) : (
                <ul className="space-y-2">
                  {counter.adjustments.map((a) => (
                    <li key={a.label} className="flex items-start gap-3 rounded-xl border border-ink-600 bg-ink-850 p-3 text-sm">
                      <span
                        className={`w-12 shrink-0 rounded-md px-1.5 py-0.5 text-center font-mono text-xs font-bold ${
                          a.delta > 0 ? 'bg-accent/15 text-accent' : 'bg-signal-red/15 text-signal-red'
                        }`}
                      >
                        {a.delta > 0 ? '+' : ''}
                        {a.delta}
                      </span>
                      <span>
                        <span className="font-semibold text-white">{a.label}. </span>
                        <span className="text-slate-300">{a.note}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="rounded-xl border border-signal-cyan/30 bg-signal-cyan/5 p-3 text-sm text-slate-200">
              <span className="font-bold text-signal-cyan">Playing tip: </span>
              {counter.playstyleTip}
            </p>
          </div>
        )}
      </div>
    </li>
  );
}

export function CounterPage() {
  const { state } = useAppState();
  const [opponentId, setOpponentId] = useState<FormationId>('4-3-3');
  const opponent = getFormation(opponentId);
  const { settings } = state;

  const ranked = useMemo(
    () =>
      rankCounters(opponentId, {
        playstyle: settings.playstyle,
        preferredFormation: settings.preferredFormation,
        familiarFormations: settings.familiarFormations,
        riskTolerance: settings.riskTolerance,
      }),
    [opponentId, settings],
  );

  return (
    <div>
      <PageHeader
        kicker="Counter lab"
        title="What are they playing?"
        description="Select the opponent's formation. The lab ranks the best counters, then re-ranks them for your playstyle and the shapes you know."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
        <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          <div className="card-pad">
            <label htmlFor="opponent" className="mb-2 block text-sm font-semibold text-white">
              Opponent formation
            </label>
            <select id="opponent" className="field" value={opponentId} onChange={(e) => setOpponentId(e.target.value as FormationId)}>
              {FORMATIONS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
            <div className="mx-auto mt-4 max-w-[180px]">
              <FormationPitch formation={opponent} tone="away" size="sm" label={`Opponent formation: ${opponent.name}`} />
            </div>
            <p className="muted mt-3">{opponent.weaknesses[0]}.</p>
          </div>

          <div className="card-pad">
            <h2 className="mb-3 text-base font-bold text-white">Your profile</h2>
            <ProfilePanel showFamiliarity />
          </div>
        </aside>

        <section aria-labelledby="results-title">
          <h2 id="results-title" className="mb-3 text-2xl font-bold text-white">
            Best counters to {opponent.name}
          </h2>
          <ol className="space-y-4" aria-live="polite">
            {ranked.map((counter) => (
              <CounterCard key={`${opponentId}-${counter.entry.counterId}`} counter={counter} opponentId={opponentId} />
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
