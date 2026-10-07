import { useEffect, useId, useRef, type ReactNode } from 'react'

interface DialogAction {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'teal'
  autoFocus?: boolean
}

interface DialogProps {
  open: boolean
  title: string
  children?: ReactNode
  actions: DialogAction[]
  /** Called on Escape / backdrop click. Omit to make the dialog non-dismissable. */
  onCancel?: () => void
  tone?: 'default' | 'warning'
}

const VARIANT_CLASS: Record<NonNullable<DialogAction['variant']>, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn bg-red-600 text-white hover:bg-red-700',
  teal: 'btn-teal',
}

/** Accessible modal built on the native <dialog> element (focus trap + Escape for free). */
export function Dialog({ open, title, children, actions, onCancel, tone = 'default' }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault()
        onCancel?.()
      }}
      onClick={(e) => {
        if (e.target === ref.current) onCancel?.()
      }}
      className="m-auto w-[min(92vw,26rem)] rounded-2xl border border-line bg-card p-0 text-ink shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="p-6">
          <h2 id={titleId} className={`text-lg font-bold ${tone === 'warning' ? 'text-coral' : ''}`}>
            {title}
          </h2>
          {children && <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>}
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            {actions.map((a) => (
              <button
                key={a.label}
                type="button"
                autoFocus={a.autoFocus}
                onClick={a.onClick}
                className={VARIANT_CLASS[a.variant ?? 'secondary']}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </dialog>
  )
}
