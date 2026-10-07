import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Activity, ChevronRight, Clock, History as HistoryIcon, Star, Trophy } from 'lucide-react'
import { useFeedback, useSessions } from '../../hooks/useLiveQuery'
import { calculateHistoryStats } from '../../lib/historyStats'
import { clockDuration, humanDuration } from '../../lib/format'
import { EmptyState, PageHeader, Spinner } from '../../components/EmptyState'
import { StatTile } from '../../components/StatTile'
import { SessionStatus, Stars } from '../../components/SessionStatus'
import { FEELING_META } from '../workout/FeedbackForm'
import type { WorkoutSession } from '../../db/types'

const monthFormat = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' })
const weekdayFormat = new Intl.DateTimeFormat(undefined, { weekday: 'short' })
const timeFormat = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })

export function HistoryPage() {
  const sessions = useSessions()
  const feedback = useFeedback()

  const feedbackBySession = useMemo(() => new Map((feedback ?? []).map((f) => [f.sessionId, f])), [feedback])
  const stats = useMemo(() => calculateHistoryStats(sessions ?? [], feedback ?? []), [sessions, feedback])

  const months = useMemo(() => {
    const groups: { label: string; items: WorkoutSession[] }[] = []
    for (const s of sessions ?? []) {
      const label = monthFormat.format(s.date)
      const last = groups[groups.length - 1]
      if (last?.label === label) last.items.push(s)
      else groups.push({ label, items: [s] })
    }
    return groups
  }, [sessions])

  if (!sessions || !feedback) return <Spinner />

  if (sessions.length === 0)
    return (
      <>
        <PageHeader title="History" />
        <EmptyState
          icon={HistoryIcon}
          title="No workouts yet"
          message="Finished and ended workouts show up here. Your history never leaves this browser."
          action={
            <Link to="/" className="btn-primary">
              Find a workout
            </Link>
          }
        />
      </>
    )

  return (
    <>
      <PageHeader title="History" subtitle="Stored only in this browser." />

      <section aria-label="Summary" className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={Activity} label={`Workouts · ${stats.completedWorkouts} completed`} value={String(stats.totalWorkouts)} />
        <StatTile icon={Clock} label="Total time" value={humanDuration(stats.totalSeconds)} />
        <StatTile icon={Trophy} label="Most used" value={stats.mostUsedProgram?.name ?? '—'} />
        <StatTile icon={Star} label="Average rating" value={stats.averageRating !== null ? `${stats.averageRating.toFixed(1)} ★` : '—'} />
      </section>

      <div className="space-y-6">
        {months.map((m) => (
          <section key={m.label} aria-labelledby={`m-${m.label}`}>
            <h2 id={`m-${m.label}`} className="mb-2 text-sm font-bold tracking-wide text-muted uppercase">
              {m.label}
            </h2>
            <ul className="card divide-y divide-line overflow-hidden">
              {m.items.map((s) => {
                const fb = feedbackBySession.get(s.id)
                return (
                  <li key={s.id}>
                    <Link to={`/history/${s.id}`} className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-card-raised">
                      <div className="w-14 shrink-0 text-center">
                        <p className="text-xs text-muted">{weekdayFormat.format(s.date)}</p>
                        <p className="font-display text-xl font-bold">{new Date(s.date).getDate()}</p>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{s.programNameSnapshot}</p>
                        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                          <span>{timeFormat.format(s.date)}</span>
                          <span className="tabular-nums">{clockDuration(s.durationSeconds)}</span>
                          <span>
                            {s.intervalsCompleted}/{s.totalIntervals} intervals
                          </span>
                          <SessionStatus session={s} />
                        </div>
                      </div>
                      {fb && (
                        <div className="hidden shrink-0 items-center gap-2 sm:flex">
                          <span aria-hidden="true" className="text-lg">
                            {FEELING_META[fb.feeling].emoji}
                          </span>
                          <Stars rating={fb.rating} />
                        </div>
                      )}
                      <ChevronRight size={18} aria-hidden="true" className="shrink-0 text-muted" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
