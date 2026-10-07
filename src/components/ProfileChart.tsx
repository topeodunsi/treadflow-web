import type { Units } from '../db/types'
import { formatIncline, formatSpeed, humanDuration, totalDuration } from '../lib/format'

interface Bar {
  durationSeconds: number
  speed: number
  incline: number
}

/**
 * Compact workout profile: bar width = duration, height = speed,
 * and a line for incline. Decorative summary — the timeline/editor holds the data.
 */
export function ProfileChart({ intervals, units }: { intervals: Bar[]; units: Units }) {
  const total = totalDuration(intervals)
  if (total === 0) return null
  const maxSpeed = Math.max(...intervals.map((i) => i.speed), 1)
  const maxIncline = Math.max(...intervals.map((i) => i.incline), 1)
  const W = 300
  const H = 80
  let x = 0
  const bars = intervals.map((iv) => {
    const w = (iv.durationSeconds / total) * W
    const bar = { x, w, h: (iv.speed / maxSpeed) * (H - 6), iy: H - (iv.incline / maxIncline) * (H - 6) }
    x += w
    return bar
  })
  const inclinePath = bars.map((b, i) => `${i === 0 ? 'M' : 'L'}${b.x},${b.iy} L${b.x + b.w},${b.iy}`).join(' ')

  return (
    <figure>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="h-20 w-full"
        role="img"
        aria-label={`Workout profile: ${intervals.length} intervals over ${humanDuration(total)}, top speed ${formatSpeed(maxSpeed, units)}, top incline ${formatIncline(maxIncline)}`}
      >
        {bars.map((b, i) => (
          <rect key={i} x={b.x + 0.5} y={H - b.h} width={Math.max(0.5, b.w - 1)} height={b.h} rx={1.5} className="fill-teal-brand/70 dark:fill-teal-brand-soft/60" />
        ))}
        {maxIncline > 1 || intervals.some((i) => i.incline > 0) ? (
          <path d={inclinePath} fill="none" strokeWidth={2} vectorEffect="non-scaling-stroke" className="stroke-coral" />
        ) : null}
      </svg>
      <figcaption className="mt-1.5 flex gap-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-teal-brand/70" aria-hidden="true" /> Speed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-3 bg-coral" aria-hidden="true" /> Incline
        </span>
      </figcaption>
    </figure>
  )
}
