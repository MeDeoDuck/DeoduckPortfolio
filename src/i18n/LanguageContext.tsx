import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { content } from './content'
import type { Content, Lang } from './types'

interface LanguageValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  t: Content
}

const LanguageContext = createContext<LanguageValue | null>(null)

const STORAGE_KEY = 'deoduck-lang'

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'ko'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'ko' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('ko') ? 'ko' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readInitialLang)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang((prev) => (prev === 'ko' ? 'en' : 'ko')),
      t: content[lang],
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang(): LanguageValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
