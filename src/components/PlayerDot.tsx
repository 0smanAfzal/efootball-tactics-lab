import { Icon, type IconName } from './Icon';

export type DotTone = 'neutral' | 'ideal' | 'good' | 'ok' | 'poor' | 'empty' | 'opponent' | 'accent';
type DotSize = 'xs' | 'sm' | 'md';

const TONE_CLASS: Record<DotTone, string> = {
  neutral: 'border-white/80 bg-ink-900 text-white',
  accent: 'border-accent bg-accent text-ink-950',
  opponent: 'border-signal-cyan bg-signal-cyan text-ink-950',
  ideal: 'border-accent bg-accent text-ink-950',
  good: 'border-signal-mint bg-signal-mint text-ink-950',
  ok: 'border-signal-amber bg-signal-amber text-ink-950',
  poor: 'border-signal-red bg-signal-red text-white',
  empty: 'border-dashed border-slate-300/80 bg-ink-900/70 text-slate-200',
};

/** Colour is never the only signal: every rated tone also carries an icon. */
const STATUS_ICON: Partial<Record<DotTone, IconName>> = {
  ideal: 'star',
  good: 'check',
  ok: 'minus',
  poor: 'alert',
};

const SIZE_CLASS: Record<DotSize, string> = {
  xs: 'h-2.5 w-2.5 border',
  sm: 'h-7 w-7 border-2 text-[9px]',
  md: 'h-11 w-11 border-2 text-[11px]',
};

/** Half the dot height, so the dot itself (not the label under it) sits on the x/y point. */
const HALF_HEIGHT: Record<DotSize, number> = { xs: 5, sm: 14, md: 22 };

interface PlayerDotProps {
  /** Percentage across the pitch (0-100). */
  x: number;
  /** Percentage down the pitch (0-100). */
  y: number;
  label: string;
  sublabel?: string;
  tone?: DotTone;
  size?: DotSize;
  onClick?: () => void;
  ariaLabel?: string;
  tooltip?: string;
  selected?: boolean;
}

export function PlayerDot({
  x,
  y,
  label,
  sublabel,
  tone = 'neutral',
  size = 'md',
  onClick,
  ariaLabel,
  tooltip,
  selected = false,
}: PlayerDotProps) {
  const statusIcon = STATUS_ICON[tone];
  const showText = size !== 'xs';

  // Keep tooltips inside the viewport: anchor to the nearer edge for slots near the sides.
  const tipAlign = x < 30 ? 'left-0' : x > 70 ? 'right-0' : 'left-1/2 -translate-x-1/2';
  const tipSide = y < 28 ? 'top-full mt-1' : 'bottom-full mb-1';

  const body = (
    <>
      <span
        className={`relative flex items-center justify-center rounded-full font-bold shadow-lg transition-transform ${SIZE_CLASS[size]} ${TONE_CLASS[tone]} ${
          selected ? 'ring-2 ring-white ring-offset-2 ring-offset-ink-900' : ''
        } ${onClick ? 'group-hover:scale-105' : ''}`}
      >
        {showText && <span aria-hidden={ariaLabel ? true : undefined}>{label}</span>}
        {showText && statusIcon && (
          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-ink-950 bg-ink-950 text-white">
            <Icon name={statusIcon} size={10} strokeWidth={3} />
          </span>
        )}
        {showText && tone === 'empty' && onClick && <Icon name="plus" size={14} className="absolute opacity-60" />}
      </span>
      {sublabel && showText && (
        <span
          aria-hidden="true"
          className="mt-0.5 max-w-[78px] truncate rounded bg-ink-950/85 px-1 text-[9px] font-medium leading-4 text-slate-100"
        >
          {sublabel}
        </span>
      )}
    </>
  );

  return (
    <div
      className="group absolute flex flex-col items-center hover:z-30 focus-within:z-30"
      style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%, -${HALF_HEIGHT[size]}px)` }}
    >
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          aria-label={ariaLabel}
          className="flex flex-col items-center rounded-full focus-visible:outline-offset-4"
        >
          {body}
        </button>
      ) : (
        <div {...(ariaLabel ? { role: 'img', 'aria-label': ariaLabel } : { 'aria-hidden': true })} className="flex flex-col items-center">
          {body}
        </div>
      )}
      {tooltip && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute z-40 hidden w-48 rounded-lg border border-ink-500 bg-ink-950 px-2.5 py-2 text-left text-[11px] font-normal leading-snug text-slate-100 shadow-xl group-focus-within:block group-hover:block ${tipAlign} ${tipSide}`}
        >
          {tooltip}
        </span>
      )}
    </div>
  );
}
