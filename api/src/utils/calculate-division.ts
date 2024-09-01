import { IProduct } from 'src/models/receipt.model'

function roundToTwoDecimals(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

function calculateDivision(product: IProduct) {
  const fullPrice = product.price * product.count - product.discount
  const { divisionType, division } = product
  const noOfContributors = Object.keys(division).filter(Boolean).length

  for (const [userId] of Object.entries(division)) {
    switch (divisionType) {
      case 'amount':
        division[userId] = roundToTwoDecimals(fullPrice / noOfContributors)
        break
      case 'percentage':
        division[userId] = roundToTwoDecimals(100 / noOfContributors)
        break
      case 'shares':
        division[userId] = 1
    }
  }

  return product
}

export { calculateDivision, roundToTwoDecimals }
