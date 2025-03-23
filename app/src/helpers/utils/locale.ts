const LOCALE = 'pl-PL'
const LOCALE_CURRENCY = 'PLN'

export function getLocaleCurrency(num: number) {
  return num.toLocaleString(LOCALE, {
    style: 'currency',
    currency: LOCALE_CURRENCY,
  })
}

export function getLocaleDate(date: string): string {
  return new Date(date).toLocaleDateString(LOCALE)
}
