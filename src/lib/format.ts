import type { Program, Units, WorkoutInterval } from '../db/types'

const KMH_TO_MPH = 0.621371

/** Converts km/h to mph, snapped to the nearest 0.5 mph for a clean display. */
export function snappedMph(kmh: number): number {
  return Math.round(kmh * KMH_TO_MPH * 2) / 2
}

export function mphToKmh(mph: number): number {
  return mph / KMH_TO_MPH
}

/** Numeric speed in the user's units (no suffix). */
export function speedValue(kmh: number, units: Units): number {
  return units === 'kmh' ? kmh : snappedMph(kmh)
}

export function unitSuffix(units: Units): string {
  return units === 'kmh' ? 'km/h' : 'mph'
}

export function formatSpeed(kmh: number, units: Units): string {
  return `${speedValue(kmh, units).toFixed(1)} ${unitSuffix(units)}`
}

/** Incline number without the % sign: "4" or "2.5". */
export function inclineValue(incline: number): string {
  const r = Math.round(incline * 2) / 2
  return Number.isInteger(r) ? String(r) : r.toFixed(1)
}

export function formatIncline(incline: number): string {
  return `${inclineValue(incline)}%`
}

/**
 * Seed instructions are authored with km/h baked in ("Speed to 9.5 km/h").
 * In mph mode, swap those for the snapped mph equivalent so instruction text
 * always matches the numbers shown elsewhere.
 */
export function convertInstructionText(text: string, units: Units): string {
  if (units !== 'mph') return text
  return text.replace(/(\d+(?:\.\d+)?)\s*km\/h/g, (_, num: string) => `${snappedMph(parseFloat(num)).toFixed(1)} mph`)
}

/** "45 min" or "5h 48m" — for stat tiles and history rows. */
export function humanDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rem = minutes % 60
  return rem === 0 ? `${hours}h` : `${hours}h ${rem}m`
}

/** "4:54" or "1:23:45" — for countdown-style displays. */
export function clockDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m)
  return `${h > 0 ? `${h}:` : ''}${mm}:${String(sec).padStart(2, '0')}`
}

/** Card-friendly program length: "7 min", or "6.5 min" style for odd second counts. */
export function programMinutesLabel(totalSeconds: number): string {
  const minutes = totalSeconds / 60
  if (Number.isInteger(minutes)) return `${minutes} min`
  return minutes < 10 ? `${minutes.toFixed(1)} min` : `${Math.round(minutes)} min`
}

// ---------- program-level derived stats ----------

export function sortedIntervals(program: Pick<Program, 'intervals'>): WorkoutInterval[] {
  return [...program.intervals].sort((a, b) => a.order - b.order)
}

export function totalDuration(intervals: Pick<WorkoutInterval, 'durationSeconds'>[]): number {
  return intervals.reduce((sum, i) => sum + i.durationSeconds, 0)
}

export function rangeLabel(values: number[], fmt: (n: number) => string, suffix = ''): string | null {
  if (values.length === 0) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const a = fmt(min)
  const b = fmt(max)
  return a === b ? `${a}${suffix}` : `${a}–${b}${suffix}`
}

export function speedRangeLabel(program: Program, units: Units) {
  return rangeLabel(
    program.intervals.map((i) => i.speed),
    (n) => speedValue(n, units).toFixed(1),
    ` ${unitSuffix(units)}`,
  )
}

export function inclineRangeLabel(program: Program) {
  return rangeLabel(
    program.intervals.map((i) => i.incline),
    inclineValue,
    '%',
  )
}
