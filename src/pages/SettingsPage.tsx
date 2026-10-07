import { useId, useState, type ReactNode } from 'react'
import { Lock, Monitor, Moon, Sun, Trash2, Volume2 } from 'lucide-react'
import { BACKGROUND_STYLES, WORKOUT_TYPES, type UserSettings } from '../db/types'
import { deleteAllCustomPrograms, deleteAllHistory, deleteEverything, getAllPrograms, getAllSessions, updateSettings } from '../db/database'
import { useAppSettings } from '../hooks/SettingsContext'
import { useLiveQuery } from '../hooks/useLiveQuery'
import { cues, unlockAudio } from '../lib/audio'
import { PageHeader } from '../components/EmptyState'
import { WorkoutTypeBadge } from '../components/WorkoutTypeBadge'
import { BackgroundPattern, BACKGROUND_LABELS } from '../components/BackgroundPattern'
import { Dialog } from '../components/Dialog'

const set = (patch: Partial<UserSettings>) => void updateSettings(patch)

type DeleteKind = 'history' | 'custom' | 'everything'

const DELETE_COPY: Record<DeleteKind, { title: string; body: string; action: string }> = {
  history: {
    title: 'Delete all workout history?',
    body: 'All sessions and feedback will be permanently removed from this browser. This cannot be undone.',
    action: 'Delete history',
  },
  custom: {
    title: 'Delete all custom programs?',
    body: 'Built-in programs are not affected. Your history is kept. This cannot be undone.',
    action: 'Delete custom programs',
  },
  everything: {
    title: 'Delete everything?',
    body: 'Removes all history, feedback, custom programs and favourites, and resets settings to defaults. Built-in programs remain. This cannot be undone.',
    action: 'Delete everything',
  },
}

export function SettingsPage() {
  const { settings } = useAppSettings()
  const [pendingDelete, setPendingDelete] = useState<DeleteKind | null>(null)
  const [deletedMsg, setDeletedMsg] = useState<string | null>(null)
  const counts = useLiveQuery(
    async () => {
      const [programs, sessions] = await Promise.all([getAllPrograms(), getAllSessions()])
      return { custom: programs.filter((p) => !p.isBuiltIn).length, sessions: sessions.length }
    },
    ['programs', 'sessions'],
  )

  const runDelete = async () => {
    const kind = pendingDelete
    setPendingDelete(null)
    if (kind === 'history') await deleteAllHistory()
    if (kind === 'custom') await deleteAllCustomPrograms()
    if (kind === 'everything') await deleteEverything()
    setDeletedMsg(kind === 'history' ? 'Workout history deleted.' : kind === 'custom' ? 'Custom programs deleted.' : 'All local data deleted.')
  }

  return (
    <div className="max-w-3xl">
      <PageHeader title="Settings" />

      <div className="space-y-6">
        <Section title="Units">
          <Row label="Speed units" hint={settings.units === 'mph' ? 'mph values are rounded to the nearest 0.5 for easy treadmill matching.' : undefined}>
            <Segmented
              label="Speed units"
              value={settings.units}
              onChange={(units) => set({ units })}
              options={[
                { value: 'kmh', label: 'km/h' },
                { value: 'mph', label: 'mph' },
              ]}
            />
          </Row>
        </Section>

        <Section title="Appearance">
          <Row label="Theme">
            <Segmented
              label="Theme"
              value={settings.appearance}
              onChange={(appearance) => set({ appearance })}
              options={[
                { value: 'light', label: 'Light', icon: <Sun size={15} aria-hidden="true" /> },
                { value: 'dark', label: 'Dark', icon: <Moon size={15} aria-hidden="true" /> },
                { value: 'system', label: 'System', icon: <Monitor size={15} aria-hidden="true" /> },
              ]}
            />
          </Row>
          <Row label="Vibrant colours" hint="Colour-code workout types. When off, all type badges are grey.">
            <Toggle label="Vibrant colours" setting="vibrantColorsEnabled" />
          </Row>
          <div className="flex flex-wrap gap-1.5 px-5 pb-4" aria-label="Preview of workout type badges">
            {WORKOUT_TYPES.map((t) => (
              <WorkoutTypeBadge key={t} type={t} />
            ))}
          </div>
          <fieldset className="border-t border-line px-5 py-4">
            <legend className="sr-only">Background style</legend>
            <p className="mb-3 text-sm font-semibold" aria-hidden="true">
              Background
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {BACKGROUND_STYLES.map((style) => {
                const active = settings.backgroundStyle === style
                return (
                  <label
                    key={style}
                    className={`relative flex h-20 cursor-pointer flex-col items-center justify-end overflow-hidden rounded-xl border-2 bg-canvas pb-1.5 text-xs font-semibold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-brand-soft ${
                      active ? 'border-teal-brand' : 'border-line hover:border-muted'
                    }`}
                  >
                    <input type="radio" name="bg" value={style} checked={active} onChange={() => set({ backgroundStyle: style })} className="sr-only" />
                    <BackgroundPattern style={style} preview className="absolute inset-0" />
                    <span className="relative rounded bg-card/80 px-1.5">{BACKGROUND_LABELS[style]}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        </Section>

        <Section title="Workout alerts">
          <Row label="Sound" hint="Chimes before and at each interval change.">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  unlockAudio()
                  cues.upcoming()
                }}
                className="btn-ghost min-h-9 px-2.5 py-1.5 text-xs"
                disabled={!settings.soundEnabled}
              >
                <Volume2 size={15} aria-hidden="true" /> Test
              </button>
              <Toggle label="Sound" setting="soundEnabled" />
            </div>
          </Row>
          <Row label="Interval alerts" hint="Show a banner (and vibrate, where supported) before the next interval starts.">
            <Toggle label="Interval alerts" setting="intervalAlertsEnabled" />
          </Row>
          <Row label="Countdown" hint="How early the “coming up” alert appears.">
            <Select
              label="Countdown seconds"
              value={settings.countdownSeconds}
              options={[5, 10, 15, 20, 30].map((n) => ({ value: n, label: `${n} seconds` }))}
              onChange={(n) => set({ countdownSeconds: n })}
              disabled={!settings.intervalAlertsEnabled}
            />
          </Row>
          <Row label="Skip limit" hint={`Warn me once I've skipped ${settings.skipThresholdPercentage}% of a workout's intervals.`}>
            <Select
              label="Skip limit percentage"
              value={settings.skipThresholdPercentage}
              options={[25, 33, 50, 66, 75, 100].map((n) => ({ value: n, label: `${n}%` }))}
              onChange={(n) => set({ skipThresholdPercentage: n })}
            />
          </Row>
        </Section>

        <Section title="Safety">
          <Row label="Confirm before deleting" hint="Ask before deleting a custom program.">
            <Toggle label="Confirm before deleting" setting="confirmBeforeDelete" />
          </Row>
        </Section>

        <Section title="Data & privacy">
          <div className="flex gap-3 px-5 py-4 text-sm text-muted">
            <Lock size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-teal-brand dark:text-teal-brand-soft" />
            <p>
              Everything — programs, history, feedback and settings — is stored only in this browser’s IndexedDB. Nothing is sent to a
              server: no accounts, no analytics, no third-party requests. Clearing site data in your browser also removes it.
            </p>
          </div>
          <dl className="grid grid-cols-2 border-t border-line text-sm">
            <div className="px-5 py-3">
              <dt className="text-muted">Custom programs</dt>
              <dd className="font-display text-xl font-bold">{counts?.custom ?? '–'}</dd>
            </div>
            <div className="px-5 py-3">
              <dt className="text-muted">Workout sessions</dt>
              <dd className="font-display text-xl font-bold">{counts?.sessions ?? '–'}</dd>
            </div>
          </dl>
          <div className="flex flex-col gap-2 border-t border-line px-5 py-4 sm:flex-row sm:flex-wrap">
            <button type="button" className="btn-danger" onClick={() => setPendingDelete('history')} disabled={counts?.sessions === 0}>
              <Trash2 size={16} aria-hidden="true" /> Delete history
            </button>
            <button type="button" className="btn-danger" onClick={() => setPendingDelete('custom')} disabled={counts?.custom === 0}>
              <Trash2 size={16} aria-hidden="true" /> Delete custom programs
            </button>
            <button type="button" className="btn bg-red-600 text-white hover:bg-red-700" onClick={() => setPendingDelete('everything')}>
              <Trash2 size={16} aria-hidden="true" /> Delete everything
            </button>
          </div>
          <p aria-live="polite" className="px-5 pb-4 text-sm font-semibold text-teal-brand empty:hidden dark:text-teal-brand-soft">
            {deletedMsg}
          </p>
        </Section>
      </div>

      {/* Bulk deletes always confirm, regardless of the "confirm before deleting" setting. */}
      <Dialog
        open={pendingDelete !== null}
        title={pendingDelete ? DELETE_COPY[pendingDelete].title : ''}
        onCancel={() => setPendingDelete(null)}
        actions={[
          { label: 'Cancel', onClick: () => setPendingDelete(null), autoFocus: true },
          { label: pendingDelete ? DELETE_COPY[pendingDelete].action : 'Delete', variant: 'danger', onClick: () => void runDelete() },
        ]}
      >
        {pendingDelete && DELETE_COPY[pendingDelete].body}
      </Dialog>
    </div>
  )
}

// ---------- small form primitives ----------

function Section({ title, children }: { title: string; children: ReactNode }) {
  const id = useId()
  return (
    <section aria-labelledby={id} className="card overflow-hidden">
      <h2 id={id} className="border-b border-line px-5 py-3 text-sm font-bold tracking-wide text-muted uppercase">
        {title}
      </h2>
      <div className="divide-y divide-line">{children}</div>
    </section>
  )
}

function Row({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-4">
      <div className="min-w-0 flex-1 basis-48">
        <p className="font-semibold">{label}</p>
        {hint && <p className="mt-0.5 text-sm text-muted">{hint}</p>}
      </div>
      {children}
    </div>
  )
}

type BooleanSetting = { [K in keyof UserSettings]: UserSettings[K] extends boolean ? K : never }[keyof UserSettings]

/** Flips the stored value inside the DB transaction, so fast repeated taps can't act on a stale value. */
function Toggle({ label, setting }: { label: string; setting: BooleanSetting }) {
  const { settings } = useAppSettings()
  const checked = settings[setting]
  const onChange = () => void updateSettings((cur) => ({ [setting]: !cur[setting] }))
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${checked ? 'bg-teal-brand' : 'bg-muted/40'}`}
    >
      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string; icon?: ReactNode }[]
  onChange: (v: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-xl border border-line bg-canvas p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3.5 text-sm font-semibold transition-colors ${
            value === o.value ? 'bg-teal-brand text-white shadow-sm' : 'text-muted hover:text-ink'
          }`}
        >
          {o.icon}
          {o.label}
        </button>
      ))}
    </div>
  )
}

function Select({
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  label: string
  value: number
  options: { value: number; label: string }[]
  onChange: (n: number) => void
  disabled?: boolean
}) {
  // Keep a non-standard stored value selectable.
  const opts = options.some((o) => o.value === value) ? options : [...options, { value, label: String(value) }].sort((a, b) => a.value - b.value)
  return (
    <select aria-label={label} value={value} disabled={disabled} onChange={(e) => onChange(Number(e.target.value))} className="input w-auto disabled:opacity-50">
      {opts.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
