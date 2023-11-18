import { Locale, isLocale } from './i18n.types'
import { MutableRefObject, ReactNode, useEffect, useRef } from 'react'
import {
  detect,
  fromNavigator,
  fromStorage,
  fromUrl,
} from '@lingui/detect-locale'

import { I18nProvider } from '@lingui/react'
import { defaultLocale } from './i18n.data'
import { i18n } from '@lingui/core'
import { selectUser } from '../reducers/user/user.reducer'
import { useAppSelector } from 'src/redux-hooks'

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
  const user = useAppSelector(selectUser)

  if (!isMounted.current) {
    initializeI18n()
  }

  useEffect(() => {
    const userDefaultLang = user?.lang || navigator.language?.split('-')[0]

    activateLocale(isLocale(userDefaultLang) ? userDefaultLang : 'en')
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
