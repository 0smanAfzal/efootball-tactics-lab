import type { ReactNode } from 'react';

type Tone = 'neutral' | 'accent' | 'cyan' | 'amber' | 'red';

const TONE: Record<Tone, string> = {
  neutral: 'border-ink-500 bg-ink-800 text-slate-200',
  accent: 'border-accent/50 bg-accent/10 text-accent',
  cyan: 'border-signal-cyan/50 bg-signal-cyan/10 text-signal-cyan',
  amber: 'border-signal-amber/50 bg-signal-amber/10 text-signal-amber',
  red: 'border-signal-red/50 bg-signal-red/10 text-signal-red',
};

export function Chip({ children, tone = 'neutral', className = '' }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${TONE[tone]} ${className}`}>
      {children}
    </span>
  );
}
