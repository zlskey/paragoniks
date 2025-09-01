import config from 'src/config'

export function getLocaleCurrency(num: number) {
  return num.toLocaleString(config.LOCALE, {
    style: 'currency',
    currency: config.LOCALE_CURRENCY,
  })
}

export function getLocaleDate(date: string) {
  return new Date(date).toLocaleDateString(config.LOCALE)
}
