import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownUp, Plus, Search, SearchX, X } from 'lucide-react'
import { DIFFICULTIES, WORKOUT_TYPES, type Difficulty, type Program, type WorkoutType } from '../db/types'
import { usePrograms } from '../hooks/useLiveQuery'
import { ProgramGrid } from '../components/ProgramCard'
import { EmptyState, PageHeader, Spinner } from '../components/EmptyState'
import { useWorkoutTypeStyle } from '../components/WorkoutTypeBadge'
import { DIFFICULTY_META } from '../lib/workoutTypes'
import { totalDuration } from '../lib/format'

type SortKey = 'name' | 'duration' | 'speed' | 'incline'

const SORT_LABELS: Record<SortKey, string> = {
  name: 'Name',
  duration: 'Duration',
  speed: 'Top speed',
  incline: 'Top incline',
}

const QUICK_SECONDS = 600

function sortValue(p: Program, key: SortKey): number {
  switch (key) {
    case 'duration':
      return totalDuration(p.intervals)
    case 'speed':
      return Math.max(0, ...p.intervals.map((i) => i.speed))
    case 'incline':
      return Math.max(0, ...p.intervals.map((i) => i.incline))
    default:
      return 0
  }
}

function Chip({
  active,
  onClick,
  children,
  activeClass = 'border-teal-brand bg-teal-brand text-white',
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  activeClass?: string
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`chip ${active ? activeClass : 'border-line bg-card text-ink hover:bg-card-raised'}`}
    >
      {children}
    </button>
  )
}

function TypeChip({ type, active, onClick }: { type: WorkoutType; active: boolean; onClick: () => void }) {
  const { label, icon: Icon, badgeClass } = useWorkoutTypeStyle(type)
  return (
    <Chip active={active} onClick={onClick} activeClass={`border-current ${badgeClass}`}>
      <Icon size={14} aria-hidden="true" />
      {label}
    </Chip>
  )
}

export function filterPrograms(
  programs: Program[],
  opts: { search: string; difficulty: Difficulty | null; type: WorkoutType | null; quick: boolean },
) {
  const q = opts.search.trim().toLowerCase()
  return programs.filter((p) => {
    if (q && !`${p.name} ${p.description} ${p.workoutType}`.toLowerCase().includes(q)) return false
    if (opts.difficulty && p.difficulty !== opts.difficulty) return false
    if (opts.type && p.workoutType !== opts.type) return false
    if (opts.quick && totalDuration(p.intervals) >= QUICK_SECONDS) return false
    return true
  })
}

export function BrowsePage() {
  const programs = usePrograms()
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [type, setType] = useState<WorkoutType | null>(null)
  const [quick, setQuick] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [ascending, setAscending] = useState(true)

  const { builtIn, custom } = useMemo(() => {
    const filtered = filterPrograms(programs ?? [], { search, difficulty, type, quick })
    const sorted = [...filtered].sort((a, b) => {
      const diff = sortValue(a, sortKey) - sortValue(b, sortKey)
      const result = diff !== 0 ? diff : a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      return ascending ? result : -result
    })
    return { builtIn: sorted.filter((p) => p.isBuiltIn), custom: sorted.filter((p) => !p.isBuiltIn) }
  }, [programs, search, difficulty, type, quick, sortKey, ascending])

  const anyFilter = search || difficulty || type || quick
  const clearFilters = () => {
    setSearch('')
    setDifficulty(null)
    setType(null)
    setQuick(false)
  }

  return (
    <>
      <PageHeader title="Browse Programs" subtitle="Structured treadmill intervals, ready when you are.">
        <Link to="/create" className="btn-primary">
          <Plus size={18} aria-hidden="true" /> Create program
        </Link>
      </PageHeader>

      <div className="mb-6 space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search programs</span>
            <Search size={18} aria-hidden="true" className="absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search programs"
              className="input pl-10"
            />
          </label>
          <div className="flex gap-2">
            <label className="relative min-w-0 flex-1 sm:flex-none">
              <span className="sr-only">Sort by</span>
              <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)} className="input pr-8 sm:w-40">
                {Object.entries(SORT_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    Sort: {v}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => setAscending((a) => !a)}
              className="btn-secondary px-3"
              aria-label={ascending ? 'Ascending order, switch to descending' : 'Descending order, switch to ascending'}
              title={ascending ? 'Ascending' : 'Descending'}
            >
              <ArrowDownUp size={18} aria-hidden="true" className={ascending ? '' : 'rotate-180'} />
            </button>
          </div>
        </div>

        <div role="group" aria-label="Filter by difficulty and length" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {DIFFICULTIES.map((d) => (
            <Chip key={d} active={difficulty === d} onClick={() => setDifficulty(difficulty === d ? null : d)}>
              {DIFFICULTY_META[d].label}
            </Chip>
          ))}
          <span className="mx-1 w-px shrink-0 bg-line" aria-hidden="true" />
          <Chip active={quick} onClick={() => setQuick(!quick)} activeClass="border-coral bg-coral text-white">
            Under 10 min
          </Chip>
        </div>
        <div role="group" aria-label="Filter by workout type" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {WORKOUT_TYPES.map((t) => (
            <TypeChip key={t} type={t} active={type === t} onClick={() => setType(type === t ? null : t)} />
          ))}
        </div>
        {anyFilter && (
          <button type="button" onClick={clearFilters} className="btn-ghost -ml-2 min-h-8 px-2 py-1 text-xs">
            <X size={14} aria-hidden="true" /> Clear filters
          </button>
        )}
      </div>

      {!programs ? (
        <Spinner />
      ) : builtIn.length === 0 && custom.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No programs found"
          message="Try a different search or filter."
          action={
            <button type="button" onClick={clearFilters} className="btn-secondary">
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="space-y-8">
          {custom.length > 0 && (
            <section aria-labelledby="custom-heading">
              <h2 id="custom-heading" className="section-title mb-3">
                Custom Programs <span className="font-normal text-muted">({custom.length})</span>
              </h2>
              <ProgramGrid programs={custom} />
            </section>
          )}
          {builtIn.length > 0 && (
            <section aria-labelledby="builtin-heading">
              <h2 id="builtin-heading" className="section-title mb-3">
                Built-In Programs <span className="font-normal text-muted">({builtIn.length})</span>
              </h2>
              <ProgramGrid programs={builtIn} />
            </section>
          )}
        </div>
      )}
    </>
  )
}
