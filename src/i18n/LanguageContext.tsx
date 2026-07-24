import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
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

  /** 언어가 바뀌는 순간만 짧게 dip 시킨다. CSS가 이 속성을 보고 애니메이션을 건다. */
  const runSwap = useCallback(() => {
    const root = document.documentElement
    root.dataset.swapping = '1'
    window.setTimeout(() => {
      delete root.dataset.swapping
    }, 220)
  }, [])

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      setLang: (next: Lang) => {
        if (next === lang) return
        runSwap()
        setLang(next)
      },
      toggle: () => {
        runSwap()
        setLang((prev) => (prev === 'ko' ? 'en' : 'ko'))
      },
      t: content[lang],
    }),
    [lang, runSwap],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang(): LanguageValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
