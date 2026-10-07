import { describe, expect, it } from 'vitest'
import { applyAdjustments, intervalIssues, newDraftInterval, scaleDurations, suggestCopyName } from './programDraft'

describe('scaleDurations', () => {
  it('hits the target total exactly', () => {
    const base = [300, 180, 900, 420]
    for (const target of [600, 1200, 1800, 2701, 3600]) {
      const out = scaleDurations(base, target)
      expect(out.reduce((a, b) => a + b, 0)).toBe(target)
      out.forEach((d) => expect(d).toBeGreaterThanOrEqual(5))
    }
  })

  it('keeps proportions roughly intact', () => {
    const out = scaleDurations([60, 120], 360)
    expect(out).toEqual([120, 240])
  })

  it('never goes below the minimum, even for tiny targets', () => {
    const out = scaleDurations([20, 1800], 30)
    expect(out.every((d) => d >= 5)).toBe(true)
    expect(out.reduce((a, b) => a + b, 0)).toBe(30)
  })
})

describe('applyAdjustments', () => {
  const baseline = [
    newDraftInterval({ speed: 10, incline: 4, durationSeconds: 600 }),
    newDraftInterval({ speed: 6, incline: 0, durationSeconds: 300 }),
  ]

  it('scales speed and incline from the baseline (reversible)', () => {
    const up = applyAdjustments(baseline, { speedPercent: 20, inclinePercent: 50, targetSeconds: null })
    expect(up.map((d) => d.speed)).toEqual([12, 7.2])
    expect(up.map((d) => d.incline)).toEqual([6, 0])
    const back = applyAdjustments(baseline, { speedPercent: 0, inclinePercent: 0, targetSeconds: null })
    expect(back.map((d) => d.speed)).toEqual([10, 6])
  })

  it('preserves keys and other fields', () => {
    const out = applyAdjustments(baseline, { speedPercent: 10, inclinePercent: 0, targetSeconds: 1800 })
    expect(out.map((d) => d.key)).toEqual(baseline.map((d) => d.key))
    expect(out.reduce((a, d) => a + d.durationSeconds, 0)).toBe(1800)
  })
})

describe('intervalIssues', () => {
  it('flags unrealistic values as warnings and impossible ones as errors', () => {
    expect(intervalIssues(newDraftInterval({ speed: 19 })).warnings).toHaveLength(1)
    expect(intervalIssues(newDraftInterval({ incline: 25 })).warnings).toHaveLength(1)
    expect(intervalIssues(newDraftInterval({ speed: 0 })).errors).toHaveLength(1)
    expect(intervalIssues(newDraftInterval({ durationSeconds: 2 })).errors).toHaveLength(1)
    expect(intervalIssues(newDraftInterval())).toEqual({ errors: [], warnings: [] })
  })
})

describe('suggestCopyName', () => {
  it('finds the first free custom name', () => {
    expect(suggestCopyName('Tempo Runner', new Set(['Tempo Runner']))).toBe('Tempo Runner (Custom)')
    expect(suggestCopyName('Tempo Runner', new Set(['tempo runner (custom)']))).toBe('Tempo Runner (Custom 2)')
    expect(suggestCopyName('Tempo Runner (Custom)', new Set(['Tempo Runner (Custom)']))).toBe('Tempo Runner (Custom 2)')
  })
})
