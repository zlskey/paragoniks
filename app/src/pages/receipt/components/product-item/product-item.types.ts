import { Product, ProductId } from 'src/types/generic.types'

export interface ProductItemProps {
  productId: ProductId
  onEdit: (product: Product) => void
}
