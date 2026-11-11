import type { User } from '@/types/user'

export type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  signIn: (email: string) => void
  signOut: () => void
}
