import { z } from 'zod'
import type { User } from '@/types/user'

const STORAGE_KEY = 'blockestate:user'

const storedUserSchema = z.object({
  name: z.string(),
  email: z.string(),
})

function getStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null
  }
  return window.localStorage
}

export function readPersistedUser(): User | null {
  const storage = getStorage()
  if (!storage) {
    return null
  }

  let raw: string | null
  try {
    raw = storage.getItem(STORAGE_KEY)
  } catch (error) {
    console.warn('Could not read auth from storage', error)
    return null
  }

  if (!raw) {
    return null
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (error) {
    console.warn('Persisted auth value is not valid JSON', error)
    return null
  }

  const result = storedUserSchema.safeParse(parsed)
  if (!result.success) {
    console.warn('Persisted auth value does not match expected shape', result.error)
    return null
  }

  return result.data
}

export function writePersistedUser(user: User): void {
  const storage = getStorage()
  if (!storage) {
    return
  }

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(user))
  } catch (error) {
    console.warn('Could not persist auth to storage', error)
  }
}

export function clearPersistedUser(): void {
  const storage = getStorage()
  if (!storage) {
    return
  }

  try {
    storage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.warn('Could not clear persisted auth', error)
  }
}
