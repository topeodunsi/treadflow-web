import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useLiveQuery } from './useLiveQuery'
import { getSettings } from '../db/database'
import { DEFAULT_SETTINGS, type UserSettings } from '../db/types'

interface SettingsState {
  settings: UserSettings
  /** False until settings have been read from IndexedDB at least once. */
  loaded: boolean
}

const SettingsContext = createContext<SettingsState>({ settings: DEFAULT_SETTINGS, loaded: false })

function useSystemPrefersDark() {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => setDark(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return dark
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const stored = useLiveQuery(getSettings, ['settings'])
  const settings = stored ?? DEFAULT_SETTINGS
  const systemDark = useSystemPrefersDark()

  const isDark = settings.appearance === 'dark' || (settings.appearance === 'system' && systemDark)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#0b1110' : '#0f756e')
  }, [isDark])

  return <SettingsContext.Provider value={{ settings, loaded: stored !== undefined }}>{children}</SettingsContext.Provider>
}

export function useAppSettings() {
  return useContext(SettingsContext)
}
