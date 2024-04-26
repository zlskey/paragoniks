import { Locale, isLocale } from './i18n.types'
import { MutableRefObject, ReactNode, useEffect, useRef } from 'react'
import { defaultLocale, locales } from './i18n.data'

import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { useUser } from '../contexts/current-user/current-user.context'

const initializeI18n = () => {
  i18n.load(defaultLocale, {})

  i18n.activate(defaultLocale)
}

const activateLocale = async (locale: Locale) => {
  const { messages } = await import(`./locales/${locale}/messages.po`)

  i18n.load(locale, messages)

  i18n.activate(locale)
}

const LocaleProvider = ({ children }: { children?: ReactNode }) => {
  const isMounted = useIsMounted()
  const user = useUser()

  if (!isMounted.current) {
    initializeI18n()
  }

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0]

    if (user.lang === locales[2]) {
      activateLocale(isLocale(browserLang) ? browserLang : defaultLocale)
      return
    }

    activateLocale(user.lang)
  }, [user])

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}

const useIsMounted = (): MutableRefObject<boolean> => {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted
}

export default LocaleProvider
