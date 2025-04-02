import type { DivisionTranslationEnum, DivisionType } from '@app/generic.types'
import * as yup from 'yup'

function parseStrictFloat(str: string) {
  // eslint-disable-next-line regexp/no-unused-capturing-group
  const floatRegex = /^-?\d+(\.\d+)?$/

  if (floatRegex.test(str)) {
    return Number(str)
  }

  return Number.NaN
}

function transformToNumber(value: number, originalValue: string | number) {
  if (typeof originalValue !== 'string') {
    console.log(1, value, typeof value)
    return value
  }

  const parsedValue = parseStrictFloat(originalValue.replace(',', '.'))

  if (Number.isNaN(parsedValue)) {
    console.log(2, value, typeof value)
    return originalValue
  }

  console.log(3, parsedValue, typeof parsedValue)
  return parsedValue
}

export const divisionTypeArray: DivisionType[] = ['percentage', 'amount', 'shares']

// Define the validation schema for Product
export const productSchema = yup.object({
  _id: yup
    .string()
    .required('Wymagane jest ID produktu'),
  division: yup
    .object()
    .shape({})
    .required('Wymagany jest podział')
    .test(
      'division-values',
      'Wartości podziału muszą być nieujemnymi liczbami',
      obj => Object.values(obj).every(value => value === null || (typeof value === 'number' && value >= 0)),
    ),
  divisionType: yup
    .mixed<keyof typeof DivisionTranslationEnum>()
    .oneOf(divisionTypeArray, 'Nieprawidłowy typ działu')
    .required('Wymagany jest typ działu'),

  name: yup
    .string()
    .default('')
    .typeError('Nazwa produktu musi być tekstem')
    .required('Nazwa produktu jest wymagana')
    .min(3, 'Nazwa produktu musi mieć co najmniej 3 znaki')
    .max(80, 'Nazwa produktu może mieć maksymalnie 80 znaków'),

  price: yup
    .number()
    .transform(transformToNumber)
    .default(1)
    .nonNullable()
    .required('Cena produktu jest wymagana')
    .typeError('Cena produktu musi być liczbą')
    .min(0.01, 'Cena produktu musi wynosić co najmniej 0.01')
    .max(100000, 'Cena produktu może wynosić maksymalnie 100000'),

  count: yup
    .number()
    .default(1)
    .typeError('Ilość produktu musi być liczbą')
    .required('Ilość produktu jest wymagana')
    .min(0.001, 'Ilość produktu musi wynosić co najmniej 0.001')
    .max(100000, 'Ilość produktu może wynosić maksymalnie 100000'),

  discount: yup
    .number()
    .default(0)
    .typeError('Rabat produktu musi być liczbą')
    .required('Rabat produktu jest wymagany')
    .min(0, 'Rabat produktu musi wynosić co najmniej 0')
    .max(100000, 'Rabat produktu może wynosić maksymalnie 100000'),

  totalPrice: yup
    .number()
    .min(0, 'Łączna cena musi być nieujemna')
    .required('Wymagana jest łączna cena'),
})

export const receiptSchema = yup.object({
  _id: yup
    .string()
    .required('Wymagane jest ID rachunku'),
  sum: yup
    .number()
    .min(0, 'Suma musi być nieujemna')
    .required('Wymagana jest suma'),
  title: yup
    .string()
    .required('Nazwa paragonu jest wymagana')
    .min(3, 'Nazwa paragonu musi mieć co najmniej 3 znaki')
    .max(30, 'Nazwa paragonu nie może mieć więcej niż 30 znaków'),
  products: yup
    .array()
    .of(productSchema)
    .required('Wymagana jest lista produktów'),
  owner: yup
    .string()
    .required('Wymagany jest właściciel'),
  contributors: yup
    .object()
    .shape({})
    .required('Wymagani są współautorzy')
    .test(
      'contributor-values',
      'Wartości współautorów muszą być nieujemnymi liczbami',
      obj => Object.values(obj).every(value => typeof value === 'number' && value >= 0),
    ),
  imagePath: yup
    .string()
    .url('Ścieżka obrazu musi być prawidłowym URL-em')
    .notRequired(),
  createdAt: yup
    .string()
    .required('Wymagana jest data utworzenia'),
  updatedAt: yup
    .string()
    .required('Wymagana jest data aktualizacji'),
})
