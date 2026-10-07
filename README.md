# TreadFlow Web

A browser-based treadmill interval guide — the web companion to the TreadFlow iOS app.
Static site, offline-first, **no backend, no accounts, no analytics**: programs, history,
feedback and settings live only in the browser's IndexedDB.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # engine + editor unit tests (Vitest)
npm run build      # type-check + production build to dist/
```

## Deploy (Netlify)

`netlify.toml` sets the build command (`npm run build`), publish dir (`dist`) and an SPA
redirect so deep links like `/programs/…` work on refresh. No functions needed.

## Structure

| Path | What |
| --- | --- |
| `src/db/` | Types + IndexedDB layer (`idb`). Seeds/refreshes built-ins on open, preserving favourites. Every write emits a change event. |
| `src/hooks/useLiveQuery.ts` | Re-runs a query when its tables change — keeps all screens in sync. |
| `src/data/seedPrograms.ts` | 54 built-in programs, generated from the iOS app's seed files. |
| `src/lib/workoutEngine.ts` | **Drift-free timer** (pure functions, unit-tested). |
| `src/lib/programDraft.ts` | Editor logic: validation, quick-adjust scaling, copy naming. |
| `src/components/WorkoutTypeBadge.tsx` | The single source of workout-type colour — the "Vibrant colours" toggle flips every badge/swatch here. |
| `src/pages/` | Browse, Favourites, Details, Create/Customize, Active Workout, History, Settings. |

## Timer design

Elapsed time is never accumulated from ticks. It is derived on every render:

```
elapsed = (pausedAt ?? Date.now()) − startedAt − pausedTotal + skipped
```

The UI re-renders every 250 ms purely to repaint; a throttled background tab or a late tick
can delay a repaint but never shifts the clock. The engine state is just timestamps, so it's
kept in `sessionStorage` and a page refresh resumes mid-workout.

## Notes

- Speeds are stored in km/h; mph is display-only, snapped to the nearest 0.5.
- Built-in programs can never be overwritten — customizing one always saves a new program.
- The skip-limit alert fires when skipped/total reaches the threshold (≥, matching iOS) and
  re-appears on every further skip.
- The screen is kept awake during workouts via the Screen Wake Lock API where supported.
