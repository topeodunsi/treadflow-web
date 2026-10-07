import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import { SEED_PROGRAMS } from '../data/seedPrograms'
import {
  DEFAULT_SETTINGS,
  type Program,
  type UserSettings,
  type WorkoutFeedback,
  type WorkoutSession,
} from './types'
import { newId, slugify } from '../lib/ids'

interface TreadFlowDB extends DBSchema {
  programs: { key: string; value: Program; indexes: { byName: string } }
  sessions: { key: string; value: WorkoutSession; indexes: { byDate: number } }
  feedback: { key: string; value: WorkoutFeedback; indexes: { bySession: string } }
  settings: { key: string; value: UserSettings }
}

export type TableName = 'programs' | 'sessions' | 'feedback' | 'settings'

const DB_NAME = 'treadflow'
const DB_VERSION = 1
const SETTINGS_KEY = 'singleton'

let dbPromise: Promise<IDBPDatabase<TreadFlowDB>> | null = null

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<TreadFlowDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const programs = db.createObjectStore('programs', { keyPath: 'id' })
        programs.createIndex('byName', 'name')
        const sessions = db.createObjectStore('sessions', { keyPath: 'id' })
        sessions.createIndex('byDate', 'date')
        const feedback = db.createObjectStore('feedback', { keyPath: 'id' })
        feedback.createIndex('bySession', 'sessionId', { unique: true })
        db.createObjectStore('settings')
      },
    }).then(async (db) => {
      await seedBuiltIns(db)
      return db
    })
  }
  return dbPromise
}

// ---------- change notifications (drives the live-query hooks) ----------

type Listener = (tables: Set<TableName>) => void
const listeners = new Set<Listener>()

export function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function notify(...tables: TableName[]) {
  const set = new Set(tables)
  listeners.forEach((l) => l(set))
}

// ---------- seeding ----------

export function builtInId(name: string) {
  return `builtin-${slugify(name)}`
}

/**
 * Inserts any seed program not already present and refreshes the content of
 * existing built-ins (so library fixes reach existing installs), while
 * preserving the user's favourite flag. Mirrors ProgramLibrarySeeder on iOS.
 */
async function seedBuiltIns(db: IDBPDatabase<TreadFlowDB>) {
  const tx = db.transaction('programs', 'readwrite')
  for (const seed of SEED_PROGRAMS) {
    const id = builtInId(seed.name)
    const existing = await tx.store.get(id)
    const program: Program = {
      id,
      name: seed.name,
      description: seed.description,
      difficulty: seed.difficulty,
      workoutType: seed.workoutType,
      isBuiltIn: true,
      isFavourite: existing?.isFavourite ?? false,
      trainingObjective: seed.trainingObjective,
      warning: seed.warning,
      createdAt: existing?.createdAt ?? 0,
      intervals: seed.intervals.map((iv, order) => ({
        id: `${id}-${order}`,
        order,
        ...iv,
      })),
    }
    await tx.store.put(program)
  }
  await tx.done
}

// ---------- programs ----------

export async function getAllPrograms(): Promise<Program[]> {
  return (await getDB()).getAll('programs')
}

export async function getProgram(id: string): Promise<Program | undefined> {
  return (await getDB()).get('programs', id)
}

export async function isProgramNameTaken(name: string, excludingId?: string) {
  const trimmed = name.trim().toLowerCase()
  if (!trimmed) return false
  const all = await getAllPrograms()
  return all.some((p) => p.id !== excludingId && p.name.trim().toLowerCase() === trimmed)
}

export async function saveCustomProgram(program: Program) {
  if (program.isBuiltIn) throw new Error('Built-in programs cannot be modified.')
  const db = await getDB()
  const existing = await db.get('programs', program.id)
  if (existing?.isBuiltIn) throw new Error('Built-in programs cannot be overwritten.')
  if (await isProgramNameTaken(program.name, program.id)) {
    throw new Error(`A program named "${program.name.trim()}" already exists.`)
  }
  await db.put('programs', program)
  notify('programs')
}

export async function setFavourite(id: string, isFavourite: boolean) {
  const db = await getDB()
  const tx = db.transaction('programs', 'readwrite')
  const program = await tx.store.get(id)
  if (program) await tx.store.put({ ...program, isFavourite })
  await tx.done
  notify('programs')
}

export async function deleteCustomProgram(id: string) {
  const db = await getDB()
  const program = await db.get('programs', id)
  if (!program || program.isBuiltIn) return
  await db.delete('programs', id)
  notify('programs')
}

export async function deleteAllCustomPrograms() {
  const db = await getDB()
  const tx = db.transaction('programs', 'readwrite')
  for (const p of await tx.store.getAll()) {
    if (!p.isBuiltIn) await tx.store.delete(p.id)
  }
  await tx.done
  notify('programs')
}

// ---------- sessions & feedback ----------

export async function getAllSessions(): Promise<WorkoutSession[]> {
  const sessions = await (await getDB()).getAllFromIndex('sessions', 'byDate')
  return sessions.reverse()
}

export async function getSession(id: string) {
  return (await getDB()).get('sessions', id)
}

export async function addSession(session: Omit<WorkoutSession, 'id'>): Promise<WorkoutSession> {
  const full = { ...session, id: newId() }
  await (await getDB()).put('sessions', full)
  notify('sessions')
  return full
}

export async function getAllFeedback(): Promise<WorkoutFeedback[]> {
  return (await getDB()).getAll('feedback')
}

export async function getFeedbackForSession(sessionId: string) {
  return (await getDB()).getFromIndex('feedback', 'bySession', sessionId)
}

export async function saveFeedback(feedback: Omit<WorkoutFeedback, 'id'>) {
  const db = await getDB()
  const existing = await db.getFromIndex('feedback', 'bySession', feedback.sessionId)
  await db.put('feedback', { ...feedback, id: existing?.id ?? newId() })
  notify('feedback')
}

export async function deleteAllHistory() {
  const db = await getDB()
  const tx = db.transaction(['sessions', 'feedback'], 'readwrite')
  await tx.objectStore('sessions').clear()
  await tx.objectStore('feedback').clear()
  await tx.done
  notify('sessions', 'feedback')
}

// ---------- settings ----------

export async function getSettings(): Promise<UserSettings> {
  const stored = await (await getDB()).get('settings', SETTINGS_KEY)
  return { ...DEFAULT_SETTINGS, ...stored }
}

export async function updateSettings(patch: Partial<UserSettings> | ((current: UserSettings) => Partial<UserSettings>)) {
  const db = await getDB()
  // Read-modify-write inside one readwrite transaction: IndexedDB serialises
  // these, so rapid consecutive changes can't overwrite each other.
  const tx = db.transaction('settings', 'readwrite')
  const current = { ...DEFAULT_SETTINGS, ...(await tx.store.get(SETTINGS_KEY)) }
  const changes = typeof patch === 'function' ? patch(current) : patch
  await tx.store.put({ ...current, ...changes }, SETTINGS_KEY)
  await tx.done
  notify('settings')
}

export async function deleteEverything() {
  const db = await getDB()
  const tx = db.transaction(['programs', 'sessions', 'feedback', 'settings'], 'readwrite')
  for (const p of await tx.objectStore('programs').getAll()) {
    if (p.isBuiltIn) {
      if (p.isFavourite) await tx.objectStore('programs').put({ ...p, isFavourite: false })
    } else {
      await tx.objectStore('programs').delete(p.id)
    }
  }
  await tx.objectStore('sessions').clear()
  await tx.objectStore('feedback').clear()
  await tx.objectStore('settings').clear()
  await tx.done
  notify('programs', 'sessions', 'feedback', 'settings')
}
