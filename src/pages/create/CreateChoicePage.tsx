import { Link } from 'react-router-dom'
import { ChevronRight, FilePlus2, SlidersHorizontal } from 'lucide-react'
import { PageHeader } from '../../components/EmptyState'

const CHOICES = [
  {
    to: '/create/new',
    icon: FilePlus2,
    title: 'From Scratch',
    text: 'Build a completely new program, interval by interval.',
  },
  {
    to: '/create/customize',
    icon: SlidersHorizontal,
    title: 'Customize Existing',
    text: 'Start from a built-in or custom program and adjust it — scale speed, incline and length in one go.',
  },
]

export function CreateChoicePage() {
  return (
    <>
      <PageHeader title="Create Program" subtitle="Custom programs are saved only in this browser." />
      <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
        {CHOICES.map(({ to, icon: Icon, title, text }) => (
          <Link key={to} to={to} className="card group flex flex-col gap-3 p-6 transition-shadow hover:shadow-lg hover:shadow-black/5">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-brand/10 text-teal-brand dark:text-teal-brand-soft">
              <Icon size={24} aria-hidden="true" />
            </span>
            <span className="flex items-center justify-between text-lg font-bold">
              {title}
              <ChevronRight size={20} aria-hidden="true" className="text-muted transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-sm text-muted">{text}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
