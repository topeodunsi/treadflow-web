import { useId } from 'react'
import { ChevronDown, ChevronUp, CircleAlert, Copy, Plus, Trash2, TriangleAlert } from 'lucide-react'
import type { Units } from '../db/types'
import { intervalIssues, LIMITS, newDraftInterval, type DraftInterval } from '../lib/programDraft'
import { formatIncline, formatSpeed, humanDuration, mphToKmh, speedValue, totalDuration, unitSuffix } from '../lib/format'
import { NumberField } from './NumberField'

interface IntervalEditorProps {
  intervals: DraftInterval[]
  units: Units
  onChange: (next: DraftInterval[], structural: boolean) => void
  showErrors: boolean
}

/**
 * Add / edit / duplicate / delete / reorder intervals. `structural` tells the
 * parent whether the list shape changed (add/remove/reorder) vs a field edit.
 */
export function IntervalEditor({ intervals, units, onChange, showErrors }: IntervalEditorProps) {
  const update = (index: number, patch: Partial<DraftInterval>) =>
    onChange(
      intervals.map((iv, i) => (i === index ? { ...iv, ...patch } : iv)),
      false,
    )

  const move = (index: number, delta: -1 | 1) => {
    const target = index + delta
    if (target < 0 || target >= intervals.length) return
    const next = [...intervals]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next, true)
    // Keep keyboard focus on the moved row's control.
    requestAnimationFrame(() => document.getElementById(`move-${delta < 0 ? 'up' : 'down'}-${next[target].key}`)?.focus())
  }

  const duplicate = (index: number) => {
    const { name, durationSeconds, speed, incline, instruction } = intervals[index]
    const next = [...intervals]
    next.splice(index + 1, 0, newDraftInterval({ name, durationSeconds, speed, incline, instruction }))
    onChange(next, true)
  }

  const remove = (index: number) => onChange(intervals.filter((_, i) => i !== index), true)

  const add = () => {
    const last = intervals[intervals.length - 1]
    // New intervals start from the previous one's settings — usually what you want on a treadmill.
    onChange([...intervals, newDraftInterval(last ? { speed: last.speed, incline: last.incline, durationSeconds: last.durationSeconds } : {})], true)
    requestAnimationFrame(() => {
      const inputs = document.querySelectorAll<HTMLInputElement>('[data-interval-name]')
      inputs[inputs.length - 1]?.focus()
    })
  }

  return (
    <section aria-labelledby="intervals-heading">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 id="intervals-heading" className="section-title">
          Intervals
        </h2>
        <p className="text-sm text-muted" aria-live="polite">
          {intervals.length} interval{intervals.length === 1 ? '' : 's'} · Total{' '}
          <strong className="text-ink">{humanDuration(totalDuration(intervals))}</strong>
        </p>
      </div>

      {intervals.length === 0 && (
        <p className={`card px-4 py-6 text-center text-sm ${showErrors ? 'border-red-400 text-red-700 dark:text-red-400' : 'text-muted'}`}>
          No intervals yet — add your first one below.
        </p>
      )}

      <ol className="space-y-3">
        {intervals.map((iv, index) => (
          <IntervalRow
            key={iv.key}
            interval={iv}
            index={index}
            count={intervals.length}
            units={units}
            showErrors={showErrors}
            onUpdate={(patch) => update(index, patch)}
            onMove={(d) => move(index, d)}
            onDuplicate={() => duplicate(index)}
            onRemove={() => remove(index)}
          />
        ))}
      </ol>

      <button type="button" onClick={add} className="btn-secondary mt-3 w-full border-dashed text-teal-brand dark:text-teal-brand-soft">
        <Plus size={18} aria-hidden="true" /> Add interval
      </button>
    </section>
  )
}

function IntervalRow({
  interval: iv,
  index,
  count,
  units,
  showErrors,
  onUpdate,
  onMove,
  onDuplicate,
  onRemove,
}: {
  interval: DraftInterval
  index: number
  count: number
  units: Units
  showErrors: boolean
  onUpdate: (patch: Partial<DraftInterval>) => void
  onMove: (d: -1 | 1) => void
  onDuplicate: () => void
  onRemove: () => void
}) {
  const id = useId()
  const { errors, warnings } = intervalIssues(iv)
  const minutes = Math.floor(iv.durationSeconds / 60)
  const seconds = Math.round(iv.durationSeconds % 60)
  const label = iv.name.trim() || `Interval ${index + 1}`
  const isMph = units === 'mph'
  const speedShown = speedValue(iv.speed, units)
  const setSpeed = (n: number) => onUpdate({ speed: isMph ? mphToKmh(n) : n })
  const hasErrors = errors.length > 0 && showErrors

  return (
    <li className={`card @container p-4 ${hasErrors ? 'border-red-400 dark:border-red-700' : warnings.length ? 'border-coral/50' : ''}`} aria-label={label}>
      <div className="flex items-start gap-2">
        <span className="mt-2 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-brand/10 text-xs font-bold text-teal-brand dark:text-teal-brand-soft" aria-hidden="true">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <label htmlFor={`${id}-name`} className="sr-only">
            Interval {index + 1} name
          </label>
          <input
            id={`${id}-name`}
            data-interval-name
            value={iv.name}
            maxLength={LIMITS.intervalName}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder={`Interval ${index + 1} (name optional)`}
            className="input font-semibold"
          />
        </div>
        <div className="flex shrink-0 items-center">
          <IconButton id={`move-up-${iv.key}`} label={`Move ${label} up`} disabled={index === 0} onClick={() => onMove(-1)}>
            <ChevronUp size={18} />
          </IconButton>
          <IconButton id={`move-down-${iv.key}`} label={`Move ${label} down`} disabled={index === count - 1} onClick={() => onMove(1)}>
            <ChevronDown size={18} />
          </IconButton>
          <IconButton label={`Duplicate ${label}`} onClick={onDuplicate}>
            <Copy size={16} />
          </IconButton>
          <IconButton label={`Delete ${label}`} onClick={onRemove} danger>
            <Trash2 size={16} />
          </IconButton>
        </div>
      </div>

      <div className="mt-3 grid gap-4 @lg:grid-cols-2 @3xl:grid-cols-3">
        {/* Duration */}
        <fieldset>
          <legend className="mb-1.5 text-xs font-semibold text-muted">Duration</legend>
          <div className="flex items-center gap-1.5">
            <NumberField
              aria-label={`${label} minutes`}
              value={minutes}
              onValueChange={(m) => onUpdate({ durationSeconds: Math.min(180, m) * 60 + seconds })}
              className="w-16 text-center"
            />
            <span className="text-sm text-muted">min</span>
            <NumberField
              aria-label={`${label} seconds`}
              value={seconds}
              onValueChange={(s) => onUpdate({ durationSeconds: minutes * 60 + Math.min(59, s) })}
              className="w-16 text-center"
            />
            <span className="text-sm text-muted">sec</span>
          </div>
        </fieldset>

        {/* Speed */}
        <div>
          <label htmlFor={`${id}-speed`} className="mb-1.5 flex justify-between text-xs font-semibold text-muted">
            Speed <span className="text-ink">{formatSpeed(iv.speed, units)}</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              aria-label={`${label} speed slider`}
              min={0.5}
              max={isMph ? 12.5 : 20}
              step={isMph ? 0.5 : 0.1}
              value={speedShown}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="min-w-0 flex-1"
            />
            <NumberField
              id={`${id}-speed`}
              aria-label={`${label} speed in ${unitSuffix(units)}`}
              decimals={1}
              value={speedShown}
              onValueChange={setSpeed}
              className="w-20 text-center"
            />
          </div>
        </div>

        {/* Incline */}
        <div>
          <label htmlFor={`${id}-incline`} className="mb-1.5 flex justify-between text-xs font-semibold text-muted">
            Incline <span className="text-ink">{formatIncline(iv.incline)}</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              aria-label={`${label} incline slider`}
              min={0}
              max={20}
              step={0.5}
              value={Math.min(20, iv.incline)}
              onChange={(e) => onUpdate({ incline: parseFloat(e.target.value) })}
              className="min-w-0 flex-1"
            />
            <NumberField
              id={`${id}-incline`}
              aria-label={`${label} incline percent`}
              decimals={iv.incline % 1 === 0 ? 0 : 1}
              value={iv.incline}
              onValueChange={(n) => onUpdate({ incline: n })}
              className="w-20 text-center"
            />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor={`${id}-instr`} className="sr-only">
          {label} instruction
        </label>
        <input
          id={`${id}-instr`}
          value={iv.instruction}
          maxLength={LIMITS.instruction}
          onChange={(e) => onUpdate({ instruction: e.target.value })}
          placeholder="Instruction shown during the workout (optional)"
          className="input text-sm"
        />
      </div>

      {(warnings.length > 0 || hasErrors) && (
        <ul className="mt-3 space-y-1 text-sm" aria-live="polite">
          {hasErrors &&
            errors.map((e) => (
              <li key={e} className="flex items-start gap-1.5 text-red-700 dark:text-red-400">
                <CircleAlert size={15} aria-hidden="true" className="mt-0.5 shrink-0" /> {e}
              </li>
            ))}
          {warnings.map((w) => (
            <li key={w} className="flex items-start gap-1.5 text-coral-strong dark:text-coral-soft">
              <TriangleAlert size={15} aria-hidden="true" className="mt-0.5 shrink-0" /> {w}
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

function IconButton({
  label,
  onClick,
  disabled,
  danger,
  id,
  children,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  danger?: boolean
  id?: string
  children: React.ReactNode
}) {
  return (
    <button
      id={id}
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`grid h-9 w-9 place-items-center rounded-lg transition-colors disabled:opacity-30 ${
        danger ? 'text-red-600 hover:bg-red-500/10 dark:text-red-400' : 'text-muted hover:bg-card-raised hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}
