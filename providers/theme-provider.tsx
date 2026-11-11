'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('blockestate-theme')
    const initialTheme = storedTheme === 'light' ? 'light' : 'dark'
    setTheme(initialTheme)
    document.documentElement.dataset.theme = initialTheme
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
      document.documentElement.dataset.theme = nextTheme
      document.documentElement.classList.toggle('dark', nextTheme === 'dark')
      window.localStorage.setItem('blockestate-theme', nextTheme)
      return nextTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
