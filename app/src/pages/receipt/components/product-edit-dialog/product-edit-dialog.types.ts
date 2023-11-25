import { Product } from 'src/types/generic.types'

export interface ProductEditDialogProps {
  productId: Product['_id'] | null
  onClose: () => void
}
