import { Link, useParams } from 'react-router-dom'
import { Clock, Gauge, Info, ListOrdered, Mountain, RotateCcw, SearchX } from 'lucide-react'
import { useLiveQuery } from '../../hooks/useLiveQuery'
import { useAppSettings } from '../../hooks/SettingsContext'
import { getFeedbackForSession, getProgram, getSession } from '../../db/database'
import { clockDuration, formatIncline, formatSpeed } from '../../lib/format'
import { BackLink } from '../../components/BackLink'
import { EmptyState, Spinner } from '../../components/EmptyState'
import { StatTile } from '../../components/StatTile'
import { SessionStatus, Stars } from '../../components/SessionStatus'
import { FEELING_META } from '../workout/FeedbackForm'

const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'full', timeStyle: 'short' })

export function HistoryDetailPage() {
  const { id } = useParams()
  const { settings } = useAppSettings()
  const data = useLiveQuery(
    async () => {
      const session = id ? await getSession(id) : undefined
      if (!session) return null
      const [feedback, program] = await Promise.all([
        getFeedbackForSession(session.id),
        session.programId ? getProgram(session.programId) : Promise.resolve(undefined),
      ])
      return { session, feedback, program }
    },
    ['sessions', 'feedback', 'programs'],
    [id],
  )

  if (data === undefined) return <Spinner />
  if (data === null)
    return (
      <EmptyState
        icon={SearchX}
        title="Session not found"
        message="It may have been deleted."
        action={
          <Link to="/history" className="btn-primary">
            Back to History
          </Link>
        }
      />
    )

  const { session, feedback, program } = data

  return (
    <div className="max-w-3xl">
      <BackLink fallback="/history" />
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{session.programNameSnapshot}</h1>
        <p className="mt-1 text-muted">{dateFormat.format(session.date)}</p>
        <div className="mt-2">
          <SessionStatus session={session} />
        </div>
      </header>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile icon={Clock} label="Duration" value={clockDuration(session.durationSeconds)} />
        <StatTile icon={ListOrdered} label="Intervals" value={`${session.intervalsCompleted}/${session.totalIntervals}`} />
        {session.maxSpeed !== undefined && <StatTile icon={Gauge} label="Max speed" value={formatSpeed(session.maxSpeed, settings.units)} />}
        {session.maxIncline !== undefined && <StatTile icon={Mountain} label="Max incline" value={formatIncline(session.maxIncline)} />}
      </div>

      <section aria-labelledby="fb-heading" className="card mt-6 p-5">
        <h2 id="fb-heading" className="section-title">
          Your feedback
        </h2>
        {feedback ? (
          <div className="mt-3 space-y-2">
            <p className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">
                {FEELING_META[feedback.feeling].emoji}
              </span>
              <span className="font-semibold">{FEELING_META[feedback.feeling].label}</span>
              <Stars rating={feedback.rating} size={18} />
            </p>
            <p className="text-sm text-muted">
              Would repeat: <strong className="text-ink">{feedback.wouldRepeat[0].toUpperCase() + feedback.wouldRepeat.slice(1)}</strong>
            </p>
            {feedback.comments && (
              <blockquote className="border-l-4 border-teal-brand/40 pl-3 text-base italic">“{feedback.comments}”</blockquote>
            )}
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted">
            {session.completed ? 'No feedback was given for this workout.' : 'Feedback is only collected for completed workouts.'}
          </p>
        )}
      </section>

      <div className="mt-6">
        {program ? (
          <Link to={`/workout/${program.id}`} className="btn-primary w-full text-base sm:w-auto">
            <RotateCcw size={18} aria-hidden="true" /> Start again
          </Link>
        ) : (
          <div role="note" className="flex items-start gap-3 rounded-xl border border-line bg-card-raised p-4 text-sm text-muted">
            <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
            <p>
              “{session.programNameSnapshot}” has since been deleted, so it can’t be started again.{' '}
              <Link to="/" className="font-semibold text-teal-brand underline dark:text-teal-brand-soft">
                Browse programs
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
