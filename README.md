# eFootball Tactics Lab

![Build](https://img.shields.io/badge/build-passing-b6ff3b?style=flat-square)
![React](https://img.shields.io/badge/React-18-38e8ff?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06b6d4?style=flat-square)
![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)

A formation, tactics, player-suitability and counter-formation advisor for **eFootball**. It runs entirely in the browser: no backend, no API keys, no network calls. Your squads and settings stay in `localStorage`.

> Unofficial fan project. Not affiliated with or endorsed by Konami.

## Screenshots

Add your own captures to `docs/` and link them here:

| Home | Formations | Advisor |
| --- | --- | --- |
| `docs/home.png` | `docs/formations.png` | `docs/advisor.png` |

| Squad Builder | Counter Lab |
| --- | --- |
| `docs/squad.png` | `docs/counters.png` |

## Features

- **Formation library**: 18 shapes drawn on an SVG pitch, filterable by playstyle and back line, with strengths, weaknesses, difficulty and slot-by-slot role hints.
- **Playstyle advisor**: pick one of the five manager playstyles to get the top 3 formations (ranked with reasons), all tactical settings with explanations, and the player archetypes to prioritise.
- **Squad builder**: choose a formation, tap a slot and assign an archetype. Each slot is rated ideal / good / stretch / poor (colour, icon and text), with a live 0-100 cohesion score broken into positional fit, role balance and playstyle match. Rename, save and load squads.
- **Counter lab**: choose the opponent's shape and get ranked counters with score bars, reasoning, 2-4 in-game instructions, danger zones, a side-by-side pitch comparison and a breakdown of how your profile changed the score.
- **Glossary**: searchable definitions of archetypes, playstyles and positions.
- Mobile-first, dark theme, keyboard navigable, ARIA labels on every slot, reduced-motion friendly.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173/efootball-tactics-lab/
npm run validate   # data integrity checks
npm run build      # type-check + production build into dist/
npm run preview
```

Requires Node 18+.

## Deploy to GitHub Pages

1. Create a repository named `efootball-tactics-lab` (the name must match `base` in `vite.config.ts`).
2. Push to `main`.
3. In **Settings > Pages**, set **Source** to **GitHub Actions**.

`.github/workflows/deploy.yml` validates the data, builds, and publishes on every push to `main`. The app uses a hash router so deep links survive refreshes on Pages.

## How the counter engine works

`src/data/counters.ts` holds 2-4 hand-written counters for every formation, each with a baseline score, reasoning, instructions, danger zones and **tags** describing the idea behind it (`midfield-overload`, `wide-overload`, `space-behind`, `compact-block`, `high-press`, `aerial-threat`, `central-lane`, `width-stretch`).

`src/lib/counterEngine.ts` then personalises that baseline:

1. **Playstyle fit.** Every playstyle has an affinity per tag. Quick Counter rewards `space-behind` and `compact-block`; Possession Game rewards `midfield-overload`; Out Wide rewards `wide-overload`; Long Ball rewards `aerial-threat`. A counter formation that is also one of your playstyle's recommended shapes earns a further bonus.
2. **Familiarity.** Your usual formation gets +10 and formations you marked as known get +6. Unfamiliar shapes lose points.
3. **Difficulty.** Unfamiliar shapes lose extra points for each difficulty step above your comfort level.
4. Scores are clamped to 0-100 and sorted. The baseline rank is retained so the UI can show how far your profile moved each option, and every adjustment is listed in plain language under "Why this works for you".

`npm run validate` asserts that the ranking really changes with playstyle for the large majority of opponents, so the engine cannot silently regress into a static list.

## Suitability and cohesion

`suitability(roleId, position)` returns `ideal` (100), `good` (75), `ok` (45) or `poor` (12) with a reason. A role is ideal in its natural positions, good in compatible ones, a stretch when the position borders one it can play, and poor otherwise. Goalkeepers and outfielders never mix (score 0).

The cohesion score is 50% positional fit, 25% role balance (finisher, creator, defensive screen, duplicate roles, full-back balance) and 25% playstyle match.

## Project layout

```
src/
  types/        shared TypeScript types
  data/         formations, playstyles, roles, counters, positions
  lib/          counterEngine, suitability, cohesion, advisor, storage
  state/        app state + localStorage persistence
  components/   Pitch, PlayerDot, FormationCard, SlotPicker, ScoreBar, Nav ...
  pages/        Home, Formations, Advisor, Squad, Counters, Glossary
scripts/        validate-data.ts
```

## A note on the data

Formation analysis, counters and tactic values are written from football and eFootball knowledge. Role-to-position mappings are curated approximations because availability varies per player card. Treat everything as strong starting guidance and tune to your squad and the current game version.

## License

MIT. See [LICENSE](LICENSE).
