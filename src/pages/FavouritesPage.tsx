import { Navigate } from 'react-router-dom'
import { usePrograms } from '../hooks/useLiveQuery'
import { ProgramGrid } from '../components/ProgramCard'
import { PageHeader, Spinner } from '../components/EmptyState'

export function FavouritesPage() {
  const programs = usePrograms()
  if (!programs) return <Spinner />

  const favourites = programs.filter((p) => p.isFavourite).sort((a, b) => a.name.localeCompare(b.name))
  // The nav link hides when there are no favourites; if the last one is removed
  // while on this page, fall back to Browse (mirrors the iOS sidebar).
  if (favourites.length === 0) return <Navigate to="/" replace />

  return (
    <>
      <PageHeader
        title="Favourites"
        subtitle={`${favourites.length} saved program${favourites.length === 1 ? '' : 's'}`}
      />
      <ProgramGrid programs={favourites} />
    </>
  )
}
