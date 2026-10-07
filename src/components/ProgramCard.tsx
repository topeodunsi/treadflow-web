import { Link, useNavigate } from 'react-router-dom'
import { Clock, Heart, Play } from 'lucide-react'
import type { Program } from '../db/types'
import { setFavourite } from '../db/database'
import { useAppSettings } from '../hooks/SettingsContext'
import { inclineRangeLabel, programMinutesLabel, speedRangeLabel, totalDuration } from '../lib/format'
import { DifficultyDots } from './DifficultyDots'
import { WorkoutTypeBadge, WorkoutTypeSwatch } from './WorkoutTypeBadge'

export function FavouriteButton({ program, className = '' }: { program: Program; className?: string }) {
  const label = program.isFavourite ? `Remove ${program.name} from favourites` : `Add ${program.name} to favourites`
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={program.isFavourite}
      title={program.isFavourite ? 'Remove from favourites' : 'Add to favourites'}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        void setFavourite(program.id, !program.isFavourite)
      }}
      className={`grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-card-raised ${
        program.isFavourite ? 'text-coral' : 'text-muted'
      } ${className}`}
    >
      <Heart size={20} fill={program.isFavourite ? 'currentColor' : 'none'} aria-hidden="true" />
    </button>
  )
}

export function ProgramCard({ program }: { program: Program }) {
  const { settings } = useAppSettings()
  const navigate = useNavigate()
  const speed = speedRangeLabel(program, settings.units)
  const incline = inclineRangeLabel(program)

  return (
    <article className="card group relative flex gap-4 overflow-hidden p-4 transition-shadow hover:shadow-lg hover:shadow-black/5 focus-within:shadow-lg sm:p-5">
      <WorkoutTypeSwatch type={program.workoutType} className="absolute inset-y-0 left-0 w-1" />

      <button
        type="button"
        onClick={() => navigate(`/workout/${program.id}`)}
        aria-label={`Start ${program.name}`}
        title="Start workout"
        className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal-brand text-white shadow-sm transition-transform hover:scale-105 hover:bg-teal-brand-strong"
      >
        <Play size={20} fill="currentColor" aria-hidden="true" className="ml-0.5" />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="pt-0.5 text-base leading-snug font-bold">
            {/* Stretched link makes the whole card clickable without nesting buttons in a link */}
            <Link to={`/programs/${program.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
              {program.name}
            </Link>
          </h3>
          <FavouriteButton program={program} className="relative z-10 -mt-1.5 -mr-2 shrink-0" />
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <DifficultyDots difficulty={program.difficulty} />
          <WorkoutTypeBadge type={program.workoutType} />
        </div>

        <p className="mt-2.5 flex items-center gap-1.5 text-sm font-medium text-ink">
          <Clock size={14} aria-hidden="true" className="text-muted" />
          {programMinutesLabel(totalDuration(program.intervals))}
          <span className="text-muted">· {program.intervals.length} intervals</span>
        </p>
        {speed && incline && (
          <p className="mt-1 text-xs text-muted">
            Speed {speed} · Incline {incline}
          </p>
        )}
      </div>
    </article>
  )
}

export function ProgramGrid({ programs }: { programs: Program[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
      {programs.map((p) => (
        <ProgramCard key={p.id} program={p} />
      ))}
    </div>
  )
}
