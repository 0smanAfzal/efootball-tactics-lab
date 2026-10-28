import { useRef, type KeyboardEvent } from 'react';
import { PLAYSTYLES } from '../data/playstyles';
import type { PlaystyleId } from '../types';

interface PlaystylePickerProps {
  value: PlaystyleId;
  onChange: (id: PlaystyleId) => void;
  /** `cards` shows the summary; `chips` is the compact form. */
  variant?: 'cards' | 'chips';
  label?: string;
}

/** Radio group with arrow-key navigation (roving tabindex). */
export function PlaystylePicker({ value, onChange, variant = 'cards', label = 'Playstyle' }: PlaystylePickerProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown';
    const backward = event.key === 'ArrowLeft' || event.key === 'ArrowUp';
    if (!forward && !backward) return;
    event.preventDefault();
    const next = (index + (forward ? 1 : -1) + PLAYSTYLES.length) % PLAYSTYLES.length;
    onChange(PLAYSTYLES[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={variant === 'cards' ? 'grid gap-3 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-wrap gap-2'}
    >
      {PLAYSTYLES.map((p, index) => {
        const selected = p.id === value;
        return (
          <button
            key={p.id}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(p.id)}
            onKeyDown={(e) => onKeyDown(e, index)}
            className={
              variant === 'cards'
                ? `rounded-2xl border p-4 text-left transition ${
                    selected
                      ? 'border-accent bg-accent/10 shadow-glow'
                      : 'border-ink-600 bg-ink-850 hover:border-ink-500 hover:bg-ink-800'
                  }`
                : `min-h-[40px] rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                    selected
                      ? 'border-accent bg-accent text-ink-950'
                      : 'border-ink-500 bg-ink-800 text-slate-200 hover:bg-ink-700'
                  }`
            }
          >
            {variant === 'cards' ? (
              <>
                <span className="flex items-center justify-between gap-2">
                  <span className="font-bold text-white">{p.name}</span>
                  <span
                    aria-hidden="true"
                    className={`h-4 w-4 rounded-full border-2 ${selected ? 'border-accent bg-accent' : 'border-ink-500'}`}
                  />
                </span>
                <span className="mt-1.5 block text-xs leading-relaxed text-slate-400">{p.summary}</span>
              </>
            ) : (
              p.name
            )}
          </button>
        );
      })}
    </div>
  );
}
