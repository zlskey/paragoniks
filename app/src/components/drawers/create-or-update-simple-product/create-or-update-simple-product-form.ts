import type { BaseProduct } from '@types'
import { productSchema } from '@helpers/validation-schemes/receipt'

export const createOrUpdateSimpleProductSchema = productSchema.pick(['name', 'price', 'count', 'discount'])

export type CreateOrUpdateSimpleProductFormState = BaseProduct

export const createOrUpdateSimpleProductDefaultValues = createOrUpdateSimpleProductSchema.getDefault()
