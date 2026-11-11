'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { clearPersistedUser, readPersistedUser, writePersistedUser } from '@/lib/auth/storage'
import type { AuthContextValue } from '@/types/auth'
import type { User } from '@/types/user'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Hydrate from storage after mount to keep SSR markup deterministic.
  useEffect(() => {
    const stored = readPersistedUser()
    if (stored) {
      setUser(stored)
    }
  }, [])

  const signIn = useCallback((email: string) => {
    const next: User = { name: 'Demo Investor', email }
    setUser(next)
    writePersistedUser(next)
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    clearPersistedUser()
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signIn,
      signOut,
    }),
    [signIn, signOut, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
