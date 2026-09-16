import { createContext, useContext, useState, useEffect } from 'react'
const ThemeContext = createContext()
export const useTheme = () => useContext(ThemeContext)
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
  }, [isDark])
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => { try { if (!localStorage.getItem('theme')) setIsDark(media.matches) } catch { setIsDark(media.matches) } }
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  const toggleTheme = () => setIsDark(previous => {
    try { localStorage.setItem('theme', previous ? 'light' : 'dark') } catch { /* Keep session preference. */ }
    return !previous
  })
  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}
