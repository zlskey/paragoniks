import { Product } from 'src/types/generic.types'

export interface ProductItemProps {
  product: Product
  isOwner: boolean
  onEdit: (product: Product) => void
}
