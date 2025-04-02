import type { SimpleProduct } from '@app/generic.types'
import { productSchema } from '@helpers/validation-schemes/receipt'

export const createOrUpdateSimpleProductSchema = productSchema.pick(['name', 'price', 'count', 'discount'])

export type CreateOrUpdateSimpleProductFormState = SimpleProduct

export const createOrUpdateSimpleProductDefaultValues = createOrUpdateSimpleProductSchema.getDefault()
