export const DIFFICULTIES = ['easy', 'moderate', 'hard', 'intense'] as const
export type Difficulty = (typeof DIFFICULTIES)[number]

export const WORKOUT_TYPES = [
  'cardio',
  'endurance',
  'incline',
  'hiit',
  'speed',
  'recovery',
  'fartlek',
  'tempo',
  'pyramid',
  'mixed',
] as const
export type WorkoutType = (typeof WORKOUT_TYPES)[number]

export const FEELINGS = ['great', 'good', 'okay', 'tough', 'veryTough', 'tooDifficult'] as const
export type Feeling = (typeof FEELINGS)[number]

export type WouldRepeat = 'yes' | 'maybe' | 'no'
export type Units = 'kmh' | 'mph'
export type Appearance = 'light' | 'dark' | 'system'

export const BACKGROUND_STYLES = ['none', 'dots', 'waves', 'sparkle', 'clouds', 'spiral'] as const
export type BackgroundStyle = (typeof BACKGROUND_STYLES)[number]

export interface WorkoutInterval {
  id: string
  order: number
  name?: string
  durationSeconds: number
  /** Always stored in km/h; converted for display only. */
  speed: number
  /** Percentage. */
  incline: number
  instruction?: string
}

export interface Program {
  id: string
  name: string
  description: string
  difficulty: Difficulty
  workoutType: WorkoutType
  isBuiltIn: boolean
  isFavourite: boolean
  trainingObjective: string
  warning?: string
  createdFromProgramId?: string
  intervals: WorkoutInterval[]
  createdAt: number
}

export interface WorkoutSession {
  id: string
  programId?: string
  programNameSnapshot: string
  /** Epoch milliseconds. */
  date: number
  durationSeconds: number
  completed: boolean
  intervalsCompleted: number
  totalIntervals: number
  maxSpeed?: number
  maxIncline?: number
  isFlaggedIncomplete: boolean
}

export interface WorkoutFeedback {
  id: string
  sessionId: string
  feeling: Feeling
  rating: number
  wouldRepeat: WouldRepeat
  comments?: string
}

export interface UserSettings {
  units: Units
  appearance: Appearance
  soundEnabled: boolean
  intervalAlertsEnabled: boolean
  countdownSeconds: number
  confirmBeforeDelete: boolean
  vibrantColorsEnabled: boolean
  backgroundStyle: BackgroundStyle
  skipThresholdPercentage: number
}

export const DEFAULT_SETTINGS: UserSettings = {
  units: 'kmh',
  appearance: 'system',
  soundEnabled: true,
  intervalAlertsEnabled: true,
  countdownSeconds: 10,
  confirmBeforeDelete: true,
  vibrantColorsEnabled: true,
  backgroundStyle: 'none',
  skipThresholdPercentage: 50,
}

export interface SeedInterval {
  name?: string
  durationSeconds: number
  speed: number
  incline: number
  instruction?: string
}

export interface SeedProgram {
  name: string
  description: string
  warning?: string
  difficulty: Difficulty
  workoutType: WorkoutType
  trainingObjective: string
  intervals: SeedInterval[]
}
