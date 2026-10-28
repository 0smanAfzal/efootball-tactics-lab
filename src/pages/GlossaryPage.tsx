import { useMemo, useState } from 'react';
import { Chip } from '../components/Chip';
import { Icon } from '../components/Icon';
import { PageHeader } from '../components/PageHeader';
import { POSITION_INFO } from '../data/positions';
import { PLAYSTYLES, getPlaystyle } from '../data/playstyles';
import { ROLES } from '../data/roles';
import { POSITIONS } from '../types';

type Tab = 'roles' | 'playstyles' | 'positions';

const TABS: { id: Tab; label: string }[] = [
  { id: 'roles', label: 'Player archetypes' },
  { id: 'playstyles', label: 'Playstyles' },
  { id: 'positions', label: 'Positions' },
];

export function GlossaryPage() {
  const [tab, setTab] = useState<Tab>('roles');
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const roles = useMemo(
    () => ROLES.filter((r) => !q || `${r.name} ${r.summary} ${r.keyStats.join(' ')}`.toLowerCase().includes(q)),
    [q],
  );
  const styles = useMemo(
    () => PLAYSTYLES.filter((p) => !q || `${p.name} ${p.summary}`.toLowerCase().includes(q)),
    [q],
  );
  const positions = useMemo(
    () => POSITIONS.filter((p) => !q || `${p} ${POSITION_INFO[p].name} ${POSITION_INFO[p].description}`.toLowerCase().includes(q)),
    [q],
  );

  return (
    <div>
      <PageHeader
        kicker="Glossary"
        title="The language of the lab"
        description="Definitions for every player archetype, manager playstyle and position used across the app."
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label="Glossary sections" className="inline-flex overflow-hidden rounded-xl border border-ink-500">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`min-h-[44px] px-3 text-sm font-semibold transition sm:px-4 ${
                tab === t.id ? 'bg-accent text-ink-950' : 'bg-ink-800 text-slate-200 hover:bg-ink-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative sm:w-72">
          <label htmlFor="glossary-search" className="sr-only">
            Search the glossary
          </label>
          <Icon name="search" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            id="glossary-search"
            type="search"
            className="field !pl-9"
            placeholder="Search…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {tab === 'roles' && (
        <div role="tabpanel" id="panel-roles" aria-labelledby="tab-roles">
          {roles.length === 0 && <p className="muted">No archetypes match "{query}".</p>}
          <ul className="grid gap-4 md:grid-cols-2">
            {roles.map((r) => (
              <li key={r.id} className="card p-4">
                <h3 className="text-lg font-bold text-white">{r.name}</h3>
                <p className="mt-0.5 font-mono text-xs text-accent">
                  Natural: {r.naturalPositions.join(' · ')}
                  {r.compatiblePositions.length > 0 && <span className="text-slate-500"> · Can cover: {r.compatiblePositions.join(' · ')}</span>}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{r.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.keyStats.map((s) => (
                    <Chip key={s} tone="cyan">
                      {s}
                    </Chip>
                  ))}
                </div>
                <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <p className="font-semibold text-accent">Strengths</p>
                    <ul className="mt-1 list-disc space-y-1 pl-4 text-slate-300">
                      {r.strengths.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-signal-amber">Weaknesses</p>
                    <ul className="mt-1 list-disc space-y-1 pl-4 text-slate-300">
                      {r.weaknesses.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Best in: {r.bestPlaystyles.map((id) => getPlaystyle(id).name).join(', ')}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === 'playstyles' && (
        <div role="tabpanel" id="panel-playstyles" aria-labelledby="tab-playstyles">
          {styles.length === 0 && <p className="muted">No playstyles match "{query}".</p>}
          <ul className="grid gap-4 md:grid-cols-2">
            {styles.map((p) => (
              <li key={p.id} className="card p-4">
                <h3 className="text-lg font-bold text-white">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.summary}</p>
                <p className="mt-3 text-sm text-slate-300">
                  <span className="font-semibold text-accent">Ideal for: </span>
                  {p.idealFor}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  <span className="font-semibold text-signal-amber">Watch out: </span>
                  {p.watchOut}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.keyAttributes.map((a) => (
                    <Chip key={a}>{a}</Chip>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === 'positions' && (
        <div role="tabpanel" id="panel-positions" aria-labelledby="tab-positions">
          {positions.length === 0 && <p className="muted">No positions match "{query}".</p>}
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {positions.map((code) => {
              const info = POSITION_INFO[code];
              return (
                <li key={code} className="card flex gap-3 p-4">
                  <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg bg-ink-700 font-mono text-sm font-bold text-white">
                    {code}
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{info.name}</h3>
                    <p className="text-xs uppercase tracking-wider text-slate-500">{info.line}</p>
                    <p className="mt-1 text-sm text-slate-300">{info.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
