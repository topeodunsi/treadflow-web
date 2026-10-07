import type { WorkoutFeedback, WorkoutSession } from '../db/types'

export interface HistoryStats {
  totalWorkouts: number
  completedWorkouts: number
  totalSeconds: number
  mostUsedProgram: { name: string; count: number } | null
  averageRating: number | null
}

export function calculateHistoryStats(sessions: WorkoutSession[], feedback: WorkoutFeedback[]): HistoryStats {
  const counts = new Map<string, number>()
  for (const s of sessions) counts.set(s.programNameSnapshot, (counts.get(s.programNameSnapshot) ?? 0) + 1)
  let mostUsed: HistoryStats['mostUsedProgram'] = null
  for (const [name, count] of counts) {
    if (!mostUsed || count > mostUsed.count) mostUsed = { name, count }
  }

  const sessionIds = new Set(sessions.map((s) => s.id))
  const ratings = feedback.filter((f) => sessionIds.has(f.sessionId) && f.rating > 0).map((f) => f.rating)

  return {
    totalWorkouts: sessions.length,
    completedWorkouts: sessions.filter((s) => s.completed).length,
    totalSeconds: sessions.reduce((sum, s) => sum + s.durationSeconds, 0),
    mostUsedProgram: mostUsed,
    averageRating: ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null,
  }
}
