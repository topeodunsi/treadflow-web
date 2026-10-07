import {
  ArrowUpRight,
  Gauge,
  Heart,
  Infinity as InfinityIcon,
  Leaf,
  RefreshCw,
  Shuffle,
  Triangle,
  Zap,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react'
import type { Difficulty, WorkoutType } from '../db/types'

/** Lucide has no metronome, so draw one in the same stroke style. */
function MetronomeIcon({ size = 24, strokeWidth = 2, ...rest }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M9.5 3h5l4.5 18H5L9.5 3Z" />
      <path d="M12 17 17 6" />
      <path d="M8 17h8" />
    </svg>
  )
}

export interface WorkoutTypeMeta {
  label: string
  icon: LucideIcon | typeof MetronomeIcon
  /** Classes for the vibrant (coloured) badge. Full literal strings so Tailwind picks them up. */
  vibrant: string
  /** Solid swatch used for small accents like the timeline rail. */
  swatch: string
}

export const WORKOUT_TYPE_META: Record<WorkoutType, WorkoutTypeMeta> = {
  cardio: {
    label: 'Cardio',
    icon: Heart,
    vibrant: 'bg-blue-500/15 text-blue-700 dark:text-blue-300',
    swatch: 'bg-blue-500',
  },
  endurance: {
    label: 'Endurance',
    icon: InfinityIcon,
    vibrant: 'bg-cyan-500/15 text-cyan-800 dark:text-cyan-300',
    swatch: 'bg-cyan-500',
  },
  incline: {
    label: 'Incline',
    icon: ArrowUpRight,
    vibrant: 'bg-orange-500/15 text-orange-800 dark:text-orange-300',
    swatch: 'bg-orange-500',
  },
  hiit: {
    label: 'HIIT',
    icon: Zap,
    vibrant: 'bg-pink-500/15 text-pink-700 dark:text-pink-300',
    swatch: 'bg-pink-500',
  },
  speed: {
    label: 'Speed',
    icon: Gauge,
    vibrant: 'bg-purple-500/15 text-purple-700 dark:text-purple-300',
    swatch: 'bg-purple-500',
  },
  recovery: {
    label: 'Recovery',
    icon: Leaf,
    vibrant: 'bg-green-500/15 text-green-800 dark:text-green-300',
    swatch: 'bg-green-500',
  },
  tempo: {
    label: 'Tempo',
    icon: MetronomeIcon,
    vibrant: 'bg-teal-brand/15 text-teal-brand dark:text-teal-300',
    swatch: 'bg-teal-brand',
  },
  fartlek: {
    label: 'Fartlek',
    icon: Shuffle,
    vibrant: 'bg-yellow-400/25 text-yellow-800 dark:text-yellow-300',
    swatch: 'bg-yellow-400',
  },
  pyramid: {
    label: 'Pyramid',
    icon: Triangle,
    vibrant: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300',
    swatch: 'bg-indigo-500',
  },
  mixed: {
    label: 'Mixed',
    icon: RefreshCw,
    vibrant: 'bg-teal-500/15 text-teal-800 dark:text-teal-300',
    swatch: 'bg-teal-500',
  },
}

export const NEUTRAL_BADGE = 'bg-gray-500/15 text-gray-700 dark:text-gray-300'
export const NEUTRAL_SWATCH = 'bg-gray-400'

export const DIFFICULTY_META: Record<Difficulty, { label: string; dots: number }> = {
  easy: { label: 'Easy', dots: 1 },
  moderate: { label: 'Moderate', dots: 2 },
  hard: { label: 'Hard', dots: 3 },
  intense: { label: 'Intense', dots: 4 },
}
