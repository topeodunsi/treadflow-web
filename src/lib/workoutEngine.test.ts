import { describe, expect, it } from 'vitest'
import {
  createEngine,
  finish,
  intervalsCompleted,
  isOverSkipThreshold,
  maxStats,
  pause,
  resume,
  skip,
  snapshot,
  tick,
  type EngineInterval,
} from './workoutEngine'

const intervals: EngineInterval[] = [
  { durationSeconds: 60, speed: 5, incline: 0 },
  { durationSeconds: 120, speed: 10, incline: 2 },
  { durationSeconds: 30, speed: 14, incline: 6 },
  { durationSeconds: 90, speed: 4, incline: 0 },
]
const T0 = 1_700_000_000_000

describe('workout engine timing', () => {
  it('derives elapsed time from timestamps, not tick counts', () => {
    const s = createEngine(T0)
    // No ticks at all between start and now — elapsed is still exact.
    const snap = snapshot(s, intervals, T0 + 75_500)
    expect(snap.elapsedMs).toBe(75_500)
    expect(snap.index).toBe(1)
    expect(snap.remainingInIntervalMs).toBe(180_000 - 75_500)
  })

  it('does not drift with irregular / throttled ticks', () => {
    let s = createEngine(T0)
    let now = T0
    // Simulate 10 minutes of jittery ticks: 100–2000ms apart, like a busy or backgrounded tab.
    const gaps = [100, 517, 2000, 333, 1499, 250, 870]
    let i = 0
    while (now < T0 + 200_000) {
      now += gaps[i++ % gaps.length]
      s = tick(s, intervals, now)
    }
    expect(snapshot(s, intervals, now).elapsedMs).toBe(now - T0)
  })

  it('excludes paused time', () => {
    let s = createEngine(T0)
    s = pause(s, T0 + 10_000)
    // While paused the clock stands still.
    expect(snapshot(s, intervals, T0 + 50_000).elapsedMs).toBe(10_000)
    expect(snapshot(s, intervals, T0 + 50_000).isPaused).toBe(true)
    s = resume(s, T0 + 50_000)
    expect(snapshot(s, intervals, T0 + 55_000).elapsedMs).toBe(15_000)
    // A second pause accumulates.
    s = pause(s, T0 + 60_000)
    s = resume(s, T0 + 70_000)
    expect(snapshot(s, intervals, T0 + 80_000).elapsedMs).toBe(30_000)
  })

  it('ignores double pause / double resume', () => {
    let s = createEngine(T0)
    s = pause(s, T0 + 1000)
    s = pause(s, T0 + 5000)
    s = resume(s, T0 + 9000)
    s = resume(s, T0 + 12_000)
    expect(snapshot(s, intervals, T0 + 10_000).elapsedMs).toBe(2000)
  })

  it('skip jumps exactly to the next interval start', () => {
    let s = createEngine(T0)
    s = skip(s, intervals, T0 + 20_000)
    const snap = snapshot(s, intervals, T0 + 20_000)
    expect(snap.elapsedMs).toBe(60_000)
    expect(snap.index).toBe(1)
    expect(s.skipCount).toBe(1)
    // and keeps counting from there
    expect(snapshot(s, intervals, T0 + 25_000).elapsedMs).toBe(65_000)
  })

  it('skip while paused stays paused at the new interval start', () => {
    let s = createEngine(T0)
    s = pause(s, T0 + 5000)
    s = skip(s, intervals, T0 + 8000)
    expect(snapshot(s, intervals, T0 + 30_000).elapsedMs).toBe(60_000)
    s = resume(s, T0 + 30_000)
    expect(snapshot(s, intervals, T0 + 31_000).elapsedMs).toBe(61_000)
  })

  it('finishes when the clock passes the last interval, and freezes', () => {
    let s = createEngine(T0)
    s = tick(s, intervals, T0 + 299_999)
    expect(s.frozenElapsedMs).toBeNull()
    s = tick(s, intervals, T0 + 300_000)
    expect(s.frozenElapsedMs).toBe(300_000)
    const later = snapshot(s, intervals, T0 + 999_000)
    expect(later.isFinished).toBe(true)
    expect(later.elapsedMs).toBe(300_000)
    expect(later.progress).toBe(1)
  })

  it('skipping the final interval completes the workout on next tick', () => {
    let s = createEngine(T0)
    s = skip(s, intervals, T0 + 1)
    s = skip(s, intervals, T0 + 2)
    s = skip(s, intervals, T0 + 3)
    s = skip(s, intervals, T0 + 4)
    s = tick(s, intervals, T0 + 4)
    expect(snapshot(s, intervals, T0 + 4).isFinished).toBe(true)
  })

  it('manual finish freezes mid-workout and counts completed intervals', () => {
    let s = createEngine(T0)
    s = finish(s, intervals, T0 + 200_000)
    expect(snapshot(s, intervals, T0 + 500_000).elapsedMs).toBe(200_000)
    expect(intervalsCompleted(s, intervals, false, T0 + 500_000)).toBe(2)
    expect(intervalsCompleted(s, intervals, true, T0 + 500_000)).toBe(4)
  })

  it('tracks max speed / incline only over intervals actually reached', () => {
    let s = createEngine(T0)
    s = tick(s, intervals, T0 + 70_000)
    expect(maxStats(s, intervals)).toEqual({ maxSpeed: 10, maxIncline: 2 })
    s = tick(s, intervals, T0 + 185_000)
    expect(maxStats(s, intervals)).toEqual({ maxSpeed: 14, maxIncline: 6 })
  })
})

describe('skip threshold', () => {
  it('triggers at or above the percentage', () => {
    expect(isOverSkipThreshold(1, 4, 50)).toBe(false)
    expect(isOverSkipThreshold(2, 4, 50)).toBe(true)
    expect(isOverSkipThreshold(3, 4, 50)).toBe(true)
    expect(isOverSkipThreshold(0, 0, 50)).toBe(false)
  })
})
