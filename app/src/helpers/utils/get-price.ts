export const getPrice = (value: number) =>
  value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })
