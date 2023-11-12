import { Product, Receipt, UserId } from 'src/types/generic.types'

import { getPrice } from '../utils/get-price'
import { useMemo } from 'react'

const useUserCutCalc = (userId?: UserId, receipt?: Receipt) => {
  const userCut = useMemo(() => {
    if (!userId || !receipt) {
      return ''
    }

    const sum = receipt.products.reduce((acc: number, product: Product) => {
      if (product.comprising.find(comprisingId => comprisingId === userId)) {
        return acc + (product.price * product.count) / product.comprising.length
      }

      return acc
    }, 0)

    return getPrice(sum)
  }, [receipt, userId])

  return userCut
}

export default useUserCutCalc
