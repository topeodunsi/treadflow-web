/**
 * Drift-free workout timer.
 *
 * Elapsed time is NEVER accumulated by counting ticks. It is always derived
 * from wall-clock timestamps:
 *
 *   elapsed = (pausedAt ?? now) − startedAt − pausedTotal + skipped
 *
 * - startedAt   : Date.now() when the workout started
 * - pausedTotal : accumulated time spent paused (closed pause spans)
 * - pausedAt    : start of the current pause span, if paused
 * - skipped     : time jumped forward by "Skip" (so the clock lands exactly
 *                 on the next interval's start)
 *
 * The UI just re-renders every ~250–500 ms and calls `snapshot(state, now)`;
 * a late, throttled or missed tick (e.g. a backgrounded tab) can't introduce
 * error, because the next render recomputes from `Date.now()`.
 *
 * All functions are pure: they take the current time as an argument and
 * return a new state, which makes the engine trivially testable.
 */

export interface EngineInterval {
  durationSeconds: number
  speed: number
  incline: number
}

export interface EngineState {
  startedAt: number
  pausedAt: number | null
  pausedTotalMs: number
  skippedMs: number
  skipCount: number
  /** Set when the workout finishes or is ended; elapsed time is frozen here. */
  frozenElapsedMs: number | null
  /** Highest interval index the user has actually reached (for max stats). */
  maxReachedIndex: number
}

export interface EngineSnapshot {
  elapsedMs: number
  totalMs: number
  progress: number
  /** Index of the current interval (clamped to the last one when finished). */
  index: number
  remainingInIntervalMs: number
  isPaused: boolean
  isFinished: boolean
  /** True when the clock has run past the end of the final interval. */
  reachedEnd: boolean
}

export function totalMs(intervals: EngineInterval[]): number {
  return intervals.reduce((sum, i) => sum + i.durationSeconds * 1000, 0)
}

/** Elapsed ms at which interval `index` begins. */
export function intervalStartMs(intervals: EngineInterval[], index: number): number {
  let ms = 0
  for (let i = 0; i < index && i < intervals.length; i++) ms += intervals[i].durationSeconds * 1000
  return ms
}

export function createEngine(now: number): EngineState {
  return {
    startedAt: now,
    pausedAt: null,
    pausedTotalMs: 0,
    skippedMs: 0,
    skipCount: 0,
    frozenElapsedMs: null,
    maxReachedIndex: 0,
  }
}

export function rawElapsedMs(s: EngineState, now: number): number {
  if (s.frozenElapsedMs !== null) return s.frozenElapsedMs
  return Math.max(0, (s.pausedAt ?? now) - s.startedAt - s.pausedTotalMs + s.skippedMs)
}

export function indexAt(intervals: EngineInterval[], elapsedMs: number): number {
  let cumulative = 0
  for (let i = 0; i < intervals.length; i++) {
    cumulative += intervals[i].durationSeconds * 1000
    if (elapsedMs < cumulative) return i
  }
  return Math.max(0, intervals.length - 1)
}

export function snapshot(s: EngineState, intervals: EngineInterval[], now: number): EngineSnapshot {
  const total = totalMs(intervals)
  const raw = rawElapsedMs(s, now)
  const elapsed = Math.min(raw, total)
  const index = indexAt(intervals, elapsed)
  const end = intervalStartMs(intervals, index + 1)
  return {
    elapsedMs: elapsed,
    totalMs: total,
    progress: total > 0 ? elapsed / total : 0,
    index,
    remainingInIntervalMs: Math.max(0, end - elapsed),
    isPaused: s.pausedAt !== null && s.frozenElapsedMs === null,
    isFinished: s.frozenElapsedMs !== null,
    reachedEnd: raw >= total,
  }
}

export function pause(s: EngineState, now: number): EngineState {
  if (s.pausedAt !== null || s.frozenElapsedMs !== null) return s
  return { ...s, pausedAt: now }
}

export function resume(s: EngineState, now: number): EngineState {
  if (s.pausedAt === null || s.frozenElapsedMs !== null) return s
  return { ...s, pausedAt: null, pausedTotalMs: s.pausedTotalMs + (now - s.pausedAt) }
}

/** Jumps the clock to the start of the next interval. Works while paused, too. */
export function skip(s: EngineState, intervals: EngineInterval[], now: number): EngineState {
  if (s.frozenElapsedMs !== null || intervals.length === 0) return s
  const elapsed = rawElapsedMs(s, now)
  const index = indexAt(intervals, Math.min(elapsed, totalMs(intervals)))
  const target = intervalStartMs(intervals, index + 1)
  return {
    ...s,
    skippedMs: s.skippedMs + Math.max(0, target - elapsed),
    skipCount: s.skipCount + 1,
    maxReachedIndex: Math.max(s.maxReachedIndex, Math.min(index + 1, intervals.length - 1)),
  }
}

/** Freezes the clock (manual end, skip-limit end, or natural completion). */
export function finish(s: EngineState, intervals: EngineInterval[], now: number): EngineState {
  if (s.frozenElapsedMs !== null) return s
  const elapsed = Math.min(rawElapsedMs(s, now), totalMs(intervals))
  return {
    ...s,
    frozenElapsedMs: elapsed,
    maxReachedIndex: Math.max(s.maxReachedIndex, indexAt(intervals, elapsed)),
  }
}

/**
 * Call on each render tick. Records progress for max-stat tracking and
 * finishes the workout once the clock passes the final interval.
 * Returns the same object when nothing changed, so React can bail out.
 */
export function tick(s: EngineState, intervals: EngineInterval[], now: number): EngineState {
  if (s.frozenElapsedMs !== null) return s
  const snap = snapshot(s, intervals, now)
  if (snap.reachedEnd) return finish(s, intervals, now)
  if (snap.index > s.maxReachedIndex) return { ...s, maxReachedIndex: snap.index }
  return s
}

/** Skip-limit guard: true when skipped/total has reached the threshold. */
export function isOverSkipThreshold(skipCount: number, intervalCount: number, thresholdPercent: number): boolean {
  if (intervalCount === 0) return false
  return (skipCount / intervalCount) * 100 >= thresholdPercent
}

export function maxStats(s: EngineState, intervals: EngineInterval[]) {
  const reached = intervals.slice(0, s.maxReachedIndex + 1)
  return {
    maxSpeed: reached.length ? Math.max(...reached.map((i) => i.speed)) : undefined,
    maxIncline: reached.length ? Math.max(...reached.map((i) => i.incline)) : undefined,
  }
}

/**
 * Intervals fully completed. A natural finish counts all of them; an early
 * end counts those before the current one (matches the iOS app).
 */
export function intervalsCompleted(
  s: EngineState,
  intervals: EngineInterval[],
  completed: boolean,
  now: number,
): number {
  if (completed) return intervals.length
  const elapsed = rawElapsedMs(s, now)
  return indexAt(intervals, Math.min(elapsed, totalMs(intervals)))
}
