import { TACTIC_META } from '../data/playstyles';
import type { Playstyle } from '../types';

const GROUP_TITLE = {
  feel: 'Overall intent',
  attack: 'In possession',
  defence: 'Out of possession',
} as const;

/**
 * Full tactical settings for a playstyle. Every slider is shown as a labelled
 * chip with the exact value, a bar, and a plain-language explanation, so the
 * numbers can be copied straight into the in-game Advanced Instructions screen.
 */
export function TacticPanel({ playstyle }: { playstyle: Playstyle }) {
  const groups = (['feel', 'attack', 'defence'] as const).map((group) => ({
    group,
    items: TACTIC_META.filter((m) => m.group === group),
  }));

  return (
    <div className="space-y-6">
      {groups.map(({ group, items }) => (
        <section key={group} aria-labelledby={`tactic-${group}`}>
          <h3 id={`tactic-${group}`} className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
            {GROUP_TITLE[group]}
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((meta) => {
              const setting = playstyle.tacticPresets[meta.key];
              const isSlider = 'max' in setting;
              return (
                <li key={meta.key} className="rounded-xl border border-ink-600 bg-ink-850 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-white">{meta.label}</span>
                    <span className="rounded-full border border-accent/50 bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-bold text-accent">
                      {isSlider ? `${setting.value} / ${setting.max}` : setting.value}
                    </span>
                  </div>
                  {isSlider && (
                    <div
                      role="meter"
                      aria-label={meta.label}
                      aria-valuemin={1}
                      aria-valuemax={setting.max}
                      aria-valuenow={setting.value}
                      className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-700"
                    >
                      <div className="h-full rounded-full bg-accent" style={{ width: `${(setting.value / setting.max) * 100}%` }} />
                    </div>
                  )}
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{setting.explanation}</p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
