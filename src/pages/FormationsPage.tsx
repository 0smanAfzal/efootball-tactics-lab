import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chip } from '../components/Chip';
import { DifficultyDots } from '../components/DifficultyDots';
import { FormationCard } from '../components/FormationCard';
import { FormationPitch } from '../components/FormationPitch';
import { Icon } from '../components/Icon';
import { PageHeader } from '../components/PageHeader';
import { Sheet } from '../components/Sheet';
import { FORMATIONS } from '../data/formations';
import { PLAYSTYLES, getPlaystyle } from '../data/playstyles';
import { getRole } from '../data/roles';
import { useAppState } from '../state/AppState';
import type { Formation, PlaystyleId } from '../types';

type Filter = 'all' | PlaystyleId;
type BackLine = 'any' | '3' | '4' | '5';

function backLine(f: Formation): BackLine {
  return String(f.shape.split('-')[0]) as BackLine;
}

export function FormationsPage() {
  const { setFormation } = useAppState();
  const [selected, setSelected] = useState<Formation | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [line, setLine] = useState<BackLine>('any');

  const visible = useMemo(
    () =>
      FORMATIONS.filter((f) => (filter === 'all' || f.bestForPlaystyles.includes(filter)) && (line === 'any' || backLine(f) === line)),
    [filter, line],
  );

  const pill = (active: boolean) =>
    `min-h-[40px] rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
      active ? 'border-accent bg-accent text-ink-950' : 'border-ink-500 bg-ink-800 text-slate-200 hover:bg-ink-700'
    }`;

  return (
    <div>
      <PageHeader
        kicker="Formation library"
        title="Every shape, on the pitch"
        description="Tap a formation to see its slots, the roles each position wants, where it is strong and where opponents will attack it."
      />

      <div className="mb-5 space-y-3">
        <div role="group" aria-label="Filter by playstyle" className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')} className={pill(filter === 'all')}>
            All styles
          </button>
          {PLAYSTYLES.map((p) => (
            <button key={p.id} type="button" aria-pressed={filter === p.id} onClick={() => setFilter(p.id)} className={pill(filter === p.id)}>
              {p.name}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Filter by defensive line" className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Back line</span>
          {(['any', '3', '4', '5'] as BackLine[]).map((b) => (
            <button key={b} type="button" aria-pressed={line === b} onClick={() => setLine(b)} className={pill(line === b)}>
              {b === 'any' ? 'Any' : `${b} at the back`}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-400" aria-live="polite">
          Showing {visible.length} of {FORMATIONS.length} formations
        </p>
      </div>

      {visible.length === 0 ? (
        <div className="card-pad text-center">
          <p className="font-semibold text-white">No formation matches both filters.</p>
          <button
            type="button"
            className="btn-ghost mt-3"
            onClick={() => {
              setFilter('all');
              setLine('any');
            }}
          >
            <Icon name="rotate" size={16} /> Reset filters
          </button>
        </div>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((f) => (
            <li key={f.id}>
              <FormationCard formation={f} onSelect={setSelected} />
            </li>
          ))}
        </ul>
      )}

      <Sheet
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
        subtitle={selected ? `${selected.shape} · ${selected.slots.length} players` : undefined}
      >
        {selected && (
          <div className="space-y-6">
            <div className="mx-auto max-w-[300px]">
              <FormationPitch formation={selected} size="sm" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <DifficultyDots level={selected.difficulty} />
              {selected.bestForPlaystyles.map((id) => (
                <Chip key={id} tone="accent">
                  {getPlaystyle(id).name}
                </Chip>
              ))}
            </div>

            <p className="text-sm leading-relaxed text-slate-300">{selected.description}</p>

            <section aria-labelledby="fit-title">
              <h3 id="fit-title" className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Why it suits your style
              </h3>
              <ul className="space-y-2">
                {selected.bestForPlaystyles.map((id) => (
                  <li key={id} className="rounded-xl border border-ink-600 bg-ink-850 p-3 text-sm">
                    <span className="font-semibold text-white">{getPlaystyle(id).name}: </span>
                    <span className="text-slate-300">{selected.styleFit[id]}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="grid gap-4 sm:grid-cols-2">
              <section aria-labelledby="str-title">
                <h3 id="str-title" className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-accent">
                  <Icon name="check" size={16} strokeWidth={3} /> Strengths
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {selected.strengths.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby="weak-title">
                <h3 id="weak-title" className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-signal-amber">
                  <Icon name="alert" size={16} strokeWidth={2.5} /> Weaknesses
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {selected.weaknesses.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-amber" />
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section aria-labelledby="slots-title">
              <h3 id="slots-title" className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Slot-by-slot roles
              </h3>
              <ul className="divide-y divide-ink-700 rounded-xl border border-ink-600 bg-ink-850">
                {selected.slots.map((slot, i) => (
                  <li key={`${slot.position}-${i}`} className="flex items-start gap-3 p-3">
                    <span className="flex h-8 w-11 shrink-0 items-center justify-center rounded-lg bg-ink-700 font-mono text-xs font-bold text-white">
                      {slot.position}
                    </span>
                    <span className="text-sm text-slate-300">
                      {slot.roleHints.map((r) => getRole(r).name).join(' · ')}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="flex flex-wrap gap-2 pb-2">
              <Link to="/squad" onClick={() => setFormation(selected.id)} className="btn-primary">
                <Icon name="users" size={16} /> Build a squad in {selected.name}
              </Link>
              <Link to="/counters" className="btn-ghost">
                <Icon name="shield" size={16} /> Find counters
              </Link>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}
