import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Chip } from '../components/Chip';
import { DifficultyDots } from '../components/DifficultyDots';
import { FormationPitch } from '../components/FormationPitch';
import { Icon } from '../components/Icon';
import { PageHeader } from '../components/PageHeader';
import { PlaystylePicker } from '../components/PlaystylePicker';
import { ProfilePanel } from '../components/ProfilePanel';
import { TacticPanel } from '../components/TacticPanel';
import { getPlaystyle } from '../data/playstyles';
import { getRole } from '../data/roles';
import { recommendFormations } from '../lib/advisor';
import { useAppState } from '../state/AppState';

export function AdvisorPage() {
  const { state, setPlaystyle, setFormation } = useAppState();
  const { playstyle: playstyleId, riskTolerance } = state.settings;
  const playstyle = getPlaystyle(playstyleId);
  const picks = useMemo(() => recommendFormations(playstyleId, riskTolerance, 3), [playstyleId, riskTolerance]);

  return (
    <div>
      <PageHeader
        kicker="Playstyle advisor"
        title="How do you want to play?"
        description="Choose your manager playstyle. The advisor ranks the best formations for it and gives you every tactical setting to copy into the game."
      />

      <section aria-label="Choose playstyle">
        <PlaystylePicker value={playstyleId} onChange={setPlaystyle} />
      </section>

      <section className="card-pad mt-6" aria-labelledby="style-overview">
        <h2 id="style-overview" className="text-xl font-bold text-white">
          {playstyle.name}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-300">{playstyle.summary}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Ideal for</p>
            <p className="mt-1 text-sm text-slate-300">{playstyle.idealFor}</p>
          </div>
          <div className="rounded-xl border border-signal-amber/30 bg-signal-amber/5 p-3">
            <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-signal-amber">
              <Icon name="alert" size={12} strokeWidth={3} /> Watch out
            </p>
            <p className="mt-1 text-sm text-slate-300">{playstyle.watchOut}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Key attributes</p>
          <div className="flex flex-wrap gap-1.5">
            {playstyle.keyAttributes.map((a) => (
              <Chip key={a}>{a}</Chip>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="top-formations">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <h2 id="top-formations" className="text-2xl font-bold text-white">
            Your top 3 formations
          </h2>
          <details className="text-sm">
            <summary className="cursor-pointer font-semibold text-accent">Adjust comfort level</summary>
            <div className="card-pad mt-2">
              <ProfilePanel showRisk />
            </div>
          </details>
        </div>
        <ol className="grid gap-4 lg:grid-cols-3">
          {picks.map(({ formation, score, reasons }, i) => (
            <li key={formation.id} className="card flex flex-col p-4">
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-extrabold ${
                    i === 0 ? 'bg-accent text-ink-950' : 'bg-ink-700 text-white'
                  }`}
                  aria-label={`Rank ${i + 1}`}
                >
                  #{i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-white">{formation.name}</h3>
                  <DifficultyDots level={formation.difficulty} />
                </div>
                <span className="font-mono text-sm text-slate-300">
                  <span className="text-lg font-extrabold text-white">{score}</span>/100
                </span>
              </div>
              <div className="mx-auto mt-4 w-full max-w-[170px]">
                <FormationPitch formation={formation} label={`${formation.name} formation diagram`} />
              </div>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-300">
                {reasons.slice(0, 3).map((r) => (
                  <li key={r} className="flex gap-2">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent" strokeWidth={3} />
                    {r}
                  </li>
                ))}
              </ul>
              <Link to="/squad" onClick={() => setFormation(formation.id)} className="btn-ghost mt-4 w-full">
                <Icon name="users" size={16} /> Build a squad with this
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10" aria-labelledby="tactics-title">
        <h2 id="tactics-title" className="text-2xl font-bold text-white">
          Tactical settings for {playstyle.name}
        </h2>
        <p className="muted mb-4 mt-1">
          Slider values use the in-game scales (1-10 for the overall intent, 1-15 for the advanced sliders). Copy them into
          Team Tactics, then adjust to match your players.
        </p>
        <TacticPanel playstyle={playstyle} />
      </section>

      <section className="mt-10" aria-labelledby="roles-title">
        <h2 id="roles-title" className="text-2xl font-bold text-white">
          Players to prioritise
        </h2>
        <p className="muted mb-4 mt-1">Look for these playing styles first when you scout or build your squad.</p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {playstyle.priorityRoles.map((roleId, i) => {
            const role = getRole(roleId);
            return (
              <li key={roleId} className="card p-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-accent">#{i + 1}</span>
                  <h3 className="font-bold text-white">{role.name}</h3>
                </div>
                <p className="mt-1 text-xs text-slate-500">{role.naturalPositions.join(' · ')}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{role.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {role.keyStats.slice(0, 3).map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
