import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useBlocker, useNavigate, useParams } from 'react-router-dom'
import { CircleAlert, Lock, RotateCcw, Save, SearchX } from 'lucide-react'
import { DIFFICULTIES, WORKOUT_TYPES, type Program } from '../../db/types'
import { saveCustomProgram } from '../../db/database'
import { useProgram, usePrograms } from '../../hooks/useLiveQuery'
import { useAppSettings } from '../../hooks/SettingsContext'
import {
  applyAdjustments,
  draftFromProgram,
  draftToIntervals,
  intervalIssues,
  LIMITS,
  NO_ADJUSTMENTS,
  suggestCopyName,
  type Adjustments,
  type DraftInterval,
  type ProgramMeta,
} from '../../lib/programDraft'
import { DIFFICULTY_META, WORKOUT_TYPE_META } from '../../lib/workoutTypes'
import { humanDuration, totalDuration } from '../../lib/format'
import { newId } from '../../lib/ids'
import { BackLink } from '../../components/BackLink'
import { EmptyState, PageHeader, Spinner } from '../../components/EmptyState'
import { IntervalEditor } from '../../components/IntervalEditor'
import { ProfileChart } from '../../components/ProfileChart'
import { Dialog } from '../../components/Dialog'

export function NewProgramPage() {
  const programs = usePrograms()
  if (!programs) return <Spinner />
  return <ProgramEditor allPrograms={programs} source={null} />
}

export function CustomizeProgramPage() {
  const { id } = useParams()
  const source = useProgram(id)
  const programs = usePrograms()
  if (source === undefined || !programs) return <Spinner />
  if (source === null)
    return (
      <EmptyState
        icon={SearchX}
        title="Program not found"
        message="It may have been deleted."
        action={
          <Link to="/create/customize" className="btn-primary">
            Pick another program
          </Link>
        }
      />
    )
  // key: re-initialise the form if the user navigates to a different source.
  return <ProgramEditor key={source.id} allPrograms={programs} source={source} />
}

const EMPTY_META: ProgramMeta = {
  name: '',
  description: '',
  difficulty: 'easy',
  workoutType: 'cardio',
  trainingObjective: '',
}

function ProgramEditor({ allPrograms, source }: { allPrograms: Program[]; source: Program | null }) {
  const navigate = useNavigate()
  const { settings } = useAppSettings()
  const isCustomize = source !== null
  const ownsSource = source !== null && !source.isBuiltIn

  // ---------- initial state (computed once) ----------
  const initial = useMemo(() => {
    if (!source) return { meta: EMPTY_META, drafts: [] as DraftInterval[] }
    const taken = new Set(allPrograms.map((p) => p.name))
    return {
      meta: {
        // Owned programs keep their name (for "Save Changes"); built-ins get a free copy name.
        name: ownsSource ? source.name : suggestCopyName(source.name, taken),
        description: source.description,
        difficulty: source.difficulty,
        workoutType: source.workoutType,
        trainingObjective: source.trainingObjective,
      },
      drafts: draftFromProgram(source),
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [meta, setMeta] = useState<ProgramMeta>(initial.meta)
  const [drafts, setDrafts] = useState<DraftInterval[]>(initial.drafts)
  const [baseline, setBaseline] = useState<DraftInterval[]>(initial.drafts)
  const [adj, setAdj] = useState<Adjustments>(NO_ADJUSTMENTS)
  const [showErrors, setShowErrors] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const savedRef = useRef(false)

  const dirty = JSON.stringify({ meta, drafts }) !== JSON.stringify(initial)

  // ---------- validation ----------
  const trimmedName = meta.name.trim()
  const nameTaken = (excludeId?: string) =>
    allPrograms.some((p) => p.id !== excludeId && p.name.trim().toLowerCase() === trimmedName.toLowerCase())
  const asNewConflict = trimmedName !== '' && nameTaken()
  const changesConflict = ownsSource && trimmedName !== '' && nameTaken(source.id)
  const intervalErrors = drafts.some((d) => intervalIssues(d).errors.length > 0)
  const baseErrors = [
    !trimmedName && 'Give your program a name.',
    drafts.length === 0 && 'Add at least one interval.',
    intervalErrors && 'Fix the highlighted interval values.',
  ].filter(Boolean) as string[]

  // ---------- handlers ----------
  const onIntervalsChange = (next: DraftInterval[]) => {
    // Manual edits become the new baseline for the quick-adjust sliders.
    setDrafts(next)
    setBaseline(next)
    setAdj(NO_ADJUSTMENTS)
  }

  const onAdjust = (patch: Partial<Adjustments>) => {
    const nextAdj = { ...adj, ...patch }
    setAdj(nextAdj)
    setDrafts(applyAdjustments(baseline, nextAdj))
  }

  const save = async (mode: 'new' | 'changes') => {
    setShowErrors(true)
    setSaveError(null)
    const conflict = mode === 'new' ? asNewConflict : changesConflict
    if (baseErrors.length > 0 || conflict) return
    const program: Program =
      mode === 'changes' && ownsSource
        ? { ...source, ...meta, name: trimmedName, intervals: draftToIntervals(drafts) }
        : {
            id: newId(),
            ...meta,
            name: trimmedName,
            description: meta.description.trim(),
            trainingObjective: meta.trainingObjective.trim(),
            isBuiltIn: false,
            isFavourite: false,
            createdFromProgramId: source?.id,
            createdAt: Date.now(),
            intervals: draftToIntervals(drafts),
          }
    try {
      await saveCustomProgram(program)
      savedRef.current = true
      navigate(`/programs/${program.id}`, { replace: true })
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Could not save the program.')
    }
  }

  // ---------- unsaved-changes guard ----------
  const blocker = useBlocker(({ currentLocation, nextLocation }) => dirty && !savedRef.current && currentLocation.pathname !== nextLocation.pathname)
  useEffect(() => {
    if (!dirty) return
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [dirty])

  const baselineTotal = totalDuration(baseline)
  const targetSeconds = adj.targetSeconds ?? baselineTotal
  const minTargetMin = Math.max(1, Math.ceil((baseline.length * LIMITS.minDurationSeconds) / 60))
  const maxTargetMin = Math.max(180, Math.ceil(baselineTotal / 60))
  const adjustmentsActive = adj.speedPercent !== 0 || adj.inclinePercent !== 0 || adj.targetSeconds !== null

  return (
    <div className="pb-10">
      <BackLink fallback={isCustomize ? '/create/customize' : '/create'} />
      <PageHeader
        title={isCustomize ? 'Customize Program' : 'Create Program'}
        subtitle={
          source
            ? `Based on “${source.name}”${source.isBuiltIn ? ' — built-in programs are never overwritten.' : ''}`
            : 'Build a new program interval by interval.'
        }
      />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          void save('new')
        }}
        className="grid gap-6 lg:grid-cols-[1fr_20rem]"
      >
        <div className="min-w-0 space-y-6">
          {/* ---------- metadata ---------- */}
          <section aria-labelledby="details-heading" className="card space-y-4 p-5">
            <h2 id="details-heading" className="section-title">
              Program details
            </h2>
            <div>
              <label htmlFor="p-name" className="label">
                Name
              </label>
              <input
                id="p-name"
                value={meta.name}
                maxLength={LIMITS.name}
                onChange={(e) => setMeta({ ...meta, name: e.target.value })}
                aria-invalid={(showErrors && !trimmedName) || (asNewConflict && !ownsSource) || changesConflict}
                aria-describedby="p-name-msg"
                className="input"
                placeholder="e.g. Saturday Hill Session"
                autoFocus={!isCustomize}
              />
              <div id="p-name-msg" aria-live="polite" className="mt-1 text-sm">
                {showErrors && !trimmedName && <p className="text-red-700 dark:text-red-400">A name is required.</p>}
                {(changesConflict || (asNewConflict && !ownsSource)) && (
                  <p className="text-red-700 dark:text-red-400">A program named “{trimmedName}” already exists.</p>
                )}
                {ownsSource && asNewConflict && !changesConflict && (
                  <p className="text-muted">Use a different name to save a separate copy, or save changes to update this program.</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="p-desc" className="label">
                Description <span className="font-normal text-muted">(optional)</span>
              </label>
              <textarea
                id="p-desc"
                rows={2}
                maxLength={LIMITS.description}
                value={meta.description}
                onChange={(e) => setMeta({ ...meta, description: e.target.value })}
                className="input resize-y"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="p-diff" className="label">
                  Difficulty
                </label>
                <select id="p-diff" value={meta.difficulty} onChange={(e) => setMeta({ ...meta, difficulty: e.target.value as ProgramMeta['difficulty'] })} className="input">
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>
                      {DIFFICULTY_META[d].label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="p-type" className="label">
                  Workout type
                </label>
                <select id="p-type" value={meta.workoutType} onChange={(e) => setMeta({ ...meta, workoutType: e.target.value as ProgramMeta['workoutType'] })} className="input">
                  {WORKOUT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {WORKOUT_TYPE_META[t].label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="p-obj" className="label">
                Training objective <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id="p-obj"
                value={meta.trainingObjective}
                maxLength={LIMITS.objective}
                onChange={(e) => setMeta({ ...meta, trainingObjective: e.target.value })}
                className="input"
                placeholder="e.g. Builds aerobic base with low joint impact"
              />
            </div>
          </section>

          <IntervalEditor intervals={drafts} units={settings.units} onChange={onIntervalsChange} showErrors={showErrors} />
        </div>

        {/* ---------- sidebar: summary, quick adjust, save ---------- */}
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="card space-y-3 p-5">
            <h2 className="text-sm font-bold">Summary</h2>
            <p className="font-display text-3xl font-bold tabular-nums" aria-live="polite">
              {humanDuration(totalDuration(drafts))}
            </p>
            <p className="text-sm text-muted">
              {drafts.length} interval{drafts.length === 1 ? '' : 's'}
            </p>
            {drafts.length > 0 && <ProfileChart intervals={drafts} units={settings.units} />}
          </div>

          {isCustomize && baseline.length > 0 && (
            <div className="card space-y-4 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold">Quick adjust</h2>
                {adjustmentsActive && (
                  <button type="button" onClick={() => onAdjust(NO_ADJUSTMENTS)} className="btn-ghost min-h-8 px-2 py-1 text-xs">
                    <RotateCcw size={13} aria-hidden="true" /> Reset
                  </button>
                )}
              </div>
              <Slider
                id="adj-speed"
                label="All speeds"
                value={adj.speedPercent}
                display={`${adj.speedPercent > 0 ? '+' : ''}${adj.speedPercent}%`}
                min={-50}
                max={50}
                step={5}
                onChange={(n) => onAdjust({ speedPercent: n })}
              />
              <Slider
                id="adj-incline"
                label="All inclines"
                value={adj.inclinePercent}
                display={`${adj.inclinePercent > 0 ? '+' : ''}${adj.inclinePercent}%`}
                min={-50}
                max={50}
                step={5}
                onChange={(n) => onAdjust({ inclinePercent: n })}
              />
              <Slider
                id="adj-duration"
                label="Total duration"
                value={Math.round(targetSeconds / 60)}
                display={humanDuration(totalDuration(drafts))}
                min={minTargetMin}
                max={maxTargetMin}
                step={1}
                onChange={(m) => onAdjust({ targetSeconds: m * 60 })}
              />
              <p className="text-xs text-muted">Scales every interval proportionally. Editing an interval directly resets these sliders.</p>
            </div>
          )}

          <div className="card space-y-2 p-5">
            {showErrors && baseErrors.length > 0 && (
              <ul className="mb-2 space-y-1 text-sm text-red-700 dark:text-red-400" role="alert">
                {baseErrors.map((e) => (
                  <li key={e} className="flex items-start gap-1.5">
                    <CircleAlert size={15} aria-hidden="true" className="mt-0.5 shrink-0" /> {e}
                  </li>
                ))}
              </ul>
            )}
            {saveError && (
              <p role="alert" className="text-sm text-red-700 dark:text-red-400">
                {saveError}
              </p>
            )}
            <button type="submit" className="btn-primary w-full text-base" disabled={asNewConflict}>
              <Save size={18} aria-hidden="true" /> {isCustomize ? 'Save as New Program' : 'Save Program'}
            </button>
            {ownsSource && (
              <button type="button" onClick={() => void save('changes')} className="btn-secondary w-full" disabled={changesConflict}>
                Save Changes
              </button>
            )}
            {source?.isBuiltIn && (
              <p className="flex items-center gap-1.5 pt-1 text-xs text-muted">
                <Lock size={12} aria-hidden="true" /> Built-in programs can’t be changed — your version is saved as a new program.
              </p>
            )}
          </div>
        </aside>
      </form>

      <Dialog
        open={blocker.state === 'blocked'}
        title="Discard changes?"
        onCancel={() => blocker.reset?.()}
        actions={[
          { label: 'Keep editing', onClick: () => blocker.reset?.(), autoFocus: true },
          { label: 'Discard', variant: 'danger', onClick: () => blocker.proceed?.() },
        ]}
      >
        You have unsaved changes to this program.
      </Dialog>
    </div>
  )
}

function Slider({
  id,
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  id: string
  label: string
  value: number
  display: string
  min: number
  max: number
  step: number
  onChange: (n: number) => void
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 flex justify-between text-sm font-medium">
        {label} <span className="font-semibold tabular-nums">{display}</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={display}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  )
}
