import { Product } from 'src/types/generic.types'

export interface ProductEditDialogProps {
  product: Product | null
  onClose: () => void
  receiptId: string
}
