import { Item, Receipt, User } from 'src/types/generic.types'

import { getPrice } from '../utils/get-price'
import { useMemo } from 'react'

const useUserCutCalc = (user: User | null, receipt?: Receipt) => {
  const userCut = useMemo(() => {
    if (!user || !receipt) {
      return ''
    }

    const sum = receipt.items.reduce((acc: number, item: Item) => {
      if (item.comprising.includes(user.username)) {
        return acc + (item.value * item.count) / item.comprising.length
      }

      return acc
    }, 0)

    return getPrice(sum)
  }, [receipt, user])

  return userCut
}

export default useUserCutCalc
