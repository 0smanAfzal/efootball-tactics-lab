import { DIFFICULTY_LABEL, FORMATIONS } from '../data/formations';
import { useAppState } from '../state/AppState';
import type { Difficulty, FormationId } from '../types';
import { PlaystylePicker } from './PlaystylePicker';

interface ProfilePanelProps {
  /** Show formation familiarity controls (used by the Counter Lab). */
  showFamiliarity?: boolean;
  /** Show the comfort-level selector. */
  showRisk?: boolean;
}

/** The user's profile: it feeds the counter engine, the advisor and the squad score. */
export function ProfilePanel({ showFamiliarity = false, showRisk = true }: ProfilePanelProps) {
  const { state, setPlaystyle, setRiskTolerance, setPreferredFormation, toggleFamiliar } = useAppState();
  const { settings } = state;

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-sm font-semibold text-white">Your playstyle</p>
        <PlaystylePicker variant="chips" value={settings.playstyle} onChange={setPlaystyle} />
      </div>

      {showRisk && (
        <div>
          <p id="risk-label" className="mb-2 text-sm font-semibold text-white">
            Formation comfort level
          </p>
          <div role="radiogroup" aria-labelledby="risk-label" className="inline-flex overflow-hidden rounded-xl border border-ink-500">
            {([1, 2, 3] as Difficulty[]).map((level) => {
              const selected = settings.riskTolerance === level;
              return (
                <button
                  key={level}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setRiskTolerance(level)}
                  className={`min-h-[44px] px-3 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                    selected ? 'bg-accent text-ink-950' : 'bg-ink-800 text-slate-200 hover:bg-ink-700'
                  }`}
                >
                  {DIFFICULTY_LABEL[level]}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {showFamiliarity && (
        <>
          <div>
            <label htmlFor="preferred-formation" className="mb-2 block text-sm font-semibold text-white">
              Your usual formation
            </label>
            <select
              id="preferred-formation"
              className="field max-w-xs"
              value={settings.preferredFormation ?? ''}
              onChange={(e) => setPreferredFormation(e.target.value === '' ? null : (e.target.value as FormationId))}
            >
              <option value="">No preference</option>
              {FORMATIONS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <details className="rounded-xl border border-ink-600 bg-ink-850 p-3">
            <summary className="cursor-pointer text-sm font-semibold text-white">
              Formations you know well ({settings.familiarFormations.length} selected)
            </summary>
            <p className="muted mt-2">
              Familiar shapes get a boost in the counter ranking, and unfamiliar complex shapes are discounted.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {FORMATIONS.map((f) => {
                const on = settings.familiarFormations.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleFamiliar(f.id)}
                    className={`min-h-[36px] rounded-full border px-3 py-1 text-xs font-semibold transition ${
                      on
                        ? 'border-accent bg-accent/15 text-accent'
                        : 'border-ink-500 bg-ink-800 text-slate-300 hover:bg-ink-700'
                    }`}
                  >
                    {on ? '✓ ' : ''}
                    {f.name}
                  </button>
                );
              })}
            </div>
          </details>
        </>
      )}
    </div>
  );
}
