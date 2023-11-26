import { Product } from 'src/types/generic.types'

export interface ProductItemProps {
  product: Product
  onEdit: (product: Product) => void
}
