import type { Product, UserId } from 'src/app/generic.types'

import { getLocaleCurrency } from '@helpers/utils'
import { useMemo } from 'react'

function useUserCutCalc(product: Product, userId: UserId) {
  const userCut = useMemo(() => {
    const { totalPrice, divisionType, division } = product
    const userDivision = division[userId] ?? 0

    switch (divisionType) {
      case 'shares': {
        const noOfShares = Object.values(division).reduce(
          (sharesAcc, share) => (sharesAcc || 0) + (share || 0),
          0,
        ) as number

        return totalPrice / (noOfShares / userDivision)
      }

      case 'percentage':
        return totalPrice * (userDivision / 100)

      case 'amount':
        return userDivision

      default:
        return 0
    }
  }, [product, userId])

  return getLocaleCurrency(Number.isNaN(userCut) ? 0 : userCut)
}

export default useUserCutCalc
