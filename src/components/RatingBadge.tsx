import { RATING_LABEL } from '../lib/suitability';
import type { SuitabilityRating } from '../types';
import { Icon, type IconName } from './Icon';

const STYLE: Record<SuitabilityRating, { icon: IconName; cls: string }> = {
  ideal: { icon: 'star', cls: 'border-accent/60 bg-accent/15 text-accent' },
  good: { icon: 'check', cls: 'border-signal-mint/60 bg-signal-mint/15 text-signal-mint' },
  ok: { icon: 'minus', cls: 'border-signal-amber/60 bg-signal-amber/15 text-signal-amber' },
  poor: { icon: 'alert', cls: 'border-signal-red/60 bg-signal-red/15 text-signal-red' },
};

/** Suitability pill. Shape (icon) and wording carry the meaning, not just the colour. */
export function RatingBadge({ rating, className = '' }: { rating: SuitabilityRating; className?: string }) {
  const { icon, cls } = STYLE[rating];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${cls} ${className}`}>
      <Icon name={icon} size={12} strokeWidth={3} />
      {RATING_LABEL[rating]}
    </span>
  );
}
