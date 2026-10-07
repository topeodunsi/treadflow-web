import type { WorkoutType } from '../db/types'
import { useAppSettings } from '../hooks/SettingsContext'
import { NEUTRAL_BADGE, NEUTRAL_SWATCH, WORKOUT_TYPE_META } from '../lib/workoutTypes'

/**
 * The single source of truth for workout-type colour. Every badge and swatch
 * in the app goes through here, so the "Vibrant colours" setting flips them
 * all to grey at once.
 */
export function useWorkoutTypeStyle(type: WorkoutType) {
  const { settings } = useAppSettings()
  const meta = WORKOUT_TYPE_META[type]
  const vibrant = settings.vibrantColorsEnabled
  return {
    ...meta,
    badgeClass: vibrant ? meta.vibrant : NEUTRAL_BADGE,
    swatchClass: vibrant ? meta.swatch : NEUTRAL_SWATCH,
  }
}

export function WorkoutTypeBadge({ type, size = 'sm' }: { type: WorkoutType; size?: 'sm' | 'md' }) {
  const { label, icon: Icon, badgeClass } = useWorkoutTypeStyle(type)
  const sizing = size === 'md' ? 'px-3 py-1 text-sm gap-1.5' : 'px-2.5 py-0.5 text-xs gap-1'
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${sizing} ${badgeClass}`}>
      <Icon size={size === 'md' ? 15 : 13} strokeWidth={2.5} aria-hidden="true" />
      {label}
    </span>
  )
}

export function WorkoutTypeSwatch({ type, className = '' }: { type: WorkoutType; className?: string }) {
  const { swatchClass } = useWorkoutTypeStyle(type)
  return <span aria-hidden="true" className={`${swatchClass} ${className}`} />
}
