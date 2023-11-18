import type { Locale } from 'src/helpers/i18n/i18n.types'

export const locales = ['en', 'pl'] as const

export const defaultLocale: Locale = 'en'

export const languages: Record<Locale, string> = {
  en: 'English',
  pl: 'Polski',
}
