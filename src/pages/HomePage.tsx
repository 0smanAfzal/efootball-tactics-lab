import { Link } from 'react-router-dom';
import { Icon, type IconName } from '../components/Icon';
import { FORMATIONS } from '../data/formations';
import { PLAYSTYLES } from '../data/playstyles';
import { ROLES } from '../data/roles';

const FEATURES: { to: string; icon: IconName; title: string; body: string; cta: string }[] = [
  {
    to: '/formations',
    icon: 'grid',
    title: 'Formation Library',
    body: 'Eighteen shapes drawn on the pitch, with the strengths, weaknesses and best playstyle for each.',
    cta: 'Browse formations',
  },
  {
    to: '/advisor',
    icon: 'bolt',
    title: 'Playstyle Advisor',
    body: 'Pick how you play and get your three best formations plus every tactical slider, ready to copy in-game.',
    cta: 'Get my setup',
  },
  {
    to: '/squad',
    icon: 'users',
    title: 'Squad Builder',
    body: 'Place a player archetype in every slot and watch the cohesion score and warnings update live.',
    cta: 'Build a squad',
  },
  {
    to: '/counters',
    icon: 'shield',
    title: 'Counter Lab',
    body: 'Choose the opponent\'s formation and get ranked counters tuned to your style, with in-game instructions.',
    cta: 'Beat a formation',
  },
];

/** Animated passing move on a mini pitch: a purely decorative hero illustration. */
function HeroPitch() {
  return (
    <svg viewBox="0 0 68 105" className="h-full w-full" aria-hidden="true">
      <rect width="68" height="105" rx="4" fill="#0d3b22" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} y={i * 15} width="68" height="15" fill={i % 2 ? '#0f4527' : '#0d3b22'} />
      ))}
      <g fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6">
        <rect x="1.5" y="1.5" width="65" height="102" />
        <line x1="1.5" y1="52.5" x2="66.5" y2="52.5" />
        <circle cx="34" cy="52.5" r="9" />
        <rect x="14.5" y="1.5" width="39" height="16" />
        <rect x="14.5" y="87.5" width="39" height="16" />
      </g>
      <g fill="none" stroke="#b6ff3b" strokeWidth="0.9" strokeDasharray="3 2" strokeLinecap="round">
        <path d="M34 90 L22 70 L34 52 L50 34 L40 14" className="animate-pass" strokeDashoffset="0" />
      </g>
      {[
        [34, 90],
        [22, 70],
        [34, 52],
        [50, 34],
        [40, 14],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" fill="#b6ff3b" stroke="#07110c" strokeWidth="0.6" />
      ))}
      {[
        [26, 26],
        [54, 24],
        [30, 40],
        [44, 60],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.1" fill="#38e8ff" stroke="#07110c" strokeWidth="0.6" />
      ))}
    </svg>
  );
}

export function HomePage() {
  return (
    <div>
      <section className="grid items-center gap-8 py-4 md:grid-cols-[1.25fr_0.75fr] md:py-10">
        <div className="animate-rise">
          <p className="kicker">Unofficial tactics companion for eFootball</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Stop guessing your <span className="text-accent">formation.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Tell the lab how you play, who you have, and what the other manager is running. It answers with a shape, the
            exact tactical settings, the right player archetypes and a counter plan you can use in the next match.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/advisor" className="btn-primary">
              Find my formation <Icon name="arrow-right" size={18} />
            </Link>
            <Link to="/counters" className="btn-ghost">
              Counter an opponent
            </Link>
          </div>
          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-ink-700 pt-5">
            {[
              [FORMATIONS.length, 'formations'],
              [PLAYSTYLES.length, 'playstyles'],
              [ROLES.length, 'player archetypes'],
            ].map(([n, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="text-3xl font-extrabold text-white">{n}</dd>
                <dd className="text-xs uppercase tracking-wider text-slate-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mx-auto w-full max-w-[260px] animate-rise md:max-w-[300px]">
          <div className="aspect-[68/105] overflow-hidden rounded-3xl border border-ink-500 shadow-glow">
            <HeroPitch />
          </div>
        </div>
      </section>

      <section aria-labelledby="features" className="mt-8">
        <h2 id="features" className="sr-only">
          Features
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <li key={f.to}>
              <Link
                to={f.to}
                className="card group flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-glow"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon name={f.icon} size={22} />
                </span>
                <h3 className="mt-4 text-xl font-bold text-white">{f.title}</h3>
                <p className="muted mt-1 flex-1">{f.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  {f.cta}
                  <Icon name="arrow-right" size={16} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-center text-xs text-slate-500">
        Everything runs in your browser. Your squads and settings stay on this device. Not affiliated with Konami.
      </p>
    </div>
  );
}
