import { Product, Receipt, User } from 'src/types/generic.types'

import { getPrice } from '../utils/get-price'
import { useMemo } from 'react'

const useUserCutCalc = (user: User | null, receipt?: Receipt) => {
  const userCut = useMemo(() => {
    if (!user || !receipt) {
      return ''
    }

    const sum = receipt.products.reduce((acc: number, product: Product) => {
      if (product.comprising.includes(user.username)) {
        return acc + (product.price * product.count) / product.comprising.length
      }

      return acc
    }, 0)

    return getPrice(sum)
  }, [receipt, user])

  return userCut
}

export default useUserCutCalc
