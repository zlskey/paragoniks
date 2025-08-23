import type { BaseProduct, ImageBase64, UserId } from '@types'
import { productSchema, receiptSchema } from '@helpers/validation-schemes/receipt'
import * as yup from 'yup'

export const createReceiptFormSchema = receiptSchema
  .pick(['title', 'contributors'])
  .concat(yup.object({
    products: yup
      .array()
      .of(productSchema.pick(['name', 'price', 'count', 'discount']))
      .required('Wymagana jest lista produktów'),
    image: yup.string().required(),
    shouldGenerateProducts: yup.boolean().required(),
  }))

export interface CreateReceiptFormState {
  title: string
  products: BaseProduct[]
  contributors: Record<UserId, number>
  image: ImageBase64
  shouldGenerateProducts: boolean
}

export const createReceiptDefaultValues: CreateReceiptFormState = {
  title: '',
  products: [],
  contributors: {},
  image: 'null',
  shouldGenerateProducts: false,
}
