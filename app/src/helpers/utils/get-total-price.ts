import type { SimpleProduct } from '@paragoniks/shared'

export function getTotalPrice(
  product: Omit<SimpleProduct, 'totalPrice' | 'name'>,
) {
  return product.price * product.count - Math.abs(product.discount)
}
