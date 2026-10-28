import type { ReactNode } from 'react';

interface PitchProps {
  /** <PlayerDot /> children, positioned by x/y percentages over the pitch. */
  children?: ReactNode;
  className?: string;
  /** `home` is green, `away` is a cool blue so two shapes are easy to tell apart. */
  tone?: 'home' | 'away';
  /** Accessible description. Pass `null` for purely decorative thumbnails. */
  label?: string | null;
  /** Thicker lines so the markings survive at thumbnail size. */
  mini?: boolean;
}

const STRIPES = 7;
const COLORS = {
  home: ['#0d3b22', '#0f4527'],
  away: ['#0e2f45', '#113a55'],
} as const;

/**
 * Vertical pitch (attacking goal at the top). The SVG uses a 68 x 105 viewBox,
 * the standard 68m x 105m pitch, and the wrapper keeps the same aspect ratio,
 * so children positioned with left/top percentages land exactly where x/y say.
 */
export function Pitch({ children, className = '', tone = 'home', label = 'Football pitch', mini = false }: PitchProps) {
  const stripes = COLORS[tone];
  const line = 'rgba(255,255,255,0.45)';
  const w = mini ? 0.9 : 0.55;

  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: '68 / 105' }}>
      <svg
        viewBox="0 0 68 105"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full rounded-xl"
        {...(label === null ? { 'aria-hidden': true } : { role: 'img', 'aria-label': label })}
      >
        {Array.from({ length: STRIPES }, (_, i) => (
          <rect key={i} x="0" y={i * 15} width="68" height="15" fill={stripes[i % 2]} />
        ))}
        <g fill="none" stroke={line} strokeWidth={w}>
          {/* touchlines and goal lines */}
          <rect x="1.5" y="1.5" width="65" height="102" />
          {/* halfway line and centre circle */}
          <line x1="1.5" y1="52.5" x2="66.5" y2="52.5" />
          <circle cx="34" cy="52.5" r="9" />
          {/* penalty areas */}
          <rect x="14.5" y="1.5" width="39" height="16" />
          <rect x="14.5" y="87.5" width="39" height="16" />
          {/* six-yard boxes */}
          <rect x="25" y="1.5" width="18" height="5.3" />
          <rect x="25" y="98.2" width="18" height="5.3" />
          {/* penalty arcs ("D"), drawn only outside the box */}
          <path d="M26.88 17.5 A9 9 0 0 0 41.12 17.5" />
          <path d="M26.88 87.5 A9 9 0 0 1 41.12 87.5" />
          {/* goals */}
          <rect x="30" y="0.2" width="8" height="1.3" />
          <rect x="30" y="103.5" width="8" height="1.3" />
        </g>
        <g fill={line}>
          <circle cx="34" cy="52.5" r={mini ? 1.1 : 0.8} />
          <circle cx="34" cy="12" r={mini ? 0.9 : 0.6} />
          <circle cx="34" cy="93" r={mini ? 0.9 : 0.6} />
        </g>
      </svg>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
