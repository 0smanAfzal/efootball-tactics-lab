import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Nav } from './components/Nav';
import { AdvisorPage } from './pages/AdvisorPage';
import { CounterPage } from './pages/CounterPage';
import { FormationsPage } from './pages/FormationsPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { HomePage } from './pages/HomePage';
import { SquadPage } from './pages/SquadPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="card-pad mx-auto mt-10 max-w-md text-center">
      <h1 className="text-2xl font-bold text-white">Offside: page not found</h1>
      <p className="muted mt-2">That route does not exist in the lab.</p>
      <Link to="/" className="btn-primary mt-4">
        Back to home
      </Link>
    </div>
  );
}

/*
 * Routing: HashRouter (see main.tsx) rather than tab state. GitHub Pages cannot
 * rewrite unknown paths to index.html, so a refresh on /counters would 404 with
 * BrowserRouter. Hash URLs keep every screen deep-linkable and bookmarkable with
 * zero server configuration.
 */
export default function App() {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-accent px-3 py-2 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>
      <Nav />
      <ScrollToTop />
      <main id="main" className="mx-auto max-w-6xl px-4 pb-28 pt-6 md:pb-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/formations" element={<FormationsPage />} />
          <Route path="/advisor" element={<AdvisorPage />} />
          <Route path="/squad" element={<SquadPage />} />
          <Route path="/counters" element={<CounterPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
