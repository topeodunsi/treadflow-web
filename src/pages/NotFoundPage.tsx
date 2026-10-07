import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { EmptyState } from '../components/EmptyState'

export function NotFoundPage() {
  return (
    <EmptyState
      icon={Compass}
      title="Page not found"
      message="That page doesn't exist."
      action={
        <Link to="/" className="btn-primary">
          Browse programs
        </Link>
      }
    />
  )
}
