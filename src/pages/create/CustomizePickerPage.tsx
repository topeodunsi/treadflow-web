import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Search } from 'lucide-react'
import { usePrograms } from '../../hooks/useLiveQuery'
import { PageHeader, Spinner } from '../../components/EmptyState'
import { BackLink } from '../../components/BackLink'
import { DifficultyDots } from '../../components/DifficultyDots'
import { WorkoutTypeBadge } from '../../components/WorkoutTypeBadge'
import { programMinutesLabel, totalDuration } from '../../lib/format'

export function CustomizePickerPage() {
  const programs = usePrograms()
  const [search, setSearch] = useState('')

  const groups = useMemo(() => {
    const q = search.trim().toLowerCase()
    const list = (programs ?? []).filter((p) => !q || p.name.toLowerCase().includes(q)).sort((a, b) => a.name.localeCompare(b.name))
    return [
      { title: 'Your custom programs', items: list.filter((p) => !p.isBuiltIn) },
      { title: 'Built-in programs', items: list.filter((p) => p.isBuiltIn) },
    ].filter((g) => g.items.length > 0)
  }, [programs, search])

  return (
    <>
      <BackLink fallback="/create" />
      <PageHeader title="Customize Existing" subtitle="Pick a program to use as your starting point." />
      <label className="relative mb-5 block max-w-xl">
        <span className="sr-only">Search programs</span>
        <Search size={18} aria-hidden="true" className="absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
        <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search programs" className="input pl-10" autoFocus />
      </label>

      {!programs ? (
        <Spinner />
      ) : groups.length === 0 ? (
        <p className="text-muted">No programs match “{search}”.</p>
      ) : (
        <div className="max-w-3xl space-y-6">
          {groups.map((g) => (
            <section key={g.title}>
              <h2 className="section-title mb-2">{g.title}</h2>
              <ul className="card divide-y divide-line overflow-hidden">
                {g.items.map((p) => (
                  <li key={p.id}>
                    <Link to={`/create/customize/${p.id}`} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-card-raised">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{p.name}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <DifficultyDots difficulty={p.difficulty} />
                          <WorkoutTypeBadge type={p.workoutType} />
                          <span className="text-xs text-muted">{programMinutesLabel(totalDuration(p.intervals))}</span>
                        </div>
                      </div>
                      <ChevronRight size={18} aria-hidden="true" className="shrink-0 text-muted" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  )
}
