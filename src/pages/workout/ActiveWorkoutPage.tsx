import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useBlocker, useNavigate, useParams } from 'react-router-dom'
import { Bell, Footprints, Pause, Play, SearchX, SkipForward, X } from 'lucide-react'
import type { Program, UserSettings, WorkoutInterval } from '../../db/types'
import { useProgram } from '../../hooks/useLiveQuery'
import { useAppSettings } from '../../hooks/SettingsContext'
import { useWakeLock } from '../../hooks/useWakeLock'
import { clearPersistedWorkout, useWorkoutRunner } from '../../hooks/useWorkoutRunner'
import { cues, unlockAudio, vibrate } from '../../lib/audio'
import { isOverSkipThreshold } from '../../lib/workoutEngine'
import { clockDuration, convertInstructionText, formatIncline, inclineValue, formatSpeed, speedValue, unitSuffix } from '../../lib/format'
import { Dialog } from '../../components/Dialog'
import { EmptyState, Spinner } from '../../components/EmptyState'
import { WorkoutComplete } from './WorkoutComplete'
import { FeedbackForm } from './FeedbackForm'

export function ActiveWorkoutPage() {
  const { id } = useParams()
  const program = useProgram(id)
  const { settings, loaded } = useAppSettings()

  if (program === undefined || !loaded)
    return (
      <div className="min-h-dvh bg-canvas">
        <Spinner />
      </div>
    )
  if (program === null || program.intervals.length === 0)
    return (
      <div className="mx-auto max-w-lg p-6">
        <EmptyState
          icon={SearchX}
          title="Workout unavailable"
          message={program ? 'This program has no intervals.' : 'This program no longer exists.'}
          action={
            <Link to="/" className="btn-primary">
              Browse programs
            </Link>
          }
        />
      </div>
    )

  // Settings are captured at start (like iOS) so a mid-workout change can't shift alerts.
  return <WorkoutRunner program={program} settings={settings} />
}

function WorkoutRunner({ program, settings }: { program: Program; settings: UserSettings }) {
  const navigate = useNavigate()
  const runner = useWorkoutRunner(program)
  const { intervals, snap, state, endReason, session, sessionId } = runner
  const [showEndConfirm, setShowEndConfirm] = useState(false)
  const [showSkipAlert, setShowSkipAlert] = useState(false)
  const [phase, setPhase] = useState<'complete' | 'feedback'>('complete')

  const running = !snap.isFinished
  useWakeLock(running)

  // Abandoning the run (unmount via navigation) clears the refresh-resume state.
  // A hard refresh doesn't unmount, so the workout survives it.
  useEffect(() => () => clearPersistedWorkout(), [])

  // Guard in-app navigation away from a running workout with the end dialog.
  const blocker = useBlocker(({ currentLocation, nextLocation }) => running && currentLocation.pathname !== nextLocation.pathname)
  useEffect(() => {
    if (blocker.state === 'blocked') setShowEndConfirm(true)
  }, [blocker.state])

  // Browser tab close / reload while running.
  useEffect(() => {
    if (!running) return
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [running])

  const exitTo = useCallback(
    (path: string) => {
      clearPersistedWorkout()
      navigate(path, { replace: true })
    },
    [navigate],
  )

  // Manual / skip-limit end: once the incomplete session is saved, leave (no feedback).
  useEffect(() => {
    if ((endReason === 'ended' || endReason === 'skipLimit') && sessionId) {
      if (blocker.state === 'blocked') blocker.proceed()
      else exitTo(`/programs/${program.id}`)
    }
  }, [endReason, sessionId, exitTo, program.id, blocker])

  useAudioCues(snap, intervals, settings, running)

  // Page title doubles as a glanceable countdown in the browser tab.
  useEffect(() => {
    const prev = document.title
    return () => {
      document.title = prev
    }
  }, [])
  useEffect(() => {
    document.title = running
      ? `${clockDuration(Math.ceil(snap.remainingInIntervalMs / 1000))} · ${intervals[snap.index]?.name ?? 'Interval'} — TreadFlow`
      : 'Workout complete — TreadFlow'
  })

  const togglePause = useCallback(() => {
    unlockAudio()
    if (snap.isPaused) runner.resume()
    else runner.pause()
  }, [snap.isPaused, runner])

  const handleSkip = useCallback(() => {
    unlockAudio()
    const { skipCount, finishedWorkout } = runner.skip()
    // Re-shown on every skip while at/over the threshold, not just the first time.
    if (!finishedWorkout && isOverSkipThreshold(skipCount, intervals.length, settings.skipThresholdPercentage)) {
      setShowSkipAlert(true)
    }
  }, [runner, intervals.length, settings.skipThresholdPercentage])

  // Keyboard: Space = pause/resume, → or N = skip.
  useEffect(() => {
    if (!running) return
    const onKey = (e: KeyboardEvent) => {
      if (showEndConfirm || showSkipAlert) return
      const target = e.target as HTMLElement
      if (target.closest('input, textarea, select')) return
      if (e.code === 'Space' && !target.closest('button')) {
        e.preventDefault()
        togglePause()
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'n') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [running, togglePause, handleSkip, showEndConfirm, showSkipAlert])

  // ---------- finished: complete → feedback → browse ----------
  if (!running) {
    if (endReason !== 'completed') return <div className="min-h-dvh bg-canvas" />
    if (phase === 'feedback' && session)
      return <FeedbackForm session={session} onDone={() => exitTo('/')} />
    return <WorkoutComplete session={session} units={settings.units} onContinue={() => setPhase('feedback')} />
  }

  // ---------- running ----------
  const current = intervals[snap.index]
  const next = intervals[snap.index + 1]
  const remainingSec = Math.ceil(snap.remainingInIntervalMs / 1000)
  const showUpcoming =
    settings.intervalAlertsEnabled && !!next && remainingSec <= settings.countdownSeconds && snap.remainingInIntervalMs > 0

  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      {/* Top bar */}
      <header className="border-b border-line bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3 sm:px-6">
          <Footprints size={20} aria-hidden="true" className="shrink-0 text-teal-brand dark:text-teal-brand-soft" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{program.name}</p>
            <p className="text-xs text-muted tabular-nums">
              Interval {snap.index + 1} of {intervals.length} · {clockDuration(snap.elapsedMs / 1000)} /{' '}
              {clockDuration(snap.totalMs / 1000)}
            </p>
          </div>
          <button type="button" onClick={() => setShowEndConfirm(true)} className="btn-ghost px-3" aria-label="End workout">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <SegmentedProgress intervals={intervals} progress={snap.progress} currentIndex={snap.index} />
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-5 px-4 pt-6 pb-36 sm:px-6 sm:pt-10">
        {/* Upcoming-change alert (coral) — only in the final countdownSeconds */}
        <div aria-live="assertive" className="min-h-0">
          {showUpcoming && next && (
            <div className="animate-slide-down flex items-center gap-3 rounded-2xl bg-coral px-5 py-4 text-white shadow-lg shadow-coral/20">
              <Bell size={22} aria-hidden="true" className="shrink-0" />
              <p className="text-base font-semibold sm:text-lg">
                Next in {remainingSec}s: {next.name || 'Interval'} — {formatSpeed(next.speed, settings.units)},{' '}
                {formatIncline(next.incline)}
              </p>
            </div>
          )}
        </div>

        <section aria-label="Current interval" className="text-center">
          <h1 className="text-xl font-bold text-muted sm:text-2xl">{current.name || 'Interval'}</h1>
          <p
            className={`font-display text-[clamp(5.5rem,24vw,11rem)] leading-none font-bold tracking-tight tabular-nums ${
              snap.isPaused ? 'text-muted' : showUpcoming ? 'text-coral' : ''
            }`}
            aria-label={`${remainingSec} seconds remaining in this interval`}
          >
            {clockDuration(remainingSec)}
          </p>
          {snap.isPaused && (
            <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-card-raised px-3 py-1 text-sm font-semibold text-muted">
              <Pause size={14} aria-hidden="true" /> Paused
            </p>
          )}
        </section>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <StatBlock
            label="Speed"
            value={speedValue(current.speed, settings.units).toFixed(1)}
            unit={unitSuffix(settings.units)}
          />
          <StatBlock label="Incline" value={inclineValue(current.incline)} unit="%" />
        </div>

        {/* Persistent instruction (green), separate from the upcoming alert */}
        {current.instruction && (
          <div className="flex items-center gap-3 rounded-2xl border border-green-600/25 bg-green-500/12 px-5 py-4 text-green-800 dark:text-green-300">
            <Footprints size={20} aria-hidden="true" className="shrink-0" />
            <p className="text-base font-semibold">{convertInstructionText(current.instruction, settings.units)}</p>
          </div>
        )}

        {next ? <NextPreview next={next} units={settings.units} /> : <p className="text-center text-sm font-semibold text-muted">Final interval — finish strong!</p>}
      </main>

      {/* Controls */}
      <div className="fixed inset-x-0 bottom-0 border-t border-line bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto grid max-w-4xl grid-cols-[1fr_2fr_1fr] gap-2 px-4 py-3 sm:gap-3 sm:px-6 sm:py-4">
          <button type="button" onClick={() => setShowEndConfirm(true)} className="btn-secondary min-h-14 text-red-700 dark:text-red-400">
            <X size={20} aria-hidden="true" /> <span className="hidden sm:inline">End</span>
            <span className="sr-only sm:hidden">End workout</span>
          </button>
          <button type="button" onClick={togglePause} className="btn-primary min-h-14 text-lg" aria-keyshortcuts="Space">
            {snap.isPaused ? (
              <>
                <Play size={22} fill="currentColor" aria-hidden="true" /> Resume
              </>
            ) : (
              <>
                <Pause size={22} fill="currentColor" aria-hidden="true" /> Pause
              </>
            )}
          </button>
          <button type="button" onClick={handleSkip} className="btn-secondary min-h-14" aria-keyshortcuts="ArrowRight">
            <SkipForward size={20} aria-hidden="true" /> <span className="hidden sm:inline">Skip</span>
            <span className="sr-only sm:hidden">Skip interval</span>
          </button>
        </div>
      </div>

      <Dialog
        open={showEndConfirm}
        title="End workout?"
        onCancel={() => {
          setShowEndConfirm(false)
          if (blocker.state === 'blocked') blocker.reset()
        }}
        actions={[
          {
            label: 'Keep going',
            autoFocus: true,
            onClick: () => {
              setShowEndConfirm(false)
              if (blocker.state === 'blocked') blocker.reset()
            },
          },
          {
            label: 'End workout',
            variant: 'danger',
            onClick: () => {
              setShowEndConfirm(false)
              runner.end('ended')
            },
          },
        ]}
      >
        Your progress so far will be saved to History, but the workout will be marked incomplete.
      </Dialog>

      <Dialog
        open={showSkipAlert}
        tone="warning"
        title="Skip limit reached"
        onCancel={() => setShowSkipAlert(false)}
        actions={[
          { label: 'Continue', autoFocus: true, onClick: () => setShowSkipAlert(false) },
          {
            label: 'End Workout',
            variant: 'danger',
            onClick: () => {
              setShowSkipAlert(false)
              runner.end('skipLimit')
            },
          },
        ]}
      >
        You've skipped {state.skipCount} of {intervals.length} intervals (limit {settings.skipThresholdPercentage}%). End
        here and save it as incomplete, or keep going?
      </Dialog>
    </div>
  )
}

// ---------- audio / haptic cues ----------

function useAudioCues(
  snap: ReturnType<typeof useWorkoutRunner>['snap'],
  intervals: WorkoutInterval[],
  settings: UserSettings,
  running: boolean,
) {
  const lastIndex = useRef(snap.index)
  const alertedIndex = useRef<number | null>(null)
  const lastTickSecond = useRef<number | null>(null)
  const completed = useRef(!running)

  const remainingSec = Math.ceil(snap.remainingInIntervalMs / 1000)
  const hasNext = snap.index < intervals.length - 1

  useEffect(() => {
    if (!running) {
      if (!completed.current) {
        completed.current = true
        if (settings.soundEnabled && snap.reachedEnd) cues.complete()
        vibrate([150, 80, 150, 80, 300])
      }
      return
    }
    if (snap.isPaused) return

    // Interval changed.
    if (snap.index !== lastIndex.current) {
      lastIndex.current = snap.index
      lastTickSecond.current = null
      if (settings.soundEnabled) cues.change()
      vibrate(250)
    }

    if (!settings.intervalAlertsEnabled || !hasNext) return

    // Entered the "coming up" window.
    if (remainingSec <= settings.countdownSeconds && alertedIndex.current !== snap.index) {
      alertedIndex.current = snap.index
      if (settings.soundEnabled) cues.upcoming()
      vibrate([100, 60, 100])
    }
    // Final 3 seconds tick.
    if (remainingSec <= 3 && remainingSec > 0 && lastTickSecond.current !== remainingSec) {
      lastTickSecond.current = remainingSec
      if (settings.soundEnabled) cues.tick()
    }
  }, [running, snap.index, snap.isPaused, snap.reachedEnd, remainingSec, hasNext, settings])
}

// ---------- presentational bits ----------

function SegmentedProgress({
  intervals,
  progress,
  currentIndex,
}: {
  intervals: WorkoutInterval[]
  progress: number
  currentIndex: number
}) {
  return (
    <div
      role="progressbar"
      aria-label="Workout progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className="relative h-2 w-full bg-line"
    >
      <div className="absolute inset-y-0 left-0 bg-teal-brand transition-[width] duration-300 ease-linear dark:bg-teal-brand-soft" style={{ width: `${progress * 100}%` }} />
      {/* interval boundaries */}
      <div className="absolute inset-0 flex" aria-hidden="true">
        {intervals.map((iv, i) => (
          <div
            key={iv.id}
            style={{ flexGrow: iv.durationSeconds }}
            className={`h-full border-r-2 border-card last:border-r-0 ${i === currentIndex ? 'bg-white/15' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

function StatBlock({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="card px-4 py-4 text-center sm:py-6">
      <p className="text-xs font-bold tracking-widest text-muted uppercase">{label}</p>
      <p className="mt-1 font-display text-4xl font-bold tabular-nums sm:text-6xl">
        {value}
        <span className="ml-1 text-lg font-semibold text-muted sm:text-2xl">{unit}</span>
      </p>
    </div>
  )
}

function NextPreview({ next, units }: { next: WorkoutInterval; units: UserSettings['units'] }) {
  return (
    <div className="card flex items-center justify-between gap-3 px-5 py-3.5">
      <div className="min-w-0">
        <p className="text-xs font-bold tracking-widest text-muted uppercase">Next</p>
        <p className="truncate font-semibold">{next.name || 'Interval'}</p>
      </div>
      <p className="shrink-0 text-right text-sm text-muted tabular-nums">
        {clockDuration(next.durationSeconds)}
        <br />
        {formatSpeed(next.speed, units)} · {formatIncline(next.incline)}
      </p>
    </div>
  )
}
