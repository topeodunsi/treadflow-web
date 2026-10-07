import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Program, WorkoutSession } from '../db/types'
import { addSession, getSession } from '../db/database'
import { sortedIntervals } from '../lib/format'
import * as engine from '../lib/workoutEngine'

/** How often the UI re-renders. Purely cosmetic: time is always derived from Date.now(). */
export const TICK_MS = 250

const STORAGE_KEY = 'treadflow.activeWorkout'

export type EndReason = 'completed' | 'ended' | 'skipLimit'

interface Persisted {
  programId: string
  engine: engine.EngineState
  endReason: EndReason | null
  sessionId: string | null
}

function loadPersisted(programId: string): Persisted | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Persisted
    return parsed.programId === programId ? parsed : null
  } catch {
    return null
  }
}

function savePersisted(p: Persisted) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(p))
  } catch {
    /* storage unavailable — refresh-resume just won't work */
  }
}

export function clearPersistedWorkout() {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

/**
 * Owns the engine state for one workout run: ticking, pause/resume/skip/end,
 * and saving exactly one WorkoutSession when it finishes. Survives a page
 * refresh (state is plain timestamps, kept in sessionStorage).
 */
export function useWorkoutRunner(program: Program) {
  const intervals = useMemo(() => sortedIntervals(program), [program])
  const restored = useMemo(() => loadPersisted(program.id), [program.id])

  const [state, setState] = useState<engine.EngineState>(() => restored?.engine ?? engine.createEngine(Date.now()))
  const [endReason, setEndReason] = useState<EndReason | null>(restored?.endReason ?? null)
  const [session, setSession] = useState<WorkoutSession | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(restored?.sessionId ?? null)
  const [now, setNow] = useState(() => Date.now())
  const savingRef = useRef(false)

  const finished = state.frozenElapsedMs !== null

  // Re-render heartbeat. Each tick recomputes from Date.now(), so throttled
  // background timers can never cause drift — they only delay the repaint.
  useEffect(() => {
    if (finished) return
    const refresh = () => setNow(Date.now())
    const id = window.setInterval(refresh, TICK_MS)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [finished])

  // Advance derived state (max-reached index, natural completion).
  useEffect(() => {
    setState((s) => engine.tick(s, intervals, now))
  }, [now, intervals])

  // Natural completion → reason "completed".
  useEffect(() => {
    if (finished && endReason === null) setEndReason('completed')
  }, [finished, endReason])

  // Persist for refresh-resume.
  useEffect(() => {
    savePersisted({ programId: program.id, engine: state, endReason, sessionId })
  }, [program.id, state, endReason, sessionId])

  // Save exactly one session once an end reason is known.
  useEffect(() => {
    if (!endReason || sessionId || savingRef.current) return
    savingRef.current = true
    const completed = endReason === 'completed'
    const t = Date.now()
    const { maxSpeed, maxIncline } = engine.maxStats(state, intervals)
    void addSession({
      programId: program.id,
      programNameSnapshot: program.name,
      date: state.startedAt,
      durationSeconds: Math.round(engine.rawElapsedMs(state, t) / 1000),
      completed,
      intervalsCompleted: engine.intervalsCompleted(state, intervals, completed, t),
      totalIntervals: intervals.length,
      maxSpeed,
      maxIncline,
      isFlaggedIncomplete: endReason === 'skipLimit',
    }).then((saved) => {
      setSession(saved)
      setSessionId(saved.id)
    })
  }, [endReason, sessionId, state, intervals, program])

  // After a refresh on the completion screen, reload the already-saved session.
  useEffect(() => {
    if (sessionId && !session) void getSession(sessionId).then((s) => s && setSession(s))
  }, [sessionId, session])

  const snap = engine.snapshot(state, intervals, Date.now())

  const pause = useCallback(() => setState((s) => engine.pause(s, Date.now())), [])
  const resume = useCallback(() => setState((s) => engine.resume(s, Date.now())), [])

  /** Skips to the next interval; reports the new skip count and whether that finished the workout. */
  const skip = useCallback((): { skipCount: number; finishedWorkout: boolean } => {
    const t = Date.now()
    const next = engine.skip(state, intervals, t)
    const ticked = engine.tick(next, intervals, t)
    setState(ticked)
    setNow(t)
    return { skipCount: ticked.skipCount, finishedWorkout: ticked.frozenElapsedMs !== null }
  }, [state, intervals])

  const end = useCallback(
    (reason: Exclude<EndReason, 'completed'>) => {
      setState((s) => engine.finish(s, intervals, Date.now()))
      setEndReason(reason)
    },
    [intervals],
  )

  return {
    intervals,
    state,
    snap,
    endReason,
    session,
    sessionId,
    pause,
    resume,
    skip,
    end,
  }
}
