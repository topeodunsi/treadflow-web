import type { Difficulty, Program, WorkoutInterval, WorkoutType } from '../db/types'
import { newId } from './ids'
import { sortedIntervals } from './format'

export interface DraftInterval {
  /** Stable key for React lists; becomes the interval id on save. */
  key: string
  name: string
  durationSeconds: number
  /** km/h */
  speed: number
  incline: number
  instruction: string
}

export interface ProgramMeta {
  name: string
  description: string
  difficulty: Difficulty
  workoutType: WorkoutType
  trainingObjective: string
}

export const LIMITS = {
  name: 60,
  description: 300,
  objective: 200,
  intervalName: 40,
  instruction: 100,
  minDurationSeconds: 5,
  maxDurationSeconds: 3 * 60 * 60,
  minSpeedKmh: 0.5,
  maxSpeedKmh: 25,
  minIncline: 0,
  maxIncline: 30,
} as const

/** Values above these are allowed but flagged as unusual (the built-in library tops out at 18 km/h / 20%). */
export const WARN = {
  speedKmh: 18,
  incline: 20,
  durationSeconds: 60 * 60,
  slowSpeedKmh: 2,
} as const

export function newDraftInterval(partial: Partial<DraftInterval> = {}): DraftInterval {
  return { key: newId(), name: '', durationSeconds: 300, speed: 5, incline: 0, instruction: '', ...partial }
}

export function draftFromProgram(program: Program): DraftInterval[] {
  return sortedIntervals(program).map((i) => ({
    key: newId(),
    name: i.name ?? '',
    durationSeconds: i.durationSeconds,
    speed: i.speed,
    incline: i.incline,
    instruction: i.instruction ?? '',
  }))
}

export function draftToIntervals(drafts: DraftInterval[]): WorkoutInterval[] {
  return drafts.map((d, order) => ({
    id: d.key,
    order,
    name: d.name.trim() || undefined,
    durationSeconds: Math.round(d.durationSeconds),
    speed: d.speed,
    incline: d.incline,
    instruction: d.instruction.trim() || undefined,
  }))
}

export interface IntervalIssues {
  errors: string[]
  warnings: string[]
}

export function intervalIssues(d: DraftInterval): IntervalIssues {
  const errors: string[] = []
  const warnings: string[] = []
  if (!Number.isFinite(d.durationSeconds) || d.durationSeconds < LIMITS.minDurationSeconds)
    errors.push(`Duration must be at least ${LIMITS.minDurationSeconds} seconds.`)
  else if (d.durationSeconds > LIMITS.maxDurationSeconds) errors.push('Duration can be at most 3 hours.')
  else if (d.durationSeconds > WARN.durationSeconds) warnings.push('A single interval over 60 minutes is unusual.')

  if (!Number.isFinite(d.speed) || d.speed < LIMITS.minSpeedKmh) errors.push('Speed must be above zero.')
  else if (d.speed > LIMITS.maxSpeedKmh) errors.push('Speed is beyond what treadmills support.')
  else if (d.speed > WARN.speedKmh) warnings.push('This speed is unusually high — most treadmills top out around 18–20 km/h.')
  else if (d.speed < WARN.slowSpeedKmh) warnings.push('This speed is slower than a gentle walk.')

  if (!Number.isFinite(d.incline) || d.incline < LIMITS.minIncline) errors.push('Incline cannot be negative.')
  else if (d.incline > LIMITS.maxIncline) errors.push('Incline can be at most 30%.')
  else if (d.incline > WARN.incline) warnings.push('This incline is unusually steep — check your treadmill supports it.')

  return { errors, warnings }
}

// ---------- quick global adjustments (always computed from a baseline, so they're reversible) ----------

export interface Adjustments {
  speedPercent: number
  inclinePercent: number
  /** Target total duration in seconds, or null for "unchanged". */
  targetSeconds: number | null
}

export const NO_ADJUSTMENTS: Adjustments = { speedPercent: 0, inclinePercent: 0, targetSeconds: null }

/** Rounds to a step, stripping float noise (6.1000000000000005 → 6.1). */
const round = (n: number, step: number) => Number((Math.round(n / step) * step).toFixed(2))

/**
 * Scales durations so they sum to exactly `targetSeconds`, keeping each
 * interval's share, rounding to 5 s (never below the minimum) and handing
 * the rounding remainder to the longest intervals.
 */
export function scaleDurations(durations: number[], targetSeconds: number): number[] {
  const baseTotal = durations.reduce((a, b) => a + b, 0)
  if (baseTotal <= 0 || durations.length === 0) return durations
  const min = LIMITS.minDurationSeconds
  const target = Math.max(targetSeconds, durations.length * min)
  const factor = target / baseTotal
  const scaled = durations.map((d) => Math.max(min, round(d * factor, 5)))
  let diff = target - scaled.reduce((a, b) => a + b, 0)
  // Distribute the residual across intervals, largest first, in 5 s steps (1 s for the final remainder).
  const order = scaled.map((_, i) => i).sort((a, b) => scaled[b] - scaled[a])
  let guard = 0
  while (diff !== 0 && guard++ < 10_000) {
    let progressed = false
    for (const i of order) {
      if (diff === 0) break
      const step = Math.abs(diff) >= 5 ? 5 : 1
      if (diff > 0) {
        scaled[i] += step
        diff -= step
        progressed = true
      } else if (scaled[i] - step >= min) {
        scaled[i] -= step
        diff += step
        progressed = true
      }
    }
    if (!progressed) break
  }
  return scaled
}

export function applyAdjustments(baseline: DraftInterval[], adj: Adjustments): DraftInterval[] {
  const speedFactor = 1 + adj.speedPercent / 100
  const inclineFactor = 1 + adj.inclinePercent / 100
  const durations =
    adj.targetSeconds !== null
      ? scaleDurations(
          baseline.map((b) => b.durationSeconds),
          adj.targetSeconds,
        )
      : baseline.map((b) => b.durationSeconds)
  return baseline.map((b, i) => ({
    ...b,
    speed: Math.min(LIMITS.maxSpeedKmh, Math.max(LIMITS.minSpeedKmh, round(b.speed * speedFactor, 0.1))),
    incline: Math.min(LIMITS.maxIncline, Math.max(0, round(b.incline * inclineFactor, 0.5))),
    durationSeconds: durations[i],
  }))
}

/** Suggests "Name (Custom)", "Name (Custom 2)", … that isn't in `taken`. */
export function suggestCopyName(base: string, taken: Set<string>): string {
  const lower = new Set([...taken].map((t) => t.trim().toLowerCase()))
  const stripped = base.replace(/\s*\(Custom(?: \d+)?\)$/, '')
  for (let n = 1; n < 1000; n++) {
    const candidate = n === 1 ? `${stripped} (Custom)` : `${stripped} (Custom ${n})`
    if (!lower.has(candidate.toLowerCase())) return candidate
  }
  return `${stripped} (Custom ${Date.now()})`
}
