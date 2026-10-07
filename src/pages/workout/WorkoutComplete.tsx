import { CircleCheck, Clock, Gauge, ListOrdered, Mountain } from 'lucide-react'
import type { Units, WorkoutSession } from '../../db/types'
import { clockDuration, formatIncline, formatSpeed } from '../../lib/format'
import { StatTile } from '../../components/StatTile'

export function WorkoutComplete({
  session,
  units,
  onContinue,
}: {
  session: WorkoutSession | null
  units: Units
  onContinue: () => void
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-canvas px-4 py-10">
      <div className="w-full max-w-lg text-center">
        <CircleCheck size={72} aria-hidden="true" className="mx-auto text-teal-brand dark:text-teal-brand-soft" />
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">Workout Complete</h1>
        {session ? (
          <>
            <p className="mt-1 text-lg text-muted">{session.programNameSnapshot}</p>
            <p className="mt-6 font-display text-6xl font-bold tabular-nums">{clockDuration(session.durationSeconds)}</p>
            <div className="mt-8 grid grid-cols-2 gap-3 text-left">
              <StatTile icon={Clock} label="Duration" value={clockDuration(session.durationSeconds)} />
              <StatTile icon={ListOrdered} label="Intervals" value={`${session.intervalsCompleted}/${session.totalIntervals}`} />
              {session.maxSpeed !== undefined && (
                <StatTile icon={Gauge} label="Max speed" value={formatSpeed(session.maxSpeed, units)} />
              )}
              {session.maxIncline !== undefined && (
                <StatTile icon={Mountain} label="Max incline" value={formatIncline(session.maxIncline)} />
              )}
            </div>
            <p className="mt-4 text-xs text-muted">Saved to your History on this device.</p>
          </>
        ) : (
          <p className="mt-4 text-muted" role="status">
            Saving…
          </p>
        )}
        <button type="button" onClick={onContinue} disabled={!session} className="btn-primary mt-8 w-full text-base" autoFocus>
          Continue
        </button>
      </div>
    </div>
  )
}
