import type { Difficulty } from '../db/types'
import { DIFFICULTY_META } from '../lib/workoutTypes'

/** Filled/empty dots plus a text label — difficulty is never conveyed by colour alone. */
export function DifficultyDots({ difficulty }: { difficulty: Difficulty }) {
  const { label, dots } = DIFFICULTY_META[difficulty]
  return (
    <span className="inline-flex items-center gap-1" role="img" aria-label={`Difficulty: ${label}, ${dots} of 4`}>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`h-2 w-2 rounded-full ${i < dots ? 'bg-teal-brand dark:bg-teal-brand-soft' : 'border border-muted/60 bg-transparent'}`}
        />
      ))}
      <span aria-hidden="true" className="ml-1 text-xs font-medium text-muted">
        {label}
      </span>
    </span>
  )
}
