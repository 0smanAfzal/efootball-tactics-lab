interface ScoreBarProps {
  label: string;
  value: number;
  /** Small explanatory line under the bar. */
  hint?: string;
  size?: 'md' | 'lg';
}

function band(value: number): { word: string; fill: string } {
  if (value >= 80) return { word: 'Excellent', fill: 'bg-accent' };
  if (value >= 60) return { word: 'Good', fill: 'bg-signal-cyan' };
  if (value >= 40) return { word: 'Fair', fill: 'bg-signal-amber' };
  return { word: 'Weak', fill: 'bg-signal-red' };
}

/** Horizontal score meter. The number and a word accompany the colour. */
export function ScoreBar({ label, value, hint, size = 'md' }: ScoreBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const { word, fill } = band(clamped);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className={`font-medium text-slate-200 ${size === 'lg' ? 'text-base' : 'text-sm'}`}>{label}</span>
        <span className="font-mono text-sm text-slate-300">
          <span className="font-bold text-white">{clamped}</span>
          <span className="text-slate-500"> / 100 · </span>
          {word}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-valuetext={`${clamped} out of 100, ${word}`}
        className={`mt-1.5 overflow-hidden rounded-full bg-ink-700 ${size === 'lg' ? 'h-3' : 'h-2'}`}
      >
        <div className={`h-full rounded-full transition-all duration-500 ${fill}`} style={{ width: `${clamped}%` }} />
      </div>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
