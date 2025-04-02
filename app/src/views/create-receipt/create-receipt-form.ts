import type { SimpleProduct } from '@app/generic.types'
import { productSchema, receiptSchema } from '@helpers/validation-schemes/receipt'
import * as yup from 'yup'

export const createReceiptFormSchema = receiptSchema
  .pick(['title'])
  .concat(yup.object({
    products: yup
      .array()
      .of(productSchema.pick(['name', 'price', 'count', 'discount']))
      .required('Wymagana jest lista produktów'),
  }))

export interface CreateReceiptFormState {
  title: string
  products: SimpleProduct[]
}

export const createReceiptDefaultValues: CreateReceiptFormState = {
  title: '',
  products: [],
}
