import { NavLink, Link } from 'react-router-dom';
import { Icon, type IconName } from './Icon';

const LINKS: { to: string; label: string; icon: IconName; end?: boolean }[] = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/formations', label: 'Formations', icon: 'grid' },
  { to: '/advisor', label: 'Advisor', icon: 'bolt' },
  { to: '/squad', label: 'Squad', icon: 'users' },
  { to: '/counters', label: 'Counters', icon: 'shield' },
  { to: '/glossary', label: 'Glossary', icon: 'book' },
];

export function Nav() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink-700/80 bg-ink-950/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold tracking-tight text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-ink-950">
              <Icon name="bolt" size={16} strokeWidth={2.5} />
            </span>
            eFootball <span className="text-accent">Tactics Lab</span>
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {LINKS.slice(1).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-accent/15 text-accent' : 'text-slate-300 hover:bg-ink-800 hover:text-white'
                  }`
                }
              >
                <Icon name={link.icon} size={16} />
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <nav
        aria-label="Mobile primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-700 bg-ink-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >
        <ul className="mx-auto grid max-w-lg grid-cols-6">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition ${
                    isActive ? 'text-accent' : 'text-slate-400'
                  }`
                }
              >
                <Icon name={link.icon} size={20} />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
