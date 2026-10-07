import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/** Goes back in history when possible, otherwise to `fallback`. */
export function BackLink({ fallback = '/', label = 'Back' }: { fallback?: string; label?: string }) {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => (window.history.state?.idx > 0 ? navigate(-1) : navigate(fallback))}
      className="btn-ghost -ml-3 mb-3 min-h-9 px-3 py-1.5"
    >
      <ArrowLeft size={18} aria-hidden="true" /> {label}
    </button>
  )
}
