import { NavLink, Outlet } from 'react-router-dom'
import { Footprints, Heart, History, PlusCircle, Settings } from 'lucide-react'
import { usePrograms } from '../hooks/useLiveQuery'
import { useAppSettings } from '../hooks/SettingsContext'
import { BackgroundPattern } from './BackgroundPattern'

const LINKS = [
  { to: '/', label: 'Programs', icon: Footprints, end: true },
  { to: '/favourites', label: 'Favourites', icon: Heart },
  { to: '/create', label: 'Create', icon: PlusCircle },
  { to: '/history', label: 'History', icon: History },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <img src="/icon-64.png" alt="" width="32" height="32" className="h-8 w-8 rounded-lg" />
      <span className="font-display text-xl font-bold tracking-tight">TreadFlow</span>
    </span>
  )
}

export function Layout() {
  const programs = usePrograms()
  const { settings } = useAppSettings()
  const hasFavourites = programs?.some((p) => p.isFavourite) ?? false
  const links = LINKS.filter((l) => l.to !== '/favourites' || hasFavourites)

  return (
    <div className="relative min-h-dvh">
      <BackgroundPattern style={settings.backgroundStyle} className="fixed inset-0 -z-0" />

      {/* Desktop / tablet sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-line bg-card/90 px-3 py-5 backdrop-blur md:flex">
        <div className="px-3 pb-6">
          <Logo />
        </div>
        <nav aria-label="Main" className="flex flex-col gap-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isActive ? 'bg-teal-brand text-white' : 'text-muted hover:bg-card-raised hover:text-ink'
                }`
              }
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
        <p className="mt-auto px-3 text-xs leading-relaxed text-muted">
          Private by design. Everything stays in this browser — no accounts, no tracking.
        </p>
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-20 flex h-14 items-center border-b border-line bg-card/90 px-4 backdrop-blur md:hidden">
        <Logo />
      </header>

      <main className="relative z-10 pb-24 md:pb-10 md:pl-60">
        <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 md:py-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom tab bar */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-20 flex border-t border-line bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-semibold ${
                isActive ? 'text-teal-brand dark:text-teal-brand-soft' : 'text-muted'
              }`
            }
          >
            <Icon size={22} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
