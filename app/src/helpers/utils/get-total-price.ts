import type { SimpleProduct } from 'src/app/generic.types'

export function getTotalPrice(
  product: Omit<SimpleProduct, 'totalPrice' | 'name'>,
) {
  return product.price * product.count - Math.abs(product.discount)
}
