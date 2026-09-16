import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import fr from '../locales/fr.json'
const LanguageContext = createContext()
const loaders = { en: () => import('../locales/en.json'), de: () => import('../locales/de.json'), it: () => import('../locales/it.json'), es: () => import('../locales/es.json'), fr: () => Promise.resolve({ default: fr }) }
const supported = ['fr', 'en', 'de', 'it', 'es']
const read = (object, path) => path.split('.').reduce((value, key) => value?.[key], object)
export const useLanguage = () => useContext(LanguageContext)
export function LanguageProvider({ children }) {
  const [language, changeLanguage] = useState(() => {
    try { const saved = localStorage.getItem('language'); return supported.includes(saved) ? saved : 'fr' } catch { return 'fr' }
  })
  const [dictionary, setDictionary] = useState(fr)
  useEffect(() => {
    let cancelled = false
    loaders[language]().then(module => { if (!cancelled) setDictionary(module.default) }).catch(() => { if (!cancelled) setDictionary(fr) })
    document.documentElement.lang = language
    try { localStorage.setItem('language', language) } catch { /* Storage can be disabled. */ }
    return () => { cancelled = true }
  }, [language])
  const t = useCallback(path => read(dictionary, path) ?? read(fr, path) ?? path, [dictionary])
  const setLanguage = code => { if (supported.includes(code)) changeLanguage(code) }
  return <LanguageContext.Provider value={{ language, setLanguage, t, loading: false }}>{children}</LanguageContext.Provider>
}
