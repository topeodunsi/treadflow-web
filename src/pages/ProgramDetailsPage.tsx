import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Clock, Heart, ListOrdered, Pencil, Play, SearchX, Target, Trash2, TriangleAlert } from 'lucide-react'
import { useProgram } from '../hooks/useLiveQuery'
import { useAppSettings } from '../hooks/SettingsContext'
import { deleteCustomProgram, setFavourite } from '../db/database'
import { DifficultyDots } from '../components/DifficultyDots'
import { WorkoutTypeBadge } from '../components/WorkoutTypeBadge'
import { IntervalTimeline } from '../components/IntervalTimeline'
import { EmptyState, Spinner } from '../components/EmptyState'
import { Dialog } from '../components/Dialog'
import { BackLink } from '../components/BackLink'
import { programMinutesLabel, sortedIntervals, totalDuration } from '../lib/format'

export function ProgramDetailsPage() {
  const { id } = useParams()
  const program = useProgram(id)
  const { settings } = useAppSettings()
  const navigate = useNavigate()
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (program === undefined) return <Spinner />
  if (program === null)
    return (
      <EmptyState
        icon={SearchX}
        title="Program not found"
        message="It may have been deleted."
        action={
          <Link to="/" className="btn-primary">
            Browse programs
          </Link>
        }
      />
    )

  const intervals = sortedIntervals(program)
  const isHighIntensity = program.difficulty === 'hard' || program.difficulty === 'intense'

  const doDelete = async () => {
    setConfirmDelete(false)
    await deleteCustomProgram(program.id)
    navigate('/', { replace: true })
  }

  return (
    <div className="pb-28 md:pb-24">
      <BackLink />

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <WorkoutTypeBadge type={program.workoutType} size="md" />
          {!program.isBuiltIn && (
            <span className="rounded-full border border-line px-2.5 py-0.5 text-xs font-semibold text-muted">Custom</span>
          )}
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{program.name}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <DifficultyDots difficulty={program.difficulty} />
          <span className="flex items-center gap-1.5">
            <Clock size={15} aria-hidden="true" /> {programMinutesLabel(totalDuration(intervals))}
          </span>
          <span className="flex items-center gap-1.5">
            <ListOrdered size={15} aria-hidden="true" /> {intervals.length} intervals
          </span>
        </div>
      </header>

      {isHighIntensity && (
        <div
          role="note"
          className="mt-5 flex gap-3 rounded-xl border border-coral/30 bg-coral/10 p-4 text-sm text-coral-strong dark:text-coral-soft"
        >
          <TriangleAlert size={20} aria-hidden="true" className="mt-0.5 shrink-0" />
          <p>
            <strong className="font-semibold">High-intensity program.</strong> Make sure you're comfortable with the
            demands before starting, and keep the treadmill's safety clip attached.
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          {program.description && <p className="text-base leading-relaxed">{program.description}</p>}
          {program.warning && <p className="text-sm text-red-700 italic dark:text-red-400">{program.warning}</p>}

          <section aria-labelledby="timeline-heading">
            <h2 id="timeline-heading" className="section-title mb-3">
              Workout Timeline
            </h2>
            <IntervalTimeline intervals={intervals} units={settings.units} />
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          {program.trainingObjective && (
            <div className="card p-5">
              <h2 className="flex items-center gap-2 text-sm font-bold">
                <Target size={16} aria-hidden="true" className="text-teal-brand dark:text-teal-brand-soft" />
                Training Objective
              </h2>
              <p className="mt-1.5 text-sm text-muted">{program.trainingObjective}</p>
            </div>
          )}
          {!program.isBuiltIn && (
            <button type="button" onClick={() => (settings.confirmBeforeDelete ? setConfirmDelete(true) : doDelete())} className="btn-danger w-full">
              <Trash2 size={16} aria-hidden="true" /> Delete program
            </button>
          )}
          <p className="text-xs leading-relaxed text-muted">
            Fitness information in this app is for general informational purposes and is not medical advice. Choose an
            intensity appropriate to your fitness level, and consult a healthcare professional if you have concerns
            about exercising.
          </p>
        </aside>
      </div>

      {/* Sticky action bar */}
      <div className="fixed inset-x-0 bottom-[calc(57px+env(safe-area-inset-bottom))] z-10 border-t border-line bg-card/95 backdrop-blur md:bottom-0 md:left-60">
        <div className="mx-auto flex max-w-6xl gap-2 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => void setFavourite(program.id, !program.isFavourite)}
            aria-pressed={program.isFavourite}
            aria-label={program.isFavourite ? 'Remove from favourites' : 'Add to favourites'}
            className={`btn-secondary px-3 ${program.isFavourite ? 'text-coral' : ''}`}
          >
            <Heart size={18} fill={program.isFavourite ? 'currentColor' : 'none'} aria-hidden="true" />
            <span className="hidden sm:inline">{program.isFavourite ? 'Favourited' : 'Favourite'}</span>
          </button>
          <Link to={`/create/customize/${program.id}`} className="btn-secondary">
            <Pencil size={16} aria-hidden="true" /> <span className="sr-only min-[360px]:not-sr-only">Customize</span>
          </Link>
          <Link to={`/workout/${program.id}`} className="btn-primary flex-1 text-base whitespace-nowrap">
            <Play size={18} fill="currentColor" aria-hidden="true" /> Start<span className="hidden min-[400px]:inline"> Workout</span>
          </Link>
        </div>
      </div>

      <Dialog
        open={confirmDelete}
        title="Delete this program?"
        onCancel={() => setConfirmDelete(false)}
        actions={[
          { label: 'Cancel', onClick: () => setConfirmDelete(false), autoFocus: true },
          { label: 'Delete', onClick: doDelete, variant: 'danger' },
        ]}
      >
        “{program.name}” will be permanently removed. Your workout history is kept. This cannot be undone.
      </Dialog>
    </div>
  )
}
