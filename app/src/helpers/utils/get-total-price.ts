import type { SimpleProduct } from 'src/app/generic.types'

export function getTotalPrice(
  product: Omit<SimpleProduct, 'title' | 'totalPrice'>,
) {
  return product.price * product.count - Math.abs(product.discount)
}
