import type {
  Division,
  DivisionType,
  IProduct,
} from 'src/models/receipt.model'

export function parseFloatWithTwoDecimals(number: number): number {
  return Number.parseFloat(number.toFixed(2))
}

export function getTotalPrice(
  product: Pick<IProduct, 'price' | 'count' | 'discount'>,
) {
  return product.price * product.count - Math.abs(product.discount)
}

export function getTotalContribution(products: IProduct[], userId: string) {
  return products.reduce((total, product) => {
    const userDivision = product.division[userId]

    if (userDivision === null) {
      return total
    }

    switch (product.divisionType) {
      case 'shares': {
        const totalShares = Object.values(product.division).reduce(
          (total, share) => (total ?? 0) + (share ?? 0),
          0,
        )
        return parseFloatWithTwoDecimals(
          total + (product.totalPrice / totalShares) * userDivision,
        )
      }
      case 'percentage':
        return parseFloatWithTwoDecimals(
          total + (userDivision / 100) * product.totalPrice,
        )
      case 'amount':
        return parseFloatWithTwoDecimals(total + userDivision)

      default:
        return 0
    }
  }, 0)
}

export function getCalculatedTotalsForReceipt(
  contributorsIds: string[],
  products: IProduct[],
) {
  const calculatedProducts = products.map((product) => {
    const totalPrice = getTotalPrice(product)

    return { ...product, totalPrice }
  })

  const contributors = Object.fromEntries(
    contributorsIds.map((userId) => {
      const contribution = getTotalContribution(calculatedProducts, userId)
      return [userId, contribution]
    }),
  )

  const sum = parseFloatWithTwoDecimals(
    Object.values(calculatedProducts).reduce(
      (total, product) => total + product.totalPrice,
      0,
    ),
  )

  return { contributors, products: calculatedProducts, sum }
}

export function splitNumberEqually(numberToSplit: number, partsCount: number) {
  const evenPart = parseFloatWithTwoDecimals(numberToSplit / partsCount)
  const resultArray = Array.from({ length: partsCount }, (_, d) => {
    const currentPartCount = partsCount - 1
    if (d < currentPartCount) {
      return evenPart
    }
    return parseFloatWithTwoDecimals(
      numberToSplit - evenPart * currentPartCount,
    )
  })
  return resultArray
}

interface GetEvenDivisionProps {
  divisionType: Omit<DivisionType, 'shares'>
  division: Division
  totalPrice: number
}

export function getEvenDivision({
  divisionType,
  division,
  totalPrice,
}: GetEvenDivisionProps): Division {
  const mockDivision = { ...division }

  const total = Object.values(mockDivision).filter(el => el !== null).length
  const users = Object.keys(mockDivision)

  const numberToSplit = divisionType === 'amount' ? totalPrice : 100

  const evenDivision = splitNumberEqually(numberToSplit, total)

  return Object.fromEntries(
    users.map((user) => {
      if (mockDivision[user] === null) {
        return [user, null]
      }

      const newValue = evenDivision.pop()!

      if (newValue === undefined) {
        throw new Error('Even division failed')
      }

      return [user, newValue]
    }),
  )
}
