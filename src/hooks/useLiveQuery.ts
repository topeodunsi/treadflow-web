import { useEffect, useRef, useState } from 'react'
import { subscribe, type TableName } from '../db/database'
import * as db from '../db/database'

/**
 * Runs an async IndexedDB query and re-runs it whenever one of the given
 * tables changes. Returns undefined until the first result arrives.
 */
export function useLiveQuery<T>(
  query: () => Promise<T>,
  tables: TableName[],
  deps: unknown[] = [],
): T | undefined {
  const [value, setValue] = useState<T | undefined>(undefined)
  const queryRef = useRef(query)
  queryRef.current = query

  useEffect(() => {
    let cancelled = false
    const run = () => {
      queryRef.current().then((v) => {
        if (!cancelled) setValue(v)
      })
    }
    run()
    const unsubscribe = subscribe((changed) => {
      if (tables.some((t) => changed.has(t))) run()
    })
    return () => {
      cancelled = true
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tables.join(','), ...deps])

  return value
}

export function usePrograms() {
  return useLiveQuery(db.getAllPrograms, ['programs'])
}

export function useProgram(id: string | undefined) {
  return useLiveQuery(
    async () => (id ? ((await db.getProgram(id)) ?? null) : null),
    ['programs'],
    [id],
  )
}

export function useSessions() {
  return useLiveQuery(db.getAllSessions, ['sessions'])
}

export function useFeedback() {
  return useLiveQuery(db.getAllFeedback, ['feedback'])
}
