import { locales } from 'src/helpers/i18n/i18n.data'

export type Locale = (typeof locales)[number]

export const isLocale = (value: any): value is Locale => {
  return locales.includes(value)
}
