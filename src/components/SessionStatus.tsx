import { CircleCheck, CircleMinus, SkipForward, Star } from 'lucide-react'
import type { WorkoutSession } from '../db/types'

/** Completion status as icon + text (never colour alone). */
export function SessionStatus({ session }: { session: WorkoutSession }) {
  if (session.completed)
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-brand dark:text-teal-brand-soft">
        <CircleCheck size={14} aria-hidden="true" /> Completed
      </span>
    )
  if (session.isFlaggedIncomplete)
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-coral-strong dark:text-coral-soft">
        <SkipForward size={14} aria-hidden="true" /> Ended — skip limit
      </span>
    )
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-coral-strong dark:text-coral-soft">
      <CircleMinus size={14} aria-hidden="true" /> Ended early
    </span>
  )
}

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-coral" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={size} aria-hidden="true" fill={n <= rating ? 'currentColor' : 'none'} className={n <= rating ? '' : 'opacity-40'} />
      ))}
    </span>
  )
}
