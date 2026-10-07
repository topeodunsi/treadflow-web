import type { Units, WorkoutInterval } from '../db/types'
import { clockDuration, convertInstructionText, formatIncline, formatSpeed } from '../lib/format'

export function IntervalTimeline({ intervals, units }: { intervals: WorkoutInterval[]; units: Units }) {
  let elapsed = 0
  return (
    <ol className="relative">
      {intervals.map((iv, index) => {
        const startsAt = elapsed
        elapsed += iv.durationSeconds
        const isLast = index === intervals.length - 1
        return (
          <li key={iv.id} className="relative flex gap-4 pb-3 last:pb-0">
            {/* rail */}
            <div className="relative flex w-8 shrink-0 flex-col items-center">
              <span className="z-10 grid h-8 w-8 place-items-center rounded-full border-2 border-teal-brand bg-card text-xs font-bold text-teal-brand dark:border-teal-brand-soft dark:text-teal-brand-soft">
                {index + 1}
              </span>
              {!isLast && <span aria-hidden="true" className="absolute top-8 -bottom-3 w-0.5 bg-teal-brand/25" />}
            </div>

            <div className="card flex min-w-0 flex-1 flex-wrap items-start justify-between gap-x-4 gap-y-2 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{iv.name || 'Interval'}</p>
                {iv.instruction && (
                  <p className="mt-0.5 text-sm text-muted">{convertInstructionText(iv.instruction, units)}</p>
                )}
                <p className="mt-1 text-xs text-muted">Starts at {clockDuration(startsAt)}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-base font-bold tabular-nums">{clockDuration(iv.durationSeconds)}</p>
                <p className="text-sm text-muted tabular-nums">
                  {formatSpeed(iv.speed, units)} · {formatIncline(iv.incline)}
                </p>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
