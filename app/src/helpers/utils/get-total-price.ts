import { Product } from 'src/app/generic.types'

export function getTotalPrice(
  product: Pick<Product, 'price' | 'count' | 'discount'>
) {
  return product.price * product.count - Math.abs(product.discount)
}
