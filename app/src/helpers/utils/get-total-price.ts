import type { BaseProduct } from '@types'

export function getTotalPrice(
  product: Omit<BaseProduct, 'totalPrice' | 'name'>,
) {
  return product.price * product.count - Math.abs(product.discount)
}
