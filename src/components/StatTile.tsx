import type { LucideIcon } from 'lucide-react'

export function StatTile({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="card flex min-w-0 flex-col gap-1 p-4">
      <span className="flex items-center gap-1.5 text-xs font-semibold text-muted">
        <Icon size={14} aria-hidden="true" className="text-teal-brand dark:text-teal-brand-soft" />
        {label}
      </span>
      <span className="truncate font-display text-xl font-bold tabular-nums" title={value}>
        {value}
      </span>
    </div>
  )
}
